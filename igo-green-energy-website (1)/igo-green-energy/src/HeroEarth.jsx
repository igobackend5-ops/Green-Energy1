import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EARTH, RECT } from './earthConfig.js';
import {
  makeMaterials, solarFarmGeometry, villageGeometry, biogasGeometry, waterGeometry,
  turbineGeometries, TURBINE, treeInstances, sag, K
} from './infrastructure.js';

/*
  Interactive 3D Earth for the hero banner.
  World units == pixels of the 1672x841 (cropped) banner, origin at the Earth's centre,
  orthographic camera => the globe lines up exactly with the banner artwork.
  Every installation is a child of the spinning Earth group, so it is physically attached to the surface.
*/
const R = EARTH.R;
const TAU = Math.PI * 2;
const AUTO_SPEED = TAU / 34; // one revolution every ~34 s
const V3 = THREE.Vector3, Q = THREE.Quaternion;

function latLon(lat, lon) { // unit normal for three's SphereGeometry UV layout (lon 0 at +X, 90E at -Z)
  const la = (lat * Math.PI) / 180, lo = (lon * Math.PI) / 180;
  return new V3(Math.cos(lo) * Math.cos(la), Math.sin(la), -Math.sin(lo) * Math.cos(la));
}
// orientation of a local frame at (lat, lon): x = east, y = up (normal), z = south
function parkQuat(lat, lon, south) {
  const n = latLon(lat, lon);
  const east = new V3(0, 1, 0).cross(n).normalize();
  const z = new V3().crossVectors(east, n);
  const q = new Q().setFromRotationMatrix(new THREE.Matrix4().makeBasis(east, n, z));
  if (south) q.multiply(new Q().setFromAxisAngle(new V3(0, 1, 0), Math.PI)); // panels then face the equator
  return q;
}
// tangent-plane offset (east x, south z) -> exact surface frame
function offsetQuat(x, z) {
  const d = Math.hypot(x, z);
  if (d < 1e-6) return new Q();
  return new Q().setFromAxisAngle(new V3(z, 0, -x).normalize(), d / R);
}

function rngf(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------ ground patches (fields / desert / grass) ------------------------------ */
const PALETTE = {
  desert: ['#a98f63', '#9d8456', '#b39a6c', '#94794d', '#a48b5f'],
  grass: ['#587a3e', '#62854a', '#4d7035', '#6b8d50', '#557a3c'],
  farm: ['#6f8a4a', '#928f52', '#587d3c', '#847d48', '#66743f', '#9a9560'],
  village: ['#6f8a4c', '#7a9152', '#607c42', '#839659']
};
function groundTexture(kind, seed) {
  const r = rngf(seed), pal = PALETTE[kind];
  const c = document.createElement('canvas'); c.width = c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = pal[0]; ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 70; i++) {
    ctx.save(); ctx.translate(r() * 512, r() * 512); ctx.rotate((r() - 0.5) * 0.7 + (kind === 'farm' ? 0.35 : 0));
    ctx.fillStyle = pal[Math.floor(r() * pal.length)]; ctx.globalAlpha = 0.75;
    const w = 40 + r() * 80, h = 24 + r() * 60; ctx.fillRect(-w / 2, -h / 2, w, h);
    if (kind === 'farm') { // crop rows
      ctx.globalAlpha = 0.18; ctx.strokeStyle = '#3c5a22'; ctx.lineWidth = 1;
      for (let y = -h / 2; y < h / 2; y += 5) { ctx.beginPath(); ctx.moveTo(-w / 2, y); ctx.lineTo(w / 2, y); ctx.stroke(); }
    }
    ctx.restore();
  }
  ctx.globalAlpha = 0.07;
  for (let i = 0; i < 3000; i++) { ctx.fillStyle = r() > 0.5 ? '#fff' : '#000'; ctx.fillRect(r() * 512, r() * 512, 2, 2); }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'destination-in';
  const g = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(0.55, 'rgba(0,0,0,.9)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 512);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}
function capGeometry(radius) { // spherical patch centred on +Y, planar UVs
  const rings = 14, segs = 56, pos = [], uv = [], nor = [], idx = [];
  pos.push(0, R + 0.35, 0); nor.push(0, 1, 0); uv.push(0.5, 0.5);
  for (let i = 1; i <= rings; i++) {
    const rho = (i / rings) * radius, a = rho / R;
    for (let j = 0; j < segs; j++) {
      const f = (j / segs) * TAU, cx = Math.cos(f), sz = Math.sin(f);
      const nx = Math.sin(a) * cx, ny = Math.cos(a), nz = Math.sin(a) * sz;
      pos.push(nx * (R + 0.35), ny * (R + 0.35), nz * (R + 0.35)); nor.push(nx, ny, nz);
      uv.push(0.5 + (rho * cx) / (2 * radius), 0.5 + (rho * sz) / (2 * radius));
    }
  }
  for (let j = 0; j < segs; j++) idx.push(0, 1 + ((j + 1) % segs), 1 + j);
  for (let i = 1; i < rings; i++) for (let j = 0; j < segs; j++) {
    const a = 1 + (i - 1) * segs + j, b = 1 + (i - 1) * segs + ((j + 1) % segs), c = 1 + i * segs + j, d = 1 + i * segs + ((j + 1) % segs);
    idx.push(a, b, c, b, d, c);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

/* ------------------------------ shared scene assets ------------------------------ */
function useAssets(light) {
  return useMemo(() => {
    const mats = makeMaterials();
    const geo = {
      solar: solarFarmGeometry(), village: villageGeometry(), biogas: biogasGeometry(), water: waterGeometry(),
      turbine: turbineGeometries()
    };
    const ground = {
      desert: groundTexture('desert', 1), grass: groundTexture('grass', 2), farm: groundTexture('farm', 3), village: groundTexture('village', 4)
    };
    const capMats = {};
    Object.entries(ground).forEach(([k, t]) => {
      capMats[k] = new THREE.MeshStandardMaterial({
        map: t, transparent: true, opacity: 0.82, depthWrite: false, roughness: 1, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2
      });
    });
    const caps = {};
    [50, 62, 72, 86].forEach((r) => { caps[r] = capGeometry(r * K); });
    const treeGeo = new THREE.IcosahedronGeometry(1, 0);
    return { mats, geo, capMats, caps, treeGeo, light };
  }, [light]);
}

function MergedSite({ parts, mats }) {
  return Object.entries(parts).map(([key, g]) => (
    <mesh key={key} geometry={g} material={mats[key]} castShadow receiveShadow />
  ));
}

function Trees({ A, seed, count, spots }) {
  const ref = useRef();
  useEffect(() => {
    const m = ref.current; if (!m) return;
    const items = treeInstances(seed, count, spots);
    const obj = new THREE.Object3D(), col = new THREE.Color();
    items.forEach((t, i) => {
      const x = t.x * K, z = t.z * K, sc = t.s * K;
      obj.position.set(x, sc * 0.95 - 0.6 + sag(x, z), z);
      obj.scale.set(sc, sc * 1.35, sc); obj.rotation.set(0, t.h * 6, 0); obj.updateMatrix();
      m.setMatrixAt(i, obj.matrix);
      col.setHSL(0.27 + t.h * 0.06, 0.45, 0.2 * t.c + 0.05); m.setColorAt(i, col);
    });
    m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [seed, count, spots]);
  return <instancedMesh ref={ref} args={[A.treeGeo, A.mats.tree, count]} castShadow receiveShadow />;
}

function Turbine({ A, reduced, speed, phase, yaw }) {
  const rotor = useRef();
  useFrame((_, dt) => { if (rotor.current && !reduced) rotor.current.rotation.z -= speed * Math.min(dt, 0.05); });
  return (
    <group rotation={[0, yaw, 0]} scale={K * 0.92}>
      <mesh geometry={A.geo.turbine.tower} material={A.mats.turbine} castShadow receiveShadow />
      <group ref={rotor} position={[0, TURBINE.tower, TURBINE.hubZ]} rotation={[0, 0, phase]}>
        <mesh geometry={A.geo.turbine.blades} material={A.mats.turbineRed} castShadow receiveShadow />
      </group>
    </group>
  );
}

// one frame = a surface-tangent local coordinate system at tangent offset (x east, z south) of a park
const _n = new V3(), _q = new Q();
const smooth = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
function Frame({ x, z, children, cap, A }) {
  const q = useMemo(() => offsetQuat(x * K, z * K), [x, z]);
  const outer = useRef(), inner = useRef();
  // structures shrink smoothly into the ground as they turn away over the horizon, so nothing ever
  // pokes out sideways beyond the planet's silhouette or looks detached from the surface
  useFrame(() => {
    if (!outer.current || !inner.current) return;
    outer.current.getWorldQuaternion(_q);
    _n.set(0, 1, 0).applyQuaternion(_q);
    const k = 0.04 + 0.96 * smooth(0.2, 0.55, _n.z);
    inner.current.scale.setScalar(k);
    inner.current.visible = k > 0.045;
  });
  return (
    <group quaternion={q} ref={outer}>
      {cap && <mesh geometry={A.caps[cap.r]} material={A.capMats[cap.kind]} receiveShadow renderOrder={1} />}
      <group position={[0, R, 0]} ref={inner}>{children}</group>
    </group>
  );
}

const WIND_SPOTS = [[-46, -74], [20, -96], [86, -62], [40, -44]];
const TREE_SPOTS = {
  village: [[-52, 96, 34, 62], [-88, 16, 62, 78]],
  biogas: [[58, 64, 62, 82]],
  wind: [[30, -72, 22, 80]]
};

function Park({ A, reduced, lat, lon, south, id, light }) {
  const q = useMemo(() => parkQuat(lat, lon, south), [lat, lon, south]);
  const turbines = light ? WIND_SPOTS.slice(0, 3) : WIND_SPOTS;
  return (
    <group quaternion={q}>
      {/* SOLAR farm */}
      <Frame A={A} x={-88} z={16} cap={{ r: 72, kind: 'desert' }}><MergedSite parts={A.geo.solar} mats={A.mats} /></Frame>
      {/* rooftop solar village */}
      <Frame A={A} x={-52} z={96} cap={{ r: 62, kind: 'village' }}><MergedSite parts={A.geo.village} mats={A.mats} /></Frame>
      {/* BIOGAS plant */}
      <Frame A={A} x={58} z={64} cap={{ r: 86, kind: 'farm' }}><MergedSite parts={A.geo.biogas} mats={A.mats} /></Frame>
      {/* water treatment (secondary, smaller) */}
      <Frame A={A} x={140} z={8} cap={{ r: 50, kind: 'village' }}><group scale={0.72}><MergedSite parts={A.geo.water} mats={A.mats} /></group></Frame>
      {/* WIND farm */}
      <Frame A={A} x={30} z={-68} cap={{ r: 72, kind: 'grass' }}><></></Frame>
      {turbines.map(([x, z], i) => (
        <Frame key={i} A={A} x={x} z={z}>
          <Turbine A={A} reduced={reduced} speed={0.55 + (i % 3) * 0.12} phase={i * 1.3 + id} yaw={0.25 + (i % 2) * 0.12} />
        </Frame>
      ))}
      {!light && (
        <>
          <Frame A={A} x={-52} z={96}><Trees A={A} seed={id * 7 + 1} count={38} spots={TREE_SPOTS.village} /></Frame>
          <Frame A={A} x={58} z={64}><Trees A={A} seed={id * 7 + 2} count={30} spots={TREE_SPOTS.biogas} /></Frame>
          <Frame A={A} x={30} z={-68}><Trees A={A} seed={id * 7 + 3} count={26} spots={TREE_SPOTS.wind} /></Frame>
        </>
      )}
    </group>
  );
}

// Regions are spread around the planet so every view shows complete Solar + Wind + Biogas sites.
const PARKS = [
  { lat: 22, lon: 77 },   // India
  { lat: 22, lon: 18 },   // North Africa / Middle East
  { lat: -27, lon: 140, south: true }, // Australia
  { lat: 25, lon: -104 }, // Mexico / Texas
  { lat: -13, lon: -52, south: true } // Brazil
];

/* ------------------------------ atmosphere & a single very faint energy orbit ------------------------------ */
function Atmosphere() {
  const mat = useMemo(() => new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { c: { value: new THREE.Color(0x9cccf7) } },
    vertexShader: 'varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
    fragmentShader: 'varying vec3 vN; uniform vec3 c; void main(){ float f = 1.0 - abs(dot(vN, vec3(0.0,0.0,1.0))); float a = pow(f, 4.2) * 0.34; gl_FragColor = vec4(c, a); }'
  }), []);
  return (
    <mesh renderOrder={3} material={mat}>
      <sphereGeometry args={[R * 1.028, 64, 48]} />
    </mesh>
  );
}

function Orbit({ radius, rotation, reduced }) {
  const { curve, tube } = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 128; i++) { const a = (i / 128) * TAU; pts.push(new V3(Math.cos(a) * radius, Math.sin(a) * radius, 0)); }
    const c = new THREE.CatmullRomCurve3(pts, true);
    return { curve: c, tube: new THREE.TubeGeometry(c, 240, 0.9, 5, true) };
  }, [radius]);
  const ps = useRef([]);
  const t0 = useRef(0.2);
  useFrame((_, dt) => {
    if (reduced) return;
    t0.current = (t0.current + Math.min(dt, 0.05) * 0.018) % 1;
    ps.current.forEach((m, i) => { if (m) m.position.copy(curve.getPointAt((t0.current + i / 3) % 1)); });
  });
  return (
    <group rotation={rotation}>
      <mesh geometry={tube} renderOrder={4}><meshBasicMaterial color={0xe8f7f0} transparent opacity={0.26} depthWrite={false} /></mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => (ps.current[i] = el)} renderOrder={5} position={curve.getPointAt(i / 3)}>
          <sphereGeometry args={[2.2, 10, 8]} />
          <meshBasicMaterial color={i === 1 ? 0x9be8b0 : 0xffffff} transparent opacity={0.55} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function Env() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pm = new THREE.PMREMGenerator(gl);
    const rt = pm.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = rt.texture;
    scene.environmentIntensity = 0.55;
    return () => { scene.environment = null; rt.dispose(); pm.dispose(); };
  }, [gl, scene]);
  return null;
}

/* ------------------------------ the globe ------------------------------ */
function Globe({ light, active, reduced, onReady }) {
  const base = import.meta.env.BASE_URL || '/';
  const urls = light
    ? [`${base}textures/earth-2k.jpg`, `${base}textures/clouds-1k.jpg`, `${base}textures/water-1k.jpg`]
    : [`${base}textures/earth-4k.jpg`, `${base}textures/clouds-2k.jpg`, `${base}textures/water-1k.jpg`, `${base}textures/bump-1k.jpg`];
  const tex = useLoader(THREE.TextureLoader, urls);
  const [earthMap, cloudMap, waterMap, bumpMap] = tex;
  const gl = useThree((s) => s.gl);
  const A = useAssets(light);

  useMemo(() => {
    const aniso = Math.min(8, gl.capabilities.getMaxAnisotropy());
    earthMap.colorSpace = THREE.SRGBColorSpace;
    [earthMap, cloudMap, waterMap, bumpMap].forEach((t) => { if (t) t.anisotropy = aniso; });
  }, [earthMap, cloudMap, waterMap, bumpMap, gl]);

  const tilt = useRef(), spin = useRef(), clouds = useRef(), wrap = useRef();
  const st = useRef({ vel: reduced ? 0 : AUTO_SPEED, drag: false, lastX: 0, lastT: 0, px: 0, py: 0, cx: 0, cy: 0 });

  // start with India / Asia facing the viewer
  useEffect(() => { if (spin.current) spin.current.rotation.y = (-90 - 72) * (Math.PI / 180); }, []);

  useEffect(() => {
    const el = gl.domElement, s = st.current;
    const down = (e) => { s.drag = true; s.lastX = e.clientX; s.lastT = performance.now(); el.setPointerCapture?.(e.pointerId); el.style.cursor = 'grabbing'; };
    const move = (e) => {
      if (!s.drag || !spin.current) return;
      const now = performance.now(), dx = e.clientX - s.lastX, dt = Math.max(1, now - s.lastT) / 1000;
      const dy = dx * 0.0052;
      spin.current.rotation.y += dy;
      s.vel = THREE.MathUtils.clamp(dy / dt, -5, 5) * 0.6 + s.vel * 0.4;
      s.lastX = e.clientX; s.lastT = now;
    };
    const up = (e) => { s.drag = false; el.releasePointerCapture?.(e.pointerId); el.style.cursor = 'grab'; };
    const hover = (e) => { s.px = (e.clientX / window.innerWidth) * 2 - 1; s.py = (e.clientY / window.innerHeight) * 2 - 1; };
    el.style.cursor = 'grab';
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    window.addEventListener('pointermove', hover, { passive: true });
    return () => {
      el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
      window.removeEventListener('pointermove', hover);
    };
  }, [gl]);

  useEffect(() => {
    let a = requestAnimationFrame(() => { a = requestAnimationFrame(() => onReady && onReady()); });
    return () => cancelAnimationFrame(a);
  }, [onReady]);

  useFrame((_, dt0) => {
    const dt = Math.min(dt0, 0.05), s = st.current;
    if (!s.drag) {
      const target = reduced ? 0 : AUTO_SPEED;
      s.vel += (target - s.vel) * (1 - Math.exp(-dt * 1.6));
      if (spin.current) spin.current.rotation.y += s.vel * dt;
    }
    if (clouds.current && spin.current) clouds.current.rotation.y = spin.current.rotation.y + performance.now() * 0.00003;
    s.cx += (s.px - s.cx) * (1 - Math.exp(-dt * 3));
    s.cy += (s.py - s.cy) * (1 - Math.exp(-dt * 3));
    if (tilt.current) {
      tilt.current.rotation.x = 0.2 + s.cy * 0.06;
      tilt.current.rotation.z = 0.12 - s.cx * 0.05;
    }
    if (wrap.current) wrap.current.position.set(s.cx * 8, -s.cy * 5, 0);
  });

  const sun = useMemo(() => new V3(-0.6, 0.6, 0.85).normalize().multiplyScalar(1100), []);
  const seg = light ? 64 : 128;
  return (
    <group ref={wrap}>
      <Env />
      <ambientLight intensity={1.05} color={0xeaf2ff} />
      <hemisphereLight args={[0xeaf4ff, 0x9bbf8c, 0.45]} />
      <directionalLight
        position={sun} intensity={2.4} color={0xfff2dc} castShadow={!light}
        shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004} shadow-normalBias={0.6}
        shadow-camera-left={-470} shadow-camera-right={470} shadow-camera-top={470} shadow-camera-bottom={-470}
        shadow-camera-near={300} shadow-camera-far={2200}
      />
      <directionalLight position={[500, -200, 400]} intensity={0.3} color={0x9fc6ff} />

      <group ref={tilt} rotation={[0.2, 0, 0.12]}>
        <group ref={spin}>
          <mesh renderOrder={0} receiveShadow>
            <sphereGeometry args={[R, seg, seg]} />
            <meshPhongMaterial map={earthMap} specularMap={waterMap} specular={0x335a78} shininess={24}
              emissive={0xffffff} emissiveMap={earthMap} emissiveIntensity={0.2}
              bumpMap={bumpMap || null} bumpScale={bumpMap ? 2.2 : 0} />
          </mesh>
          {(light ? [PARKS[0], PARKS[1], PARKS[2], PARKS[3]] : PARKS).map((p, i) => (
            <Park key={i} id={i + 1} A={A} reduced={reduced} light={light} {...p} />
          ))}
        </group>
        <mesh ref={clouds} renderOrder={2}>
          <sphereGeometry args={[R * 1.011, seg, seg]} />
          <meshLambertMaterial color={0xffffff} alphaMap={cloudMap} transparent opacity={0.78} depthWrite={false} />
        </mesh>
      </group>
      <Atmosphere />
      <Orbit radius={R * 1.2} rotation={[1.3, 0, 0.45]} reduced={reduced} />
    </group>
  );
}

function FrameGate({ active }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => { if (active) invalidate(); }, [active, invalidate]);
  return null;
}

export default function HeroEarth({ light, active, reduced, onReady }) {
  return (
    <Canvas
      orthographic
      flat
      shadows={!light}
      dpr={light ? 1 : [1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      gl={{ alpha: true, antialias: true, powerPreference: light ? 'default' : 'high-performance' }}
      camera={{ position: [0, 0, 1200], near: 1, far: 4000 }}
      onCreated={({ camera, gl }) => {
        camera.manual = true; // keep our pixel-exact frustum
        camera.left = RECT.x0 - EARTH.cx; camera.right = RECT.x1 - EARTH.cx;
        camera.top = EARTH.cy - RECT.y0; camera.bottom = EARTH.cy - RECT.y1;
        camera.updateProjectionMatrix();
        gl.setClearColor(0x000000, 0);
      }}
      style={{ touchAction: 'pan-y' }}
      aria-hidden="true"
    >
      <React.Suspense fallback={null}>
        <Globe light={light} active={active} reduced={reduced} onReady={onReady} />
      </React.Suspense>
      <FrameGate active={active} />
    </Canvas>
  );
}

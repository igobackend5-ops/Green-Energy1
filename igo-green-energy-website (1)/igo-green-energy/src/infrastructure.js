import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { EARTH } from './earthConfig.js';

/*
  Procedural, physically-plausible renewable-energy infrastructure (solar farm, rooftop solar village,
  wind turbines, anaerobic-digestion biogas plant, small water-treatment plant).
  Everything is expressed in "site-local" coordinates: x = east, y = up (surface normal), z = south,
  units are the same as the globe (radius EARTH.R).  Each piece is merged per material so a whole
  site costs only a handful of draw calls.
*/
const R = EARTH.R;
const V3 = THREE.Vector3, Q = THREE.Quaternion, M4 = THREE.Matrix4, E = THREE.Euler;
const TAU = Math.PI * 2;

export const K = 1.2; // overall scale of the installations relative to the globe
export const sag = (x, z) => -(x * x + z * z) / (2 * R); // surface drop-off of the sphere relative to the tangent plane

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- geometry building blocks ---------- */
const G = {
  box: new THREE.BoxGeometry(1, 1, 1),
  cyl: new THREE.CylinderGeometry(1, 1, 1, 32),
  cone: new THREE.ConeGeometry(1, 1, 24),
  dome: new THREE.SphereGeometry(1, 40, 16, 0, TAU, 0, Math.PI / 2),
  sphere: new THREE.SphereGeometry(1, 20, 14),
  disc: new THREE.CircleGeometry(1, 40)
};

function prep(geo, o = {}) {
  const g = geo.index ? geo.toNonIndexed() : geo.clone();
  const { p = [0, 0, 0], r = [0, 0, 0], s = [1, 1, 1], q } = o;
  const quat = q || new Q().setFromEuler(new E(r[0], r[1], r[2]));
  g.applyMatrix4(new M4().compose(new V3(p[0], p[1], p[2]), quat, new V3(s[0], s[1], s[2])));
  for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal' && k !== 'uv') g.deleteAttribute(k);
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
  return g;
}

class Bag {
  constructor() { this.m = new Map(); }
  // `ground` parts are sunk by the local sphere curvature so they never hover above the surface
  add(key, geo, o = {}) {
    const p = o.p ? o.p.map((v) => v * K) : [0, 0, 0];
    p[1] += sag(p[0], p[2]);
    const s = (o.s || [1, 1, 1]).map((v) => v * K);
    if (!this.m.has(key)) this.m.set(key, []);
    this.m.get(key).push(prep(geo, { ...o, p, s }));
    return this;
  }
  // cylinder between two points
  pipe(key, a, b, radius) {
    const A = new V3(...a), B = new V3(...b), d = B.clone().sub(A), len = d.length();
    const q = new Q().setFromUnitVectors(new V3(0, 1, 0), d.clone().normalize());
    const mid = A.clone().add(B).multiplyScalar(0.5);
    return this.add(key, G.cyl, { p: [mid.x, mid.y, mid.z], q, s: [radius, len, radius] }); // (K applied in add)
  }
  geometries() {
    const out = {};
    for (const [k, list] of this.m) out[k] = mergeGeometries(list, false);
    return out;
  }
}

/* ---------- shared procedural textures ---------- */
function canvasTex(w, h, draw, srgb = true) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

export function makeMaterials() {
  const panelTex = canvasTex(256, 256, (ctx, w, h) => {
    const gr = ctx.createLinearGradient(0, 0, w, h);
    gr.addColorStop(0, '#26479a'); gr.addColorStop(0.5, '#1a3478'); gr.addColorStop(1, '#0f2260');
    ctx.fillStyle = gr; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(205,222,255,.55)'; ctx.lineWidth = 1.6;
    for (let i = 1; i < 12; i++) { ctx.beginPath(); ctx.moveTo((i * w) / 12, 0); ctx.lineTo((i * w) / 12, h); ctx.stroke(); }
    for (let j = 1; j < 6; j++) { ctx.beginPath(); ctx.moveTo(0, (j * h) / 6); ctx.lineTo(w, (j * h) / 6); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(235,240,250,.9)'; ctx.lineWidth = 7; ctx.strokeRect(0, 0, w, h);
  });
  const domeTex = canvasTex(256, 256, (ctx, w, h) => { // double-membrane gas holder: olive-grey with radial seams + rings
    ctx.fillStyle = '#8ea68f'; ctx.fillRect(0, 0, w, h);
    const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(255,255,255,.18)'); g.addColorStop(0.6, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.22)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(40,60,45,.22)'; ctx.lineWidth = 3; // a few soft horizontal folds only
    for (let j = 1; j < 4; j++) { ctx.beginPath(); ctx.moveTo(0, (j * h) / 4); ctx.lineTo(w, (j * h) / 4); ctx.stroke(); }
  });
  const std = (o) => new THREE.MeshStandardMaterial(o);
  return {
    panel: std({ map: panelTex, metalness: 0.55, roughness: 0.22, envMapIntensity: 1.7 }),
    frame: std({ color: 0xc4ccd4, metalness: 0.7, roughness: 0.45 }),
    white: std({ color: 0xf4f6f4, roughness: 0.55 }),
    concrete: std({ color: 0xe6e8e2, roughness: 0.85 }),
    band: std({ color: 0xa8afa7, roughness: 0.85 }),
    membrane: std({ map: domeTex, color: 0xffffff, roughness: 0.42, envMapIntensity: 0.7 }),
    membraneDark: std({ color: 0x2b6f4c, roughness: 0.6 }),
    steel: std({ color: 0xaab4b8, metalness: 0.8, roughness: 0.35, envMapIntensity: 1.2 }),
    roofGray: std({ color: 0x5a646b, roughness: 0.7 }),
    roofRed: std({ color: 0x9c4b3a, roughness: 0.75 }),
    wall: std({ color: 0xf0eadf, roughness: 0.9 }),
    silage: std({ color: 0x9a8550, roughness: 0.95 }),
    tarp: std({ color: 0x2f3b37, roughness: 0.8 }),
    lagoon: std({ color: 0x566a3a, roughness: 0.2, metalness: 0.1 }),
    water: std({ color: 0x2f6a86, roughness: 0.3, metalness: 0.05, envMapIntensity: 0.45 }),
    road: std({ color: 0x70757a, roughness: 0.95 }),
    gravel: std({ color: 0xb3a07e, roughness: 1 }),
    tree: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, flatShading: true }),
    turbine: std({ color: 0xf6f8f7, roughness: 0.42 }),
    turbineRed: std({ color: 0xd9dfe0, roughness: 0.4 })
  };
}

/* ---------- SOLAR FARM: rows of tilted, reflective PV tables on posts ---------- */
export function solarFarmGeometry() {
  const b = new Bag();
  const cols = 6, rows = 5, pw = 13.2, pd = 8.8, tilt = 0.5;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c - (cols - 1) / 2) * 13.9, z = (r - (rows - 1) / 2) * 15.2;
      b.add('panel', G.box, { p: [x, 4.6, z], r: [tilt, 0, 0], s: [pw, 0.55, pd] });
      b.add('frame', G.box, { p: [x, 4.6, z], r: [tilt, 0, 0], s: [pw + 0.35, 0.3, pd + 0.35] });
      for (const dx of [-4.6, 4.6]) {
        b.add('frame', G.box, { p: [x + dx, 1.9, z + 1.8], s: [0.7, 4.2, 0.7] });
        b.add('frame', G.box, { p: [x + dx, 3.2, z - 2.6], s: [0.7, 6.0, 0.7] });
      }
    }
  }
  // gravel access road and inverter / substation building
  b.add('gravel', G.box, { p: [0, 0.25, 50], s: [100, 0.4, 7] });
  b.add('white', G.box, { p: [-46, 3.2, 58], s: [14, 6.4, 9] });
  b.add('roofGray', G.box, { p: [-46, 6.7, 58], s: [14.8, 0.8, 9.8] });
  b.add('steel', G.box, { p: [-28, 3, 58], s: [6, 6, 5] });
  // perimeter fence posts
  for (let i = -5; i <= 5; i++) { b.add('steel', G.cyl, { p: [i * 10, 1.1, 42], s: [0.3, 2.2, 0.3] }); }
  return b.geometries();
}

/* ---------- ROOFTOP SOLAR VILLAGE ---------- */
function gableGeometry(w, h, d) {
  const s = new THREE.Shape();
  s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(0, h); s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: false });
  g.translate(0, 0, -d / 2);
  g.rotateY(Math.PI / 2);
  return g;
}
export function villageGeometry() {
  const b = new Bag();
  const roofH = 3.3, halfD = 4.8, slope = Math.atan(roofH / halfD);
  const gable = gableGeometry(halfD * 2 + 0.8, roofH, 12.4);
  const spots = [[-26, -14], [2, -20], [28, -10], [-30, 14], [0, 8], [30, 18], [-8, 34], [20, 40]];
  const r = rng(7);
  spots.forEach(([x, z], i) => {
    const solar = i % 4 !== 3;
    const bw = 11 + r() * 3, bd = 9.6, bh = 6 + r() * 1.5;
    b.add('wall', G.box, { p: [x, bh / 2, z], s: [bw, bh, bd] });
    b.add(i % 2 ? 'roofRed' : 'roofGray', gable, { p: [x, bh, z], s: [1, 1, bw / 12.4] });
    if (solar) {
      const py = bh + roofH / 2 + 0.45, pz = z + halfD / 2 + 0.25;
      b.add('panel', G.box, { p: [x, py, pz], r: [slope, 0, 0], s: [bw - 2.2, 0.35, 4.3] });
      b.add('frame', G.box, { p: [x, py - 0.05, pz], r: [slope, 0, 0], s: [bw - 1.9, 0.25, 4.6] });
    }
    b.add('tarp', G.box, { p: [x + bw * 0.2, 2, z + bd / 2 + 0.08], s: [2.4, 4, 0.2] }); // door
  });
  b.add('road', G.box, { p: [0, 0.22, 1], s: [90, 0.35, 4.5] });
  return b.geometries();
}

/* ---------- BIOGAS PLANT: anaerobic digesters with gas-storage membrane domes, pipework, CHP ---------- */
export function biogasGeometry() {
  const b = new Bag();
  const tank = (x, z, rad, h, domeK) => {
    b.add('concrete', G.cyl, { p: [x, h / 2 - 1.5, z], s: [rad, h + 3, rad] });
    for (let k = 1; k <= 2; k++) b.add('band', G.cyl, { p: [x, (h * k) / 3, z], s: [rad * 1.012, 0.55, rad * 1.012] });
    b.add('steel', G.cyl, { p: [x, h + 0.25, z], s: [rad * 1.02, 0.6, rad * 1.02] });
    b.add('membrane', G.dome, { p: [x, h + 0.4, z], s: [rad * 0.99, rad * domeK, rad * 0.99] });
    b.add('membraneDark', G.cyl, { p: [x, h + rad * domeK + 0.2, z], s: [rad * 0.1, 1.2, rad * 0.1] });
    // inspection stairs / ladder
    b.add('steel', G.box, { p: [x + rad + 0.3, h / 2, z], s: [0.5, h, 1.1] });
  };
  tank(-28, -8, 22, 17, 0.4);
  tank(22, -16, 22, 17, 0.4);
  tank(-4, 26, 14, 13, 0.5);
  // gas / feed pipework
  b.pipe('steel', [-6, 6, -9], [0, 6, -15], 1.3);
  b.pipe('steel', [-28, 6.5, 14], [-10, 6.5, 26], 1.2);
  b.pipe('steel', [22, 6.5, 6], [8, 6.5, 26], 1.2);
  b.pipe('steel', [10, 8, 26], [36, 8, 26], 1.3);
  b.pipe('steel', [-6, 17.6, -8.4], [6, 17.6, -15], 0.8); // gas header between domes
  for (const [x, z] of [[-10, 26], [36, 26]]) b.pipe('steel', [x, 0, z], [x, 8, z], 1.1);
  // CHP / gas treatment building + stack
  b.add('wall', G.box, { p: [48, 5.5, 26], s: [34, 11, 15] });
  b.add('roofGray', G.box, { p: [48, 11.6, 26], s: [35, 1.2, 16] });
  b.add('steel', G.cyl, { p: [60, 11, 18], s: [1.4, 22, 1.4] });
  b.add('concrete', G.box, { p: [34, 3, 46], s: [13, 6, 5.5] });
  b.add('concrete', G.box, { p: [50, 3, 46], s: [13, 6, 5.5] });
  b.add('steel', G.box, { p: [34, 6.2, 46], s: [12, 0.5, 5] });
  b.add('steel', G.box, { p: [50, 6.2, 46], s: [12, 0.5, 5] });
  // gas flare
  b.add('steel', G.cyl, { p: [20, 8, 44], s: [0.6, 16, 0.6] });
  b.add('steel', G.cone, { p: [20, 17, 44], s: [1.6, 3, 1.6] });
  // agricultural feedstock: silage clamps (tarp covered), slurry lagoon, slurry pit
  b.add('silage', G.box, { p: [-46, 1.6, 40], s: [32, 3.2, 14] });
  b.add('tarp', G.box, { p: [-46, 3.5, 40], s: [32.6, 0.5, 14.6] });
  b.add('silage', G.box, { p: [-46, 1.6, 58], s: [32, 3.2, 14] });
  b.add('tarp', G.box, { p: [-46, 3.5, 58], s: [32.6, 0.5, 14.6] });
  b.add('lagoon', G.disc, { p: [-58, 0.28, -24], r: [-Math.PI / 2, 0, 0], s: [16, 16, 1] });
  b.add('road', G.box, { p: [2, 0.22, 62], s: [110, 0.35, 5] });
  b.add('road', G.box, { p: [-1, 0.22, 36], s: [5, 0.35, 52] });
  return b.geometries();
}

/* ---------- WATER TREATMENT / RO (secondary, compact) ---------- */
export function waterGeometry() {
  const b = new Bag();
  const clarifier = (x, z, rad) => {
    b.add('white', G.cyl, { p: [x, 2.2, z], s: [rad, 5.6, rad] });
    b.add('water', G.disc, { p: [x, 5.05, z], r: [-Math.PI / 2, 0, 0], s: [rad * 0.88, rad * 0.88, 1] });
    b.add('steel', G.box, { p: [x, 5.5, z], s: [rad * 1.8, 0.45, 0.9] });
    b.add('steel', G.cyl, { p: [x, 5, z], s: [0.9, 1.4, 0.9] });
  };
  clarifier(-14, 0, 15);
  clarifier(12, 14, 9.5);
  b.add('wall', G.box, { p: [14, 4.5, -16], s: [26, 9, 13] });
  b.add('roofGray', G.box, { p: [14, 9.3, -16], s: [27, 0.8, 14] });
  b.add('steel', G.cyl, { p: [-2, 4, -16], r: [0, 0, Math.PI / 2], s: [2.2, 8, 2.2] }); // RO pressure vessels
  b.add('steel', G.cyl, { p: [-2, 4, -21], r: [0, 0, Math.PI / 2], s: [2.2, 8, 2.2] });
  b.pipe('steel', [-14, 3, 14], [4, 3, 12], 0.8);
  return b.geometries();
}

/* ---------- WIND TURBINE (shared geometries; each turbine is 2 draw calls) ---------- */
function bladeGeometry(L) {
  const s = new THREE.Shape();
  s.moveTo(0, -2.2); s.lineTo(L * 0.1, -4.8);
  s.quadraticCurveTo(L * 0.3, -3.6, L, -0.6);
  s.lineTo(L, 0.5);
  s.quadraticCurveTo(L * 0.4, 1.9, L * 0.12, 2.6);
  s.lineTo(0, 1.6); s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.9, bevelEnabled: false, curveSegments: 12 });
  g.translate(0, 0, -0.45);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i), a = (1 - x / L) * 0.55; // aerodynamic twist
    p.setY(i, y * Math.cos(a) - z * Math.sin(a));
    p.setZ(i, y * Math.sin(a) + z * Math.cos(a));
  }
  g.computeVertexNormals();
  return g;
}
export const TURBINE = { tower: 78, blade: 42, hubZ: 7 };
export function turbineGeometries() {
  const { tower, blade, hubZ } = TURBINE;
  const st = new Bag();
  // tapered tower (built as a lathe so the taper is real), nacelle, hub spinner
  const tw = new THREE.CylinderGeometry(1.7, 3.1, tower, 28);
  st.m.set('turbine', [prep(tw, { p: [0, tower / 2 - 1, 0] })]);
  st.m.get('turbine').push(prep(G.box, { p: [0, tower, 1.4], s: [5.2, 5.2, 13] }));
  st.m.get('turbine').push(prep(G.sphere, { p: [0, tower, hubZ - 0.4], s: [2.8, 2.8, 3.4] }));
  st.m.get('turbine').push(prep(G.cyl, { p: [0, 0.6, 0], s: [3.2, 1.8, 3.2] }));
  const bl = bladeGeometry(blade);
  const parts = [0, 1, 2].map((i) => prep(bl, { p: [0, 0, 0], r: [0, 0, (i * TAU) / 3 + Math.PI / 2], s: [1, 1, 1] }));
  // push blade root outwards a little so they start at the hub
  const blades = mergeGeometries(parts.map((g, i) => {
    const gg = g.clone(); const a = (i * TAU) / 3 + Math.PI / 2;
    gg.translate(Math.cos(a) * 2.2, Math.sin(a) * 2.2, 0); return gg;
  }), false);
  return { tower: mergeGeometries(st.m.get('turbine'), false), blades };
}

/* ---------- TREES (instanced) ---------- */
export function treeInstances(seed, count, spots) {
  const r = rng(seed), out = [];
  for (let i = 0; i < count; i++) {
    const [cx, cz, rmin, rmax] = spots[Math.floor(r() * spots.length)];
    const a = r() * TAU, d = rmin + r() * (rmax - rmin), s = 2.6 + r() * 3.4;
    const x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
    out.push({ x, z, s, c: 0.78 + r() * 0.4, h: r() });
  }
  return out;
}

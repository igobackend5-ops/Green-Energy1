import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, AdditiveBlending, BackSide, Color } from 'three';
import { OrbitControls } from '@react-three/drei';

function Earth() {
  const earthRef = useRef();
  const cloudsRef = useRef();

  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);

  useFrame(({ clock, mouse }) => {
    const elapsedTime = clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = elapsedTime * 0.05 + mouse.x * 0.1;
      earthRef.current.rotation.x = mouse.y * 0.1;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = elapsedTime * 0.07 + mouse.x * 0.1;
      cloudsRef.current.rotation.x = mouse.y * 0.1;
    }
  });

  return (
    <group>
      {/* Earth */}
      <mesh ref={earthRef} rotation={[0.2, 0, 0]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          shininess={15}
        />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudsRef} rotation={[0.2, 0, 0]}>
        <sphereGeometry args={[2.02, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.6}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere Glow */}
      <mesh>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshBasicMaterial
          color={new Color(0x3399ff)}
          transparent={true}
          opacity={0.15}
          side={BackSide}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function OrbitRings() {
  const ringsRef = useRef();
  useFrame(({ clock }) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ringsRef} rotation={[Math.PI / 2.5, 0, 0]}>
      <mesh>
        <ringGeometry args={[2.6, 2.61, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} side={2} />
      </mesh>
      <mesh rotation={[Math.PI / 12, 0, 0]}>
        <ringGeometry args={[3.0, 3.01, 64]} />
        <meshBasicMaterial color="#00ffcc" transparent opacity={0.2} side={2} />
      </mesh>
      
      {/* Energy Particles */}
      <mesh position={[2.6, 0, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 2.6, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      <group rotation={[Math.PI / 12, 0, 0]}>
        <mesh position={[-3.0, 0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#00ffcc" />
        </mesh>
        <mesh position={[0, -3.0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#00ffcc" />
        </mesh>
      </group>
    </group>
  );
}

export default function EarthVisual() {
  return (
    <div className="earthStage earthStage3D">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 3, 5]} intensity={2.0} color="#ffffff" />
        <pointLight position={[-5, -3, -5]} intensity={0.4} color="#aaddff" />
        <React.Suspense fallback={null}>
          <Earth />
        </React.Suspense>
        <OrbitRings />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
      <div className="float f1"><b>☼ SOLAR ENERGY</b><span>Clean power for a brighter tomorrow.</span></div>
      <div className="float f2"><b>✧ WIND ENERGY</b><span>Harnessing the power of nature.</span></div>
      <div className="float f3"><b>◉ SUSTAINABLE WATER</b><span>Safe water for healthier communities.</span></div>
      <div className="float f4"><b>◌ BIOGAS SOLUTIONS</b><span>Turning waste into clean energy.</span></div>
    </div>
  );
}

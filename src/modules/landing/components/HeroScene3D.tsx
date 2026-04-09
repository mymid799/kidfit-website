import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating pencil shape
function Pencil({ position, rotation, color }: { position: [number, number, number]; rotation: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3 + position[1]) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <cylinderGeometry args={[0.06, 0.06, 1.2, 8]} />
        <meshStandardMaterial color={color} />
        {/* Pencil tip */}
        <mesh position={[0, 0.7, 0]}>
          <coneGeometry args={[0.06, 0.2, 8]} />
          <meshStandardMaterial color="#F5D0A9" />
        </mesh>
      </mesh>
    </Float>
  );
}

// Floating star
function Star({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.8;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.5;
    }
  });

  const starShape = useMemo(() => {
    const shape = new THREE.Shape();
    const outerRadius = 0.3 * scale;
    const innerRadius = 0.12 * scale;
    const points = 5;
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
      if (i === 0) shape.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      else shape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
    shape.closePath();
    return shape;
  }, [scale]);

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <extrudeGeometry args={[starShape, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 3 }]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
    </Float>
  );
}

// Floating bubble/sphere
function Bubble({ position, color, size = 0.3 }: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7 + position[0] * 2) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.3}
          radius={1}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

// Floating book
function Book({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.4 + 0.3;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={meshRef} position={position}>
        {/* Book cover */}
        <mesh>
          <boxGeometry args={[0.6, 0.8, 0.08]} />
          <meshStandardMaterial color="#4CAE4F" />
        </mesh>
        {/* Pages */}
        <mesh position={[0.02, 0, 0]}>
          <boxGeometry args={[0.54, 0.74, 0.06]} />
          <meshStandardMaterial color="#FFF8E1" />
        </mesh>
      </group>
    </Float>
  );
}

// Floating gear/cog
function Gear({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.2, 0.06, 8, 6]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>
    </Float>
  );
}

// Rainbow arc
function RainbowArc({ position }: { position: [number, number, number] }) {
  const colors = ['#FF6B6B', '#FFA726', '#FFEE58', '#66BB6A', '#42A5F5', '#AB47BC'];
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={meshRef} position={position} rotation={[0, 0, 0.3]}>
        {colors.map((color, i) => (
          <mesh key={i} position={[0, 0, -i * 0.02]}>
            <torusGeometry args={[0.6 + i * 0.08, 0.035, 16, 32, Math.PI]} />
            <meshStandardMaterial color={color} transparent opacity={0.8} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#FFF8E1" />
      <pointLight position={[-3, 2, 4]} intensity={0.5} color="#90CAF9" />
      <pointLight position={[3, -2, 3]} intensity={0.4} color="#F48FB1" />

      {/* Objects */}
      <Pencil position={[-2.5, 1.5, 0]} rotation={[0, 0, 0.5]} color="#FF7043" />
      <Pencil position={[2.8, -1.2, -1]} rotation={[0, 0, -0.3]} color="#42A5F5" />
      <Pencil position={[-1, -1.8, 0.5]} rotation={[0, 0, 1.2]} color="#66BB6A" />

      <Star position={[-2, -0.5, 0.5]} color="#FFD54F" scale={1} />
      <Star position={[2.2, 1.8, -0.5]} color="#FF8A65" scale={0.7} />
      <Star position={[0.5, -2.2, 0]} color="#CE93D8" scale={0.5} />

      <Bubble position={[-1.5, 0.8, 1]} color="#90CAF9" size={0.25} />
      <Bubble position={[1.8, 0.3, 0.5]} color="#F48FB1" size={0.18} />
      <Bubble position={[0, 2, -0.5]} color="#A5D6A7" size={0.35} />
      <Bubble position={[-2.8, -1, 0]} color="#FFE082" size={0.2} />
      <Bubble position={[3, 0.8, 0.3]} color="#CE93D8" size={0.15} />

      <Book position={[2.5, 0, 0.5]} />
      
      <Gear position={[-2.8, 0.5, -0.5]} color="#78909C" />
      <Gear position={[1, 2.2, 0]} color="#FFB74D" />

      <RainbowArc position={[0, 1, -2]} />
    </>
  );
}

// Exported component
export default function HeroScene3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

// ─── Category configuration ────────────────────────────────────────────────
type CategoryConfig = {
  color: string;
  geometry: 'torusKnot' | 'icosahedron' | 'octahedron' | 'sphere' | 'box' | 'torus';
};

const CATEGORY_CONFIG: CategoryConfig[] = [
  { color: '#7c3aed', geometry: 'torusKnot'   },
  { color: '#2563eb', geometry: 'icosahedron'  },
  { color: '#059669', geometry: 'octahedron'   },
  { color: '#db2777', geometry: 'sphere'       },
  { color: '#ea580c', geometry: 'box'          },
  { color: '#d97706', geometry: 'torus'        },
];

// ─── Geometry helper ────────────────────────────────────────────────────────
function buildGeometry(type: CategoryConfig['geometry']): THREE.BufferGeometry {
  switch (type) {
    case 'torusKnot':   return new THREE.TorusKnotGeometry(1, 0.4, 128, 16);
    case 'icosahedron': return new THREE.IcosahedronGeometry(1.4, 1);
    case 'octahedron':  return new THREE.OctahedronGeometry(1.5, 0);
    case 'sphere':      return new THREE.SphereGeometry(1.4, 64, 64);
    case 'box':         return new THREE.BoxGeometry(2, 2, 2);
    case 'torus':       return new THREE.TorusGeometry(1.1, 0.45, 32, 100);
    default:            return new THREE.TorusKnotGeometry(1, 0.4, 128, 16);
  }
}

// ─── Scene ──────────────────────────────────────────────────────────────────
interface SceneProps {
  activeCategory: number;
}

function Scene({ activeCategory }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [currentCategory, setCurrentCategory] = useState(activeCategory);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x += 0.001;
    }
  });

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    gsap.to(mesh.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentCategory(activeCategory);

        gsap.to(mesh.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.7,
          ease: 'elastic.out(1, 0.5)',
        });
      },
    });
  }, [activeCategory]);

  const config = CATEGORY_CONFIG[currentCategory];

  return (
    <group>
      <mesh ref={meshRef} position={[0.5, 0.3, 0]} scale={2.2} key={currentCategory}>
        <primitive object={buildGeometry(config.geometry)} attach="geometry" />
        <meshPhysicalMaterial
          color={config.color}
          metalness={0.9}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.05}
          ior={1.5}
          reflectivity={1}
        />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[8, 6, 4]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-5, -5, -3]} intensity={0.6} color={config.color} />
      <pointLight position={[5, 5, 3]}   intensity={0.4} color="#ffffff" />
      <pointLight position={[0, 0, 6]}   intensity={0.3} color={config.color} />
    </group>
  );
}

// ─── Background3D ────────────────────────────────────────────────────────────
interface Background3DProps {
  activeCategory: number;
}

export default function Background3D({ activeCategory }: Background3DProps) {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="w-full h-full"
        dpr={[1, 2]}
        style={{ pointerEvents: 'none' }}
      >
        <Scene activeCategory={activeCategory} />
      </Canvas>
    </div>
  );
}

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const PokemonModel: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  const gltf = useGLTF(modelPath);

  React.useMemo(() => {
    gltf.scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        if (mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          material.metalness = 0;
          material.alphaTest = 0.5;
          material.transparent = true;
        }
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} scale={0.01} position={[0, -0.5, 0]} />;
};

const Pokemon3D: React.FC<{ modelPath: string }> = ({ modelPath }) => (
  <Canvas camera={{ position: [0.5, 0.5, 2], fov: 25 }}>
    <Suspense fallback={null}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 5, 5]} intensity={2} />
      <directionalLight position={[5, -5, 5]} intensity={2} />
      <directionalLight position={[5, 5, -5]} intensity={2} />
      <PokemonModel modelPath={modelPath} />
      <OrbitControls
        enableDamping
        dampingFactor={0.25}
        minDistance={2}
        maxDistance={6}
        enablePan={false}
      />
    </Suspense>
  </Canvas>
);

export default Pokemon3D;

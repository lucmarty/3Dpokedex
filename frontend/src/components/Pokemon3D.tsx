import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const PokemonModel: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  const gltf = useGLTF(modelPath);

  useEffect(() => {
    if (gltf.scene) {
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const size = new THREE.Vector3();
      box.getSize(size);

      const delta = Math.min(1.0 / size.x, 1.0 / size.y, 1.0 / size.z);
      gltf.scene.scale.set(delta, delta, delta);
    }
  });

  React.useMemo(() => {
    gltf.scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        if (mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          material.metalness = 0;
          material.alphaTest = 0.5;
          material.transparent = true;
          if (material.map) {
            if (material.map.name.includes("Fire")) {
              material.color.set("orange");
              material.emissive.set("red");
              material.alphaMap = material.map;
              material.opacity = 0.5;
            }
            if (material.map.name.includes("Beto")) {
              material.color.set("#DDA0DD");
            }
          }
        }
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} position={[0, -0.2, 0]} />;
};

const Pokemon3D: React.FC<{ modelPath: string }> = ({ modelPath }) => (
  <Canvas
    camera={{ fov: 40, position: [0, 0, 2] }}
    style={{ background: "transparent" }}
  >
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
        minDistance={1}
        maxDistance={6}
        enablePan={false}
        autoRotate
      />
    </Suspense>
  </Canvas>
);

export default Pokemon3D;

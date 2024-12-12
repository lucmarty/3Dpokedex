import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const PokemonModel: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  const gltf = useGLTF(modelPath);

  useEffect(() => {
    if (gltf.scene) {
      // Calculate scale based on bounding box
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const size = new THREE.Vector3();
      box.getSize(size);

      const delta = Math.min(
        size.x > 0 ? 1.0 / size.x : 1,
        size.y > 0 ? 1.0 / size.y : 1,
        size.z > 0 ? 1.0 / size.z : 1
      );
      gltf.scene.scale.set(delta, delta, delta);

      console.log("Calculated scale:", gltf.scene.scale);

      // Traverse the scene and adjust materials
      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            const material = mesh.material as THREE.MeshStandardMaterial;
            material.metalness = 0;
            material.alphaTest = 0.5;
            material.transparent = true;

            if (material.map) {
              const textureName = material.map.name || "";
              if (textureName.includes("Fire")) {
                material.color.set("orange");
                material.emissive.set("red");
                material.alphaMap = material.map;
                material.opacity = 0.5;
              }
              if (textureName.includes("Beto")) {
                material.color.set("#DDA0DD");
              }
            }
          }
        }
      });
    }
  }, [gltf]);

  return <primitive object={gltf.scene} position={[0, -0.2, 0]} />;
};

const Pokemon3D: React.FC<{ modelPath: string }> = ({ modelPath }) => (
  <Canvas
    camera={{ fov: 40, position: [0, 0, 2] }}
    className="absolute bg-transparent"
  >
    <Suspense fallback={null}>
      <ambientLight intensity={0.8} />
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

import React, { useEffect } from "react";
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

      const delta = Math.min(1.0 / size.x, 1.0 / size.y, 1.0 / size.z);
      gltf.scene.scale.set(delta, delta, delta);

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

  return <primitive object={gltf.scene} scale={0.25} position={[0, -1.5, 0]} />;
};

const Pokemon3D: React.FC<{ modelPath: string }> = ({ modelPath }) => (
  <Canvas style={{ background: "transparent" }} shadows key={modelPath}>
          <ambientLight intensity={1} />
          <directionalLight position={[-5, 5, 5]} intensity={1} castShadow />
          <directionalLight position={[5, 5, -5]} intensity={1} castShadow />
          <OrbitControls
            enableDamping
            dampingFactor={0.25}
            minDistance={2}
            maxDistance={6}
            autoRotate
            autoRotateSpeed={0.8}
          />
          <PokemonModel modelPath={modelPath} />
        </Canvas>
);

export default Pokemon3D;

import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useParams } from "react-router-dom";

/**
 * Chargement du modèle 3D via Drei's useGLTF
 */
const PokemonModel: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  const gltf = useGLTF(modelPath);

  return (
    <primitive
      object={gltf.scene}
      scale={0.01} // Ajuster l'échelle
      position={[0, -0.5, 0]} // Ajuster la position si nécessaire
    />
  );
};

const Pokemon: React.FC = () => {
  const { pokemon } = useParams<{ pokemon: string }>();
  const modelPath = useMemo(
    () => `/models/${pokemon}/${pokemon}.glb`,
    [pokemon]
  );

  if (!pokemon) {
    return <div>Pokémon non spécifié</div>;
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
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
    </div>
  );
};

export default Pokemon;

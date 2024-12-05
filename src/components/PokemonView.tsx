import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

interface PokemonViewerProps {
  modelPath: string;
}

const PokemonViewer: React.FC<PokemonViewerProps> = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath); // Charge le modèle 3D

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <OrbitControls />
      <primitive object={scene} /> {/* Charge le modèle */}
    </Canvas>
  );
};

export default PokemonViewer;

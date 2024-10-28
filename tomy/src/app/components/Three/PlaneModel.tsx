import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';


interface AirplaneProps {
    castShadow?: boolean;
    receiveShadow?: boolean;
  }
// Remplace le chemin du fichier par celui de ton modèle dans le dossier public
const PlaneModel: React.FC<AirplaneProps> = ({ castShadow, receiveShadow }) => {
  const { scene } = useGLTF('/three/logo.glb'); // chemin du modèle

  return (
    <mesh >
        <primitive object={scene} scale={1} />;
  </mesh>
  )
};

export default PlaneModel;

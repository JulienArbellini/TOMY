import React from 'react';
import { useGLTF } from '@react-three/drei';

// Remplace le chemin du fichier par celui de ton modèle dans le dossier public
const PlaneModel = () => {
  const { scene } = useGLTF('/three/logo.glb'); // chemin du modèle
  

  return <primitive object={scene} scale={20} />;
};

export default PlaneModel;

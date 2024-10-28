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
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xcccccc,
    metalness: 0.7,
    roughness: 0.3,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
  });

  return (
    <mesh material={material}>
        <primitive object={scene} scale={5} />;
  </mesh>
  )
};

export default PlaneModel;

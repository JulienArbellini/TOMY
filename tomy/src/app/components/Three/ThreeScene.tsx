import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Mesh } from 'three';
import Airplane from './PlaneModel';

const Scene = () => {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const targetRef = useRef<Mesh>(null);  // Typage explicite pour un Mesh

  useEffect(() => {
    if (directionalLightRef.current && targetRef.current) {
      directionalLightRef.current.target = targetRef.current;
    }
  }, []);

  return (
    <Canvas shadows camera={{ position: [200,0, 0], fov: 10 }}>
      {/* Lumières supplémentaires */}
      <ambientLight intensity={1} color="red" />
      <directionalLight
        ref={directionalLightRef}
        position={[50, 50, 10]}
        intensity={10}
        castShadow
        shadow-mapSize-width={2024}
        shadow-mapSize-height={1024}
      />

      {/* Cible de la lumière directionnelle */}
 

      {/* Environnement HDRI */}
      <Environment preset="sunset" />

      {/* Modèle d'avion */}
      <Airplane castShadow receiveShadow />

      {/* Contrôles de caméra */}
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;

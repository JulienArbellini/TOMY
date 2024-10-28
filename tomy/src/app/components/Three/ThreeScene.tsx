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
    <Canvas shadows camera={{ position: [0,0, 30], fov: 110 }}>
      {/* Lumières supplémentaires */}
      <ambientLight intensity={1} color={0xffffff} />
      <directionalLight
        ref={directionalLightRef}
        position={[10, 10, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Cible de la lumière directionnelle */}
      <mesh ref={targetRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="red" />
      </mesh>

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

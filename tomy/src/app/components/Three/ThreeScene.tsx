import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Airplane from './PlaneModel';

const Scene = () => {
  const directionalLightRef = useRef();
  const targetRef = useRef();

  useEffect(() => {
    if (directionalLightRef.current && targetRef.current) {
      directionalLightRef.current.target = targetRef.current;
    }
  }, []);

  return (
    <Canvas camera={{ position: [10, 1, 5], fov: 75 }}>
      {/* Lumières */}
      <ambientLight intensity={1} color={0xffffff} />
      <directionalLight
        ref={directionalLightRef}
        position={[10, 10, 10]}
        intensity={100}
      />
      <object3D ref={targetRef} position={[0, 0, 0]} />

      {/* Modèle */}
      <Airplane />

      {/* Contrôles de caméra */}
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;

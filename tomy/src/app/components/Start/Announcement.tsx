"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface AnnouncementProps {
  audioUrl: string; // URL du son 2
}

export default function Announcement({ audioUrl }: AnnouncementProps) {
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  // Animation de clignotement
  const animationProps = useSpring({
    opacity: isVisible ? 1 : 0,
    config: { duration: 100 },
  });

  useEffect(() => {
    // Créer un contexte audio
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audioElement = new Audio(audioUrl);
    const source = audioContext.createMediaElementSource(audioElement);
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 256; // Taille de la fenêtre d'analyse
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    audioRef.current = audioElement;
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;

    // Jouer le son
    audioElement.play();

    // Mettre à jour la visibilité en fonction de l'amplitude
    const updateVisibility = () => {
      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;
        setIsVisible(average < 90); // Définir un seuil pour le clignotement
      }
      requestAnimationFrame(updateVisibility); // Boucle d'animation
    };

    updateVisibility();

    return () => {
      audioElement.pause();
      audioElement.src = "";
      audioContext.close();
    };
  }, [audioUrl]);

  return (
    <animated.div
      style={animationProps}
      className="w-[560px] h-[98px] flex justify-center items-center bg-slate-300"
    >
      <div
        style={{
          fontFamily: 'monospace', // Police monospace
          letterSpacing: '7px', // Espacement des lettres
        }}
        className="bg-black text-white p-2 h-full w-full text-6xl flex justify-center items-center"
      >
        <p>ANNOUNCEMENT</p>
      </div>
    </animated.div>
  );
}
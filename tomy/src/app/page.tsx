"use client";

import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ThreeDButton from './components/Start/ThreeDButton';
import Announcement from './components/Start/Announcement';
import VideoPlayer from './components/Start/VideoPlayer';
import DynamicButton from './components/DynamicButton/DynamicButton';

export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [currentStep, setCurrentStep] = useState(0); // Variable pour suivre l'étape actuelle

  const [audio1, setAudio1] = useState<HTMLAudioElement | null>(null);
  const [audio2, setAudio2] = useState<HTMLAudioElement | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const changeBackground = () => {
    const backgroundDiv = document.querySelector('div.relative');
    if (backgroundDiv instanceof HTMLElement) {
      backgroundDiv.style.backgroundImage = "url('/images/album/wood.jpg')";
    }
  };

  const nextStep = (step: number) => {
    switch (step) {
      case 1:
        // Arrêter l'audio1 s'il existe
        if (audio1) {
          audio1.pause();
          audio1.currentTime = 0;
          setAudio1(null);
        }

        // Jouer le son 1
        const newAudio1 = new Audio('/sounds/1_BuzzAvion.wav');
        setAudio1(newAudio1);
        newAudio1.play();
        newAudio1.onended = () => {
          setCurrentStep(2);
          nextStep(2);
        };
        break;

      case 2:
        // Afficher l'annonce
        setShowAnnouncement(true);

        // Arrêter l'audio2 s'il existe
        if (audio2) {
          audio2.pause();
          audio2.currentTime = 0;
          setAudio2(null);
        }

        // Jouer le son 2
        const newAudio2 = new Audio('/sounds/2_Announcement.wav');
        setAudio2(newAudio2);
        newAudio2.play();
        newAudio2.onended = () => {
          // Masquer l'annonce et passer à l'étape suivante
          setShowAnnouncement(false);
          setCurrentStep(3);
          nextStep(3);
        };
        break;

      case 3:
        // Afficher la vidéo
        setShowVideo(true);
        break;

      default:
        break;
    }
  };

  const handleButtonClick = () => {
    // Changer l'arrière-plan immédiatement après le clic sur le bouton 3D
    changeBackground();

    // Masquer le bouton
    setShowButton(false);
    
    // Démarrer l'étape 1
    setCurrentStep(1);
    nextStep(1);
  };

  const handleSkipClick = () => {
    // Simuler la fin de l'audio actuel
    if (currentStep === 1 && audio1) {
      audio1.pause();
      audio1.currentTime = 0;
      setAudio1(null);
      setCurrentStep(2);
      nextStep(2); // Passer à l'étape suivante
    } else if (currentStep === 2 && audio2) {
      audio2.pause();
      audio2.currentTime = 0;
      setAudio2(null);
      setShowAnnouncement(false);
      setCurrentStep(3);
      nextStep(3); // Passer à la vidéo
    } else if (currentStep < 3) {
      // Si aucun audio n'est actif, passer à l'étape suivante directement
      setCurrentStep(currentStep + 1);
      nextStep(currentStep + 1);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-cover bg-[url('/vectors/ELEMENTS/FondDEcran.jpg')]">
      <div className="flex flex-col justify-center items-center h-full w-full">
        <AnimatePresence>
          {showButton && (
            <motion.div
              key="button-container"
              exit={{ opacity: 0, transition: { duration: 1 } }}
              onClick={handleButtonClick}
            >
              <ThreeDButton href="/home" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAnnouncement && <Announcement />}
        </AnimatePresence>

        <AnimatePresence>
          {showVideo && <VideoPlayer key="video" />}
        </AnimatePresence>

        {/* Bouton Skip toujours visible */}
        <DynamicButton
          defaultIcon="/vectors/ELEMENTS/BoutonsDivers/Skip.png"
          hoverIcon="/vectors/ELEMENTS/BoutonsDivers/SkipOver.png"
          clickedIcon="/vectors/ELEMENTS/BoutonsDivers/skip-click.png"
          releasedIcon="/vectors/ELEMENTS/BoutonsDivers/skip-release.png"
          onClick={handleSkipClick}
          style={{
            bottom: '10px',
            right: '10px',
            height: 'auto',
            width: '120px',
            zIndex: 1000,
          }}
        />
      </div>
    </div>
  );
}

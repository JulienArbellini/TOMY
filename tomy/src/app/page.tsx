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
  const [currentStep, setCurrentStep] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState('/vectors/ELEMENTS/FondDEcran.jpg');

  const [audio1, setAudio1] = useState<HTMLAudioElement | null>(null);
  const [audio2, setAudio2] = useState<HTMLAudioElement | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const changeBackground = () => {
    setBackgroundImage('/images/bg2.png'); // Mettre à jour l'image d'arrière-plan
  };

  const nextStep = (step: number) => {
    switch (step) {
      case 1:
        if (audio1) {
          audio1.pause();
          audio1.currentTime = 0;
          setAudio1(null);
        }
        const newAudio1 = new Audio('/sounds/1_BuzzAvion.wav');
        setAudio1(newAudio1);
        newAudio1.play();
        newAudio1.onended = () => {
          setCurrentStep(2);
          nextStep(2);
        };
        break;

      case 2:
        setShowAnnouncement(true);
        changeBackground(); // Changer le fond d'écran avec un effet
        if (audio2) {
          audio2.pause();
          audio2.currentTime = 0;
          setAudio2(null);
        }
        const newAudio2 = new Audio('/sounds/2_Announcement.wav');
        setAudio2(newAudio2);
        newAudio2.play();
        newAudio2.onended = () => {
          setShowAnnouncement(false);
          setCurrentStep(3);
          nextStep(3);
        };
        break;

      case 3:
        setShowVideo(true);
        break;

      default:
        break;
    }
  };

  const handleButtonClick = () => {
    changeBackground(); // Changer l'arrière-plan immédiatement
    setShowButton(false);
    setCurrentStep(1);
    nextStep(1);
  };

  const handleSkipClick = () => {
    if (currentStep === 1 && audio1) {
      audio1.pause();
      audio1.currentTime = 0;
      setAudio1(null);
      setCurrentStep(2);
      nextStep(2);
    } else if (currentStep === 2 && audio2) {
      audio2.pause();
      audio2.currentTime = 0;
      setAudio2(null);
      setShowAnnouncement(false);
      setCurrentStep(3);
      nextStep(3);
    } else if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      nextStep(currentStep + 1);
    }
  };

  return (
    <motion.div
      className="relative w-screen h-screen bg-cover"
      initial={{ opacity: 0 }} // Début de l'animation (invisible)
      animate={{ opacity: 1 }} // Fin de l'animation (visible)
      exit={{ opacity: 0 }} // Animation de sortie (facultative)
      transition={{ duration: 1.5 }} // Durée de l'effet de fondu
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
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

        <DynamicButton
          defaultIcon="/vectors/ELEMENTS/BoutonsDivers/Skip.png"
          hoverIcon="/vectors/ELEMENTS/BoutonsDivers/SkipOver.png"
          clickedIcon="/vectors/ELEMENTS/BoutonsDivers/SkipClic.png"
          releasedIcon="/vectors/ELEMENTS/BoutonsDivers/SkipOver.png"
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
    </motion.div>
  );
}
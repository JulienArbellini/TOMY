"use client";

import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ThreeDButton from './components/Start/ThreeDButton';
import Announcement from './components/Start/Announcement';
import VideoPlayer from './components/Start/VideoPlayer';
import DynamicButton from './components/DynamicButton/DynamicButton';
import Background from './components/Background';
import { a } from '@react-spring/web';

export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const [backgroundImages, setBackgroundImages] = useState([
    // '/vectors/ELEMENTS/FondDEcran.jpg', // Fond 1 (bg1)
    '/images/bg2.avif', // Fond 2 (bg2)
  ]);
  const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0); // Index du fond actif
  const [isBg2Visible, setIsBg2Visible] = useState(false); // Gérer la visibilité de bg2

  const [audio1, setAudio1] = useState<HTMLAudioElement | null>(null);
  const [audio2, setAudio2] = useState<HTMLAudioElement | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const changeBackgroundToBg2 = () => {
    setIsBg2Visible(true); // Afficher bg2
    setActiveBackgroundIndex(1); // Mettre à jour l'index pour bg2
  };

  const changeBackgroundToBg1 = () => {
    setIsBg2Visible(false); // Masquer bg2
    setTimeout(() => {
      setActiveBackgroundIndex(0); // Revenir à bg1 après le fade-out
    }, 1500); // Correspond à la durée de l'animation
  };

  const nextStep = (step: number) => {
    switch (step) {
      case 1:
        if (audio1) {
          audio1.pause();
          audio1.currentTime = 0;
          setAudio1(null);
        }
        changeBackgroundToBg2(); // Passer à bg2
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
        changeBackgroundToBg1(); // Revenir à bg1 avec fade-out de bg2
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
    changeBackgroundToBg2(); // Passer à bg2 immédiatement
    setShowButton(false);
    setCurrentStep(1);
    nextStep(1);
  };

  const handleSkipClick = () => {
    // if (currentStep === 1 && audio1) {
    //   audio1.pause();
    //   audio1.currentTime = 0;
    //   setAudio1(null);
    //   setCurrentStep(2);
    //   nextStep(2);
    // } else if (currentStep === 2 && audio2) {
    //   audio2.pause();
    //   audio2.currentTime = 0;
    //   setAudio2(null);
    //   setShowAnnouncement(false);
    //   changeBackgroundToBg1(); // Revenir à bg1 même en skip
    //   setCurrentStep(3);
    //   nextStep(3);
    // } else if (currentStep < 3) {
    //   setCurrentStep(currentStep + 1);
    //   nextStep(currentStep + 1);
    // }
    window.location.href = '/avion';
  };

  return (
    <div className="relative w-screen h-screen">
<AnimatePresence>
  {activeBackgroundIndex === 0 && (
    <motion.div
      key="vanta-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 -z-10"
    >
      <video 
    className="absolute top-0 left-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="https://res.cloudinary.com/dm0cuvnzt/video/upload/v1739815215/ciel.mp4" type="video/mp4" />
    {/* Alternative pour d'autres formats */}
    {/* <source src="/videos/fond_avion.webm" type="video/webm" /> */}
    Votre navigateur ne supporte pas la vidéo.
  </video>
    </motion.div>
  )}

  {activeBackgroundIndex === 1 && (
    <motion.div
      key="bg2"
      className="absolute inset-0 bg-cover bg-center -z-10"
      style={{
        backgroundImage: 'url(/images/bg2.avif)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    />
  )}
</AnimatePresence>

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
          {showAnnouncement && <Announcement audioUrl="/sounds/2_Announcement.wav"/>}
        </AnimatePresence>

        <AnimatePresence>
          {showVideo && <VideoPlayer key="video" />}
        </AnimatePresence>

        <DynamicButton
          defaultIcon="/vectors/ELEMENTS/BoutonsDivers/Skip.avif"
          hoverIcon="/vectors/ELEMENTS/BoutonsDivers/SkipOver.avif"
          clickedIcon="/vectors/ELEMENTS/BoutonsDivers/SkipClic.avif"
          releasedIcon="/vectors/ELEMENTS/BoutonsDivers/SkipOver.avif"
          onClick={handleSkipClick}
          style={{
            position: "absolute",
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
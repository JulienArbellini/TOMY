"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThreeDButton from "./components/Start/ThreeDButton";
import Announcement from "./components/Start/Announcement";
import VideoPlayer from "./components/Start/VideoPlayer";
import DynamicButton from "./components/DynamicButton/DynamicButton";
import { AvionMenu } from "./avion/Menu";
import BackgroundYoutube from "./components/BackgroundYoutube";

/**
 * Composant principal "Home".
 * Gère trois étapes (step1, step2, step3) + changement de background + sons audio.
 */
export default function Home() {
  // État pour gérer quelle étape est en cours
  const [currentStep, setCurrentStep] = useState(0);

  // État pour afficher/masquer l'annonce
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  // État pour afficher/masquer la vidéo finale
  const [showAvion, setShowAvion] = useState(false);
  // Bouton principal (ThreeDButton) visible ou non
  const [showButton, setShowButton] = useState(true);

  // Index du background : 0 => vidéo (bg1), 1 => image (bg2)
  const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0);

  /**
   * Passe au background 2 (bg2)
   */
  const changeBackgroundToBg2 = () => {
    setActiveBackgroundIndex(1);
  };

  /**
   * Reviens au background 1 (bg1) - la vidéo
   */
  const changeBackgroundToBg1 = () => {
    setActiveBackgroundIndex(0);
  };

  /**
   * Gère la progression dans les 3 étapes
   * step 1 => lecture audio1 => fin => step2
   * step 2 => lecture audio2 + annonce => fin => step3
   * step 3 => affiche la vidéo
   */
  const nextStep = (step: number) => {
    switch (step) {
      case 1: {
        // Jouer le son 1
        const audio1 = new Audio("/sounds/1_BuzzAvion.wav");
        audio1.play();
        audio1.onended = () => {
          // Quand c'est fini, on passe à step2
          setCurrentStep(2);
          nextStep(2);
        };
        break;
      }

      case 2: {
        // Afficher l'annonce + jouer le son 2
        setShowAnnouncement(true);
        changeBackgroundToBg1(); // retour à bg1
        const audio2 = new Audio("/sounds/2_Announcement.wav");
        audio2.play();
        audio2.onended = () => {
          // Quand c'est fini, on retire l'annonce et on passe step3
          setShowAnnouncement(false);
          setCurrentStep(3);
          nextStep(3);
        };
        break;
      }

      case 3: {
        // Afficher la vidéo finale
        setShowAvion(true);
        break;
      }

      default:
        break;
    }
  };

  /**
   * Au clic du bouton principal.
   * Lance step1 et cache le bouton.
   */
  const handleButtonClick = () => {
    setShowButton(false);
    setCurrentStep(1);
    nextStep(3);
  };

  /**
   * Bouton "Skip" : redirige vers /menu immédiatement
   */
  const handleSkipClick = () => {
    window.location.href = "/menu";
  };

  return (
    <div className="relative w-screen h-screen">
      {/* 
        ANIMATION DE FOND : 
        - bg1 = vidéo 
        - bg2 = image 
      */}
      <AnimatePresence>
        {activeBackgroundIndex === 0 && (
          <motion.div
            key="bg1-video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 -z-10"
          >
            {/* <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://res.cloudinary.com/dm0cuvnzt/video/upload/v1739815215/ciel.mp4"
                // src="https://res.cloudinary.com/dh3nxjopm/video/upload/v1740156762/weewmxt2lenct1p3uy5h.mp4"
                type="video/mp4"
              />

              Votre navigateur ne supporte pas la vidéo.
            </video> */}
            <BackgroundYoutube src="EI93utK6QYI"/>

          </motion.div>
        )}

        {activeBackgroundIndex === 1 && (
          <motion.div
            key="bg2-image"
            className="absolute inset-0 bg-cover bg-center -z-10"
            style={{ backgroundImage: 'url(/images/bg2.avif)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col justify-center items-center h-full w-full">
        {/* 
          Bouton principal (step0 => step1). 
          On l'affiche si showButton === true 
        */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              key="button-container"
              exit={{ opacity: 0, transition: { duration: 1 } }}
              onClick={handleButtonClick}
              className="fixed top-50px"
            >
              <ThreeDButton href="#" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 
          Annonce (step2) 
          Affichée si showAnnouncement === true 
        */}
        <AnimatePresence>
          {showAnnouncement && <Announcement audioUrl="/sounds/2_Announcement.wav" />}
        </AnimatePresence>

        {/* 
          Vidéo finale (step3) 
          Affichée si showVideo === true 
        */}
        <AnimatePresence>
          {showAvion && <AvionMenu />}
        </AnimatePresence>

        
      </div>
    </div>
  );
}
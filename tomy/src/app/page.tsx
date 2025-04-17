"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThreeDButton from "./components/Start/ThreeDButton";
import Announcement from "./components/Start/Announcement";
import VideoPlayer from "./components/Start/VideoPlayer";
import DynamicButton from "./components/DynamicButton/DynamicButton";
import AvionMenu from "./avion/Menu";
import BackgroundYoutube from "./components/BackgroundYoutube";
import PlayerFrame from "./components/GenericPlayer/PlayerFrame";
import UniversalPlayer from "./components/GenericPlayer/UniversalPlayer";
import Siege from "./menu/Siege";
import ControlButton from "./components/Player/ControlButton";
import { userAgent } from "next/server";
import NewMediaPlayer from "./components/SingularPlayers/MultiPlayer";
import { playlist } from "@/data/playlist";
import MusicPlayer from "./components/SingularPlayers/MusicPlayer";
import MultiPlayer from "./components/SingularPlayers/MultiPlayer";

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
  // État pour afficher/masquer la vidéo finale
  const [showHotesse, setHotesse] = useState(false);
  // Bouton principal (ThreeDButton) visible ou non
  const [showButton, setShowButton] = useState(true);

  const [hoveredIcons, setHoveredIcons] = useState<string[]>([]);

  const [showPlay, setShowPlay] = useState(true);


  const [showSiege, setShowSiege] = useState(false);

    const [isPlayingAndDelay, setIsPlayingAndDelay] = useState<boolean>(false);
    const [isVideoEnded, setIsVideoEnded] = useState<boolean>(false);
     const playerRef = useRef<HTMLIFrameElement>(null);

  // Index du background : 0 => vidéo (bg1), 1 => image (bg2)
  const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0);
  const handleMouseEnter = (type: string, event: React.MouseEvent) => {
    setHoveredIcons((prev) => [...prev, type]);
  }

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({
    playToggle: null,
    announcement: null,
    buzzAvion: null,
  });

  // Fonction pour arrêter tous les sons
const stopAllAudio = () => {
  Object.values(audioRefs.current).forEach(audio => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // Remettre au début pour éviter qu'ils ne reprennent
    }
  });
};


const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    const ua = navigator.userAgent.toLowerCase();
    const isMobileUA = /iphone|ipod|android.*mobile|windows phone/.test(ua);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;

    // Condition : Touch + (UA mobile OU small screen)
    const isReallyMobile = isTouchDevice && isMobileUA;

    setIsMobile(isReallyMobile);
  };

  checkMobile();
  console.log(isMobile)
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []);




    const handlePlayToggle = () => {
      const playAudio = audioRefs.current.playToggle;
    
      if (currentStep === 0) {
        setCurrentStep(1);
        setShowPlay(false);
        nextStep(1); // Lance le son1
      }
    
      if (playAudio) {
        playAudio.play().catch(err => console.error("Erreur audio:", err));
      }
    };

  /**
   * Gère la progression dans les 3 étapes
   * step 1 => lecture audio1 => fin => step2
   * step 2 => lecture audio2 + annonce => fin => step3
   * step 3 => affiche la vidéo
   */
  // Ton switch
  const nextStep = (step: number) => {
    switch (step) {
      case 1: {
        // Jouer le son 1
        audioRefs.current.buzzAvion = new Audio("/sounds/1_BuzzAvion.wav");
        audioRefs.current.buzzAvion.play();
        audioRefs.current.buzzAvion.onended = () => {
          setCurrentStep(2);
          nextStep(2);
        };
        break;
      }

      case 2: {
        setShowAnnouncement(true);
        audioRefs.current.announcement = new Audio("/sounds/2_Announcement.wav");
        audioRefs.current.announcement.play();
        audioRefs.current.announcement.onended = () => {
          setShowAnnouncement(false);
          setShowButton(false);
          setCurrentStep(3);
          nextStep(3);
        };
        break;
      }

      case 3: {
        console.log("case 3");
        // setShowAvion(true);
        setShowPlay(false)
        setShowAnnouncement(false);
        setTimeout(() => {
          setHotesse(true);
        }, 2000);
        break;
      }

      default:
        break;
    }
  };
    

  const handleButtonClick = () => {
    stopAllAudio(); // Stoppe tous les sons actifs
  
    // Réinitialisation des états conflictuels
    setShowAnnouncement(false);
    setShowPlay(false);
  
    // Avancer au step suivant
    setShowButton(false);
    setCurrentStep(1);
    nextStep(3);
  };

  const onClose = () => {

  }

  /**
   * Bouton "Skip" : redirige vers /menu immédiatement
   */
  const handleSkipClick = () => {
    window.location.href = "/menu";
  };

  const audioConfig = playlist.find(p => p.type === "Music")?.playerConfig;


  if(isMobile){
    return (
      <MultiPlayer
        tracks={audioConfig?.tracks}
        autoplay={audioConfig?.autoplay}
        controls={audioConfig?.controls}

        onClose={() => console.log("fermer")}
        // Tu peux aussi passer d'autres props comme audioConfig?.extraContent
      />
    );
  } else{
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
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="https://res.cloudinary.com/dh3nxjopm/video/upload/v1744040002/r57kasb0gimyx2g127pb.mp4"
                  // src="https://res.cloudinary.com/dm0cuvnzt/video/upload/v1739815215/ciel.mp4"
                  // src="https://res.cloudinary.com/dh3nxjopm/video/upload/v1740156762/weewmxt2lenct1p3uy5h.mp4"
                  type="video/mp4"
                />
  
                Votre navigateur ne supporte pas la vidéo.
              </video>
              {/* <BackgroundYoutube src="s4wpzE_eUOE"/> */}
  
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
  
  
          <AnimatePresence>
            {showAnnouncement && <Announcement audioUrl="/sounds/2_Announcement.wav" />}
          </AnimatePresence>
  
  
          <AnimatePresence>
            {showAvion && !showSiege && <AvionMenu onSiegeClick={() => setShowSiege(true)} />}
          </AnimatePresence>
  
          {showSiege && <Siege onPlaneClick={() => setShowSiege(false)} />}
  
          
          {showHotesse &&
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">             
            <PlayerFrame
            playerRef={playerRef}
            isPlayingAndDelay={isPlayingAndDelay}
            isVideoEnded={isVideoEnded}
            scale={1}
            src={"NdNvqv-O6no"}
            onClose={() => {
              setHotesse(false);
              setShowAvion(true);
            }} 
            frameSrc={"/vectors/ELEMENTS/Cadres/CadreUltrasimple.avif"}
            controls={false}
            />
          </div>
          }
  
  
  
  
          {showPlay &&
  
            <ControlButton
            defaultIcon={"/vectors/ELEMENTS/BoutonsPlayer/VolumeUp.avif"}
            hoverIcon={"/vectors/ELEMENTS/BoutonsPlayer/VolumeUpHover.avif"}
            clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeUpClic.avif"
            onClick={handlePlayToggle}
            style={{
              position: "absolute",
              bottom: "10px",
              left: "10px",
              zIndex: 9999,
              height: `40px`,
              width: `40px`,
            }}
            />
          }
  
          
        </div>
  
        </div>
      
    );
  }
  
}

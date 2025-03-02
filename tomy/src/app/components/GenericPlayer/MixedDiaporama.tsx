"use client";
import React, { useState, useRef, useEffect } from "react";
import InteractiveButton from "./InteractiveButton"; // Boutons personnalisés
/// <reference path="../../../types/youtube.d.ts" />

interface MixedDiaporamaProps {
  items: { type: "image" | "video"; src: string }[]; // Liste mixte des médias
  frameSrc?: string; // Cadre décoratif pour les images uniquement
  onClose: () => void; // Fonction pour fermer le diaporama
}



const MixedDiaporama: React.FC<MixedDiaporamaProps> = ({
  items,
  frameSrc = "/vectors/ELEMENTS/Cadres/CadreSimple.avif",
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [scale, setScale] = useState(1);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const scriptAdded = useRef(false);

  const totalItems = items.length;
  const currentItem = items[currentIndex];

  console.log(items);

  // Fonction pour extraire l'ID de la vidéo YouTube
  const extractYouTubeVideoId = (url: string): string => {
    const regex = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/)([^&?/]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const handleStateChange = (event: any) => {
    console.log("🎥 État vidéo détecté :", event.data);
  
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      setIsVideoEnded(false);
      console.log("▶️ La vidéo est en lecture");
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
      console.log("⏸️ La vidéo est en pause");
    } else if (event.data === window.YT.PlayerState.ENDED) {
      setIsPlaying(false);
      setIsVideoEnded(true);
      console.log("🛑 La vidéo est terminée");
    }
  };

  // Création du lecteur YouTube
  useEffect(() => {
    if (currentItem.type === "video") {
      const initYouTubePlayer = () => {
        if (playerRef.current) {
          console.log("🎬 Initialisation du lecteur YouTube...");
          
          const newPlayer = new window.YT.Player(playerRef.current, {
            videoId: currentItem.src,
            events: {
              onReady: (event: any) => {
                setPlayer(event.target);
                console.log("✅ Lecteur YouTube prêt !");
              },
              onStateChange: handleStateChange,
            },
            playerVars: {
              autoplay: 1,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              loop: 1,
              showinfo: 0,
            },
          });
        }
      };

      if (!window.YT && !scriptAdded.current) {
        console.log("⏳ Chargement de l'API YouTube...");
        scriptAdded.current = true;
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        script.onload = () => {
          setTimeout(initYouTubePlayer, 500);
        };
        document.body.appendChild(script);
      } else {
        initYouTubePlayer();
      }
    }
  }, [currentItem]);

  // Supprime le lecteur YouTube quand on change de média
  useEffect(() => {
    return () => {
      if (player) {
        console.log("🗑️ Suppression du lecteur YouTube...");
        player.destroy();
        setPlayer(null);
      }
    };
  }, [currentItem]);

  // Gestion du redimensionnement pour l'échelle dynamique
  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const originalHeight = 555;
      const desiredHeight = windowHeight * 0.8;
      const newScale = desiredHeight / originalHeight;
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % totalItems);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);

  const scaledValue = (value: number) => value * scale;
  const containerHeight = 437;
  const containerWidth = 590;

  if(frameSrc == '/vectors/ELEMENTS/Cadres/CadreEdgy.avif'){
    return (
      <div
        className="relative flex justify-center items-center"
        style={{
          height: `${scaledValue(590)}px`,
          width: `${scaledValue(690)}px`,
        }}
      >
        {/* Cadre principal */}
        <img
          src={frameSrc}
          alt="Cadre décoratif autour du contenu"
          style={{
            height: `${scaledValue(570)}px`,
            width: `${scaledValue(675)}px`,
          }}
        />
        {currentItem.src !== "https://res.cloudinary.com/dh3nxjopm/image/upload/v1740937199/mmck4s2rfckv67alfbpq.png" && (
          <img
            src="/vectors/ELEMENTS/Cadres/EcranNoir.avif"
            alt="Écran noir lorsque la vidéo est en pause ou terminée"
            className="absolute"
  
            style={{
              top: `${scaledValue(65)}px`,
              left: `${scaledValue(47)}px`,
              height: `${scaledValue(containerHeight)+16}px`,
              width: `${scaledValue(containerWidth)+13}px`,
              // zIndex: isPlayingAndDelay || isVideoEnded ? 20 : 0,
            }}
          />
  )}
        
  
        {/* Boutons de fermeture et navigation */}
        <InteractiveButton defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Exit.avif" hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif" clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitClic.avif" onClick={onClose} style={{ position: "absolute", top: `${scaledValue(44)}px`, left: `${scaledValue(50)}px`, height: `${scaledValue(16)}px`, width: `${scaledValue(16)}px`, zIndex: 50 }} />
        <InteractiveButton defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Backwards.avif" hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/BackwardsHover.avif" clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/BackwardsClic.avif" onClick={handlePrev} style={{ position: "absolute", left: `${scaledValue(50)}px`, bottom: `${scaledValue(50)}px`, width: `${scaledValue(27)}px`, height: `${scaledValue(27)}px`, zIndex: 100 }} />
        <InteractiveButton defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Forward.avif" hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ForwardHover.avif" clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ForwardClic.avif" onClick={handleNext} style={{ position: "absolute", right: `${scaledValue(35)}px`, bottom: `${scaledValue(50)}px`, width: `${scaledValue(27)}px`, height: `${scaledValue(27)}px`, zIndex: 100 }} />
  
        {/* Conteneur des médias */}
        <div className="absolute overflow-hidden" style={{ top: `${scaledValue(70)}px`, left: `${scaledValue(50)}px`, height: `${scaledValue(containerHeight)}px`, width: `${scaledValue(containerWidth)}px` }}>
          {/* Vitre transparente */}
          <img src="/vectors/ELEMENTS/Cadres/vitre.avif" alt="Vitre transparente" className="absolute z-10 opacity-[.01]" style={{ height: `${scaledValue(containerHeight)}px`, width: `${scaledValue(containerWidth)}px` }} />
          {currentItem.type === "image" ? (
            <img src={currentItem.src} alt={`Image ${currentIndex + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div className="relative" style={{ width: "100%", height: "100%" }}>
              <div className="absolute" style={{ top: 0, left: 0, height: "100%", width: "100%", backgroundColor: "black", opacity: !isPlaying || isVideoEnded ? 1 : 0, zIndex: 20, transition: "opacity 0.3s ease-in-out" }} />
              <div className="absolute" 
              style=
              {{
                top: `${scaledValue(-653)}px`,
                left: 0,
                height: `${scaledValue(containerHeight)}px`,
                width: `${scaledValue(containerWidth)}px`,
              }}
              >
                <div ref={playerRef} style={{ width: "100%", height: "400%" }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  else{
    return (
      <div
        className="relative flex justify-center items-center"
        style={{
          height: `${scaledValue(550)}px`,
          width: `${scaledValue(640)}px`,
        }}
      >
        {/* Cadre principal */}
        <img
          src={frameSrc}
          alt="Cadre décoratif autour du contenu"
          style={{
            height: `${scaledValue(538)}px`,
            width: `${scaledValue(638)}px`,
          }}
        />

          <img
            src="/vectors/ELEMENTS/Cadres/EcranNoir.avif"
            alt="Écran noir lorsque la vidéo est en pause ou terminée"
            className="absolute"
  
            style={{
              top: `${scaledValue(43)}px`,
              left: `${scaledValue(26)}px`,
              height: `${scaledValue(containerHeight)+15}px`,
              width: `${scaledValue(containerWidth)+12}px`,
              // zIndex: isPlayingAndDelay || isVideoEnded ? 20 : 0,
            }}
          />
  
        {/* Boutons de fermeture et navigation */}
        <InteractiveButton defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Exit.avif" hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif" clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitClic.avif" onClick={onClose} style={{ position: "absolute", top: `${scaledValue(24)}px`, left: `${scaledValue(24)}px`, height: `${scaledValue(16)}px`, width: `${scaledValue(16)}px`, zIndex: 50 }} />
        <InteractiveButton defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Backwards.avif" hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/BackwardsHover.avif" clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/BackwardsClic.avif" onClick={handlePrev} style={{ position: "absolute", left: `${scaledValue(26)}px`, bottom: `${scaledValue(30)}px`, width: `${scaledValue(27)}px`, height: `${scaledValue(27)}px`, zIndex: 100 }} />
        <InteractiveButton defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Forward.avif" hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ForwardHover.avif" clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ForwardClic.avif" onClick={handleNext} style={{ position: "absolute", right: `${scaledValue(21)}px`, bottom: `${scaledValue(30)}px`, width: `${scaledValue(27)}px`, height: `${scaledValue(27)}px`, zIndex: 100 }} />
  
        {/* Conteneur des médias */}
        <div className="absolute overflow-hidden" style={{ top: `${scaledValue(47)}px`, left: `${scaledValue(29)}px`, height: `${scaledValue(containerHeight)}px`, width: `${scaledValue(containerWidth)}px` }}>
          {/* Vitre transparente */}
          <img src="/vectors/ELEMENTS/Cadres/vitre.avif" alt="Vitre transparente" className="absolute z-10 opacity-[.01]" style={{ height: `${scaledValue(containerHeight)}px`, width: `${scaledValue(containerWidth)}px` }} />
          {currentItem.type === "image" ? (
            <img src={currentItem.src} alt={`Image ${currentIndex + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div className="relative" style={{ width: "100%", height: "100%" }}>
              <div className="absolute" style={{ top: 0, left: 0, height: "100%", width: "100%", backgroundColor: "black", opacity: !isPlaying || isVideoEnded ? 1 : 0, zIndex: 20, transition: "opacity 0.3s ease-in-out" }} />
              <div className="absolute" 
              style=
              {{
                top: `${scaledValue(-653)}px`,
                left: 0,
                height: `${scaledValue(containerHeight)}px`,
                width: `${scaledValue(containerWidth)}px`,
              }}
              >
                <div ref={playerRef} style={{ width: "100%", height: "400%" }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default MixedDiaporama;
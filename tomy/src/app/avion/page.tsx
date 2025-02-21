"use client";

import React, { useState, useEffect, useRef } from "react";
import DynamicButton from "../components/DynamicButton/DynamicButton";
import { items } from "../../data/items-avion";
import dynamic from "next/dynamic";
import Background from "../components/Background";
import { useRouter } from "next/navigation"; // Import du router
import InteractiveButton from "../components/GenericPlayer/InteractiveButton";

const UniversalPlayer = dynamic(
  () => import("../components/GenericPlayer/UniversalPlayer"),
  { ssr: false }
);

interface GourouMessage {
  message: string;
  x: number;
  y: number;
  followCursor?: boolean; // <-- Ajout de la propriété
}

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [hoveredIcons, setHoveredIcons] = useState<string[]>([]);
  const avionContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 1, height: 1 });
  const [zoomLevel, setZoomLevel] = useState(0.1);
  const [isPhoneShaking, setIsPhoneShaking] = useState(false);
  const [gourouMessage, setGourouMessage] = useState<GourouMessage | null>(null);
  const gourouTimeout = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter(); // Initialisation du routeur
  // Déclaration d'une variable pour suivre le dernier moment où un son a été joué
  const lastSoundTime = useRef<number>(0);
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number }>({
    visible: false,
    x: 0,
    y: 0,
  });
  const mouseMoveRef = useRef<(e: MouseEvent) => void>();

  // 2) Un second état pour déclencher l’animation

  useEffect(() => {
    // Au montage, on déclenche l'animation après un petit délai (ex: 50ms)
    const timer = setTimeout(() => {
      setZoomLevel(1.2);
    }, 50);
  
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (avionContainerRef.current) {
        setContainerSize({
          width: avionContainerRef.current.clientWidth,
          height: avionContainerRef.current.clientHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  
  const floatingIcons = ["AirLounge", "Serre", "Terrasse"];


  // *** CHANGEMENT : Fonction pour activer le suivi global de la souris
  const startGlobalMouseMove = () => {
    // On définit la fonction que l'on va passer à addEventListener
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setTooltip((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    };
    // On la stocke pour pouvoir la retirer plus tard
    mouseMoveRef.current = handleGlobalMouseMove;

    // On écoute le mouvement de la souris sur toute la fenêtre
    window.addEventListener("mousemove", handleGlobalMouseMove);
  };

  // *** CHANGEMENT : Fonction pour stopper le suivi global de la souris
  const stopGlobalMouseMove = () => {
    if (mouseMoveRef.current) {
      window.removeEventListener("mousemove", mouseMoveRef.current);
      mouseMoveRef.current = undefined;
    }
  };
  
  const handleMouseEnter = (type: string, event: React.MouseEvent) => {
    setHoveredIcons((prev) => [...prev, type]);
    const audio = new Audio("/sounds/Icone-hover.mp3");
    audio.volume = 0.05;
    audio.play().catch((err) => console.error("Erreur de lecture audio :", err));
    if(type === "OIseaux"){
      const Oizaudio = new Audio("/sounds/Oiseaux.mp3");
      Oizaudio.volume = 0.15;
      Oizaudio.play().catch((err) => console.error("Erreur de lecture audio :", err));
    }
    if (type === "Brace") {
      setTooltip({
        visible: true,
        x: event.clientX,
        y: event.clientY,
      });
      startGlobalMouseMove();
    }
  };

  
  const handleMouseLeave = (type: string) => {
    setHoveredIcons((prev) => prev.filter((icon) => icon !== type));

    if (type === "Brace") {
      setTooltip({ visible: false, x: 0, y: 0 });
      stopGlobalMouseMove();
    }
  };

  const handleItemClick = (type: string , event?: React.MouseEvent) => {

    
    const item = items.find((item) => item.type === type);
    if (!item) return;

    if (item.type === "Siegevide") {
      router.push("/menu"); // Redirection vers la page map
      return;
    }


    if (item.type === "Telephone" || item.type === "Cuisine" || item.type === "PiscineSimple"  && item.playerConfig?.action === "playSound") {
      const audio = new Audio(item.playerConfig.soundSrc);
      
      // Active l'animation
      if(item.type === "Telephone"){
        setIsPhoneShaking(true);
      }
      audio.volume = 0.1;
      // Joue le son
      audio.play().catch((err) => console.error("Erreur de lecture audio :", err));
  
      // Désactive le shake à la fin du son
      audio.onended = () => {
        setIsPhoneShaking(false);
      };
  
      return;
    }
    if(item.type != "Telephone" && item.type != "Cuisine" && item.type != "PiscineSimple" && item.type !="Gourou" && item.type !="Gourou" ){
      const audio2 = new Audio("/sounds/Icone-clic.mp3");
      
      audio2.play().catch((err) => console.error("Erreur de lecture audio :", err));
    }


    if (item.type === "Gourou" && item.advice) {
      const randomIndex = Math.floor(Math.random() * item.advice.length);
      const randomAdvice = item.advice[randomIndex];

      // Vérification du délai minimum de 5 secondes
      const now = Date.now();
      if (now - lastSoundTime.current >= 5000) {
        // Tirage aléatoire pour déterminer si le son doit être joué (50% de chance)
        if (Math.random() < 0.5) {
          // Sélection aléatoire entre les deux sons
          const soundSrc = Math.random() < 0.5 ? "/sounds/GourouSound1.wav" : "/sounds/GourouSound2.wav";
          const audio = new Audio(soundSrc);
          
          audio.play().catch((err) => console.error("Erreur de lecture audio :", err));
          
          // Mise à jour du dernier moment où un son a été joué
          lastSoundTime.current = now;
        }
      }

      if (event) {
        setGourouMessage({
          message: randomAdvice,
          x: item.x  , // Décalage pour ne pas chevaucher l'icône
          y: item.y + 150 ,  // Position légèrement au-dessus
        });

        // Supprime le précédent timer et redémarre un nouveau
        if (gourouTimeout.current) {
          clearTimeout(gourouTimeout.current);
        }

        gourouTimeout.current = setTimeout(() => {
          setGourouMessage(null);
        }, 5000); // Disparaît après 5 secondes
      }

      return;
    } 
    setSelectedItem(item?.playerConfig || null);
  };

  useEffect(() => {
    if (gourouMessage) {
      const timer = setTimeout(() => {
        setGourouMessage(null);
      }, 10000); // Disparaît après 5 secondes
  
      return () => clearTimeout(timer); // Nettoyage du timeout si le composant se démonte ou si un nouveau message apparaît
    }
  }, [gourouMessage]);




  return (
    <div>
    <div className="relative w-screen h-screen flex justify-center items-center overflow-hidden">
    {/* <Background /> */}
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
      {/* Conteneur principal qui garde les proportions */}
      <div
          ref={avionContainerRef}
          className="relative"
          style={{
            width: `${90 * zoomLevel}vw`,
            transition: "transform 0.5s ease-out", // 1 seconde
            height: "auto",
            maxWidth: `${1440 * zoomLevel}px`,
            transform: `scale(${zoomLevel})`,
            transformOrigin: "center",
          }}
      >
        {/* Image de l'avion */}
        <img
          src="/vectors/ELEMENTS/AVION_MODELE.png"
          alt="Avion"
          className="w-full h-auto opacity-[1]"
        />
                  {gourouMessage && (
            <div
              className="absolute bg-white text-black border border-black rounded-lg p-3 shadow-lg z-50"
              style={{
                left: gourouMessage.followCursor
                ? `${(gourouMessage.x / containerSize.width) * 100}%`
                : `${(gourouMessage.x / 1440) * 100}%`,
              top: gourouMessage.followCursor
                ? `${(gourouMessage.y / containerSize.height) * 100}%`
                : `${(gourouMessage.y / 900) * 100}%`,
                maxWidth: "250px",
                transform: 'translate(-50%, -50%)', // Pour centrer le message sur l'icône

                display: "inline-block",
                fontFamily: "'Comic Sans MS', 'Chalkboard SE', sans-serif",
              }}
            >
              <p className="text-center"dangerouslySetInnerHTML={{ __html: gourouMessage.message }}></p>
            </div>
          )}

{/* Icônes positionnées en fonction du conteneur parent */}

{items.map((item, index) => {
          const isFloating = floatingIcons.includes(item.type);
          const isHovered = hoveredIcons.includes(item.type);

          return (
            <DynamicButton
              key={index}
              defaultIcon={`/OPTIMIZED_ICONES/${item.type}-hover.avif`}
              hoverIcon={`/OPTIMIZED_ICONES/${item.type}.avif`}
              clickedIcon={`/OPTIMIZED_ICONES/${item.type}-clic.avif`}
              releasedIcon={`/OPTIMIZED_ICONES/${item.type}.avif`}
              onClick={(e) => handleItemClick(item.type, e)} // Ajout de `event`
              onMouseEnter={(e) => handleMouseEnter(item.type, e)}
              onMouseLeave={() => handleMouseLeave(item.type)}
              buttonState={isHovered ? "hover" : "default"}
              style={{
                position: "absolute",
                top: `${(item.y || 0) / 900 * 100}%`,
                left: `${(item.x || 0) / 1440 * 100}%`,
                width: `${(item.width || 50) / 1440 * 100}%`,
                height: `${(50) / 900 * 100}%`,
                transform: `translate(-50%, -50%) ${isFloating && isHovered ? "translateY(-10px)" : ""} `,
                transition: "transform 0.3s ease-in-out",
                animation: item.type === "Telephone" && isPhoneShaking ? "shake 0.4s ease-in-out infinite" : "none",
                opacity: "1",
              } as React.CSSProperties}
            />
          );
        })}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <UniversalPlayer {...selectedItem} onClose={() => setSelectedItem(null)} />
        </div>
      )}

    </div>
    <div className="fixed top-[10px] right-[155px] flex gap-2 z-50">
      <InteractiveButton
        defaultIcon={`/OPTIMIZED_ICONES/ZoomPlus.avif`}
        hoverIcon={`/OPTIMIZED_ICONES/ZoomPlus-hover.avif`}
        clickedIcon={`/OPTIMIZED_ICONES/ZoomPlus-clic.avif`}
        onClick={() => setZoomLevel((prev) => Math.min(prev + 0.1, 2))}
        style={{
          position: "absolute",
          top: `5px`,
          left: `75px`,
          width: `50px`,
          height: `50px`
        } as React.CSSProperties}
        >
      </InteractiveButton>
      <InteractiveButton
        defaultIcon={`/OPTIMIZED_ICONES/ZoomMoins.avif`}
        hoverIcon={`/OPTIMIZED_ICONES/ZoomMoins-hover.avif`}
        clickedIcon={`/OPTIMIZED_ICONES/ZoomMoins-clic.avif`}
        onClick={() => setZoomLevel((prev) => Math.min(prev - 0.1, 2))}
        style={{
          position: "absolute",
          top: `5px`,
          left: `5px`,
          width: `50px`,
          height: `50px`,
        } as React.CSSProperties}
        >
      </InteractiveButton>

  </div>
  {tooltip.visible && (
              <div
                className="absolute bg-white text-black border text-center border-black rounded-lg p-2 shadow-lg z-50"
                style={{
                  position: "fixed",
                  left: tooltip.x, // Décalage léger à droite
                  top: tooltip.y+25,  // Décalage léger en bas
                  pointerEvents: "none", // Empêche le tooltip d'intercepter les événements
                  fontFamily: "monospace', sans-serif",
                  fontSize: "14px",
                }}
              >
                En cas de crash <br /> attrapez  le nuage <br />situé sous votre <br /> siège et serrez le <br /> de toutes vos forces
              </div>
            )}
  </div>
  );
  
};

export default Menu;
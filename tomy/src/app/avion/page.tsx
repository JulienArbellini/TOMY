"use client";

import React, { useState, useEffect, useRef } from "react";
import DynamicButton from "../components/DynamicButton/DynamicButton";
import { items } from "../../data/items-avion";
import dynamic from "next/dynamic";
import Background from "../components/Background";
import InteractiveButton from "../components/GenericPlayer/InteractiveButton";

const UniversalPlayer = dynamic(
  () => import("../components/GenericPlayer/UniversalPlayer"),
  { ssr: false }
);

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [hoveredIcons, setHoveredIcons] = useState<string[]>([]);
  const avionContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 1, height: 1 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPhoneShaking, setIsPhoneShaking] = useState(false);
  const [gourouMessage, setGourouMessage] = useState<{ message: string; x: number; y: number } | null>(null);
  const gourouTimeout = useRef<NodeJS.Timeout | null>(null);
  // Déclaration d'une variable pour suivre le dernier moment où un son a été joué
  const lastSoundTime = useRef<number>(0);

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
  
  const handleMouseEnter = (type: string) => {
    const audio = new Audio("/sounds/Icone-hover.mp3");
    audio.volume = 0.05;
    audio.play().catch((err) => console.error("Erreur de lecture audio :", err));
    setHoveredIcons((prev) => [...prev, type]);
    if(type === "OIseaux"){
      const Oizaudio = new Audio("/sounds/Oiseaux.mp3");
      Oizaudio.volume = 0.15;
      Oizaudio.play().catch((err) => console.error("Erreur de lecture audio :", err));
    }
  };

  const handleMouseLeave = (type: string) => {
    setHoveredIcons((prev) => prev.filter((icon) => icon !== type));
  };

  const handleItemClick = (type: string , event?: React.MouseEvent) => {

    
    const item = items.find((item) => item.type === type);
    if (!item) return;


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
    if(item.type != "Telephone" && item.type != "Cuisine" && item.type != "PiscineSimple" && item.type !="Gourou" ){
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
      x: item.x + 110, // Décalage pour ne pas chevaucher l'icône
      y: item.y + 200,  // Position légèrement au-dessus
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
      }, 5000); // Disparaît après 5 secondes
  
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
        className="relative transition-transform duration-300"
        style={{
          width: `${90 * zoomLevel}vw`,
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
          className="w-full h-auto city-[1]"
        />

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
              onMouseEnter={() => handleMouseEnter(item.type)}
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
      {gourouMessage && (
  <div
    className="fixed bg-white text-black border border-black rounded-lg p-3 shadow-lg z-50"
    style={{
      left: `${gourouMessage.x}px`,
      top: `${gourouMessage.y}px`,
      maxWidth: "250px",
      display: "inline-block",
      fontFamily: "'Comic Sans MS', 'Chalkboard SE', sans-serif",
    }}
  >
    <p className="text-center"dangerouslySetInnerHTML={{ __html: gourouMessage.message }}></p>
  </div>
)}
  </div>
  </div>
  );
  
};

export default Menu;
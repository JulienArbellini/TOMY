"use client";

import React, { useState, useEffect, useRef } from "react";
import DynamicButton from "../components/DynamicButton/DynamicButton";
import { items } from "../../data/items-avion";
import dynamic from "next/dynamic";
import Background from "../components/Background";

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
    setHoveredIcons((prev) => [...prev, type]);
  };

  const handleMouseLeave = (type: string) => {
    setHoveredIcons((prev) => prev.filter((icon) => icon !== type));
  };

  const handleItemClick = (type: string) => {
    
    const item = items.find((item) => item.type === type);
    if (item && item.type === "Telephone" && item.playerConfig?.action === "playSound") {
      const audio = new Audio(item.playerConfig.soundSrc);
      
      // Active l'animation
      setIsPhoneShaking(true);
  
      // Joue le son
      audio.play().catch((err) => console.error("Erreur de lecture audio :", err));
  
      // Désactive le shake à la fin du son
      audio.onended = () => {
        setIsPhoneShaking(false);
      };
  
      return;
    }
    setSelectedItem(item?.playerConfig || null);
  };




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
          className="w-full h-auto opacity-1"
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
              onClick={() => handleItemClick(item.type)}
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
    <div className="fixed top-5 right-5 flex gap-2 z-50">
    <button
      onClick={() => setZoomLevel((prev) => Math.min(prev + 0.1, 2))}
      className="p-2 bg-white shadow-lg rounded-md text-black font-bold"
    >
      ➕ Zoom In
    </button>
    <button
      onClick={() => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5))}
      className="p-2 bg-white shadow-lg rounded-md text-black font-bold"
    >
      ➖ Zoom Out
    </button>
  </div>
  </div>
  );
  
};

export default Menu;
"use client";

import React, { useState, useEffect, useRef } from "react";
import DynamicButton from "../components/DynamicButton/DynamicButton";
import { items } from "../../data/items";
import dynamic from "next/dynamic";

const UniversalPlayer = dynamic(
  () => import("../components/GenericPlayer/UniversalPlayer"),
  { ssr: false }
);

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [hoveredIcons, setHoveredIcons] = useState<string[]>([]);
  const avionContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 1, height: 1 });

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
    setSelectedItem(item?.playerConfig || null);
  };


  return (
    <div className="relative w-screen h-screen flex justify-center items-center overflow-hidden bg-[url('/vectors/ELEMENTS/FondDEcran.jpg')] bg-cover bg-center">
      {/* Conteneur principal qui garde les proportions */}
      <div
        ref={avionContainerRef}
        className="relative"
        style={{
          width: "90vw",
          height: "auto",
          maxWidth: "1440px",
        }}
      >
        {/* Image de l'avion */}
        <img
          src="/vectors/ELEMENTS/AVION_MODELE.png"
          alt="Avion"
          className="w-full h-auto opacity-90"
        />

{/* Icônes positionnées en fonction du conteneur parent */}
{items.map((item, index) => {
          const isFloating = floatingIcons.includes(item.type);
          const isHovered = hoveredIcons.includes(item.type);

          return (
            <DynamicButton
              key={index}
              defaultIcon={`/OPTIMIZED_ICONES/${item.type}.avif`}
              hoverIcon={`/OPTIMIZED_ICONES/${item.type}-hover.avif`}
              clickedIcon={`/OPTIMIZED_ICONES/${item.type}-clic.avif`}
              releasedIcon={`/OPTIMIZED_ICONES/${item.type}.avif`}
              onClick={() => handleItemClick(item.type)}
              onMouseEnter={() => handleMouseEnter(item.type)}
              onMouseLeave={() => handleMouseLeave(item.type)}
              buttonState={isHovered ? "hover" : "default"}
              className={`transition-all duration-300 ${
                isFloating && isHovered ? "floating-icon" : ""
              }`}
              style={{
                position: "absolute",
                top: `${(item.y / 900) * 100}%`, 
                left: `${(item.x / 1440) * 100}%`, 
                width: `${(item.width || 50) / 1440 * 100}%`,
                height: `${(item.height || 50) / 900 * 100}%`,
                transform: `translate(-50%, -50%) ${isFloating && isHovered ? "translateY(-10px)" : ""}`, 
                transition: "transform 0.3s ease-in-out",
                opacity: "1",
              }}
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
  );
};

export default Menu;
"use client";

import React, { useState, useEffect } from "react";
import DynamicButton from "../components/DynamicButton/DynamicButton";
import { items } from "../../data/items";
import dynamic from "next/dynamic";
import { usePreloadImages } from "../hooks/usePreloadImages";
import Gourou from "../components/Gourou/Gourou";

const UniversalPlayer = dynamic(
  () => import("../components/GenericPlayer/UniversalPlayer"),
  { ssr: false }
);

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [hoveredIcons, setHoveredIcons] = useState<string[]>([]);
  const [scaleFactor, setScaleFactor] = useState(1);

  const handleMouseEnter = (type: string) => {
    console.log(`🟢 Hover ON: ${type}`);
    setHoveredIcons((prev) => [...prev, type]);
    
    // Vérifier l'icône utilisée
    const item = items.find((item) => item.type === type);
    if (item) {
      console.log("🔄 Image hover:", `/OPTIMIZED_ICONES/${item.type}.avif`);
    }
  };
  
  const handleMouseLeave = (type: string) => {
    console.log(`🔴 Hover OFF: ${type}`);
    setHoveredIcons((prev) => prev.filter((icon) => icon !== type));
  };

  useEffect(() => {
    const handleResize = () => {
      const baseWidth = 1440;
      const baseHeight = 900;
      const scaleX = window.innerWidth / baseWidth;
      const scaleY = window.innerHeight / baseHeight;
      setScaleFactor(Math.min(scaleX, scaleY));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleItemClick = (type: string) => {
    const item = items.find((item) => item.type === type);
    setSelectedItem(item?.playerConfig || null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `url("/vectors/ELEMENTS/AVION_MODELE.png")`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      />

      <div className="relative top-0 left-0 w-full h-full" style={{ zIndex: 10 }}>
        {items.map((item, index) => (
                    <DynamicButton
                    key={index}
                    defaultIcon={`/OPTIMIZED_ICONES/${item.type}-hover.avif`}
                    hoverIcon={`/OPTIMIZED_ICONES/${item.type}.avif`}
                    clickedIcon={`/OPTIMIZED_ICONES/${item.type}-clic.avif`}
                    releasedIcon={`/OPTIMIZED_ICONES/${item.type}.avif`}
                    onClick={(e) => handleItemClick(item.type, e)}
                    onMouseEnter={() => handleMouseEnter(item.type)}
                    onMouseLeave={() => handleMouseLeave(item.type)}
                    buttonState={
                      hoveredIcons.includes(item.type) ? "hover" : "default"
                    }
                    style={{
                        position: "absolute",
                        top: `${item.y * scaleFactor}px`,
                        left: `${item.x * scaleFactor}px`,
                        width: `${(item.width || 50) * scaleFactor}px`,
                        height: `${(item.height || 50) * scaleFactor}px`,
                        zIndex: 20,
                      }}
                  />
        ))}
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

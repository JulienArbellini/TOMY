"use client";

import React, { useState, useEffect } from "react";
import DynamicButton from "../components/DynamicButton/DynamicButton";
import { items } from "../../data/items";
import dynamic from "next/dynamic";
import { usePreloadImages } from "../hooks/usePreloadImages"
import Gourou from "../components/Gourou/Gourou";

// Charger UniversalPlayer uniquement côté client
const UniversalPlayer = dynamic(
  () => import("../components/GenericPlayer/UniversalPlayer"),
  {
    ssr: false, // Désactive le rendu côté serveur
  }
);

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [hoveredIcons, setHoveredIcons] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Map pour associer chaque icône à son groupe (si nécessaire)
  const iconGroups = [
    ["Game", "GAMEr-Manette"],
    ["Music", "Music-boy"],
    ["MOVIES", "Movie-watching"],
    // ... autres groupes
  ];

  const allImageUrls = items.flatMap((item) => [
    `/OPTIMIZED_ICONES/${item.type}-hover.avif`,
    `/OPTIMIZED_ICONES/${item.type}.avif`,
    `/OPTIMIZED_ICONES/${item.type}-clic.avif`,
  ]);

  // Précharger les images
  usePreloadImages(allImageUrls);

  const iconToGroupMap: { [key: string]: string[] } = {};
  iconGroups.forEach((group) => {
    group.forEach((icon) => {
      iconToGroupMap[icon] = group;
    });
  });

  const handleItemClick = (type: string, event?: React.MouseEvent) => {
    // Cas particulier Gourou
    if (type === "Gourou" && event) {
      const gourouItem = items.find((item) => item.type === "Gourou");
      let displayedMessage = "Le Gourou est silencieux aujourd'hui.";
      if (gourouItem && Array.isArray(gourouItem.advice) && gourouItem.advice.length > 0) {
        const randomIndex = Math.floor(Math.random() * gourouItem.advice.length);
        displayedMessage = gourouItem.advice[randomIndex];
      }
    
      const { clientX, clientY } = event;
      setCursorPosition({ x: clientX, y: clientY });
      setMessage(displayedMessage);
      setIsMessageVisible(true);
    
      // Annuler le précédent timeout s’il existe
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    
      // Définir un nouveau timeout pour ce message
      const newTimeoutId = setTimeout(() => {
        setIsMessageVisible(false);
        setMessage(null);
      }, 5000);
    
      setTimeoutId(newTimeoutId); // Stocker le nouvel ID de timeout
      return;
    }
  
    // Cas générique pour les autres items
    const item = items.find((item) => item.type === type);
    if (item && item.playerConfig) {
      setSelectedItem(item.playerConfig);
    } else {
      setSelectedItem(null);
    }
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleMouseEnter = (type: string) => {
    const group = iconToGroupMap[type] || [type];
    setHoveredIcons(group);
  };

  const handleMouseLeave = (type: string) => {
    setHoveredIcons([]);
  };

  useEffect(() => {
    if (isMessageVisible) {
      const handleMouseMove = (e: MouseEvent) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      };
  
      window.addEventListener("mousemove", handleMouseMove);
  
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [isMessageVisible]);

  useEffect(() => {
    let scrollY = 0;
  
    if (selectedItem) {
      // Sauvegarder la position actuelle
      scrollY = window.scrollY;
  
      // Empêcher le défilement et fixer la page
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
    } else {
      // Récupérer la position précédente
      const storedScrollY = parseInt(document.body.style.top || "0", 10);
  
      // Restaurer le défilement normal
      document.body.style.position = "";
      document.body.style.top = "";
  
      // Revenir à la position précédente
      window.scrollTo(0, -storedScrollY);
    }
    console.log("selectedItem:", selectedItem);
  }, [selectedItem]);

  return (
    <div className="h-full min-h-screen w-screen bg-blue-700 p-5 flex justify-center items-center">
      <div className="grid grid-cols-4 gap-4">
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
          />
        ))}
      </div>

      {/* Affichage conditionnel du lecteur */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">          <div className="relative">
            {/* Rendu du UniversalPlayer avec la configuration sélectionnée */}
            <UniversalPlayer {...selectedItem} onClose={handleCloseModal} />
          </div>
        </div>
      )}

      {isMessageVisible && message && (
        <div
          className="popup-message"
          style={{
            position: "fixed",
            left: cursorPosition.x + 15,
            top: cursorPosition.y - 50,
            textAlign: "center",
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "1px",
            borderRadius: "5px",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Menu;
"use client";

import React, { useState, useEffect } from "react";
import DynamicButton from "../components/DynamicButton/DynamicButton";
import { items } from "../../data/items";
import dynamic from "next/dynamic";

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

  // Map pour associer chaque icône à son groupe (si nécessaire)
  const iconGroups = [
    ["Game", "GAMEr-Manette"],
    ["Music", "Music-boy"],
    ["MOVIES", "Movie-watching"],
    // ... autres groupes
  ];

  const iconToGroupMap: { [key: string]: string[] } = {};
  iconGroups.forEach((group) => {
    group.forEach((icon) => {
      iconToGroupMap[icon] = group;
    });
  });

  const handleItemClick = (type: string) => {
    // Trouver l'item correspondant au type
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
            onClick={() => handleItemClick(item.type)}
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
    </div>
  );
};

export default Menu;
"use client";

import React, { useState } from "react";
import DynamicButton from "../components/DynamicButton/DynamicButton";
import { items } from "../../data/items"


const Menu = () => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [hoveredIcons, setHoveredIcons] = useState<string[]>([]);
    // Dans votre composant Menu
    const iconGroups = [
        ['Game', 'GAMEr-Manette'],
        ['Music', 'Music-boy'],
        ['MOVIES', 'Movie-watching'],
        ['MOVIES', 'Movie-watching'],
    ];

    // Map pour associer chaque icône à son groupe
    const iconToGroupMap: { [key: string]: string[] } = {};
    iconGroups.forEach(group => {
    group.forEach(icon => {
        iconToGroupMap[icon] = group;
    });
    });
    const handleItemClick = (type: string) => {
      setSelectedItem(type);
    };
  
    const handleCloseModal = () => {
      setSelectedItem(null);
    };

    const handleMouseEnter = (type: string) => {
        const group = iconToGroupMap[type] || [type];
        setHoveredIcons(group);
      };
      
      const handleMouseLeave = (type: string) => {
        // Retirez le groupe de l'état des icônes survolées
        setHoveredIcons([]);
      };
  
    return (
      <div className="h-full bg-blue-700 p-5 flex justify-center">
        <div className="grid grid-cols-4 gap-4">
          {items.map((item, index) => (
            <DynamicButton
                key={index}
                defaultIcon={`/ICONES/${item.type}-hover.png`}
                hoverIcon={`/ICONES/${item.type}.png`}
                clickedIcon={`/ICONES/${item.type}-clic.png`}
                releasedIcon={`/ICONES/${item.type}.png`}
                onClick={() => handleItemClick(item.type)}
                onMouseEnter={() => handleMouseEnter(item.type)}
                onMouseLeave={() => handleMouseLeave(item.type)}
                buttonState={
                    hoveredIcons.includes(item.type)
                    ? 'hover'
                    : 'default'
                }
                />
          ))}
        </div>
  
        {/* Contenu modal dynamique */}
        {selectedItem && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow">
              <h2 className="text-xl font-bold">{selectedItem}</h2>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleCloseModal}
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Menu;
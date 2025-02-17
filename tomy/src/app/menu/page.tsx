"use client";

import React, { useState, useEffect } from "react";
import DynamicButton from "../components/DynamicButton/DynamicButtonMenu";
import { items } from "../../data/items";
import dynamic from "next/dynamic";
import { usePreloadImages } from "../hooks/usePreloadImages"
import { useRouter } from "next/navigation"; // Import du router
import Background from "../components/Background";
import Gourou from "../components/Gourou/Gourou";
import TicketPlayer from "../components/SingularPlayers/TicketPlayer";

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
  const router = useRouter(); // Initialisation du routeur
  const [showTicketPlayer, setShowTicketPlayer] = useState(false);
  const [scale, setScale] = useState(1);

  // Map pour associer chaque icône à son groupe (si nécessaire)
  const scaledValue = (value: number) => value * scale;


  useEffect(() => {
      const handleResize = () => {
          const windowHeight = window.innerHeight;
          const originalHeight = 555;
          const desiredHeight = windowHeight * 0.8;
          const newScale = desiredHeight / originalHeight;
          setScale(newScale);
        };
    
        handleResize();
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
  
  }, []);

  const iconGroups = [
    ["Game", "GAMEr-Manette"],
    ["Music", "Music-boy"],
    ["MOVIES", "Movie-watching"],
    // ... autres groupes
  ];

  const allImageUrls = items.flatMap((item) => [
    `/OPTIMIZED_ICONES/${item.type}-hover.avif`,
    `/OPTIMIZED_ICONES/${item.type}.avif`,
    // `/OPTIMIZED_ICONES/${item.type}-clic.avif`,
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
    // if (type === "Gourou" && event) {
    //   const gourouItem = items.find((item) => item.type === "Gourou");
    //   let displayedMessage = "Le Gourou est silencieux aujourd'hui.";
    //   if (gourouItem && Array.isArray(gourouItem.advice) && gourouItem.advice.length > 0) {
    //     const randomIndex = Math.floor(Math.random() * gourouItem.advice.length);
    //     displayedMessage = gourouItem.advice[randomIndex];
    //   }
    
    //   const { clientX, clientY } = event;
    //   setCursorPosition({ x: clientX, y: clientY });
    //   setMessage(displayedMessage);
    //   setIsMessageVisible(true);
    
    //   // Annuler le précédent timeout s’il existe
    //   if (timeoutId) {
    //     clearTimeout(timeoutId);
    //   }
    
    //   // Définir un nouveau timeout pour ce message
    //   const newTimeoutId = setTimeout(() => {
    //     setIsMessageVisible(false);
    //     setMessage(null);
    //   }, 5000);
    
    //   setTimeoutId(newTimeoutId); // Stocker le nouvel ID de timeout
    //   return;
    // }
  
    if (type === "PlaneMap") {
      router.push("/avion"); // Redirection vers la page map
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
<div className="relative min-h-screen w-screen flex justify-center items-center bg-blue-200">
  {/* Ajout du fond dynamique */}
  {/* <Background /> */}

  <video 
    className="absolute top-0 left-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="/vectors/ELEMENTS/ciel.mp4" type="video/mp4" />
    {/* Alternative pour d'autres formats */}
    {/* <source src="/videos/fond_avion.webm" type="video/webm" /> */}
    Votre navigateur ne supporte pas la vidéo.
  </video>

  <div className="relative top-0 left-0 w-screen h-screen overflow-hidden">
    <div
      className="absolute w-full h-full bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url('/vectors/ELEMENTS/FondCabine.png')`,
        backgroundSize: "auto 150vh", // Ajuste pour correspondre à la taille de l'écran
        backgroundPosition: "center left", // Bloque la position
      }}
    />

    <div className="relative top-0 left-0 w-full h-full">
      <div 
      className="absolute right-0 bottom-0 bg-[url('/vectors/ELEMENTS/siege.png')] bg-cover"
      style={{
        height: `${scaledValue(650)}px`,
        width: `${scaledValue(690)}px`,
      }}
      >
        <div 
          className="absolute"
          style={{
            left: `${scaledValue(135)}px`,   // Centre horizontalement
            top: `${scaledValue(105)}px`,   // Ajustement fin pour coller à l'écran
            width: `${scaledValue(440)}px`, // Taille ajustée pour correspondre à l'écran du siège
            height: `${scaledValue(340)}px`, // Hauteur ajustée
            // transform: "translate(-50%, -50%)", // Centre exactement
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // Grille de 3 colonnes
            gap:`${scaledValue(10)}px`, // Espacement entre les icônes
            padding: "10px",
            placeItems: "center",
            // backgroundColor: "blue", // Supprime le fond coloré
          }}
        >            
            {items.map((item, index) => (
              <DynamicButton
                key={index}
                defaultIcon={`/OPTIMIZED_ICONES/${item.type}-hover.avif`}
                hoverIcon={`/OPTIMIZED_ICONES/${item.type}.avif`}
                clickedIcon={`/OPTIMIZED_ICONES/${item.type}-hover.avif`}
                releasedIcon={`/OPTIMIZED_ICONES/${item.type}.avif`}
                onClick={(e) => handleItemClick(item.type, e)}
                onMouseEnter={() => handleMouseEnter(item.type)}
                onMouseLeave={() => handleMouseLeave(item.type)}
                buttonState={
                  hoveredIcons.includes(item.type) ? "hover" : "default"
                }
                style={{
                  height: `${scaledValue(90)}px`,
                  width: `${scaledValue(100)}px`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  objectFit: "contain",
                }}
              />
            ))}
        </div>
      </div>
    </div>
    
  {selectedItem && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">          
      <div className="relative">
        {/* Rendu du UniversalPlayer avec la configuration sélectionnée */}
        <UniversalPlayer {...selectedItem} onClose={handleCloseModal} />
      </div>
    </div>
  )}
  </div>
</div>
  );
};

export default Menu;
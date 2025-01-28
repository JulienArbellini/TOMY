import React, { useState, useEffect } from "react";
import InteractiveButton from "./InteractiveButton"; // Boutons personnalisés
import Player from "../Player/Player"; // Ton lecteur vidéo existant

interface MixedDiaporamaProps {
  items: { type: "image" | "video"; src: string }[]; // Liste mixte des médias
  frameSrc?: string; // Cadre décoratif pour les images uniquement
  onClose: () => void; // Fonction pour fermer le diaporama
}

const MixedDiaporama: React.FC<MixedDiaporamaProps> = ({
  items,
  frameSrc = "/vectors/ELEMENTS/Cadres/CadreSimple.avif", // Par défaut, un cadre simple pour les images
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Index actuel
  const [scale, setScale] = useState(1);

  const totalItems = items.length;
  const currentItem = items[currentIndex];

  // Gestion du redimensionnement pour l'échelle dynamique
  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const originalHeight = 555; // Taille de référence
      const desiredHeight = windowHeight * 0.8; // 80% de la hauteur de l'écran
      const newScale = desiredHeight / originalHeight;
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % totalItems);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);

  const scaledValue = (value: number) => value * scale;

  return (
    <div
      className="relative flex justify-center items-center"
      style={{
        height: `${scaledValue(550)}px`, // Hauteur totale
        width: `${scaledValue(640)}px`, // Largeur totale
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
      {/* Bouton de fermeture */}
      <InteractiveButton
        defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Exit.avif"
        hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif"
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitClic.avif"
        onClick={onClose}
        style={{
          position: "absolute",
          top: `${scaledValue(24)}px`,
          left: `${scaledValue(24)}px`,
          height: `${scaledValue(16)}px`,
          width: `${scaledValue(16)}px`,
          zIndex: 50,
        }}
      />

      {/* Bouton précédent */}
      <InteractiveButton
        defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Backwards.avif"
        hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/BackwardsHover.avif"
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/BackwardsClic.avif"
        onClick={handlePrev}
        style={{
          position: "absolute",
          left: `${scaledValue(26)}px`,
          bottom: `${scaledValue(30)}px`,
          width: `${scaledValue(27)}px`,
          height: `${scaledValue(27)}px`,
          zIndex: 100,
        }}
      />

      {/* Bouton suivant */}
      <InteractiveButton
        defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Forward.avif"
        hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ForwardHover.avif"
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ForwardClic.avif"
        onClick={handleNext}
        style={{
          position: "absolute",
          right: `${scaledValue(21)}px`,
          bottom: `${scaledValue(30)}px`,
          width: `${scaledValue(27)}px`,
          height: `${scaledValue(27)}px`,
          zIndex: 100,
        }}
      />

      {/* Conteneur des médias */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: `${scaledValue(47)}px`,
          left: `${scaledValue(29)}px`,
          height: `${scaledValue(437)}px`,
          width: `${scaledValue(590)}px`,
        }}
      >
        
        {currentItem.type === "image" ? (
          // Image avec ajustement à la taille du conteneur
          <img
            src={currentItem.src}
            alt={`Image ${currentIndex + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          // Vidéo sans cadre principal et avec ajustement pour masquer le logo YouTube
          <div
            className="relative"
            style={{
              overflow: "hidden",
              width: "100%",
              height: "100%",
            }}
          >
            <iframe
              src={`${currentItem.src}&controls=0`} // Désactiver les contrôles YouTube si possible
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: "-150%", // Ajuste pour centrer la vidéo
                left: 0,
                width: "100%",
                height: "400%", // Augmente la taille pour masquer le logo
                border: "none",
              }}
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default MixedDiaporama;
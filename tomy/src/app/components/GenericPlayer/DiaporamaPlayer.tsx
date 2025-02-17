import React, { useState, useEffect } from "react";
import InteractiveButton from "./InteractiveButton";

interface DiaporamaPlayerProps {
  images: string[]; // Liste des images du diaporama
  frameSrc?: string; // Chemin vers l'image du cadre
  onClose: () => void; // Fonction pour fermer le player
}

const DiaporamaPlayer: React.FC<DiaporamaPlayerProps> = ({
  images,
  frameSrc = "/vectors/ELEMENTS/Cadres/CadreSimple.avif",
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Index actuel du diaporama
  const [scale, setScale] = useState(1); // Échelle dynamique

  const totalImages = images.length;

  // Gestion du redimensionnement pour l'échelle
  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const originalHeight = 555; // Hauteur de référence pour l'échelle
      const desiredHeight = windowHeight * 0.8; // Cible 80% de la hauteur de l'écran
      const newScale = desiredHeight / originalHeight;
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fonction pour changer d'image
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const scaledValue = (value: number) => value * scale;

  if(frameSrc=="/vectors/ELEMENTS/Cadres/CadreEdgy.avif"){
    return (
      <div
        className="relative flex justify-center items-center"
        style={{
          height: `${scaledValue(590)}px`,
          width: `${scaledValue(690)}px`,
        }}
      >
        {/* Cadre principal */}
        <img
          src={frameSrc}
          alt="Cadre décoratif autour du contenu"
          style={{
            height: `${scaledValue(570)}px`,
            width: `${scaledValue(675)}px`,
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
            top: `${scaledValue(47)}px`,
            left: `${scaledValue(48)}px`,
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
            left: `${scaledValue(56)}px`,
            bottom: `${scaledValue(50)}px`,
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
            right: `${scaledValue(45)}px`,
            bottom: `${scaledValue(50)}px`,
            width: `${scaledValue(27)}px`,
            height: `${scaledValue(27)}px`,
            zIndex: 100,
          }}
        />
  
        {/* Conteneur des images */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: `${scaledValue(70)}px`,
            left: `${scaledValue(50)}px`,
            height: `${scaledValue(437)}px`,
            width: `${scaledValue(590)}px`,
          }}
        >
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    );
  }else{
    return (
      <div
        className="relative flex justify-center items-center"
        style={{
          height: `${scaledValue(550)}px`,
          width: `${scaledValue(640)}px`,
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
  
        {/* Conteneur des images */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: `${scaledValue(47)}px`,
            left: `${scaledValue(29)}px`,
            height: `${scaledValue(437)}px`,
            width: `${scaledValue(590)}px`,
          }}
        >
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    );
  }

};

export default DiaporamaPlayer;
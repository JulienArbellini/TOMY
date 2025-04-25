import React, { useState, useEffect } from "react";
import InteractiveButton from "./InteractiveButton";

/**
 * Représente un lien de contact pour un·e participant·e.
 */
interface ContactLink {
  /** Texte affiché (ex.: « LinkedIn », « Site web », « Email »). */
  label: string;
  /** URL vers la ressource. */
  url: string;
  /** Icône optionnelle pour le lien ; idéalement un fichier .svg ou .avif. */
  iconSrc?: string;
}

/**
 * Structure d'une diapositive « participant·e ».
 */
interface ParticipantSlide {
  /** Photo ou avatar du/de la participant·e. */
  photo: string;
  /** Nom du/de la participant·e (sera mis en valeur). */
  name: string;
  /** Paragraphe descriptif. */
  description: string;
  /** Liste de liens de contact (LinkedIn, portfolio, etc.). */
  contacts: ContactLink[];
}

interface DiaporamaHTMLPlayerProps {
  /** Slides contenant les infos des participant·e·s. */
  slides: ParticipantSlide[];
  /** Image du cadre (optionnelle). */
  frameSrc?: string;
  /** Fonction de fermeture. */
  onClose: () => void;
}

const DiaporamaHTMLPlayer: React.FC<DiaporamaHTMLPlayerProps> = ({
  slides,
  frameSrc = "/vectors/ELEMENTS/Cadres/CadreSimple.avif",
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);

  const totalSlides = slides.length;

  /* -------------------------------------------------- */
  /* Échelle dynamique (80 % de la hauteur de la fenêtre */
  /* -------------------------------------------------- */
  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const referenceHeight = 555; // hauteur de référence originale
      const desiredHeight = windowHeight * 0.8;
      setScale(desiredHeight / referenceHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ----------------- */
  /* Navigation slides */
  /* ----------------- */
  const handleNext = () => setCurrentIndex((i) => (i + 1) % totalSlides);
  const handlePrev = () =>
    setCurrentIndex((i) => (i - 1 + totalSlides) % totalSlides);

  const scaled = (v: number) => v * scale;
  const slide = slides[currentIndex];

  return (
    <div
      className="relative flex justify-center items-center"
      style={{ height: `${scaled(550)}px`, width: `${scaled(640)}px` }}
    >
      {/* Cadre principal */}
      <img
        src={frameSrc}
        alt="Cadre décoratif"
        style={{ height: `${scaled(538)}px`, width: `${scaled(638)}px` }}
      />

      {/* Bouton de fermeture */}
      <InteractiveButton
        defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Exit.avif"
        hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif"
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitClic.avif"
        onClick={onClose}
        style={{
          position: "absolute",
          top: `${scaled(24)}px`,
          left: `${scaled(24)}px`,
          height: `${scaled(16)}px`,
          width: `${scaled(16)}px`,
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
          left: `${scaled(26)}px`,
          bottom: `${scaled(30)}px`,
          width: `${scaled(27)}px`,
          height: `${scaled(27)}px`,
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
          right: `${scaled(21)}px`,
          bottom: `${scaled(30)}px`,
          width: `${scaled(27)}px`,
          height: `${scaled(27)}px`,
          zIndex: 100,
        }}
      />

      {/* Écran noir de fond (pour respecter le design existant) */}
      <img
        src="/vectors/ELEMENTS/Cadres/EcranNoir.avif"
        alt="Écran noir"
        className="absolute"
        style={{
          top: `${scaled(43)}px`,
          left: `${scaled(25)}px`,
          height: `${scaled(447)}px`,
          width: `${scaled(600)}px`,
        }}
      />

      {/* Conteneur dynamique pour la slide */}
      <div
        className="absolute overflow-hidden flex justify-center items-center"
        style={{
          top: `${scaled(47)}px`,
          left: `${scaled(29)}px`,
          height: `${scaled(437)}px`,
          width: `${scaled(590)}px`,
          backgroundImage: `url(${slide.photo})`,
          backgroundSize: "cover"
        }}
      >
        {/* Carte participant·e */}
        <div className="w-full h-full flex flex-col md:flex-row p-4 gap-4 text-black overflow-y-auto text-[1.7em]">
          {/* Photo */}
            {/* Liens de contact */}
            <div className="relative w-full">
              {slide.contacts.map((c, i) => (
                <a
                  key={i}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-[65px] right-[170px]  flex items-center gap-1 hover:underline"
                >
                  {c.iconSrc && (
                    <img
                      src={c.iconSrc}
                      alt={c.label}
                      className="w-5 h-5"
                    />
                  )}
                  <span>{c.label}</span>
                </a>
              ))}
            </div>

        </div>
      </div>
    </div>
  );
};

export default DiaporamaHTMLPlayer;

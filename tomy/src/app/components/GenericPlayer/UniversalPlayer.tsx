import React, { useRef, useState } from "react";
import PlayerFrame from "./PlayerFrame"; // Chemin vers votre PlayerFrame existant
import AudioPlayer from "./AudioPlayer";
import Slideshow from "./Slideshow";
import ControlButton from "../Player/ControlButton"; // Ajustez le chemin si nécessaire
import PlayerControls from "./PlayerControls";

interface UniversalPlayerProps {
  type: string;
  src?: string;
  tracks?: { src: string; title: string }[];
  images?: string[];
  frameType: string;
  autoplay?: boolean;
  loop?: boolean;
  controls?: boolean;
  scale?: number;
  onClick?: () => void;
  onClose: () => void; // Ajout de la prop onClose
  // Autres props spécifiques
}

const UniversalPlayer: React.FC<UniversalPlayerProps> = (props) => {
  const {
    type,
    src,
    images,
    frameType,
    autoplay = false,
    loop = false,
    controls = true,
    scale = 1, // Valeur par défaut pour le scale
    onClose,
    // Autres props spécifiques
  } = props;

  // Référence pour l'iframe vidéo
  const playerRef = useRef<HTMLIFrameElement>(null);

  // États pour gérer la lecture et la fin de la vidéo
  const [isPlayingAndDelay, setIsPlayingAndDelay] = useState<boolean>(false);
  const [isVideoEnded, setIsVideoEnded] = useState<boolean>(false);

  // Mapping de frameType à frameSrc
  const frameSrcMap: Record<string, string> = {
    ultrasimple: "/vectors/ELEMENTS/Cadres/CadreUltrasimple.avif",
    cadre1: "/vectors/ELEMENTS/Cadres/Cadre1.avif",
    edgy: "/vectors/ELEMENTS/Cadres/CadreEdgy.avif",
    surfy: "/vectors/ELEMENTS/Cadres/CadreSurfy.avif",
    bois: "/vectors/ELEMENTS/Cadres/CadreBois.avif",
    magazine: "/vectors/ELEMENTS/Cadres/CadreMagazine.avif",
    musique: "/vectors/ELEMENTS/Cadres/CadreMusique.webp",
    simple: "/vectors/ELEMENTS/Cadres/CadreSimple.avif",
    // Assurez-vous que les chemins correspondent à vos fichiers
  };

  const frameSrc = frameSrcMap[frameType] || "/vectors/ELEMENTS/Cadres/default.avif";

  // Gestion des types de contenu
  if (type === "video" && src) {
    return (
      <PlayerFrame
        playerRef={playerRef}
        isPlayingAndDelay={isPlayingAndDelay}
        isVideoEnded={isVideoEnded}
        scale={scale}
        src={src}
        onClose={onClose} // Passer la prop onClose
        frameSrc={frameSrc}
      />
    );
  } else if (type === "audio") {
    return (
      <AudioPlayer
        tracks={props.tracks} // Passer la liste des pistes
        src={src} // Optionnel : pour compatibilité avec une seule piste
        autoplay={autoplay}
        controls={controls}
        onClose={onClose}
      />
    );

  } else if (type === "diaporama" && images) {
    return (
      <PlayerFrame frameSrc={frameSrc} scale={scale}  onClose={onClose}>
        <Slideshow images={images} />
      </PlayerFrame>
    );
  } else if (type === "game" && src) {
    return (
      <PlayerFrame frameSrc={frameSrc} scale={scale}  onClose={onClose}>
        <iframe src={src} className="w-full h-full" title="Game Content"></iframe>
      </PlayerFrame>
    );
  } else if (type === "interactive") {
    // Gérer les contenus interactifs selon vos besoins
    return (
      <PlayerFrame frameSrc={frameSrc} scale={scale}  onClose={onClose}>
        {/* Votre contenu interactif */}
      </PlayerFrame>
    );
  } else if (type === "custom") {
    // Gérer les contenus personnalisés selon vos besoins
    return (
      <PlayerFrame frameSrc={frameSrc} scale={scale}  onClose={onClose}>
        {/* Votre contenu personnalisé */}
      </PlayerFrame>
    );
  } else {
    return null;
  }
};

export default UniversalPlayer;
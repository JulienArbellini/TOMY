import React, { useRef, useState } from "react";
import PlayerFrame from "./PlayerFrame"; // Chemin vers votre PlayerFrame existant
import AudioPlayer from "./AudioPlayer";
import Gourou from "../Gourou/Gourou";
import DiaporamaPlayer from "./DiaporamaPlayer";
import ControlButton from "../Player/ControlButton"; // Ajustez le chemin si nécessaire
import PlayerControls from "./PlayerControls";
import { usePreloadImages } from "../../hooks/usePreloadImages";
import MixedDiaporama from "./MixedDiaporama";
import Player from "../Player/Player";
import { redirect } from "next/dist/server/api-utils";
import TicketPlayer from "../SingularPlayers/TicketPlayer";

interface UniversalPlayerProps {
  type: string;
  src?: string;
  tracks?: { src: string; title: string }[];
  images?: string[];
  frameType: string;
  videoSrc?: string; // Vidéo spécifique pour les types "mixed"
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
    videoSrc,
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

  const playerImages = [
    "/OPTIMIZED_PLAYER/Play.avif",
    "/OPTIMIZED_PLAYER/PlayHover.avif",
    "/OPTIMIZED_PLAYER/PlayClic.avif",
    "/OPTIMIZED_PLAYER/Pause.avif",
    "/OPTIMIZED_PLAYER/PauseHover.avif",
    "/OPTIMIZED_PLAYER/PauseClic.avif",
    "/OPTIMIZED_PLAYER/Next.avif",
    "/OPTIMIZED_PLAYER/NextHover.avif",
    "/OPTIMIZED_PLAYER/NextClic.avif",
    "/OPTIMIZED_PLAYER/Previous.avif",
    "/OPTIMIZED_PLAYER/PreviousHover.avif",
    "/OPTIMIZED_PLAYER/PreviousClic.avif",
    "/OPTIMIZED_PLAYER/Exit.avif",
    "/OPTIMIZED_PLAYER/ExitHover.avif",
    "/OPTIMIZED_PLAYER/ExitClic.avif",
  ];

  // Précharger les images
  usePreloadImages(playerImages);

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
    plante: "/vectors/ELEMENTS/Cadres/CadrePlante.avif",
    bleu: "/vectors/ELEMENTS/Cadres/CadreBleu.avif",
    // Assurez-vous que les chemins correspondent à vos fichiers
  };

  const frameSrc = frameSrcMap[frameType] || "/vectors/ELEMENTS/Cadres/default.avif";

  // Gestion des types de contenu
  if (type === "video" && src) {
    return (
      <Player src={src} onClose={onClose} frameSrc={frameSrc}>
      {/* <Player src="https://www.youtube.com/embed/Qi1krsuYN1M"> */}
      </Player>
 
    );
  } else if (type === "video-automatique" && src){
    return (
            <PlayerFrame
        playerRef={playerRef}
        isPlayingAndDelay={isPlayingAndDelay}
        isVideoEnded={isVideoEnded}
        scale={scale}
        src={src}
        onClose={onClose} // Passer la prop onClose
        frameSrc={frameSrc}
        controls={controls}
      />
    );
  }
  
  else if (type === "audio") {
    return (
      <AudioPlayer
        tracks={props.tracks} // Passer la liste des pistes
        src={src} // Optionnel : pour compatibilité avec une seule piste
        autoplay={autoplay}
        controls={controls}
        onClose={onClose}
        scale={scale}
      />
    );

  }else if (type === "Hermes") {
    return (
      <TicketPlayer
        onClose={onClose}
        scale = {scale}
      />
    );

  }
  else if (type === "diaporama" && images) {
    return (
      <DiaporamaPlayer images={images} frameSrc={frameSrc} onClose={onClose} />
    );
  } else if (type === "game" && src) {
    return (
      <PlayerFrame frameSrc={frameSrc} scale={scale}  onClose={onClose} vitre={false}>
        <iframe src={src} className="w-full h-full" title="Game Content" ></iframe>
      </PlayerFrame>
    );
  } else if (type === "interactive") {
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
  }else if (type === "mixed" && images && videoSrc) {
    // Conversion explicite en types "image" et "video"
    const items = [
      ...images.map((image) => ({ type: "image" as const, src: image })),
      { type: "video" as const, src: videoSrc },
    ];
  
    return (
      <MixedDiaporama
        items={items}
        frameSrc={frameSrc}
        onClose={onClose}
      />
    );
  }

  return null;
};

export default UniversalPlayer;
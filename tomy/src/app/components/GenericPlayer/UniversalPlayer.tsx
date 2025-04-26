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
import DiaporamaHTMLPlayer from "./DiaporamaHTMLPlayer";

interface UniversalPlayerProps {
  type: string;
  src?: string;
  tracks?: { src: string; title: string }[];
  images?: string[];
  videos?: string[];

  media?: { type: "video" | "image"; src: string; }[];

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
    videos,
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

  // console.log(props)

  // États pour gérer la lecture et la fin de la vidéo
  const [isPlayingAndDelay, setIsPlayingAndDelay] = useState<boolean>(false);
  const [isVideoEnded, setIsVideoEnded] = useState<boolean>(false);

  const playerImages = [
    "/vectors/ELEMENTS/BoutonsPlayer/Play.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/PlayHover.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/PlayClic.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/Pause.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/PauseHover.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/PauseClic.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/Forward.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/ForwardHover.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/ForwardClic.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/Backwards.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/BackwardsHover.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/BackwardsClic.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/Exit.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/ExitClic.avif",
  ];


  const participants =  [
    {
      photo: "/images/content/Crew/01-TomyAirlinesCrew.avif",
      name: "Tomy Airlines Crew",
      description: "",
      contacts: [

      ],

    },
    {
      photo: "/images/content/Crew/02-Tomy.avif",
      name: "Tomy",
      description: "",
      contacts: [
        { label: "https://linktr.ee/thomaspalmer", url: "https://linktr.ee/thomaspalmer" },
      ],
    },
    {
      photo: "/images/content/Crew/03-Julien.avif",
      name: "Julien",
      description: "",
      contacts: [
        { label: "https://julien-arbellini.vercel.app", url: "https://julien-arbellini.vercel.app" },
      ],
    },
    {
      photo: "/images/content/Crew/04-Clelia.avif",
      name: "Clélia",
      description: "",
      contacts: [
        { label: "https://www.instagram.com/cleliaguy", url: "https://www.instagram.com/cleliaguy" },
      ],
    },
    {
      photo: "/images/content/Crew/05-Augustin.avif",
      name: "Augustin",
      description: "",
      contacts: [
        { label: "https://linktr.ee/labaladeauxmiroirs", url: "https://linktr.ee/labaladeauxmiroirs" },
      ],
    },
    {
      photo: "/images/content/Crew/06-Amedee.avif",
      name: "Amédée",
      description: "",
      contacts: [
        { label: "https://www.instagram.com/amedeeberiot.arts", url: "https://www.instagram.com/amedeeberiot.arts" },
      ],
    },
    {
      photo: "/images/content/Crew/07-Sarah.avif",
      name: "Sarah",
      description: "",
      contacts: [
        { label: "https://www.instagram.com/brunonesarah", url: "https://www.instagram.com/brunonesarah" },
      ],
    },
    {
      photo: "/images/content/Crew/08-Morgane.avif",
      name: "Morgane",
      description: "",
      contacts: [
        { label: "https://www.instagram.com/lefilroux", url: "https://www.instagram.com/lefilroux" },
      ],
    },
    {
      photo: "/images/content/Crew/09-Victoria.avif",
      name: "Victoria",
      description: "",
      contacts: [
        { label: "https://www.instagram.com/victoria___scott", url: "https://www.instagram.com/victoria___scott" },
      ],
    },
    {
      photo: "/images/content/Crew/10-Antoine.avif",
      name: "Antoine",
      description: "",
      contacts: [
        { label: "https://linktr.ee/antoinedubos", url: "https://linktr.ee/antoinedubos" },
      ],
    },
    {
      photo: "/images/content/Crew/11-Evelyne.avif",
      name: "Evelyne",
      description: "",
      contacts: [
        { label: " https://www.instagram.com/evelyne_pg", url: " https://www.instagram.com/evelyne_pg" },
      ],
    },
    {
      photo: "/images/content/Crew/13-Coline.avif",
      name: "Coline",
      description: "",
      contacts: [
        { label: "coline.poisson2@gmail.com", url: "" },
      ],
    },
    {
      photo: "/images/content/Crew/14-TomJunior.avif",
      name: "Tom Junior",
      description: "",
      contacts: [
        { label: "tomyairlinescrew@gmail.com", url: "tomyairlinescrew@gmail.com" },
      ],
    },
    /* Diapo finale “remerciements” — à traiter différemment si besoin */
    {
      photo: "/images/content/Crew/15-Remerciements.avif",
      name: "Remerciements",
      description: "",
      contacts: [

      ],
    },
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
    ticket: "/vectors/ELEMENTS/Cadres/FondTicket.avif",
    noir: "/vectors/ELEMENTS/Cadres/CadreNoir.avif",

    // Assurez-vous que les chemins correspondent à vos fichiers
  };

  const frameSrc = frameSrcMap[frameType] || "/vectors/ELEMENTS/Cadres/default.avif";

  // Gestion des types de contenu
  if (type === "video" && src) {
    return (
      <Player src={src} onClose={onClose} frameSrc={frameSrc}>
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
  } 
  else if (type === "diaporamaHTML" && images) {
    return (
      <DiaporamaHTMLPlayer slides={participants} onClose={onClose} />
    );
  } 
  else if (type === "game" && src) {
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
  }else if (type === "mixed" && props.media) {
    // Conversion explicite en types "image" et "video"
    // const items = [
    //   ...images.map((image) => ({ type: "image" as const, src: image })),
    //   ...videos.map((video) => ({type:"video" as const, src: video})),
    // ];
    // const items = playerConfig.media;
    console.log(props.media);

  
    return (
      <MixedDiaporama
        items={props.media}
        frameSrc={frameSrc}
        onClose={onClose}
      />
    );
  }

  return null;
};

export default UniversalPlayer;
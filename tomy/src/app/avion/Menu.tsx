"use client"; 
// On peut garder "use client" pour autoriser useState, useEffect, etc. si on est dans Next.js (App Router)

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; 
import DynamicButton from "../components/DynamicButton/DynamicButton";
import InteractiveButton from "../components/GenericPlayer/InteractiveButton";
import UniversalPlayer from "../components/GenericPlayer/UniversalPlayer";
import { items } from "../../data/items-avion";

// Types, interfaces...
interface GourouMessage {
  message: string;
  x: number;
  y: number;
  followCursor?: boolean;
}

interface AvionMenuProps{
  onSiegeClick? : () => void;
}

// Le composant
const AvionMenu: React.FC<AvionMenuProps> = ({
  onSiegeClick,
}) => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [hoveredIcons, setHoveredIcons] = useState<string[]>([]);
  const avionContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 1, height: 1 });
  const [zoomLevel, setZoomLevel] = useState(0.01);
  const [isPhoneShaking, setIsPhoneShaking] = useState(false);
  const [gourouMessage, setGourouMessage] = useState<GourouMessage | null>(null);
  const gourouTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const lastSoundTime = useRef<number>(0);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });
  const mouseMoveRef = useRef<(e: MouseEvent) => void>();
  const [initialZoomIn, setInitialZoomIn] = useState(true);

  const [zoom, setZoom] = useState(1);
  // Pour « scroller » au centre quand on change de zoom
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Dimensions "de base" de l'avion (largeur × hauteur)
  const IMAGE_WIDTH = 7016;
  const IMAGE_HEIGHT = 6560;

  useEffect(() => {
    function initZoom() {
      const screenHeight = window.innerHeight;
      const baseZoom = (screenHeight * 1.25) / IMAGE_HEIGHT;
      setZoom(baseZoom);
    }
    initZoom();
    window.addEventListener("resize", initZoom);
    return () => window.removeEventListener("resize", initZoom);
  }, []);


  // Quand le zoom change, on veut recadrer la vue pour rester « centré » 
  // (facultatif, mais souvent pratique)
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scaledWidth = IMAGE_WIDTH * zoom;
    const scaledHeight = IMAGE_HEIGHT * zoom;

    // On centre dans le scroll (optionnel, à ajuster selon ta préférence).
    // Le "centre" de l'image doit se retrouver au centre du conteneur visible.
    const scrollX = (scaledWidth - container.clientWidth) / 2;
    const scrollY = (scaledHeight - container.clientHeight) / 2;

    container.scrollLeft = Math.max(scrollX, 0);
    container.scrollTop = Math.max(scrollY, 0);
  }, [zoom]);

  // Quelques handlers pour zoomer/dézoomer
  const handleZoomIn = () => setZoom((z) => z * 1.1);  // zoom +10%
  const handleZoomOut = () => setZoom((z) => z * 0.9); // zoom -10%





useEffect(() => {
  function handleResize() {
    // On veut que l’avion fasse 125% de la fenêtre en hauteur,
    // pour n’en voir réellement que 80%.
    // Taille « réelle » avion = 900 px → scale = (H * 1.25) / 900
    // Simplifié : scale = H / 720
    const H = window.innerHeight;
    setZoomLevel(H / 720); // => 720 = 900 * 0.8
  }
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  // Fonctions de souris
  const startGlobalMouseMove = () => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
    };
    mouseMoveRef.current = handleGlobalMouseMove;
    window.addEventListener("mousemove", handleGlobalMouseMove);
  };
  const stopGlobalMouseMove = () => {
    if (mouseMoveRef.current) {
      window.removeEventListener("mousemove", mouseMoveRef.current);
      mouseMoveRef.current = undefined;
    }
  };



  // Hover icônes
  const handleMouseEnter = (type: string, event: React.MouseEvent) => {
    setHoveredIcons((prev) => [...prev, type]);
    const hoverAudio = new Audio("/sounds/Icone-hover.mp3");
    hoverAudio.volume = 0.05;
    hoverAudio.play().catch((err) => console.error("Erreur audio :", err));

    if (type === "OIseaux") {
      const birds = new Audio("/sounds/Oiseaux.mp3");
      birds.volume = 0.15;
      birds.play().catch((err) => console.error("Erreur audio :", err));
    }
    if (type === "Brace") {
      setTooltip({ visible: true, x: event.clientX, y: event.clientY });
      startGlobalMouseMove();
    }
  };
  const handleMouseLeave = (type: string) => {
    setHoveredIcons((prev) => prev.filter((icon) => icon !== type));
    if (type === "Brace") {
      setTooltip({ visible: false, x: 0, y: 0 });
      stopGlobalMouseMove();
    }
  };

  // Clic sur icône
  const handleItemClick = (type: string, event?: React.MouseEvent) => {
    const item = items.find((it) => it.type === type);
    if (!item) return;

    // Redirection
    if (item.type === "Siegevide" && onSiegeClick) {
      onSiegeClick()
      return;
    }

    // Sons divers
    if (
      (item.type === "Telephone" ||
        item.type === "Cuisine" ||
        item.type === "PiscineSimple") &&
      item.playerConfig?.action === "playSound"
    ) {
      const audio = new Audio(item.playerConfig.soundSrc);
      if (item.type === "Telephone") {
        setIsPhoneShaking(true);
      }
      audio.volume = 0.1;
      audio.play().catch((err) => console.error("Erreur audio :", err));
      audio.onended = () => setIsPhoneShaking(false);
      return;
    }

    // Son clic
    if (
      item.type !== "Telephone" &&
      item.type !== "Cuisine" &&
      item.type !== "PiscineSimple" &&
      item.type !== "Gourou"
    ) {
      const clickSound = new Audio("/sounds/Icone-clic.mp3");
      clickSound.play().catch((err) => console.error("Erreur audio :", err));
    }

    // Gourou
    if (item.type === "Gourou" && item.advice) {
      const randomIndex = Math.floor(Math.random() * item.advice.length);
      const randomAdvice = item.advice[randomIndex];
      const now = Date.now();
      if (now - lastSoundTime.current >= 5000) {
        if (Math.random() < 0.5) {
          const soundSrc =
            Math.random() < 0.5
              ? "/sounds/GourouSound1.wav"
              : "/sounds/GourouSound2.wav";
          const audio = new Audio(soundSrc);
          audio.play().catch((err) => console.error("Erreur audio :", err));
          lastSoundTime.current = now;
        }
      }
      if (event) {
        setGourouMessage({
          message: randomAdvice,
          x: item.x,
          y: item.y + 150,
        });
        if (gourouTimeout.current) {
          clearTimeout(gourouTimeout.current);
        }
        gourouTimeout.current = setTimeout(() => {
          setGourouMessage(null);
        }, 5000);
      }
      return;
    }

    // Lecteur universel
    setSelectedItem(item?.playerConfig || null);
  };

  // Retire le message Gourou auto après 10s
  useEffect(() => {
    if (gourouMessage) {
      const timer = setTimeout(() => setGourouMessage(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [gourouMessage]);

  // Rendu
  return (
    <div>
      <div
        ref={scrollContainerRef}
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "auto",
          position: "relative",
        }}
        
        >
        {/* <video 
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://res.cloudinary.com/dh3nxjopm/video/upload/v1740102278/Free_2D_Cloud_Animation_l_Cartoon_Background_For_Free_l_No_Copyright_etu2me.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video> */}


      {/* Conteneur "centré" */}
      <div
        style={{
          width: IMAGE_WIDTH * zoom,
          height: IMAGE_HEIGHT * zoom,
          position: "relative",
          margin: "0 auto", 
          transition: initialZoomIn ? "transform 4s ease-in-out" : "none",
          // margin "auto" pour centrer horizontalement 
          // si la largeur totale est < la fenêtre 
        }}
      >

<img
          src="/vectors/ELEMENTS/FondAvion.avif"
          alt="Avion"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block", // évite l’espace blanc sous l’image en inline
          }}
        />

          {/* Message Gourou */}
          {gourouMessage && (
            <div
              className="absolute bg-white text-black border border-black rounded-lg p-3 shadow-lg z-50"
              style={{
                left: gourouMessage.followCursor
                  ? `${(gourouMessage.x / containerSize.width) * 100}%`
                  : `${(gourouMessage.x / 1440) * 100}%`,
                top: gourouMessage.followCursor
                  ? `${(gourouMessage.y / containerSize.height) * 100}%`
                  : `${(gourouMessage.y / 900) * 100}%`,
                transform: "translate(-50%, -50%)",
                maxWidth: "250px",
                fontFamily: "'Comic Sans MS', 'Chalkboard SE', sans-serif",
              }}
            >
              <p
                className="text-center"
                dangerouslySetInnerHTML={{ __html: gourouMessage.message }}
              />
            </div>
          )}

          {/* Icônes dynamiques */}
          {items.map((item, index) => {
            const isFloating = ["AirLounge", "Serre", "Terrasse"].includes(
              item.type
            );
            const isHovered = hoveredIcons.includes(item.type);

            return (
              <DynamicButton
                key={index}
                defaultIcon={`/OPTIMIZED_ICONES/${item.type}-hover.avif`}
                hoverIcon={`/OPTIMIZED_ICONES/${item.type}.avif`}
                clickedIcon={`/OPTIMIZED_ICONES/${item.type}-clic.avif`}
                releasedIcon={`/OPTIMIZED_ICONES/${item.type}.avif`}
                onClick={(e) => handleItemClick(item.type, e)}
                onMouseEnter={(e) => handleMouseEnter(item.type, e)}
                onMouseLeave={() => handleMouseLeave(item.type)}
                buttonState={isHovered ? "hover" : "default"}
                style={{
                  position: "absolute",
                  top: `${(item.y || 0) / 900 * 100}%`,
                  left: `${(item.x || 0) / 1440 * 100}%`,
                  width: `${((item.width || 50) / 1440) * 100}%`,
                  height: `${(50 / 900) * 100}%`,
                  transform: `translate(-50%, -50%) ${
                    isFloating && isHovered ? "translateY(-10px)" : ""
                  }`,
                  transition: "transform 0.3s ease-in-out",
                  animation:
                    item.type === "Telephone" && isPhoneShaking
                      ? "shake 0.4s ease-in-out infinite"
                      : "none",
                  opacity: 1,
                }}
              />
            );
          })}
        </div>

        {/* UniversalPlayer si item sélectionné */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <UniversalPlayer
              {...selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          </div>
        )}
      </div>

      {/* Boutons de zoom */}
      <div className="fixed top-[10px] right-[155px] flex gap-2 z-50">
        <InteractiveButton
          defaultIcon="/OPTIMIZED_ICONES/ZoomPlus.avif"
          hoverIcon="/OPTIMIZED_ICONES/ZoomPlus-hover.avif"
          clickedIcon="/OPTIMIZED_ICONES/ZoomPlus-clic.avif"
          onClick={handleZoomIn}
          style={{
            position: "absolute",
            top: "5px",
            left: "75px",
            width: "50px",
            height: "50px",
          }}
        />
        <InteractiveButton
          defaultIcon="/OPTIMIZED_ICONES/ZoomMoins.avif"
          hoverIcon="/OPTIMIZED_ICONES/ZoomMoins-hover.avif"
          clickedIcon="/OPTIMIZED_ICONES/ZoomMoins-clic.avif"
          onClick={handleZoomOut}
          style={{
            position: "absolute",
            top: "5px",
            left: "5px",
            width: "50px",
            height: "50px",
          }}
        />
      </div>

      {/* Tooltip "Brace" */}
      {tooltip.visible && (
        <div
          className="absolute bg-white text-black border text-center border-black rounded-lg p-2 shadow-lg z-50"
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y + 25,
            pointerEvents: "none",
            fontFamily: "monospace, sans-serif",
            fontSize: "14px",
          }}
        >
          En cas de crash <br /> attrapez le nuage <br /> sous votre siège <br /> 
          et serrez-le <br /> de toutes vos forces.
        </div>
      )}
    </div>
  );
}

export default AvionMenu
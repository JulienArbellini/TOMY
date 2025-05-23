"use client";

import React, { useEffect, useRef, useState, CSSProperties} from "react";


interface Track {
  src: string;
  title: string;
}

interface AudioPlayerProps {
  tracks?: Track[];
  src?: string;
  title?: string;
  scale?: number;
  autoplay?: boolean;
  controls?: boolean;
  frameSrc?: string;
  onClose: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  tracks = [],
  src,
  title = "Titre inconnu",
  autoplay = false,
  controls = true,
  frameSrc = "/vectors/ELEMENTS/Cadres/CadreMusique.webp",
  onClose,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [p5Instance, setP5Instance] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  // Créer une liste de pistes
  const trackList: Track[] = tracks || [{ src: src!, title }];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const currentTrack = trackList[currentTrackIndex];

  const scaledValue = (value: number) => value * scale;

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
  
      const originalWidth = 556; // Votre largeur de référence
      const originalHeight = 337; // Votre hauteur de référence
  
      // On vise 80% de la taille de la fenêtre en largeur et en hauteur
      const desiredWidth = windowWidth * 0.5;
      const desiredHeight = windowHeight * 0.5;
  
      // Calculer le scale basé sur la hauteur et la largeur
      const scaleHeight = desiredHeight / originalHeight;
      const scaleWidth = desiredWidth / originalWidth;
  
      // Choisir le plus petit scale pour que tout rentre sans déformation
      const newScale = Math.min(scaleHeight, scaleWidth);
  
      setScale(newScale);
    };
  
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let localP5Instance: any;
    let fft: any;

    const loadP5 = async () => {
      const p5Module = await import("p5");
      const p5 = p5Module.default;
      (window as any).p5 = p5;
      await import("p5/lib/addons/p5.sound");

      const sketch = (p: any) => {
        p.setup = () => {
          const canvas = p.createCanvas(
            scaledValue(580),
            scaledValue(280)
          );
          canvas.parent(canvasContainerRef.current!);
          fft = new p5.FFT();
          p.noFill();

          if (audioRef.current) {
            const audioContext = p.getAudioContext();
            const mediaElement = audioContext.createMediaElementSource(audioRef.current);
            mediaElement.connect(audioContext.destination);
            fft.setInput(mediaElement);
          }
        };

        p.draw = () => {
          p.background(0);
          const waveform = fft.waveform();

          p.noFill();
          p.stroke(0, 255, 0);
          p.strokeWeight(2);
          p.beginShape();
          for (let i = 0; i < waveform.length; i++) {
            const x = p.map(i, 0, waveform.length, 0, p.width);
            const y = p.map(waveform[i], -1, 1, 0, p.height);
            p.vertex(x, y);
          }
          p.endShape();
        };
      };

      localP5Instance = new p5(sketch);
      setP5Instance(localP5Instance);
    };

    loadP5();

    return () => {
      if (localP5Instance) localP5Instance.remove();
    };
  }, []);

  useEffect(() => {
    if (p5Instance) {
      // On attend le prochain rafraîchissement d'affichage
      requestAnimationFrame(() => {
        p5Instance.resizeCanvas(scaledValue(580), scaledValue(280));
      });
    }
  }, [p5Instance, scale]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex]);

  // **Actions des contrôles personnalisés**
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const increaseVolume = () => {
    if (audioRef.current) {
      const newVolume = Math.min(volume + 0.1, 1);
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const decreaseVolume = () => {
    if (audioRef.current) {
      const newVolume = Math.max(volume - 0.1, 0);
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const playNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setIsPlaying(true);
  };

  const playPreviousTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
    setIsPlaying(true);
  };

  // Composant pour chaque bouton (inchangé)
  const AudioControlButton = ({
    defaultIcon,
    hoverIcon,
    clickedIcon,
    style,
    onClick,
  }: {
    defaultIcon: string;
    hoverIcon: string;
    clickedIcon: string;
    style: CSSProperties;
    onClick: () => void;
  }) => {
    const [buttonState, setButtonState] = useState<"default" | "hover" | "clicked">("default");

    const handleMouseEnter = () => setButtonState("hover");
    const handleMouseLeave = () => setButtonState("default");
    const handleMouseDown = () => setButtonState("clicked");
    const handleMouseUp = () => setButtonState("hover");

    const currentIcon =
      buttonState === "clicked"
        ? clickedIcon
        : buttonState === "hover"
        ? hoverIcon
        : defaultIcon;

    return (
      <div
        className="bg-cover cursor-pointer"
        style={{
          height: `${scaledValue(40)}px`,
          width: `${scaledValue(40)}px`,
          ...style,
          backgroundImage: `url(${currentIcon})`,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={onClick}
      ></div>
    );
  };

  return (
    <div
      className="relative flex flex-col items-center"
      style={{
        height: `${scaledValue(337)}px`,
        width: `${scaledValue(556)}px`,
      }}
    >
      {/* Cadre décoratif */}
      <img
        src={frameSrc}
        alt="Utilise google chrome frero"
        style={{
          height: `${scaledValue(337)}px`,
          width: `${scaledValue(556)}px`,
        }}
      />

      {/* Titre de la piste */}
      <div
        className="text-lg font-bold mb-4 z-10"
        style={{
          position: "absolute",
          top: `${scaledValue(60)}px`,   // centre vertical
          left: `${scaledValue(208 + 335/2)}px`, // centre horizontal
          transform: "translate(-50%, -50%)",    // décale le texte de la moitié de sa propre largeur/hauteur
          textAlign: "center",
        }}
      >
        {currentTrack.title}
      </div>

      {/* Canvas pour la visualisation avec p5 */}
      <div
        ref={canvasContainerRef}
        className="absolute w-full flex justify-center items-center"
        style={{
          top: `${scaledValue(8)}px`,
          left: `${scaledValue(208)}px`,
          height: `${scaledValue(210)}px`,
          width: `${scaledValue(335)}px`,
          borderRadius: `50%`,
          backgroundColor: "black",
          overflow: "hidden",
        }}
      ></div>

      {/* Contrôles audio personnalisés */}
    
      {/* Previous Track */}
      <AudioControlButton
        defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Backwards.avif"
        hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/BackwardsHover.avif"
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/BackwardsClic.avif"
        onClick={playPreviousTrack}
        style={{
          position: "absolute",
          bottom: `${scaledValue(52)}px`,
          left: `${scaledValue(112)}px`,
          width: `${scaledValue(60)}px`,
          height: `${scaledValue(60)}px`,
        }}
      />

        {/* Play/Pause */}
        <AudioControlButton
          defaultIcon={isPlaying ? "/vectors/ELEMENTS/BoutonsPlayer/Pause.avif" : "/vectors/ELEMENTS/BoutonsPlayer/Play.avif"}
          hoverIcon={isPlaying ? "/vectors/ELEMENTS/BoutonsPlayer/PauseHover.avif" : "/vectors/ELEMENTS/BoutonsPlayer/PlayHover.avif"}
          clickedIcon={isPlaying ? "/vectors/ELEMENTS/BoutonsPlayer/PauseClic.avif" : "/vectors/ELEMENTS/BoutonsPlayer/PlayClic.avif"}
          onClick={togglePlayPause}
          style={{
            position: "absolute",
            bottom: `${scaledValue(52)}px`,
            left: `${scaledValue(45)}px`,
            width: `${scaledValue(60)}px`,
            height: `${scaledValue(60)}px`,
          }}
        />

        {/* Next Track */}
        <AudioControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Forward.avif"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ForwardHover.avif"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ForwardClic.avif"
          onClick={playNextTrack}
          style={{
            position: "absolute",
            bottom: `${scaledValue(52)}px`,
            left: `${scaledValue(180)}px`,
            width: `${scaledValue(60)}px`,
            height: `${scaledValue(60)}px`,
          }}
        />

        {/* Volume Down */}
        <AudioControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeDown.avif"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeDownHover.avif"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeDownClic.avif"
          onClick={decreaseVolume}
          style={{
            position: "absolute",
            bottom: `${scaledValue(85)}px`,
            right: `${scaledValue(60)}px`,
          }}
        />

        {/* Volume Up */}
        <AudioControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeUp.avif"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeUpHover.avif"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeUpClic.avif"
          onClick={increaseVolume}
          style={{
            position: "absolute",
            bottom: `${scaledValue(65)}px`,
            right: `${scaledValue(15)}px`,
          }}
        />

        {/* Mute */}
        <AudioControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Mute.avif"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/MuteHover.avif"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/MuteClic.avif"
          onClick={toggleMute}
          style={{
            position: "absolute",
            bottom: `${scaledValue(110)}px`,
            right: `${scaledValue(15)}px`,
          }}
        />

        {/* Close */}
        <AudioControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Exit.avif"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitClic.avif"
          onClick={onClose}
          style={{
            position: "absolute",
            bottom: `${scaledValue(7)}px`,
            left: `${scaledValue(7)}px`,
          }}
        />


      {/* Élément audio caché */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        autoPlay={autoplay}
        controls={false}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default AudioPlayer;
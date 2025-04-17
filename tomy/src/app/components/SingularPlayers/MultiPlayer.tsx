"use client";

import React, { useEffect, useRef, useState, CSSProperties} from "react";


interface Track {
  src: string;
  title: string;
}

interface MultiPlayerProps {
  tracks?: Track[];
  src?: string;
  title?: string;
  scale?: number;
  autoplay?: boolean;
  controls?: boolean;
  frameSrc?: string;
  onClose: () => void;
}

const MultiPlayer: React.FC<MultiPlayerProps> = ({
  tracks = [],
  src,
  title = "Titre inconnu",
  autoplay = false,
  controls = true,
  frameSrc = "/VERSION_MOBILE/ELEMENTS/Fonds/AvionVertical.png",
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
      const windowWidth = window.innerWidth;
      const originalWidth = 556;
      const originalHeight = 337;
      const ratio = originalHeight / originalWidth;
    
      const maxWidth = windowWidth*0.9;
      const maxHeight = maxWidth * ratio;
    
      const scaleWidth = maxWidth / originalWidth;
      const scaleHeight = maxHeight / originalHeight;
    
      const newScale = Math.min(scaleWidth, scaleHeight);
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
    className="h-screen w-full flex justify-center"
    style={{ 
      backgroundImage: `url(${frameSrc})`,
      backgroundSize: "cover"
     }}
    >
      <div
        className="relative flex flex-col items-center"
        style={{

          top: `${scaledValue(115)}px`,
          height: `${scaledValue(337)}px`,
          width: `${scaledValue(576)}px`,
        }}
      >
        {/* Cadre décoratif */}
        <img
          src={"VERSION_MOBILE/ELEMENTS/TopEcran.png"}
          alt="Cadre décoratif autour du contenu"
          style={{
            height: `${scaledValue(17)}px`,
            width: `${scaledValue(566)}px`,
          }}
        />

        {/* Titre de la piste */}
        <div
          className="text-lg font-bold mb-4 z-10"
          style={{
            position: "absolute",
            top: `${scaledValue(60)}px`,   // centre vertical
            left: `${scaledValue(564/2)}px`, // centre horizontal
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
            top: `${scaledValue(18)}px`,
            left: `${scaledValue(6)}px`,
            height: `${scaledValue(350)}px`,
            width: `${scaledValue(564)}px`,

            backgroundColor: "black",
            overflow: "hidden",
          }}
        ></div>

        {/* Contrôles audio personnalisés */}
      
        {/* Previous Track */}
        <AudioControlButton
          defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Previous/Previous.png"
          clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Previous/PreviousClic.png"
          hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Previous/PreviousClic.png"
          onClick={playPreviousTrack}
          style={{
            position: "absolute",
            bottom: `${scaledValue(-236)}px`,
            left: `${scaledValue(6)}px`,
            width: `${scaledValue(150)}px`,
            height: `${scaledValue(150)}px`,
            backgroundSize: "contain",
            background: "contain",
            backgroundRepeat: "no-repeat"
          }}
        />



          {/* Next Track */}
          <AudioControlButton
          defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Next/Next.png"
          clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Next/NextClic.png"
          hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Next/NextClic.png"
            onClick={playNextTrack}
            style={{
              position: "absolute",
              bottom: `${scaledValue(-236)}px`,
              right: `${scaledValue(6)}px`,
              width: `${scaledValue(150)}px`,
              height: `${scaledValue(150)}px`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat"
            }}
          />



          {/* Volume Up */}
          <AudioControlButton
            defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/VolumeUp/VolumeUp.png"
            clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/VolumeUp/VolumeUpClic.png"
            hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/VolumeUp/VolumeUpClic.png"
            onClick={increaseVolume}
            style={{
              position: "absolute",
              bottom: `${scaledValue(-198)}px`,
              right: `${scaledValue(112)}px`,
              width: `${scaledValue(120)}px`,
              height: `${scaledValue(120)}px`,
              backgroundSize: "contain",
              background: "contain",
              backgroundRepeat: "no-repeat"
            }}
          />

          {/* Mute */}
          <AudioControlButton
            defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Mute/Mute.png"
            hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Mute/MuteHover.png"
            clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Mute/MuteClic.png"
            onClick={toggleMute}
            style={{
              position: "absolute",
              bottom: `${scaledValue(-198)}px`,
              left: `${scaledValue(122)}px`,
              width: `${scaledValue(120)}px`,
              height: `${scaledValue(120)}px`,
              backgroundSize: "contain",
              background: "contain",
              backgroundRepeat: "no-repeat"
            }}
          />

          {/* Volume Down */}
          <AudioControlButton
            defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/VolumeDown/VolumeDown.png"
            hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/VolumeDown/VolumeDownHover.png"
            clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/VolumeDown/VolumeDownClic.png"
            onClick={decreaseVolume}
            style={{
              position: "absolute",
              bottom: `${scaledValue(-321)}px`,
              left: `${scaledValue(209)}px`,
              width: `${scaledValue(150)}px`,
              height: `${scaledValue(150)}px`,
              backgroundSize: "contain",
              background: "contain",
              backgroundRepeat: "no-repeat"
            }}
          />

          {/* Play/Pause */}
          <AudioControlButton
            defaultIcon={isPlaying ? "/VERSION_MOBILE/ELEMENTS/Boutons/Pause/Pause.png" : "/VERSION_MOBILE/ELEMENTS/Boutons/Play/Play.png"}
            hoverIcon={isPlaying ? "/VERSION_MOBILE/ELEMENTS/Boutons/Pause/Pause.png" : "/VERSION_MOBILE/ELEMENTS/Boutons/Play/PlayClic.png"}
            clickedIcon={isPlaying ? "/VERSION_MOBILE/ELEMENTS/Boutons/Pause/PauseClic.png" : "/VERSION_MOBILE/ELEMENTS/Boutons/Play/PlayClic.png"}
            onClick={togglePlayPause}
            style={{
              position: "absolute",
              bottom: `${scaledValue(-255)}px`,
              left: `${scaledValue(188)}px`,
              width: `${scaledValue(197)}px`,
              height: `${scaledValue(197)}px`,
              backgroundSize: "contain",
              background: "contain",
              backgroundRepeat: "no-repeat"
            }}
          />

          {/* Close */}
          {/* <AudioControlButton
            defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Exit.avif"
            hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif"
            clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitClic.avif"
            onClick={onClose}
            style={{
              position: "absolute",
              bottom: `${scaledValue(7)}px`,
              left: `${scaledValue(7)}px`,
            }}
          /> */}


        {/* Élément audio caché */}
        <audio
          ref={audioRef}
          src={currentTrack.src}
          autoPlay={autoplay}
          controls={false}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default MultiPlayer;
"use client";

import React, { useEffect, useRef, useState } from "react";

interface Track {
  src: string;
  title: string;
}

interface AudioPlayerProps {
  tracks?: Track[];
  src?: string;
  title?: string;
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
      const originalHeight = 555;
      const desiredHeight = windowHeight * 0.8;
      const newScale = desiredHeight / originalHeight;
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let p5Instance: any;
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

      p5Instance = new p5(sketch);
    };

    loadP5();

    return () => {
      if (p5Instance) p5Instance.remove();
    };
  }, []);

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
    onClick,
  }: {
    defaultIcon: string;
    hoverIcon: string;
    clickedIcon: string;
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
        height: `${scaledValue(550)}px`,
        width: `${scaledValue(640)}px`,
      }}
    >
      {/* Cadre décoratif */}
      <img
        src={frameSrc}
        alt="Cadre décoratif autour du contenu"
        style={{
          height: `${scaledValue(538)}px`,
          width: `${scaledValue(638)}px`,
        }}
      />

      {/* Titre de la piste */}
      <div
        className="absolute text-center text-lg font-bold mb-4"
        style={{
          marginTop: `${scaledValue(30)}px`,
        }}
      >
        {currentTrack.title}
      </div>

      {/* Canvas pour la visualisation avec p5 */}
      <div
        ref={canvasContainerRef}
        className="absolute w-full flex justify-center items-center"
        style={{
          top: `${scaledValue(100)}px`,
          height: `${scaledValue(280)}px`,
          width: `${scaledValue(580)}px`,
          borderRadius: `50%`,
          backgroundColor: "black",
          overflow: "hidden",
        }}
      ></div>

      {/* Contrôles audio personnalisés */}
      <div
        className="absolute bottom-0 flex justify-between items-center w-full"
        style={{
          padding: `${scaledValue(10)}px`,
        }}
      >
        {/* Previous Track */}
        <AudioControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Backwards.avif"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/BackwardsHover.avif"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/BackwardsClic.avif"
          onClick={playPreviousTrack}
        />

        {/* Play/Pause */}
        <AudioControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Play.avif"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/PlayHover.avif"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/PlayClic.avif"
          onClick={togglePlayPause}
        />

        {/* Next Track */}
        <AudioControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Forward.avif"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ForwardHover.avif"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ForwardClic.avif"
          onClick={playNextTrack}
        />

        {/* Volume Down */}
        <AudioControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeDown.avif"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeDownHover.avif"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeDownClic.avif"
          onClick={decreaseVolume}
        />

        {/* Volume Up */}
        <AudioControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeUp.avif"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeUpHover.avif"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeUpClic.avif"
          onClick={increaseVolume}
        />

        {/* Mute */}
        <AudioControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Mute.avif"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/MuteHover.avif"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/MuteClic.avif"
          onClick={toggleMute}
        />

        {/* Close */}
        <AudioControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Exit.avif"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitClic.avif"
          onClick={onClose}
        />
      </div>

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
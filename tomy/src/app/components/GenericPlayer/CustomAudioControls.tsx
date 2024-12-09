import React, { useState, useRef } from "react";
import ControlButton from "../Player/ControlButton"; // Boutons personnalisés

interface CustomAudioControlsProps {
  audioSrc: string[];
  onClose: () => void;
  scale?: number; // Échelle pour rendre les boutons responsive
}

const CustomAudioControls: React.FC<CustomAudioControlsProps> = ({
  audioSrc,
  onClose,
  scale = 1,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Piste actuelle
  const [volume, setVolume] = useState(1); // Volume initial (100%)

  const scaledValue = (value: number) => value * scale;

  // Fonction pour lancer/mettre en pause l'audio
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

  // Fonction pour passer à la piste suivante
  const nextTrack = () => {
    if (currentTrackIndex < audioSrc.length - 1) {
      setCurrentTrackIndex((prev) => prev + 1);
      setIsPlaying(false); // Remettre sur pause avant le chargement
    }
  };

  // Fonction pour revenir à la piste précédente
  const prevTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex((prev) => prev - 1);
      setIsPlaying(false); // Remettre sur pause avant le chargement
    }
  };

  // Fonction pour mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Fonction pour augmenter le volume
  const increaseVolume = () => {
    if (audioRef.current) {
      const newVolume = Math.min(volume + 0.1, 1);
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  // Fonction pour baisser le volume
  const decreaseVolume = () => {
    if (audioRef.current) {
      const newVolume = Math.max(volume - 0.1, 0);
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center"
      style={{
        width: `${scaledValue(640)}px`,
        height: `${scaledValue(200)}px`,
        background: "black",
        borderRadius: `${scaledValue(10)}px`,
        padding: `${scaledValue(10)}px`,
      }}
    >
      {/* Élement audio */}
      <audio
        ref={audioRef}
        src={audioSrc[currentTrackIndex]}
        onEnded={nextTrack}
        preload="auto"
      ></audio>

      {/* Boutons de contrôle */}
      <div className="flex justify-between items-center w-full">
        {/* Play/Pause */}
        <ControlButton
          defaultIcon={
            isPlaying
              ? "/vectors/ELEMENTS/BoutonsPlayer/Pause.png"
              : "/vectors/ELEMENTS/BoutonsPlayer/Play.png"
          }
          hoverIcon={
            isPlaying
              ? "/vectors/ELEMENTS/BoutonsPlayer/PauseHover.png"
              : "/vectors/ELEMENTS/BoutonsPlayer/PlayHover.png"
          }
          clickedIcon={
            isPlaying
              ? "/vectors/ELEMENTS/BoutonsPlayer/PauseClic.png"
              : "/vectors/ELEMENTS/BoutonsPlayer/PlayClic.png"
          }
          onClick={togglePlayPause}
          style={{
            height: `${scaledValue(40)}px`,
            width: `${scaledValue(40)}px`,
          }}
        />

        {/* Previous */}
        <ControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Backwards.png"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/BackwardsHover.png"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/BackwardsClic.png"
          onClick={prevTrack}
          style={{
            height: `${scaledValue(40)}px`,
            width: `${scaledValue(40)}px`,
          }}
        />

        {/* Next */}
        <ControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Forward.png"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ForwardHover.png"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ForwardClic.png"
          onClick={nextTrack}
          style={{
            height: `${scaledValue(40)}px`,
            width: `${scaledValue(40)}px`,
          }}
        />

        {/* Mute */}
        <ControlButton
          defaultIcon={
            isMuted
              ? "/vectors/ELEMENTS/BoutonsPlayer/MuteClic.png"
              : "/vectors/ELEMENTS/BoutonsPlayer/Mute.png"
          }
          hoverIcon={
            isMuted
              ? "/vectors/ELEMENTS/BoutonsPlayer/MuteClic.png"
              : "/vectors/ELEMENTS/BoutonsPlayer/MuteHover.png"
          }
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/MuteClic.png"
          onClick={toggleMute}
          style={{
            height: `${scaledValue(40)}px`,
            width: `${scaledValue(40)}px`,
          }}
        />

        {/* Volume Down */}
        <ControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeDown.png"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeDownHover.png"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeDownClic.png"
          onClick={decreaseVolume}
          style={{
            height: `${scaledValue(40)}px`,
            width: `${scaledValue(40)}px`,
          }}
        />

        {/* Volume Up */}
        <ControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeUp.png"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeUpHover.png"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeUpClic.png"
          onClick={increaseVolume}
          style={{
            height: `${scaledValue(40)}px`,
            width: `${scaledValue(40)}px`,
          }}
        />

        {/* Close */}
        <ControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Exit.png"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.png"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.png"
          onClick={onClose}
          style={{
            height: `${scaledValue(40)}px`,
            width: `${scaledValue(40)}px`,
          }}
        />
      </div>
    </div>
  );
};

export default CustomAudioControls;
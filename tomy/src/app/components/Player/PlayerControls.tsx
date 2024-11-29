import React from 'react';
import ControlButton from './ControlButton';

interface PlayerControlsProps {
  handlePlayClick: () => void;
  handleMuteClick: () => void;
  handleVolumeDownClick: () => void;
  handleVolumeUpClick: () => void;
  handleRewindClick: () => void;
  handleForwardClick: () => void;
  isPlaying: boolean;
  isMuted: boolean;
  scale: number;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  handlePlayClick,
  handleMuteClick,
  handleVolumeDownClick,
  handleVolumeUpClick,
  handleRewindClick,
  handleForwardClick,
  isPlaying,
  isMuted,
  scale,
}) => {
  const scaledValue = (value: number) => value * scale;

  return (
    <div>
      {/* Bouton Exit */}
      <ControlButton
        defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Exit.avif"
        hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif"
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif"
        onClick={() => console.log('Exit button clicked')}
        style={{
          top: `${scaledValue(24)}px`,
          left: `${scaledValue(24)}px`,
          height: `${scaledValue(16)}px`,
          width: `${scaledValue(16)}px`,
          zIndex: 50,
        }}
      />

      {/* Bouton Play/Pause */}
      <ControlButton
        defaultIcon={
          isPlaying
            ? '/vectors/ELEMENTS/BoutonsPlayer/Pause.avif'
            : '/vectors/ELEMENTS/BoutonsPlayer/Play.avif'
        }
        hoverIcon={
          isPlaying
            ? '/vectors/ELEMENTS/BoutonsPlayer/PauseHover.avif'
            : '/vectors/ELEMENTS/BoutonsPlayer/PlayHover.avif'
        }
        clickedIcon={
          isPlaying
            ? '/vectors/ELEMENTS/BoutonsPlayer/PauseClic.avif'
            : '/vectors/ELEMENTS/BoutonsPlayer/PlayClic.avif'
        }
        onClick={handlePlayClick}
        style={{
          bottom: `${scaledValue(32)}px`,
          left: `${scaledValue(26)}px`,
          height: `${scaledValue(25)}px`,
          width: `${scaledValue(25)}px`,
        }}
      />

      {/* Bouton Rewind */}
      <ControlButton
        defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Backwards.avif"
        hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/BackwardsHover.avif"
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/BackwardsClic.avif"
        onClick={handleRewindClick}
        style={{
          bottom: `${scaledValue(32)}px`,
          left: `${scaledValue(26 + 25 + 7)}px`,
          height: `${scaledValue(25)}px`,
          width: `${scaledValue(25)}px`,
        }}
      />

      {/* Bouton Forward */}
      <ControlButton
        defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Forward.avif"
        hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ForwardHover.avif"
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ForwardClic.avif"
        onClick={handleForwardClick}
        style={{
          bottom: `${scaledValue(32)}px`,
          left: `${scaledValue(26 + (25 * 2) + (7 * 2))}px`,
          height: `${scaledValue(25)}px`,
          width: `${scaledValue(25)}px`,
        }}
      />

      {/* Bouton Mute */}
      <ControlButton
        defaultIcon={
          isMuted
            ? '/vectors/ELEMENTS/BoutonsPlayer/MuteClic.avif'
            : '/vectors/ELEMENTS/BoutonsPlayer/Mute.avif'
        }
        hoverIcon={
          isMuted
            ? '/vectors/ELEMENTS/BoutonsPlayer/MuteClic.avif'
            : '/vectors/ELEMENTS/BoutonsPlayer/MuteHover.avif'
        }
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/MuteClic.avif"
        onClick={handleMuteClick}
        style={{
          bottom: `${scaledValue(32)}px`,
          right: `${scaledValue(20 + (25 * 2) + 7 + 8)}px`,
          height: `${scaledValue(25)}px`,
          width: `${scaledValue(25)}px`,
        }}
      />

      {/* Bouton Volume Down */}
      <ControlButton
        defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeDown.avif"
        hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeDownHover.avif"
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeDownClic.avif"
        onClick={handleVolumeDownClick}
        style={{
          bottom: `${scaledValue(32)}px`,
          right: `${scaledValue(20 + 25 + 7)}px`,
          height: `${scaledValue(25)}px`,
          width: `${scaledValue(25)}px`,
        }}
      />

      {/* Bouton Volume Up */}
      <ControlButton
        defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeUp.avif"
        hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeUpHover.avif"
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeUpClic.avif"
        onClick={handleVolumeUpClick}
        style={{
          bottom: `${scaledValue(32)}px`,
          right: `${scaledValue(20)}px`,
          height: `${scaledValue(25)}px`,
          width: `${scaledValue(25)}px`,
        }}
      />
    </div>
  );
};

export default PlayerControls;

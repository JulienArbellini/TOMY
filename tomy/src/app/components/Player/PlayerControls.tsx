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
        defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Exit.png"
        hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.png"
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.png"
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
            ? '/vectors/ELEMENTS/BoutonsPlayer/Pause.png'
            : '/vectors/ELEMENTS/BoutonsPlayer/Play.png'
        }
        hoverIcon={
          isPlaying
            ? '/vectors/ELEMENTS/BoutonsPlayer/PauseHover.png'
            : '/vectors/ELEMENTS/BoutonsPlayer/PlayHover.png'
        }
        clickedIcon={
          isPlaying
            ? '/vectors/ELEMENTS/BoutonsPlayer/PauseClic.png'
            : '/vectors/ELEMENTS/BoutonsPlayer/PlayClic.png'
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
        defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Backwards.png"
        hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/BackwardsHover.png"
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/BackwardsClic.png"
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
        defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Forward.png"
        hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ForwardHover.png"
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ForwardClic.png"
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
            ? '/vectors/ELEMENTS/BoutonsPlayer/MuteClic.png'
            : '/vectors/ELEMENTS/BoutonsPlayer/Mute.png'
        }
        hoverIcon={
          isMuted
            ? '/vectors/ELEMENTS/BoutonsPlayer/MuteClic.png'
            : '/vectors/ELEMENTS/BoutonsPlayer/MuteHover.png'
        }
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/MuteClic.png"
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
        defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeDown.png"
        hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeDownHover.png"
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeDownClic.png"
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
        defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeUp.png"
        hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeUpHover.png"
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/VolumeUpClic.png"
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

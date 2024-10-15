import React from 'react';

interface PlayerControlsProps {
  handlePlayClick: () => void;
  handleMuteClick: () => void;
  handleVolumeDownClick: () => void;
  handleVolumeUpClick: () => void;
  handleRewindClick: () => void;
  handleForwardClick: () => void;
  isPlaying: boolean;
  isMuted: boolean;
  isRewinding: boolean;
  isForwarding: boolean;
  scale: number;
  isPressed: boolean;
  isVolumeDown: boolean;
  isVolumeUp: boolean;
  isHovering: boolean;
  handlePlayMouseDown: () => void;
  handlePlayMouseUp: () => void;
  handlePlayMouseEnter: () => void;
  handlePlayMouseLeave: () => void;
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
  isRewinding,
  isForwarding,
  scale,
  isPressed,
  isHovering,
  isVolumeDown,
  isVolumeUp,
  handlePlayMouseDown,
  handlePlayMouseUp,
  handlePlayMouseEnter,
  handlePlayMouseLeave,
}) => {
  const scaledValue = (value: number) => value * scale;

  const playButtonClass = () => {
    if (isPlaying) {
      if (isPressed) {
        return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/PauseClic.png")]';
      }
      if (isHovering) {
        return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/PauseHover.png")]';
      }
      return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Pause.png")]';
    } else {
      if (isPressed) {
        return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/PlayClic.png")]';
      }
      if (isHovering) {
        return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/PlayHover.png")]';
      }
      return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Play.png")]';
    }
  };

  return (
    <div>
      {/* Bouton Exit */}
      <div
        className={`absolute bg-[url('/vectors/ELEMENTS/BoutonsPlayer/Exit.png')] hover:bg-[url('/vectors/ELEMENTS/BoutonsPlayer/ExitHover.png')] bg-cover hover:cursor-pointer`}
        style={{
          top: `${scaledValue(20)}px`,
          left: `${scaledValue(27)}px`,
          height: `${scaledValue(20)}px`,
          width: `${scaledValue(20)}px`,
          zIndex: 50, // Pour s'assurer que le bouton est visible
        }}
        onClick={() => console.log('Exit button clicked')}
      />

      {/* Bouton Play */}
      <div
        className={`absolute bg-cover hover:cursor-pointer ${playButtonClass()}`}
        style={{
          bottom: `${scaledValue(30)}px`,
          left: `${scaledValue(30)}px`,
          height: `${scaledValue(24)}px`,
          width: `${scaledValue(24)}px`,
        }}
        onClick={handlePlayClick}
        onMouseDown={handlePlayMouseDown}
        onMouseUp={handlePlayMouseUp}
        onMouseEnter={handlePlayMouseEnter}
        onMouseLeave={handlePlayMouseLeave}
      ></div>

            {/* Bouton Mute */}
            <div
        className={`absolute bg-cover hover:cursor-pointer ${
          isMuted
            ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/MuteClic.png")]'
            : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Mute.png")] hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/MuteHover.png")]'
        }`}
        style={{
          bottom: `${scaledValue(30)}px`,
          right: `${scaledValue(95)}px`,
          height: `${scaledValue(24)}px`,
          width: `${scaledValue(24)}px`,
        }}
        onClick={handleMuteClick}
      ></div>

      {/* Volume Down */}
      <div
        className={`absolute bg-cover hover:cursor-pointer ${
          isVolumeDown
            ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeDownClic.png")]'
            : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeDown.png")]'
        } hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeDownHover.png")]`}
        style={{
          bottom: `${scaledValue(30)}px`,
          right: `${scaledValue(62)}px`,
          height: `${scaledValue(24)}px`,
          width: `${scaledValue(24)}px`,
        }}
        onClick={handleVolumeDownClick}
      />

      {/* Volume Up */}
      <div
        className={`absolute bg-cover hover:cursor-pointer ${
          isVolumeUp
            ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeUpClic.png")]'
            : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeUp.png")]'
        } hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeUpHover.png")]`}
        style={{
          bottom: `${scaledValue(30)}px`,
          right: `${scaledValue(29)}px`,
          height: `${scaledValue(24)}px`,
          width: `${scaledValue(24)}px`,
        }}
        onClick={handleVolumeUpClick}
      />

      {/* Rewind */}
      <div
        className={`absolute bg-cover hover:cursor-pointer ${
          isRewinding
            ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/BackwardsClic.png")]'
            : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Backwards.png")]'
        } hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/BackwardsHover.png")]`}
        style={{
          bottom: `${scaledValue(30)}px`,
          left: `${scaledValue(63)}px`,
          height: `${scaledValue(24)}px`,
          width: `${scaledValue(24)}px`,
        }}
        onClick={handleRewindClick}
      />

      {/* Forward */}
      <div
        className={`absolute bg-cover hover:cursor-pointer ${
          isForwarding
            ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/ForwardClic.png")]'
            : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Forward.png")]'
        } hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/ForwardHover.png")]`}
        style={{
          bottom: `${scaledValue(30)}px`,
          left: `${scaledValue(96)}px`,
          height: `${scaledValue(24)}px`,
          width: `${scaledValue(24)}px`,
        }}
        onClick={handleForwardClick}
      />
    </div>
  );
};

export default PlayerControls;

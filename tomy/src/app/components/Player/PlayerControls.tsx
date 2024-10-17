import React, { useState } from 'react';

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

  // State for tracking mouse hover and click for each button
  const [isMutePressed, setIsMutePressed] = useState(false);
  const [isMuteHovering, setIsMuteHovering] = useState(false);

  const [isVolumeDownPressed, setIsVolumeDownPressed] = useState(false);
  const [isVolumeDownHovering, setIsVolumeDownHovering] = useState(false);

  const [isVolumeUpPressed, setIsVolumeUpPressed] = useState(false);
  const [isVolumeUpHovering, setIsVolumeUpHovering] = useState(false);

  const [isRewindPressed, setIsRewindPressed] = useState(false);
  const [isRewindHovering, setIsRewindHovering] = useState(false);

  const [isForwardPressed, setIsForwardPressed] = useState(false);
  const [isForwardHovering, setIsForwardHovering] = useState(false);

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

  // Function for changing button images based on state (Mute example)
  const muteButtonClass = () => {
    if (isMutePressed) {
      return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/MuteClic.png")]';
    }
    if (isMuteHovering) {
      return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/MuteHover.png")]';
    }
    return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Mute.png")]';
  };

  const volumeDownButtonClass = () => {
    if (isVolumeDownPressed) {
      return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeDownClic.png")]';
    }
    if (isVolumeDownHovering) {
      return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeDownHover.png")]';
    }
    return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeDown.png")]';
  };

  const volumeUpButtonClass = () => {
    if (isVolumeUpPressed) {
      return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeUpClic.png")]';
    }
    if (isVolumeUpHovering) {
      return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeUpHover.png")]';
    }
    return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeUp.png")]';
  };

  const rewindButtonClass = () => {
    if (isRewindPressed) {
      return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/BackwardsClic.png")]';
    }
    if (isRewindHovering) {
      return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/BackwardsHover.png")]';
    }
    return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Backwards.png")]';
  };

  const forwardButtonClass = () => {
    if (isForwardPressed) {
      return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/ForwardClic.png")]';
    }
    if (isForwardHovering) {
      return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/ForwardHover.png")]';
    }
    return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Forward.png")]';
  };

  return (
    <div>
      {/* Bouton Exit */}
      <div
        className={`absolute bg-[url('/vectors/ELEMENTS/BoutonsPlayer/Exit.png')] hover:bg-[url('/vectors/ELEMENTS/BoutonsPlayer/ExitHover.png')] bg-cover hover:cursor-pointer`}
        style={{
          top: `${scaledValue(24)}px`,
          left: `${scaledValue(24)}px`,
          height: `${scaledValue(16)}px`,
          width: `${scaledValue(16)}px`,
          zIndex: 50, // Pour s'assurer que le bouton est visible
        }}
        onClick={() => console.log('Exit button clicked')}
      />

          {/* Bouton Play */}
    <div
        className={`absolute bg-cover hover:cursor-pointer ${playButtonClass()}`}
        style={{
            bottom: `${scaledValue(32)}px`,
            left: `${scaledValue(26)}px`,
            height: `${scaledValue(25)}px`,
            width: `${scaledValue(25)}px`,
        }}
        onClick={handlePlayClick}
        onMouseDown={handlePlayMouseDown}
        onMouseUp={handlePlayMouseUp}
        onMouseEnter={handlePlayMouseEnter}
        onMouseLeave={handlePlayMouseLeave}
    ></div>


      {/* Rewind */}
      <div
        className={`absolute bg-cover hover:cursor-pointer ${rewindButtonClass()}`}
        style={{
          bottom: `${scaledValue(32)}px`,
          left: `${scaledValue(26+25+7)}px`,
          height: `${scaledValue(25)}px`,
          width: `${scaledValue(25)}px`,
        }}
        onClick={handleRewindClick}
        onMouseDown={() => setIsRewindPressed(true)}
        onMouseUp={() => setIsRewindPressed(false)}
        onMouseEnter={() => setIsRewindHovering(true)}
        onMouseLeave={() => {
          setIsRewindHovering(false);
          setIsRewindPressed(false);
        }}
      ></div>

      {/* Forward */}
      <div
        className={`absolute bg-cover hover:cursor-pointer ${forwardButtonClass()}`}
        style={{
          bottom: `${scaledValue(32)}px`,
          left: `${scaledValue(26+(25*2)+(7*2))}px`,
          height: `${scaledValue(25)}px`,
          width: `${scaledValue(25)}px`,
        }}
        onClick={handleForwardClick}
        onMouseDown={() => setIsForwardPressed(true)}
        onMouseUp={() => setIsForwardPressed(false)}
        onMouseEnter={() => setIsForwardHovering(true)}
        onMouseLeave={() => {
          setIsForwardHovering(false);
          setIsForwardPressed(false);
        }}
      ></div>


      {/* Bouton Mute */}
      <div
        className={`absolute bg-cover hover:cursor-pointer ${
          isMuted
            ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/MuteClic.png")]'
            : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Mute.png")] hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/MuteHover.png")]'
        }`}
        style={{
          bottom: `${scaledValue(32)}px`,
          right: `${scaledValue(20+(25*2)+7+8)}px`,
          height: `${scaledValue(25)}px`,
          width: `${scaledValue(25)}px`,
        }}
        onClick={handleMuteClick}
      ></div>


      {/* Volume Down */}
      <div
        className={`absolute bg-cover hover:cursor-pointer ${volumeDownButtonClass()}`}
        style={{
          bottom: `${scaledValue(32)}px`,
          right: `${scaledValue(20+25+7)}px`,
          height: `${scaledValue(25)}px`,
          width: `${scaledValue(25)}px`,
        }}
        onClick={handleVolumeDownClick}
        onMouseDown={() => setIsVolumeDownPressed(true)}
        onMouseUp={() => setIsVolumeDownPressed(false)}
        onMouseEnter={() => setIsVolumeDownHovering(true)}
        onMouseLeave={() => {
          setIsVolumeDownHovering(false);
          setIsVolumeDownPressed(false);
        }}
      ></div>

      {/* Volume Up */}
      <div
        className={`absolute bg-cover hover:cursor-pointer ${volumeUpButtonClass()}`}
        style={{
          bottom: `${scaledValue(32)}px`,
          right: `${scaledValue(20)}px`,
          height: `${scaledValue(25)}px`,
          width: `${scaledValue(25)}px`,
        }}
        onClick={handleVolumeUpClick}
        onMouseDown={() => setIsVolumeUpPressed(true)}
        onMouseUp={() => setIsVolumeUpPressed(false)}
        onMouseEnter={() => setIsVolumeUpHovering(true)}
        onMouseLeave={() => {
          setIsVolumeUpHovering(false);
          setIsVolumeUpPressed(false);
        }}
      ></div>


    </div>
  );
};

export default PlayerControls;

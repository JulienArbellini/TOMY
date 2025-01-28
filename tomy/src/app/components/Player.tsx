import React, { useState, useRef, useEffect } from 'react';

interface PlayerProps {
  className?: string;
  src?: string;
  onClose: () => void;
  frameSrc?: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const Player: React.FC<PlayerProps> = ({ 
  src, 
  onClose,
  frameSrc = '/vectors/ELEMENTS/Cadres/Cadre1.avif',
 }) => {
  // États pour chaque bouton
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingAndDelay, setIsPlayingAndDelay] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVolumeDown, setVolumeDown] = useState(false);
  const [isVolumeUp, setVolumeUp] = useState(false);
  const [isRewinding, setIsRewinding] = useState(false);
  const [isForwarding, setIsForwarding] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const playerRef = useRef<HTMLIFrameElement | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const [scale, setScale] = useState(1);
  const [imagesPreloaded, setImagesPreloaded] = useState(false); // Suivi du préchargement

  // Fonction pour précharger les images
  const preloadImages = (imageUrls: string[]) => {
    const promises = imageUrls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = reject;
      });
    });

    // Quand toutes les images sont préchargées
    Promise.all(promises)
      .then(() => {
        setImagesPreloaded(true); // Les images sont prêtes
      })
      .catch((err) => {
        console.error("Échec du préchargement des images", err);
      });
  };

  // Précharger les images des boutons au montage du composant
  useEffect(() => {
    const imageUrls = [
      '/vectors/ELEMENTS/BoutonsPlayer/Play.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/PlayHover.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/PlayClic.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/Pause.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/PauseHover.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/PauseClic.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/Mute.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/MuteHover.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/MuteClic.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/VolumeDown.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/VolumeDownHover.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/VolumeDownClic.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/VolumeUp.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/VolumeUpHover.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/VolumeUpClic.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/Backwards.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/BackwardsHover.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/BackwardsClic.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/Forward.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/ForwardHover.avif',
      '/vectors/ELEMENTS/BoutonsPlayer/ForwardClic.avif'
    ];

    preloadImages(imageUrls); // Précharger les images au montage
  }, []);

  const handlePlayClick = () => {
    if (!player) return;

    setIsPlaying((prevState) => {
      if (prevState) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      return !prevState;
    });
  };

  const handleExitClick = () => {
    onClose();
    };

  const handleStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlayingAndDelay(false);
    }
  };

  const handlePlayMouseDown = () => setIsPressed(true);
  const handlePlayMouseUp = () => setIsPressed(false);
  const handlePlayMouseEnter = () => setIsHovering(true);
  const handlePlayMouseLeave = () => {
    setIsHovering(false);
    setIsPressed(false);
  };

  const handleMuteClick = () => {
    if (!player) return;

    setIsMuted((prevState) => {
      if (prevState) {
        player.unMute();
      } else {
        player.mute();
      }
      return !prevState;
    });
  };

  const handleVolumeDownClick = () => {
    if (!player) return;
    const currentVolume = player.getVolume();
    const newVolume = Math.max(currentVolume - 10, 0);
    player.setVolume(newVolume);
    setVolumeDown(true);
    setTimeout(() => setVolumeDown(false), 200);
  };

  const handleVolumeUpClick = () => {
    if (!player) return;
    const currentVolume = player.getVolume();
    const newVolume = Math.min(currentVolume + 10, 100);
    player.setVolume(newVolume);
    setVolumeUp(true);
    setTimeout(() => setVolumeUp(false), 200);
  };

  const handleRewindClick = () => {
    if (!player) return;

    const currentTime = player.getCurrentTime();
    const newTime = currentTime - 10;
    player.seekTo(Math.max(newTime, 0), true);

    setIsRewinding(!isRewinding);
    if (!isRewinding) {
      setIsForwarding(false);
    }
  };

  const disableRewindClick = () => {
    setIsRewinding(false);
    if (!isRewinding) {
      setIsForwarding(false);
    }
  };

  const handleForwardClick = () => {
    if (!player) return;

    const currentTime = player.getCurrentTime();
    const newTime = currentTime + 10;
    player.seekTo(newTime, true);

    setIsForwarding(!isForwarding);
    if (!isForwarding) {
      setIsRewinding(false);
    }
  };

  const disableForwardClick = () => {
    setIsForwarding(false);
    if (!isForwarding) {
      setIsRewinding(false);
    }
  };

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player(playerRef.current, {
        events: {
          onReady: (event: any) => {
            setPlayer(newPlayer);
          },
          onStateChange: handleStateChange,
        },
      });
    };

    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const originalHeight = 555;
      const desiredHeight = windowHeight * 0.8;
      const newScale = desiredHeight / originalHeight;
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const playButtonClass = () => {
    if (isPlaying) {
      if (isPressed) {
        return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/PauseClic.avif")]';
      }
      if (isHovering) {
        return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/PauseHover.avif")]';
      }
      return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Pause.avif")]';
    } else {
      if (isPressed) {
        return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/PlayClic.avif")]';
      }
      if (isHovering) {
        return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/PlayHover.avif")]';
      }
      return 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Play.avif")]';
    }
  };

  const scaledValue = (value: number) => value * scale;

  return (
    <div className="relative">
      {!imagesPreloaded ? (
        <div>Loading...</div> // Affichage de chargement tant que les images ne sont pas prêtes
      ) : (
        <div
          className="relative flex justify-center items-center"
          style={{
            height: `${scaledValue(555)}px`,
            width: `${scaledValue(645)}px`,
          }}
        >
        <div
          className="relative flex justify-center items-center"
          style={{
            height: `${scaledValue(555)}px`,
            width: `${scaledValue(645)}px`,
          }}
        >
        <img
          src={frameSrc}
          alt=""
          style={{
            height: `${scaledValue(555)}px`,
            width: `${scaledValue(645)}px`,
          }}
        />
        <img
          src="/vectors/ELEMENTS/Cadres/EcranNoir.avif"
          alt=""
          className={`absolute`}
          style={{
            top: `${scaledValue(60)}px`,
            left: `${scaledValue(26)}px`,
            height: `${scaledValue(430)}px`,
            width: `${scaledValue(602)}px`,
            zIndex: isPlayingAndDelay ? 20 : 0,
          }}
        />
        <img 
          src="/vectors/ELEMENTS/Cadres/vitre.avif"
          alt="" 
          className="absolute z-10 top-[50px] left-[33px] h-[440px] w-[586px] opacity-0" 
          style={{
            top: `${scaledValue(66)}px`,
            left: `${scaledValue(30)}px`,
            height: `${scaledValue(418)}px`,
            width: `${scaledValue(593)}px`,
          }}
        />
        <div
          className="absolute overflow-hidden"
          style={{
            top: `${scaledValue(67)}px`,
            left: `${scaledValue(33)}px`,
            height: `${scaledValue(415)}px`,
            width: `${scaledValue(590)}px`,
          }}
        >
        <div
          className="absolute"
          style={{
            top: `${scaledValue(-653)}px`,
            left: 0,
            height: `${scaledValue(435)}px`,
            width: `${scaledValue(586)}px`,
          }}
        >
        <iframe
          ref={playerRef}
          width="100%"
          height="400%"
          src={`${src}?enablejsapi=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        </div>
      </div>

      {/* Bouton Exit */}
      <div className={`absolute bg-[url('/vectors/ELEMENTS/BoutonsPlayer/Exit.avif')] hover:bg-[url('/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif')] bg-cover hover:cursor-pointer`}
      style={{
        top: `${scaledValue(20)}px`,
        left: `${scaledValue(24)}px`,
        height: `${scaledValue(25)}px`,
        width: `${scaledValue(25)}px`,
      }}
      onClick={handleExitClick}

      ></div>

      {/* Bouton Play */}
      <div
        className={`absolute bg-cover hover:cursor-pointer ${playButtonClass()}`}
        style={{
          bottom: `${scaledValue(30)}px`,
          left: `${scaledValue(30)}px`,
          height: `${scaledValue(27)}px`,
          width: `${scaledValue(27)}px`,
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
            ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/MuteClic.avif")]'
            : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Mute.avif")] hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/MuteHover.avif")]'
        }`}
        style={{
          bottom: `${scaledValue(30)}px`,
          right: `${scaledValue(95)}px`,
          height: `${scaledValue(27)}px`,
          width: `${scaledValue(27)}px`,
        }}
        onClick={handleMuteClick}
      ></div>

      {/* Bouton VolumeDown */}
      <div
        className={`absolute bg-cover hover:cursor-pointer ${
          isVolumeDown
            ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeDownClic.avif")]'
            : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeDown.avif")] hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeDownHover.avif")]'
        }`}
        style={{
          bottom: `${scaledValue(30)}px`,
          right: `${scaledValue(62)}px`,
          height: `${scaledValue(27)}px`,
          width: `${scaledValue(27)}px`,
        }}
        onClick={handleVolumeDownClick}
      ></div>

      {/* Bouton VolumeUp */}
      <div
        className={`absolute bg-cover hover:cursor-pointer ${
          isVolumeUp
            ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeUpClic.avif")]'
            : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeUp.avif")] hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeUpHover.avif")]'
        }`}
        style={{
          bottom: `${scaledValue(30)}px`,
          right: `${scaledValue(29)}px`,
          height: `${scaledValue(27)}px`,
          width: `${scaledValue(27)}px`,
        }}
        onClick={handleVolumeUpClick}
      ></div>

      {/* Bouton Rewind */}
      <div
        className={`absolute bg-cover hover:cursor-pointer ${
          isRewinding
            ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/BackwardsClic.avif")]'
            : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Backwards.avif")] hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/BackwardsHover.avif")]'
        }`}
        style={{
          bottom: `${scaledValue(30)}px`,
          left: `${scaledValue(63)}px`,
          height: `${scaledValue(27)}px`,
          width: `${scaledValue(27)}px`,
        }}
        onMouseDown={handleRewindClick}
        onMouseUp={disableRewindClick}
        onMouseLeave={disableRewindClick}
      ></div>

      {/* Bouton Forward */}
      <div
        className={`absolute bg-cover hover:cursor-pointer ${
          isForwarding
            ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/ForwardClic.avif")]'
            : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Forward.avif")] hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/ForwardHover.avif")]'
        }`}
        style={{
          bottom: `${scaledValue(30)}px`,
          left: `${scaledValue(96)}px`,
          height: `${scaledValue(27)}px`,
          width: `${scaledValue(27)}px`,
        }}
        onMouseDown={handleForwardClick}
        onMouseUp={disableForwardClick}
        onMouseLeave={disableForwardClick}
      ></div>
    </div>

        </div>
      )}
    </div>
  );
};

export default Player;

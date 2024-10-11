import React, { useState, useRef, useEffect } from 'react';


interface PlayerProps {
  className?: string;
  src: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const Player: React.FC<PlayerProps> = ({ src }) => {
  // États pour chaque bouton
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingAndDelay, setIsPlayingAndDelay] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVolumeDown, setVolumeDown] = useState(false); // Assume 100 as max volume
  const [isVolumeUp, setVolumeUp] = useState(false); // Assume 100 as max volume
  const [isRewinding, setIsRewinding] = useState(false);
  const [isForwarding, setIsForwarding] = useState(false);

  const playerRef = useRef<HTMLIFrameElement | null>(null);
  const [player, setPlayer] = useState<any>(null); // Pour stocker l'instance du lecteur YouTube


  // Gestion des événements de clic pour chaque bouton
  const handlePlayClick = () => {
    if (!player) {
      console.log("Player is not ready yet");
      return;
    }
  
    setIsPlaying((prevState) => {
      if (prevState) {
        player.pauseVideo(); // Met en pause la vidéo
      } else {
        player.playVideo(); // Démarre la vidéo
      }
      return !prevState;
    });
  };

  const handleStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      // La vidéo commence à jouer, on enlève l'écran noir
      setIsPlayingAndDelay(false);
    }
  };
  

  const handleMuteClick = () => {
    setIsMuted(!isMuted);
    if (isVolumeDown) {
      setVolumeDown(false); 
    }
    if (isVolumeUp) {
      setVolumeUp(false); 
    }
    
  };

  const handleVolumeDownClick = () => {
    setVolumeDown(!isVolumeDown);
    if (isMuted) {
      setIsMuted(false); 
    }
    if (isVolumeUp) {
      setVolumeUp(false); 
    }
  };

  const handleVolumeUpClick = () => {
    setVolumeUp(!isVolumeUp);
    if (isMuted) {
      setIsMuted(false); 
    }
    if (isVolumeDown) {
      setVolumeDown(false); 
    }
  };

  const handleRewindClick = () => {
    setIsRewinding(!isRewinding);
    if (!isRewinding) {
      setIsForwarding(false); // Désactive le bouton Forward si Rewind est activé
    }
  };
  const disableRewindClick = () => {
    setIsRewinding(false);
    if (!isRewinding) {
      setIsForwarding(false); // Désactive le bouton Forward si Rewind est activé
    }
  };

  const handleForwardClick = () => {
    setIsForwarding(!isForwarding);
    if (!isForwarding) {
      setIsRewinding(false); // Désactive le bouton Rewind si Forward est activé
    }
  };

  const disableForwardClick = () => {
    setIsForwarding(false);
    if (!isForwarding) {
      setIsRewinding(false); // Désactive le bouton Rewind si Forward est activé
    }
  };

    // Charger l'API YouTube et initialiser le lecteur
    useEffect(() => {
      // Charger l'API YouTube
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    
      // Créer le lecteur après que l'API YouTube est chargée
      (window as any).onYouTubeIframeAPIReady = () => {
        const newPlayer = new (window as any).YT.Player(playerRef.current, {
          events: {
            onReady: (event: any) => {
              console.log("Player is ready");
              setPlayer(newPlayer); // Stocke l'instance du lecteur
            },
            onStateChange: handleStateChange, 
          }
        });
      };
    }, []);
    

  return (
    <div className="absolute h-screen w-full flex justify-center items-center">
      <div className="relative h-[553px] w-[653px] flex justify-center items-center">
        <img src="/vectors/ELEMENTS/Cadres/Cadre1.png" alt="" className="h-[550px]" />
        <img src="/vectors/ELEMENTS/Cadres/EcranNoir.png" alt="" className={`absolute top-[50px] left-[33px] h-[440px] w-[590px] ${
            isPlayingAndDelay ? 'z-20' : 'z-0'}`} />
        <img src="/vectors/ELEMENTS/Cadres/vitre.png" alt="" className="absolute z-10 top-[50px] left-[33px] h-[440px] w-[586px] opacity-5" />
        <div className="absolute bg-red-200 top-[53px] left-[35px] h-[435px] w-[586px] overflow-hidden">
          <div className="absolute top-[-653px] left-[0px] h-[435px] w-[586px]">
            <iframe
              ref={playerRef}
              width="100%"
              height="400%"
              src= {src + "?enablejsapi=1"}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        
        {/* Bouton Exit */}
        <div className="absolute top-[20px] left-[24px] h-[25px] w-[25px] bg-[url('/vectors/ELEMENTS/BoutonsPlayer/Exit.png')] hover:bg-[url('/vectors/ELEMENTS/BoutonsPlayer/ExitHover.png')] bg-cover hover:cursor-pointer"></div>

        {/* Bouton Play */}
        <div
          className={`absolute bottom-[26px] left-[25px] h-[30px] w-[30px] bg-cover hover:cursor-pointer ${
            isPlaying
              ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/PauseClic.png")]'
              : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Play.png")] hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/PlayHover.png")]'
          }`}
          onClick={handlePlayClick}
        ></div>

        {/* Bouton Backwards */}
        <div
          className={`absolute bottom-[26px] left-[56px] h-[30px] w-[30px] bg-cover hover:cursor-pointer ${
            isRewinding
              ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/BackwardsClic.png")]'
              : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Backwards.png")] hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/BackwardsHover.png")]'
          }`}
          onMouseDown={handleRewindClick}
          onMouseUp={disableRewindClick}
          onMouseLeave={disableRewindClick}
        ></div>

        {/* Bouton Forward */}
        <div
          className={`absolute bottom-[26px] left-[87px] h-[30px] w-[30px] bg-cover hover:cursor-pointer ${
            isForwarding
              ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/ForwardClic.png")]'
              : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Forward.png")] hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/ForwardHover.png")]'
          }`}
            onMouseDown={handleForwardClick}
            onMouseUp={disableForwardClick}
            onMouseLeave={disableForwardClick}

        ></div>

        {/* Bouton Mute */}
        <div
          className={`absolute bottom-[26px] right-[85px] h-[30px] w-[30px] bg-cover hover:cursor-pointer ${
            isMuted
              ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/MuteClic.png")]'
              : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Mute.png")] hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/MuteHover.png")]'
          }`}
          onClick={handleMuteClick}
        ></div>

        {/* Bouton VolumeDown */}
        <div
          className={`absolute bottom-[26px] right-[54px] h-[30px] w-[30px] bg-cover hover:cursor-pointer ${
            isVolumeDown
              ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeDownClic.png")]'
              : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeDown.png")] hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeDownHover.png")]'
          }`}
          onClick={handleVolumeDownClick}
        ></div>

        {/* Bouton VolumeUp */}
        <div
          className={`absolute bottom-[26px] right-[23px] h-[30px] w-[30px] bg-cover hover:cursor-pointer ${
            isVolumeUp
              ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeUpClic.png")]'
              : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeUp.png")] hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/VolumeUpHover.png")]'
          }`}
          onClick={handleVolumeUpClick}
        ></div>
      </div>
    </div>
  );
};

export default Player;

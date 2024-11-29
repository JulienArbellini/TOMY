import React, { useState, useRef, useEffect } from 'react';

const Player: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
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

  // Charger l'API YouTube et initialiser le lecteur
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    (window as any).onYouTubeIframeAPIReady = () => {
      const newPlayer = new (window as any).YT.Player(playerRef.current, {
        events: {
          onReady: () => {
            console.log("Player is ready");
            setPlayer(newPlayer);
          }
        }
      });
    };
  }, []);

  return (
    <div className="absolute h-screen w-full flex justify-center items-center">
      <div className="h-[435px] w-[586px]">
        <iframe
          ref={playerRef}
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/9xIu2Gvtqnw?enablejsapi=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Bouton Play/Pause */}
      <div
        className={`absolute bottom-[26px] left-[25px] h-[30px] w-[30px] bg-cover hover:cursor-pointer ${
          isPlaying
            ? 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/PauseClic.avif")]'
            : 'bg-[url("/vectors/ELEMENTS/BoutonsPlayer/Play.avif")] hover:bg-[url("/vectors/ELEMENTS/BoutonsPlayer/PlayHover.avif")]'
        }`}
        onClick={handlePlayClick}
      ></div>
    </div>
  );
};

export default Player;

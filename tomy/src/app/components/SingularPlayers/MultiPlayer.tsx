"use client";

import React, { useEffect, useRef, useState, CSSProperties} from "react";
import PlayerFrame from "../GenericPlayer/PlayerFrame";


interface Track {
  src: string;
  title: string;
  type?: 'audio' | 'video'; // 'audio' par défaut
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
  frameSrc = "/VERSION_MOBILE/ELEMENTS/Fonds/AvionVertical.avif",
  onClose,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [p5Instance, setP5Instance] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayerStarted, setHasPlayerStarted] = useState(false); // 👈 Nouvelle variable
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const mediaElementSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);  
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [youtubeReady, setYoutubeReady] = useState(false); // utile pour YouTube
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isVideoActuallyPlaying, setIsVideoActuallyPlaying] = useState(false);

  // Créer une liste de pistes
  const trackList: Track[] = tracks || [{ src: src!, title }];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const displayedIndex = isShuffled ? shuffledIndices[currentTrackIndex] : currentTrackIndex;
  const currentTrack = trackList[displayedIndex];
  const isVideo = currentTrack.type === "video";
  const youtubePlayerRef = useRef<any>(null);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);

  const scaledValue = (value: number) => value * scale;

  const backgrounds = [
    "/VERSION_MOBILE/ELEMENTS/Fonds/AvionPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/CascadePixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/CityPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/CloudsPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/DesertPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/IslandPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/JapanesePixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/JunglePixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/PalmPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/PlantesPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/SablePixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/ScubaPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/SnowPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/SunsetPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/UnderwaterPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/Volcano1Pixel.avif"
  ];

  useEffect(() => {
    backgrounds.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [src]: true }));
      };
    });
  }, []);
  
  
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  useEffect(() => {
    setIsPlaying(false); // 🔁 Corrige le bouton pause affiché à tort
    setHasPlayerStarted(false);
  }, [currentTrackIndex]);

  useEffect(() => {
    if (!titleRef.current) return;
  
    const container = titleRef.current.parentElement;
    if (!container) return;
  
    const isOverflowing = titleRef.current.scrollWidth > container.clientWidth;
    setShouldScroll(isOverflowing);
  }, [currentTrack.title, scale]);

  useEffect(() => {
    if (currentTrack.type === "video") setOverlayVisible(true);
  }, [currentTrack]);

useEffect(() => {
  if (currentTrack.type !== "video") return;

  const onYouTubeIframeAPIReady = () => {
    youtubePlayerRef.current = new window.YT.Player("yt-player", {
      events: {
        onReady: (event: any) => {
          console.log("✅ YouTube player ready");
          setYoutubeReady(true);
          setIsVideoReady(true);
          youtubePlayerRef.current?.playVideo();
        },
        onStateChange: (event: any) => {
          const state = event.data;
          if (state === window.YT.PlayerState.PLAYING) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => setOverlayVisible(false));
            });
            setIsPlaying(true);          // ← ajoute
            setHasPlayerStarted(true);   // ← ajoute
          } else if (state === window.YT.PlayerState.PAUSED ||
                     state === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);         // ← ajoute
          } else if (state === window.YT.PlayerState.BUFFERING) {
            setOverlayVisible(true);
          }
        }
        
      },
    });
  };



  if (!window.YT) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  } else {
    onYouTubeIframeAPIReady();
  }

  return () => {
    // Optionnel : détruire proprement le player précédent si besoin
    youtubePlayerRef.current?.destroy?.();
  };
}, [currentTrack]);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
    
      const originalWidth = 556;
      const originalHeight = 17 + 60 + 280 + 197 + 30; // cadre + titre + canvas + bouton + marges
      const ratio = originalHeight / originalWidth;
    
      const isPortrait = windowHeight > windowWidth;
    
      let maxWidth: number;
      let maxHeight: number;
    
      if (isPortrait) {
        maxWidth = windowWidth * 0.9;
        maxHeight = maxWidth * ratio;
        const scaleWidth = maxWidth / originalWidth;
        const scaleHeight = maxHeight / originalHeight;
      
        const newScale = Math.min(scaleWidth, scaleHeight);
        setScale(newScale);
      } else {
        const maxHeight = windowHeight * 0.8;
        const scaleHeight = maxHeight / originalHeight;
        setScale(scaleHeight);
      }
    

    };
  
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const generateShuffledIndices = (length: number): number[] => {
    const indices = Array.from({ length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  };

  const toggleShuffle = () => {
    setIsShuffled((prev) => {
      const newState = !prev;
      if (newState) {
        setShuffledIndices(generateShuffledIndices(trackList.length));
      } else {
        setShuffledIndices([]);
      }
      return newState;
    });
  };


useEffect(() => {
  if (currentTrack.type === "video") return;
  let localP5: any;

  const loadP5 = async () => {
    // 1) importe p5 et expose-le global pour p5.sound
    const p5Module = await import("p5");
    const P5       = p5Module.default;
    ;(window as any).p5 = P5;

    // 2) importe l’addon son (il va chercher window.p5)
    await import("p5/lib/addons/p5.sound");

    // 3) définis ton sketch
    const sketch = (p: any) => {
      p.setup = () => {
        console.log("✅ p5.setup");               // <— debug
        const c = p.createCanvas(
          scaledValue(580),
          scaledValue(280)
        );
        c.parent(canvasContainerRef.current!);

        // instancie la FFT, sans l’y connecter tout de suite
        fftRef.current = new p5Module.default.FFT();
        p.noFill();
      };

      p.draw = () => {
        // console.log("✅ p5.draw");             // <— tu peux activer pour debugger
        p.background(0);                         // fond gris foncé pour mieux voir
        const waveform = fftRef.current.waveform(); 
        p.stroke(0, 255, 0);
        p.strokeWeight(2);
        p.beginShape();
        waveform.forEach((v: number, i: number) => {
          const x = p.map(i, 0, waveform.length, 0, p.width);
          const y = p.map(v, -1, 1, 0, p.height);
          p.vertex(x, y);
        });
        p.endShape();
      };
    };

    // 4) crée l’instance et stocke-la
    localP5 = new P5(sketch);
    setP5Instance(localP5);
  };

  loadP5();
  return () => localP5?.remove();
}, []);


  useEffect(() => {
    if (p5Instance) {
      // On attend le prochain rafraîchissement d'affichage
      requestAnimationFrame(() => {
        p5Instance.resizeCanvas(scaledValue(580), scaledValue(280));
      });
    }
  }, [p5Instance, scale]);

  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (!audio) return;
  
  //   audio.src = currentTrack.src;
  
  //   const playWhenReady = async () => {
  //     try {
  //       if (isPlaying) {
  //         await audio.play();
  //       }
  //     } catch (err) {
  //       console.warn("Impossible de jouer l'audio :", err);
  //     }
  //   };
  
  //   // Important : attendre un tick pour que le src soit bien pris en compte
  //   setTimeout(playWhenReady, 50);
  
  // }, [currentTrackIndex, isPlaying, currentTrack.src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
  
    const handleEnded = () => {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % trackList.length);
    };
  
    audio.addEventListener("ended", handleEnded);
  
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [trackList.length]);


  const fftRef = useRef<any>(null);          // à déclarer en haut

  const togglePlayPause = () => {
    console.log("🎬 isVideoActuallyPlaying =", isVideoActuallyPlaying);

    if (currentTrack.type === "video") {
      const player = youtubePlayerRef.current;
      if (!player) return;
      const state = player.getPlayerState(); // 1 = playing
    
      if (state === 1) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      // 👉 ne touche PAS à setIsPlaying ici
      return;
    }
    
  

    const audio = audioRef.current!;
    if (!p5Instance) return;
  
    // 1) Réveille le contexte dans la même pile d’événement
    const ctx: AudioContext = p5Instance.getAudioContext();
    if (ctx.state === "suspended") ctx.resume();
  
    // 2) Crée et connecte le media source **une seule fois**
    if (!mediaElementSourceRef.current) {
      const srcNode = ctx.createMediaElementSource(audio);
      srcNode.connect(ctx.destination);
      mediaElementSourceRef.current = srcNode;
      fftRef.current.setInput(srcNode);
    }
  
    // 3) Lecture / pause
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        setHasPlayerStarted(true);
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (currentTrack.type !== "audio") return;
    const audio = audioRef.current;
    if (!audio) return;
  
    const handleError = () => {
      const error = audio.error;
      if (error) {
        console.error("🎧 Erreur audio détectée :", {
          code: error.code,
          message: (() => {
            switch (error.code) {
              case 1: return "MEDIA_ERR_ABORTED - L'utilisateur a annulé la lecture.";
              case 2: return "MEDIA_ERR_NETWORK - Une erreur de réseau s’est produite.";
              case 3: return "MEDIA_ERR_DECODE - Une erreur de décodage a empêché la lecture.";
              case 4: return "MEDIA_ERR_SRC_NOT_SUPPORTED - Format non supporté ou fichier introuvable.";
              default: return "Erreur inconnue.";
            }
          })()
        });
      }
    };
  
    audio.addEventListener("error", handleError);
    return () => audio.removeEventListener("error", handleError);
  }, [currentTrack]);



  const togglePaysage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
      setIsTransitioning(false);
    }, 300); // Temps de fade-out
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
      console.log("decrease");
      const newVolume = Math.max(volume - 0.1, 0);
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const playNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % trackList.length;
      return nextIndex;
    });
    setIsPlaying(true);
  };

  const playPreviousTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? trackList.length - 1 : prevIndex - 1
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
  
    const isTouch = typeof window !== "undefined" && "ontouchstart" in window;
  
    const handleClick = () => {
      setButtonState("clicked");
      onClick();
  
      // Retour à l'état par défaut après 150ms
      setTimeout(() => {
        setButtonState("default");
      }, 150);
    };
  
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
        onMouseEnter={() => !isTouch && setButtonState("hover")}
        onMouseLeave={() => !isTouch && setButtonState("default")}
        onMouseDown={() => !isTouch && setButtonState("clicked")}
        onMouseUp={() => !isTouch && setButtonState("hover")}
        onClick={handleClick}
      ></div>
    );
  };

  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const currentBackground = backgrounds[backgroundIndex];
  
  return (
    <div
    ref={containerRef}
    className="min-h-[100dvh] w-full flex justify-center items-center relative overflow-hidden"
  >
    {/* BACKGROUND BLUR + NETTE superposées */}
    <div className="absolute inset-0 z-0">
      {/* Image floue de secours */}
      <div
        style={{
          backgroundImage: `url(${currentBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(12px)',
          opacity: loadedImages[currentBackground] ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
        className="absolute inset-0"
      />
      {/* Image nette */}
      <div
        style={{
          backgroundImage: `url(${currentBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 0.6s ease-in-out',
        }}
        className="absolute inset-0"
      />
    </div>

      <div
        className="relative flex flex-col items-center"
        style={{

          // top: isPortrait ?`${scaledValue(115)}px` : `${scaledValue(30)}px`,
          // height: `${scaledValue(337)}px`,
          width: `${scaledValue(576)}px`,
          // backgroundColor: "red",
          height: isPortrait
          ? `${scaledValue(647)}px`
          : `${window.innerHeight * 0.9}px`,
        }}
      >
        {/* Cadre décoratif */}
        <img
          src={"VERSION_MOBILE/ELEMENTS/TopEcran.avif"}
          alt="Cadre décoratif autour du contenu"
          style={{
            height: `${scaledValue(17)}px`,
            width: `${scaledValue(565)}px`,
          }}
        />

        {/* Titre de la piste */}
        {!youtubeReady ? (
          <div
            className="z-10"
            style={{
              position: "absolute",
              top: `${scaledValue(60)}px`,
              left: `${scaledValue(564 / 2)}px`,
              transform: "translate(-50%, -50%)",
              width: `${scaledValue(500)}px`,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textAlign: "center",
              color: "white",
            }}
          >
            <div
              ref={titleRef}
              style={{
                display: "inline-block",
                fontWeight: "bold",
                fontSize: `${scaledValue(35)}px`,
                animation: shouldScroll ? "scrollText 10s linear infinite" : undefined,
                paddingRight: shouldScroll ? "100%" : undefined,
              }}
            >
              {currentTrack.title}
            </div>
          </div>
          ) : <div className="div"></div>
          }

        {/* Canvas pour la visualisation avec p5 */}
        {currentTrack.type !== "video" && (
          <div
            ref={canvasContainerRef}
            className="absolute w-full flex justify-center items-center"
            style={{
              top: `${scaledValue(17)}px`,
              left: `${scaledValue(6)}px`,
              height: `${scaledValue(410)}px`,
              width: `${scaledValue(564)}px`,
              backgroundColor: "black",
              overflow: "hidden",
            }}
          ></div>
        )}

        {currentTrack.type === "video" && (
          <div
            className="absolute bg-red-400"
            style={{
              top: `${scaledValue(17)}px`,
              left: `${scaledValue(6)}px`,
              height: `${scaledValue(410)}px`,
              width: `${scaledValue(564)}px`,
              overflow: "hidden",
            }}
          >
            <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
              <div className="bg-black flex justify-center items-center"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                backgroundColor: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: overlayVisible ? 5 : 0
              }}
              >
              </div>

          
            <div
              className="absolute"
              style={{
                top: `${scaledValue(-235)}px`,
                left: 0,
                height: `${scaledValue(220)}px`,
                width: `100%`,
              }}
            >



          <iframe
            id="yt-player"
            key={currentTrack.src}
            src={`https://www.youtube.com/embed/${currentTrack.src}?enablejsapi=1&mute=0&loop=1&playlist=${currentTrack.src}&modestbranding=1&controls=0&playsinline=1`}
            style={{
              width: "100%",
              height: "400%",
              pointerEvents: "none",
              zIndex : 4,
            }}
            allow="autoplay; encrypted-media"
            allowFullScreen
            frameBorder="0"
          />
                </div>
            </div>
          </div>
        )}

        {/* Contrôles audio personnalisés */}
      
        {/* Previous Track */}
        <AudioControlButton
          defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Previous.avif"
          clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PreviousClic.avif"
          hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PreviousClic.avif"
          onClick={playPreviousTrack}
          style={{
            position: "absolute",
            top: `${scaledValue(426)}px`,
            left: `${scaledValue(6)}px`,
            width: `${scaledValue(150)}px`,
            height: `${scaledValue(150)}px`,
            backgroundSize: "contain",
            background: "contain",
            backgroundRepeat: "no-repeat",
            zIndex: 7,
          }}
        />



          {/* Next Track */}
          <AudioControlButton
          defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Next.avif"
          clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/NextClic.avif"
          hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/NextClic.avif"
            onClick={playNextTrack}
            style={{
              position: "absolute",
              top: `${scaledValue(426)}px`,
              right: `${scaledValue(6)}px`,
              width: `${scaledValue(150)}px`,
              height: `${scaledValue(150)}px`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              zIndex: 7,
            }}
          />



          {/* Volume Up */}
          <AudioControlButton
            defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeUp.avif"
            clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeUpClic.avif"
            hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeUpClic.avif"
            onClick={increaseVolume}
            style={{
              position: "absolute",
              top: `${scaledValue(415)}px`,
              right: `${scaledValue(112)}px`,
              width: `${scaledValue(120)}px`,
              height: `${scaledValue(120)}px`,
              backgroundSize: "contain",
              background: "contain",
              backgroundRepeat: "no-repeat",
              zIndex: 9,
            }}
          />

          {/* Volume Down */}
          <AudioControlButton
            defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeDown.avif"
            hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeDownHover.avif"
            clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeDownClic.avif"
            onClick={toggleMute}
            style={{
              position: "absolute",
              top: `${scaledValue(415)}px`,
              left: `${scaledValue(122)}px`,
              width: `${scaledValue(120)}px`,
              height: `${scaledValue(120)}px`,
              backgroundSize: "contain",
              background: "contain",
              backgroundRepeat: "no-repeat",
              zIndex: 7,
            }}
          />

          {/* Mute */}
          <AudioControlButton
            defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Mute.avif"
            hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Mute.avif"
            clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Mute.avif"
            onClick={decreaseVolume}
            style={{ 
              position: "absolute",
              top: `${scaledValue(505)}px`,
              left: `${scaledValue(212)}px`,
              width: `${scaledValue(150)}px`,
              height: `${scaledValue(150)}px`,
              backgroundSize: "contain",
              background: "contain",
              backgroundRepeat: "no-repeat",
              zIndex: 6,
            }}
          />

          {/* Play/Pause */}
          <AudioControlButton
            defaultIcon={hasPlayerStarted && isPlaying ? "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Pause.avif" : "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Play.avif"}
            hoverIcon={hasPlayerStarted && isPlaying ? "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PauseClic.avif" : "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PlayClic.avif"}
            clickedIcon={hasPlayerStarted && isPlaying ? "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PauseClic.avif" : "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PlayClic.avif"}
            onClick={togglePlayPause}
            style={{
              position: "absolute",
              top: `${scaledValue(395)}px`,
              left: `${scaledValue(188)}px`,
              width: `${scaledValue(197)}px`,
              height: `${scaledValue(197)}px`,
              backgroundSize: "contain",
              background: "contain",
              backgroundRepeat: "no-repeat",
              zIndex: 10,
            }}
          />
          {/* Changer de fond */}
          <AudioControlButton
            defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Paysage.avif"
            hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PaysageHover.avif"
            clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PaysageClic.avif"            
            onClick={togglePaysage}
            style={{
              position: "absolute",
              top: `${scaledValue(512)}px`,
              left: `${scaledValue(119)}px`,
              width: `${scaledValue(135)}px`,
              height: `${scaledValue(135)}px`,
              backgroundSize: "contain",
              background: "contain",
              backgroundRepeat: "no-repeat",
              zIndex: 10,
            }}
          />
          {/* Shuffle */}
          <AudioControlButton
            defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Shuffle.avif"
            hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/ShuffleHover.avif"
            clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/ShuffleClic.avif"            
            onClick={toggleShuffle}
            style={{
              position: "absolute",
              top: `${scaledValue(512)}px`,
              right: `${scaledValue(128)}px`,
              width: `${scaledValue(135)}px`,
              height: `${scaledValue(135)}px`,
              backgroundSize: "contain",
              background: "contain",
              backgroundRepeat: "no-repeat",
              zIndex: 10,
            }}
          />



        {/* Élément audio caché */}
      </div>
      {isVideo ? (
        <PlayerFrame
        playerRef={iframeRef}
        src={currentTrack.src} // ID YouTube
        onClose={onClose}
        scale={scale}
        frameSrc={frameSrc}
        isPlayingAndDelay={isPlaying}
        isVideoEnded={false} // ou à calculer selon tes besoins
      />
      ) : (
        <audio
          ref={audioRef}
          src={currentTrack.src}
          autoPlay
          controls={false}
          style={{ display: "block", width: "100%", maxWidth: 300 }}
        />
      )}
    </div>
  );
};

export default MultiPlayer;
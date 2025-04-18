"use client";

import React, { useEffect, useRef, useState, CSSProperties} from "react";


interface Track {
  src: string;
  title: string;
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
  frameSrc = "/VERSION_MOBILE/ELEMENTS/Fonds/AvionVertical.png",
  onClose,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [p5Instance, setP5Instance] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const mediaElementSourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  // Créer une liste de pistes
  const trackList: Track[] = tracks || [{ src: src!, title }];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const currentTrack = trackList[currentTrackIndex];

  const scaledValue = (value: number) => value * scale;

  const backgrounds = [
    "/VERSION_MOBILE/ELEMENTS/Fonds/AvionVerticalPlein.png",
    "/VERSION_MOBILE/ELEMENTS/Fonds/Paysage1.jpeg",
    "/VERSION_MOBILE/ELEMENTS/Fonds/Paysage2.webp"
  ];
  
  
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;


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

  // useEffect(() => {
  //   let localP5Instance: any;
  //   let fft: any;

  //   const loadP5 = async () => {
  //     const p5Module = await import("p5");
  //     const p5 = p5Module.default;
  //     (window as any).p5 = p5;
  //     await import("p5/lib/addons/p5.sound");

  //     const sketch = (p: any) => {
  //       p.setup = () => {
  //         const canvas = p.createCanvas(
  //           scaledValue(580),
  //           scaledValue(280)
  //         );
  //         canvas.parent(canvasContainerRef.current!);
  //         fft = new p5.FFT();
  //         p.noFill();

  //         // if (audioRef.current) {
  //         //   const audioContext = p.getAudioContext();
          
  //         //   // Création unique du mediaElementSource
  //         //   if (!mediaElementSourceRef.current) {
  //         //     const mediaSource = audioContext.createMediaElementSource(audioRef.current);
  //         //     mediaSource.connect(audioContext.destination);
  //         //     mediaElementSourceRef.current = mediaSource;
  //         //   }
          
  //         //   fft.setInput(mediaElementSourceRef.current);
  //         // }
  //       };

  //       p.draw = () => {
  //         p.background(0);
  //         const waveform = fft.waveform();

  //         p.noFill();
  //         p.stroke(0, 255, 0);
  //         p.strokeWeight(2);
  //         p.beginShape();
  //         for (let i = 0; i < waveform.length; i++) {
  //           const x = p.map(i, 0, waveform.length, 0, p.width);
  //           const y = p.map(waveform[i], -1, 1, 0, p.height);
  //           p.vertex(x, y);
  //         }
  //         p.endShape();
  //       };
  //     };

  //     localP5Instance = new p5(sketch);
  //     setP5Instance(localP5Instance);
  //   };

  //   loadP5();

  //   return () => {
  //     if (localP5Instance) localP5Instance.remove();
  //   };
  // }, []);



// …

useEffect(() => {
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
        p.background(20);                         // fond gris foncé pour mieux voir
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

  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (!audio) return;
  
  //   const handleEnded = () => {
  //     setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % trackList.length);
  //   };
  
  //   audio.addEventListener("ended", handleEnded);
  
  //   return () => {
  //     audio.removeEventListener("ended", handleEnded);
  //   };
  // }, [trackList.length]);



  // **Actions des contrôles personnalisés**
  // const togglePlayPause = async () => {
  //   if (!audioRef.current) return;
  
  //   const audio = audioRef.current;
  
  //   // 🔧 On récupère ou crée le contexte
  //   const audioContext =
  //     (window as any).p5?.getAudioContext?.() ||
  //     new (window.AudioContext || window.webkitAudioContext)();
  
  //   // 🧠 On le "resume" systématiquement dans l'interaction utilisateur
  //   if (audioContext.state === "suspended") {
  //     await audioContext.resume();
  //     console.log("🔊 AudioContext resumed");
  //   }
  
  //   try {
  //     // 🎧 Création de la source audio (si pas encore faite)
  //     if (!mediaElementSourceRef.current) {
  //       const source = audioContext.createMediaElementSource(audio);
  //       source.connect(audioContext.destination);
  //       mediaElementSourceRef.current = source;
  //     }
  
  //     if (audio.paused) {
  //       await audio.load();
  //       await audio.play();
  //       console.log("▶️ Lecture démarrée");
  //       setIsPlaying(true);
  //     } else {
  //       audio.pause();
  //       console.log("⏸️ Lecture mise en pause");
  //       setIsPlaying(false);
  //     }
  //   } catch (e) {
  //     console.warn("❌ Erreur lors de la lecture audio :", e);
  //   }
  // };
  const fftRef = useRef<any>(null);          // à déclarer en haut

  const togglePlayPause = () => {
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
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
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
      } else {
        console.warn("⚠️ Événement 'error' capturé, mais aucun objet d'erreur détecté.");
      }
    };
  
    audio.addEventListener("error", handleError);
  
    return () => {
      audio.removeEventListener("error", handleError);
    };
  }, []);



  const togglePaysage = () => {
    setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
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
          ...style,
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

  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const currentBackground = backgrounds[backgroundIndex];
  
  return (
    <div 
    className="h-screen w-full flex justify-center"
    ref={containerRef}
    style={{ 
      backgroundImage: `url(${currentBackground})`,
      backgroundSize: "cover"
     }}
    >
      <div
        className="relative flex flex-col items-center"
        style={{

          top: isPortrait ?`${scaledValue(115)}px` : `${scaledValue(30)}px`,
          // height: `${scaledValue(337)}px`,
          width: `${scaledValue(576)}px`,
          height: isPortrait
          ? `${scaledValue(337)}px`
          : `${window.innerHeight * 0.9}px`,
        }}
      >
        {/* Cadre décoratif */}
        <img
          src={"VERSION_MOBILE/ELEMENTS/TopEcran.png"}
          alt="Cadre décoratif autour du contenu"
          style={{
            height: `${scaledValue(17)}px`,
            width: `${scaledValue(565)}px`,
          }}
        />

        {/* Titre de la piste */}
        <div
          className="text-lg font-bold mb-4 z-10"
          style={{
            position: "absolute",
            top: `${scaledValue(60)}px`,   // centre vertical
            left: `${scaledValue(564/2)}px`, // centre horizontal
            transform: "translate(-50%, -50%)",    // décale le texte de la moitié de sa propre largeur/hauteur
            textAlign: "center",
          }}
        >
          {currentTrack.title}
        </div>

        {/* Canvas pour la visualisation avec p5 */}
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

        {/* Contrôles audio personnalisés */}
      
        {/* Previous Track */}
        <AudioControlButton
          defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Previous/Previous.png"
          clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Previous/PreviousClic.png"
          hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Previous/PreviousClic.png"
          onClick={playPreviousTrack}
          style={{
            position: "absolute",
            top: `${scaledValue(426)}px`,
            left: `${scaledValue(6)}px`,
            width: `${scaledValue(150)}px`,
            height: `${scaledValue(150)}px`,
            backgroundSize: "contain",
            background: "contain",
            backgroundRepeat: "no-repeat"
          }}
        />



          {/* Next Track */}
          <AudioControlButton
          defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Next/Next.png"
          clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Next/NextClic.png"
          hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Next/NextClic.png"
            onClick={playNextTrack}
            style={{
              position: "absolute",
              top: `${scaledValue(426)}px`,
              right: `${scaledValue(6)}px`,
              width: `${scaledValue(150)}px`,
              height: `${scaledValue(150)}px`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat"
            }}
          />



          {/* Volume Up */}
          <AudioControlButton
            defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/VolumeUp/VolumeUp.png"
            clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/VolumeUp/VolumeUpClic.png"
            hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/VolumeUp/VolumeUpClic.png"
            onClick={increaseVolume}
            style={{
              position: "absolute",
              top: `${scaledValue(415)}px`,
              right: `${scaledValue(112)}px`,
              width: `${scaledValue(120)}px`,
              height: `${scaledValue(120)}px`,
              backgroundSize: "contain",
              background: "contain",
              backgroundRepeat: "no-repeat"
            }}
          />

          {/* Mute */}
          <AudioControlButton
            defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Mute/Mute.png"
            hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Mute/MuteHover.png"
            clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Mute/MuteClic.png"
            onClick={toggleMute}
            style={{
              position: "absolute",
              top: `${scaledValue(415)}px`,
              left: `${scaledValue(122)}px`,
              width: `${scaledValue(120)}px`,
              height: `${scaledValue(120)}px`,
              backgroundSize: "contain",
              background: "contain",
              backgroundRepeat: "no-repeat"
            }}
          />

          {/* Volume Down */}
          <AudioControlButton
            defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/VolumeDown/VolumeDown.png"
            hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/VolumeDown/VolumeDownClic.png"
            clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/VolumeDown/VolumeDownClic.png"
            onClick={decreaseVolume}
            style={{
              position: "absolute",
              top: `${scaledValue(505)}px`,
              left: `${scaledValue(212)}px`,
              width: `${scaledValue(150)}px`,
              height: `${scaledValue(150)}px`,
              backgroundSize: "contain",
              background: "contain",
              backgroundRepeat: "no-repeat"
            }}
          />

          {/* Play/Pause */}
          <AudioControlButton
            defaultIcon={isPlaying ? "/VERSION_MOBILE/ELEMENTS/Boutons/Pause/Pause.png" : "/VERSION_MOBILE/ELEMENTS/Boutons/Play/Play.png"}
            hoverIcon={isPlaying ? "/VERSION_MOBILE/ELEMENTS/Boutons/Pause/PauseClic.png" : "/VERSION_MOBILE/ELEMENTS/Boutons/Play/PlayClic.png"}
            clickedIcon={isPlaying ? "/VERSION_MOBILE/ELEMENTS/Boutons/Pause/PauseClic.png" : "/VERSION_MOBILE/ELEMENTS/Boutons/Play/PlayClic.png"}
            onClick={togglePlayPause}
            style={{
              position: "absolute",
              top: `${scaledValue(395)}px`,
              left: `${scaledValue(188)}px`,
              width: `${scaledValue(197)}px`,
              height: `${scaledValue(197)}px`,
              backgroundSize: "contain",
              background: "contain",
              backgroundRepeat: "no-repeat"
            }}
          />
          {/* Changer de fond */}
          <AudioControlButton
            defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Paysage/Paysage.png"
            hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Paysage/PaysageHover.png"
            clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Paysage/PaysageClic.png"            
            onClick={togglePaysage}
            style={{
              position: "absolute",
              top: `${scaledValue(512)}px`,
              left: `${scaledValue(119)}px`,
              width: `${scaledValue(135)}px`,
              height: `${scaledValue(135)}px`,
              backgroundSize: "contain",
              background: "contain",
              backgroundRepeat: "no-repeat"
            }}
          />
          {/* Shuffle */}
          <AudioControlButton
            defaultIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Shuffle/Shuffle.png"
            hoverIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Shuffle/ShuffleHover.png"
            clickedIcon="/VERSION_MOBILE/ELEMENTS/Boutons/Shuffle/ShuffleClic.png"            
            onClick={togglePlayPause}
            style={{
              position: "absolute",
              top: `${scaledValue(512)}px`,
              right: `${scaledValue(128)}px`,
              width: `${scaledValue(135)}px`,
              height: `${scaledValue(135)}px`,
              backgroundSize: "contain",
              background: "contain",
              backgroundRepeat: "no-repeat"
            }}
          />



          {/* Close */}
          {/* <AudioControlButton
            defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Exit.avif"
            hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif"
            clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitClic.avif"
            onClick={onClose}
            style={{
              position: "absolute",
              bottom: `${scaledValue(7)}px`,
              left: `${scaledValue(7)}px`,
            }}
          /> */}


        {/* Élément audio caché */}
      </div>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        autoPlay={true}
        controls={false}
        style={{ display: "block", width: "100%", maxWidth: 300 }}
      />
    </div>
  );
};

export default MultiPlayer;
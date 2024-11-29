"use client";

import React, { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  src: string;
  autoplay?: boolean;
  controls?: boolean;
  frameSrc?: string;
  title?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  autoplay = false,
  controls = true,
  title = "Titre inconnu",
  frameSrc = "/vectors/ELEMENTS/Cadres/CadreMusique.webp",
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Fonction pour calculer la mise à l'échelle
  const scaledValue = (value: number) => value * scale;

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const originalHeight = 555; // Hauteur de référence pour l'échelle
      const desiredHeight = windowHeight * 0.8; // On cible 80% de la hauteur de l'écran
      const newScale = desiredHeight / originalHeight;
      setScale(newScale);
    };

    // Mettre à jour l'échelle au montage et à chaque redimensionnement
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let p5Instance: any;

    const loadP5 = async () => {
      const p5Module = await import("p5");
      const p5 = p5Module.default;
      (window as any).p5 = p5;
      await import("p5/lib/addons/p5.sound");

      const sketch = (p: any) => {
        let fft: any;

        p.setup = () => {
          const canvas = p.createCanvas(
            scaledValue(580),
            scaledValue(280)
          );
          canvas.parent(canvasContainerRef.current!);
          fft = new p5.FFT();
          p.noFill();

          if (audioRef.current) {
            const audioContext = (p5.prototype.getAudioContext() as unknown) as AudioContext;
            const mediaElement = audioContext.createMediaElementSource(audioRef.current);
            mediaElement.connect(audioContext.destination);
            fft.setInput(mediaElement);
          }
        };

        p.draw = () => {
          p.background(0);
          const waveform = fft.waveform();

          p.noFill();
          p.stroke(0, 255, 0);
          p.strokeWeight(2);
          p.beginShape();
          for (let i = 0; i < waveform.length; i++) {
            const x = p.map(i, 0, waveform.length, 0, p.width);
            const y = p.map(waveform[i], -1, 1, 0, p.height);
            p.vertex(x, y);
          }
          p.endShape();
        };
      };

      p5Instance = new p5(sketch);
    };

    loadP5();

    return () => {
      if (p5Instance) p5Instance.remove();
    };
  }, []);

  return (
    <div
      className="relative flex flex-col items-center"
      style={{
        height: `${scaledValue(550)}px`,
        width: `${scaledValue(640)}px`,
      }}
    >
      <img
        src={frameSrc}
        alt="Cadre décoratif autour du contenu"
        style={{
          height: `${scaledValue(538)}px`,
          width: `${scaledValue(638)}px`,
        }}
      />
      {/* Titre de la piste */}
      <div
        className="absolute text-center text-lg font-bold mb-4"
        style={{
          marginTop: `${scaledValue(30)}px`,
        }}
      >
        {title}
      </div>

      {/* Canvas pour la visualisation avec p5 */}
      <div
        ref={canvasContainerRef}
        className="absolute w-full mb-4 flex justify-center items-center bg-red-200"
        style={{
          top: `${scaledValue(20)}px`,
          right: `${scaledValue(17)}px`,
          height: `${scaledValue(280)}px`,
          width: `${scaledValue(380)}px`,
          borderRadius: `95%`, // Rend le cadre ovale
          backgroundColor: "black", // Fond noir
          overflow: "hidden", // Empêche le débordement
        }}
      ></div>

      {/* Contrôles audio */}
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoplay}
        controls={controls}
        style={{
          width: `${scaledValue(500)}px`,
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default AudioPlayer;
"use client";

import React, { useEffect, useRef } from "react";

interface MusicPlayerProps {
  frameSrc: string; // Chemin vers l'image du cadre
  audioUrl: string; // URL de la piste audio
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ frameSrc, audioUrl }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let p5Instance: any;

    const loadP5 = async () => {
      // Importer dynamiquement p5 et le rendre global
      const p5Module = await import("p5");
      const p5 = p5Module.default;
      (window as any).p5 = p5; // Rendre p5 global

      // Importer p5.sound après avoir rendu p5 global
      await import("p5/lib/addons/p5.sound");

      const sketch = (p: any) => {
        let fft: any;

        p.setup = () => {
          const canvas = p.createCanvas(300, 150);
          canvas.parent(canvasRef.current!);
          fft = new p5.FFT();
          p.noFill();

          // Configurer l'entrée audio pour l'analyse FFT
          if (audioRef.current) {
            const audioContext = (p5.prototype.getAudioContext() as unknown) as AudioContext;            const mediaElement = audioContext.createMediaElementSource(audioRef.current);
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
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, [audioUrl]);

  return (
    <div
      className="relative flex flex-col justify-center items-center"
      style={{
        width: "300px",
        height: "400px",
        backgroundImage: `url(${frameSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Canvas pour le spectrogramme */}
      <div ref={canvasRef} className="absolute top-0" style={{ zIndex: 10 }} />

      {/* Lecteur audio */}
      <audio
        ref={audioRef}
        controls
        style={{
          width: "80%",
          zIndex: 20,
        }}
      >
        <source src={audioUrl} type="audio/wav" />
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
    </div>
  );
};

export default MusicPlayer;
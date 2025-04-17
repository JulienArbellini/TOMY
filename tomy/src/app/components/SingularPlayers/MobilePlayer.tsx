"use client";

import React, { useEffect, useRef, useState } from "react";

interface PlaylistTrack {
  title: string;
  url: string;
}

interface PlaylistPlayerProps {
  frameSrc: string;
  tracks: PlaylistTrack[];
}

const PlaylistPlayer: React.FC<PlaylistPlayerProps> = ({ frameSrc, tracks }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const currentTrack = tracks[currentTrackIndex];

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
          const canvas = p.createCanvas(300, 150);
          canvas.parent(canvasRef.current!);
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
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, [currentTrackIndex]);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

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
      <div ref={canvasRef} className="absolute top-0" style={{ zIndex: 10 }} />

      <div className="absolute bottom-20 text-white text-sm z-30">
        {currentTrack.title}
      </div>

      <audio
        ref={audioRef}
        key={currentTrack.url}
        src={currentTrack.url}
        controls
        autoPlay
        style={{ width: "80%", zIndex: 20 }}
      />

      <div className="absolute bottom-4 flex gap-4 z-30">
        <button onClick={handlePrev} className="text-white">⏮</button>
        <button onClick={handleNext} className="text-white">⏭</button>
      </div>
    </div>
  );
};

export default PlaylistPlayer;
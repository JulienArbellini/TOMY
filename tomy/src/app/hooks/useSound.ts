// hooks/useSound.ts
import { useEffect, useRef } from 'react';

const useSound = (url: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(url);
  }, [url]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Remettre le son au début
      audioRef.current.play().catch((error) => {
        console.error("Erreur lors de la lecture du son :", error);
      });
    }
  };

  return play;
};

export default useSound;

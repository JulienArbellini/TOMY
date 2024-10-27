"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import useSound from '@/app/hooks/useSound';

interface ThreeDButtonProps {
  href: string;
}

export default function ThreeDButton({  }: ThreeDButtonProps) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);

  // État pour suivre si le bouton est pressé
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Charger le son de clic
  // const playClickSound = useSound('/sounds/click-sound.wav');
  const playClickSoundA = useSound('/sounds/LogoSonoreA.wav');
  const playClickSoundB = useSound('/sounds/LogoSonoreB.wav');
  // Valeurs de mouvement pour l'effet 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Rotations pour l'effet 3D
  const mouv = 4;
  const rotateX = useTransform(mouseY, [-75, 75], [mouv, -mouv]);
  const rotateY = useTransform(mouseX, [-250, 250], [-mouv, mouv]);

  // Positions pour l'effet de reflet
  const reflectionX = useMotionValue(0);
  const reflectionY = useMotionValue(0);

  // Création du dégradé pour le reflet
  const background = useMotionTemplate`
    radial-gradient(
      circle at ${reflectionX}px ${reflectionY}px,
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0)
    )
  `;

  // Gestionnaire de clic pour jouer le son
  const handlePressStart = () => {
    setIsPressed(true);
    playClickSoundA();
  };

  const handlePressEnd = () => {
    playClickSoundB();
    setIsPressed(false);
  };

  return (
    <motion.a
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      ref={cardRef}
      onMouseMove={(e) => {
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Mise à jour des positions pour la rotation
          mouseX.set(x - rect.width / 2);
          mouseY.set(y - rect.height / 2);

          // Mise à jour des positions pour le reflet
          reflectionX.set(x);
          reflectionY.set(y);
        }

      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
        setIsPressed(false); // Réinitialiser l'état au quitter
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          reflectionX.set(rect.width / 2);
          reflectionY.set(rect.height / 2);
        }
        setIsHovered(false);
      }}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handlePressStart();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handlePressEnd();
        }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      role="button"
      aria-pressed={isPressed}
      tabIndex={0}
      style={{
        perspective: 2000,
      }}
      className="w-[500px]"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25)',
          scale: isPressed ? 0.99 : isHovered ? 1.01 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="rounded-[1.1em] overflow-hidden"
      >
        {/* Conteneur de l'image avec position relative */}
        <div className="relative w-full h-full">

              <Image
                src={isPressed ? "/images/button-pressed.png" : "/images/button.png"}
                alt="Button Image"
                width={610}
                height={150}
                className="w-full"
                // style={{
                //   cursor: 'url("/images/cursor-button2.png"), auto', // Ajouter le curseur personnalisé ici
                // }}
              />

          {/* Overlay pour l'effet de reflet */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              background,
              mixBlendMode: 'overlay',
            }}
          />
        </div>
      </motion.div>
    </motion.a>
  );
}

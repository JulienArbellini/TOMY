"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';

interface ThreeDButtonProps {
  href: string;
}

export default function ThreeDButton({ href }: ThreeDButtonProps) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);

  // Valeurs de mouvement pour l'effet 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Rotations pour l'effet 3D
  const rotateX = useTransform(mouseY, [-75, 75], [15, -15]);
  const rotateY = useTransform(mouseX, [-250, 250], [-15, 15]);

  // Positions pour l'effet de reflet
  const reflectionX = useMotionValue(0);
  const reflectionY = useMotionValue(0);

  // Création du dégradé pour le reflet
  const background = useMotionTemplate`
    radial-gradient(
      circle at ${reflectionX}px ${reflectionY}px,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0)
    )
  `;

  return (
    <motion.a
      href={href}
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
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          reflectionX.set(rect.width / 2);
          reflectionY.set(rect.height / 2);
        }
      }}
      style={{
        perspective: 1000,
      }}
      className="w-[500px]"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="rounded-[1.1em] overflow-hidden"
      >
        {/* Conteneur de l'image avec position relative */}
        <div className="relative w-full h-full">
          <Image
            src="/images/button.png"
            alt="Button Image"
            width={610}
            height={150}
            className="w-full"
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

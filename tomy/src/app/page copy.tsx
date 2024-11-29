"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import ReactPlayer from 'react-player';

export default function Home() {
  // États pour gérer l'affichage des composants
  const [showButton, setShowButton] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [fadeOutAnnouncement, setFadeOutAnnouncement] = useState(false);

  // Référence pour le bouton
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

  useEffect(() => {
    // Étape 1 : Afficher le bouton après 100ms
    const fadeInTimer = setTimeout(() => {
      console.log('Fading out button');
      setShowButton(true);
    }, 1000);

    // Étape 2 : Garder le bouton visible pendant 4 secondes
    const fadeOutTimer = setTimeout(() => {
      console.log('Fading out button');
      setShowButton(false);
    }, 400); // Assurez-vous que c'est 4000ms (4 secondes)

    // Étape 3 : Afficher l'annonce après 6 secondes
    const showAnnouncementTimer = setTimeout(() => {
      setShowAnnouncement(true);
    }, 6000);

    // Étape 4 : Faire disparaître l'annonce après 4 secondes
    const fadeOutAnnouncementTimer = setTimeout(() => {
      setFadeOutAnnouncement(true);
    }, 10000);

    // Étape 5 : Afficher la vidéo après la disparition de l'annonce
    const showVideoTimer = setTimeout(() => {
      setShowAnnouncement(false);
      setShowVideo(true);
    }, 11000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(showAnnouncementTimer);
      clearTimeout(fadeOutAnnouncementTimer);
      clearTimeout(showVideoTimer);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-cover bg-[url('/images/bg.jpeg')]">
      <div className="flex flex-col justify-center items-center h-full w-full">
        <AnimatePresence>
          {showButton && (
            <motion.a
              href="/home"
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
              key="button"
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
                    src="/images/button.avif"
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
          )}
        </AnimatePresence>

        {/* Section pour l'annonce */}
        <AnimatePresence>
          {showAnnouncement && (
            <motion.div
              className={`w-[588px] h-[88px] flex justify-center items-center bg-slate-300 ${
                fadeOutAnnouncement ? 'opacity-0' : 'opacity-100'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              key="announcement"
            >
              <div className="bg-black text-white p-2 rounded-lg h-full w-full text-6xl flex justify-center items-center">
                <p>ANNOUNCEMENT</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section pour la vidéo */}
        <AnimatePresence>
          {showVideo && (
            <motion.div
              className="absolute top-0 left-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              key="video"
            >
              <ReactPlayer
                url="video/Bourdon.mp4"
                playing
                loop
                muted
                width="100%"
                height="100%"
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bouton "Skip Intro" */}
        <a
          href="/home"
          className="absolute bottom-10 right-10 bg-black text-white p-2 rounded"
        >
          Skip Intro
        </a>
      </div>
    </div>
  );
}

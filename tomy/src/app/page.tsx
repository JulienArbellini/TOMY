"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ThreeDButton from './components/Start/ThreeDButton';
import Announcement from "./components/Start/Announcement";
import VideoPlayer from './components/Start/VideoPlayer';

export default function Home() {
  // États pour gérer l'affichage des composants
  const [showButton, setShowButton] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [fadeOutAnnouncement, setFadeOutAnnouncement] = useState(false);

  // useEffect(() => {
  //   // Étape 1 : Afficher le bouton après 100ms
  //   const fadeInTimer = setTimeout(() => {
  //     setShowButton(true);
  //   }, 100);

  //   // Étape 2 : Garder le bouton visible pendant 4 secondes
  //   const fadeOutTimer = setTimeout(() => {
  //     setShowButton(false);
  //   }, 4000);

  //   // Étape 3 : Afficher l'annonce après 6 secondes
  //   const showAnnouncementTimer = setTimeout(() => {
  //     setShowAnnouncement(true);
  //   }, 6000);

  //   // Étape 4 : Faire disparaître l'annonce après 4 secondes
  //   const fadeOutAnnouncementTimer = setTimeout(() => {
  //     setFadeOutAnnouncement(true);
  //   }, 10000);

  //   // Étape 5 : Afficher la vidéo après la disparition de l'annonce
  //   const showVideoTimer = setTimeout(() => {
  //     setShowAnnouncement(false);
  //     setShowVideo(true);
  //   }, 11000);

  //   return () => {
  //     clearTimeout(fadeInTimer);
  //     clearTimeout(fadeOutTimer);
  //     clearTimeout(showAnnouncementTimer);
  //     clearTimeout(fadeOutAnnouncementTimer);
  //     clearTimeout(showVideoTimer);
  //   };
  // }, []);

  return (
    <div className="relative w-screen h-screen bg-cover bg-[url('/vectors/ELEMENTS/FondDEcran.jpg')]">
      <div className="flex flex-col justify-center items-center h-full w-full">
        {/* Bouton 3D */}
        {/* <AnimatePresence>
          {showButton && <ThreeDButton href="/home" key="button" />}
        </AnimatePresence> */}

        <ThreeDButton href="/home" key="button" />


        {/* Section pour l'annonce */}
        <AnimatePresence>
          {showAnnouncement && (
            <Announcement fadeOut={fadeOutAnnouncement} key="announcement" />
          )}
        </AnimatePresence>

        {/* Section pour la vidéo */}
        <AnimatePresence>
          {showVideo && <VideoPlayer key="video" />}
        </AnimatePresence>

        {/* Bouton "Skip Intro" */}
        {/* <a
          href="/home"
          className="absolute bottom-10 right-10 bg-black text-white p-2 rounded"
        >
          Skip Intro
        </a> */}
      </div>
    </div>
  );
}

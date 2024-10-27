"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ThreeDButton from './components/Start/ThreeDButton';
import './globals.css';
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

  //   // Étape 4 : Faire disparaître l'annonce après 10 secondes
  //   const fadeOutAnnouncementTimer = setTimeout(() => {
  //     setFadeOutAnnouncement(true);
  //   }, 10000);

  //   // Étape 5 : Afficher la vidéo après 11 secondes
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
    <div className="relative w-screen h-screen overflow-hidden"
    style={{
      cursor: 'url("/images/cursor-button2.png"), auto', // Ajouter le curseur personnalisé ici
    }}
    >
      {/* Vidéo de fond */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="https://res.cloudinary.com/dqh4fcdtl/video/upload/v1729876094/map_f0zzfx.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la balise vidéo.
      </video>

      <div className="relative flex flex-col justify-center items-center h-full w-full z-10">
        {/* Bouton 3D */}
        {/* <AnimatePresence> */}
          <ThreeDButton href="/home" key="button" />
        {/* </AnimatePresence> */}

        {/* Section pour l'annonce */}
        {/* <AnimatePresence>
          {showAnnouncement && (
            <Announcement fadeOut={fadeOutAnnouncement} key="announcement" />
          )}
        </AnimatePresence> */}

        {/* Section pour la vidéo */}
        {/* <AnimatePresence>
          {showVideo && <VideoPlayer key="video" />}
        </AnimatePresence> */}

        {/* Bouton "Skip Intro" */}
        <a
          href="/home"
          className="absolute bottom-10 right-10 bg-black text-white p-2 rounded z-20"
        >
          Skip Intro
        </a>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import AutoplayModal from '../components/AutoplayModal';
import SafetyModal from '../components/SafetyModal';
import MovieModal from '../components/MovieModal';
import TomyIslandModal from '../components/TomyIslandModal';
import WebcamModal from '../components/WebcamModal';
import MusicModal from '../components/MusicModal';
import Player from '../components/Player/Player';




const Test = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (type: string) => {
    setSelectedItem(type);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="h-screen bg-cover bg-[url('/images/bg.jpeg')] p-5 flex justify-center items-center">
<Player
  mediaType="video"
  src="https://www.youtube.com/embed/RS2jNCqCjPs"
/>
{/* <Player
  mediaType="image"
  src="/images/album/arbre.jpg"
/> */}

{/* <Player
  mediaType="text"
  src="Voici un texte à afficher dans le player."
/> */}
    </div>

  );
};

export default Test;

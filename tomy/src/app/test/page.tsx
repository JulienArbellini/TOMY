"use client";

import React, { useState } from 'react';
import AutoplayModal from '../components/AutoplayModal';
import SafetyModal from '../components/SafetyModal';
import MovieModal from '../components/MovieModal';
import TomyIslandModal from '../components/TomyIslandModal';
import WebcamModal from '../components/WebcamModal';
import MusicModal from '../components/MusicModal';
import Player from '../components/Player/Player';
import ThreeScene from '../components/Three/ThreeScene';





const Test = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (type: string) => {
    setSelectedItem(type);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="h-screen bg-cover bg-[url('/vectors/ELEMENTS/FondDEcran.jpg')] p-5 flex justify-center items-center">
      <Player src="https://www.youtube.com/embed/RS2jNCqCjPs">
      {/* <Player src="https://www.youtube.com/embed/Qi1krsuYN1M"> */}
      </Player>

    </div>

  );
};

export default Test;

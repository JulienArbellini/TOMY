"use client";

import React, { useState } from 'react';
import AutoplayModal from '../components/AutoplayModal';
import SafetyModal from '../components/SafetyModal';
import MovieModal from '../components/MovieModal';
import TomyIslandModal from '../components/TomyIslandModal';
import WebcamModal from '../components/WebcamModal';
import MusicModal from '../components/MusicModal';
import Player from '../components/Player';




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
      <Player src="https://www.youtube.com/embed/wxcCpzGelPM">
      </Player>
    </div>

  );
};

export default Test;

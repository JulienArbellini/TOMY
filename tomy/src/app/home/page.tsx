"use client";

import React, { useState } from 'react';
import AutoplayModal from '../components/AutoplayModal';
import SafetyModal from '../components/SafetyModal';
import MovieModal from '../components/MovieModal';
import TomyIslandModal from '../components/TomyIslandModal';
import WebcamModal from '../components/WebcamModal';
import MusicModal from '../components/MusicModal';

const items = [
  { name: 'AUTOPLAY', type: 'autoplay' },
  { name: 'SAFETY', type: 'safety' },
  { name: 'MOVIE', type: 'movie' },
  { name: 'TOMY ISLAND', type: 'tomyIsland' },
  { name: 'WEBCAM', type: 'webcam' },
  { name: 'MUSIC', type: 'music' },
  // Ajoutez d'autres items ici
];



const Home = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (type: string) => {
    setSelectedItem(type);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="h-screen bg-cover bg-[url('/images/bg.jpeg')] p-5 flex justify-center items-center">
      <div className="grid grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-black text-white flex justify-center items-center w-32 h-32 cursor-pointer"
            onClick={() => handleItemClick(item.type)}
          >
            {item.name}
          </div>
        ))}
      </div>
      {selectedItem === 'autoplay' && <AutoplayModal onClose={handleCloseModal} />}
      {selectedItem === 'safety' && <SafetyModal onClose={handleCloseModal} />}
      {selectedItem === 'movie' && <MovieModal onClose={handleCloseModal} />}
      {selectedItem === 'tomyIsland' && <TomyIslandModal onClose={handleCloseModal} />}
      {selectedItem === 'webcam' && <WebcamModal onClose={handleCloseModal} />}
      {selectedItem === 'music' && <MusicModal onClose={handleCloseModal} />}
      {/* Ajoutez d'autres modales ici */}
    </div>

  );
};

export default Home;

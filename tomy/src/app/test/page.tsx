"use client";

import React, { useState } from 'react';
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

    <div
      className="absolute inset-0 bg-no-repeat bg-center bg-contain"
      style={{ backgroundImage: "url('/vectors/ELEMENTS/AVION_MODELE.png')" }}
    >
      
    </div>

  );
};

export default Test;

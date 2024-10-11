import React, { useState } from 'react';
import Player from './Player';

const SafetyModal = ({ onClose }: { onClose: () => void }) => {
  const [index, setIndex] = useState(0);
  const contents = [
    "https://www.youtube.com/embed/YoQjD5O8Fzw",
    "images/content/1.JPG",
    "images/content/10.png",
  ];

  const nextContent = () => setIndex((prev) => (prev + 1) % contents.length);
  const prevContent = () => setIndex((prev) => (prev - 1 + contents.length) % contents.length);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 relative w-3/4 h-3/4">
        <button className="absolute top-4 right-4 text-black" onClick={onClose}>X</button>
        <div className="flex justify-center items-center w-full h-full">
          {index === 0 ? (
            <Player
              src={contents[index]}
            />
          ) : (
            <img src={contents[index]} alt={`content-${index}`} className="w-full h-full object-cover" />
          )}
        </div>
        <div className="absolute bottom-4 left-4 flex space-x-4">
          <button className="text-black" onClick={prevContent}>&larr;</button>
          <button className="text-black" onClick={nextContent}>&rarr;</button>
        </div>
      </div>
    </div>
  );
};

export default SafetyModal;

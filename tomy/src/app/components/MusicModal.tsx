import React, { useState } from 'react';

const MusicModal = ({ onClose }: { onClose: () => void }) => {
  const [index, setIndex] = useState(0);
  const contents = [
    { albumCover: "/images/album/arbre.jpg", audio: "/audio/music1.mp3", title: "LovPod", description: "Album - 2023 - 7 titres - 23 minutes" },
    { albumCover: "/images/album/coeur2palmier.jpg", audio: "/audio/music2.mp3", title: "Coeur de Palmier", description: "EP - 2021 - 6 titres - 17 minutes" },
    { albumCover: "/images/album/wood.jpg", audio: "/audio/music2.mp3", title: "Woods", description: "Album - 2020 - 7 titres - 23 minutes" },
    { albumCover: "/images/album/tomy.jpg", audio: "/audio/music2.mp3", title: "Programming Tomy", description: "Single - 2024 - 1 titre - 5 minutes" },
  ];

  const nextContent = () => setIndex((prev) => (prev + 1) % contents.length);
  const prevContent = () => setIndex((prev) => (prev - 1 + contents.length) % contents.length);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 relative w-3/4 h-3/4">
        <button className="absolute top-4 right-4 text-black" onClick={onClose}>X</button>
        <div className="flex">
          <div className="w-1/2 h-full flex flex-col justify-center items-center">
            <img
              src={contents[index].albumCover}
              alt={contents[index].title}
              className="object-cover w-3/4 h-3/4"
            />
            <audio controls className="mt-4 w-full">
              <source src={contents[index].audio} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div className="w-1/2 p-4">
            <h2 className="text-2xl font-bold text-black">{contents[index].title}</h2>
            <p className='text-black'>{contents[index].description}</p>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 flex space-x-4">
          <button className="text-black" onClick={prevContent}>&larr;</button>
          <button className="text-black" onClick={nextContent}>&rarr;</button>
        </div>
      </div>
    </div>
  );
};

export default MusicModal;

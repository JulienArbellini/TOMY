import React, { useState } from 'react';
import CustomVideoPlayer from './CustomVideoPlayer';

const MovieModal = ({ onClose }: { onClose: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const movies = [
    { title: 'Movie 1', description: 'Description 1', videoSrc: 'https://www.youtube.com/embed/YoQjD5O8Fzw' },
    { title: 'Movie 2', description: 'Description 2', videoSrc: 'https://www.youtube.com/embed/YoQjD5O8Fzw' }, // Ajoutez vos URL de vidéos ici
    { title: 'Movie 3', description: 'Description 3', videoSrc: 'https://www.youtube.com/embed/YoQjD5O8Fzw' }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 relative w-3/4 h-3/4">
        <button className="absolute top-4 right-4 text-black" onClick={onClose}>X</button>
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-1/2 h-[80%] bg-red-500 relative overflow-hidden">
            <CustomVideoPlayer
              src={movies[currentIndex].videoSrc}
              width="100%"
              height="150%"
              onClose={onClose}
            />
          </div>
          <div className="w-1/2 p-4">
            <h2 className="text-2xl font-bold">{movies[currentIndex].title}</h2>
            <p>{movies[currentIndex].description}</p>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 flex space-x-4">
          <button onClick={handlePrevious} className="text-black">&larr;</button>
          <button onClick={handleNext} className="text-black">&rarr;</button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;

import React from 'react';
import ReactPlayer from 'react-player';

const WebcamModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 relative w-3/4 h-3/4">
      <button className="absolute top-4 right-4 text-black" onClick={onClose}>X</button>
      <div className="flex justify-center items-center w-full h-full">
        <ReactPlayer
          url="/video/Bourdon.mp4" // Remplacez par l'URL de votre webcam
          playing
          loop
          width="100%"
          height="100%"
          className="object-cover"
        />
      </div>
    </div>
  </div>
);

export default WebcamModal;

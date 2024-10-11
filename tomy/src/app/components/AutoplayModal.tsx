import React from 'react';
import Player from './Player';

const AutoplayModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 relative w-3/4 h-3/4">
      <button className="absolute top-4 right-4 text-black" onClick={onClose}>X</button>
      <div className="flex justify-center items-center w-auto h-[90%]">
        <Player
          src="https://www.youtube.com/embed/YoQjD5O8Fzw"
        />
      </div>
    </div>
  </div>
);

export default AutoplayModal;

import React from 'react';
import CustomVideoPlayer from './CustomVideoPlayer';
import Button from './Player';

const TomyIslandModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 relative w-3/4 h-3/4">
        <button className="absolute top-4 right-4 text-black" onClick={onClose}>X</button>
        <div className="relative flex justify-center items-center w-full h-full overflow-hidden">
          <CustomVideoPlayer
            src=""
            containerWidth="100%"
            containerHeight="100%"
          />
        </div>
      </div>
      <Button
        text="test"
        />
    </div>
  );
};

export default TomyIslandModal;

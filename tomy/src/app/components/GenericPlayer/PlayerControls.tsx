import React from "react";

interface PlayerControlsProps {
  onPlay?: () => void;
  onPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  onPlay,
  onPause,
  onNext,
  onPrevious,
}) => {
  return (
    <div className="flex justify-between items-center p-2 bg-gray-800 text-white">
      <button onClick={onPrevious} className="px-4 py-2 bg-blue-500 rounded">Previous</button>
      <button onClick={onPlay} className="px-4 py-2 bg-green-500 rounded">Play</button>
      <button onClick={onPause} className="px-4 py-2 bg-yellow-500 rounded">Pause</button>
      <button onClick={onNext} className="px-4 py-2 bg-blue-500 rounded">Next</button>
    </div>
  );
};

export default PlayerControls;
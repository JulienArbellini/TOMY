import React, { useState } from "react";

interface SlideshowProps {
  images: string[];
}

const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative">
      <img src={images[current]} alt="Slideshow" className="w-full h-auto" />
      <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2">
        <button onClick={prev} className="bg-gray-800 text-white px-4 py-2 rounded">Previous</button>
        <button onClick={next} className="bg-gray-800 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>
  );
};

export default Slideshow;
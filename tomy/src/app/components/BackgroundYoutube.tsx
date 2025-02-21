"use client";

import React from 'react';

interface BackgroundYoutubeProps {
  src: string;
}

const BackgroundYoutube: React.FC<BackgroundYoutubeProps> = ({
    src
}) => {
    return (
      <div className='absolute top-0 left-0 w-full h-full object-cover'>
        {/* Iframe de fond */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,          // Derrière le contenu
            pointerEvents: "none", // La souris "passe à travers"
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${src}?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=${src}`}
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
          />
        </div>
        
        {/* Votre contenu par-dessus */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1>Mon contenu au premier plan</h1>
        </div>
      </div>
    );
  }

  export default BackgroundYoutube;
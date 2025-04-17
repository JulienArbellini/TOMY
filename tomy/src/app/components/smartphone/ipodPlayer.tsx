import React from "react";
import PlaylistPlayer from "../SingularPlayers/MobilePlayer";

export default function IpodPlayer() {
  return (
    <div
      id="orientation-wrapper"
      className="w-screen h-screen flex flex-col items-center justify-center bg-[#d0d0d0] text-black"
    >
      {/* Écran iPod avec vidéo */}
      <div className="w-[300px] h-[200px] bg-black border border-black rounded mt-4 overflow-hidden">
        <PlaylistPlayer frameSrc="" tracks=""/>
        <video
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/dh3nxjopm/video/upload/v1744040002/r57kasb0gimyx2g127pb.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* Click wheel */}
      <div className="relative w-[200px] h-[200px] rounded-full bg-[#e0e0e0] mt-6">
        <button className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs">
          MENU
        </button>
        <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xl">
          ⏯
        </button>
        <button className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xl">
          ⏪
        </button>
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl">
          ⏩
        </button>
        <div className="absolute top-1/2 left-1/2 w-[60px] h-[60px] bg-[#d0d0d0] rounded-full border border-gray-400 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
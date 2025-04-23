// app/client-image-preload.tsx
"use client";
import { useEffect } from "react";

const preloadImages = [
  "Play", "PlayHover", "PlayClic", "Pause", "PauseHover", "PauseClic",
  "Next", "NextHover", "NextClic", "Previous", "PreviousHover", "PreviousClic",
  "VolumeUp", "VolumeUpHover", "VolumeUpClic",
  "VolumeDown", "VolumeDownHover", "VolumeDownClic",
  "Mute", "MuteHover", "MuteClic", "Shuffle", "ShuffleHover", "ShuffleClic",
  "Paysage", "PaysageHover", "PaysageClic", "Exit", "ExitHover", "ExitClic",
];

const fondsMobile = [
    "/VERSION_MOBILE/ELEMENTS/Fonds/AvionPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/CascadePixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/CityPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/CloudsPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/DesertPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/IslandPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/JapanesePixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/JunglePixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/PalmPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/PlantesPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/SablePixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/ScubaPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/SnowPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/SunsetPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/UnderwaterPixel.avif",
    "/VERSION_MOBILE/ELEMENTS/Fonds/Volcano1Pixel.avif"
];

const imageDesktop = [
    "/OPTIMIZED_PLAYER/Play.avif",
    "/OPTIMIZED_PLAYER/PlayHover.avif",
    "/OPTIMIZED_PLAYER/PlayClic.avif",
    "/OPTIMIZED_PLAYER/Pause.avif",
]

export default function ClientImagePreload() {
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipod|android.*mobile|windows phone/.test(ua);

    const imagesToPreload = isMobile ? [...preloadImages, ...fondsMobile] : imageDesktop;

    imagesToPreload.forEach((name) => {
      const img = new Image();
      img.src = name.startsWith("/")
        ? name
        : `/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/${name}.avif`;
    });
  }, []);

  return null;
}
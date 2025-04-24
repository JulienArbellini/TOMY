'use client'
import React, { useEffect, useState } from 'react'

const PreloadWrapper = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false)

  const mobileImages = [
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Play",
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PlayHover",
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PlayClic", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Pause", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PauseHover", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PauseClic",
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Next", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/NextHover", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/NextClic", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Previous", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PreviousHover", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PreviousClic",
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeUp", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeUpHover", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeUpClic",
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeDown", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeDownHover", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeDownClic",
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Mute", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/MuteHover", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/MuteClic", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Shuffle", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/ShuffleHover", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/ShuffleClic",
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Paysage", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PaysageHover", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PaysageClic", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Exit", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/ExitHover", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/ExitClic",
  
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
  ]
  
  const desktopImages = [
    "/OPTIMIZED_PLAYER/Play.avif",
    "/OPTIMIZED_PLAYER/PlayHover.avif",
    "/OPTIMIZED_PLAYER/PlayClic.avif",
    "/OPTIMIZED_PLAYER/Pause.avif",
    "/OPTIMIZED_PLAYER/PauseHover.avif",
    "/OPTIMIZED_PLAYER/PauseClic.avif",
    "/OPTIMIZED_PLAYER/Next.avif",
    "/OPTIMIZED_PLAYER/NextHover.avif",
    "/OPTIMIZED_PLAYER/NextClic.avif",
    "/OPTIMIZED_PLAYER/Previous.avif",
    "/OPTIMIZED_PLAYER/PreviousHover.avif",
    "/OPTIMIZED_PLAYER/PreviousClic.avif",
    "/OPTIMIZED_PLAYER/Exit.avif",
    "/OPTIMIZED_PLAYER/ExitHover.avif",
    "/OPTIMIZED_PLAYER/ExitClic.avif",
    "/vectors/ELEMENTS/Cadres/Cadre1.avif",
    "/vectors/ELEMENTS/Cadres/CadreBleu.avif",
    "/vectors/ELEMENTS/Cadres/CadreBois.avif",
    "/vectors/ELEMENTS/Cadres/CadrePlante.avif",
    "/vectors/ELEMENTS/Cadres/CadreSimple.avif",
    "/vectors/ELEMENTS/Cadres/CadreUltrasimple.avif",
    "/vectors/ELEMENTS/Cadres/CadreNoir.avif",
    "/vectors/ELEMENTS/Cadres/CadreSurfy.avif",
    "/vectors/ELEMENTS/Cadres/CadreEdgy.avif",
    "/vectors/ELEMENTS/Cadres/vitre.avif",
    "/vectors/ELEMENTS/Cadres/CadreMagazine.avif",
    "/vectors/ELEMENTS/Cadres/CadreMusique.webp",
    "/vectors/ELEMENTS/Cadres/FondTicket.avif",
    
    
  ]

  const isMobile = typeof window !== "undefined" &&
    /iphone|ipod|android.*mobile|windows phone/.test(navigator.userAgent.toLowerCase());

  const imagesToPreload = isMobile ? mobileImages : desktopImages;

  const preloadImages = (urls: string[], onComplete: () => void) => {
    let loaded = 0
    urls.forEach((url) => {
      const img = new Image()
      img.src = url
      img.onload = img.onerror = () => {
        loaded++
        if (loaded === urls.length) {
          onComplete()
        }
      }
    })
  }


  useEffect(() => {
    const handleLoad = () => {
      preloadImages(imagesToPreload, () => {
        setReady(true)
      })
    }

    if (document.readyState === 'complete') {
      // Si tout est déjà chargé (cache par ex.)
      handleLoad()
    } else {
      // Sinon, attendre le chargement complet de tout (images, fonts, iframes…)
      window.addEventListener('load', handleLoad)
    }

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (!ready) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]">
<img
        src="/loader.gif" // <-- ton GIF
        alt="Chargement..."
        className="w-45 h-45 object-contain"
      />
        <p className="mt-4 text-white text-xl font-semibold animate-pulse">
          Décollage imminent...
        </p>
      </div>
    )
  }

  return (
    <div className="animate-fadeIn">
      {children}
    </div>
  )
}

export default PreloadWrapper
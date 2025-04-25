'use client'
import React, { useEffect, useState } from 'react'

const PreloadWrapper = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false)

  const mobileImages = [
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Play",
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PlayClic", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Pause", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PauseClic",
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Next", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/NextClic", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Previous", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PreviousClic",
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeUp", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeUpClic",
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeDown", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeDownClic",
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Mute", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/MuteClic", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Shuffle", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/ShuffleClic",
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Paysage", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PaysageClic", 
    "/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Exit", 
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
    "/vectors/ELEMENTS/BoutonsPlayer/Play.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/PlayHover.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/PlayClic.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/Pause.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/PauseHover.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/PauseClic.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/Forward.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/ForwardHover.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/ForwardClic.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/Backwards.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/BackwardsHover.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/BackwardsClic.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/Exit.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif",
    "/vectors/ELEMENTS/BoutonsPlayer/ExitClic.avif",
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
        className="w-32 h-32 object-contain"
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
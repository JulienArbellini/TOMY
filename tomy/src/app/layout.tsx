import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientImagePreload from "./client-image-preload";
import Preloader from './Preloader';
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"





const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Tomy Airlines',
  description: 'Welcome to Tomy Airlines',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  return (
    <html lang="en">
            <head>
        {/* Ajoutez les liens de préchargement ici */}

        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"></meta>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Play.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PlayClic.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Pause.avif"media="(max-width: 48rem)" />
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PauseClic.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Next.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/NextClic.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Previous.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PreviousClic.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeUp.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeUpClic.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeDown.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/VolumeDownClic.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Mute.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/MuteClic.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Shuffle.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/ShuffleClic.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/Paysage.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Boutons/TOUT/PaysageClic.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/TopEcran.avif" media="(max-width: 48rem)"/>
        <link rel="preload" as="image" href="/VERSION_MOBILE/ELEMENTS/Fonds/AvionPixel.avif" media="(max-width: 48rem)"/>


        <link rel="preload" as="image" href="/vectors/ELEMENTS/BoutonsPlayer/Play.avif"          media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/BoutonsPlayer/PlayHover.avif"     media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/BoutonsPlayer/PlayClic.avif"      media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/BoutonsPlayer/Pause.avif"         media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/BoutonsPlayer/PauseHover.avif"    media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/BoutonsPlayer/PauseClic.avif"     media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/BoutonsPlayer/Forward.avif"       media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/BoutonsPlayer/ForwardHover.avif"  media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/BoutonsPlayer/ForwardClic.avif"   media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/BoutonsPlayer/Backwards.avif"     media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/BoutonsPlayer/BackwardsHover.avif" media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/BoutonsPlayer/BackwardsClic.avif" media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/BoutonsPlayer/Exit.avif"          media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif"     media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/BoutonsPlayer/ExitClic.avif"      media="(min-width: 48rem)" />

        <link rel="preload" as="image" href="/vectors/ELEMENTS/Cadres/Cadre1.avif"               media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/Cadres/CadreBleu.avif"           media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/Cadres/CadreBois.avif"           media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/Cadres/CadrePlante.avif"         media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/Cadres/CadreSimple.avif"         media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/Cadres/CadreUltrasimple.avif"    media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/Cadres/CadreNoir.avif"           media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/Cadres/CadreSurfy.avif"          media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/Cadres/CadreEdgy.avif"           media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/Cadres/vitre.avif"               media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/Cadres/CadreMagazine.avif"       media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/Cadres/CadreMusique.webp"        media="(min-width: 48rem)" />
        <link rel="preload" as="image" href="/vectors/ELEMENTS/Cadres/FondTicket.avif"          media="(min-width: 48rem)" />

      
        {/* Ajoutez toutes les autres images critiques */}
      </head>
      <body className={inter.className}>
      <Toaster position="top-left" reverseOrder={false} />
      {/* <PreloadWrapper> */}
      <Preloader>{children}</Preloader>
        <SpeedInsights/>
        <Analytics/>
        </body>
    </html>
  )
}

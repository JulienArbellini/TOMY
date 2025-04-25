import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientImagePreload from "./client-image-preload";
import PreloadWrapper from './preloadWrapper';
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

        

      
        {/* Ajoutez toutes les autres images critiques */}
      </head>
      <body className={inter.className}>
      <Toaster position="top-left" reverseOrder={false} />
      {/* <PreloadWrapper> */}
      <PreloadWrapper>{children}</PreloadWrapper>
        <SpeedInsights/>
        <Analytics/>
        </body>
    </html>
  )
}

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const preloadImages = [
  "Play",
  "PlayHover",
  "PlayClic",
  "Pause",
  "PauseHover",
  "PauseClic",
  "Next",
  "NextHover",
  "NextClic",
  "Previous",
  "PreviousHover",
  "PreviousClic",
  "VolumeUp",
  "VolumeUpHover",
  "VolumeUpClic",
  "VolumeDown",
  "VolumeDownHover",
  "VolumeDownClic",
  "Mute",
  "MuteHover",
  "MuteClic",
  "Shuffle",
  "ShuffleHover",
  "ShuffleClic",
  "Paysage",
  "PaysageHover",
  "PaysageClic",
  "Exit",
  "ExitHover",
  "ExitClic",
];



const preloadLinks = preloadImages.map((name) => (
  <link
    key={name}
    rel="preload"
    href={`/VESION_MOBILE/ELEMENTS/Boutons/TOUT/${name}.avif`}
    as="image"
    type="image/avif"
  />
));

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
        <link
          rel="preload"
          href="/OPTIMIZED_PLAYER/Play.avif"
          as="image"
          type="image/avif"
        />
        <link
          rel="preload"
          href="/OPTIMIZED_PLAYER/PlayHover.avif"
          as="image"
          type="image/avif"
        />
        <link
          rel="preload"
          href="/OPTIMIZED_PLAYER/PlayClic.avif"
          as="image"
          type="image/avif"
        />
        <link
          rel="preload"
          href="/OPTIMIZED_PLAYER/Pause.avif"
          as="image"
          type="image/avif"
        />
        {preloadLinks}
        {/* Ajoutez toutes les autres images critiques */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

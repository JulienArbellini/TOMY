import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientImagePreload from "./client-image-preload";
import PreloadWrapper from './preloadWrapper';
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from "@vercel/speed-insights/next"



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
      
        {/* Ajoutez toutes les autres images critiques */}
      </head>
      <body className={inter.className}>
      <Toaster position="top-left" reverseOrder={false} />
      <PreloadWrapper>
        {children}
        </PreloadWrapper>
        <SpeedInsights/>
        </body>
    </html>
  )
}

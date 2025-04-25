"use client";

// app/loading-screen.tsx
// Splash screen plein-écran affiché pendant le pré‑chargement des images critiques
// -------------------------------------------------------------
// • TailwindCSS pour la mise en page
// • SVG animé (spinner) 100 % CSS — aucun asset externe
// -------------------------------------------------------------

import { motion } from "framer-motion";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]">
  <img
          src="/loader.gif" // <-- ton GIF
          alt="Chargement..."
          className="w-32 h-32 object-contain"
        />
          <p className="mt-4 text-white text-xl  animate-pulse font-mono ">
            Décollage imminent
          </p>
        </div>
      )
}

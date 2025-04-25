'use client';

import { useEffect, useState } from 'react';
import LoadingScreen from './loading-screen';

export default function Preloader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Récupère TOUS les <link rel="preload" as="image"> présents dans le <head>
    const links = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel="preload"][as="image"]'),
    ).filter((l) => {
      // Vérifie si la media-query est vraie (ou inexistante)
      return !l.media || window.matchMedia(l.media).matches;
    });

    if (links.length === 0) {
      setReady(true);
      return;
    }

    Promise.all(
      links.map(
        (link) =>
          new Promise<void>((resolve) => {
            // S’il est déjà terminé (grâce au preload), resolve immédiatement
            if (performance.getEntriesByName(link.href).length) {
              resolve();
            } else {
              const img = new Image();
              img.src = link.href;
              img.onload = () => resolve();
              img.onerror = () => resolve(); // ne bloque pas si erreur
            }
          }),
      ),
    )
      // Timeout de sécurité de 6 s
      .then(() => setReady(true));
  }, []);

  if (!ready) return <LoadingScreen />;
  return <>{children}</>;
}
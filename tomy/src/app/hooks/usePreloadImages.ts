import { useEffect } from "react";

export const usePreloadImages = (imageUrls: string[]) => {
  useEffect(() => {
    const imageElements = imageUrls.map((url) => {
      const img = new Image();
      img.src = url;
      return img;
    });

    // Cleanup si nécessaire
    return () => {
      imageElements.forEach((img) => (img.src = ""));
    };
  }, [imageUrls]);
};
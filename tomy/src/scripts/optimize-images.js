const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Chemin des images source et optimisées
const inputDir = path.join(__dirname, '../../public/ICONES'); // Répertoire source des images
const outputDir = path.join(__dirname, '../../public/OPTIMIZED_ICONES'); // Répertoire cible

// Créer le dossier cible si nécessaire
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Fonction pour convertir les images
const optimizeImages = async () => {
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    const inputFilePath = path.join(inputDir, file);
    const outputFilePathWebP = path.join(outputDir, `${path.parse(file).name}.webp`);
    const outputFilePathAvif = path.join(outputDir, `${path.parse(file).name}.avif`);

    // Ignorer les fichiers non images
    if (!/\.(jpe?g|png|gif)$/i.test(file)) continue;

    try {
      // Convertir en WebP
      await sharp(inputFilePath)
        .webp({ quality: 80 })
        .toFile(outputFilePathWebP);

      // Convertir en AVIF
      await sharp(inputFilePath)
        .avif({ quality: 50 })
        .toFile(outputFilePathAvif);

      console.log(`Optimized ${file} to WebP and AVIF`);
    } catch (err) {
      console.error(`Error optimizing ${file}:`, err);
    }
  }
};

optimizeImages();
// items.ts

export const items = [
  {
    name: "MOVIES",
    type: "MOVIES",
    playerConfig: {
      type: "video",
      src: "eX9Blu2hDm4",
      frameType: "cadre1",
      autoplay: false,
      loop: false,
      controls: true,
    },
  },
  {
    name: "Music",
    type: "Music",
    playerConfig: {
      type: "audio",
      tracks: [
        { src: "/Album/V3/Pop.wav", title: "Pop" },
        { src: "/Album/V3/FlightFeelingAcoustic.wav", title: "Flight Feeling Accoustic" },
        { src: "/Album/V3/OceanInstrumental.wav", title: "Ocean Instrumental" },
        { src: "/Album/V3/KissOrganic.wav", title: "Kiss Accoustic" },
        { src: "/Album/V3/BlueGlass.wav", title: "Blue Glass" },
        { src: "/Album/V3/Unelongueplageavecdesvagues.wav", title: "Une longue plage avec des vagues" },
        { src: "/Album/V3/Bombay.wav", title: "Bombay" },
        { src: "/Album/V3/TomyAirlinesTheme.wav", title: "TomyAirlines Theme" },
      ],
      frameType: "musique",
      autoplay: false,
      controls: true,
      extraContent: {
        text: "Titre de la musique",
        image: "/images/album-cover.jpg",
      },
    },
    //retablir l'affichage du titre 
  },
  {
    name: "TomyIsland",
    type: "TomyIsland",
    playerConfig: {
      type: "video",
      src: "E_nzu6AtYPk",
      frameType: "bleu",
      autoplay: false,
      loop: false,
      controls: true,
    },
  },
  {
    name: "TomyMag",
    type: "TomyMag",
    playerConfig: {
      type: "diaporama",
      images: [
        "/images/magazine/01_TomyMagOpening.avif",
        "/images/magazine/02_02SmithPage1.avif",
        "/images/magazine/02_02SmithPage2.avif",
        "/images/magazine/02_02SmithPage3.avif",
        "/images/magazine/02_02SmithPage4.avif",
        "/images/magazine/02_02SmithPage5.avif",
        "/images/magazine/02_02SmithPage6.avif",
        "/images/magazine/02_02SmithPage7.avif",
        "/images/magazine/02_02SmithPage8.avif",
        "/images/magazine/02_02SmithPage9.avif",
        "/images/magazine/02_02SmithPage10.avif",
        "/images/magazine/02_02SmithPage12.avif",
        "/images/magazine/02_02SmithPage13.avif",
        "/images/magazine/02_02SmithPage14.avif",
        "/images/magazine/02_02SmithPage15.avif",
        "/images/magazine/02_02SmithPage16.avif",
        "/images/magazine/03_TomyCan.avif",
        "/images/magazine/04_Souvenirs1.avif",
        "/images/magazine/04_Souvenirs2.avif",
        "/images/magazine/04_Souvenirs3.avif",
        "/images/magazine/04_Souvenirs4.avif",
        "/images/magazine/04_Souvenirs5.avif",
        "/images/magazine/05_LesFugitifsduCiel.avif",
        "/images/magazine/06_LifeAd.avif",
        "/images/magazine/07_LesVitesses.avif"
    ],
      frameType: "magazine",
      controls: true,
    },
  },
  {
    name: "PlaneMap",
    type: "PlaneMap",
    playerConfig: {
      type: "video",
      src: "RS2jNCqCjPs",
      frameType: "bleu",
      autoplay: false,
      loop: false,
      controls: true,
    },
  },
  {
    name: "MAP",
    type: "MAP",
    playerConfig: {
      type: "video-automatique",
      src: "8Weh3T-fVoU",
      frameType: "edgy",
      autoplay: false,
      loop: false,
      controls: true,
    },
  },
  {
    name: "Hermes",
    type: "Hermes",
    playerConfig: {
      type: "Hermes",
      action: "ticketForm",
      frameType: "bois",
      // Formulaire avec placeholders et envoi d'email
    },
  },
  {
    name: "Relaxation",
    type: "Relaxation",
    playerConfig: {
      type: "mixed",
      images: [
        "/images/content/Relax/NowRelax.avif",
        "/images/content/Relax/Haiku.avif",
      ],
      videos:[
        "O27u1vVE0SQ",
        "PDy9SqFSHq4",
      ],
      media: [
        { type: "image", src: "/images/relax/NowRelax.png" },
        { type: "video", src: "O27u1vVE0SQ" },
        { type: "image", src: "/images/content/Relax/Haiku.avif" },
        { type: "video", src: "PDy9SqFSHq4" },
      ],
      frameType: "edgy",
      videoAutoplay: true,
      videoControls: false,
      // Affichage conditionnel entre images et vidéo
    },
  },
  {
    name: "GAMEr-Manette",
    type: "GAMEr-Manette",
    playerConfig: {
      type: "game",
      src: "https://jeu-tomyairlines.vercel.app/",
      frameType: "ultrasimple",
    },
  },
];
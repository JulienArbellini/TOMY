// items.ts

export const items = [
  {
    name: "MOVIES",
    type: "MOVIES",
    playerConfig: {
      type: "video",
      src: "DM930C8mnhU",
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
        { src: "/Album/V2/Pop.wav", title: "Pop" },
        { src: "/Album/V2/FlightFeelingAcoustic.wav", title: "Flight Feeling Accoustic" },
        { src: "/Album/V2/OceanInstrumental.wav", title: "Ocean Instrumental" },
        { src: "/Album/V2/KissOrganic.wav", title: "Kiss Accoustic" },
        { src: "/Album/V2/BlueGlass.wav", title: "Blue Glass" },
        { src: "/Album/V2/Unelongueplageavecdesvagues.wav", title: "Une longue plage avec des vagues" },
        { src: "/Album/V2/Bombay.wav", title: "Bombay" },
        { src: "/Album/V2/TomyAirlinesTheme.wav", title: "TomyAirlines Theme" },
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
      src: "kuWYuD7Phi4",
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
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/01_TomyMagOpening.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/02_02SmithPage1.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/02_02SmithPage2.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/02_02SmithPage3.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/02_02SmithPage4.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/02_02SmithPage5.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/02_02SmithPage6.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/02_02SmithPage7.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/02_02SmithPage8.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/02_02SmithPage9.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/02_02SmithPage10.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/02_02SmithPage12.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/02_02SmithPage13.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/02_02SmithPage14.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/02_02SmithPage15.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/02_02SmithPage16.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/03_TomyCan.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/04_Souvenirs1.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/04_Souvenirs2.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/04_Souvenirs3.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/04_Souvenirs4.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/04_Souvenirs5.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/05_LesFugitifsduCiel.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1739898847/06_LifeAd.png",
        "https://res.cloudinary.com/dh3nxjopm/image/upload/v1740851327/07_LesVitesses_pk21xj.avif"
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
        { type: "image", src: "https://res.cloudinary.com/dh3nxjopm/image/upload/v1740937199/mmck4s2rfckv67alfbpq.png" },
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
      src: "https://tomy-jeu.vercel.app/",
      frameType: "ultrasimple",
    },
  },
];
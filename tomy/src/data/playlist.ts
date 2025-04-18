export const playlist = [
    {
      name: "Music",
      type: "Music",
      playerConfig: {
        type: "audio", // Peut rester "audio", ou être renommé plus tard en "media"
        tracks: [
          { src: "/Album/V2/Pop.wav", title: "Pop", type: "audio" },
          { src: "/Album/V2/FlightFeelingAcoustic.wav", title: "Flight Feeling Accoustic", type: "audio" },
          { src: "/Album/V2/OceanInstrumental.wav", title: "Ocean Instrumental", type: "audio" },
          { src: "/Album/V2/KissOrganic.wav", title: "Kiss Accoustic", type: "audio" },
          { src: "/Album/V2/BlueGlass.wav", title: "Blue Glass", type: "audio" },
          { src: "/Album/V2/Unelongueplageavecdesvagues.wav", title: "Une longue plage avec des vagues", type: "audio" },
          { src: "/Album/V2/Bombay.wav", title: "Bombay", type: "audio" },
          { src: "/Album/V2/TomyAirlinesTheme.wav", title: "TomyAirlines Theme", type: "audio" },
          { type: "video", src: "DM930C8mnhU", title: "Une vidéo YouTube" },
        ],
        frameType: "musique",
        autoplay: false,
        controls: true,
        extraContent: {
          text: "Titre de la musique",
          image: "/images/album-cover.jpg",
        },
      },
    },
  ];
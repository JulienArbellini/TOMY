import { PlaylistItem } from "./types";

export const playlist: PlaylistItem[] = [ 
    {
      name: "Music",
      type: "Music",
      playerConfig: {
        type: "media", // Peut rester "audio", ou être renommé plus tard en "media"
        tracks: [
          { type: "video", src: "ArWxU2vPT_4", title: "Intro" },
          { type: "video", src: "eX9Blu2hDm4", title: "Flight Feeling (film)" },
          { type: "video", src: "E_nzu6AtYPk", title: "Ocean" },
          { type: "video", src: "jQZPmkoKuW0", title: "Airport Vigilance" },
          { type: "video", src: "NTAHlBU2E2c", title: "Kiss" },
          { src: "/Album/V2/Pop.wav", title: "Pop", type: "audio" },
           { type: "video", src: "VlG7InE4VvU", title: "Sparkling Water" },
           { type: "video", src: "UVITbxfdMw0", title: "La Terre" },
           { type: "video", src: "N579vRZfAGs", title: "Apollo" },
           { type: "video", src: "ws3NOU4dO20", title: "DJ" },
           { type: "video", src: "WlEKsFBEXkA", title: "Nebulosus" },
           { type: "video", src: "IuLu7Y-72pk", title: "Seraphim" },
           { type: "video", src: "kiGaIWaiPX4", title: "Bourdon" },
           { src: "/Album/V2/Unelongueplageavecdesvagues.wav", title: "Une longue plage avec des vagues", type: "audio" },
           { type: "video", src: "swhQF5DWmMU", title: "Cerf-Volant" },
           { src: "/Album/V2/FlightFeelingAcoustic.wav", title: "Flight Feeling Accoustic", type: "audio" },
           { type: "video", src: "iSqn03p7wDM", title: "Tomy Airlounge" },
        ],
      },
    },
  ];
export const playlist = [
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
    }
];
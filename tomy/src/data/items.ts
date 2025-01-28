// items.ts

export const items = [
    {
      name: "AirLounge",
      type: "AirLounge",
      playerConfig: {
        type: "video",
        src: "https://www.youtube.com/embed/RS2jNCqCjPs?enablejsapi=1&autoplay=1&mute=1",
        frameType: "ultrasimple",
        autoplay: true,
        loop: false,
        controls: false,
        extraButton: "exitButton",
      },
    },
    {
      name: "Brace",
      type: "Brace",
      playerConfig: {
        type: "interactive",
        action: "hoverNote",
        frameType: "simple",
        // Associe la souris avec une note au survol
      },
    },
    {
      name: "Cigarette",
      type: "Cigarette",
      playerConfig: {
        type: "video",
        src: "https://www.youtube.com/embed/RS2jNCqCjPs?enablejsapi=1&autoplay=1&mute=1",
        frameType: "cadre1",
        autoplay: false,
        loop: false,
        controls: true,
      },
    },
    {
      name: "Cockpit",
      type: "Cockpit",
      playerConfig: {
        type: "video",
        src: "https://www.youtube.com/embed/RS2jNCqCjPs?enablejsapi=1&autoplay=1&mute=1",
        frameType: "edgy",
        autoplay: true,
        loop: true,
        controls: false,
      },
    },
    {
      name: "Connect",
      type: "Connect",
      playerConfig: {
        type: "video",
        src: "https://www.youtube.com/embed/RS2jNCqCjPs?enablejsapi=1&autoplay=1&mute=1",
        frameType: "cadre1",
        autoplay: true,
        loop: false,
        controls: true,
      },
    },
    {
      name: "Crew",
      type: "Crew",
      playerConfig: {
        type: "diaporama",
        images: [
          "/images/content/Crew1.avif",
          "/images/content/Crew2.avif",
          "/images/content/Crew3.avif",
          "/images/content/Crew4.avif",
        ],
        frameType: "simple",
        controls: true,
      },
    },
    {
      name: "Cuisine",
      type: "Cuisine",
      playerConfig: {
        type: "custom",
        frameType: "simple",
        // Contenu spécifique à définir
      },
    },
    {
      name: "DJ",
      type: "DJ",
      playerConfig: {
        type: "video",
        src: "https://www.youtube.com/embed/RS2jNCqCjPs?enablejsapi=1&autoplay=1&mute=1",
        frameType: "surfy",
        autoplay: true,
        loop: true,
        controls: false,
      },
    },
    {
      name: "Game",
      type: "Game",
      playerConfig: {
        type: "game",
        src: "/games/my-game.html",
        frameType: "ultrasimple",
      },
    },
    {
      name: "GAMEr-Manette",
      type: "GAMEr-Manette",
      playerConfig: {
        type: "game",
        src: "/games/another-game.html",
        frameType: "ultrasimple",
      },
    },
    {
      name: "Gourou",
      type: "Gourou",
      playerConfig: {
        type: "interactive",
        action: "randomAdvice",
        frameType: "simple",
        // Affiche une bulle avec un conseil aléatoire
      },
      advice: [
        "Il faut battre le frère tant qu'il est chauve",
        "On ne fait pas d'omelette sans casser du vieux",
        "Qui vole un œuf, tue un keuf",
        "C'est au pied du mur qu'on voit le mieux le mur",
        "Il ne faut pas vendre la peau de l'ours... non, il ne faut pas",
        "Scavenger Reeeeeeigns",
        "Détail",
        "...",
        "Saluheeeeu ... ça fart ?",
        "Adelie ? Psychopathe ??? (cqfd)"
      ],
    },
    {
      name: "Hermes",
      type: "Hermes",
      playerConfig: {
        type: "interactive",
        action: "ticketForm",
        frameType: "simple",
        // Formulaire avec placeholders et envoi d'email
      },
    },
    {
      name: "Hotesse",
      type: "Hotesse",
      playerConfig: {
        type: "video",
        src: "https://www.youtube.com/embed/RS2jNCqCjPs?enablejsapi=1&autoplay=1&mute=1",
        frameType: "cadre1",
        autoplay: false,
        loop: false,
        controls: true,
      },
    },
    {
      name: "Hublot",
      type: "Hublot",
      playerConfig: {
        type: "video",
        src: "/videos/hublot.mp4",
        frameType: "ultrasimple",
        autoplay: true,
        loop: true,
        controls: false,
      },
    },
    {
      name: "Kiss",
      type: "Kiss",
      playerConfig: {
        type: "reference",
        referenceType: "Hublot",
        // Se réfère au même contenu que "Hublot"
      },
    },
    {
      name: "Lit",
      type: "Lit",
      playerConfig: {
        type: "video",
        src: "/videos/lit.mp4",
        frameType: "cadre1",
        autoplay: false,
        loop: false,
        controls: true,
      },
    },
    {
      name: "MAP",
      type: "MAP",
      playerConfig: {
        type: "video",
        src: "https://www.youtube.com/embed/RS2jNCqCjPs?enablejsapi=1&autoplay=1&mute=1",
        frameType: "ultrasimple",
        autoplay: true,
        loop: true,
        controls: false,
      },
    },
    {
      name: "METEO",
      type: "METEO",
      playerConfig: {
        type: "custom",
        frameType: "ultrasimple",
        // Intégration d'une API météo possible
      },
    },
    {
      name: "Machines",
      type: "Machines",
      playerConfig: {
        type: "custom",
        images: [
          "/images/machine1.jpg",
          // Ajoutez d'autres images
        ],
        videos: [
          "/videos/machine1.mp4",
          // Ajoutez d'autres vidéos
        ],
        frameType: "bois",
        autoplay: true,
        controls: true,
        // Affichage conditionnel selon le média
      },
    },
    {
      name: "Magazine",
      type: "Magazine",
      playerConfig: {
        type: "diaporama",
        images: [
          "/images/magazine1.jpg",
          "/images/magazine2.jpg",
          // Ajoutez d'autres images
        ],
        frameType: "magazine",
        controls: true,
      },
    },
    {
      name: "Movie-watching",
      type: "Movie-watching",
      playerConfig: {
        type: "video",
        src: "/videos/movie-watching.mp4",
        frameType: "ultrasimple",
        autoplay: false,
        loop: false,
        controls: true,
      },
    },
    {
      name: "MOVIES",
      type: "MOVIES",
      playerConfig: {
        type: "video",
        src: "/videos/movies.mp4",
        frameType: "ultrasimple",
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
          { src: "/Album/01_Tomyairlines.wav", title: "Tomyairlines" },
          { src: "/Album/02_Hublot_VX.wav", title: "Hublot VX" },
          { src: "/Album/03_Ocean.wav", title: "Ocean" },
          { src: "/Album/04_Mid interlude.wav", title: "Mid Interlude" },
          { src: "/Album/05_Kiss.wav", title: "Kiss" },
          { src: "/Album/06_Pop.wav", title: "Pop" },
          { src: "/Album/06,5_fly&party.wav", title: "Fly & Party" },
          { src: "/Album/07_LaTerre.wav", title: "La Terre" },
          { src: "/Album/08_Nebulosus_VX.wav", title: "Nebulosus VX" },
          { src: "/Album/09_Seraphim Silver Y.wav", title: "Seraphim Silver Y" },
          { src: "/Album/10_thefinalfight.wav", title: "The Final Fight" },
          { src: "/Album/11_Bourdon 2.wav", title: "Bourdon 2" },
          { src: "/Album/12_Une longue plage avec des vagues V2.wav", title: "Une longue plage avec des vagues V2" },
          { src: "/Album/13_Mission Tomy.wav", title: "Mission Tomy" },
          { src: "/Album/14_Flight Feeling reprise.m4a", title: "Flight Feeling Reprise" },
          { src: "/Album/Bombay.wav", title: "Bombay" },
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
    {
      name: "Music-boy",
      type: "Music-boy",
      playerConfig: {
        type: "audio",
        src: "/Album/another-song.wav",
        frameType: "musique",
        autoplay: false,
        controls: true,
        extraContent: {
          text: "Titre de la musique",
          image: "/images/another-album-cover.jpg",
        },
      },
    },
    {
      name: "OIseaux",
      type: "OIseaux",
      playerConfig: {
        type: "video",
        src: "/videos/oiseaux.mp4",
        frameType: "surfy",
        autoplay: true,
        loop: true,
        controls: false,
      },
    },
    {
      name: "Relax",
      type: "Relax",
      playerConfig: {
        type: "mixed",
        images: [
          "/images/content/Crew1.avif",
          "/images/content/Crew2.avif",
          "/images/content/Crew3.avif",
          "/images/content/Crew4.avif",
        ],
        frameType: "plante",
        videoSrc: "https://www.youtube.com/embed/RS2jNCqCjPs?enablejsapi=1&autoplay=1&mute=1",
        videoAutoplay: true,
        videoControls: false,
        // Affichage conditionnel entre images et vidéo
      },
    },
    {
      name: "Serre",
      type: "Serre",
      playerConfig: {
        type: "video",
        src: "/videos/serre.mp4",
        frameType: "ultrasimple",
        autoplay: true,
        loop: true,
        controls: false,
      },
    },
    {
      name: "Shop",
      type: "Shop",
      playerConfig: {
        type: "diaporama",
        images: [
          "/images/shop1.jpg",
          "/images/shop2.jpg",
          // Ajoutez d'autres images
        ],
        frameType: "edgy",
        controls: true,
        extraButton: "orderButton",
      },
    },
    {
      name: "Terrasse",
      type: "Terrasse",
      playerConfig: {
        type: "custom",
        frameType: "ultrasimple",
        // Contenu spécifique à définir
      },
    },
    {
      name: "Telephone",
      type: "Telephone",
      playerConfig: {
        type: "interactive",
        action: "playSound",
        soundSrc: "/sounds/jingle.mp3",
        animation: "buttonAnimation",
      },
    },
    {
      name: "Tomy-Island",
      type: "Tomy-Island",
      playerConfig: {
        type: "video",
        src: "/videos/tomy-island.mp4",
        frameType: "cadre1",
        autoplay: false,
        loop: false,
        controls: true,
      },
    },
    {
      name: "Valise",
      type: "Valise",
      playerConfig: {
        type: "video",
        src: "/videos/valise.mp4",
        frameType: "cadre1",
        autoplay: false,
        loop: false,
        controls: true,
      },
    },
  ];
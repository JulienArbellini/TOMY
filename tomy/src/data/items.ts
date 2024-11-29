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
          "/images/crew1.jpg",
          "/images/crew2.jpg",
          // Ajoutez d'autres images si nécessaire
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
      name: "Hôtesse",
      type: "Hôtesse",
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
        type: "diaporama",
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
        src: "/Album/02_Hublot_VX.wav",
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
        type: "diaporama",
        images: [
          "/images/relax1.jpg",
          "/images/relax2.jpg",
          // Ajoutez d'autres images
        ],
        frameType: "simple",
        videoSrc: "/videos/relax.mp4",
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
      name: "Téléphone",
      type: "Téléphone",
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
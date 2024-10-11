// import React, { useEffect, useRef, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlay, faPause, faExpand } from '@fortawesome/free-solid-svg-icons';
// import { disconnect } from 'process';

// interface CustomVideoPlayerProps {
//   src: string;
//   width?: string;
//   height?: string;
//   containerWidth?: string;
//   containerHeight?: string;
// }

// const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
//   src,
//   width = '100%',
//   height = '200%', // Augmenter la hauteur pour cacher les contrôles YouTube
//   containerWidth = '100%',
//   containerHeight = '90%'
// }) => {
//   const iframeRef = useRef<HTMLIFrameElement | null>(null);
//   const [isPlaying, setIsPlaying] = useState(true);

//   useEffect(() => {
//     const handleIframeLoad = () => {
//       const iframe = iframeRef.current;
//       const player = iframe?.contentWindow;

//       if (player) {
//         player.postMessage(
//           '{"event":"command","func":"playVideo","args":""}',
//           '*'
//         );
//       }
//     };

//     const iframe = iframeRef.current;
//     if (iframe) {
//       iframe.addEventListener('load', handleIframeLoad);
//     }

//     return () => {
//       if (iframe) {
//         iframe.removeEventListener('load', handleIframeLoad);
//       }
//     };
//   }, []);

//   const handlePlayPause = () => {
//     const iframe = iframeRef.current;
//     const player = iframe?.contentWindow;

//     if (player) {
//       player.postMessage(
//         '{"event":"command","func":"' + (isPlaying ? 'pauseVideo' : 'playVideo') + '","args":""}',
//         '*'
//       );
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const handleFullscreen = () => {
//     const iframe = iframeRef.current;
//     if (iframe) {
//       if (iframe.requestFullscreen) {
//         iframe.requestFullscreen();
//       } else if (iframe.mozRequestFullScreen) { /* Firefox */
//         iframe.mozRequestFullScreen();
//       } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
//         iframe.webkitRequestFullscreen();
//       } else if (iframe.msRequestFullscreen) { /* IE/Edge */
//         iframe.msRequestFullscreen();
//       }
//     }
//   };

//   return (
//     <div className='w-full h-full flex flex-col '>
//       <div className="flex flex-col" style={{ width: containerWidth, height: containerHeight }}> 
//         <div className="flex justify-center items-center w-full h-full overflow-hidden">
//           <iframe
//             id="yt-player"
//             ref={iframeRef}
//             src={`${src}?enablejsapi=1&modestbranding=1&showinfo=0&controls=0&autoplay=1`}
//             width={width}
//             height={height}
//             frameBorder="0"
//             allow="autoplay; encrypted-media"
//             allowFullScreen
//           ></iframe>
//         </div>
//       </div>
//       <div className="flex justify-center items-center space-x-4 p-4 bg-black w-full h-[10%]">
//         <button onClick={handlePlayPause} className="bg-transparent text-white p-2 rounded-lg">
//           <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
//         </button>
//         <button onClick={handleFullscreen} className="bg-transparent text-white p-2 rounded-lg">
//           <FontAwesomeIcon icon={faExpand} />
//         </button>
//       </div>
//     </div>
    
//   );
// };

// export default CustomVideoPlayer;

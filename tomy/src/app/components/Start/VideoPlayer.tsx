"use client";

import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';

export default function VideoPlayer() {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <ReactPlayer
        url="video/Bourdon.mp4"
        playing
        loop
        muted
        width="100%"
        height="100%"
        className="object-cover"
      />
    </motion.div>
  );
}

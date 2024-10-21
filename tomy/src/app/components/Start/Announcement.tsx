"use client";

import { motion } from 'framer-motion';

interface AnnouncementProps {
  fadeOut: boolean;
}

export default function Announcement({ fadeOut }: AnnouncementProps) {
  return (
    <motion.div
      className={`w-[588px] h-[88px] flex justify-center items-center bg-slate-300 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="bg-black text-white p-2 rounded-lg h-full w-full text-6xl flex justify-center items-center">
        <p>ANNOUNCEMENT</p>
      </div>
    </motion.div>
  );
}

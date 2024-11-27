"use client";

interface AnnouncementProps {
}

export default function Announcement({}: AnnouncementProps) {
  return (
      <div className="w-[588px] h-[88px] flex justify-center items-center bg-slate-300">
        <div className="bg-black text-white p-2  h-full w-full text-6xl flex justify-center items-center font-mono">
          <p>ANNOUNCEMENT</p>
        </div>
      </div>
  );
}

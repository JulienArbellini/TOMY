"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// Import direct de l’effet clouds
import CLOUDS from "vanta/dist/vanta.clouds.min";

const Background = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaEffect && typeof window !== "undefined") {
      setVantaEffect(
        CLOUDS({
          el: vantaRef.current,
          THREE,
          mouseControls: false,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          skyColor: 0x68b8d7,
          cloudColor: 0xd9d9d9,
          cloudShadowColor: 0x9797bb,
          sunColor: 0xff9919,
          sunGlareColor: 0xe8e8e8,
          sunlightColor: 0xfafafa,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="w-full h-screen fixed top-0 left-0 -z-10 opacity-0"></div>;
};

export default Background;
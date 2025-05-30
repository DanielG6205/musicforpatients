'use client';

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInitializer() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      offset: 5,  
      easing: 'ease-out', 
      once: true,
    });
  }, []);

  return null;
}

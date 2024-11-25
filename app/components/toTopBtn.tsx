"use client";

import { useState, useEffect } from 'react';

interface classProps {
  className: string | undefined;
}

const ToTopBtn: React.FC<classProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const main = document.getElementById("main");

    main?.addEventListener("scroll", () => {
      if (main.scrollTop > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    const mainCon = document.getElementById("mainCon")

    mainCon?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <div id="toTop" className={`${className} ${isVisible ? "show" : ""}`} onClick={scrollToTop}>
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="m13 19c0 .5523-.4477 1-1 1s-1-.4477-1-1v-11.58579l-4.29289 4.29289c-.39053.3905-1.02369.3905-1.41422 0-.39052-.3905-.39052-1.0237 0-1.4142l6.00001-6.00001c.3905-.39052 1.0237-.39052 1.4142 0l6 6.00001c.3905.3905.3905 1.0237 0 1.4142s-1.0237.3905-1.4142 0l-4.2929-4.29289z" fill="currentcolor"/>
      </svg>
    </div>
  )
}

export default ToTopBtn;

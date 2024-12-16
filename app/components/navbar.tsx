"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const base = pathname === "/";
  const events = pathname === "/events";
  const ranking = pathname === "/ranking";
  const store = pathname === "/store";

  const trigHapticFdb = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }
  };

  return (
    <div className="navrow">
      <Link
        href="/"
        className={`lnk border-solid border-r border-[#2D2D2D] ${base ? "actlnk" : ""}`}
        onClick={trigHapticFdb}
      >
        Base
      </Link>
      <Link
        href="/events"
        className={`lnk border-solid border-r border-[#2D2D2D] ${events ? "actlnk" : ""}`}
        onClick={trigHapticFdb}
      >
        Events
      </Link>
      <Link
        href="/store"
        className={`lnk border-solid border-r border-[#2D2D2D] ${store ? "actlnk" : ""}`}
        onClick={trigHapticFdb}
      >
        Store
      </Link>
      <Link
        href="/ranking"
        className={`lnk ${ranking ? "actlnk" : ""}`}
        onClick={trigHapticFdb}
      >
        Ranking
      </Link>
    </div>
  );
};

export default Navbar;

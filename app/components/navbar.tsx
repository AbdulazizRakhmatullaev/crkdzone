"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const base = pathname === "/";
  const missions = pathname === "/missions";
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
        href="/missions"
        className={`lnk border-solid border-r border-[#2D2D2D] ${missions ? "actlnk" : ""}`}
        onClick={trigHapticFdb}
      >
        Missions
      </Link>
      <Link
        href="/ranking"
        className={`lnk border-solid border-r border-[#2D2D2D] ${ranking ? "actlnk" : ""}`}
        onClick={trigHapticFdb}
      >
        Ranking
      </Link>
      <Link
        href="/store"
        className={`lnk ${store ? "actlnk" : ""}`}
        onClick={trigHapticFdb}
      >
        Store
      </Link>
    </div>
  );
};

export default Navbar;

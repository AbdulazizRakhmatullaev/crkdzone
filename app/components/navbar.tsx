"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const trigHapticFdb = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }
  };

  return (
    <div className="navrow">
      <Link
        href="/"
        className={`lnk ${pathname === "/" ? "actlnk" : ""}`}
        onClick={trigHapticFdb}
      >
        Base
      </Link>
      <Link
        href="/store"
        className={`lnk ${pathname === "/store" ? "actlnk" : ""}`}
        onClick={trigHapticFdb}
      >
        Store
      </Link>
      <Link
        href="/missions"
        className={`lnk ${pathname === "/missions" ? "actlnk" : ""}`}
        onClick={trigHapticFdb}
      >
        Missions
      </Link>
      <Link
        href="/ranking"
        className={`lnk ${pathname === "/ranking" ? "actlnk" : ""}`}
        onClick={trigHapticFdb}
      >
        Ranking
      </Link>
      <Link
        href="/squad"
        className={`lnk ${pathname === "/squad" ? "actlnk" : ""}`}
        onClick={trigHapticFdb}
      >
        Squad
      </Link>
    </div>
  );
};

export default Navbar;

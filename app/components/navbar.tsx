"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const base = pathname === "/";
  const missions = pathname === "/missions";
  const ranking = pathname === "/ranking";
  const squad = pathname === "/squad";

  const trigHapticFdb = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }
  };

  return (
    <div className="navrow">
      <Link
        href="/"
        className={`lnk ${base ? "actlnk" : ""}`}
        onClick={trigHapticFdb}
      >
        Base
      </Link>
      <Link
        href="/missions"
        className={`lnk ${missions ? "actlnk" : ""}`}
        onClick={trigHapticFdb}
      >
        Missions
      </Link>
      <Link
        href="/ranking"
        className={`lnk ${ranking ? "actlnk" : ""}`}
        onClick={trigHapticFdb}
      >
        Ranking
      </Link>
      <Link
        href="/squad"
        className={`lnk ${squad ? "actlnk" : ""}`}
        onClick={trigHapticFdb}
      >
        Squad
      </Link>
    </div>
  );
};

export default Navbar;

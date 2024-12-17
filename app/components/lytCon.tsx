"use client";

import { useInitData } from "../contexts/initData";
import Navbar from "./navbar";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { platform } = useInitData();

  return (
    <>
      <main id="main" className={platform}>
        {children}
      </main>
      <nav id="navbar" className={platform}>
        <Navbar />
      </nav>
    </>
  );
}

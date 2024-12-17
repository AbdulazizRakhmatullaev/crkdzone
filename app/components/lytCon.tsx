"use client";

import { useInitData } from "../contexts/initData";
import Navbar from "./navbar";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { platform } = useInitData();

  return (
    <section id="content">
      <main id="main" className={platform}>
        {children}
      </main>
      <nav id="navbar" className={platform}>
        <Navbar />
      </nav>
    </section>
  );
}

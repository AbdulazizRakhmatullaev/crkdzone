"use client";

import { useEffect } from 'react';
import Header from "@/app/components/header";
import sqdimg from "@/public/squad.jpg";
import { useLayout } from "@/app/contexts/layoutCon";

export default function Squad() {
  const { setFullHeight } = useLayout();

  useEffect(() => {
    setFullHeight(false);
  }, [setFullHeight]);

  return (
    <>
      <Header
        img_src={sqdimg}
        title="Squad"
        desc="Call in your squad and watch each other’s six, no one makes it through this fight alone. Eyes up! This field won’t take prisoners, and you’d better be ready to adapt. Team up, and stack those points with precision, soldier!"
      />
    </>
  );
}
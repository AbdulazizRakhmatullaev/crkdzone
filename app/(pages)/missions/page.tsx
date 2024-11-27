"use client";

import Header from "@/app/components/header";
import Link from "next/link";

export default function Missions() {
  return (
    <>
      <Header
        title="Missions"
        desc="Hit every objective like your life depends on it — no excuses, no delays, no second chances! Points don’t come easy, soldier, and this field isn’t forgiving. You either earn ‘em or watch yourself fall behind. Stay sharp and stay ready!"
      />

      <div>
        <div className="m-[10px] mt-[30px]">Essentials</div>
        <div className="mis">
          <div className="flex flex-col">
            <div>Join telegram channel</div>
            <div className="text-xs text-[#959595]">+1 000 Armor</div>
          </div>

          <Link href={"https://t.me/crkdzone"}>
            <button className="misProg">Execute</button>
          </Link>
        </div>
      </div>
    </>
  );
}

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
        <div className="mis">
          <div className="misInf">
            <div className="misT">Subscribe to the channel</div>
            <div className="text-xs text-[#959595]">+ 1 000</div>
          </div>

          <Link href={"https://t.me/crkdzone"}>
            <button className="misProg">Execute</button>
          </Link>
        </div>
      </div>
    </>
  );
}

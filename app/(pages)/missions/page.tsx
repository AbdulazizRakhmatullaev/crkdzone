"use client";

import Link from "next/link";

export default function Missions() {
  return (
    <>
      <div>
        <div className="ml-[10px] mb-[5px] mt-[30px] text-[#959595]">Essentials</div>
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

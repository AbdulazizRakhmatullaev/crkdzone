"use client";

import Header from "@/app/components/header";

export default function Missions() {
  return (
    <>
      <Header
        title="Missions"
        desc="Hit every objective like your life depends on it — no excuses, no delays, no second chances! Points don’t come easy, soldier, and this field isn’t forgiving. You either earn ‘em or watch yourself fall behind. Stay sharp and stay ready!"
      />

      <div>
        <div className="font-HitBld mb-[10px] pl-[10px]">Essentials</div>
        <div className="mis dv ">
          <div className="misInf">
            <div className="misT">TON mission</div>
            <div className="misDesc">1,000 $CZP</div>
          </div>

          <button className="misProg">Execute</button>
        </div>
        <div className="misCat">Investigation</div>
        <div className="mis dv ">
          <div className="misInf">
            <div className="misT">Subscribe to channel</div>
            <div className="misDesc">700 $CZP</div>
          </div>

          <button className="misProg">Execute</button>
        </div>
        <div className="mis dv ">
          <div className="misInf">
            <div className="misT">Subscribe to YouTube</div>
            <div className="misDesc">700 $CZP</div>
          </div>

          <button className="misProg">Execute</button>
        </div>
        <div className="mis dv ">
          <div className="misInf">
            <div className="misT">Subscribe to X</div>
            <div className="misDesc">700 $CZP</div>
          </div>

          <button className="misProg">Execute</button>
        </div>
      </div>
    </>
  );
}

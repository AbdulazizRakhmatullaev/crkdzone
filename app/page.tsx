"use client";

import { useEffect, useState } from "react";
import { useInitData } from "./contexts/initData";

export default function Base() {
  const { user } = useInitData();
  const [balance, setBalance] = useState("0");
  const [dt, setDt] = useState("retrieving...");

  useEffect(() => {
    if (user?.balance !== undefined) {
      setBalance(user?.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))
    }

    if (user?.authDate !== undefined) {
      const date = new Date();
      setDt(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`)
    }
  }, [user?.balance, user?.authDate])

  return (
    <div className="base flex flex-col items-center justify-between h-full w-full">
      <div className="dt w-full">
        <div className="ml-[10px]">Data</div>
        <div className="mt-2 p-[10px] border border-[#2d2d2d] flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="text-[#959595]">Balance</div>
            <div>
              {balance}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-[#959595]">Date joined</div>
            <div className="">{dt}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-[#959595]">Squad</div>
            <div className="">{user?.friends}</div>
          </div>
        </div>
      </div>
      <div id="farm">
        <div className="frmcol">
          <button className="frmbtn">Farm</button>
        </div>
      </div>
    </div>
  );
};
"use client";

import { useEffect, useState } from "react";
import { useInitData } from "./contexts/initData";
import Link from "next/link";

export default function Base() {
  const { user } = useInitData();
  const [balance, setBalance] = useState("0");
  const [name, setName] = useState("Unknown");
  const [dt, setDt] = useState("00/00/00");

  useEffect(() => {
    if (user?.name !== undefined) {
      setName(user?.name);
    }

    if (user?.joined_at !== undefined) {
      const date = new Date();
      setDt(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`)
    }

    if (user?.balance !== undefined) {
      setBalance(user?.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    }
  }, [])

  return (
    <div className="base flex flex-col items-center h-full w-full">
      <span className="fixed right-0 top-0 text-[10px] text-[#313131]">date joined {dt}</span>
      <div className="infos w-full">
        <div className="pb-[5px] pl-[15px] text-[#959595] text-[12px] uppercase">Player&apos;s data</div>
        <div className="w-full flex gap-[10px]">
          <div className="w-full flex flex-col gap-[10px]">
            <table className="w-full">
              <thead>
                <tr className="bg-[#161616] border border-[#2d2d2d]">
                  <th className="text-left">Name</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#2d2d2d]">
                  <td>
                    {name}
                    <span className="text-xs text-[#6e6e6e]">#{user?.tg_id}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-[200px]">
            <table className="w-full h-full">
              <thead>
                <tr className="bg-[#161616] border border-[#2d2d2d]">
                  <th className="text-center">Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center border border-[#2d2d2d]">
                  <td>
                  <span className="text-[#6e6e6e]">CZ</span> {balance}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button className="frmbtn w-full mt-[10px]">To war</button>
      </div>
      <div className="w-full mt-[25px]">
        <div className="pb-[5px] pl-[15px] text-[#959595] text-[12px] uppercase">Missions</div>
        <div className="mis">
          <div className="flex flex-col">
            <div>Join telegram channel</div>
            <div className="text-xs text-[#6e6e6e]">+1 000 Armor</div>
          </div>
          <Link href={"https://t.me/crkdzone"}>
            <button className="misProg">Execute</button>
          </Link>
        </div>
        <div className="mis">
          <div className="flex flex-col">
            <div>Join telegram channel</div>
            <div className="text-xs text-[#6e6e6e]">+1 000 Armor</div>
          </div>
          <Link href={"https://t.me/crkdzone"}>
            <button className="misProg">Execute</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
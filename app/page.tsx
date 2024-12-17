"use client";

import { useEffect, useState } from "react";
import { useInitData } from "./contexts/initData";
import Link from "next/link";

export default function Base() {
  const { user } = useInitData();
  const [balance, setBalance] = useState("0");
  const [arm, setArm] = useState("0");
  const [sta, setSta] = useState("0");
  const [name, setName] = useState("Unknown");
  const [dt, setDt] = useState("00/00/00");

  useEffect(() => {
    if (user?.name !== undefined) {
      setName(user?.name);
    }

    if (user?.joined_at !== undefined) {
      const date = new Date();
      setDt(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`);
    }

    if (user?.balance !== undefined) {
      setBalance(
        user?.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      );
    }

    if (user?.armor !== undefined) {
      setArm(
        user?.armor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      );
    }

    if (user?.stamina !== undefined) {
      setSta(
        user?.stamina.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      );
    }
  }, [user]);

  const Farm = (status: string) => {

  }

  return (
    <div className="base flex flex-col items-center h-full w-full">
      <span className="fixed right-0 top-0 text-[9px] text-[#313131]">
        {dt}
      </span>
      <div className="infos w-full">
        <div className="w-full flex gap-[5px]">
          <div className="w-full flex flex-col gap-[10px]">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left w-1/2">Name</th>
                  <th className="text-left w-1/2">Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#1c1c1c99] backdrop-blur-sm">
                  <td className="border-r-0">
                    {name}
                    <span className="text-[8px] text-[#6e6e6e]">#{`${user?.tg_id === undefined ? "00000000" : user?.tg_id}`}</span>
                  </td>
                  <td className="border-l-0">
                    {balance}
                    <span className="text-[12px] ml-1 text-[#6e6e6e]">CZ</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left w-1/2">Armor</th>
                  <th className="text-left w-1/2">Stamina</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#1c1c1c99] backdrop-blur-sm">
                  <td className="text-left border-r-0">{arm}</td>
                  <td className="text-left border-l-0">{sta}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button className="frmbtn w-[180px] mt-[10px]">To war</button>
          <div className="text-center w-24 text-xs mt-[5px] bg-[#1c1c1c99] backdrop-blur-sm px-2 py-1 text-[#6e6e6e] cursor-pointer">How it works?</div>
        </div>
      </div>
      <div className="w-full mt-[25px]">
        <div className="pb-[5px] pl-[15px] text-[#959595] text-[12px] uppercase">
          Missions
        </div>
        <div className="mis bg-[#1c1c1c99]">
          <div className="flex flex-col">
            <div>Join telegram channel</div>
            <div className="text-xs text-[#6e6e6e]">+1 000 Armor</div>
          </div>
          <Link href={"https://t.me/crkdzone"}>
            <button className="misProg">Execute</button>
          </Link>
        </div>
        <div className="mis bg-[#1c1c1c99]">
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
}

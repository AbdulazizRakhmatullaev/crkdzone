"use client";

import { useEffect, useState } from "react";
import { useInitData } from "./contexts/initData";

export default function Base() {
  const { user } = useInitData();
  const [balance, setBalance] = useState("0");
  const [firstName, setFirstName] = useState("Name#00000000");
  const [dt, setDt] = useState("initializing...");

  useEffect(() => {
    if (user?.balance !== undefined) {
      setBalance(user?.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    }

    if (user?.firstName !== undefined) {
      setFirstName(`${user?.firstName}`);
    }

    if (user?.authDate !== undefined) {
      const date = new Date();
      setDt(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`)
    }
  }, [])

  return (
    <div className="base flex flex-col items-center justify-between h-full w-full">
      <div className="infos w-full">
        <div className="pb-[5px] pl-[15px] text-[#959595] text-[12px] uppercase">Player&apos;s data</div>
        <div className="flex flex-col gap-[10px]">
          <table className="w-full">
            <thead>
              <tr className="bg-[#161616] border border-[#2d2d2d]">
                <th className="text-left">name</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-[#2d2d2d]">
                <td>
                  {firstName}<span className="text-xs text-[#6e6e6e]">#{user?.tg_id}</span>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex gap-[5px]">
            <table className="w-full">
              <thead>
                <tr className="bg-[#161616] border border-[#2d2d2d]">
                  <th className="text-left">balance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#2d2d2d]">
                  <td>{balance}</td>
                </tr>
              </tbody>
            </table>
            <table className="w-full">
              <thead>
                <tr className="bg-[#161616] border border-[#2d2d2d]">
                  <th className="text-left">date joined</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#2d2d2d]">
                  <td>{dt}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id="farm" className="w-full">
        <div className="frmcol">
          <button className="frmbtn">To war!</button>
        </div>
      </div>
    </div>
  );
};
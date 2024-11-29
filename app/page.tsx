"use client";

import { useEffect, useState } from "react";
import { useInitData } from "./contexts/initData";

export default function Base() {
  const { user } = useInitData();
  const [balance, setBalance] = useState("0");
  const [firstName, setFirstName] = useState("Name#00000000");
  const [frns, setFrns] = useState(0);
  const [dt, setDt] = useState("initializing...");

  useEffect(() => {
    if (user?.balance !== undefined) {
      setBalance(user?.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
    }

    if (user?.firstName !== undefined) {
      setFirstName(`${user?.firstName}#${user?.tg_id}`);
    }

    if (user?.friends !== undefined) {
      setFrns(user?.friends);
    }

    if (user?.authDate !== undefined) {
      const date = new Date();
      setDt(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`)
    }
  }, [user?.balance, user?.firstName, user?.tg_id, user?.friends, user?.authDate])

  return (
    <div className="base flex flex-col items-center justify-between h-full w-full">
      <div className="infos w-full">
        <div className="dt w-full">
          <div className="ml-[10px] mb-[5px] text-[#959595]">Soldier&apos;s Data</div>
          <div className="mt-2 px-[10px] py-[5px] border border-[#2d2d2d] flex flex-col gap-2">
            <div className="flex justify-between">
              <div>Name:</div>
              <div className="text-[#959595]">{firstName}</div>
            </div>
            <div className="flex justify-between">
              <div>Balance:</div>
              <div className="text-[#959595]">{balance}</div>
            </div>
            <div className="flex justify-between">
              <div>Armor:</div>
              <div className="text-[#959595]">1 500</div>
            </div>
            <div className="flex justify-between">
              <div>Squad:</div>
              <div className="text-[#959595]">{frns}</div>
            </div>
            <div className="flex justify-between">
              <div>Date joined:</div>
              <div className="text-[#959595]">{dt}</div>
            </div>
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
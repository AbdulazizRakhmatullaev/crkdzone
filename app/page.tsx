"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useInitData } from "./contexts/initData";

export default function Page() {
  const { user } = useInitData();
  const [name, setName] = useState("Unknown");
  const [dt, setDt] = useState("00/00/00");
  const [buttonText, setButtonText] = useState("TO WAR");
  const [remainingTime, setRemainingTime] = useState(0);
  const [stamina, setStamina] = useState(3);
  const [armor, setArmor] = useState(1000);
  const [balance, setBalance] = useState(0);
  const countdownDuration = 2 * 60 * 60 * 1000;
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (user?.name !== undefined) {
      setName(user?.name);
    }

    if (user?.balance !== undefined) {
      setBalance(user?.balance);
    }

    if (user?.joined_at !== undefined) {
      const date = new Date();
      setDt(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`);
    }

    if (user?.armor !== undefined) {
      setArmor(user?.armor);
    }

    if (user?.stamina !== undefined) {
      setStamina(user?.stamina);
    }

  }, [user]);

  useEffect(() => {
    const savedStartTime = localStorage.getItem("warStartTime");
    const savedStamina = localStorage.getItem("stamina");

    if (savedStartTime) {
      const startTime = parseInt(savedStartTime, 10);
      const elapsed = new Date().getTime() - startTime;

      if (elapsed < countdownDuration) {
        setStartTime(startTime);
        setRemainingTime(countdownDuration - elapsed);
      } else {
        localStorage.removeItem("warStartTime");
      }
    }

    if (savedStamina) {
      setStamina(parseInt(savedStamina, 10));
    }

    console.log(localStorage.getItem("stamina"))
  }, []);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1000) {
            clearInterval(timer);
            handleStopFarming();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  useEffect(() => {
    if (remainingTime > 0) {
      setButtonText(`TO BASE ${formatTime(remainingTime)}`);
    } else if (!startTime) {
      setButtonText("TO WAR");
    }
  }, [remainingTime]);

  const handleStartFarming = () => {
    if (stamina > 0) {
      const startTime = new Date().getTime();
      localStorage.setItem("warStartTime", startTime.toString());
      setStartTime(startTime);
      setRemainingTime(countdownDuration);
      setStamina((prev) => prev - 1);
      localStorage.setItem("stamina", (stamina - 1).toString());
    } else {
      alert("Not enough stamina!");
    }
  };

  const handleStopFarming = () => {
    if (startTime) {
      const elapsed = new Date().getTime() - startTime;
      const earnedReward = ((armor / 1000) * 28.15 * elapsed) / countdownDuration;
      const formattedReward = parseFloat(earnedReward.toFixed(2)); // Format reward as float with 2 decimals
      setBalance((prev) => parseFloat((prev + formattedReward).toFixed(2))); // Update balance
      alert(`You've earned ${formattedReward} CZ!`);
      localStorage.removeItem("warStartTime");
      setStartTime(null);
      setRemainingTime(0);
    }
  };

  const handleButtonClick = () => {
    if (buttonText === "TO WAR") {
      handleStartFarming();
    } else {
      handleStopFarming();
    }
  };

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Stamina regeneration
  useEffect(() => {
    const staminaRegen = setInterval(() => {
      setStamina((prev) => {
        const newStamina = Math.min(prev + 1, 10); // Cap stamina at 10
        localStorage.setItem("stamina", newStamina.toString());
        return newStamina;
      });
    }, 60000); // Regenerate 1 stamina every minute

    return () => clearInterval(staminaRegen);
  }, []);

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
                <tr className="bg-[#1c1c1c99]">
                  <td className="border-r-0">
                    {name}
                    <span className="text-[8px] text-[#6e6e6e]">#{`${user?.tg_id === undefined ? "00000000" : user?.tg_id}`}</span>
                  </td>
                  <td className="border-l-0">
                    {balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                <tr className="bg-[#1c1c1c99]">
                  <td className="text-left border-r-0">{armor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  <td className="text-left border-l-0">{stamina}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            id="farm"
            className="frmbtn w-[180px] mt-[10px] bg-gray-500 text-white"
            onClick={handleButtonClick}>
            {buttonText}
          </button>
          <div className="text-center w-24 text-xs mt-[5px] bg-[#1c1c1c99] backdrop-blur-sm px-2 py-1 text-[#6e6e6e] cursor-pointer">How it works</div>
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
            <div>Follow X</div>
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


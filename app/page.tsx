"use client";

import { useEffect, useState } from "react";
import { useUser } from "./contexts/user";
import { useLayout } from "./contexts/layoutCon";
import Spinner from "./components/spinner";

export default function Base() {
  const { setFullHeight } = useLayout();
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    setFullHeight(true);
    setLoading(false);
  }, [setFullHeight]);

  useEffect(() => {
    if (user?.balance !== undefined) {
      setBalance(user?.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))
    }
  }, [user?.balance])

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {loading ? (
        <Spinner />
      ) : (
          <div className="base flex flex-col items-center justify-center h-full w-full">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bal font-HitBld text-4xl text-center">{balance}</div>
              <div className="cnN font-HitConBlk text-2xl">$CZP</div>
            </div>
            <div id="farm">
              <div className="frmcol">
                <div className="abt">
                  <div className="aBtn">Store</div>
                  <div className="aBtn">Profile</div>
                </div>
                <button className="btn">Farm</button>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};
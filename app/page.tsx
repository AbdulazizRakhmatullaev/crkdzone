"use client";

import { useEffect, useState } from "react";
import { useUser } from "./contexts/user";
import { useLayout } from "./contexts/layoutCon";
import Spinner from "./components/spinner";

export default function Base() {
  const { setFullHeight } = useLayout();
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [balLoad, setBalLoad] = useState(true);
  const [balance, setBalance] = useState<string | undefined>(undefined);

  useEffect(() => {
    setFullHeight(true);
    setLoading(false);
  }, [setFullHeight]);

  useEffect(() => {
    setBalance(user?.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))
    setBalLoad(false);
  }, [user?.balance])

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {loading ? (
        <Spinner />
      ) : (
          <div className="base flex flex-col items-center justify-center h-full w-full">
            <div className="flex flex-col items-center justify-center h-full">
              {balLoad ? (
                <div className="bal font-HitBld text-4xl text-center">0</div>
              ) : (
                <div className="bal font-HitBld text-4xl text-center">{balance}</div>
              )}
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
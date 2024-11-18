"use client";

import { useEffect, useState } from "react";
import { useLayout } from "./contexts/layoutCon";
import Spinner from "./components/spinner";

export default function Base() {
  const { setFullHeight } = useLayout();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFullHeight(true);

    setLoading(false);
  }, [setFullHeight]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
          <div className="base fl flex-col items-center justify-center h-full">
            <div className="fl flex-col items-center justify-center h-full">
              <div className="bal font-HitBld text-4xl">76 570</div>
              <div className="cnN font-HitConBlk text-2xl">$CZP</div>
            </div>
            <div id="farm">
              <div className="frmcol">
                <div className="abt">
                  <div className="aBtn">
                    Store
                  </div>
                  <div className="aBtn">
                    Profile
                  </div>
                </div>
                <button className="btn">Farm</button>
              </div>
            </div>
          </div>
      )}
    </>
  );
};
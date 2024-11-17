"use client";

import { useEffect } from "react";
import { useLayout } from "./contexts/layoutCon";

const Base = () => {
  const { setFullHeight } = useLayout();

  useEffect(() => {
    setFullHeight(true);
  }, [setFullHeight]);

  return (
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
  );
};

Base.layoutConfig = {
  fullHeight: true,
};

export default Base;
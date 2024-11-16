import React from 'react'

const setPlatformStyle = () => {
  const platform = window?.Telegram?.WebApp?.platform;
  return platform === "ios" || platform === "android" ? "phn" : "dsk";
};

export default function Footer() {
  return (
    <div id="footer" className={setPlatformStyle()}>
      <div className="futcol">
        <div className="abt">
          <div className="aBtn">
            Store
          </div>
          <div className="aBtn">
            76 890
          </div>
          <div className="aBtn">
            Profile
          </div>
        </div>
        <button className="btn">Farm</button>
      </div>
    </div>
  )
}
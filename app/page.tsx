"use client";

import Title from "@/app/components/title";

const Home = () => {

  const setPlatformStyle = () => {
    const platform = window?.Telegram?.WebApp?.platform;
    return platform === "ios" || platform === "android" ? "phn" : "dsk";
  };

  return (
    <div>
      <Title name="Base" />

      <div id="frm" className={setPlatformStyle()}>
        <button className="frmBtn">Farm</button>
      </div>
    </div>
  );
};

export default Home;

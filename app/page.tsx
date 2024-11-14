"use client";

const Home = () => {

  const setPlatformStyle = () => {
    const platform = window?.Telegram?.WebApp?.platform;
    return platform === "ios" || platform === "android" ? "phn" : "dsk";
  };

  return (
    <div>
      <div id="frm" className={setPlatformStyle()}>
        <button className="frmBtn">Farm</button>
      </div>
    </div>
  );
};

export default Home;

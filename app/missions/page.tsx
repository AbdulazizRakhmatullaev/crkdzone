import Image from "next/image";

export default function Missions() {
  return (
    <>
      <div className="title">
        <div className="grid"></div>
        <div className="tRow">Missions</div>
      </div>

      <div className="header">
        <Image
          src="/missions.jpg"
          alt="img"
          className="hd_img"
          priority={true}
          width={485} // Placeholder values
          height={190} // Placeholder values
        />
        <div className="hd_desc">
          Complete the objectives, Soldier.
          <br /> Extra points are on the line!
        </div>
      </div>
      <div className="pgres">Missions complete: 6</div>

      <div className="misCat">Essentials</div>
      <div className="mis">
        <div className="misInf">
          <div className="misT">TON mission</div>
          <div className="misDesc">1,000 CDZE</div>
        </div>

        <button className="misProg">Execute!</button>
      </div>
      <div className="misCat">Investigation</div>
      <div className="mis">
        <div className="misInf">
          <div className="misT">Subscribe to channel</div>
          <div className="misDesc">700 CDZE</div>
        </div>

        <button className="misProg">Execute!</button>
      </div>
      <div className="mis">
        <div className="misInf">
          <div className="misT">Subscribe to YouTube</div>
          <div className="misDesc">700 CDZE</div>
        </div>

        <button className="misProg">Execute!</button>
      </div>
      <div className="mis">
        <div className="misInf">
          <div className="misT">Subscribe to X</div>
          <div className="misDesc">700 CDZE</div>
        </div>

        <button className="misProg">Execute!</button>
      </div>
    </>
  );
}

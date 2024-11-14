import Header from "@/app/components/header";
import misImg from "@/public/missions.jpg";

export default function Missions() {
  return (
    <>
      <Header
        img_src={misImg}
        desc={
          <>
            Complete the objectives, Soldier.
            <br />
            Extra points are on the line!
          </>
        }
        res={`Completed missions: ${6}`}
      />

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

import Image from "next/image";
import Title from "@/app/components/title"

export default function Squad() {
  return (
    <>
      <Title name="Squad" />

      <div className="header">
        <Image
          src="/squad.jpg"
          alt="img"
          className="hd_img"
          priority={true}
          width={485} // Placeholder values
          height={190} // Placeholder values
        />
        <div className="hd_desc">
          Call your friends to cover your six,
          <br />
          and get your points Soldier.
        </div>
      </div>
      <div className="pgres">Soldiers: 10</div>
    </>
  );
}

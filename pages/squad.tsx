import Image from 'next/image';

export default function Squad() {
  return (
    <>
      <div className="title">
        <div className="grid"></div>
        <div className="tRow">Squad</div>
      </div>
      <div className="header">
        <Image
          src="/squad.jpg"
          alt="img"
          className="hd_img"
          priority={false}
          loading="lazy"
          decoding="async"
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

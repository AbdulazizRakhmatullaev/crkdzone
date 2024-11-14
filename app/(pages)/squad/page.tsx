import Header from "@/app/components/header";
import sqdimg from "@/public/squad.jpg";

export default function Squad() {
  return (
    <>
      <Header
        img_src={sqdimg}
        desc={
          <>
            Call your friends to cover your six,
            <br />
            and get your points Soldier.
          </>
        }
        res={`Soldiers: ${10}`}
      />
    </>
  );
}
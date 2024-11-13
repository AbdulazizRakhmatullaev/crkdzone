import Title from "@/app/components/title"
import Header from "@/app/components/header";

export default function Squad() {
  return (
    <>
      <Title name="Squad" />

      <Header
        img_src="/squad.jpg"
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

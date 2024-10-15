import Image from "next/image";

const ClubHero = () => {
  return (
    <>
      <section className="relative pt-5 mx-10 mb-10">
        <div className="relative w-full">
          {/* image */}
          <Image
            src="/assets/images/ClubHeroBg.png"
            alt="Bg image"
            height={1500}
            width={1500}
            className="w-full h-full rounded-md"
          />
          {/* black layer */}
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-md" />
        </div>
      </section>
    </>
  );
};

export default ClubHero;

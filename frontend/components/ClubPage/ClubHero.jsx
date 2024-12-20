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

          {/*club logo*/}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primaryblue bg-opacity-50 shadow-2xl">
            <Image
              src="/logo-white.svg"
              alt="Club Logo"
              height={200}
              width={200}
            />
          </div>

          {/* content */}
          <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-center w-1/3">
            <h1 className="text-4xl font-bold text-white mb-5">
              Entrepreneurship Cell
            </h1>
            <p className="text-lg text-white">
              A platform for budding entrepreneurs to learn, network, and launch
              their startups. We provide mentorship, workshops, and resources to
              help students turn their ideas into reality.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClubHero;

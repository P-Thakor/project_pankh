import Image from "next/image";

const Hero = () => {
  return (
    <>
      <section className="relative pt-5 mx-10 mb-10">
        <div className="relative w-full">
          {/* image */}
          <Image
            src="/assets/images/depstar-gate.jpg"
            alt="Bg image"
            height={1500}
            width={1500}
            className="w-full h-full rounded-md"
          />
          {/* black layer */}
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-md" />
          {/* text on image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-bold text-center text-white" style={{ fontSize: "6vw" }}>
              MADE FOR THOSE
              <br /> WHO DO
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

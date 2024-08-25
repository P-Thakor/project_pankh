import Image from "next/image";

const Hero = () => {
  return (
    <>
      <section className="relative pt-5 m-10">
        <div>
          <Image
            src="/assets/images/HeroBg.png"
            alt="Bg image"
            height={1500}
            width={1500}
            className="rounded-md"
          />
        </div>
        <div className="absolute inset-0 flex justify-center top-[15%]">
          <p className="text-white text-center text-[70px] font-bold">
            MADE FOR THOSE
            <br /> WHO DO
          </p>
        </div>
      </section>
    </>
  );
};

export default Hero;

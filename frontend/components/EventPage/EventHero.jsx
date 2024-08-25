import Image from "next/image";

export default function EventHero({item}) {
  return (
    <>
      <section className="relative m-10">
        <div className="relative">
          <Image
            src="/assets/images/EventHeroBg.png"
            alt="Bg image"
            height={1500}
            width={1500}
            className="rounded-md"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-md" />
          <div className="absolute inset-0 flex">
            <div className="w-1/2 flex flex-col justify-center px-10">
              <h1 className="text-white text-6xl font-bold mb-12">
                {item.name}
              </h1>
              <h3 className="text-white text-4xl font-bold mb-12">CHARUSAT</h3>
              <p className="text-white text-lg">
                {item.description}
              </p>
            </div>
            <div className="w-1/2 flex items-center justify-center">
              <div className="p-8 w-96 items-center justify-center rounded-xl bg-white">
                <div>
                  <h3 className="font-bold text-3xl font-sans mb-4">
                    Date & Time
                  </h3>
                  <p className="text-lg text-gray mb-2">
                    {item.startDate}, {item.startTime}
                  </p>
                  <p className="text-lg text-primaryblue mb-4">
                    {item.locations}
                  </p>
                  <button className="custom-btn w-full mb-2 hover:bg-primarydarkblue">
                    Book Now
                </button>
                <button className="px-[30px] py-[10px] text-white rounded-md hover:bg-gray-700 bg-gray-500 w-full">
                    More Info
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

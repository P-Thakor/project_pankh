import { formattedDate, formattedTime } from "@/utils";
import Image from "next/image";

export default function EventHero({ item }) {
  return (
    <>
      <section className="relative m-5 lg:mx-10 lg:my-5 ">
        <div className="relative w-full">
          {/* image */}
          <Image
            src="/assets/images/EventHeroBg.png"
            alt="Bg image"
            height={1500}
            width={1500}
            className="w-full h-full rounded-md"
          />
          {/* black layer */}
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-md" />
          {/* text on image */}
          <div className="absolute inset-0 flex">
            <div className="flex flex-col justify-center w-2/3 px-10 lg:w-1/2">
              <h1
                className="mb-6 font-bold text-white md:mb-12"
                style={{ fontSize: "4vw" }}
              >
                {item.name}
              </h1>
              <h3
                className="mb-6 font-bold text-white md:mb-12"
                style={{ fontSize: "2vw" }}
              >
                CLUB NAME{/* {item.clubname} */}
              </h3>
              <p className="text-white " style={{ fontSize: "1.3vw" }}>
                {item.description}
              </p>
            </div>
            {/* book event */}
            <div className="items-center justify-center hidden w-1/2 shadow-lg lg:flex">
              <div className="items-center justify-center p-8 bg-white w-96 rounded-xl">
                  <h3 className="mb-4 font-sans text-3xl font-bold">
                    Date & Time
                  </h3>
                  <p className="mb-2 text-lg text-gray">
                    {formattedDate(item.startDate)}, {formattedTime(item.startTime)}
                  </p>
                  <p className="mb-4 text-lg text-primaryblue">
                    {item.locations}
                  </p>
                  <button className="w-full mb-2 custom-btn hover:bg-primarydarkblue">
                    Book Now
                </button>
                <button className="px-[30px] py-[10px] text-white rounded-md hover:bg-gray-700 bg-gray-500 w-full">
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* responsive book box */}
      <section>
        <div className="flex items-center justify-center m-5 shadow-lg lg:hidden">
          <div className="items-center justify-center p-8 bg-white w-96 rounded-xl">
            <h3 className="mb-4 font-sans text-3xl font-bold">Date & Time</h3>
            <p className="mb-2 text-lg text-gray">
              {item.startDate}, {item.startTime}
            </p>
            <p className="mb-4 text-lg text-primaryblue">{item.locations}</p>
            <button className="w-full mb-2 custom-btn hover:bg-primarydarkblue">
              Book Now
            </button>
            <button className="px-[30px] py-[10px] text-white rounded-md hover:bg-gray-700 bg-gray-500 w-full">
              More Info
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

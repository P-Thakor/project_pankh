import Link from "next/link";
import Image from "next/image";

const AddNewEventTab = () => {
  return (
    <>
      <div className="flex w-full px-0 py-10">
        <Image
          src="/assets/images/newEvent.png"
          alt="add new event"
          width={550}
          height={550}
          className="z-10 hidden ml-20 lg:flex"
        />
        {/* background */}
        <div className="absolute flex items-center self-end justify-center w-full bg-navyblue min-h-64">
          {/* content */}
          <div className="justify-center px-5 ml-auto text-white md:px-40">
            <h1 className="text-4xl font-semibold">Make Your Own Event</h1>
            <p className="mt-2 mb-4 text-md">
              Wanna create an event? Let's do it!
            </p>
            <Link href="/create-event">
              <button className="py-4 font-semibold rounded-md bg-primaryblue px-14 hover:bg-primarydarkblue">
                Create Event
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewEventTab;

import Link from "next/link";
import Image from "next/image";

const AddNewEventTab = () => {
  return (
    <>
    <div className="flex w-full px-0 py-10">
      <Image src="/newEvent.png" alt="add new event" width={550} height={550} className="z-10 ml-20"/>
      <div className="flex absolute bg-navyblue justify-center items-center w-full self-end min-h-64">
        <div className="text-white px-40 ml-32 justify-center">
            <h1 className="text-4xl font-semibold">Make Your Own Event</h1>
            <p className="text-md mt-2 mb-4">Wanna create an event? Let's do it!</p>
            <Link href="/">
                <button className="bg-primaryblue px-14 py-4 rounded-md font-semibold hover:bg-primarydarkblue">
                    Create Event
                </button>
            </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default AddNewEventTab

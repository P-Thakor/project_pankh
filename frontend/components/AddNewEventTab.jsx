import Link from "next/link";
import Image from "next/image";

const AddNewEventTab = () => {
  return (
    <>
    <div className="flex w-full px-0 py-10">
      <Image src="/newEvent.png" alt="add new event" width={350} height={350} className="z-10 ml-20"/>
      <div className="flex absolute bg-navyblue justify-end w-full self-end min-h-40">
        <div className="text-white px-40 mt-5">
            <h1 className="text-2xl">Make Your Own Event</h1>
            <p className="text-xs mt-5">Wanna create an event? Let's do it!</p>
            <Link href="/">
                <button className="custom-btn">
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

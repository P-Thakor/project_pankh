import Image from "next/image";

export default function ListItem({ item }) {
  return (
    <div className="p-4 w-100 items-center justify-center shadow-xl rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="bg-white text-purple-600 rounded-xl px-2 py-1 absolute text-xs m-2">
        {item.price !== 0 ? "PAID" : "FREE"}
      </div>
      <div className="object-cover">
        <Image
          src="/Event.png"
          width={400}
          height={400}
          alt="event image"
          className="rounded-md"
        />
      </div>
      <div className="max-w-[400px] text-wrap">
        <h3 className="font-semibold text-lg font-sans my-4">{item.name}</h3>
        <p className="text-sm text-primaryblue">
          {item.startDate}, {item.startTime}
        </p>
        <p className="text-gray-500 mt-4">{item.locations}</p>
      </div>
    </div>
  );
}

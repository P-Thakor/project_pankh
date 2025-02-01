"use client";

import { formattedDate, formattedTime } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

export default function ListItem({ item, isCreator }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRedirect = (url) => {
    setIsLoading(true);
    router.push(url);
  };

  const handleViewParticipants = () => {
    router.push(`/event-participants/${item._id}`);
  }
  return (
    <>
      {isLoading ? (
        // <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className="items-center justify-center w-96 h-96 pl-44 pt-44">
          {/* <span className="text-2xl">Loading...</span> */}
          <TailSpin type="Tailspin" color="#00BFFF" height={50} width={50} />
        </div>
      ) : (
        <div
          className="p-4 w-100 items-center justify-center shadow-xl rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
          
        >
          {/* <div className="bg-white text-purple-600 rounded-xl px-2 py-1 absolute text-xs m-2">
            {item.price !== 0 ? "PAID" : "FREE"}
          </div> */}
          <div className="object-contain" onClick={() => handleRedirect(`/view-event/${item._id}`)}>
            <Image
              src={
                item.coverImage?.startsWith("https://res.cloudinary.com/")
                  ? item.coverImage.replace(
                      "/upload/",
                      "/upload/c_crop,w_350,h_238/"
                    )
                  : "/Event.png"
              }
              width={350}
              height={350}
              alt="event image"
              className="rounded-md"
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="max-w-[350px] text-wrap" onClick={() => handleRedirect(`/view-event/${item._id}`)}>
              <h3 className="font-semibold text-lg font-sans my-4">
                {item.name}
              </h3>
              <p className="text-sm text-primaryblue">
                {formattedDate(item.startDate)}, {formattedTime(item.startTime)}
              </p>
              <p className="text-gray-500 mt-4">{item.locations}</p>
            </div>
            { isCreator &&
              <div>
                <button className="bg-primaryblue text-white px-2 py-2 rounded-md z-10 hover:bg-primarydarkblue" onClick={handleViewParticipants}>View Participants</button>
              </div>
            }
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { formattedDate, formattedTime } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

export default function ListItem({ item }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRedirect = (url) => {
    setIsLoading(true);
    router.push(url);
  };
  const date = new Date();
  const isPast = new Date(item.startDate) < date;
  // console.log(isPast);

  // if (isPast) {
  //   return null;
  // } 
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
          onClick={() => handleRedirect(`/view-event/${item._id}`)}
        >
          {/* <div className="bg-white text-purple-600 rounded-xl px-2 py-1 absolute text-xs m-2">
            {item.price !== 0 ? "PAID" : "FREE"}
          </div> */}
          <div className="object-contain">
            <Image
              src={
                item.photo[0]?.startsWith("https://res.cloudinary.com/")
                  ? item.photo[0].replace(
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
          <div className="max-w-[350px] text-wrap">
            <h3 className="font-semibold text-lg font-sans my-4">
              {item.name}
            </h3>
            <p className="text-sm text-primaryblue">
              {formattedDate(item.startDate)}, {formattedTime(item.startTime)}
            </p>
            <p className="text-gray-500 mt-4">{item.locations}</p>
          </div>
        </div>
      )}
    </>
  );
}

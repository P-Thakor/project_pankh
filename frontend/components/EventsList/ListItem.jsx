"use client";

import { formattedDate, formattedTime } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ListItem({ item }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRedirect = (url) => {
    setIsLoading(true);
    router.push(url);
  };

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <span className="text-2xl">Loading...</span>
        </div>
      ) : (
        <div
          className="p-4 w-100 items-center justify-center shadow-xl rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={() => handleRedirect(`/view-event/${item._id}`)}
        >
          <div className="bg-white text-purple-600 rounded-xl px-2 py-1 absolute text-xs m-2">
            {item.price !== 0 ? "PAID" : "FREE"}
          </div>
          <div className="object-contain">
            <Image
              src={
                item.photo[0].startsWith("http")
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

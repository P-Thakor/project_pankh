"use client";

import { formattedDate, formattedTime } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

export default function ListItem({ item, isFaculty, isCreator }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRedirect = (url) => {
    setIsLoading(true);
    router.push(url);
  };

  const handleViewParticipants = () => {
    router.push(`/event-participants/${item._id}`);
  };

  const handleViewAttendance = () => {
    router.push(`/view-attendance/${item._id}`);
  };

  const handleDeleteEvent = async () => {
    try {
      if (confirm("Are you sure you want to delete this event?")) {
        setIsLoading(true);
        const res = await fetch(
          `http://localhost:8001/api/v1/event/deleteEvent/${item._id}`,
          {
            method: "DELETE",
          }
        );
        if (res.ok) {
          setIsLoading(false);
          router.refresh();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {isLoading ? (
        // <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
        <div className="items-center justify-center w-96 h-96 pl-44 pt-44">
          {/* <span className="text-2xl">Loading...</span> */}
          <TailSpin type="Tailspin" color="#00BFFF" height={50} width={50} />
        </div>
      ) : (
        <div className="items-center justify-center p-4 transition-all duration-300 shadow-xl cursor-pointer w-100 rounded-xl hover:shadow-2xl hover:scale-105">
          {/* <div className="absolute px-2 py-1 m-2 text-xs text-purple-600 bg-white rounded-xl">
            {item.price !== 0 ? "PAID" : "FREE"}
          </div> */}
          <div
            className="object-contain"
            onClick={() => handleRedirect(`/view-event/${item._id}`)}
          >
            <Image
              src={
                item.coverImage?.startsWith("https://res.cloudinary.com/")
                  ? item.coverImage.replace(
                      "/upload/",
                      "/upload/w_350,h_238,c_fill/"
                    )
                  : "/assets/images/Event.png"
              }
              width={350}
              height={350}
              alt="event image"
              className="rounded-md"
            />
          </div>
          {/* <div className="flex w-full items-center mt-4"> */}
          <div
            className="max-w-[350px] text-wrap"
            // onClick={() => handleRedirect(`/view-event/${item._id}`)}
          >
            <h3 className="my-4 font-sans text-lg font-semibold overflow-ellipsis">
              {item.name}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-primaryblue">
                {formattedDate(item.startDate)}, {formattedTime(item.startTime)}
              </p>
              {isFaculty && (
                <div>
                  {item.attendance && item.attendance.length > 0 ? (
                    <button
                      className="z-10 px-2 py-2 text-white rounded-md bg-primaryblue hover:bg-primarydarkblue"
                      onClick={handleViewAttendance}
                    >
                      View Attendance
                    </button>
                  ) : (
                    <button
                      className="z-10 px-2 py-2 text-white rounded-md bg-primaryblue hover:bg-primarydarkblue"
                      onClick={handleViewParticipants}
                    >
                      View Participants
                    </button>
                  )}
                </div>
              )}
            </div>
            <p className="mt-4 text-gray-500">{item.locations}</p>
          </div>
          {/* </div> */}
          {isCreator && (
            <div className="flex items-center justify-between mt-4">
              <button
                className="z-10 px-5 py-2 text-white rounded-md bg-primaryblue hover:bg-primarydarkblue"
                onClick={() => handleRedirect(`/edit-event/${item._id}`)}
              >
                Edit
              </button>
              <button
                className="z-10 px-2 py-2 mt-2 text-red-400 rounded-md hover:bg-red-600 hover:text-white"
                onClick={handleDeleteEvent}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

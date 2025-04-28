"use client";

import { formattedDate, formattedTime } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import CancelEventModal from "../CancelEventModal";
import { AuthModal } from "..";

export default function ListItem({ item, isFaculty, isCreator }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); //for cancel event modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); //for auth modal
  const [modalTitle, setModalTitle] = useState(""); //for auth modal title
  const [message, setMessage] = useState(""); //for auth modal message
  const [iconColor, setIconColor] = useState(""); //for auth modal icon color

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

  const handleOnClose = () => {
    setIsModalOpen(false);
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

  const handleCancelEvent = () => {
    setIsModalOpen(true);
  };

  const handleEventCancelled = (finalResponse, cancellationStatus) => {
    // Update your UI state or show a success message
    if (cancellationStatus) {
      setModalTitle("Event Cancelled");
      setMessage(finalResponse);
      setIconColor("bg-green-500");
    } else {
      setModalTitle("Cancellation Unsuccessful");
      setMessage(finalResponse);
      setIconColor("bg-red-500");
    }
    setIsAuthModalOpen(true);
    router.refresh(); // Refresh the page to update the event status
  };

  return (
    <>
      {isLoading ? (
        <div className="items-center justify-center w-96 h-96 pl-44 pt-44">
          <TailSpin type="Tailspin" color="#00BFFF" height={50} width={50} />
        </div>
      ) : (
        <div className="items-center justify-center p-4 transition-all duration-300 shadow-xl cursor-pointer w-100 rounded-xl hover:shadow-2xl hover:scale-105 relative">
          {/* Cancelled banner - Only shown when item status is cancelled */}
          {item.status === "cancelled" && (
            <div className="absolute top-0 left-0 w-full bg-red-600 text-white py-2 px-4 text-center font-bold rounded-t-xl z-10">
              CANCELLED
            </div>
          )}

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
              className={`rounded-md ${
                item.status === "cancelled" ? "opacity-50" : ""
              }`}
            />
          </div>
          <div className="max-w-[350px] text-wrap">
            <h3
              className={`my-4 font-sans text-lg font-semibold overflow-ellipsis ${
                item.status === "cancelled" ? "text-gray-500" : ""
              }`}
            >
              {item.name.length > 100
                ? `${item.name.substring(0, 70)}...`
                : item.name}
            </h3>
            <div className="flex items-center justify-between">
              <p
                className={`text-sm ${
                  item.status === "cancelled"
                    ? "text-gray-500"
                    : "text-primaryblue"
                }`}
              >
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
          {isCreator && (
            <div className="flex items-center justify-between mt-4">
              <button
                className="z-10 px-5 py-2 text-white rounded-md bg-primaryblue hover:bg-primarydarkblue"
                onClick={() => handleRedirect(`/edit-event/${item._id}`)}
                disabled={item.status === "cancelled"}
              >
                Edit
              </button>
              <button
                className="z-10 px-2 py-2 mt-2 text-red-400 rounded-md hover:bg-red-600 hover:text-white"
                onClick={handleDeleteEvent}
              >
                Delete
              </button>

              {item.status !== "cancelled" && (
                <button
                  onClick={handleCancelEvent}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel Event
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <CancelEventModal
        isOpen={isModalOpen}
        onClose={handleOnClose}
        eventId={item._id}
        onCancel={handleEventCancelled}
      />
      <AuthModal
        isVisible={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        title={modalTitle}
        message={message}
        iconColor={iconColor}
      />
    </>
  );
}

"use client";

import { formattedDate, formattedTime } from "@/utils";
// import Image from "next/image";
import { useContext, useEffect, useState } from "react";
// import SuccessModal from "../successModal";
import UserContext from "@/context/UserContext";
import { AuthModal } from "..";
import { TailSpin } from "react-loader-spinner";
import UserModal from "../UserModal";
import { useRouter } from "next/navigation";

export default function EventHero({ item }) {
  // const [user, setUser] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalIconColor, setModalIconColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFaculty, setIsFaculty] = useState(false);

  const date = new Date();
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user && user.eventsParticipated.includes(`${item._id}`)) {
      setRegistered(true);
    }

    if (user && (user.role === "faculty-member" || user.role === "admin")) {
      setIsFaculty(true);
    }
  }, [user, item._id]);

  const handleViewParticipants = () => {
    setLoading(true);
    router.push(`/event-participants/${item._id}`);
  };

  const handleViewAttendance = () => {
    setLoading(true);
    router.push(`/view-attendance/${item._id}`);
  };

  const handleRegisterForEvent = () => {
    setLoading(true);
    if (!user) {
      setModalTitle("Registration Unsuccessful");
      setModalMessage("Please login to register for this event.");
      setModalIconColor("bg-red-500");
      setIsModalVisible(true);
      setLoading(false);
      return;
    }

    if (!confirm("Are you sure you want to register for this event?")) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8001/api/v1/user/registerEvent/${item._id}`, {
      method: "PATCH",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify({ user: user }),
      credentials: "include",
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.ok) {
            setRegistered(true);
            setModalTitle("Registration Successful");
            setModalMessage(
              "Thank you for registering for our event. We look forward to seeing you there!"
            );
            setModalIconColor("bg-green-500");
            setIsModalVisible(true);
          } else {
            // alert("Failed to register for this event");
            setModalTitle("Registration Unsuccessful");
            // setModalMessage(
            //   "Failed to register for this event. Please try again."
            // );
            setModalMessage(data.message);
            setModalIconColor("bg-red-500");
            setIsModalVisible(true);
          }
          // console.log(data);
          return data;
        });
      })
      .then((newUserData) => {
        newUserData ? console.log(newUserData) : console.log(user);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <section className="relative m-5 lg:mx-10 lg:my-5 ">
        <div className="relative w-full h-[200px]  lg:h-[600px] rounded-md overflow-hidden">
          
          {/* image */}
          {/* <Image
            src="/assets/images/EventHeroBg.png"
            alt="Bg image"
            height={1500}
            width={1500}
            className="w-full h-full rounded-md"
          /> */}

          {/* black layer */}
          <div className="absolute top-0 left-0 w-full h-full bg-black rounded-md bg-opacity-80" />

          {/* text on image */}
          <div className="absolute inset-0 flex">
            <div className="flex flex-col justify-center w-2/3 px-10 lg:w-1/2 sm:w-full">
              <h1 className="mb-6 font-bold text-white md:mb-12 text-4xl sm:text-5xl md:text-[4vw]">
                {/* event name */}
                {item.name}
              </h1>

              {/* <h3 className="mb-6 font-bold text-white text-2xl sm:text-3xl md:text-[1.8vw] md:mb-12 text-center md:text-left">
                {item.clubname}
              </h3> */}

              {/* <p className="text-white text-base sm:text-lg md:text-[1.3vw] text-center md:text-left">
                    {item.description}
                  </p> */}
            </div>

            {/* book event */}
            <div className="items-center justify-center hidden w-1/2 shadow-lg lg:flex">
              <div className="items-center justify-center p-8 bg-white w-96 rounded-xl">
                <h3 className="mb-4 font-sans text-3xl font-bold">
                  Date & Time
                </h3>
                <p className="mb-2 text-lg text-gray">
                  {formattedDate(item.startDate)},{" "}
                  {formattedTime(item.startTime)}
                </p>
                <p className="mb-4 text-lg text-primaryblue">
                  {item.locations}
                </p>
                {isFaculty ? (
                  item.attendance.length > 0 ? (
                    <button
                      onClick={handleViewAttendance}
                      className="w-full mb-2 custom-btn hover:bg-primarydarkblue"
                    >
                      {loading ? (
                      <TailSpin
                        type="Tailspin"
                        color="#FFFFFF"
                        height={25}
                        width={25}
                      />
                    ) : (
                      "View Attendance"
                    )}
                    </button>
                  ) : (
                    <button
                      onClick={handleViewParticipants}
                      className="w-full mb-2 custom-btn hover:bg-primarydarkblue"
                    >
                      {loading ? (
                      <TailSpin
                        type="Tailspin"
                        color="#FFFFFF"
                        height={25}
                        width={25}
                      />
                    ) : (
                      "View Participants"
                    )}
                    </button>
                  )
                ) : registered ? (
                  <button
                    className="w-full mb-2 px-[30px] py-[10px] text-white rounded-md bg-primarydarkblue cursor-not-allowed"
                    disabled
                  >
                    Registered
                  </button>
                ) : new Date(item.startDate) < date ? (
                  <button
                    className="w-full mb-2 px-[30px] py-[10px] text-white rounded-md bg-primarydarkblue cursor-not-allowed"
                    disabled
                  >
                    Registration Closed
                  </button>
                ) : (
                  <button
                    onClick={handleRegisterForEvent}
                    className="w-full mb-2 custom-btn hover:bg-primarydarkblue"
                  >
                    {loading ? (
                      <TailSpin
                        type="Tailspin"
                        color="#FFFFFF"
                        height={25}
                        width={25}
                      />
                    ) : (
                      "Register Now"
                    )}
                  </button>
                )}
                <button
                  className="px-[30px] py-[10px] text-white rounded-md hover:bg-gray-700 bg-gray-500 w-full"
                  onClick={() => setIsUserModalVisible(true)}
                >
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
            <button
              className="w-full mb-2 custom-btn hover:bg-primarydarkblue"
              onClick={handleRegisterForEvent}
            >
              Register Now
            </button>
            <button
              className="px-[30px] py-[10px] text-white rounded-md hover:bg-gray-700 bg-gray-500 w-full"
              onClick={() => setIsUserModalVisible(true)}
            >
              More Info
            </button>
          </div>
        </div>
      </section>
      <AuthModal
        isVisible={isModalVisible}
        title={modalTitle}
        message={modalMessage}
        iconColor={modalIconColor}
        onClose={() => setIsModalVisible(false)}
      />
      <UserModal
        userId={item.creator}
        isOpen={isUserModalVisible}
        onClose={() => setIsUserModalVisible(false)}
      />
    </>
  );
}

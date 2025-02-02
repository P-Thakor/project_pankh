"use client";

import { useContext, useEffect, useState } from "react";
import List from "@/components/EventsList/List";
import UserContext from "../../context/UserContext";
import { useRouter } from "next/navigation";

export default function DashboardComp({ events = [] }) {
  const [eventList, setEventList] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);

  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      let templist = events.filter((event) =>
        user.eventsParticipated?.includes(event._id)
      );
      setEventList(templist);
    }

    if (user?.role === "admin" || user?.role === "faculty-member") {
      let tempcreatedlist = [];
      events.forEach((event) => {
        event.creator === user._id && tempcreatedlist.push(event);
      });
      setCreatedEvents(tempcreatedlist);
    }
  }, [user, events]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (user) {
    var { username = "", email = "", collegeId = "" } = user;
  } else {
    var username = (email = "");
    setUser({});
    setEventList([]);
  }

  return (
    <div className="flex flex-col min-h-screen p-6 space-y-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-primaryblue">Dashboard</h1>

      {/* Profile Section */}
<div className="flex flex-col items-center w-full p-6 bg-white rounded-lg shadow-lg md:items-start">
  <div className="flex flex-col items-center w-full space-y-4 md:flex-row md:items-start md:space-x-6 md:space-y-0">
    {/* Profile Picture */}
    <div className="relative -mt-12 md:mt-0">
      <div className="flex items-center justify-center w-24 text-3xl font-bold text-white rounded-full shadow-lg aspect-square bg-primaryblue">
        {username.charAt(0) || "A"}
      </div>
    </div>

    {/* Profile Details */}
    <div className="w-full space-y-4">
      <div className="p-4 border rounded-lg bg-blue-50">
        <span className="text-sm font-semibold text-gray-600">Full Name:</span>
        <p className="text-lg font-medium text-primaryblue">{username}</p>
      </div>
      <div className="p-4 border rounded-lg bg-blue-50">
        <span className="text-sm font-semibold text-gray-600">Email:</span>
        <p className="text-lg font-medium text-primaryblue">{email}</p>
      </div>

      <div className="flex-1 p-8 bg-gray-100">
        {activeSection === "Profile" && user && (
          <div className="max-w-md rounded-lg">
            <h1 className="text-2xl font-bold text-primaryblue">Profile</h1>
            <div className="flex flex-col">
              <div className="w-full p-6 mt-6 bg-white rounded-lg">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-center w-24 h-24 mb-4 text-4xl font-bold text-white rounded-full bg-primaryblue">
                    {username.charAt(0) || "a"}
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b">
                    <span className="text-sm font-semibold text-gray-500">
                      Full Name:
                    </span>
                    <span className="text-lg font-medium text-primaryblue">
                      {username}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500">
                      Email:
                    </span>
                    <span className="text-lg font-medium text-primaryblue">
                      {email}
                    </span>
                  </div>
                  {collegeId !== "" && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-500">
                        Student ID:
                      </span>
                      <span className="text-lg font-medium text-primaryblue">
                        {collegeId}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button className="mt-4 bg-primaryblue text-white rounded-md p-2 hover:bg-primarydarkblue">
                Edit Profile
              </button>
              <button className="mt-4 text-primaryblue rounded-md p-2 border-primaryblue hover:bg-primaryblue hover:text-white">
                Reset Password
              </button>
            </div>
          </div>
        )}

      {/* Events Participated Section */}
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-primaryblue">
          Events Participated
        </h2>
        {eventList.length > 0 ? (
          <List list={eventList} style="ml-2" />
        ) : (
          <p className="mt-4 text-gray-500">No events participated yet!</p>
        )}
      </div>
    </div>
  );
}

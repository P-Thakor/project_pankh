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
    var {
      username = "",
      email = "",
      collegeId = "",
      contactNumber = "",
      designation = "",
      department = "",
      institute = "",
    } = user;
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
      {collegeId && (
        <div className="p-4 border rounded-lg bg-blue-50">
          <span className="text-sm font-semibold text-gray-600">Student ID:</span>
          <p className="text-lg font-medium text-primaryblue">{collegeId}</p>
        </div>
      )}
      {contactNumber && (
        <div className="p-4 border rounded-lg bg-blue-50">
          <span className="text-sm font-semibold text-gray-600">Mobile Number:</span>
          <p className="text-lg font-medium text-primaryblue">{contactNumber}</p>
        </div>
      )}
      {designation && (
        <div className="p-4 border rounded-lg bg-blue-50">
          <span className="text-sm font-semibold text-gray-600">Designation:</span>
          <p className="text-lg font-medium text-primaryblue">{designation}</p>
        </div>
      )}
      {department && (
        <div className="p-4 border rounded-lg bg-blue-50">
          <span className="text-sm font-semibold text-gray-600">Department:</span>
          <p className="text-lg font-medium text-primaryblue">{department}</p>
        </div>
      )}
      {institute && (
        <div className="p-4 border rounded-lg bg-blue-50">
          <span className="text-sm font-semibold text-gray-600">Institute:</span>
          <p className="text-lg font-medium text-primaryblue">{institute}</p>
        </div>
      )}
    </div>
  </div>

  {/* Buttons */}
  <div className="flex mt-4 space-x-4">
    <button className="px-4 py-2 text-white rounded-md bg-primaryblue hover:bg-primarydarkblue">
      Edit Profile
    </button>
    <button className="px-4 py-2 border rounded-md border-primaryblue text-primaryblue hover:bg-primaryblue hover:text-white">
      Reset Password
    </button>
  </div>
</div>


      {/* Events Created by User (Only for Admin & Faculty) */}
      {(user.role === "faculty-member" || user.role === "admin") && (
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-primaryblue">
            Events Created by You
          </h2>
          {createdEvents.length > 0 ? (
            <List list={createdEvents} style="ml-2" isCreator={true} />
          ) : (
            <p className="mt-4 text-gray-500">No events organized yet!</p>
          )}{" "}
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

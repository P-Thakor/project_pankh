"use client";

import { useContext, useEffect, useState } from "react";
import List from "@/components/EventsList/List";
import UserContext from "../../context/UserContext";

export default function DashboardComp({ events = [] }) {
  const [activeSection, setActiveSection] = useState("Profile"); // Default to Profile section
  const [eventList, setEventList] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      let templist = events.filter((event) =>
        user.eventsParticipated?.includes(event._id)
      );
      setEventList(templist);
    }

    console.log(user);
    console.log(eventList);

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
    <div className="flex min-h-screen overflow-clip">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-primaryblue">Dashboard</h2>
          <p className="mt-1 text-gray-700">{username}</p>{" "}
          {/* Display Username */}
        </div>

        {/* Navigation Links */}
        <ul className="mt-4 space-y-2">
          {["Profile", "Events"].map((item) => (
            <li
              key={item}
              onClick={() => setActiveSection(item)}
              className={`p-4 cursor-pointer transition-colors ${
                activeSection === item
                  ? "text-primaryblue font-semibold" // Active item style
                  : "hover:text-primaryblue" // Hover style
              }`}
            >
              {item}
            </li>
          ))}
          {user.role === "faculty-member" && (
            <li
              key="Your Events"
              onClick={() => setActiveSection("Your Events")}
              className={`p-4 cursor-pointer transition-colors ${
                activeSection === "Your Events"
                  ? "text-primaryblue font-semibold" // Active item style
                  : "hover:text-primaryblue" // Hover style
              }`}
            >
              Your Events
            </li>
          )}
        </ul>
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

        {activeSection === "Events" && user && (
          <div className="">
            <h1 className="text-2xl font-bold text-primaryblue">
              Events Participated
            </h1>
            {eventList.length > 0 ? (
              <List list={eventList} style="ml-2" />
            ) : (
              <p className="mt-4 text-gray-500">No events participated yet!</p>
            )}
          </div>
        )}

        {activeSection === "Your Events" && user && (
          <div className="">
            <h1 className="text-2xl font-bold text-primaryblue">
              Events Created by You
            </h1>
            {createdEvents.length > 0 ? (
              <List list={createdEvents} style="ml-2" isCreator={true} />
            ) : (
              <p className="mt-4 text-gray-500">No events organized yet!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

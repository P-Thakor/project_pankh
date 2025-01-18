"use client";

import { useContext, useEffect, useState } from "react";
import List from "@/components/EventsList/List";
import { fetchCurrentUser, fetchEventById } from "@/utils";
import UserContext from "@/context/UserContext";

export default function DashboardComp() {
  const [activeSection, setActiveSection] = useState("Profile"); // Default to Profile section
  // const [user, setUser] = useState({});
  const [eventList, setEventList] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      let templist = [];
      user.eventsParticipated.forEach((event) => {
        fetchEventById(event).then((data) => {
          templist.push(data);
        });
      });
      setEventList(templist);
    }

    console.log(user);

    if(user?.role === "admin" || user?.role === "faculty-member") {
      let tempcreatedlist = [];
      eventList.forEach((event) => {
        event.creator === user._id && tempcreatedlist.push(event);
        });
        setCreatedEvents(tempcreatedlist);
      };
  }, [user]);

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
          {user.role === "admin" ||
            ("faculty" && (
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
            ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 bg-gray-100">
        {activeSection === "Profile" && user && (
          <div className="max-w-md rounded-lg">
            <h1 className="text-2xl font-bold text-primaryblue">Profile</h1>
            <div className="flex flex-col">
              {/* User Info Card */}
              <div className="w-full p-6 mt-6 bg-white rounded-lg">
                <div className="flex flex-col space-y-4">
                  {/* User Initial as Avatar */}

                  <div className="flex items-center justify-center w-24 h-24 mb-4 text-4xl font-bold text-white rounded-full bg-primaryblue">
                    {username.charAt(0) || "a"}
                    {/* {"abc".charAt(0)} */}
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b">
                    <span className="text-sm font-semibold text-gray-500">
                      Full Name:
                    </span>
                    <span className="text-lg font-medium text-primaryblue">
                      {username}
                    </span>
                  </div>
                  {/* <div className="flex items-center justify-between pb-4 border-b">
                    <span className="text-sm font-semibold text-gray-500">
                      User ID:
                    </span>
                    <span className="text-lg font-medium text-primaryblue">
                      22DCE069{/*{user.id}*4/}
                    </span>
                  </div> */}
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
          </div>
        )}

        {activeSection === "Events" && user && (
          <div className="">
            <h1 className="text-2xl font-bold text-primaryblue">
              Events Participated
            </h1>
            {/* Add event details here */}
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
            {/* Add event details here */}
            {eventList.length > 0 ? (
              <List list={createdEvents} style="ml-2" />
            ) : (
              <p className="mt-4 text-gray-500">No events organized yet!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

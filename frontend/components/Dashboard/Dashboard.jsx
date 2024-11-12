"use client";

import { useState } from "react";
import List from "@/components/EventsList/List";

export default function Dashboard({ user,eventData }) {
  const [activeSection, setActiveSection] = useState("Profile"); // Default to Profile section

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-primaryblue">Dashboard</h2>
          <p className="mt-1 text-gray-700">abc xyz {/*{user.name}*/}</p>{" "}
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
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 bg-gray-100">
        {activeSection === "Profile" && (
          <div className="max-w-md p-8 rounded-lg">
            <h1 className="text-2xl font-bold text-primaryblue">Profile</h1>
            <div className="flex flex-col">
              {/* User Info Card */}
              <div className="w-full p-6 mt-6 bg-white rounded-lg">
                <div className="flex flex-col space-y-4">
                  {/* User Initial as Avatar */}

                  <div className="flex items-center justify-center w-24 h-24 mb-4 text-4xl font-bold text-white rounded-full bg-primaryblue">
                    {/*{user.name.charAt(0)}*/}
                    {"abc".charAt(0)}
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b">
                    <span className="text-sm font-semibold text-gray-500">
                      Full Name:
                    </span>
                    <span className="text-lg font-medium text-primaryblue">
                      abc xyz{/*{user.name}*/}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b">
                    <span className="text-sm font-semibold text-gray-500">
                      User ID:
                    </span>
                    <span className="text-lg font-medium text-primaryblue">
                      22DCE069{/*{user.id}*/}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500">
                      Email:
                    </span>
                    <span className="text-lg font-medium text-primaryblue">
                      abc@xyz.com{/*{user.email}*/}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "Events" && (
          <div>
            <h1 className="text-2xl font-bold text-primaryblue">
              Events Participated
            </h1>
            {/* Add event details here */}
            <List list={eventData} />
          </div>
        )}
      </div>
    </div>
  );
}

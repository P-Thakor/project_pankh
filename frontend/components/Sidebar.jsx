"use client";

import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div>
      {/* Hamburger Icon */}
      {!isOpen && (
        <button onClick={toggleSidebar} className="z-50 p-2 text-3xl top-4 left-4">
          &#9776;
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40 rounded-r-lg`}
      >
        {/* Nav Links */}
        <ul className="mt-8 space-y-4">
          <li className="p-4 cursor-pointer hover:text-white hover:bg-primaryblue">View Events</li>
          <li className="p-4 cursor-pointer hover:text-white hover:bg-primaryblue">Create Event</li>
          <li className="p-4 cursor-pointer hover:text-white hover:bg-primaryblue">Clubs</li>
          <li className="p-4 cursor-pointer hover:text-white hover:bg-primaryblue">Scholarships</li>
        </ul>

        {/* Login/Logout button */}
        <div className="absolute left-0 w-full px-4 bottom-4">
          <button
            onClick={handleLoginLogout}
            className="w-full py-2 transition-colors border-2 rounded text-primaryblue border-primaryblue hover:bg-primaryblue hover:text-white"
          >
            {isLoggedIn ? 'Log Out' : 'Log In'}
          </button>
        </div>
      </div>

      {/* Overlay (to close sidebar when clicked outside) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
"use client";

import { useState } from 'react';

export default function Sidebar(user) {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock login state
  const [activeItem, setActiveItem] = useState('View Events'); // Track the active item

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="fixed top-0 left-0 z-40 w-64 h-full text-black bg-white rounded-r-lg shadow-lg">
      {/* Dashboard Heading and Username */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-primaryblue">Dashboard</h2>
        <p className="mt-1 text-gray-700">{user.name}</p> {/* Username */}
      </div>

      {/* Navigation Links */}
      <ul className="mt-4 space-y-2">
        {['Profile','Events'].map((item) => (
          <li
            key={item}
            onClick={() => setActiveItem(item)}
            className={`p-4 cursor-pointer transition-colors ${
              activeItem === item
                ? 'text-primaryblue font-semibold'  // Active item style
                : 'hover:text-primaryblue'           // Hover style with text color change only
            }`}
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Log Out Button */}
      <div className="absolute left-0 w-full px-4 bottom-4">
        <hr className="my-4 border-gray-200" />
        <button
          onClick={handleLoginLogout}
          className="w-full py-2 transition-colors border-2 rounded text-primaryblue border-primaryblue hover:bg-primaryblue hover:text-white"
        >
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
      </div>
    </div>
  );
}

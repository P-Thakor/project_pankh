"use client";

import { fetchCurrentUser } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchCurrentUser().then((data) => {
      setUser(data);
    });
  }, []);

  useEffect(() => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [user]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      fetch("http://localhost:8000/api/v1/auth/logout", {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            setIsLoggedIn(false);
            setUser(null);
            response.json().then((data) => {
              console.log(data);
            });
            router.push("/home");
          }
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      if (router) {
        router.push("/sign-in");
      }
      setIsOpen(false);
    }
  };

  return (
    <div>
      {/* Hamburger Icon */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="z-50 p-2 text-3xl top-4 left-4"
        >
          &#9776;
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 rounded-r-lg`}
      >
        {/* Nav Links */}
        <ul className="mt-8 space-y-4">
          <li
            className="p-4 cursor-pointer hover:text-white hover:bg-primaryblue"
            onClick={() => {
              router.push("/dashboard");
              toggleSidebar();
            }}
          >
            Dashboard
          </li>
          <li
            className="p-4 cursor-pointer hover:text-white hover:bg-primaryblue"
            onClick={() => {
              router.push("/create-event");
              toggleSidebar();
            }}
          >
            Create Event
          </li>
          <li
            className="p-4 cursor-pointer hover:text-white hover:bg-primaryblue"
            onClick={() => {
              router.push("/club/66d6d41857092e784256b1e7");
              toggleSidebar();
            }}
          >
            Clubs
          </li>
          <li className="p-4 cursor-pointer hover:text-white hover:bg-primaryblue">
            Scholarships
          </li>
        </ul>

        {/* Login/Logout button */}
        <div className="absolute left-0 w-full px-4 bottom-4">
          <button
            onClick={handleLoginLogout}
            className="w-full py-2 transition-colors border-2 rounded text-primaryblue border-primaryblue hover:bg-primaryblue hover:text-white"
          >
            {isLoggedIn ? "Log Out" : "Log In"}
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

"use client";

import Image from "next/image";
import Link from "next/link";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState(null);

  const { user, logoutUser } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [user]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      fetch("http://localhost:8001/api/v1/auth/logout", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            setIsLoggedIn(false);
            logoutUser();
            response.json().then((data) => {
              // console.log(data);
            });
            router.push("/sign-in");
          }
        })
        .then((response) => {
          // console.log(response);
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
          <Link href="/home">
            <Image
              src="/logo_cropped.png"
              alt="PANKH logo"
              width={170}
              height={25}
              className="flex object-contain ml-8"
            />
            {isLoggedIn && (
              <p className="flex flex-col items-center justify-center mt-4 font-semibold text-center text-gray-600">
                {/* Welcome&nbsp; */}
                <span className="text-primaryblue">{user?.username}</span>
                <span className="text-xs">{user?.designation}</span>
              </p>
            )}
          </Link>

          <li
            className="p-4 cursor-pointer hover:text-white hover:bg-primaryblue"
            onClick={() => {
              router.push("/home");
              toggleSidebar();
            }}
          >
            Home
          </li>
          {isLoggedIn && (
            <li
              className="p-4 cursor-pointer hover:text-white hover:bg-primaryblue"
              onClick={() => {
                router.push("/dashboard");
                toggleSidebar();
              }}
            >
              Dashboard
            </li>
          )}
          {user && user?.role !== "user" && (
            <li
              className="p-4 cursor-pointer hover:text-white hover:bg-primaryblue"
              onClick={() => {
                router.push("/create-event");
                toggleSidebar();
              }}
            >
              Create Event
            </li>
          )}
          { user && user?.role !== "user" && (
            <li
              className="p-4 cursor-pointer hover:text-white hover:bg-primaryblue"
              onClick={() => {
                router.push("/search-user");
                toggleSidebar();
              }}
            >
              Search Student
            </li>
          )}
          {user && user?.role === "admin" && (
            <li
              className="p-4 cursor-pointer hover:text-white hover:bg-primaryblue"
              onClick={() => {
                router.push("/view-faculty");
                toggleSidebar();
              }}
            >
              View Details
            </li>
          )}
          {/* <li
            className="p-4 cursor-pointer hover:text-white hover:bg-primaryblue"
            onClick={() => {
              router.push("/club/66d6d41857092e784256b1e7");
              toggleSidebar();
            }}
          >
            Clubs
          </li> */}
          {/* <li className="p-4 cursor-pointer hover:text-white hover:bg-primaryblue">
            Scholarships
          </li> */}
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

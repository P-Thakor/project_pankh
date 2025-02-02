"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchBar, Sidebar } from ".";
import { fetchEvents } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import UserContext from "@/context/UserContext";

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect( () => {
    (async () => {
    const eventList = await fetchEvents();
    setEvents(eventList);
    })();
  }, []);

  const { user, logoutUser } = useContext(UserContext);

  const router = useRouter();

  const handleLogout = () => {
    fetch("http://localhost:8000/api/v1/auth/logout", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(false);
          logoutUser();
          response.json().then((data) => {
            console.log(data);
          });
          router.push("/sign-in");
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <header className="z-10 w-full">
      <nav className="flex items-center justify-between w-full px-6 py-4 mx-auto h-28 sm:px-16">
        <div className="flex items-center">
          <Sidebar />
          <Link href="/home">
            <Image
              src="/logo.svg"
              alt="PANKH logo"
              width={170}
              height={25}
              className="hidden object-contain sm:flex"
            />
          </Link>
        </div>

        <div>
          <Link href="">
            <Image
              src="/assets/images/charusat_logo.png"
              alt="CHARUSAT logo"
              width={200}
              height={25}
              className="hidden object-contain lg:flex"
            />
          </Link>
        </div>

        <div>
          <Link href="">
            <Image
              src="/assets/images/25YearLogo.png"
              alt="25 Years of CHARUSAT"
              width={80}
              height={25}
              className="hidden object-contain lg:flex"
            />
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <SearchBar events={events} />
        </div>

        <div>
          <Link href="">
            <Image
              src="/assets/images/depstar_logo.png"
              alt="DEPSTAR logo"
              width={110}
              height={25}
              className="hidden object-contain lg:flex"
            />
          </Link>
        </div>
        {user ? (
          <div className="items-center hidden font-semibold text-gray-600 sm:flex justify-items-end ">
            Welcome&nbsp;
            <a
              href="/dashboard"
              className="font-semibold text-primaryblue hover:text-primarydarkblue"
              onClick={() => {
                setIsLoading(true);
              }}
            >
              {user?.username}
            </a>
            <Link href="">
              <button className="mx-10 custom-btn" onClick={handleLogout}>
                Log Out
              </button>
            </Link>
          </div>
        ) : (
          <div className="items-center hidden sm:flex justify-items-end">
            <Link href="/sign-in">
              <button className="mx-10">Sign In</button>
            </Link>
            <Link href="/sign-up">
              <button className="custom-btn">Sign Up</button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

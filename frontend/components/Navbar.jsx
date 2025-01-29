"use client";

import Image from "next/image";
import Link from "next/link";
import { SearchBar, Sidebar } from ".";
import { fetchEvents } from "@/utils";
import { useContext } from "react";
import UserContext from "@/context/UserContext";

const Navbar = () => {
  const events = fetchEvents().then((data)=> {return data});
  const {user} = useContext(UserContext)
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
              className="hidden object-contain sm:flex"
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
              className="hidden object-contain sm:flex"
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
              className="hidden object-contain sm:flex"
            />
          </Link>
        </div>
        { user ? 
        <div>
          Welcome, {user.username}
        </div> :
        <div className="items-center hidden sm:flex justify-items-end">
          <Link href="/sign-in">
            <button className="mx-10">Sign In</button>
          </Link>
          <Link href="/sign-up">
            <button className="custom-btn">Sign Up</button>
          </Link>
        </div>
}
      </nav>
    </header>
  );
};

export default Navbar;

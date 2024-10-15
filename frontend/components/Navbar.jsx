import Image from "next/image";
import Link from "next/link";
import { SearchBar, Sidebar } from ".";
import { fetchEvents } from "@/utils";

const Navbar = async() => {
  const events = await fetchEvents();
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
              className="object-contain"
            />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <SearchBar events={events}/>
        </div>
        <div className="flex items-center justify-items-end">
          <Link href="/sign-in">
            <button className="mx-10">Sign In</button>
          </Link>
          <Link href="/sign-up">
            <button className="custom-btn">Sign Up</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

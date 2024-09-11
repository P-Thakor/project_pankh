import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="z-10 w-full mb-12">
        <nav className="flex items-center justify-between w-full px-6 py-4 mx-auto shadow-md h-28 sm:px-16">
            <Link href="/">
                <Image src="/logo.svg" alt="PANKH logo" width={170} height={25} className="object-contain"/>
            </Link>
            <div className="flex items-center">
            <Link href="/">
                <button className="mx-10">
                    Sign In
                </button>
            </Link>
            <Link href="/">
                <button className="custom-btn">
                    Sign Up
                </button>
            </Link>
            </div>
        </nav>
    </header>
  )
}

export default Navbar

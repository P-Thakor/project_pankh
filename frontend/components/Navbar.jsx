import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="w-full absolute z-10">
        <nav className="w-full mx-auto flex justify-between h-28 items-center shadow-md sm:px-16 px-6 py-4">
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

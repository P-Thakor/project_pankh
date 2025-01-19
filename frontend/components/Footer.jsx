import { footerLinks } from "@/constants"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="flex sm:justify-between justify-center items-center sm:px-20 bg-navyblue text-white px-0 sm:py-0 py-10 m-0">
        <div className="hidden sm:flex">
            <Image src="/logo-white.svg" alt="PANKH logo" width={130} height={20} className="object-contain"/>
        </div>
        <div className="flex justify-evenly justify-self-end sm:flex-col">
            {footerLinks.map((footerLink, index) => (
            <div key={index}>
                {footerLink.links.map((link, index) => (
                <a key={index} href={link.url} className="mx-5">{link.title}</a>
                ))}
            </div>
            ))}
        </div>
        <div className="hidden sm:flex">
            <p>© 2024 PANKH. All rights reserved</p>
        </div>
    </footer>
  )
}

export default Footer

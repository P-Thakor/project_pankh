import { footerLinks } from "@/constants"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="flex justify-between items-center px-20 bg-navyblue text-white">
        <div>
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
        <div>
            <p>© 2024 PANKH. All rights reserved</p>
        </div>
    </footer>
  )
}

export default Footer

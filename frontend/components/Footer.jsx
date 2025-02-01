import { footerLinks } from "@/constants";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center px-0 py-10 m-0 text-white sm:justify-between sm:px-20 bg-navyblue sm:py-0">
      <div className="hidden sm:flex">
        <a href="/home">
          <Image
            src="/logo-white.svg"
            alt="PANKH logo"
            width={130}
            height={20}
            className="object-contain"
          />
        </a>
      </div>
      <div className="flex justify-evenly justify-self-end sm:flex-col">
        {footerLinks.map((footerLink, index) => (
          <div key={index}>
            {footerLink.links.map((link, index) => (
              <a key={index} href={link.url} className="mx-5">
                {link.title}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="hidden sm:flex">
        <p>© 2025 PANKH. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

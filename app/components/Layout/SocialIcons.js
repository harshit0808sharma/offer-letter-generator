// components/SocialIcons.js
"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGooglePlusG, FaInstagram } from "react-icons/fa";

const socialLinks = [
  { icon: <FaFacebookF />, bg: "bg-[#3b5999]", href: "https://www.facebook.com/LokaciOfficial" },
  { icon: <FaTwitter />, bg: "bg-[#55acee]", href: "https://x.com/lokaciofficial" },
  { icon: <FaLinkedinIn />, bg: "bg-[#0077b5]", href: "https://www.linkedin.com/company/lokaci-private-limited/" },
  { icon: <FaGooglePlusG />, bg: "bg-[#dd4b39]", href: "https://lokaci.com/" },
  { icon: <FaInstagram />, bg: "bg-[#dd2a7b]", href: "https://www.instagram.com/lokaciofficial?igsh=Z3phaXBiNnZrd2Fy" },
];

export default function SocialIcons() {
  return (
    <ul className="flex space-x-4 mt-5">
      {socialLinks.map((link, idx) => (
        <li key={idx} className="list-none">
          <Link
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-12 h-12 flex justify-center items-center text-2xl text-[#262626] bg-white rounded-full border-3 border-white overflow-hidden group"
          >
            <span className="relative z-10 transition-transform duration-500 group-hover:rotate-y-360 hover:text-white">
              {link.icon}
            </span>
            <span
              className={`absolute top-full left-0 w-full h-full ${link.bg} transition-all duration-500 group-hover:top-0 z-0`}
            ></span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

import Link from "next/link";
import { FaFileAlt } from "react-icons/fa";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <FaFileAlt className="text-white text-lg" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Offer Letter Platform
              </span>
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed mb-6">
              Quickly generate professional offer letters. Save time, stay accurate, and simplify onboarding.
            </p>
            <SocialIcons />
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <div className="space-y-4 text-gray-400 flex flex-col">
              <Link href="/generator" className="hover:text-white transition-colors duration-200">
                Dashboard
              </Link>
              <Link href="/recent" className="hover:text-white transition-colors duration-200">
                Recent Letters
              </Link>
              <Link href="/pending" className="hover:text-white transition-colors duration-200">
                Pending
              </Link>
              <Link href="/faq" className="hover:text-white transition-colors duration-200">
                FAQ
              </Link>
            </div>
          </div>

          {/* Contact & Legal */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <div className="space-y-4 text-gray-400 flex flex-col">
              <Link href="/about" className="hover:text-white transition-colors duration-200">
                About Us
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} The Salon Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
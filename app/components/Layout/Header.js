'use client';
import Link from "next/link";
import { useState } from "react";
import { FaFileAlt, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleNavClick = (page) => {
    setActive(page);
    setIsOpen(false);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <FaFileAlt className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent">
                Our Offer Letter Platform
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/recent"
                onClick={() => handleNavClick("recent")}
                className={`text-gray-600 hover:text-blue-600 transition-colors ${active === "recent" ? "border-b-2 border-blue-600" : ""}`}
              >
                Recent
              </Link>
              <Link
                href="/pending"
                onClick={() => handleNavClick("pending")}
                className={`text-gray-600 hover:text-blue-600 transition-colors ${active === "pending" ? "border-b-2 border-blue-600" : ""}`}
              >
                Pending
              </Link>
              <Link
                href="/generator"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-105"
              >
                Dashboard
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
                {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-50 p-6 transform transition-transform duration-300 shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <FaTimes size={20} />
        </button>

        <nav className="mt-16 flex flex-col space-y-6">
          <Link
            href="/recent"
            onClick={() => handleNavClick("recent")}
            className={`block text-gray-800 text-lg hover:text-blue-600 transition-colors ${
              active === "recent" ? "font-semibold text-blue-600" : ""
            }`}
          >
            Recent
          </Link>
          <Link
            href="/pending"
            onClick={() => handleNavClick("pending")}
            className={`block text-gray-800 text-lg hover:text-blue-600 transition-colors ${
              active === "pending" ? "font-semibold text-blue-600" : ""
            }`}
          >
            Pending
          </Link>
          <Link
            href="/generator"
            onClick={() => handleNavClick("generator")}
            className="block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full text-center hover:from-blue-600 hover:to-indigo-600 transition-all"
          >
            Dashboard
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMenu}
      />
    </>
  );
};

export default Header;

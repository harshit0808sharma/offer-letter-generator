"use client";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { FaFileAlt, FaBars, FaTimes } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { AppContext } from "@/app/context/AppContext";
import ToggleSwitch from "../Home/ToggleSwitch";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Get the proper logout function from context
  const { 
    isAuthenticated, 
    setIsAuthenticated, 
    setCookieExists, 
    cookieExists,
    handleLogout: contextLogout  // ✅ Use the context's logout function
  } = useContext(AppContext);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) setIsAuthenticated(true);
  }, [setIsAuthenticated]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ✅ FIXED: Use the context's logout function instead of creating our own
  const handleLogout = async () => {
    try {
      // Optional: Call your API logout endpoint if needed
      await fetch("/api/logout", { method: "POST" });
      
      // Use the context's logout function which properly clears localStorage
      contextLogout();
      
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("API logout failed:", error);
      
      // Even if API fails, still logout locally
      contextLogout();
      toast.success("Logged out successfully");
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Recent", path: "/recent" },
    { name: "Pending", path: "/pending" },
  ];

  const isUserLoggedIn = cookieExists === "exists" || isAuthenticated;

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40 shadow-sm py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 group"
              aria-label="Offer Letter Platform Home"
            >
              <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">
                <FaFileAlt className="text-white text-sm" />
              </div>
              <span className="text-2xl font-bold text-black">
                LOKACI
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`relative text-gray-500 hover:text-gray-600 transition-colors text-lg duration-200 font-semibold py-2 ${isActive ? "text-blue-600" : ""
                      }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-3 w-72 h-12 px-2">
              <Link
                href="/generator"
                className="flex-1 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-sm shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-medium h-full"
              >
                Dashboard
              </Link>

              {isUserLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="group relative flex items-center justify-start w-12 h-12 rounded-full bg-red-500 text-white shadow-md overflow-hidden transition-all duration-300 hover:w-32 hover:rounded-2xl active:translate-x-[2px] active:translate-y-[2px]"
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center w-full transition-all duration-300 ease-in-out group-hover:w-1/3 pl-0 group-hover:pl-4 h-full">
                    <FiLogOut size={18} />
                  </div>

                  {/* Text */}
                  <span className="absolute right-0 w-0 opacity-0 text-sm font-semibold transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:w-2/3 group-hover:pr-3 flex items-center h-full">
                    Logout
                  </span>
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1 transition-colors duration-200"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={toggleMenu}
            aria-hidden="true"
          ></div>

          {/* Menu Panel */}
          <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <FaFileAlt className="text-white text-xs" />
                  </div>
                  <span className="text-lg font-bold text-gray-800">Menu</span>
                </div>
                <button
                  onClick={toggleMenu}
                  className="text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md p-1 transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 p-4">
                <ul className="space-y-4">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.path;
                    return (
                      <li key={link.path}>
                        <Link
                          href={link.path}
                          onClick={toggleMenu}
                          className={`block px-4 py-3 rounded-lg text-lg transition-colors duration-200 ${isActive
                            ? "text-blue-600 bg-blue-50 font-semibold border-l-4 border-blue-600"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            }`}
                        >
                          {link.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Mobile Action Buttons */}
                <div className="mt-8 space-y-4">
                  <Link
                    href="/generator"
                    onClick={toggleMenu}
                    className="block w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
                  >
                    Dashboard
                  </Link>

                  {isUserLoggedIn && (
                    <button
                      onClick={() => {
                        toggleMenu();
                        handleLogout();
                      }}
                      className="group relative flex items-center justify-start w-full py-1 px-4 rounded-lg bg-red-500 text-white font-medium shadow-md overflow-hidden transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
                    >
                      {/* Icon */}
                      <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-full transition-all duration-300 ease-in-out group-hover:w-12 group-hover:mr-2">
                        <FiLogOut size={18} />
                      </div>

                      {/* Text */}
                      <span className="ml-3 opacity-100 text-sm font-semibold transition-all duration-300">
                        Logout
                      </span>
                    </button>
                  )}
                </div>

              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
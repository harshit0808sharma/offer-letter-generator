"use client";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { FaFileAlt, FaBars, FaTimes } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { AppContext } from "@/app/context/AppContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, setIsAuthenticated, setCookieExists, cookieExists } =
    useContext(AppContext);

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

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setIsAuthenticated(false);
      setCookieExists("notExists");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
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
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40 shadow-sm">
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
              <span className="text-xl font-bold bg-gradient-to-r from-gray-700 to-black bg-clip-text text-transparent hidden sm:block">
                Offer Letter Platform
              </span>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-700 to-black bg-clip-text text-transparent sm:hidden">
                OLP
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
                    className={`relative text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2 ${
                      isActive ? "text-blue-600" : ""
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
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/generator"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-medium"
              >
                Dashboard
              </Link>

              {isUserLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:bg-red-600 transition-all duration-200 font-medium"
                >
                  Logout
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
                          className={`block px-4 py-3 rounded-lg text-lg transition-colors duration-200 ${
                            isActive 
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
                      className="w-full bg-red-500 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg hover:bg-red-600 transition-all duration-200"
                    >
                      Logout
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
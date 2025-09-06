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

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setIsAuthenticated(false);
    setCookieExists("notExists");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Recent", path: "/recent" },
    { name: "Pending", path: "/pending" },
  ];

  return (
    <nav className="bg-white/70 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-md">
              <FaFileAlt className="text-white text-sm" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-700 to-black bg-clip-text text-transparent">
              Offer Letter Platform
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative text-gray-700 hover:text-blue-600 transition font-medium ${isActive ? "text-blue-600" : ""
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 rounded-full animate-pulse"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/generator"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-lg shadow hover:from-blue-600 hover:to-indigo-600 transition"
            >
              Dashboard
            </Link>

            {(cookieExists === "exists" || isAuthenticated) && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-50 p-6 transition-transform duration-300 ease-in-out transform animate-slideIn"
          style={{ backgroundColor: "white" }}>
          <button
            onClick={toggleMenu}
            className="absolute top-5 right-5 text-gray-700 hover:text-red-500"
          >
            <FaTimes size={20} />
          </button>
          <nav className="mt-20 flex flex-col space-y-6 text-lg">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={toggleMenu}
                  className={`${isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                    } hover:text-blue-600 transition`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href="/generator"
              onClick={toggleMenu}
              className="block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg text-center shadow hover:from-blue-600 hover:to-indigo-600 transition"
            >
              Dashboard
            </Link>

            {(cookieExists === "exists" || isAuthenticated) && (
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-3 rounded-lg shadow hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}


    </nav>
  );
};

export default Header;

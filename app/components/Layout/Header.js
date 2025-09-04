"use client";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { FaFileAlt, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { AppContext } from "@/app/context/AppContext";

const Header = () => {
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) setIsAuthenticated(true);
  }, [setIsAuthenticated]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (page) => {
    setActive(page);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <FaFileAlt className="text-white text-sm" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent">
              Our Offer Letter Platform
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/recent"
              onClick={() => handleNavClick("recent")}
              className={`text-gray-600 hover:text-blue-600 ${active === "recent" ? "border-b-2 border-blue-600" : ""}`}
            >
              Recent
            </Link>
            <Link
              href="/pending"
              onClick={() => handleNavClick("pending")}
              className={`text-gray-600 hover:text-blue-600 ${active === "pending" ? "border-b-2 border-blue-600" : ""}`}
            >
              Pending
            </Link>
            <Link
              href="/generator"
              onClick={() => handleNavClick("generator")}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-indigo-600"
            >
              Dashboard
            </Link>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 p-6">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
          >
            <FaTimes size={20} />
          </button>
          <nav className="mt-16 flex flex-col space-y-6">
            <Link href="/recent" className="block text-gray-800 text-lg hover:text-blue-600">
              Recent
            </Link>
            <Link href="/pending" className="block text-gray-800 text-lg hover:text-blue-600">
              Pending
            </Link>
            <Link
              href="/generator"
              className="block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full text-center hover:from-blue-600 hover:to-indigo-600"
            >
              Dashboard
            </Link>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="w-full mt-4 bg-red-500 text-white py-3 rounded-full hover:bg-red-600 transition"
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

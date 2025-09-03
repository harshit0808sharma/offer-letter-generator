'use client'
import { AppContext } from "@/app/context/AppContext";
import Link from "next/link";
import { useContext, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  const [open, setOpen] = useState(false);
  const { setCategory } = useContext(AppContext);

  return (
    <section className="min-h-screen relative pt-20 pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-indigo-100/50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              The Salon Company{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Offer Letters
              </span>{" "}
              Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Enter candidate details, customize your template, and download
              instantly. Save time and ensure accuracy with every letter.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => setOpen(true)} className="flex items-center gap-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-105 shadow-lg">
                <span>Get Started</span> <FaArrowRightLong className="rotate-y-45" />
              </button>
              <Link href="https://the-salon-company.vercel.app/" className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                Our Website
              </Link>
            </div>
          </div>
          {open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-80 flex flex-col gap-6 text-center animate-fadeIn">
                <h1 className="text-xl font-semibold text-gray-800">Define The Job Type</h1>

                <div className="flex flex-col gap-3">
                  <Link
                    href="/generator"
                    onClick={() => setCategory("Full-Time")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                  >
                    Full-Time
                  </Link>
                  <Link
                    href="/generator"
                    onClick={() => setCategory("Internship")}
                    className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                  >
                    Internship
                  </Link>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="mt-2 text-sm text-gray-500 hover:text-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}


          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>

                <div className="space-y-4">
                  <div className="h-8 bg-gradient-to-r from-blue-300 to-indigo-300 rounded  flex justify-center items-center">You Name</div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gradient-to-r from-yellow-50 to-orange-100 rounded  flex justify-center items-center">Location</div>
                  <div className="grid grid-cols-2 gap-2 pt-4">
                    <div className="h-16 bg-blue-200 rounded flex justify-center items-center">Your Profession</div>
                    <div className="h-16 bg-indigo-200 rounded flex justify-center items-center">Salary $</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

"use client";

import { useEffect, useState } from "react";
import {
  FaFilePdf,
  FaCalendarAlt,
  FaUser,
  FaMapMarkerAlt,
  FaDollarSign,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const RecentLetters = () => {
  const [recentLetters, setRecentLetters] = useState([]);
  useEffect(() => {
    const stored = localStorage.getItem("recentLetters");
    if (stored) {
      setRecentLetters(JSON.parse(stored));
    }
  }, []);
  const clearAllLetters = () => {
    if (recentLetters.length === 0) {
      toast.info("No letters to clear");
      return;
    }

    localStorage.removeItem("recentLetters");
    setRecentLetters([]);
    toast.success("All recent letters have been cleared");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <FaFilePdf className="text-red-500" />
                Recent Offer Letters
              </h1>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                All the recently generated offer letters will appear here.
              </p>
            </div>
            <button
              onClick={clearAllLetters}
              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-medium shadow transition"
            >
              <FaTrash />
              Clear All
            </button>
          </div>

          {recentLetters.length === 0 ? (
            <div className="text-center text-gray-500 mt-10 text-sm sm:text-base">
              No recent letters found. Generate one to see it here.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentLetters.map((letter, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-5 border hover:shadow-lg transition duration-200"
                >
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <FaUser className="text-blue-600" />
                    {letter.candidateName}
                  </h2>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-500" /> Joining Date:{" "}
                      {letter.joiningDate || "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-500" /> Location:{" "}
                      {letter.location || "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaDollarSign className="text-gray-500" /> Salary:{" "}
                      {letter.salary || "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaFilePdf className="text-gray-500" /> Job Title:{" "}
                      {letter.jobTitle || "N/A"}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Generated on:{" "}
                      {new Date(letter.generatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecentLetters;

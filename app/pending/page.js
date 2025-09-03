"use client";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

export default function PendingPage() {
  const { pendingLetters, deletePendingLetter, editPendingLetter } = useContext(AppContext);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-blue-100/50 to-indigo-100/50 py-8 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
          Our Pending Offer Letters
        </h1>

        {pendingLetters.length === 0 ? (
          <p className="text-center text-gray-600">No pending letters right now.</p>
        ) : (
          <div className="grid gap-4">
            {pendingLetters.map((letter) => (
              <div
                key={letter.id}
                className="p-4 sm:p-6 bg-white shadow-md rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 border border-gray-100 hover:shadow-lg transition"
              >
                {/* Letter Details */}
                <div className="flex-1 text-sm sm:text-base">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {letter.candidateName}
                  </h2>
                  <p className="text-gray-700">{letter.jobTitle} - {letter.location}</p>
                  <p className="text-gray-600">Start Date: {letter.joiningDate || "N/A"}</p>
                  <p className="text-gray-600">Salary: {letter.salary || "N/A"}</p>
                  <p className="text-gray-600">Type: {letter.category}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 sm:gap-4">
                  <button
                    onClick={() => editPendingLetter(letter.id)}
                    className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePendingLetter(letter.id)}
                    className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

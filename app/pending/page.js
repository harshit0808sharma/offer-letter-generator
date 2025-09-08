"use client";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaInbox } from "react-icons/fa";
import { toast } from "react-toastify";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function PendingPage() {
  const { pendingLetters, deletePendingLetter, editPendingLetter } = useContext(AppContext);

  const handleDelete = (id) => {
    deletePendingLetter(id);
    toast.success("Letter deleted successfully!");
  };

  const handleEdit = (id) => {
    editPendingLetter(id);
    toast.info("Navigating to editor...");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-gray-900 text-center">
            Pending Offer Letters
          </h1>

          {pendingLetters.length === 0 ? (
            <motion.div
              className="text-center text-gray-500 py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaInbox className="text-8xl mx-auto mb-6 text-gray-300" />
              <p className="text-xl font-medium">No pending letters right now.</p>
              <p className="mt-2 text-gray-500">
                Any incomplete drafts you save will appear here.
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {pendingLetters.map((letter) => (
                <motion.div
                  key={letter.id}
                  className="p-6 sm:p-8 bg-white shadow-xl rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-6 border border-gray-200 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
                  variants={itemVariants}
                >
                  {/* Letter Details */}
                  <div className="flex-1 text-sm sm:text-base">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                      {letter.candidateName}
                    </h2>
                    <p className="text-gray-600 font-medium mb-2">
                      {letter.jobTitle} - <span className="text-gray-500">{letter.location}</span>
                    </p>
                    <div className="text-gray-700 space-y-1">
                      <p>
                        <span className="font-semibold">Start Date:</span> {letter.joiningDate || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Salary:</span> {letter.salary || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Type:</span> {letter.category}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <motion.button
                      onClick={() => handleEdit(letter.id)}
                      className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaEdit />
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(letter.id)}
                      className="px-5 py-2 text-sm font-semibold bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTrash />
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
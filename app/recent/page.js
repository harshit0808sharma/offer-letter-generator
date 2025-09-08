"use client";

import { useEffect, useState } from "react";
import {
    FaFilePdf,
    FaCalendarAlt,
    FaUser,
    FaMapMarkerAlt,
    FaDollarSign,
    FaTrash,
    FaRegListAlt,
    FaFolderOpen,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

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
            <div className="min-h-screen bg-gray-100 py-16 sm:py-24 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 flex items-center gap-3">
                                <FaRegListAlt className="text-purple-600" />
                                Recent Offer Letters
                            </h1>
                            <p className="text-gray-600 text-base sm:text-lg mt-2">
                                All your recently generated offer letters are saved here for easy access.
                            </p>
                        </div>
                        <motion.button
                            onClick={clearAllLetters}
                            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-sm sm:text-base font-medium shadow-md transition-all duration-300 transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaTrash />
                            Clear All
                        </motion.button>
                    </div>

                    {recentLetters.length === 0 ? (
                        <motion.div
                            className="text-center text-gray-500 py-20"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <FaFolderOpen className="text-7xl mx-auto mb-6 text-gray-300" />
                            <p className="text-xl font-medium">No recent letters found.</p>
                            <p className="mt-2 text-gray-500">
                                Generate one to see it appear here.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {recentLetters.map((letter, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white shadow-xl rounded-xl p-6 border border-gray-200 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                                    variants={itemVariants}
                                    whileHover={{ y: -5 }}
                                >
                                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                                        <FaUser className="text-blue-500 text-2xl" />
                                        {letter.candidateName}
                                    </h2>
                                    <div className="text-gray-600 space-y-3 text-sm">
                                        <div className="flex items-center gap-3">
                                            <FaCalendarAlt className="text-gray-400" />
                                            <p className="font-semibold">Joining Date:</p>
                                            <span className="text-gray-800">{letter.joiningDate || "N/A"}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaMapMarkerAlt className="text-gray-400" />
                                            <p className="font-semibold">Location:</p>
                                            <span className="text-gray-800">{letter.location || "N/A"}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaDollarSign className="text-gray-400" />
                                            <p className="font-semibold">Salary:</p>
                                            <span className="text-gray-800">{letter.salary || "N/A"}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaFilePdf className="text-gray-400" />
                                            <p className="font-semibold">Job Title:</p>
                                            <span className="text-gray-800">{letter.jobTitle || "N/A"}</span>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 mt-5 pt-3 text-xs text-gray-400">
                                        Generated on:{" "}
                                        {new Date(letter.generatedAt).toLocaleString()}
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
};

export default RecentLetters;
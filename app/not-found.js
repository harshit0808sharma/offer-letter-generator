"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFoundPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-950 text-white overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 to-slate-950"></div>
            
            {/* Animated Ring Decor */}
            <div className="absolute w-96 h-96 border-4 border-dashed border-gray-700 rounded-full animate-spin-slow"></div>
            <div className="absolute w-[450px] h-[450px] border-4 border-solid border-gray-800 rounded-full animate-spin-reverse-slow"></div>

            <motion.div
                className="relative z-10 text-center p-8 rounded-2xl bg-gray-800 bg-opacity-70 backdrop-blur-md shadow-2xl border border-gray-700"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div
                    className="mb-8"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.2 }}
                >
                    <FaExclamationTriangle className="text-7xl text-rose-500 mx-auto" />
                </motion.div>

                <motion.h1
                    className="text-8xl md:text-9xl font-extrabold mb-4 tracking-tighter"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    style={{
                        background: "linear-gradient(45deg, #FF6B6B, #F5A623)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    404
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-gray-300 mb-8 max-w-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    Oops! The page you are looking for does not exist.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <Link
                        href="/"
                        className="inline-block px-10 py-4 font-bold text-gray-900 bg-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                        Go Home
                    </Link>
                </motion.div>
            </motion.div>

            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-reverse-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                .animate-spin-reverse-slow {
                    animation: spin-reverse-slow 25s linear infinite;
                }
            `}</style>
        </div>
    );
}
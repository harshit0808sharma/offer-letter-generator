"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaUserTie, FaDownload, FaSave } from "react-icons/fa";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaFileAlt, FaEye, FaPalette, FaLaptop } from "react-icons/fa";

const Hero = () => {
  const [flipIndex, setFlipIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const cardData = [
    {
      title: "Smart Save System",
      description: "Automatically save candidate profiles with intelligent validation and backup",
      color: "from-emerald-400 via-teal-500 to-cyan-600",
      icon: <FaSave className="text-4xl text-white mb-4" />
    },
    {
      title: "Candidate Management",
      description: "Streamlined input system for candidate information",
      color: "from-violet-400 via-purple-500 to-indigo-600",
      icon: <FaUserTie className="text-4xl text-white mb-4" />
    },
    {
      title: "Instant Generation",
      description: "Fast PDF creation with professional templates",
      color: "from-blue-400 via-indigo-500 to-purple-600",
      icon: <FaDownload className="text-4xl text-white mb-4" />
    },
    {
      title: "Brand Integration",
      description: "Include your company's branding elements seamlessly",
      color: "from-orange-400 via-red-500 to-pink-600",
      icon: <FaPalette className="text-4xl text-white mb-4" />
    },
  ];

  const features = [
    { icon: <FaFileAlt className="text-purple-600 text-2xl" />, text: "Professional Templates" },
    { icon: <FaEye className="text-blue-600 text-2xl" />, text: "Real-time Preview" },
    { icon: <FaPalette className="text-pink-600 text-2xl" />, text: "Custom Branding" },
    { icon: <FaLaptop className="text-green-600 text-2xl" />, text: "Cross-Platform" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) setFlipIndex((prev) => (prev + 1) % cardData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [cardData.length, isHovered]);

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <section className="relative min-h-screen bg-gray-50 overflow-hidden">
      <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 border border-blue-200/50">
                <span className="text-sm font-medium text-blue-700">Powered By Offerly</span>
              </div>
            </motion.div>

            <motion.h1
              initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight"
            >
              Professional{" "}
              <span className="bg-indigo-600 bg-clip-text text-transparent">
                Offer Letters
              </span>{" "}Made Simple
            </motion.h1>

            <motion.p
              initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 leading-relaxed max-w-xl"
            >
              Create stunning offer letters in seconds. Powerful functionality meets clean design.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
            >
              <Link href="/generator">
                <motion.div whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-4 bg-indigo-600 text-white px-8 py-4 rounded-sm text-lg font-semibold shadow-2xl shadow-blue-500/25">
                  Start Creating Now <FaArrowRight />
                </motion.div>
              </Link>

              <Link href="/">
                <motion.div whileHover={{ scale: 1.05 }} className="inline-flex items-center px-8 py-4 text-lg font-semibold text-gray-700 border-2 border-gray-200 rounded-sm bg-white/50 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-lg">
                  Visit Main Site
                </motion.div>
              </Link>
            </motion.div>
          </div>

          <div className="relative flex flex-col justify-center lg:justify-end gap-10">
            <div className="w-full">
              <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={flipIndex}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative rounded-lg bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 w-full h-96 flex flex-col justify-center items-center text-center"
                  >
                    {/* Icon with minimal accent circle */}
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br ${cardData[flipIndex].color} shadow-sm`}
                    >
                      {cardData[flipIndex].icon}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {cardData[flipIndex].title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                      {cardData[flipIndex].description}
                    </p>

                    {/* Progress Dots */}
                    <div className="absolute bottom-5 flex gap-2">
                      {cardData.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setFlipIndex(i)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === flipIndex
                            ? "bg-gray-900 scale-125"
                            : "bg-gray-300 hover:bg-gray-400"
                            }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
            </div>
            {/* // Features Component */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {f.icon}
                  <span className="font-medium text-gray-800">{f.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaUserTie, FaDownload, FaPalette, FaSave, FaStar } from "react-icons/fa";
import { motion, AnimatePresence, useInView } from "framer-motion";

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
    { icon: "✨", text: "Professional Template", color: "text-purple-600" },
    { icon: "⚡", text: "Real-time Preview", color: "text-blue-600" },
    { icon: "🎨", text: "Custom Branding", color: "text-pink-600" },
    { icon: "📱", text: "Cross-Platform", color: "text-green-600" }
  ];

  const stats = [
    { number: "200+", label: "Employees Using Platform", color: "from-blue-500 to-indigo-500" },
    { number: "50+", label: "Internal Teams Supported", color: "from-purple-500 to-pink-500" },
    { number: "100%", label: "Internal Uptime", color: "from-green-500 to-teal-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) setFlipIndex((prev) => (prev + 1) % cardData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [cardData.length, isHovered]);

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
  const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 border border-blue-200/50">
                <FaStar className="text-yellow-500" />
                <span className="text-sm font-medium text-blue-700">Powered By Lokaci</span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight"
            >
              Professional{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
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
                <motion.div whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl shadow-blue-500/25">
                  Start Creating Now <FaArrowRight />
                </motion.div>
              </Link>

              <Link href="https://lokaci.com/">
                <motion.div whileHover={{ scale: 1.05 }} className="inline-flex items-center px-8 py-4 text-lg font-semibold text-gray-700 border-2 border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-lg">
                  Visit Main Site
                </motion.div>
              </Link>
            </motion.div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
              {features.map((f, i) => (
                <motion.div 
                  key={i}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={fadeUp}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm"
                >
                  <span className="text-xl">{f.icon}</span>
                  <span className={`font-medium ${f.color}`}>{f.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Content - Flip Card */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <div 
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={flipIndex}
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: 90, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`relative bg-gradient-to-br ${cardData[flipIndex].color} rounded-3xl shadow-2xl p-8 w-full h-96 flex flex-col justify-center items-center text-center text-white`}
                  >
                    {cardData[flipIndex].icon}
                    <h3 className="text-3xl font-bold mb-4">{cardData[flipIndex].title}</h3>
                    <p className="text-lg opacity-95">{cardData[flipIndex].description}</p>

                    {/* Simple Progress Dots */}
                    <div className="absolute bottom-6 flex gap-3">
                      {cardData.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setFlipIndex(i)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            i === flipIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <div className="flex items-center gap-8 bg-white/70 backdrop-blur-lg rounded-2xl px-8 py-4 shadow-lg border border-white/20">
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }} 
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

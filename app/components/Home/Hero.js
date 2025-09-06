'use client';

import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { FaArrowRight, FaUserTie, FaDownload, FaPalette, FaSave } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  // const [open, setOpen] = useState(false);
  // const { setCategory } = useContext(AppContext);

  const [flipIndex, setFlipIndex] = useState(0);
  const cardData = [
    { 
      title: "Easily Save", 
      description: "We can easily save the Candidate Profile after clicking on Save Button",
      color: "from-blue-400 to-indigo-500",
      icon: <FaSave className="text-3xl text-white mb-3" />
    },
    { 
      title: "Candidate Details", 
      description: "Simply enter candidate information - name, position, salary, and start date",
      color: "from-purple-400 to-pink-500",
      icon: <FaUserTie className="text-3xl text-white mb-3" />
    },
    { 
      title: "Instant Download", 
      description: "Generate and download your professional offer letter in PDF format instantly",
      color: "from-green-400 to-teal-500",
      icon: <FaDownload className="text-3xl text-white mb-3" />
    },
    { 
      title: "Our Branding", 
      description: "Add your company logo and customize colors to match your brand identity",
      color: "from-orange-400 to-red-500",
      icon: <FaPalette className="text-3xl text-white mb-3" />
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipIndex((prev) => (prev + 1) % cardData.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, [cardData.length]);

  return (
    <section className="min-h-screen relative pt-20 pb-32 overflow-hidden bg-gray-50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
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
              <Link
                href="/generator"
                // onClick={() => setOpen(true)}
                className="flex items-center gap-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-105 shadow-lg"
              >
                <span>Generate Offer Letter</span>
                <FaArrowRight style={{ transform: 'rotateY(45deg)' }} />
              </Link>

              <Link
                href="https://the-salon-company.vercel.app/"
                className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-xl hover:text-white group hover:bg-gray-50"
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-300 ease-in-out"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease-in-out">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="relative">Visit Main Site</span>
              </Link>
            </div>
          </div>

          {/* Flip Card Section */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={flipIndex}
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 90, opacity: 0 }}
                  transition={{ 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  className={`bg-gradient-to-br ${cardData[flipIndex].color} rounded-2xl shadow-2xl p-8 w-full h-80 flex flex-col justify-center items-center text-center text-white relative overflow-hidden`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-white"></div>
                    <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full border-2 border-white"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {cardData[flipIndex].icon}
                    <h3 className="text-2xl font-bold mb-4">
                      {cardData[flipIndex].title}
                    </h3>
                    <p className="text-lg leading-relaxed opacity-90">
                      {cardData[flipIndex].description}
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {cardData.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === flipIndex ? 'bg-white scale-125' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Feature List Below Card */}
              <div className="mt-8 space-y-3">
                {[
                  "✨ Highly Customizable",
                  "⚡ Instant PDF generation", 
                  "🎨 Our company branding",
                  "📱 Mobile-friendly interface"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="flex items-center gap-3 text-gray-600"
                  >
                    <span className="text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

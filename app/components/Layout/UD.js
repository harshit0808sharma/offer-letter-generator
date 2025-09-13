import React from 'react';
import { 
  FaCog, 
  FaHammer, 
  FaLaptopCode, 
  FaHardHat, 
  FaTools, 
  FaRocket,
  FaCode,
  FaPalette,
} from 'react-icons/fa';
import { 
  GiCrane, 
  GiGears 
} from 'react-icons/gi';
import { 
  MdConstruction, 
  MdBuild, 
} from 'react-icons/md';
import { FaExclamationTriangle } from "react-icons/fa"; 
import Link from 'next/link';


const UnderDevelopmentPage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 animate-bounce">
          <FaCog className="text-6xl text-blue-500 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <GiGears className="text-5xl text-yellow-500 animate-spin" style={{ animationDuration: '4s' }} />
        </div>
        <div className="absolute bottom-20 left-20 animate-bounce" style={{ animationDelay: '1s' }}>
          <MdBuild className="text-4xl text-blue-400" />
        </div>
        <div className="absolute bottom-40 right-10 animate-pulse" style={{ animationDelay: '2s' }}>
          <FaTools className="text-5xl text-yellow-400" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="bg-yellow-400 text-black px-6 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
              <FaExclamationTriangle className="inline mr-2" />
              UNDER CONSTRUCTION
            </div>
          </div>
        </div>

        {/* Main Illustration Area */}
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
            {/* Construction Scene */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side - Illustration */}
              <div className="relative">
                {/* Main Screen/Monitor */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 relative transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-blue-600 h-4 rounded-t-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="bg-gray-700 h-3 rounded w-3/4"></div>
                    <div className="bg-gray-700 h-3 rounded w-1/2"></div>
                    <div className="bg-yellow-400 h-3 rounded w-2/3"></div>
                    <div className="bg-gray-700 h-3 rounded w-5/6"></div>
                  </div>
                  
                  {/* Floating Code Icons */}
                  <div className="absolute -top-6 -right-6">
                    <div className="bg-blue-500 rounded-full p-3 animate-bounce">
                      <FaCode className="text-white text-xl" />
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4">
                    <div className="bg-yellow-500 rounded-full p-2 animate-pulse">
                      <FaPalette className="text-white text-lg" />
                    </div>
                  </div>
                </div>

                {/* Construction Elements */}
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4">
                  <GiCrane className="text-6xl text-yellow-500 animate-pulse" />
                </div>

                {/* Workers */}
                <div className="flex justify-center mt-8 space-x-8">
                  <div className="text-center animate-bounce" style={{ animationDelay: '0.5s' }}>
                    <div className="bg-blue-500 rounded-full p-4 mx-auto mb-2">
                      <FaHardHat className="text-white text-2xl" />
                    </div>
                    <div className="text-sm text-gray-600">Designer</div>
                  </div>
                  
                  <div className="text-center animate-bounce" style={{ animationDelay: '1s' }}>
                    <div className="bg-yellow-500 rounded-full p-4 mx-auto mb-2">
                      <FaLaptopCode className="text-white text-2xl" />
                    </div>
                    <div className="text-sm text-gray-600">Developer</div>
                  </div>
                  
                  <div className="text-center animate-bounce" style={{ animationDelay: '1.5s' }}>
                    <div className="bg-green-500 rounded-full p-4 mx-auto mb-2">
                      <FaRocket className="text-white text-2xl" />
                    </div>
                    <div className="text-sm text-gray-600">Tester</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="text-center lg:text-left">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                  We are Building
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 block">
                    Something Amazing
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Our team is working hard to bring you an incredible web experience. 
                  Stay tuned for something extraordinary!
                </p>

                {/* Progress Section */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Development Progress</span>
                    {/* <span className="text-sm font-bold text-blue-600">{Math.round(progress)}%</span> */}
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-1000 relative"
                    //   style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                    </div>
                  </div>
                  
                </div>

                {/* CTA Button */}
                <Link href="/" className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Back To Home
                  <FaRocket className="inline ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-12">
          <div className="flex justify-center space-x-6 text-gray-400">
            <FaCog className="text-2xl animate-spin" style={{ animationDuration: '3s' }} />
            <MdConstruction className="text-2xl animate-bounce" />
            <FaHammer className="text-2xl animate-pulse" />
            <GiGears className="text-2xl animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
          </div>
          
          <p className="text-gray-500 mt-4">
            Expected launch: <span className="font-semibold text-blue-600">Coming Soon</span>
          </p>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-1/4 left-1/4 opacity-20">
        <div className="animate-ping">
          <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
        </div>
      </div>
      
      <div className="absolute top-3/4 right-1/4 opacity-20" style={{ animationDelay: '2s' }}>
        <div className="animate-ping">
          <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
        </div>
      </div>
      
      <div className="absolute top-1/2 right-1/3 opacity-20" style={{ animationDelay: '4s' }}>
        <div className="animate-ping">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopmentPage;
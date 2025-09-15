'use client'
import React from 'react';
import { 
  FaLightbulb, 
  FaHandshake, 
  FaMagic, 
  FaSmile, 
  FaUser,
  FaFileAlt,
  FaBolt,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaStar,
  FaUsers,
  FaCog,
  FaChartLine,
  FaGlobe,
  FaLock,
  FaRocket
} from 'react-icons/fa';
import { 
  MdVerified,
  MdSpeed,
  MdSecurity
} from 'react-icons/md';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Link from 'next/link';
import { toast } from 'react-toastify';
import TeamSection from '../components/About/Team';
import TestimonialsSection from '../components/About/Testimonials';

const AboutPage = () => {
  const containerVariants = "opacity-100 translate-y-8 animate-in duration-700";
  const itemVariants = "opacity-0 translate-y-4 animate-in duration-500";

  const teamMembers = [
    { name: 'Sarah Lee', role: 'Product Manager', initials: 'SL' },
    { name: 'Michael Green', role: 'Lead Developer', initials: 'MG' },
    { name: 'Emma White', role: 'Customer Success', initials: 'EW' },
  ];

  const values = [
    { 
      icon: FaShieldAlt, 
      title: 'Trust & Security', 
      description: 'We ensure every offer letter is secure, accurate, and professionally crafted with enterprise-grade security.',
      color: 'text-blue-600 bg-blue-50'
    },
    { 
      icon: FaBolt, 
      title: 'Lightning Fast', 
      description: 'Generate professional offer letters in seconds, not hours. Streamline your hiring process effortlessly.',
      color: 'text-purple-600 bg-purple-50'
    },
    { 
      icon: FaSmile, 
      title: 'Delightful Experience', 
      description: 'Making onboarding seamless and stress-free for HR teams with intuitive design and smart automation.',
      color: 'text-green-600 bg-green-50'
    },
  ];

  const features = [
    { icon: FaCog, text: 'Customizable templates for any role' },
    { icon: MdVerified, text: 'Automated data validation' },
    { icon: FaFileAlt, text: 'Multi-format export options' },
    { icon: FaUsers, text: 'Real-time collaboration' },
    { icon: FaLock, text: 'Compliance-ready documents' },
    { icon: FaGlobe, text: 'Integration with HR systems' }
  ];

  const stats = [
    { number: '10K+', label: 'Letters Generated', icon: FaFileAlt },
    { number: '500+', label: 'Companies Trust Us', icon: FaHandshake },
    { number: '99.9%', label: 'Uptime Guarantee', icon: FaRocket },
    { number: '24/7', label: 'Support Available', icon: FaClock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <Header/>

      {/* Hero Section */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative">
          <div className={containerVariants}>
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FaLightbulb className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-600 bg-clip-text text-transparent">
                Revolutionizing
              </span>
              <br />
              <span className="text-gray-900">Offer Letter Creation</span>
            </h1>
            <p className="mt-8 text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Generate professional, compliant, and personalized offer letters in seconds. 
              Transform your hiring process with intelligent automation and beautiful design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link href="/generator" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
                Start Creating Letters
                <FaArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button onClick={()=> toast.info("Comming Soon!")} className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="text-white text-xl" />
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Offerly?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another tool. We're your partner in creating exceptional hiring experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className={`w-16 h-16 rounded-2xl ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Powerful features designed to streamline your entire offer letter workflow
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors duration-300">
                <div className="flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-lg">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection/>

      {/* Testimonials Section */}
      <TestimonialsSection/>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <FaRocket className="text-6xl mx-auto mb-6 text-blue-400" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Join thousands of companies already using Offerly to create professional offer letters in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
              Get Started Free
              <FaArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={()=> toast.info("Not Available!")} className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default AboutPage;
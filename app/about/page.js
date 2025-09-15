'use client'
import React from 'react';
import { 
  FaLightbulb, 
  FaHandshake, 
  FaSmile, 
  FaFileAlt,
  FaBolt,
  FaShieldAlt,
  FaClock,
  FaArrowRight,
  FaUsers,
  FaCog,
  FaGlobe,
  FaLock,
  FaRocket
} from 'react-icons/fa';
import { 
  MdVerified,
} from 'react-icons/md';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Link from 'next/link';
import { toast } from 'react-toastify';
import TeamSection from '../components/About/Team';
import TestimonialsSection from '../components/About/Testimonials';
import HeroSection from '../components/About/Hero';
import StatsSection from '../components/About/Stats';
import WhyChooseSection from '../components/About/Values';
import FeaturesSection from '../components/About/Features';
import CTASection from '../components/About/CTA';

const AboutPage = () => {
  const containerVariants = "opacity-100 translate-y-8 animate-in duration-700";

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
      <HeroSection/>

      {/* Stats Section */}
      <StatsSection stats={stats}/>

      {/* Core Values Section */}
      <WhyChooseSection values={values}/>

      {/* Features Section */}
      <FeaturesSection features={features}/>

      {/* Team Section */}
      <TeamSection/>

      {/* Testimonials Section */}
      <TestimonialsSection/>

      {/* CTA Section */}
      <CTASection/>

      <Footer/>
    </div>
  );
};

export default AboutPage;
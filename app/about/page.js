'use client'
import React from 'react';
import { motion } from 'framer-motion';
import {
  FaRegLightbulb,
  FaHandshake,
  FaMagic,
  FaSmile,
  FaUserCircle
} from 'react-icons/fa';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import UnderDevelopmentPage from '../components/Layout/UD';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const teamMembers = [
  { name: 'Sarah Lee', role: 'HR Manager', image: '/images/logo.png' },
  { name: 'Michael Green', role: 'Lead Stylist', image: '/images/logo.png' },
  { name: 'Emma White', role: 'Client Experience', image: '/images/logo.png' },
];

const values = [
  { icon: FaHandshake, title: 'Integrity', description: 'Honest and transparent process for every team member.' },
  { icon: FaMagic, title: 'Innovation', description: 'Using modern tools to improve our hiring and salon experience.' },
  { icon: FaSmile, title: 'Excellence', description: 'Creating a smooth onboarding experience for new hires.' },
];

const AboutPage = () => {
    const isDevelopment = true;
    if(isDevelopment){
        return(
            <>
                <UnderDevelopmentPage/>
            </>
        )
    }
  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-indigo-50 via-indigo-100 to-indigo-50 text-gray-900">

        {/* Hero Section */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-4">
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
              <motion.div variants={itemVariants}>
                <FaRegLightbulb className="text-7xl text-indigo-600 mx-auto mb-6" />
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-5xl lg:text-6xl font-extrabold tracking-tight">
                Streamlined Offer Letters for Salon Professionals
              </motion.h1>
              <motion.p variants={itemVariants} className="mt-6 text-lg lg:text-xl text-indigo-900 max-w-3xl mx-auto leading-relaxed">
                Our platform simplifies the hiring process for salons, ensuring each candidate receives a professional offer letter quickly and efficiently.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-center mb-16 text-indigo-800"
          >
            Our Core Values
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="grid md:grid-cols-3 gap-10"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-indigo-900"
              >
                <value.icon className="text-6xl text-indigo-600 mx-auto mb-5" />
                <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
                <p className="text-indigo-700">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 py-20 bg-indigo-50">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-center mb-16 text-indigo-800"
          >
            Meet The Team
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16 flex-wrap"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center max-w-xs"
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-36 h-36 rounded-full mx-auto mb-5 object-cover shadow-xl border-4 border-indigo-200"
                  />
                ) : (
                  <FaUserCircle className="w-36 h-36 text-gray-300 mx-auto mb-5" />
                )}
                <h3 className="text-xl font-semibold text-indigo-900">{member.name}</h3>
                <p className="text-sm text-indigo-700">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default AboutPage;

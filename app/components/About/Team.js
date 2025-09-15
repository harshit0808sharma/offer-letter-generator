'use client'
import { motion } from 'framer-motion';
import { FaStar, FaUser } from 'react-icons/fa';

const teamMembers = [
  { initials: 'AK', name: 'Arjun Kumar', role: 'Product Manager' },
  { initials: 'SP', name: 'Sneha Patel', role: 'Lead Developer' },
  { initials: 'RV', name: 'Ravi Verma', role: 'UI/UX Designer' },
  { initials: 'NP', name: 'Neha Pillai', role: 'HR & Operations' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export default function TeamSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Passionate professionals dedicated to transforming how companies create offer letters
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16 flex-wrap"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.2 }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="text-center group"
              variants={itemVariants}
            >
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <span className="text-3xl font-bold text-white">{member.initials}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <FaStar className="w-4 h-4 text-yellow-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-gray-600 font-medium">{member.role}</p>
              <div className="mt-4 flex justify-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 cursor-pointer transition-colors">
                  <FaUser className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

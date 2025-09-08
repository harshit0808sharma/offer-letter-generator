'use client';

import { FaRobot, FaPalette, FaMobileAlt, FaBolt, FaBook } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FaBook className="w-9 h-9 text-rose-500" />,
    title: 'Professional Templates',
    desc: 'Automatically populate offer letters with smart templates tailored for your company.',
  },
  {
    icon: <FaBolt className="w-9 h-9 text-yellow-500" />,
    title: 'Real-Time Preview',
    desc: 'See exactly how your offer letter will look before generating the final PDF.',
  },
  {
    icon: <FaPalette className="w-9 h-9 text-cyan-500" />,
    title: 'Custom Branding',
    desc: "Integrate your company's logo, colors, and style for a professional touch.",
  },
  {
    icon: <FaMobileAlt className="w-9 h-9 text-emerald-500" />,
    title: 'Cross-Platform Access',
    desc: 'Use the platform on desktop, tablet, or mobile without losing functionality.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const FeaturesSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">

        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Key{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Features
          </span>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Everything you need to create, manage, and generate offer letters efficiently and professionally.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center items-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
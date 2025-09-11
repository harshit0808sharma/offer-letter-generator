'use client';

import { FaRobot, FaPalette, FaMobileAlt, FaBolt, FaBook } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FaBook className="w-8 h-8 text-blue-600" />,
    title: 'Professional Templates',
    desc: 'Automatically populate offer letters with smart templates tailored for your company.',
  },
  {
    icon: <FaBolt className="w-8 h-8 text-blue-600" />,
    title: 'Real-Time Preview',
    desc: 'See exactly how your offer letter will look before generating the final PDF.',
  },
  {
    icon: <FaPalette className="w-8 h-8 text-blue-600" />,
    title: 'Custom Branding',
    desc: "Integrate your company's logo, colors, and style for a professional touch.",
  },
  {
    icon: <FaMobileAlt className="w-8 h-8 text-blue-600" />,
    title: 'Cross-Platform Access',
    desc: 'Use the platform on desktop, tablet, or mobile without losing functionality.',
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const FeaturesSection = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Everything you need to create, manage, and generate offer letters efficiently and professionally.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group"
              variants={itemVariants}
            >
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 h-full transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1">
                
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of companies who trust our platform to streamline their hiring process.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Try It Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
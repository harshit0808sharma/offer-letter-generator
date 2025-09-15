'use client'
import { motion } from 'framer-motion';
import { FaRocket, FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 0.6, ease: 'easeOut' }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants} className="mb-8">
            <FaRocket className="text-6xl mx-auto mb-6 text-blue-400" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            Ready to Transform Your Hiring?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
          >
            Join thousands of companies already using Offerly to create professional offer letters in minutes.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
              Get Started Free
              <FaArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => toast.info("Not Available!")}
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Contact Sales
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

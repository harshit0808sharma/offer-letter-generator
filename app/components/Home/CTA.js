'use client'

import Link from "next/link";
import { motion } from "framer-motion";

const CTASection = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const blobVariants = {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative py-28 bg-gradient-to-br from-blue-700 to-purple-800 text-white overflow-hidden">
      {/* Animated blob shapes */}
      <motion.div
        className="absolute -top-20 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"
        variants={blobVariants}
        animate="animate"
      ></motion.div>
      <motion.div
        className="absolute bottom-10 -right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
        variants={blobVariants}
        animate="animate"
      ></motion.div>

      <div className="relative max-w-4xl mx-auto text-center px-6">
        <motion.div
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 md:p-14 shadow-2xl border border-white/20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
            Ready to Revolutionize Your Hiring?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto">
            Create your first customized offer letter in moments. Our platform is designed for speed and precision.
          </p>

          <Link
            href="/generator"
            className="inline-block bg-white text-purple-700 px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Get Started Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
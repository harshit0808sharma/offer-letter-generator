"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CTASection = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative py-24 bg-gray-50">
      <div className="relative max-w-5xl mx-auto text-center px-6">
        <motion.div
          className="bg-white rounded-2xl p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Generate professional, branded offer letters in seconds.  
            Simple. Fast. Reliable.
          </p>

          <Link
            href="/generator"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl text-lg font-medium shadow hover:bg-gray-800 transition-all duration-300"
          >
            Get Started Now →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

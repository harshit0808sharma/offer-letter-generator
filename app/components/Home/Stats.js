'use client'

import { motion } from 'framer-motion';
import { FaFileAlt, FaCheckCircle, FaHeadset } from 'react-icons/fa';

const stats = [
    { value: "500+", label: "Offer Letters Generated", icon: FaFileAlt, color: "text-purple-400" },
    { value: "99.9%", label: "Accuracy Rate", icon: FaCheckCircle, color: "text-teal-400" },
    { value: "24/7", label: "Support Availability", icon: FaHeadset, color: "text-rose-400" },
];

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const MissionSection = () => {
    return (
        <section className="bg-gray-900 text-white py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    className="grid lg:grid-cols-2 gap-16 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* Left Side: Mission Content */}
                    <div>
                        <motion.h2
                            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight"
                            variants={itemVariants}
                        >
                            Our Mission: Simplifying Offer Letter Creation
                        </motion.h2>
                        <motion.p
                            className="text-lg text-gray-300 mb-6 leading-relaxed"
                            variants={itemVariants}
                        >
                            We help businesses create professional offer letters quickly and accurately. Our platform automates the entire process so you can focus on hiring, not paperwork.
                        </motion.p>
                        <motion.p
                            className="text-gray-400 leading-relaxed"
                            variants={itemVariants}
                        >
                            Whether it is for full-time employees, interns, or contractors, our tool generates fully customized letters in minutes, ensuring consistency and accuracy every time.
                        </motion.p>
                    </div>

                    {/* Right Side: Stats */}
                    <div className="space-y-8 mt-12 lg:mt-0">
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    className="bg-gray-800 p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-gray-700"
                                    variants={itemVariants}
                                >
                                    <div className="flex items-center mb-4">
                                        <IconComponent className={`text-4xl ${stat.color}`} />
                                        <h3 className="text-5xl font-extrabold ml-4">
                                            {stat.value}
                                        </h3>
                                    </div>
                                    <p className="text-gray-300 text-lg">{stat.label}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default MissionSection;

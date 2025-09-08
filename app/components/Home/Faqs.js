'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqData = [
    {
        question: 'What is a offer letter?',
        answer: 'An offer letter is a formal document sent by a company to a candidate to confirm the terms of a potential job offer. It outlines key details like the job title, start date, salary, and employment conditions.',
    },
    {
        question: 'How do I generate an offer letter?',
        answer: 'To generate an offer letter, you simply need to fill out the required information in our intuitive form, such as candidate name, job title, and salary. Our platform will then instantly create a customized, professional offer letter for you.',
    },
    {
        question: 'Can I customize the templates?',
        answer: 'Yes! Our platform allows for extensive customization. You can easily add your company’s logo, branding colors, and specific clauses to ensure the offer letter aligns perfectly with your brand identity.',
    },
    {
        question: 'Is my data secure?',
        answer: 'Absolutely. We prioritize the security of your data. All information entered into our system is encrypted and handled with the highest standards of confidentiality to ensure your privacy.',
    },
    {
        question: 'What file formats are supported?',
        answer: 'Our platform primarily generates offer letters in a secure PDF format, ensuring that the document is easy to share, print, and view on any device without changes to its formatting.',
    },
];

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2,
                when: "beforeChildren",
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.section
            className="bg-white py-24"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Frequently Asked{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Questions
                        </span>
                    </h2>
                    <motion.p
                        className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
                        variants={itemVariants}
                    >
                        Find answers to the most common questions about our platform and how to generate offer letters.
                    </motion.p>
                </div>

                <div className="max-w-3xl mx-auto space-y-6">
                    {faqData.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-50 rounded-xl shadow-lg p-6 border border-gray-100"
                            variants={itemVariants}
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center text-left"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 pr-4">
                                    {faq.question}
                                </h3>
                                <span>
                                    <AnimatePresence mode="wait">
                                        {openIndex === index ? (
                                            <motion.span
                                                key="minus"
                                                initial={{ rotate: 180, opacity: 0 }}
                                                animate={{ rotate: 0, opacity: 1 }}
                                                exit={{ rotate: -180, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <FaMinus className="text-gray-600" />
                                            </motion.span>
                                        ) : (
                                            <motion.span
                                                key="plus"
                                                initial={{ rotate: -180, opacity: 0 }}
                                                animate={{ rotate: 0, opacity: 1 }}
                                                exit={{ rotate: 180, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <FaPlus className="text-gray-600" />
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </span>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="mt-4 overflow-hidden"
                                    >
                                        <p className="text-gray-600 leading-relaxed pt-2">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default FaqSection;
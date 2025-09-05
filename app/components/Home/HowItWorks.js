'use client'
import { FaUserPlus, FaEdit, FaDownload } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="w-8 h-8 text-indigo-600" />,
    title: "Add Candidate Details",
    desc: "Enter essential information like name, role, and location to get started.",
  },
  {
    icon: <FaEdit className="w-8 h-8 text-indigo-600" />,
    title: "Customize Template",
    desc: "Choose from professional templates and edit them to match your style.",
  },
  {
    icon: <FaDownload className="w-8 h-8 text-indigo-600" />,
    title: "Generate & Download",
    desc: "Get a ready-to-use offer letter instantly in PDF format.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Our platform makes creating offer letters simple, fast, and efficient. Follow these three easy steps.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center"
            >
              <div className="bg-indigo-50 p-4 rounded-full mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

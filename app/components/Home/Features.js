'use client'
import { FaClock, FaMagic, FaFilePdf } from "react-icons/fa";

const features = [
  { icon: <FaClock className="text-indigo-600 w-6 h-6" />, title: "Save Time", desc: "Generate offer letters instantly without manual editing." },
  { icon: <FaMagic className="text-indigo-600 w-6 h-6" />, title: "Customization", desc: "Tailor templates to your exact needs effortlessly." },
  { icon: <FaFilePdf className="text-indigo-600 w-6 h-6" />, title: "Instant Download", desc: "Get ready-to-use PDF files with one click." },
];

const FeatureSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our Platform?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition duration-300">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

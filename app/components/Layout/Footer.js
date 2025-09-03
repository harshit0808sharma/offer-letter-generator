import Link from "next/link";
import { FaFileAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Branding */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <FaFileAlt className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold">Offer Letter Platform</span>
            </div>
            <p className="text-gray-400">
              Quickly generate professional offer letters. Save time, stay accurate, and simplify onboarding.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <div className="space-y-2 text-gray-400 flex flex-col gap-2">
              <Link href="/generator">Dashboard</Link>
              <Link href="/recent">Pending Letters</Link>
              <Link href="pending">Pending</Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 The Salon Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

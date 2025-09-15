'use client';
import { useContext } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import LetterPreview from './components/LetterPreview';
import SidebarForm from './components/SidebarForm';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

export default function OfferLetterGenerator() {
  const { previewRef } = useContext(AppContext);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 text-black">
        <div className="container mx-auto px-0 md:px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
              <FaFileAlt className="text-blue-600" />
              Offer Letter Platform
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Internal platform for generating offer letters
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <SidebarForm />
            <LetterPreview previewRef={previewRef} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
'use client';

import { AppContext } from '@/app/context/AppContext';
import Image from 'next/image';
import { useContext } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import { categoryTemplates } from '@/app/assets/data';

const LetterPreview = ({ previewRef }) => {
  const { category, formData } = useContext(AppContext);

  const roleDescription = categoryTemplates[formData.jobTitle] || categoryTemplates.Default;

  const formatDate = (dateString) => {
    if (!dateString) return '[Joining Date]';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatSalary = (salary) => {
    if (!salary) return '[Salary]';
    return `₹${parseFloat(salary).toLocaleString()}`;
  };

  const employmentTypeText =
    category === 'Internship'
      ? `Internship (${formData.duration || '[Duration]'} months)`
      : 'Full-time';

  return (
    <div className="col-span-2 order-1">
      <div className="bg-white md:rounded-xl overflow-hidden border" style={{ borderColor: '#60A5FA' }}>
        {/* Header */}
        <div
          className="p-4 flex items-center gap-2"
          style={{ backgroundColor: '#2563EB', color: '#FFFFFF' }}
        >
          <FaFilePdf className="text-lg" />
          <h2 className="text-lg font-semibold">Offer Letter Preview - {category}</h2>
        </div>

        {/* Letter Container */}
        <div className="flex justify-center p-4" style={{ backgroundColor: '#F3F4F6' }}>
          <div
            ref={previewRef}
            className="w-full max-w-[794px] min-h-[1123px] p-6 sm:p-8 md:p-12 shadow-md border relative bg-white"
            style={{
              borderColor: '#E5E7EB',
              fontFamily: 'serif',
            }}
          >
            {/* Company Header */}
            <div className="text-center mb-8 border-b pb-6" style={{ borderColor: '#D1D5DB' }}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4">
                <Image
                  src="/images/LokaciLogo.png"
                  alt="Company Logo"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold" style={{ color: '#111827' }}>
                The Salon Company
              </h1>
              <p style={{ color: '#4B5563' }}>Professional Services</p>
              <p className="text-xs sm:text-sm" style={{ color: '#6B7280' }}>
                Lokaci H.Q., Sector 117, Noida | Phone: (555) 123-4567
              </p>
            </div>

            {/* Date */}
            <div className="text-right text-xs sm:text-sm mb-8" style={{ color: '#6B7280' }}>
              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>

            <div className="leading-7 space-y-6 text-sm sm:text-base" style={{ color: '#1F2937' }}>
              <p className="font-semibold">{formData.candidateName || '[Candidate Name]'}</p>

              <p className="font-semibold text-base sm:text-lg">Subject: Offer of Employment</p>

              <p>Dear {formData.candidateName || '[Candidate Name]'},</p>

              <p>{roleDescription}</p>

              <div>
                <p className="font-semibold mb-2">Position Details:</p>
                <div className="ml-4 space-y-1">
                  <p><strong>Job Title:</strong> {formData.jobTitle || '[Job Title]'}</p>
                  <p><strong>Start Date:</strong> {formatDate(formData.joiningDate)}</p>
                  <p><strong>Location:</strong> {formData.location || '[Work Location]'}</p>
                  <p><strong>Annual Salary:</strong> {formatSalary(formData.salary)} per year</p>
                  <p><strong>Employment Type:</strong> {employmentTypeText}</p>
                </div>
              </div>

              <p>
                Please confirm your acceptance of this offer by signing and returning this letter by{' '}
                {formData.joiningDate
                  ? new Date(new Date(formData.joiningDate).getTime() - 7 * 24 * 60 * 60 * 1000)
                    .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  : '[One week before joining date]'}
                . We look forward to welcoming you to our team!
              </p>

              {/* Signature Section */}
              <div className="mt-10">
                <p>Sincerely,</p>
                <div className="mt-6">
                  <p className="font-semibold">{formData.hrManagerName || '[HR Manager Name]'}</p>
                  <p className="text-xs sm:text-sm" style={{ color: '#6B7280' }}>Human Resources Manager</p>
                  <p className="text-xs sm:text-sm" style={{ color: '#6B7280' }}>Lokaci Private Limited</p>
                </div>
              </div>

              {/* Candidate Acceptance */}
              <div className="mt-16 pt-6 border-t" style={{ borderColor: '#D1D5DB' }}>
                <p className="text-sm font-semibold mb-4">Candidate Acceptance:</p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="border-b pb-1" style={{ borderColor: '#9CA3AF' }}>
                    <span className="text-xs sm:text-sm" style={{ color: '#6B7280' }}>Signature</span>
                  </div>
                  <div className="border-b pb-1" style={{ borderColor: '#9CA3AF' }}>
                    <span className="text-xs sm:text-sm" style={{ color: '#6B7280' }}>Date</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Page Footer */}
            <div className="absolute bottom-4 right-4 text-xs" style={{ color: '#9CA3AF' }}>
              Pages
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterPreview;
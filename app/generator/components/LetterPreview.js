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
      <div className="md:rounded-xl overflow-hidden border" style={{ backgroundColor: '#FFFFFF', borderColor: '#60A5FA' }}>
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
          <div ref={previewRef} className="space-y-6">

            {/* PAGE 1 */}
            <div
              className="page w-full max-w-[794px] border shadow-md"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E5E7EB',
                fontFamily: 'serif',
                minHeight: '1123px',
                pageBreakAfter: 'always',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Page 1 Header */}
              <div className="text-center pt-8 pb-6 px-8 border-b" style={{ borderColor: '#D1D5DB' }}>
                <div className="w-16 h-16 mx-auto mb-4">
                  <Image
                    unoptimized
                    src="/images/LokaciLogo.png"
                    alt="Company Logo"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
                <h1 className="text-xl font-bold mb-2" style={{ color: '#111827' }}>
                  The Salon Company
                </h1>
                <p className="text-sm mb-1" style={{ color: '#4B5563' }}>Professional Services</p>
                <p className="text-xs" style={{ color: '#6B7280' }}>
                  Lokaci H.Q., Sector 117, Noida | Phone: (555) 123-4567
                </p>
              </div>

              {/* Page 1 Content */}
              <div className="flex-1 px-8 py-6">
                <div className="text-right text-sm mb-6" style={{ color: '#6B7280' }}>
                  {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>

                <div className="space-y-6 text-sm leading-7" style={{ color: '#1F2937' }}>
                  <p className="font-semibold text-base">{formData.candidateName || '[Candidate Name]'}</p>

                  <p className="font-semibold text-lg">Subject: Offer of Employment</p>

                  <p>Dear {formData.candidateName || '[Candidate Name]'},</p>

                  <p>{roleDescription}</p>

                  <p>
                    We are pleased to extend this offer of employment to you for the position detailed below.
                    This offer is made based on your qualifications, experience, and the positive impression
                    you made during our interview process.
                  </p>

                  <div>
                    <p className="font-semibold mb-4">Position Details:</p>
                    <div className="p-4 rounded border space-y-2" style={{ backgroundColor: '#F9FAFB', borderColor: '#E5E7EB' }}>
                      <p><strong>Job Title:</strong> {formData.jobTitle || '[Job Title]'}</p>
                      <p><strong>Start Date:</strong> {formatDate(formData.joiningDate)}</p>
                      <p><strong>Work Location:</strong> {formData.location || '[Work Location]'}</p>
                      <p><strong>Annual Salary:</strong> {formatSalary(formData.salary)} per year</p>
                      <p><strong>Employment Type:</strong> {employmentTypeText}</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold mb-3">What to Expect:</p>
                    <ul className="ml-6 space-y-1" style={{ listStyleType: 'disc' }}>
                      <li>Comprehensive onboarding program during your first week</li>
                      <li>Access to company benefits and professional development opportunities</li>
                      <li>Collaborative work environment with experienced team members</li>
                      <li>Regular performance reviews and career growth discussions</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Page 1 Footer */}
              {/* <div className="text-center py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                <p className="text-xs" style={{ color: '#9CA3AF' }}>Page 1 of 3</p>
              </div> */}
            </div>

            {/* PAGE 2 */}
            <div
              className="page w-full max-w-[794px] border shadow-md"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E5E7EB',
                fontFamily: 'serif',
                minHeight: '1123px',
                pageBreakAfter: 'always',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Page 2 Header */}
              <div className="text-center pt-8 pb-6 px-8 border-b" style={{ borderColor: '#D1D5DB' }}>
                <div className="w-16 h-16 mx-auto mb-4">
                  <Image
                    unoptimized
                    src="/images/LokaciLogo.png"
                    alt="Company Logo"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
                <h1 className="text-xl font-bold mb-2" style={{ color: '#111827' }}>
                  The Salon Company
                </h1>
                <p className="text-sm mb-1" style={{ color: '#4B5563' }}>Professional Services</p>
                <p className="text-xs" style={{ color: '#6B7280' }}>
                  Lokaci H.Q., Sector 117, Noida | Phone: (555) 123-4567
                </p>
              </div>

              {/* Page 2 Content */}
              <div className="flex-1 px-8 py-6">
                <div className="space-y-6 text-sm leading-7" style={{ color: '#1F2937' }}>
                  <p className="font-semibold text-lg">Terms and Conditions</p>

                  <div>
                    <p className="font-semibold mb-2">1. Employment Terms:</p>
                    <ul className="ml-6 space-y-1" style={{ listStyleType: 'disc' }}>
                      <li>This offer is contingent upon successful completion of background verification</li>
                      <li>The first 90 days will be considered a probationary period</li>
                      <li>Either party may terminate employment with appropriate notice</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2">2. Compensation & Benefits:</p>
                    <ul className="ml-6 space-y-1" style={{ listStyleType: 'disc' }}>
                      <li>Salary will be paid monthly as per company payroll schedule</li>
                      <li>Eligible for annual performance-based salary review</li>
                      <li>Health insurance coverage effective from your start date</li>
                      <li>Paid time off as per company policy</li>
                      <li>Professional development and training opportunities</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2">3. Confidentiality & Compliance:</p>
                    <ul className="ml-6 space-y-1" style={{ listStyleType: 'disc' }}>
                      <li>Required to sign confidentiality agreement</li>
                      <li>Acknowledgment of company policies and procedures</li>
                      <li>Compliance with all applicable laws and regulations</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2">4. Work Arrangements:</p>
                    <ul className="ml-6 space-y-1" style={{ listStyleType: 'disc' }}>
                      <li>Standard working hours: Monday to Friday, 9:00 AM to 6:00 PM</li>
                      <li>Reporting structure and team assignments will be provided</li>
                      <li>Remote work options available as per company policy</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded border" style={{ backgroundColor: '#EBF8FF', borderColor: '#BFDBFE' }}>
                    <p className="font-semibold mb-2" style={{ color: '#1E3A8A' }}>Important Notes:</p>
                    <p style={{ color: '#1E40AF' }}>
                      Please review all terms carefully. Any changes to this offer must be made in writing
                      and signed by both parties. If you have any questions, please contact our HR department.
                    </p>
                  </div>
                </div>
              </div>

              {/* Page 2 Footer */}
              {/* <div className="text-center py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                <p className="text-xs" style={{ color: '#9CA3AF' }}>Page 2 of 3</p>
              </div> */}
            </div>

            {/* PAGE 3 */}
            <div
              className="page w-full max-w-[794px] border shadow-md"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E5E7EB',
                fontFamily: 'serif',
                minHeight: '1123px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Page 3 Header */}
              <div className="text-center pt-8 pb-6 px-8 border-b" style={{ borderColor: '#D1D5DB' }}>
                <div className="w-16 h-16 mx-auto mb-4">
                  <Image
                    unoptimized
                    src="/images/LokaciLogo.png"
                    alt="Company Logo"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
                <h1 className="text-xl font-bold mb-2" style={{ color: '#111827' }}>
                  The Salon Company
                </h1>
                <p className="text-sm mb-1" style={{ color: '#4B5563' }}>Professional Services</p>
                <p className="text-xs" style={{ color: '#6B7280' }}>
                  Lokaci H.Q., Sector 117, Noida | Phone: (555) 123-4567
                </p>
              </div>

              {/* Page 3 Content */}
              <div className="flex-1 px-8 py-6">
                <div className="space-y-6 text-sm leading-7" style={{ color: '#1F2937' }}>
                  <p>
                    Please confirm your acceptance of this offer by signing and returning this letter by{' '}
                    <strong>
                      {formData.joiningDate
                        ? new Date(new Date(formData.joiningDate).getTime() - 7 * 24 * 60 * 60 * 1000)
                          .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                        : '[One week before joining date]'}
                    </strong>
                    . We look forward to welcoming you to our team and are excited about the contributions
                    you will make to our continued success.
                  </p>

                  <div>
                    <p className="font-semibold mb-3">Required Documents (Please bring on first day):</p>
                    <ul className="ml-6 space-y-1" style={{ listStyleType: 'disc' }}>
                      <li>Government-issued photo identification</li>
                      <li>Educational certificates and transcripts</li>
                      <li>Previous employment certificates (if applicable)</li>
                      <li>Address proof documents</li>
                      <li>Bank account details for salary processing</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2">Contact Information:</p>
                    <p className="mb-2">For any questions regarding this offer, please contact:</p>
                    <div className="ml-4">
                      <p><strong>Email:</strong> hr@lokaci.com</p>
                      <p><strong>Phone:</strong> (555) 123-4567</p>
                      <p><strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM</p>
                    </div>
                  </div>

                  {/* Company Signature */}
                  <div className="mt-8">
                    <p className="mb-6">Sincerely,</p>
                    <div className="mb-8">
                      <div className="mb-2 w-48" style={{ borderBottom: '1px solid #9CA3AF' }}></div>
                      <p className="font-semibold">{formData.hrManagerName || '[HR Manager Name]'}</p>
                      <p className="text-xs" style={{ color: '#6B7280' }}>Human Resources Manager</p>
                      <p className="text-xs" style={{ color: '#6B7280' }}>Lokaci Private Limited</p>
                    </div>
                  </div>

                  {/* Candidate Acceptance */}
                  <div className="pt-6" style={{ borderTop: '2px solid #D1D5DB' }}>
                    <p className="font-semibold mb-4">Candidate Acceptance</p>
                    <p className="mb-6">
                      I, <strong>{formData.candidateName || '[Candidate Name]'}</strong>, accept the terms
                      and conditions of this employment offer as outlined above.
                    </p>

                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="mb-2 h-8" style={{ borderBottom: '2px solid #9CA3AF' }}></div>
                        <p className="text-xs font-medium">Candidate Signature</p>
                      </div>
                      <div>
                        <div className="mb-2 h-8" style={{ borderBottom: '2px solid #9CA3AF' }}></div>
                        <p className="text-xs font-medium">Date</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Page 3 Footer */}
              {/* <div className="text-center py-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                <p className="text-xs" style={{ color: '#9CA3AF' }}>Page 3 of 3</p>
              </div> */}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterPreview;
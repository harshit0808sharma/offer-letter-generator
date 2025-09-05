// 'use client'


// import Image from 'next/image';
// import React, { useState, createContext, useContext } from 'react';
// import {
//     FaUser,
//     FaBriefcase,
//     FaCalendarAlt,
//     FaMapMarkerAlt,
//     FaDollarSign,
//     FaUserCheck,
//     FaClock,
//     FaFilePdf,
//     FaSave,
//     FaBuilding,
//     FaPhone,
//     FaEnvelope,
//     FaGlobe
// } from "react-icons/fa";


// // Context for form data
// const FormContext = createContext();

// const OfferLetterGenerator = () => {
//     const [formData, setFormData] = useState({
//         candidateName: '',
//         jobTitle: '',
//         jobType: 'full-time',
//         joiningDate: '',
//         location: '',
//         salary: '',
//         hrManager: '',
//         internshipDuration: ''
//     });

//     const updateFormData = (field, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     const handleGeneratePDF = () => {
//         alert('PDF generation would be implemented with a library like jsPDF or Puppeteer');
//     };

//     const handleSaveToPending = () => {
//         alert('Save to pending functionality would connect to your backend API');
//     };

//     return (
//         <FormContext.Provider value={{ formData, updateFormData }}>
//             <div className="min-h-screen bg-gray-50">
//                 {/* Header */}
//                 <Header />

//                 {/* Main Content */}
//                 <main className="container mx-auto px-4 py-8">
//                     <div className="grid lg:grid-cols-2 gap-8">
//                         {/* Left Side - Form */}
//                         <FormSection
//                             onGeneratePDF={handleGeneratePDF}
//                             onSaveToPending={handleSaveToPending}
//                         />

//                         {/* Right Side - Preview */}
//                         <PreviewSection />
//                     </div>
//                 </main>
//             </div>
//         </FormContext.Provider>
//     );
// };

// const Header = () => {
//     return (
//         <header className="bg-white shadow-sm border-b border-gray-200">
//             <div className="container mx-auto px-4 py-4">
//                 <div className="flex items-center justify-between">
//                     {/* Logo */}
//                     <div className="flex items-center space-x-3">
//                         <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//                             <FaBuilding className="w-6 h-6 text-white" />
//                         </div>
//                         <div>
//                             <h1 className="text-xl font-bold text-gray-900">Lokaci</h1>
//                             <p className="text-sm text-gray-500">HR Solutions</p>
//                         </div>
//                     </div>

//                     {/* Navigation */}
//                     <nav className="hidden md:flex items-center space-x-6">
//                         <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard</a>
//                         <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Templates</a>
//                         <a href="#" className="text-blue-600 font-medium">Offer Letters</a>
//                         <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Settings</a>
//                     </nav>
//                 </div>
//             </div>
//         </header>
//     );
// };

// const FormSection = ({ onGeneratePDF, onSaveToPending }) => {
//     const { formData, updateFormData } = useContext(FormContext);

//     return (
//         <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
//             <div className="mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Offer Letter</h2>
//                 <p className="text-gray-600">Fill in the candidate details to generate a professional offer letter</p>
//             </div>

//             <div className="space-y-6">
//                 {/* Candidate Name */}
//                 <FormInput
//                     label="Candidate Name"
//                     icon={FaUser}
//                     type="text"
//                     placeholder="Enter full name"
//                     value={formData.candidateName}
//                     onChange={(value) => updateFormData('candidateName', value)}
//                 />

//                 {/* Job Title */}
//                 <FormInput
//                     label="Job Title"
//                     icon={FaBriefcase}
//                     type="text"
//                     placeholder="Enter job position"
//                     value={formData.jobTitle}
//                     onChange={(value) => updateFormData('jobTitle', value)}
//                 />

//                 {/* Job Type */}
//                 <div className="space-y-2">
//                     <label className="flex items-center text-sm font-medium text-gray-700">
//                         <FaUserCheck className="w-4 h-4 mr-2 text-blue-600" />
//                         Job Type
//                     </label>
//                     <select
//                         value={formData.jobType}
//                         onChange={(e) => updateFormData('jobType', e.target.value)}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     >
//                         <option value="full-time">Full-time</option>
//                         <option value="part-time">Part-time</option>
//                         <option value="internship">Internship</option>
//                         <option value="contract">Contract</option>
//                     </select>
//                 </div>

//                 {/* Internship Duration - Conditional */}
//                 {formData.jobType === 'internship' && (
//                     <FormInput
//                         label="Internship Duration"
//                         icon={FaClock}
//                         type="text"
//                         placeholder="e.g., 3 months, 6 months"
//                         value={formData.internshipDuration}
//                         onChange={(value) => updateFormData('internshipDuration', value)}
//                     />
//                 )}

//                 {/* Joining Date */}
//                 <FormInput
//                     label="Joining Date"
//                     icon={FaCalendarAlt}
//                     type="date"
//                     value={formData.joiningDate}
//                     onChange={(value) => updateFormData('joiningDate', value)}
//                 />

//                 {/* Location */}
//                 <FormInput
//                     label="Work Location"
//                     icon={FaMapMarkerAlt}
//                     type="text"
//                     placeholder="Enter office location"
//                     value={formData.location}
//                     onChange={(value) => updateFormData('location', value)}
//                 />

//                 {/* Salary */}
//                 <FormInput
//                     label="Salary/Compensation"
//                     icon={FaDollarSign}
//                     type="text"
//                     placeholder="Enter annual salary"
//                     value={formData.salary}
//                     onChange={(value) => updateFormData('salary', value)}
//                 />

//                 {/* HR Manager */}
//                 <FormInput
//                     label="HR Manager"
//                     icon={FaUserCheck}
//                     type="text"
//                     placeholder="Enter HR manager name"
//                     value={formData.hrManager}
//                     onChange={(value) => updateFormData('hrManager', value)}
//                 />

//                 {/* Action Buttons */}
//                 <div className="flex gap-4 pt-4">
//                     <button
//                         onClick={onGeneratePDF}
//                         className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
//                     >
//                         <FaFilePdf className="w-5 h-5" />
//                         <span>Generate PDF</span>
//                     </button>
//                     <button
//                         onClick={onSaveToPending}
//                         className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 border border-gray-300"
//                     >
//                         <FaSave className="w-5 h-5" />
//                         <span>Save to Pending</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const FormInput = ({ label, icon: Icon, type, placeholder, value, onChange }) => {
//     return (
//         <div className="space-y-2">
//             <label className="flex items-center text-sm font-medium text-gray-700">
//                 <Icon className="w-4 h-4 mr-2 text-blue-600" />
//                 {label}
//             </label>
//             <input
//                 type={type}
//                 placeholder={placeholder}
//                 value={value}
//                 onChange={(e) => onChange(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
//             />
//         </div>
//     );
// };

// const PreviewSection = () => {
//     const { formData } = useContext(FormContext);

//     const formatDate = (dateString) => {
//         if (!dateString) return '[Joining Date]';
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     return (
//         <div className="bg-white rounded-xl shadow-lg p-6">
//             <div className="mb-4">
//                 <h3 className="text-xl font-bold text-gray-900 mb-1">Live Preview</h3>
//                 <p className="text-gray-600 text-sm">See how your offer letter will look</p>
//             </div>

//             {/* Preview Content */}
//             <div className="bg-white border-2 border-gray-200 rounded-lg p-8 space-y-6 text-sm">
//                 {/* Company Header */}
//                 <div className="text-center border-b border-gray-200 pb-6">
//                     <div className="flex items-center justify-center mb-4">
//                         <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center">
//                             <Image src="/images/LokaciLogo.png" alt='logo' width={200} height={200} />

//                         </div>
//                     </div>
//                     {/* <Image src="/images/LokaciLogo.png" alt='logo' width={200} height={200}/> */}
//                     <h1 className="text-2xl font-bold text-gray-900">Lokaci</h1>
//                     <div className="text-gray-600 space-y-1 mt-2">
//                         <div className="flex items-center justify-center space-x-4">
//                             <span className="flex items-center"><FaEnvelope className="w-4 h-4 mr-1" />hr@lokaci.com</span>
//                             <span className="flex items-center"><FaPhone className="w-4 h-4 mr-1" />+1 (555) 123-4567</span>
//                         </div>
//                         <div className="flex items-center justify-center">
//                             <FaGlobe className="w-4 h-4 mr-1" />
//                             <span>www.lokaci.com</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Letter Content */}
//                 <div className="space-y-4">
//                     <div className="text-right text-gray-600">
//                         {new Date().toLocaleDateString('en-US', {
//                             year: 'numeric',
//                             month: 'long',
//                             day: 'numeric'
//                         })}
//                     </div>

//                     <div>
//                         <p className="font-medium">Dear {formData.candidateName || '[Candidate Name]'},</p>
//                     </div>

//                     <div className="space-y-4 text-gray-700 leading-relaxed">
//                         <p>
//                             We are pleased to offer you the position of <strong>{formData.jobTitle || '[Job Title]'}</strong> at TechCorp Solutions. We believe your skills and experience will be a valuable addition to our team.
//                         </p>

//                         <div className="bg-gray-50 p-4 rounded-lg space-y-2">
//                             <h4 className="font-semibold text-gray-900">Position Details:</h4>
//                             <div className="grid grid-cols-1 gap-2 text-sm">
//                                 <div><strong>Position:</strong> {formData.jobTitle || '[Job Title]'}</div>
//                                 <div><strong>Employment Type:</strong> {formData.jobType ? formData.jobType.charAt(0).toUpperCase() + formData.jobType.slice(1) : '[Job Type]'}</div>
//                                 {formData.jobType === 'internship' && formData.internshipDuration && (
//                                     <div><strong>Duration:</strong> {formData.internshipDuration}</div>
//                                 )}
//                                 <div><strong>Start Date:</strong> {formatDate(formData.joiningDate)}</div>
//                                 <div><strong>Location:</strong> {formData.location || '[Work Location]'}</div>
//                                 <div><strong>Compensation:</strong> {formData.salary || '[Salary/Compensation]'}</div>
//                             </div>
//                         </div>

//                         <p>
//                             Please confirm your acceptance of this offer by signing and returning this letter by [Response Deadline]. We look forward to welcoming you to our team!
//                         </p>

//                         <p>
//                             If you have any questions, please don't hesitate to contact {formData.hrManager || '[HR Manager]'} or our HR department.
//                         </p>

//                         <p>
//                             Sincerely,<br />
//                             <strong>{formData.hrManager || '[HR Manager]'}</strong><br />
//                             <span className="text-gray-600">Human Resources Manager</span><br />
//                             <span className="text-gray-600">TechCorp Solutions</span>
//                         </p>
//                     </div>

//                     {/* Signature Section */}
//                     <div className="border-t border-gray-200 pt-6 space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                             <div>
//                                 <p className="text-sm text-gray-600 mb-2">Candidate Acceptance:</p>
//                                 <div className="border-b border-gray-300 mb-2 h-8"></div>
//                                 <p className="text-xs text-gray-500">{formData.candidateName || '[Candidate Name]'}</p>
//                                 <p className="text-xs text-gray-500">Date: _______________</p>
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-600 mb-2">Company Representative:</p>
//                                 <div className="border-b border-gray-300 mb-2 h-8"></div>
//                                 <p className="text-xs text-gray-500">{formData.hrManager || '[HR Manager]'}</p>
//                                 <p className="text-xs text-gray-500">Date: _______________</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
//                     <p>This offer is confidential and subject to company policies and applicable laws.</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default OfferLetterGenerator;
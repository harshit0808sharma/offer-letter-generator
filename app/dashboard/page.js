'use client'
import React, { useState } from 'react';
import { FaFile, FaBriefcase, FaUsers, FaDownload, FaPlus, FaTrash } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import UnderDevelopmentPage from '../components/Layout/UD';

const OfferLetterDashboard = () => {
    const isDevelopment = true;
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        candidateName: '',
        jobTitle: '',
        joiningDate: '',
        location: '',
        salary: '',
        hrManagerName: '',
        employmentType: 'Full-time',
        companyName: 'The Salon Company',
        companyAddress: 'Lokaci H.Q., Sector 117, Noida',
        companyPhone: '(555) 123-4567',
        companyEmail: 'hr@lokaci.com',
        probationPeriod: '90 days',
        workingHours: 'Monday to Friday, 9:00 AM to 6:00 PM',
        offerDeadline: '',
        officeHours: 'Monday - Friday, 9:00 AM - 5:00 PM',
        documentsRequired: ['Government ID', 'Educational Certificates', 'Previous Employment Letter']
    });

    const templates = [
        {
            id: 1,
            title: 'Standard Employment Offer',
            description: 'Perfect for full-time positions with comprehensive benefits',
            icon: <FaBriefcase className="w-6 h-6 text-blue-600" />,
            color: 'border-blue-200 hover:border-blue-300'
        },
        {
            id: 2,
            title: 'Executive Position Offer',
            description: 'Tailored for senior roles and leadership positions',
            icon: <FaUsers className="w-6 h-6 text-purple-600" />,
            color: 'border-purple-200 hover:border-purple-300'
        },
        {
            id: 3,
            title: 'Internship Offer Letter',
            description: 'Designed for internship and temporary positions',
            icon: <FaFile className="w-6 h-6 text-green-600" />,
            color: 'border-green-200 hover:border-green-300'
        }
    ];

    const handleTemplateClick = (template) => {
        setSelectedTemplate(template);
        setIsModalOpen(true);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addDocument = () => {
        setFormData(prev => ({
            ...prev,
            documentsRequired: [...prev.documentsRequired, '']
        }));
    };

    const removeDocument = (index) => {
        setFormData(prev => ({
            ...prev,
            documentsRequired: prev.documentsRequired.filter((_, i) => i !== index)
        }));
    };

    const updateDocument = (index, value) => {
        setFormData(prev => ({
            ...prev,
            documentsRequired: prev.documentsRequired.map((doc, i) => i === index ? value : doc)
        }));
    };

    const generatePDF = () => {
        // In a real implementation, you would use html2canvas and jsPDF here
        alert('PDF generation would be implemented here using html2canvas and jsPDF');
        setIsModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTemplate(null);
    };

    if(isDevelopment){
        return(
            <>
                <UnderDevelopmentPage/>
            </>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <FaFile className="w-8 h-8 text-blue-600" />
                            <h1 className="text-2xl font-bold text-gray-900">OfferLetterPro</h1>
                        </div>
                        <div className="text-sm text-gray-500">
                            Dashboard
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose a Template</h2>
                    <p className="text-lg text-gray-600">Select from our professional offer letter templates</p>
                </div>

                {/* Template Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            onClick={() => handleTemplateClick(template)}
                            className={`bg-white rounded-xl shadow-sm border-2 ${template.color} p-6 cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    {template.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">{template.title}</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{template.description}</p>
                            <div className="mt-4 inline-flex items-center text-sm text-blue-600 font-medium">
                                Use Template →
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-xl">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{selectedTemplate?.title}</h3>
                                <p className="text-gray-600">Fill in the details to generate your offer letter</p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <RxCross2 className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Candidate Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.candidateName}
                                            onChange={(e) => handleInputChange('candidateName', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="Enter candidate's full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Job Title *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.jobTitle}
                                            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="e.g., Software Engineer"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Joining Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.joiningDate}
                                            onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Location *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="e.g., New York, NY"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Salary *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.salary}
                                            onChange={(e) => handleInputChange('salary', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="e.g., $75,000 per year"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            HR Manager Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.hrManagerName}
                                            onChange={(e) => handleInputChange('hrManagerName', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="Enter HR manager's name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Employment Type
                                        </label>
                                        <select
                                            value={formData.employmentType}
                                            onChange={(e) => handleInputChange('employmentType', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        >
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.companyName}
                                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Address
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.companyAddress}
                                            onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Phone
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.companyPhone}
                                            onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Email
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.companyEmail}
                                            onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Probation Period
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.probationPeriod}
                                            onChange={(e) => handleInputChange('probationPeriod', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Office Hours
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.officeHours}
                                            onChange={(e) => handleInputChange('officeHours', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Offer Deadline
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.offerDeadline}
                                            onChange={(e) => handleInputChange('offerDeadline', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Documents Required */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Documents Required
                                </label>
                                <div className="space-y-3">
                                    {formData.documentsRequired.map((doc, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <input
                                                type="text"
                                                value={doc}
                                                onChange={(e) => updateDocument(index, e.target.value)}
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                placeholder={`Document ${index + 1}`}
                                            />
                                            <button
                                                onClick={() => removeDocument(index)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <FaTrash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={addDocument}
                                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        <FaPlus className="w-4 h-4" />
                                        <span>Add Document</span>
                                    </button>
                                </div>
                            </div>

                            {/* Generate Button */}
                            <div className="mt-8 flex justify-end space-x-4">
                                <button
                                    onClick={closeModal}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={generatePDF}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 font-medium"
                                >
                                    <FaDownload className="w-4 h-4" />
                                    <span>Generate PDF</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OfferLetterDashboard;
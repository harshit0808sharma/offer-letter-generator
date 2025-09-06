"use client";

import { useContext, useState } from "react";
import { AppContext } from "@/app/context/AppContext";
import { jobCategories } from "@/app/assets/data";
import { MdDelete, MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import {
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDollarSign,
  FaIdBadge,
  FaFilePdf,
  FaSave,
  FaBriefcase,
  FaClock,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaFileAlt,
} from "react-icons/fa";

const SidebarForm = () => {
  const { formData, setFormData, handleInputChange, generatePDF, category, savePendingLetter } =
    useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="order-1">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 max-h-[159vh] overflow-y-scroll scrollbar-none">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaUser className="text-blue-500" />
          Candidate Information
        </h2>

        <div className="space-y-5">
          {/* Candidate Name */}
          <div>
            <label className="form-label flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FaUser className="text-gray-500" />
              Candidate Name
            </label>
            <input
              type="text"
              value={formData.candidateName}
              onChange={(e) => handleInputChange("candidateName", e.target.value)}
              placeholder="Enter candidate's full name"
              className="form-input w-full"
            />
          </div>
          <div>
            <label className="form-label flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FaBriefcase className="text-gray-500" />
              Employment Type
            </label>
            <select
              value={formData.employmentType}
              onChange={(e) => handleInputChange("employmentType", e.target.value)}
              className="form-input w-full"
            >
              <option value="">Select Employment Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          {/* Internship Duration */}
          {category === "Internship" && (
            <div>
              <label className="form-label flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FaBriefcase className="text-gray-500" />
                Duration (months)
              </label>
              <input
                type="number"
                value={formData.duration || ""}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="e.g., 6"
                className="form-input w-full"
              />
            </div>
          )}

          {/* Job Title */}
          <div>
            <label className="form-label flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FaBriefcase className="text-gray-500" />
              Job Title
            </label>
            <select
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              className="form-input w-full"
            >
              <option value="">Select Job Title</option>
              {jobCategories.map((job, index) => (
                <option key={index} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>

          {/* Joining Date */}
          <div>
            <label className="form-label flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FaCalendarAlt className="text-gray-500" />
              Joining Date
            </label>
            <input
              type="date"
              value={formData.joiningDate}
              onChange={(e) => handleInputChange("joiningDate", e.target.value)}
              className="form-input w-full"
            />
          </div>

          {/* Work Location */}
          <div>
            <label className="form-label flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FaMapMarkerAlt className="text-gray-500" />
              Work Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="e.g., Noida, India"
              className="form-input w-full"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="form-label flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FaDollarSign className="text-gray-500" />
              Monthly Salary
            </label>
            <input
              type="number"
              value={formData.salary}
              onChange={(e) => handleInputChange("salary", e.target.value)}
              placeholder={category === "Internship" ? "e.g., 5000" : "e.g., 20000"}
              className="form-input w-full"
            />
          </div>

          {/* HR Manager */}
          <div>
            <label className="form-label flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FaIdBadge className="text-gray-500" />
              HR Manager Name
            </label>
            <input
              type="text"
              value={formData.hrManagerName}
              onChange={(e) => handleInputChange("hrManagerName", e.target.value)}
              placeholder="Enter HR manager's name"
              className="form-input w-full"
            />
          </div>
          {
            menuOpen ? (
              <><div>
                <label className="form-label flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <FaBuilding className="text-gray-500" />
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName || ""}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="e.g., The Salon Company"
                  className="form-input w-full"
                />
              </div>

                {/* Company Address */}
                <div>
                  <label className="form-label flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <FaMapMarkerAlt className="text-gray-500" />
                    Company Address
                  </label>
                  <input
                    type="text"
                    value={formData.companyAddress || ""}
                    onChange={(e) => handleInputChange("companyAddress", e.target.value)}
                    placeholder="e.g., Lokaci H.Q., Sector 117, Noida"
                    className="form-input w-full"
                  />
                </div>

                {/* Company Phone */}
                <div>
                  <label className="form-label flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <FaPhone className="text-gray-500" />
                    Company Phone
                  </label>
                  <input
                    type="text"
                    value={formData.companyPhone || ""}
                    onChange={(e) => handleInputChange("companyPhone", e.target.value)}
                    placeholder="e.g., (555) 123-4567"
                    className="form-input w-full"
                  />
                </div>

                {/* Company Email */}
                <div>
                  <label className="form-label flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <FaEnvelope className="text-gray-500" />
                    Company Email
                  </label>
                  <input
                    type="email"
                    value={formData.companyEmail || ""}
                    onChange={(e) => handleInputChange("companyEmail", e.target.value)}
                    placeholder="e.g., hr@lokaci.com"
                    className="form-input w-full"
                  />
                </div>
                <div>
                  <label className="form-label flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <FaClock className="text-gray-500" />
                    Office Hours
                  </label>
                  <input
                    type="text"
                    value={formData.officeHours || ""}
                    onChange={(e) => handleInputChange("officeHours", e.target.value)}
                    placeholder="e.g., Monday - Friday, 9:00 AM - 5:00 PM"
                    className="form-input w-full"
                  />
                </div>

                {/* Probation Period */}
                <div>
                  <label className="form-label flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <FaClock className="text-gray-500" />
                    Probation Period
                  </label>
                  <input
                    type="text"
                    value={formData.probationPeriod || ""}
                    onChange={(e) => handleInputChange("probationPeriod", e.target.value)}
                    placeholder="e.g., 90 days"
                    className="form-input w-full"
                  />
                </div>
                {/* Required Documents */}
                <div>
                  <label className="form-label flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FaFileAlt className="text-gray-500" />
                    Required Documents
                  </label>
                  <div className="space-y-2">
                    {formData.documentsRequired?.map((doc, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={doc}
                          onChange={(e) => {
                            const newDocs = [...formData.documentsRequired];
                            newDocs[index] = e.target.value;
                            setFormData(prev => ({ ...prev, documentsRequired: newDocs }));
                          }}
                          placeholder={`Document ${index + 1}`}
                          className="form-input w-full"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newDocs = formData.documentsRequired.filter((_, i) => i !== index);
                            setFormData(prev => ({ ...prev, documentsRequired: newDocs }));
                          }}
                          className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        setFormData(prev => ({
                          ...prev,
                          documentsRequired: [...prev.documentsRequired, ""],
                        }))
                      }
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Add Document
                    </button>
                  </div>
                </div>

                <button
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <MdExpandLess className={`text-gray-700 transition-transform duration-200 `} />
                </button>
              </>
            ) : (
              <>
                <button
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
                  onClick={() => setMenuOpen(true)}
                >
                  <MdExpandMore className={`text-gray-700 transition-transform duration-200`} />
                </button>

              </>
            )
          }

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={generatePDF}
              className="relative inline-flex gap-2 items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
            >
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>

              {/* Icon + Text in a row */}
              <span className="relative inline-flex items-center gap-2 text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                <FaFilePdf className="text-xl" />
                <span>Generate PDF</span>
              </span>
            </button>
            <button
              onClick={savePendingLetter}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2 text-white rounded-xl transition-colors duration-200"
            >
              <FaSave className="text-xl" />
              <span>Save to Pending</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarForm;
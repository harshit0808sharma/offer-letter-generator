"use client";

import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext";
import { jobCategories } from "@/app/assets/data";
import {
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDollarSign,
  FaIdBadge,
  FaFilePdf,
  FaSave,
  FaBriefcase,
} from "react-icons/fa";

const SidebarForm = () => {
  const { formData, handleInputChange, generatePDF, category, savePendingLetter } =
    useContext(AppContext);

  return (
    <div className="order-2 lg:order-1">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
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

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={generatePDF}
              className="btn-primary bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 flex items-center justify-center gap-2"
            >
              <FaFilePdf className="text-xl" />
              Generate PDF
            </button>

            <button
              onClick={savePendingLetter}
              className="btn-primary bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center gap-2"
            >
              <FaSave className="text-xl" />
              Save to Pending
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarForm;

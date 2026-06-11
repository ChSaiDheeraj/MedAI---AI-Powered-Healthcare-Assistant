import React from 'react';
import { Calendar, User, FileText, Download, Share2 } from 'lucide-react';
import { Prescription } from '../../types';

interface PrescriptionCardProps {
  prescription: Prescription;
  onView: (prescription: Prescription) => void;
}

export function PrescriptionCard({ prescription, onView }: PrescriptionCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {prescription.patientName}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>Dr. {prescription.doctorName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{prescription.date}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <FileText className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-gray-900 dark:text-white">
            {prescription.medications.length} Medications
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {prescription.medications.slice(0, 3).map((med, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm"
            >
              {med.name}
            </span>
          ))}
          {prescription.medications.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm">
              +{prescription.medications.length - 3} more
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => onView(prescription)}
        className="w-full py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium"
      >
        View Full Prescription
      </button>
    </div>
  );
}
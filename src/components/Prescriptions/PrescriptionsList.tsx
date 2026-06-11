import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { PrescriptionCard } from './PrescriptionCard';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { Prescription } from '../../types';

const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    patientId: 'p1',
    doctorId: 'd1',
    patientName: 'Rajesh Kumar',
    doctorName: 'Priya Sharma',
    date: '2024-01-15',
    language: 'en',
    instructions: 'Take medications as prescribed. Rest and drink plenty of fluids.',
    medications: [
      {
        id: 'm1',
        name: 'Paracetamol',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: '3 days',
        instructions: 'After meals',
        type: 'tablet',
        color: '#3B82F6'
      },
      {
        id: 'm2',
        name: 'Amoxicillin',
        dosage: '250mg',
        frequency: 'Three times daily',
        duration: '5 days',
        instructions: 'Before meals',
        type: 'capsule',
        color: '#10B981'
      }
    ]
  },
  {
    id: '2',
    patientId: 'p2',
    doctorId: 'd1',
    patientName: 'Priya Patel',
    doctorName: 'Priya Sharma',
    date: '2024-01-14',
    language: 'hi',
    instructions: 'Complete the full course of antibiotics.',
    medications: [
      {
        id: 'm3',
        name: 'Cough Syrup',
        dosage: '10ml',
        frequency: 'Three times daily',
        duration: '7 days',
        instructions: 'After meals',
        type: 'syrup',
        color: '#F59E0B'
      }
    ]
  }
];

export function PrescriptionsList() {
  const { language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  const filteredPrescriptions = mockPrescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('prescriptions', language)}
        </h2>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Prescription</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search prescriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Prescriptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrescriptions.map((prescription) => (
          <PrescriptionCard
            key={prescription.id}
            prescription={prescription}
            onView={setSelectedPrescription}
          />
        ))}
      </div>

      {filteredPrescriptions.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No prescriptions found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first prescription to get started'}
          </p>
        </div>
      )}
    </div>
  );
}
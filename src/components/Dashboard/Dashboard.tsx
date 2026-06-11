import React from 'react';
import { FileText, Clock, CheckCircle, Users } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';

export function Dashboard() {
  const { user, language, prescriptions, reminders } = useApp();

  const stats = [
    {
      title: t('totalPrescriptions', language),
      value: 142,
      icon: FileText,
      color: 'blue' as const,
      trend: { value: 12, isPositive: true }
    },
    {
      title: t('pendingReminders', language),
      value: 8,
      icon: Clock,
      color: 'yellow' as const,
      trend: { value: 5, isPositive: false }
    },
    {
      title: t('completedToday', language),
      value: 24,
      icon: CheckCircle,
      color: 'green' as const,
      trend: { value: 8, isPositive: true }
    },
    {
      title: t('patients', language),
      value: 89,
      icon: Users,
      color: 'purple' as const,
      trend: { value: 3, isPositive: true }
    }
  ];

  const recentPrescriptions = [
    {
      id: '1',
      patientName: 'Rajesh Kumar',
      date: '2024-01-15',
      medications: 2,
      status: 'Active'
    },
    {
      id: '2',
      patientName: 'Priya Patel',
      date: '2024-01-14',
      medications: 3,
      status: 'Completed'
    },
    {
      id: '3',
      patientName: 'Mohammed Ali',
      date: '2024-01-14',
      medications: 1,
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-blue-100">
          {user?.role === 'doctor' 
            ? "Ready to help your patients today? Start with voice prescriptions." 
            : "Keep track of your medications and stay healthy."}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Prescriptions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('recentPrescriptions', language)}
          </h3>
          <div className="space-y-3">
            {recentPrescriptions.map((prescription) => (
              <div key={prescription.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {prescription.patientName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {prescription.medications} medications • {prescription.date}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  prescription.status === 'Active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                }`}>
                  {prescription.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Reminders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('todaysReminders', language)}
          </h3>
          <div className="space-y-3">
            {[
              { time: '9:00 AM', medication: 'Paracetamol 500mg', taken: true },
              { time: '1:00 PM', medication: 'Amoxicillin 250mg', taken: false },
              { time: '9:00 PM', medication: 'Paracetamol 500mg', taken: false }
            ].map((reminder, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center space-x-3">
                  <div className={`h-3 w-3 rounded-full ${
                    reminder.taken ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {reminder.medication}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {reminder.time}
                    </p>
                  </div>
                </div>
                <CheckCircle className={`h-5 w-5 ${
                  reminder.taken ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
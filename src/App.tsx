import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { VoiceRecording } from './components/VoiceRecording/VoiceRecording';
import { PrescriptionsList } from './components/Prescriptions/PrescriptionsList';
import { PatientsList } from './components/Patients/PatientsList';
import { Profile } from './components/Profile/Profile';
import { Settings } from './components/Settings/Settings';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/AppContext';
import { t } from './utils/translations';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language } = useApp();

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return t('dashboard', language);
      case 'prescriptions': return t('prescriptions', language);
      case 'voice': return t('voiceRecording', language);
      case 'patients': return t('patients', language);
      case 'profile': return t('profile', language);
      case 'settings': return t('settings', language);
      default: return t('dashboard', language);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'prescriptions':
        return <PrescriptionsList />;
      case 'voice':
        return <VoiceRecording />;
      case 'patients':
        return <PatientsList />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-200">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          title={getPageTitle()}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
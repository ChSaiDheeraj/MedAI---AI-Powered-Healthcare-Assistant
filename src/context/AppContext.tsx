import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Language, Prescription, Reminder } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  prescriptions: Prescription[];
  setPrescriptions: (prescriptions: Prescription[]) => void;
  reminders: Reminder[];
  setReminders: (reminders: Reminder[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@medprompt.com',
    role: 'doctor',
    specialization: 'General Medicine',
    license: 'MH-12345',
    phone: '+91 98765 43210'
  });
  
  const [language, setLanguage] = useState<Language>('en');
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      language,
      setLanguage,
      prescriptions,
      setPrescriptions,
      reminders,
      setReminders
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
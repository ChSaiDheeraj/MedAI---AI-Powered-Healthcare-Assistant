export interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'patient';
  avatar?: string;
  phone?: string;
  specialization?: string;
  license?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  date: string;
  medications: Medication[];
  instructions: string;
  audioUrl?: string;
  language: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  type: 'tablet' | 'capsule' | 'syrup' | 'injection' | 'cream';
  color: string;
}

export interface Reminder {
  id: string;
  medicationId: string;
  medicationName: string;
  time: string;
  taken: boolean;
  date: string;
}

export type Language = 'en' | 'hi' | 'te';
export type Theme = 'light' | 'dark';
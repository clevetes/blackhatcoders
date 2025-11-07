export enum View {
  Home = 'HOME',
  Booking = 'BOOKING',
  Reports = 'REPORTS',
  Chatbot = 'CHATBOT',
  Emergency = 'EMERGENCY',
  Payments = 'PAYMENTS',
  Video = 'VIDEO',
  Login = 'LOGIN',
}

export enum UserRole {
  Patient = 'PATIENT',
  Doctor = 'DOCTOR',
  Staff = 'STAFF',
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ReportFile {
    name: string;
    size: number;
    id: string;
}
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AppointmentBooking from './components/AppointmentBooking';
import TestReports from './components/TestReports';
import Chatbot from './components/Chatbot';
import EmergencyCall from './components/EmergencyCall';
import Payments from './components/Payments';
import Footer from './components/Footer';
import VideoConsultation from './components/VideoConsultation';
import LoginPage from './components/LoginPage';
import { View } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.Home);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView(View.Home);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const renderView = () => {
    switch (currentView) {
      case View.Home:
        return <Hero setView={setCurrentView} />;
      case View.Booking:
        return <AppointmentBooking />;
      case View.Reports:
        return <TestReports />;
      case View.Chatbot:
        return <Chatbot />;
      case View.Emergency:
        return <EmergencyCall />;
      case View.Payments:
        return <Payments />;
      case View.Video:
        return <VideoConsultation />;
      default:
        return <Hero setView={setCurrentView} />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header setView={setCurrentView} currentView={currentView} onLogout={handleLogout} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
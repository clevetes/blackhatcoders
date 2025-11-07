import React from 'react';
import { View } from '../types';
import { CalendarIcon, ReportIcon, ChatIcon, AmbulanceIcon, VideoIcon, PaymentIcon } from './icons';

interface HeroProps {
  setView: (view: View) => void;
}

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}> = ({ icon, title, description, onClick }) => (
  <button
    onClick={onClick}
    className="bg-surface p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left flex flex-col items-center text-center"
  >
    <div className="mb-4 text-primary">{icon}</div>
    <h3 className="text-xl font-bold text-textPrimary mb-2">{title}</h3>
    <p className="text-textSecondary flex-grow">{description}</p>
  </button>
);


const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <div className="text-center animate-fade-in">
      <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 py-20 px-4 rounded-lg shadow-inner-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-4">
          Your Health, Connected.
        </h1>
        <p className="text-lg md:text-xl text-textSecondary max-w-3xl mx-auto mb-8">
          Seamlessly book appointments, manage your health records, and get instant assistance with our AI-powered virtual health hub.
        </p>
        <button
          onClick={() => setView(View.Booking)}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
        >
          Book a Consultation
        </button>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<CalendarIcon />}
          title="Easy Appointments"
          description="Find specialists and book your consultation in just a few clicks."
          onClick={() => setView(View.Booking)}
        />
        <FeatureCard
          icon={<VideoIcon />}
          title="Video Consultation"
          description="Connect with your doctor face-to-face through a secure video call."
          onClick={() => setView(View.Video)}
        />
        <FeatureCard
          icon={<ReportIcon />}
          title="Test Reports"
          description="Securely upload and manage all your medical reports in one place."
          onClick={() => setView(View.Reports)}
        />
        <FeatureCard
          icon={<ChatIcon />}
          title="AI Assistant"
          description="Get instant answers to your health questions from our smart chatbot."
          onClick={() => setView(View.Chatbot)}
        />
        <FeatureCard
          icon={<PaymentIcon className="w-10 h-10"/>}
          title="Payments & Refunds"
          description="Handle all your payments securely and manage refunds with ease."
          onClick={() => setView(View.Payments)}
        />
        <FeatureCard
          icon={<AmbulanceIcon />}
          title="Emergency Help"
          description="Quickly call for an ambulance and share your location in an emergency."
          onClick={() => setView(View.Emergency)}
        />
      </div>
    </div>
  );
};

export default Hero;
import React from 'react';
import { View } from '../types';

interface HeaderProps {
  setView: (view: View) => void;
  currentView: View;
  onLogout: () => void;
}

const NavLink: React.FC<{
  view: View;
  setView: (view: View) => void;
  currentView: View;
  children: React.ReactNode;
}> = ({ view, setView, currentView, children }) => {
  const isActive = currentView === view;
  return (
    <button
      onClick={() => setView(view)}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-primary-dark text-white'
          : 'text-slate-700 hover:bg-indigo-100 hover:text-primary-dark'
      }`}
    >
      {children}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ setView, currentView, onLogout }) => {
  return (
    <header className="sticky top-0 bg-surface/80 backdrop-blur-md shadow-md z-50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => setView(View.Home)} className="flex-shrink-0 flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              <span className="text-xl font-bold text-textPrimary">Smart Health Guard</span>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink view={View.Booking} setView={setView} currentView={currentView}>Booking</NavLink>
              <NavLink view={View.Video} setView={setView} currentView={currentView}>Video Call</NavLink>
              <NavLink view={View.Reports} setView={setView} currentView={currentView}>Reports</NavLink>
              <NavLink view={View.Chatbot} setView={setView} currentView={currentView}>AI Assistant</NavLink>
              <NavLink view={View.Payments} setView={setView} currentView={currentView}>Payments</NavLink>
              <NavLink view={View.Emergency} setView={setView} currentView={currentView}>Emergency</NavLink>
              <button onClick={onLogout} className="bg-accent hover:bg-orange-600 text-white font-medium px-3 py-2 rounded-md text-sm transition-colors duration-200">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
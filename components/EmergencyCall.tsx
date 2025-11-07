
import React, { useState } from 'react';
import { AmbulanceIcon } from './icons';

type GeolocationState = 'idle' | 'loading' | 'success' | 'error';

const EmergencyCall: React.FC = () => {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [status, setStatus] = useState<GeolocationState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isCalling, setIsCalling] = useState(false);

  const handleEmergencyCall = () => {
    setStatus('loading');
    setError(null);
    setIsCalling(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
        setStatus('success');
        // Simulate call duration
        setTimeout(() => setIsCalling(false), 5000);
      },
      (err) => {
        setError(err.message);
        setStatus('error');
        setIsCalling(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="max-w-2xl mx-auto text-center bg-surface p-8 rounded-lg shadow-xl animate-slide-in-up">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Emergency Assistance</h2>
      <p className="text-textSecondary mb-8">
        In a medical emergency, press the button below. We will attempt to get your location and connect you to emergency services.
      </p>
      
      <div className="p-4 bg-amber-100 border-l-4 border-amber-500 text-amber-700 rounded-md mb-8">
          <p className="font-bold">Disclaimer:</p>
          <p>This is a demo feature. In a real emergency, please dial your local emergency number (e.g., 911, 112).</p>
      </div>

      <button
        onClick={handleEmergencyCall}
        disabled={isCalling}
        className="w-48 h-48 bg-red-500 text-white rounded-full flex flex-col items-center justify-center shadow-lg hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300 mx-auto disabled:bg-red-400 disabled:cursor-not-allowed animate-pulse disabled:animate-none"
      >
        <AmbulanceIcon className="w-16 h-16" />
        <span className="text-2xl font-bold mt-2">{isCalling ? 'Calling...' : 'Call Now'}</span>
      </button>

      <div className="mt-8 text-left p-6 bg-slate-50 rounded-lg min-h-[120px]">
        <h3 className="font-semibold text-lg mb-2">Your Location Status:</h3>
        {status === 'loading' && <p className="text-secondary">Getting your location...</p>}
        {status === 'error' && <p className="text-red-500">Error: {error}</p>}
        {status === 'success' && location && (
          <div>
            <p className="text-green-600 font-bold">Location acquired! Sharing with emergency services.</p>
            <p className="text-sm text-textSecondary mt-2">
              <strong>Latitude:</strong> {location.latitude.toFixed(5)}<br/>
              <strong>Longitude:</strong> {location.longitude.toFixed(5)}<br/>
              <strong>Accuracy:</strong> {location.accuracy.toFixed(2)} meters
            </p>
          </div>
        )}
         {status === 'idle' && <p className="text-textSecondary">Press the call button to get your location.</p>}
      </div>
    </div>
  );
};

export default EmergencyCall;

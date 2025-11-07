
import React from 'react';

export const MicrophoneMuteIcon: React.FC<{className?: string}> = ({className = "w-6 h-6"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.083A7.028 7.028 0 004.999 11v1a7 7 0 0014 0v-1a7.028 7.028 0 00-6.001-5.917M15 9a3 3 0 00-3-3m0 0a3 3 0 00-3 3m3-3v7m6 4l-5-5m0 5l5-5" />
  </svg>
);

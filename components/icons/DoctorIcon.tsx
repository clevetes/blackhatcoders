import React from 'react';

export const DoctorIcon: React.FC<{className?: string}> = ({className = "w-10 h-10"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 14.5c-1.333-2-2.5-3-2.5-3S6 10.167 7.5 12" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 9V7a1 1 0 011-1h1" />
  </svg>
);
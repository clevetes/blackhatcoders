
import React from 'react';

export const AmbulanceIcon: React.FC<{className?: string}> = ({className = "w-10 h-10"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M10.232,1.354a1,1,0,0,1,1.536,0l1.414,1.414a1,1,0,0,1,0,1.414L5.232,12.136a1,1,0,0,1-1.414-1.414Z" fill="currentColor"/>
    <path d="M22,19v2a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V19a1,1,0,0,1,1-1H5a1,1,0,0,1,1,1v1H18V19a1,1,0,0,1,1-1h2A1,1,0,0,1,22,19Z" fill="currentColor"/>
    <path d="M19.033,9.457,17,11.49V7a1,1,0,0,0-1-1H8A1,1,0,0,0,7,7v5.51l-2.457-2.457A1,1,0,0,0,3.129,11.47l3,3a1,1,0,0,0,1.414,0l3.5-3.5a1,1,0,0,0,0-1.414,1,1,0,0,0-1.414,0L9,10.586V8h6v2.586l-1.629,1.629a1,1,0,0,0,0,1.414,1,1,0,0,0,1.414,0l3.5-3.5A1,1,0,0,0,19.033,9.457Z" fill="currentColor"/>
  </svg>
);

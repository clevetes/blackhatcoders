import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white mt-12">
      <div className="container mx-auto py-6 px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Smart Health Guard. All Rights Reserved.</p>
        <p className="text-sm text-slate-400 mt-2">Your Trusted Partner in Virtual Healthcare</p>
      </div>
    </footer>
  );
};

export default Footer;
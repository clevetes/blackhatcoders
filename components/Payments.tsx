import React, { useState } from 'react';

type PaymentTab = 'card' | 'upi' | 'qr' | 'refund';

const TabButton: React.FC<{
  activeTab: PaymentTab;
  tabName: PaymentTab;
  setTab: (tab: PaymentTab) => void;
  children: React.ReactNode;
}> = ({ activeTab, tabName, setTab, children }) => {
  const isActive = activeTab === tabName;
  return (
    <button
      onClick={() => setTab(tabName)}
      className={`px-4 py-2 font-semibold rounded-t-lg transition-colors duration-200 w-full ${
        isActive
          ? 'bg-surface border-b-2 border-primary text-primary'
          : 'text-textSecondary hover:bg-slate-100'
      }`}
    >
      {children}
    </button>
  );
};


const Payments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PaymentTab>('card');

  const renderContent = () => {
    switch (activeTab) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textSecondary">Card Number</label>
              <input type="text" placeholder="**** **** **** ****" className="w-full mt-1 p-2 border border-slate-300 rounded-md"/>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-textSecondary">Expiry Date</label>
                <input type="text" placeholder="MM/YY" className="w-full mt-1 p-2 border border-slate-300 rounded-md"/>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-textSecondary">CVC</label>
                <input type="text" placeholder="***" className="w-full mt-1 p-2 border border-slate-300 rounded-md"/>
              </div>
            </div>
             <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors mt-4">
              Pay Now
            </button>
          </div>
        );
      case 'upi':
        return (
            <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textSecondary">UPI ID</label>
              <input type="text" placeholder="yourname@bank" className="w-full mt-1 p-2 border border-slate-300 rounded-md"/>
            </div>
            <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors mt-4">
              Pay with UPI
            </button>
          </div>
        );
      case 'qr':
        return (
          <div className="text-center">
            <p className="text-textSecondary mb-4">Scan the QR code with your payment app.</p>
            <img src="https://picsum.photos/250" alt="QR Code" className="mx-auto rounded-lg shadow-md" />
          </div>
        );
      case 'refund':
          return (
             <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-textSecondary">Appointment ID</label>
                  <input type="text" placeholder="Enter your appointment ID" className="w-full mt-1 p-2 border border-slate-300 rounded-md"/>
                </div>
                 <div>
                  <label className="block text-sm font-medium text-textSecondary">Reason for Refund</label>
                  <textarea placeholder="Please describe the reason..." rows={4} className="w-full mt-1 p-2 border border-slate-300 rounded-md"></textarea>
                </div>
                <button className="w-full bg-accent text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors mt-4">
                  Request Refund
                </button>
          </div>
          );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-surface p-8 rounded-lg shadow-xl animate-slide-in-up">
      <h2 className="text-3xl font-bold text-center text-primary-dark mb-8">Payment & Refunds</h2>
      <div className="border-b border-slate-200 mb-6">
        <div className="flex -mb-px">
          <TabButton activeTab={activeTab} tabName="card" setTab={setActiveTab}>Card</TabButton>
          <TabButton activeTab={activeTab} tabName="upi" setTab={setActiveTab}>UPI</TabButton>
          <TabButton activeTab={activeTab} tabName="qr" setTab={setActiveTab}>QR Code</TabButton>
          <TabButton activeTab={activeTab} tabName="refund" setTab={setActiveTab}>Refund</TabButton>
        </div>
      </div>
      <div className="animate-fade-in">
        {renderContent()}
      </div>
    </div>
  );
};

export default Payments;
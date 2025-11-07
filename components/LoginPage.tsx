import React, { useState } from 'react';
import { UserRole } from '../types';
import { PatientIcon, DoctorIcon, StaffIcon } from './icons';

interface LoginPageProps {
    onLogin: () => void;
}

const RoleCard: React.FC<{
    role: UserRole;
    label: string;
    icon: React.ReactNode;
    selectedRole: UserRole | null;
    onSelect: (role: UserRole) => void;
}> = ({ role, label, icon, selectedRole, onSelect }) => {
    const isSelected = selectedRole === role;
    return (
        <button
            onClick={() => onSelect(role)}
            className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all duration-200 ${
                isSelected ? 'border-primary bg-indigo-50 shadow-lg' : 'border-slate-200 hover:border-primary'
            }`}
        >
            <div className={`mb-2 ${isSelected ? 'text-primary' : 'text-slate-500'}`}>{icon}</div>
            <p className={`font-bold ${isSelected ? 'text-primary-dark' : 'text-textPrimary'}`}>{label}</p>
        </button>
    )
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const canSubmit = selectedRole && email && password;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (canSubmit) {
            // In a real app, you would perform authentication here
            onLogin();
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-cyan-50 p-4">
            <div className="max-w-md w-full bg-surface p-8 rounded-2xl shadow-xl animate-fade-in">
                <div className="text-center mb-8">
                     <div className="flex justify-center items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        <h1 className="text-3xl font-bold text-primary-dark">Smart Health Guard</h1>
                    </div>
                    <p className="text-textSecondary">Your Health, Connected.</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-textPrimary text-center mb-4">Select your role</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <RoleCard role={UserRole.Patient} label="Patient" icon={<PatientIcon />} selectedRole={selectedRole} onSelect={setSelectedRole} />
                            <RoleCard role={UserRole.Doctor} label="Doctor" icon={<DoctorIcon />} selectedRole={selectedRole} onSelect={setSelectedRole} />
                            <RoleCard role={UserRole.Staff} label="Staff" icon={<StaffIcon />} selectedRole={selectedRole} onSelect={setSelectedRole} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-textSecondary mb-1" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-textSecondary mb-1" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            type="submit"
                            disabled={!canSubmit}
                            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
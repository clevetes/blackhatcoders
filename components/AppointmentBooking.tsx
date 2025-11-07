import React, { useState, useMemo } from 'react';
import { Doctor } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, ClockIcon, UserIcon } from './icons';
import Modal from './Modal';

const doctors: Doctor[] = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', image: 'https://picsum.photos/seed/doc1/100' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatologist', image: 'https://picsum.photos/seed/doc2/100' },
  { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrician', image: 'https://picsum.photos/seed/doc3/100' },
  { id: 4, name: 'Dr. David Lee', specialty: 'Neurologist', image: 'https://picsum.photos/seed/doc4/100' },
];

const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

const AppointmentBooking: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(doctors[0]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentDate]);

  const startDay = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month, 1).getDay();
  }, [currentDate]);
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleBooking = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      setIsModalOpen(true);
    } else {
      alert('Please select a doctor, date, and time.');
    }
  };
  
  const resetForm = () => {
    setSelectedDoctor(doctors[0]);
    setSelectedDate(null);
    setSelectedTime(null);
    setIsModalOpen(false);
  }

  return (
    <div className="max-w-4xl mx-auto bg-surface p-8 rounded-lg shadow-xl animate-slide-in-up">
      <h2 className="text-3xl font-bold text-center text-primary-dark mb-8">Book an Appointment</h2>

      {/* Doctor Selection */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><UserIcon/>Select a Doctor</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {doctors.map(doc => (
            <button
              key={doc.id}
              onClick={() => setSelectedDoctor(doc)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${selectedDoctor?.id === doc.id ? 'border-primary shadow-lg' : 'border-slate-200 hover:border-primary'}`}
            >
              <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-full mx-auto mb-2" />
              <p className="font-bold text-textPrimary">{doc.name}</p>
              <p className="text-sm text-textSecondary">{doc.specialty}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><CalendarIcon />Select a Date</h3>
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-slate-200"><ChevronLeftIcon /></button>
              <span className="font-bold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
              <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-slate-200"><ChevronRightIcon /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm text-textSecondary">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1 mt-2">
              {Array(startDay).fill(null).map((_, i) => <div key={`empty-${i}`}></div>)}
              {daysInMonth.map(day => (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  disabled={day < new Date(new Date().setDate(new Date().getDate() - 1))}
                  className={`p-2 rounded-full transition-colors duration-200 disabled:text-slate-300 disabled:cursor-not-allowed ${
                    selectedDate?.toDateString() === day.toDateString()
                      ? 'bg-primary text-white'
                      : 'hover:bg-indigo-100'
                  }`}
                >
                  {day.getDate()}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Time Slots */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><ClockIcon />Select a Time</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {timeSlots.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${selectedTime === time ? 'bg-primary text-white border-primary' : 'border-slate-200 hover:border-primary'}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <button
          onClick={handleBooking}
          disabled={!selectedDoctor || !selectedDate || !selectedTime}
          className="bg-secondary hover:bg-cyan-600 text-white font-bold py-3 px-12 rounded-full shadow-lg transition-all duration-300 disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          Confirm Booking
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h3 className="text-2xl font-bold text-textPrimary mt-4">Appointment Confirmed!</h3>
            <p className="text-textSecondary mt-2">
                Your appointment with <span className="font-semibold text-primary-dark">{selectedDoctor?.name}</span> is scheduled for <span className="font-semibold text-primary-dark">{selectedDate?.toLocaleDateString()}</span> at <span className="font-semibold text-primary-dark">{selectedTime}</span>.
            </p>
            <button onClick={resetForm} className="mt-6 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full">
                Done
            </button>
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentBooking;
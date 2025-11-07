import React, { useState, useRef } from 'react';
import { ReportFile } from '../types';
import { UploadIcon, TrashIcon, ReportIcon } from './icons';

const TestReports: React.FC = () => {
  const [reports, setReports] = useState<ReportFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      // Fix: Explicitly type `file` as `File` to correct the type inference from `unknown`.
      const newReports = files.map((file: File) => ({
        name: file.name,
        size: file.size,
        id: `${file.name}-${Date.now()}`
      }));
      setReports(prev => [...prev, ...newReports]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const removeReport = (id: string) => {
    setReports(reports.filter(report => report.id !== id));
  };
  
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  return (
    <div className="max-w-3xl mx-auto bg-surface p-8 rounded-lg shadow-xl animate-slide-in-up">
      <h2 className="text-3xl font-bold text-center text-primary-dark mb-8">Your Medical Reports</h2>

      <div
        className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors duration-300"
        onClick={handleUploadClick}
      >
        <input
          type="file"
          accept="application/pdf"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center text-textSecondary">
          <UploadIcon />
          <p className="mt-2 font-semibold">Click or drag files to this area to upload</p>
          <p className="text-sm">Supports PDF files only</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Uploaded Reports</h3>
        {reports.length === 0 ? (
          <p className="text-textSecondary text-center py-4">No reports uploaded yet.</p>
        ) : (
          <ul className="space-y-3">
            {reports.map((report) => (
              <li
                key={report.id}
                className="flex items-center justify-between bg-slate-50 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3">
                    <ReportIcon className="w-6 h-6 text-primary"/>
                    <div>
                        <p className="font-semibold text-textPrimary">{report.name}</p>
                        <p className="text-sm text-textSecondary">{formatBytes(report.size)}</p>
                    </div>
                </div>
                <button onClick={() => removeReport(report.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors">
                  <TrashIcon />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TestReports;
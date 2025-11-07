import React, { useState, useRef, useEffect } from 'react';
import { UserIcon, MicrophoneIcon, MicrophoneMuteIcon, VideoIcon, VideoOffIcon } from './icons';

type CallStatus = 'idle' | 'requesting' | 'active' | 'error' | 'ended';

const VideoConsultation: React.FC = () => {
  const [status, setStatus] = useState<CallStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCall = async () => {
    setStatus('requesting');
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }
      setStatus('active');
    } catch (err) {
      console.error("Error accessing media devices.", err);
      if (err instanceof Error) {
        setError(err.name === 'NotAllowedError' ? 'Permission denied. Please allow camera and microphone access in your browser settings.' : 'Could not access camera or microphone.');
      } else {
        setError('An unknown error occurred.');
      }
      setStatus('error');
    }
  };

  const endCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (userVideoRef.current) {
      userVideoRef.current.srcObject = null;
    }
    streamRef.current = null;
    setStatus('ended');
    setIsMuted(false);
    setIsCameraOff(false);
  };

  const toggleMute = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(prev => !prev);
    }
  };
  
  const toggleCamera = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCameraOff(prev => !prev);
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const renderContent = () => {
    switch (status) {
      case 'active':
        return (
          <div className="relative w-full h-full">
            {/* Doctor's Video (Placeholder) */}
            <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 rounded-full bg-slate-700 mx-auto mb-4 flex items-center justify-center">
                  <UserIcon className="w-16 h-16 text-slate-400" />
                </div>
                <p className="font-bold">Dr. Sarah Johnson</p>
                <p className="text-sm text-slate-300">Connecting...</p>
              </div>
            </div>
            {/* User's Video */}
            <video
              ref={userVideoRef}
              autoPlay
              playsInline
              muted
              className="absolute bottom-4 right-4 w-1/4 max-w-[200px] rounded-lg shadow-lg border-2 border-white"
            ></video>
          </div>
        );
      case 'requesting':
        return <div className="text-center"><p>Requesting camera access...</p></div>;
      case 'error':
        return <div className="text-center text-red-500"><p className="font-bold">Error:</p><p>{error}</p></div>;
      case 'ended':
          return <div className="text-center"><p className="text-xl font-semibold">Call Ended</p><button onClick={() => setStatus('idle')} className="mt-4 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full">Start New Call</button></div>;
      case 'idle':
      default:
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Ready for your consultation?</h3>
            <p className="text-textSecondary mb-6">Please ensure you have a stable internet connection and are in a quiet, well-lit area.</p>
            <button onClick={startCall} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg">
              Start Video Call
            </button>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-surface p-8 rounded-lg shadow-xl animate-slide-in-up">
      <h2 className="text-3xl font-bold text-center text-primary-dark mb-6">Video Consultation</h2>
      <div className="w-full aspect-video bg-slate-100 rounded-lg flex items-center justify-center relative">
        {renderContent()}
      </div>
      {status === 'active' && (
        <div className="mt-6 flex justify-center items-center space-x-4">
            <button onClick={toggleMute} className="p-3 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors" title={isMuted ? "Unmute Microphone" : "Mute Microphone"}>
                {isMuted ? <MicrophoneMuteIcon className="h-6 w-6 text-slate-700" /> : <MicrophoneIcon className="h-6 w-6 text-slate-700" />}
            </button>
             <button onClick={toggleCamera} className="p-3 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors" title={isCameraOff ? "Start Camera" : "Stop Camera"}>
                {isCameraOff ? <VideoOffIcon className="h-6 w-6 text-slate-700" /> : <VideoIcon className="h-6 w-6 text-slate-700" />}
            </button>
            <button onClick={endCall} className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg">
                End Call
            </button>
        </div>
      )}
    </div>
  );
};

export default VideoConsultation;
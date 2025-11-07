import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types';
import { streamChat } from '../services/geminiService';
import { BotIcon, UserIcon } from './icons';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am Smart Health Guard AI. How can I help you with your health questions today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = useCallback(async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const modelResponse: ChatMessage = { role: 'model', text: '' };
    setMessages(prev => [...prev, modelResponse]);

    await streamChat(input, (chunk) => {
        setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage.role === 'model') {
                return [
                    ...prev.slice(0, -1),
                    { ...lastMessage, text: lastMessage.text + chunk },
                ];
            }
            return prev;
        });
    });

    setIsLoading(false);
  }, [input, isLoading]);

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[70vh] bg-surface rounded-lg shadow-xl animate-slide-in-up">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-center text-primary-dark">AI Health Assistant</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto bg-slate-50">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0"><BotIcon/></div>}
              <div
                className={`max-w-md p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-textPrimary'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
               {msg.role === 'user' && <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 flex-shrink-0"><UserIcon/></div>}
            </div>
          ))}
          {isLoading && messages[messages.length-1].role === 'model' && (
             <div className="flex items-start gap-3">
                 <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0"><BotIcon/></div>
                  <div className="max-w-md p-3 rounded-lg bg-slate-100 text-textPrimary">
                      <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      </div>
                  </div>
              </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a health question..."
            className="flex-grow p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || input.trim() === ''}
            className="bg-primary text-white p-2 rounded-lg hover:bg-primary-dark disabled:bg-slate-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
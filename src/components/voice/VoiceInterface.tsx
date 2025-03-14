
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useVoiceRecognition from '../../hooks/useVoiceRecognition';
import { Mic, MicOff, Send, X } from 'lucide-react';
import { Message } from '../../lib/types';

interface VoiceInterfaceProps {
  isActive: boolean;
  onSendMessage: (message: string) => void;
  onClose: () => void;
  messages: Message[];
  className?: string;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({
  isActive,
  onSendMessage,
  onClose,
  messages,
  className,
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
  } = useVoiceRecognition({
    onResult: (command) => {
      if (command.text) {
        onSendMessage(command.text);
        resetTranscript();
      }
    }
  });
  
  useEffect(() => {
    if (isActive && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isActive]);
  
  useEffect(() => {
    setInputValue(transcript);
  }, [transcript]);
  
  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
      resetTranscript();
    }
  };
  
  if (!isActive) return null;
  
  return (
    <motion.div
      className={`fixed bottom-0 right-0 z-50 w-full sm:w-96 h-96 glass rounded-t-2xl sm:rounded-tl-2xl sm:rounded-tr-none shadow-lg overflow-hidden ${className}`}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-medium">Voice Assistant</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`mb-4 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`inline-block rounded-2xl px-4 py-2 max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-health-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
                <div
                  className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-gray-500' : 'text-gray-400'
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        
        <AnimatePresence>
          {isListening && (
            <motion.div
              className="px-4 py-2 bg-health-100 text-health-800 text-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              Listening: {transcript || 'Speak now...'}
            </motion.div>
          )}
        </AnimatePresence>
        
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleToggleListening}
              className={`p-2 rounded-full mr-2 ${
                isListening
                  ? 'bg-health-100 text-health-700'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              aria-label={isListening ? 'Stop listening' : 'Start listening'}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-health-500"
            />
            
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 rounded-full ml-2 bg-health-600 text-white disabled:opacity-50"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default VoiceInterface;

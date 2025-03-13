
import { useState, useEffect, useCallback, useRef } from 'react';
import { VoiceCommand } from '../lib/types';

interface UseVoiceRecognitionProps {
  continuous?: boolean;
  interimResults?: boolean;
  lang?: string;
  onResult?: (command: VoiceCommand) => void;
  onError?: (error: string) => void;
}

interface UseVoiceRecognitionReturn {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
  resetTranscript: () => void;
}

const useVoiceRecognition = ({
  continuous = false,
  interimResults = true,
  lang = 'en-US',
  onResult,
  onError
}: UseVoiceRecognitionProps = {}): UseVoiceRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  // Initialize speech recognition
  useEffect(() => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      setError('Your browser does not support speech recognition.');
      if (onError) onError('Browser not supported');
      return;
    }
    
    // Create SpeechRecognition instance
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    // Configure recognition
    if (recognitionRef.current) {
      recognitionRef.current.continuous = continuous;
      recognitionRef.current.interimResults = interimResults;
      recognitionRef.current.lang = lang;
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [continuous, interimResults, lang, onError]);
  
  // Set up event handlers
  useEffect(() => {
    if (!recognitionRef.current) return;
    
    const handleResult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      
      const newTranscript = finalTranscript || interimTranscript;
      setTranscript(prev => prev + newTranscript);
      
      if (finalTranscript && onResult) {
        // Simple intent detection could be added here
        onResult({
          text: finalTranscript.trim()
        });
      }
    };
    
    const handleError = (event: SpeechRecognitionErrorEvent) => {
      const errorMessage = `Recognition error: ${event.error}`;
      setError(errorMessage);
      if (onError) onError(errorMessage);
      setIsListening(false);
    };
    
    const handleEnd = () => {
      if (isListening) {
        recognitionRef.current?.start();
      } else {
        setIsListening(false);
      }
    };
    
    recognitionRef.current.onresult = handleResult;
    recognitionRef.current.onerror = handleError;
    recognitionRef.current.onend = handleEnd;
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
      }
    };
  }, [isListening, onResult, onError]);
  
  const startListening = useCallback(() => {
    setError(null);
    if (!recognitionRef.current) return;
    
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (err) {
      console.error('Failed to start listening:', err);
      setError('Failed to start listening');
      if (onError) onError('Failed to start listening');
    }
  }, [onError]);
  
  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    try {
      recognitionRef.current.stop();
      setIsListening(false);
    } catch (err) {
      console.error('Failed to stop listening:', err);
    }
  }, []);
  
  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);
  
  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    error,
    resetTranscript
  };
};

export default useVoiceRecognition;

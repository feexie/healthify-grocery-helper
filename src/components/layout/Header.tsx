
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Mic, MicOff, User, ShoppingCart, Home } from 'lucide-react';

interface HeaderProps {
  className?: string;
  onVoiceToggle?: (isActive: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ className, onVoiceToggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleVoice = () => {
    const newState = !voiceActive;
    setVoiceActive(newState);
    if (onVoiceToggle) {
      onVoiceToggle(newState);
    }
  };
  
  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/profile', label: 'Profile', icon: <User size={20} /> },
    { path: '/recommendations', label: 'Recommendations', icon: <ShoppingCart size={20} /> },
  ];
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 py-4 transition-all duration-300',
        scrolled ? 'glass shadow-sm' : 'bg-transparent',
        className
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-semibold bg-gradient-to-r from-health-600 to-health-800 bg-clip-text text-transparent">
            HealthGrocery
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2',
                location.pathname === item.path
                  ? 'bg-health-100 text-health-700'
                  : 'hover:bg-gray-100 text-gray-700 hover:text-health-600'
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleVoice}
            className={cn(
              'p-2 rounded-full transition-all duration-300',
              voiceActive
                ? 'bg-health-100 text-health-700'
                : 'hover:bg-gray-100 text-gray-700'
            )}
            aria-label={voiceActive ? 'Disable voice commands' : 'Enable voice commands'}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={voiceActive ? 'mic-on' : 'mic-off'}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {voiceActive ? <Mic size={20} /> : <MicOff size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

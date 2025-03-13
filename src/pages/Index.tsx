
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import Header from '../components/layout/Header';
import Container from '../components/layout/Container';
import VoiceInterface from '../components/voice/VoiceInterface';
import { Message } from '../lib/types';

const Index = () => {
  const [voiceActive, setVoiceActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to HealthGrocery! How can I help you today?',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);

  const handleVoiceToggle = (isActive: boolean) => {
    setVoiceActive(isActive);
  };

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        content: getAssistantResponse(content),
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  // Simple response generation - would be replaced with actual AI in production
  const getAssistantResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return 'Hello! How can I help with your health and grocery needs today?';
    } else if (lowerCaseMessage.includes('profile')) {
      return 'You can create your health profile in the Profile section. This helps us provide personalized recommendations.';
    } else if (lowerCaseMessage.includes('recommendation') || lowerCaseMessage.includes('suggest')) {
      return 'Based on your health profile, I can suggest grocery items and meal plans. Please complete your profile first for personalized recommendations.';
    } else if (lowerCaseMessage.includes('blood') || lowerCaseMessage.includes('genotype')) {
      return 'Your blood type and genotype can significantly impact what foods work best for your body. Please add this information to your profile.';
    } else if (lowerCaseMessage.includes('thank')) {
      return "You're welcome! I'm here to help you make healthier choices.";
    } else {
      return "I'm still learning to respond to different questions. For now, you can explore the app to create your health profile and get personalized recommendations.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-health-100">
      <Header onVoiceToggle={handleVoiceToggle} />
      
      <main className="pt-24 pb-20">
        <Container>
          <section className="mb-24">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="px-4 py-1 rounded-full bg-health-100 text-health-800 text-sm font-medium inline-block mb-6">
                  AI-Powered Health Optimization
                </span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Personalized Grocery Shopping 
                <span className="bg-gradient-to-r from-health-600 to-health-800 bg-clip-text text-transparent"> Powered by Your Health Data</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Make smarter grocery choices based on your unique health profile, dietary preferences, and cultural habits.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <Link to="/profile">
                  <motion.button
                    className="px-8 py-3 bg-health-600 text-white rounded-full flex items-center justify-center gap-2 w-full sm:w-auto"
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    whileTap={{ y: 0 }}
                  >
                    <User size={18} />
                    Create Health Profile
                  </motion.button>
                </Link>
                
                <Link to="/recommendations">
                  <motion.button
                    className="px-8 py-3 bg-white border border-health-200 text-health-700 rounded-full flex items-center justify-center gap-2 w-full sm:w-auto"
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    whileTap={{ y: 0 }}
                  >
                    <ShoppingCart size={18} />
                    View Recommendations
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              className="mt-16 max-w-5xl mx-auto glass rounded-3xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt="Healthy groceries"
                className="w-full h-96 object-cover"
              />
            </motion.div>
          </section>
          
          <section className="mb-20">
            <div className="text-center mb-16">
              <span className="px-4 py-1 rounded-full bg-health-100 text-health-800 text-sm font-medium inline-block mb-6">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Personalized for Your Health</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our app creates a uniquely tailored grocery and meal experience based on your specific health characteristics.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <User className="w-10 h-10 text-health-600" />,
                  title: 'Create Health Profile',
                  description: 'Input your blood group, genotype, and any health conditions to create your unique health profile.',
                },
                {
                  icon: <Heart className="w-10 h-10 text-health-600" />,
                  title: 'Get Personalized Recommendations',
                  description: 'Receive grocery and meal recommendations optimized for your specific health needs.',
                },
                {
                  icon: <ShoppingCart className="w-10 h-10 text-health-600" />,
                  title: 'Shop Smarter',
                  description: 'Use the recommendations to make smarter grocery choices that support your health goals.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="glass p-6 rounded-2xl flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="p-4 rounded-full bg-health-100 mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
          
          <section className="mb-16">
            <div className="glass rounded-3xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <span className="px-4 py-1 rounded-full bg-health-100 text-health-800 text-sm font-medium inline-block mb-6">
                    Voice Interaction
                  </span>
                  <h2 className="text-3xl font-bold mb-4">Talk to Your Health Assistant</h2>
                  <p className="text-gray-600 mb-6">
                    Use voice commands to interact with our AI assistant, ask questions about nutrition, 
                    or get recommendations based on your health profile.
                  </p>
                  <button
                    onClick={() => setVoiceActive(true)}
                    className="px-6 py-3 bg-health-600 text-white rounded-full flex items-center justify-center gap-2 w-fit"
                  >
                    Try Voice Assistant <ArrowRight size={18} />
                  </button>
                </div>
                <div className="md:w-1/2">
                  <img
                    src="https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                    alt="Voice interaction"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </Container>
      </main>
      
      <footer className="py-8 bg-gray-50">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-semibold bg-gradient-to-r from-health-600 to-health-800 bg-clip-text text-transparent">
                HealthGrocery
              </span>
            </div>
            <div className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} HealthGrocery. All rights reserved.
            </div>
          </div>
        </Container>
      </footer>
      
      <AnimatePresence>
        {voiceActive && (
          <VoiceInterface
            isActive={voiceActive}
            onSendMessage={handleSendMessage}
            onClose={() => setVoiceActive(false)}
            messages={messages}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

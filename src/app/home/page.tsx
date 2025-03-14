
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HomeBanner from '@/components/home/HomeBanner';
import HowItWorks from '@/components/home/HowItWorks';
import VoiceAssistantSection from '@/components/home/VoiceAssistantSection';
import VoiceInterface from '@/components/voice/VoiceInterface';
import { Message } from '@/lib/types';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';

const HomePage = () => {
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
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
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
    <>
      <SiteHeader onVoiceToggle={handleVoiceToggle} />
      
      <main className="pt-24 pb-20">
        <HomeBanner />
        <HowItWorks />
        <VoiceAssistantSection onActivate={() => setVoiceActive(true)} />
      </main>
      
      <SiteFooter />
      
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
    </>
  );
};

export default HomePage;

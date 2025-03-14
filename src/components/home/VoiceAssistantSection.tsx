
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/layout/Container';

interface VoiceAssistantSectionProps {
  onActivate: () => void;
}

const VoiceAssistantSection: React.FC<VoiceAssistantSectionProps> = ({ onActivate }) => {
  return (
    <section className="mb-16">
      <Container>
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
                onClick={onActivate}
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
      </Container>
    </section>
  );
};

export default VoiceAssistantSection;

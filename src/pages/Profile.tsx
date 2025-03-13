
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Header from '../components/layout/Header';
import Container from '../components/layout/Container';
import HealthProfileForm from '../components/health/HealthProfileForm';
import { HealthProfile } from '../lib/types';

const Profile = () => {
  const [healthProfile, setHealthProfile] = useState<Partial<HealthProfile>>({
    chronicConditions: [],
    biomarkers: [],
    dietaryPreferences: [],
    culturalPreferences: [],
  });
  
  const handleProfileUpdate = (profile: Partial<HealthProfile>) => {
    setHealthProfile(prev => ({
      ...prev,
      ...profile,
      updatedAt: new Date(),
    }));
    
    toast.success('Health profile updated successfully');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-health-100">
      <Header />
      
      <main className="pt-24 pb-20">
        <Container maxWidth="lg">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1 rounded-full bg-health-100 text-health-800 text-sm font-medium inline-block mb-6">
              Personalization
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Health Profile</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tell us about your health characteristics, dietary preferences, and cultural habits
              so we can provide you with personalized grocery and meal recommendations.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <HealthProfileForm
              initialProfile={healthProfile}
              onSubmit={handleProfileUpdate}
              className="max-w-2xl mx-auto"
            />
          </motion.div>
          
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="text-gray-500">
              Your data is securely stored and only used to provide you with personalized recommendations.
            </p>
          </motion.div>
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
    </div>
  );
};

export default Profile;

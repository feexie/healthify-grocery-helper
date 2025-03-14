
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import SiteHeader from '@/components/layout/SiteHeader';
import Container from '@/components/layout/Container';
import HealthProfileForm from '@/components/health/HealthProfileForm';
import { HealthProfile } from '@/lib/types';
import SiteFooter from '@/components/layout/SiteFooter';

const ProfilePage = () => {
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
    <>
      <SiteHeader />
      
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
      
      <SiteFooter />
    </>
  );
};

export default ProfilePage;

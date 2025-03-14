
import React from 'react';
import { motion } from 'framer-motion';
import { User, Heart, ShoppingCart } from 'lucide-react';
import Container from '@/components/layout/Container';

const HowItWorks = () => {
  return (
    <section className="mb-20">
      <Container>
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
      </Container>
    </section>
  );
};

export default HowItWorks;

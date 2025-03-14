
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShoppingCart } from 'lucide-react';
import Container from '@/components/layout/Container';

const HomeBanner = () => {
  return (
    <section className="mb-24">
      <Container>
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
      </Container>
    </section>
  );
};

export default HomeBanner;

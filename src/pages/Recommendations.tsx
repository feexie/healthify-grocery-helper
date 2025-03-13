
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Header from '../components/layout/Header';
import Container from '../components/layout/Container';
import RecommendationCard from '../components/grocery/RecommendationCard';
import { GroceryItem } from '../lib/types';

const Recommendations = () => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [cartItems, setCartItems] = useState<GroceryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate fetching recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      const mockGroceryItems: GroceryItem[] = [
        {
          id: '1',
          name: 'Organic Spinach',
          category: 'Vegetables',
          nutritionalValue: {
            calories: 23,
            protein: 2.9,
            carbs: 3.6,
            fat: 0.4,
          },
          healthBenefits: ['Iron-rich', 'Vitamin K', 'Antioxidants'],
          recommendedFor: ['Blood Group A', 'Anemia'],
          price: 3.99,
          image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        },
        {
          id: '2',
          name: 'Wild Caught Salmon',
          category: 'Seafood',
          nutritionalValue: {
            calories: 208,
            protein: 20.4,
            carbs: 0,
            fat: 13.4,
          },
          healthBenefits: ['Omega-3 Fatty Acids', 'High-quality Protein', 'Vitamin D'],
          recommendedFor: ['Blood Group O', 'Heart Health'],
          price: 12.99,
          image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        },
        {
          id: '3',
          name: 'Quinoa',
          category: 'Grains',
          nutritionalValue: {
            calories: 120,
            protein: 4.4,
            carbs: 21.3,
            fat: 1.9,
          },
          healthBenefits: ['Complete Protein', 'Fiber-rich', 'Gluten-free'],
          recommendedFor: ['Blood Group A', 'Blood Group AB', 'Celiac Disease'],
          price: 5.49,
          image: 'https://images.unsplash.com/photo-1586201375800-0605a5c3a1ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        },
        {
          id: '4',
          name: 'Avocado',
          category: 'Fruits',
          nutritionalValue: {
            calories: 160,
            protein: 2,
            carbs: 8.5,
            fat: 14.7,
          },
          healthBenefits: ['Healthy Fats', 'Potassium', 'Fiber'],
          recommendedFor: ['Blood Group B', 'Heart Health'],
          price: 1.99,
          image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        },
        {
          id: '5',
          name: 'Blueberries',
          category: 'Fruits',
          nutritionalValue: {
            calories: 57,
            protein: 0.7,
            carbs: 14.5,
            fat: 0.3,
          },
          healthBenefits: ['Antioxidants', 'Brain Health', 'Heart Health'],
          recommendedFor: ['All Blood Groups', 'Anti-aging'],
          price: 4.99,
          image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        },
        {
          id: '6',
          name: 'Greek Yogurt',
          category: 'Dairy',
          nutritionalValue: {
            calories: 100,
            protein: 17,
            carbs: 6,
            fat: 0.4,
          },
          healthBenefits: ['Probiotics', 'High Protein', 'Calcium'],
          recommendedFor: ['Blood Group B', 'Gut Health'],
          price: 3.49,
          image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        },
      ];
      
      setGroceryItems(mockGroceryItems);
      setIsLoading(false);
    };
    
    fetchRecommendations();
  }, []);
  
  const handleAddToCart = (item: GroceryItem) => {
    setCartItems(prev => {
      // Check if the item is already in the cart
      if (prev.some(cartItem => cartItem.id === item.id)) {
        toast.info(`${item.name} is already in your cart`);
        return prev;
      }
      
      toast.success(`Added ${item.name} to your cart`);
      return [...prev, item];
    });
  };
  
  const handleLike = (item: GroceryItem) => {
    toast.success(`Added ${item.name} to your favorites`);
  };
  
  const handleViewDetails = (item: GroceryItem) => {
    // In a real app, this would open a modal or navigate to a details page
    toast.info(`Viewing details for ${item.name}`);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-health-100">
      <Header />
      
      <main className="pt-24 pb-20">
        <Container>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1 rounded-full bg-health-100 text-health-800 text-sm font-medium inline-block mb-6">
              Personalized
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Grocery Recommendations</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Based on your health profile, we recommend these grocery items to support your optimal health.
            </p>
          </motion.div>
          
          {isLoading ? (
            <div className="py-20 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 border-t-4 border-health-600 border-solid rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing your health profile and generating recommendations...</p>
              </motion.div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {groceryItems.map((item, index) => (
                  <RecommendationCard
                    key={item.id}
                    item={item}
                    onAddToCart={handleAddToCart}
                    onLike={handleLike}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
              
              {cartItems.length > 0 && (
                <motion.div
                  className="glass p-6 rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-semibold mb-4">Your Cart ({cartItems.length} items)</h2>
                  
                  <div className="divide-y">
                    {cartItems.map(item => (
                      <div key={item.id} className="py-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${item.price?.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t flex justify-between items-center">
                    <div>
                      <p className="text-gray-500">Total</p>
                      <p className="text-2xl font-semibold">
                        ${cartItems.reduce((total, item) => total + (item.price || 0), 0).toFixed(2)}
                      </p>
                    </div>
                    
                    <button className="px-6 py-3 bg-health-600 text-white rounded-full">
                      Checkout
                    </button>
                  </div>
                </motion.div>
              )}
            </>
          )}
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

export default Recommendations;

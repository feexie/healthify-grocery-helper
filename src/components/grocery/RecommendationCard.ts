
import React from 'react';
import { motion } from 'framer-motion';
import { GroceryItem } from '../../lib/types';
import { ShoppingCart, Heart, Info } from 'lucide-react';

interface RecommendationCardProps {
  item: GroceryItem;
  onAddToCart?: (item: GroceryItem) => void;
  onLike?: (item: GroceryItem) => void;
  onViewDetails?: (item: GroceryItem) => void;
  className?: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  item,
  onAddToCart,
  onLike,
  onViewDetails,
  className,
}) => {
  return (
    <motion.div
      className={`glass glass-hover rounded-2xl overflow-hidden ${className}`}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-square relative">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/80 text-gray-800">
            {item.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1">{item.name}</h3>
        
        {item.nutritionalValue && (
          <div className="grid grid-cols-4 gap-2 my-3 text-xs text-gray-500">
            <div className="text-center">
              <div className="font-semibold">{item.nutritionalValue.calories}</div>
              <div>Kcal</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{item.nutritionalValue.protein}g</div>
              <div>Protein</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{item.nutritionalValue.carbs}g</div>
              <div>Carbs</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{item.nutritionalValue.fat}g</div>
              <div>Fat</div>
            </div>
          </div>
        )}
        
        {item.healthBenefits && item.healthBenefits.length > 0 && (
          <div className="my-3">
            <h4 className="text-xs font-medium text-gray-500 mb-1">Benefits</h4>
            <div className="flex flex-wrap gap-1">
              {item.healthBenefits.slice(0, 3).map((benefit, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-health-100 text-health-800"
                >
                  {benefit}
                </span>
              ))}
              {item.healthBenefits.length > 3 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                  +{item.healthBenefits.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        {item.price && (
          <div className="text-lg font-semibold my-2">${item.price.toFixed(2)}</div>
        )}
        
        <div className="flex justify-between mt-4">
          <button
            onClick={() => onAddToCart && onAddToCart(item)}
            className="p-2 rounded-full bg-health-100 hover:bg-health-200 text-health-700 transition-colors duration-300"
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
          
          <button
            onClick={() => onLike && onLike(item)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-300"
            aria-label="Like"
          >
            <Heart size={20} />
          </button>
          
          <button
            onClick={() => onViewDetails && onViewDetails(item)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-300"
            aria-label="View details"
          >
            <Info size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;

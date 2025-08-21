import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../store/store';
import { setActiveCategory } from '../store/slices/statusSlice';

const CategoryFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { categories, activeCategory } = useSelector((state: RootState) => state.status);

  const handleCategoryClick = (category: string) => {
    dispatch(setActiveCategory(category));
  };

  return (
    <div className="w-full bg-white/50 backdrop-blur-sm border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(category)}
              className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap text-xs sm:text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../Redux/Action';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const { categories, activeCategory } = useSelector((state) => state.status);

  const handleCategoryClick = (category) => {
    dispatch(setActiveCategory(category));
  };

  return (
    <div className="w-full bg-white sticky top-16 z-40 mx-auto px-12">
      <div className="w-full mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category, index) => (
            <button
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
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
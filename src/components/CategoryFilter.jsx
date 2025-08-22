import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "../Redux/Action";

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const { categories, activeCategory } = useSelector((state) => state.status);

  const handleCategoryClick = (category) => {
    dispatch(setActiveCategory(category));
  };

  return (
    <div className="w-full bg-white sticky top-16 z-40 mx-auto px-24 py-4 border-b border-pink-500">
      <div className="w-full mx-auto py-4 ">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap mt-2 text-xs sm:text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-pink-600 text-white"
                  : "bg-white text-gray-600 "
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

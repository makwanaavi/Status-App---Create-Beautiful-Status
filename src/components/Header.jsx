import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Plus, Heart, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { setSearchQuery, setEditorOpen } from "../Redux/Action";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.editor);
  const { statuses } = useSelector((state) => state.status);

  const likedCount = statuses.filter((s) => s.isLiked).length;
  const bookmarkedCount = statuses.filter((s) => s.isSaved).length;

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const openEditor = () => {
    dispatch(setEditorOpen(true));
  };

  return (
    <header className="sticky top-0 z-50 bg-white w-full shadow-sm">
      <div className="w-full mx-auto px-2 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 py-2 sm:py-0 gap-3 sm:gap-0">
          {/* Logo */}
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-3xl">S</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-pink-600 bg-clip-text text-transparent select-none">
                <Link to={"/"}>StatusApp</Link>
              </h1>
            </div>
          </div>

          {/* User Menu */}
          <>
            <div className="flex gap-4 sm:gap-6 text-pink-500 font-medium text-sm sm:text-base">
              <Link to={"/"} className="hover:text-pink-700 transition">
                Home
              </Link>
              <Link to={"/about"} className="hover:text-pink-700 transition">
                About
              </Link>
              <Link to={"/contact"} className="hover:text-pink-700 transition">
                Contact
              </Link>
              <Link to={"/faq"} className="hover:text-pink-700 transition">
                FAQ
              </Link>
            </div>

            {/* Search Bar */}
            <div className="w-full sm:flex-1 max-w-full sm:max-w-md mx-0 sm:mx-8 mb-2 sm:mb-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search statuses, categories..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gray-50 text-sm sm:text-base transition"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={openEditor}
                className="flex items-center space-x-2 bg-pink-600 text-white px-3 sm:px-4 py-2 rounded-full hover:shadow-lg transition text-sm sm:text-base font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create</span>
              </button>

              <Link to="/liked" className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-2 text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  {likedCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center font-bold">
                      {likedCount}
                    </span>
                  )}
                </motion.div>
              </Link>

              <Link to="/bookmarked" className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-2 text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <Bookmark className="w-5 h-5" />
                  {bookmarkedCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center font-bold">
                      {bookmarkedCount}
                    </span>
                  )}
                </motion.div>
              </Link>
            </div>
          </>
        </div>
      </div>
    </header>
  );
};

export default Header;
export default Header;

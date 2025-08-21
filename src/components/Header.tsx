import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Plus, Heart, Bookmark, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { RootState } from "../store/store";
import { setSearchQuery, setEditorOpen } from "../store/slices/editorSlice";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { searchQuery } = useSelector((state: RootState) => state.editor);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const openEditor = () => {
    dispatch(setEditorOpen(true));
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 w-full">
      <div className="w-full mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 py-2 sm:py-0 gap-2 sm:gap-0">
          {/* Logo */}
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-3xl">S</span>
              </div>
              <h1 className="text-3xl font-bold bg-pink-600 bg-clip-text text-transparent">
                <Link to={"/"}>StatusApp</Link>
              </h1>
            </div>
          </div>

          {/* User Menu */}
          <>
            <div className="flex gap-6 text-pink-500">
              <Link to={"/"}>Home</Link>
              <Link to={"/about"}>About</Link>
              <Link to={"/contact"}>Contact</Link>
              <Link to={"/faq"}>FAQ</Link>
            </div>

            {/* Search Bar */}
            <div className="w-full sm:flex-1 max-w-full sm:max-w-md mx-0 sm:mx-8 mb-2 sm:mb-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search statuses, categories..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gray-50 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={openEditor}
                className="flex items-center space-x-2 bg-pink-600 text-white px-3 sm:px-4 py-2 rounded-full hover:shadow-lg transition-shadow text-sm sm:text-base"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create</span>
              </button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Heart className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Bookmark className="w-5 h-5" />
              </motion.button>

              {currentUser && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden sm:inline text-sm font-medium text-gray-700">
                    {currentUser.name}
                  </span>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 text-gray-600 hover:text-purple-600 transition-colors md:hidden"
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            </div>
          </>
        </div>
      </div>
    </header>
  );
};

export default Header;

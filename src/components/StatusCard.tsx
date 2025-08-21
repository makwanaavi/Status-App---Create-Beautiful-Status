import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Bookmark, Share2, Eye } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Status } from '../store/slices/statusSlice';
import { toggleLike, toggleSave, setSelectedStatus } from '../store/slices/statusSlice';

interface StatusCardProps {
  status: Status;
  index: number;
}

const StatusCard: React.FC<StatusCardProps> = ({ status, index }) => {
  const dispatch = useDispatch();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(status.id));
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleSave(status.id));
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: 'Beautiful Status',
        text: status.text,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${status.text}\n\n- ${status.author}`);
    }
  };

  const handleView = () => {
    dispatch(setSelectedStatus(status));
  };

  const cardHeight = Math.floor(Math.random() * 100) + 220; // Random height between 220-320px for mobile

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group cursor-pointer"
      style={{ height: `clamp(180px, 30vw, ${cardHeight}px)` }}
      onClick={handleView}
    >
      <div 
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
        style={{ 
          background: status.background,
          fontFamily: status.font,
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
        
        {/* Content */}
        <div className="relative h-full p-3 sm:p-6 flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center">
            <p 
              className="text-center leading-relaxed"
              style={{ 
                color: status.color,
                fontSize: 'clamp(13px, 2.5vw, 18px)',
                textAlign: status.text.length > 100 ? 'left' : 'center'
              }}
            >
              {status.text}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <img 
                src={status.authorAvatar} 
                alt={status.author}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-xs font-medium text-white/90">
                {status.author}
              </span>
            </div>
            
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white/90">
              {status.category}
            </span>
          </div>
        </div>

        {/* Hover Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 flex space-x-1 sm:space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
              status.isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/20 text-white hover:bg-red-500'
            }`}
          >
            <Heart className="w-4 h-4" fill={status.isLiked ? 'currentColor' : 'none'} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
              status.isSaved 
                ? 'bg-yellow-500 text-white' 
                : 'bg-white/20 text-white hover:bg-yellow-500'
            }`}
          >
            <Bookmark className="w-4 h-4" fill={status.isSaved ? 'currentColor' : 'none'} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-white/20 text-white hover:bg-blue-500 flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Stats */}
        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 flex space-x-2 sm:space-x-4 text-xs text-white/80">
          <div className="flex items-center space-x-1">
            <Heart className="w-3 h-3" />
            <span>{status.likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bookmark className="w-3 h-3" />
            <span>{status.saves}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{Math.floor(Math.random() * 1000) + 100}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatusCard;
import React from "react";
import { motion } from "framer-motion";
import { Heart, Bookmark, Share2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { Status } from "../store/slices/statusSlice";
import {
  toggleLike,
  toggleSave,
  setSelectedStatus,
} from "../store/slices/statusSlice";

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
        title: "Beautiful Status",
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

  const cardHeight = Math.floor(Math.random() * 200) + 250; // Random height between 250-450px

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.04 }}
      className="group cursor-pointer"
      style={{ height: `${cardHeight}px` }}
      onClick={handleView}
    >
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/10"
        style={{
          background: status.background,
          fontFamily: status.font,
        }}
      >
        {/* Overlay with gradient glass effect */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 backdrop-blur-[2px] transition-all duration-500" />

        {/* Content */}
        <div className="relative h-full p-6 flex flex-col justify-between">
          {/* Main Text */}
          <div className="flex-1 flex items-center justify-center">
            <p
              className="text-center leading-relaxed drop-shadow-md"
              style={{
                color: status.color,
                fontSize: "clamp(15px, 2.5vw, 20px)",
                textAlign: status.text.length > 100 ? "left" : "center",
              }}
            >
              {status.text}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-white/90">
                {status.author}
              </span>
            </div>

            <span className="text-[10px] uppercase tracking-wide bg-white/20 px-3 py-1 rounded-full text-white/90 backdrop-blur-sm">
              {status.category}
            </span>
          </div>
        </div>

        {/* Hover Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500"
        >
          <motion.button
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-colors ${
              status.isLiked
                ? "bg-red-500 text-white"
                : "bg-white/20 text-white hover:bg-red-500"
            }`}
          >
            <Heart
              className="w-4 h-4"
              fill={status.isLiked ? "currentColor" : "none"}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-colors ${
              status.isSaved
                ? "bg-yellow-500 text-white"
                : "bg-white/20 text-white hover:bg-yellow-500"
            }`}
          >
            <Bookmark
              className="w-4 h-4"
              fill={status.isSaved ? "currentColor" : "none"}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-white/20 text-white hover:bg-blue-500 flex items-center justify-center backdrop-blur-md shadow-md transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatusCard;

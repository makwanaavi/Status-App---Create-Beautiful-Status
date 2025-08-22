import React from "react";
import { motion } from "framer-motion";
import { Heart, Bookmark, Share2, Download } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleLike, toggleSave, setSelectedStatus } from "../Redux/Action";

const StatusCard = ({ status, index }) => {
  const dispatch = useDispatch();

  const handleLike = (e) => {
    e.stopPropagation();
    dispatch(toggleLike(status.id));
  };

  const handleSave = (e) => {
    e.stopPropagation();
    dispatch(toggleSave(status.id));
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/status/${status.id}`;
    const shareText = `${status.text}\n\n- ${status.author}\n${shareUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Beautiful Status",
          text: status.text,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);

        // fallback to clipboard if user cancels or error occurs
        await navigator.clipboard.writeText(shareText);
        alert("Status link copied to clipboard!");
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      alert("Status link copied to clipboard!");
    } else {
      window.prompt("Copy this status link:", shareText);
    }
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create gradient background
    let fillStyle;
    if (status.background.includes("gradient")) {
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "#667eea");
      gradient.addColorStop(1, "#764ba2");
      fillStyle = gradient;
    } else {
      fillStyle = status.background;
    }
    ctx.fillStyle = fillStyle;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text
    ctx.fillStyle = status.color;
    ctx.font = `32px ${status.font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Word wrap
    const words = status.text.split(" ");
    const lines = [];
    let currentLine = "";
    for (const word of words) {
      const testLine = currentLine + (currentLine ? " " : "") + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > canvas.width - 100) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);

    const lineHeight = 50;
    const startY = canvas.height / 2 - (lines.length * lineHeight) / 2;
    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
    });

    // Download
    const link = document.createElement("a");
    link.download = `status-${status.id}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleView = () => {
    dispatch(setSelectedStatus(status));
  };

  return (
    <div
      className="group cursor-pointer m-2" // Add margin for spacing
      onClick={handleView}
    >
      <div
        className="relative w-full h-[320px] sm:h-[340px] md:h-[260px] lg:h-[380px] xl:h-[400px] max-w-[95vw] sm:max-w-[260px] md:max-w-[280px] !xl:max-w-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/10 bg-clip-padding"
        style={{
          background: status.background,
          fontFamily: status.font,
        }}
      >
        {/* Overlay with gradient glass effect */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 backdrop-blur-[2px] transition-all duration-500" />

        {/* Content */}
        <div className="relative h-full p-4 sm:p-6 flex flex-col justify-between">
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
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
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

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDownload}
            className="w-9 h-9 rounded-full bg-white/20 text-white hover:bg-green-500 flex items-center justify-center backdrop-blur-md shadow-md transition-colors"
          >
            <Download className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;


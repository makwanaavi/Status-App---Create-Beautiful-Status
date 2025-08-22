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

  // Card styles

  // Helper to determine if color is "light" or "dark"
  const isColorDark = (hex) => {
    // Remove hash if present
    hex = hex.replace("#", "");
    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  };

  const colors = [
    "#8B0000", // Dark Red
    "#FF4500", // Orange Red
    "#FFD700", // Golden Yellow
    "#006400", // Dark Green
    "#228B22", // Forest Green
    "#1E90FF", // Dodger Blue
    "#00008B", // Dark Blue
    "#4B0082", // Indigo
    "#800080", // Purple
    "#FF1493", // Deep Pink
    "#A52A2A", // Brown
    "#2F4F4F", // Dark Slate Gray
    "#20B2AA", // Light Sea Green
    "#FF6347", // Tomato
    "#4682B4", // Steel Blue
    "#DAA520", // Goldenrod
    "#C71585", // Medium Violet Red
    "#7B68EE", // Medium Slate Blue
    "#3CB371", // Medium Sea Green
    "#B22222", // Firebrick
  ];

  // Pick a random background color for each card instance
  const [bgColor] = React.useState(
    () => colors[Math.floor(Math.random() * colors.length)]
  );
  const textColor = isColorDark(bgColor) ? "#fff" : "#222";

  return (
    <div
      className="group cursor-pointer m-2 h-full w-full"
      onClick={handleView}
    >
      <div
        className="relative w-full h-[320px] sm:h-[340px] md:h-[260px] lg:h-[380px] xl:h-[400px] max-w-[95vw] sm:max-w-[260px] md:max-w-[280px] !xl:max-w-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/10 bg-clip-padding"
        style={{
          background: bgColor,
        }}
      >
        {/* Overlay with gradient glass effect */}
        <div className="absolute inset-0 transition-all duration-500" />

        {/* Content */}
        <div className="relative h-full p-4 sm:p-6 flex flex-col justify-between">
          {/* Main Text */}
          <div className="flex-1 flex items-center justify-center">
            <p
              className="text-center leading-relaxed drop-shadow-md"
              style={{
                color: textColor,
                fontSize: "clamp(15px, 2.5vw, 20px)",
                textAlign: status.text.length > 100 ? "left" : "center",
                textShadow: isColorDark(bgColor)
                  ? "0 2px 8px rgba(0,0,0,0.25)"
                  : "0 2px 8px rgba(255,255,255,0.25)",
                fontWeight: 600,
                letterSpacing: "0.01em",
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

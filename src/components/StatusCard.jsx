import React from "react";
import { motion } from "framer-motion";
import { Heart, Bookmark, Share2, Download, User } from "lucide-react";
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
    "#F8BBD0", // Light Pink
    "#E1BEE7", // Lavender
    "#BBDEFB", // Light Blue
    "#B2EBF2", // Aqua Blue
    "#C8E6C9", // Light Green
    "#DCEDC8", // Pale Green
    "#FFF9C4", // Light Yellow
    "#FFECB3", // Light Amber
    "#FFE0B2", // Light Orange
    "#FFCCBC", // Peach
    "#D7CCC8", // Beige
    "#F5F5F5", // Light Grey
    "#E0F7FA", // Cyan Tint
    "#F1F8E9", // Mint Green
    "#F9FBE7", // Lemon Tint
    "#FFF3E0", // Cream Orange
    "#F3E5F5", // Light Purple
    "#EDE7F6", // Soft Violet
    "#E8EAF6", // Pale Indigo
    "#ECEFF1", // Cool Grey
  ];

  // Pick a random background color for each card instance
  const [bgColor] = React.useState(
    () => colors[Math.floor(Math.random() * colors.length)]
  );
  const textColor = isColorDark(bgColor) ? "#fff" : "#222";

  // Glassmorphism overlay style
  const glassStyle = {
    background: "rgba(255,255,255,0.10)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    borderRadius: "1.25rem",
    border: "1px solid rgba(255,255,255,0.18)",
    zIndex: 2,
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  };

  // Card hover animation
  const cardMotion = {
    whileHover: {
      scale: 1.045,
      boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
    },
    whileTap: { scale: 0.98 },
  };

  // Avatar color
  const avatarBg = isColorDark(bgColor) ? "#fff" : "#222";
  const avatarColor = isColorDark(bgColor) ? "#222" : "#fff";

  // Responsive card size
  const [cardSize, setCardSize] = React.useState({ width: 160, height: 220 });

  React.useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1850) setCardSize({ width: 340, height: 400 });
      else if (w >= 1600) setCardSize({ width: 340, height: 400 });
      else if (w >= 1200) setCardSize({ width: 340, height: 400 });
      else if (w >= 900) setCardSize({ width: 340, height: 400 });
      else if (w >= 640) setCardSize({ width: 340, height: 400 });
      else setCardSize({ width: 340, height: 400 });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="group cursor-pointer m-2 h-full w-full flex flex-col items-center relative"
      onClick={handleView}
      {...cardMotion}
      style={{
        zIndex: 0,
        minWidth: cardSize.width,
        maxWidth: cardSize.width,
        minHeight: cardSize.height,
      }}
    >
      <div className="flex-1 flex flex-col">
        <div
          className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10"
          style={{
            background: bgColor,
            position: "relative",
            zIndex: 2,
            width: cardSize.width,
            height: cardSize.height,
            maxWidth: "98vw",
          }}
        >
          {/* Floating Avatar */}
          <div
            className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 shadow-lg"
            style={{
              background: avatarBg,
              color: avatarColor,
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid #ec4899",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: 1,
            }}
          >
            <User className="w-6 h-6" />
          </div>

          {/* Content */}
          <div className="relative h-full p-4 sm:p-6 flex flex-col justify-between z-10">
            {/* Main Text */}
            <div className="flex-1 flex items-center justify-center">
              <p
                className="text-center leading-relaxed drop-shadow-md"
                style={{
                  color: textColor,
                  fontSize: "clamp(16px, 2.5vw, 22px)",
                  textAlign: status.text.length > 100 ? "left" : "center",
                  textShadow: isColorDark(bgColor)
                    ? "0 2px 8px rgba(0,0,0,0.25)"
                    : "0 2px 8px rgba(255,255,255,0.25)",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  lineHeight: 1.5,
                  marginTop: 32,
                }}
              >
                {status.text}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-[10px] uppercase tracking-wide bg-pink-500 px-3 py-1 rounded-full text-white/90 backdrop-blur-sm">
                {status.category}
              </span>
            </div>
          </div>

          {/* Unique Docked Hover Actions */}
          <div className="absolute left-1/2 bottom-4 -translate-x-1/2 z-30 w-fit">
            <div className="dock-actions opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center gap-2 px-4 py-2 rounded-full glass-dock">
              <button
                title={status.isLiked ? "Unlike" : "Like"}
                onClick={handleLike}
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110
                  ${status.isLiked ? "bg-red-500 text-white" : "bg-white text-red-500"}`}
              >
                <Heart
                  className="w-5 h-5"
                  fill={status.isLiked ? "currentColor" : "none"}
                />
              </button>
              <button
                title={status.isSaved ? "Unsave" : "Save"}
                onClick={handleSave}
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110
                  ${status.isSaved ? "bg-yellow-500 text-white" : "bg-white text-yellow-500"}`}
              >
                <Bookmark
                  className="w-5 h-5"
                  fill={status.isSaved ? "currentColor" : "none"}
                />
              </button>
              <button
                title="Share"
                onClick={handleShare}
                className="w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110 bg-white text-blue-500"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                title="Download"
                onClick={handleDownload}
                className="w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110 bg-green-500 text-white"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
        @keyframes gradient-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .glass-dock {
          background: rgba(255,255,255,0.18);
          box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.10);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.18);
        }
        `}
      </style>
    </div>
  );
};

export default StatusCard;

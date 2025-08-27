import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Type, Palette, Image, Download, Share2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setText,
  setFont,
  setFontSize,
  setColor,
  setBackground,
  setAlignment,
  setEditorOpen,
  resetEditor,
  addStatus,
} from "../Redux/Action";
import { useLocation, useNavigate } from "react-router-dom";

const CATEGORIES = [
  "All",
  "Love",
  "Motivational",
  "Sad",
  "Funny",
  "Life",
  "Friendship",
  "Success",
  "Travel",
  "Nature",
  "Wisdom",
  "Happiness",
  "Dreams",
  "Faith",
  "Family",
  "Attitude",
  "Birthday",
  "Good Morning",
  "Good Night",
  "Festival",
  "Fashion",
  "Sports",
  "Music",
  "Food",
  "Technology",
];

const StatusEditor = ({ fullPage = false }) => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isRoute = location.pathname === "/create" || fullPage;
  const {
    text,
    font,
    fontSize,
    color,
    background,
    alignment,
    isEditorOpen,
    availableFonts,
    availableBackgrounds,
  } = useSelector((state) => state.editor);
  const [category, setCategory] = useState(CATEGORIES[1]);
  const [alignX, setAlignX] = useState(50); // 0 = left, 100 = right
  const [alignY, setAlignY] = useState(50); // 0 = top, 100 = bottom

  // Prefill editor if status data is passed via navigation
  useEffect(() => {
    if (location.state && location.state.status) {
      const s = location.state.status;
      dispatch(setText(s.text));
      dispatch(setFont(s.font));
      dispatch(setFontSize(24));
      dispatch(setColor(s.color));
      dispatch(setBackground(s.background));
      dispatch(setAlignment(s.alignment || "center"));
      setCategory(s.category || CATEGORIES[1]);
      if (s.alignX !== undefined) setAlignX(s.alignX);
      if (s.alignY !== undefined) setAlignY(s.alignY);
    }
    // eslint-disable-next-line
  }, [location.state]);

  const handleClose = () => {
    if (isRoute) {
      navigate(-1);
    } else {
      dispatch(setEditorOpen(false));
    }
  };

  const handleSave = () => {
    if (!text.trim()) return;

    const newStatus = {
      id: Date.now().toString(),
      text: text.trim(),
      category: category,
      background,
      font,
      color,
      likes: 0,
      saves: 0,
      isLiked: false,
      isSaved: true,
      createdAt: new Date().toISOString().split("T")[0],
      tags: ["custom", "personal"],
      type: "quote",
      alignment,
      alignX,
      alignY,
    };

    dispatch(addStatus(newStatus));
    dispatch(resetEditor());
    setCategory(CATEGORIES[1]);
    setAlignX(50);
    setAlignY(50);
    dispatch(setEditorOpen(false));
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 800;
    canvas.height = 600;

    // Create gradient background
    let fillStyle;
    if (background.includes("gradient")) {
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
      fillStyle = background;
    }

    ctx.fillStyle = fillStyle;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text
    ctx.fillStyle = color;
    ctx.font = `${fontSize * 2}px ${font}`;
    ctx.textAlign = alignment;
    ctx.textBaseline = "top";

    // Word wrap
    const maxWidth = canvas.width - 100;
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";
    for (const word of words) {
      const testLine = currentLine + (currentLine ? " " : "") + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);

    const lineHeight = fontSize * 2.5;
    const totalTextHeight = lines.length * lineHeight;

    // Calculate x, y based on alignX, alignY (0-100%)
    let x;
    if (alignment === "left")
      x =
        50 + ((canvas.width - 100) * alignX) / 100 - maxWidth * (alignX / 100);
    else if (alignment === "right")
      x =
        50 +
        ((canvas.width - 100) * alignX) / 100 +
        maxWidth * ((100 - alignX) / 100);
    else x = 50 + ((canvas.width - 100) * alignX) / 100;
    const y = 50 + ((canvas.height - totalTextHeight - 100) * alignY) / 100;

    lines.forEach((line, index) => {
      ctx.textAlign = alignment;
      ctx.fillText(line, x, y + index * lineHeight);
    });

    // Download
    const link = document.createElement("a");
    link.download = `status-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  if (!isRoute && !isEditorOpen) return null;

  const editorContent = (
    <div
      className={`w-full flex flex-col md:flex-row items-center justify-center ${
        fullPage ? "min-h-[70vh]  mx-auto my-8" : "h-full"
      }`}
    >
      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center p-1 sm:p-2 md:p-4">
        <div
          className={`relative w-full max-w-[95vw] sm:max-w-lg md:max-w-2xl aspect-square rounded-2xl overflow-hidden shadow-2xl ${
            fullPage ? "border border-gray-200 bg-white" : ""
          }`}
          style={{ background, fontFamily: font }}
        >
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
          <div className="relative h-full p-4 sm:p-8 flex items-center justify-center">
            {/* Textarea with absolute positioning based on alignX/alignY */}
            <div
              style={{
                position: "absolute",
                left: `${alignX}%`,
                top: `${alignY}%`,
                transform: "translate(-50%, -50%)",
                width: "calc(100% - 4rem)",
                maxWidth: "100%",
                height: "auto",
                maxHeight: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "auto",
              }}
            >
              <textarea
                value={text}
                onChange={(e) => dispatch(setText(e.target.value))}
                placeholder="Start typing your status..."
                className={`w-full bg-transparent border-none outline-none resize-none placeholder-white/50`}
                style={{
                  color,
                  fontSize: `clamp(14px, ${fontSize}px, 32px)`,
                  textAlign: alignment,
                  fontFamily: font,
                  overflow: "hidden",
                  minHeight: "60px",
                  maxHeight: "300px",
                  padding: 0,
                  margin: 0,
                  background: "transparent",
                  wordBreak: "break-word",
                }}
                rows={3}
                maxLength={300}
              />
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
      {/* Editor Panel */}
      <motion.div
        initial={fullPage ? false : { x: 400, opacity: 0 }}
        animate={fullPage ? false : { x: 0, opacity: 1 }}
        exit={fullPage ? false : { x: 400, opacity: 0 }}
        className={`w-[50%] bg-white shadow-2xl flex flex-col ${
          fullPage
            ? "rounded-2xl border border-gray-200 mt-6 md:mt-0 md:ml-8"
            : ""
        }`}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Status Editor
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* Tools */}
        <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
          {/* Category Selection */}
          <div className="flex w-full gap-4 justify-between">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <span>Category</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {CATEGORIES.filter((cat) => cat !== "All").map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          {/* Font Selection */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <Type className="w-4 h-4" />
              <span>Font</span>
            </label>
            <select
              value={font}
              onChange={(e) => dispatch(setFont(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {availableFonts.map((fontName) => (
                <option
                  key={fontName}
                  value={fontName}
                  style={{ fontFamily: fontName }}
                >
                  {fontName}
                </option>
              ))}
            </select>
          </div>
          </div>
          {/* Font Size */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Font Size: {fontSize}px
            </label>
            <input
              type="range"
              min="12"
              max="48"
              value={fontSize}
              onChange={(e) => dispatch(setFontSize(Number(e.target.value)))}
              className="w-full"
            />
          </div>
          {/* Text Color */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <Palette className="w-4 h-4" />
              <span>Text Color</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={color}
                onChange={(e) => dispatch(setColor(e.target.value))}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => dispatch(setColor(e.target.value))}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                placeholder="#ffffff"
              />
            </div>
          </div>
          {/* Text Alignment */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Text Alignment
            </label>
            <div className="flex space-x-2 mb-2">
              {["left", "center", "right"].map((align) => (
                <button
                  key={align}
                  onClick={() => dispatch(setAlignment(align))}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    alignment === align
                      ? "bg-purple-100 text-purple-700"
                      : " text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {align.charAt(0).toUpperCase() + align.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex w-full gap-4 mt-12">
              <div className="flex-1">
                <span className="text-xs text-gray-500 block mb-1">
                  Horizontal: {alignX}%
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={alignX}
                  onChange={(e) => setAlignX(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="flex-1">
                <span className="text-xs text-gray-500 block mb-1">
                  Vertical: {alignY}%
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={alignY}
                  onChange={(e) => setAlignY(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          {/* Background Selection */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <Image className="w-4 h-4" />
              <span>Background</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableBackgrounds.map((bg, index) => (
                <button
                  key={index}
                  onClick={() => dispatch(setBackground(bg))}
                  className={`w-full h-12 rounded-lg border-2 transition-all ${
                    background === bg ? "" : ""
                  }`}
                  style={{ background: bg }}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Actions */}
        <div className="p-4 sm:p-6 border-t border-gray-200 space-y-2 sm:space-y-3" >
          <button
            onClick={handleDownload}
            disabled={!text.trim()}
            className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
          <button
            onClick={handleSave}
            disabled={!text.trim()}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Share2 className="w-4 h-4" />
            <span>Save & Share</span>
          </button>
        </div>
      </motion.div>
    </div>
  );

  if (isRoute && fullPage) {
    // Render as a page (no modal, no AnimatePresence)
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header and Footer will be rendered by parent (App.jsx) */}
        <main className="flex-1 flex items-center justify-center">
          {editorContent}
        </main>
      </div>
    );
  }

  // Modal overlay for popup mode
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 backdrop-blur-sm"
      >
        {editorContent}
      </motion.div>
    </AnimatePresence>
  );
};

export default StatusEditor;

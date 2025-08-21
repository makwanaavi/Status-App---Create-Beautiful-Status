import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Type, Palette, Image, Download, Share2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  setText,
  setFont,
  setFontSize,
  setColor,
  setBackground,
  setAlignment,
  setEditorOpen,
  resetEditor,
} from '../store/slices/editorSlice';
import { addStatus } from '../store/slices/statusSlice';

const StatusEditor: React.FC = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
  } = useSelector((state: RootState) => state.editor);

  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleClose = () => {
    dispatch(setEditorOpen(false));
  };

  const handleSave = () => {
    if (!text.trim() || !currentUser) return;

    const newStatus = {
      id: Date.now().toString(),
      text: text.trim(),
      category: 'Custom',
      author: currentUser.name,
      authorAvatar: currentUser.avatar,
      background,
      font,
      color,
      likes: 0,
      saves: 0,
      isLiked: false,
      isSaved: true,
      createdAt: new Date().toISOString().split('T')[0],
      tags: ['custom', 'personal'],
      type: 'quote' as const,
    };

    dispatch(addStatus(newStatus));
    dispatch(resetEditor());
    dispatch(setEditorOpen(false));
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // Create gradient background
    let fillStyle;
    if (background.includes('gradient')) {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(1, '#764ba2');
      fillStyle = gradient;
    } else {
      fillStyle = background;
    }

    ctx.fillStyle = fillStyle;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text
    ctx.fillStyle = color;
    ctx.font = `${fontSize * 2}px ${font}`;
    ctx.textAlign = alignment as CanvasTextAlign;
    ctx.textBaseline = 'middle';

    const x = alignment === 'left' ? 50 : alignment === 'right' ? canvas.width - 50 : canvas.width / 2;
    
    // Word wrap
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > canvas.width - 100) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);

    const lineHeight = fontSize * 2.5;
    const startY = canvas.height / 2 - (lines.length * lineHeight) / 2;

    lines.forEach((line, index) => {
      ctx.fillText(line, x, startY + index * lineHeight);
    });

    // Download
    const link = document.createElement('a');
    link.download = `status-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  if (!isEditorOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      >
        <div className="h-full flex flex-col md:flex-row">
          
          {/* Canvas Area */}
          <div className="flex-1 flex items-center justify-center p-2 sm:p-4 md:p-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-xs sm:max-w-lg md:max-w-2xl aspect-square rounded-2xl overflow-hidden shadow-2xl"
              style={{ background, fontFamily: font }}
            >
              <div className="absolute inset-0 bg-black/5" />
              <div className="relative h-full p-4 sm:p-8 flex items-center justify-center">
                <textarea
                  value={text}
                  onChange={(e) => dispatch(setText(e.target.value))}
                  placeholder="Start typing your status..."
                  className="w-full h-full bg-transparent border-none outline-none resize-none text-center placeholder-white/50"
                  style={{
                    color,
                    fontSize: `clamp(14px, ${fontSize}px, 32px)`,
                    textAlign: alignment,
                    fontFamily: font,
                  }}
                />
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </motion.div>
          </div>

          {/* Editor Panel */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="w-full md:w-80 bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Status Editor</h2>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-pink-600 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tools */}
            <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
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
                    <option key={fontName} value={fontName} style={{ fontFamily: fontName }}>
                      {fontName}
                    </option>
                  ))}
                </select>
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
                <div className="flex space-x-2">
                  {['left', 'center', 'right'].map((align) => (
                    <button
                      key={align}
                      onClick={() => dispatch(setAlignment(align as 'left' | 'center' | 'right'))}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                        alignment === align
                          ? 'bg-purple-100 border-purple-500 text-purple-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {align.charAt(0).toUpperCase() + align.slice(1)}
                    </button>
                  ))}
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
                        background === bg ? 'border-purple-500 scale-105' : 'border-gray-200'
                      }`}
                      style={{ background: bg }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 sm:p-6 border-t border-gray-200 space-y-2 sm:space-y-3">
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
      </motion.div>
    </AnimatePresence>
  );
};

export default StatusEditor;
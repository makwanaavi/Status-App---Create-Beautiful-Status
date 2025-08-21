import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../store/store';
import StatusCard from './StatusCard';

const StatusGrid: React.FC = () => {
  const { filteredStatuses, loading } = useSelector((state: RootState) => state.status);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const grid = gridRef.current;
      const resizeGridItem = (item: HTMLElement) => {
        const gridRowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        const gridRowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
        const rowSpan = Math.ceil((item.querySelector('.status-card')?.scrollHeight || 0 + gridRowGap) / (gridRowHeight + gridRowGap));
        item.style.gridRowEnd = `span ${rowSpan}`;
      };

      const resizeAllGridItems = () => {
        const allItems = grid.querySelectorAll('.grid-item');
        allItems.forEach((item) => resizeGridItem(item as HTMLElement));
      };

      // Initial resize
      setTimeout(resizeAllGridItems, 100);

      // Resize on window resize
      window.addEventListener('resize', resizeAllGridItems);
      return () => window.removeEventListener('resize', resizeAllGridItems);
    }
  }, [filteredStatuses]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-purple-200 border-t-pink-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-6 px-2 sm:py-8 sm:px-4 max-w-full sm:max-w-7xl mx-auto">
      <motion.div
        ref={gridRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid gap-4 sm:gap-6 auto-rows-[10px]"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        }}
      >
        {filteredStatuses.map((status, index) => (
          <div key={status.id} className="grid-item">
            <div className="status-card">
              <StatusCard status={status} index={index} />
            </div>
          </div>
        ))}
      </motion.div>

      {filteredStatuses.length === 0 && (
        <div className="text-center py-16 sm:py-20">
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl sm:text-3xl">🔍</span>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No statuses found</h3>
          <p className="text-gray-600 text-sm sm:text-base">Try adjusting your search or browse different categories</p>
        </div>
      )}
    </section>
  );
};

export default StatusGrid;
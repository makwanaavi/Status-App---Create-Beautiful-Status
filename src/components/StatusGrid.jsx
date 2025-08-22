import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import StatusCard from "./StatusCard";

const StatusGrid = () => {
  const { filteredStatuses, loading } = useSelector(
    (state) => state.status
  );
  const gridRef = useRef(null);
  const [page, setPage] = useState(1);
  const cardsPerPage = 20;
  const totalPages = Math.ceil(filteredStatuses.length / cardsPerPage);

  useEffect(() => {
    if (gridRef.current) {
      const grid = gridRef.current;
      const resizeGridItem = (item) => {
        const gridRowHeight = parseInt(
          window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
        );
        const gridRowGap = parseInt(
          window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
        );
        const rowSpan = Math.ceil(
          (item.querySelector(".status-card")?.scrollHeight || 0 + gridRowGap) /
            (gridRowHeight + gridRowGap)
        );
        item.style.gridRowEnd = `span ${rowSpan}`;
      };

      const resizeAllGridItems = () => {
        const allItems = grid.querySelectorAll(".grid-item");
        allItems.forEach((item) => resizeGridItem(item));
      };

      // Initial resize
      setTimeout(resizeAllGridItems, 100);

      // Resize on window resize
      window.addEventListener("resize", resizeAllGridItems);
      return () => window.removeEventListener("resize", resizeAllGridItems);
    }
  }, [filteredStatuses, page, totalPages]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 ">
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
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        }}
      >
        {filteredStatuses
          .slice((page - 1) * cardsPerPage, page * cardsPerPage)
          .map((status, index) => (
            <div key={status.id} className="grid-item">
              <div className="status-card">
                <StatusCard status={status} index={index} />
              </div>
            </div>
          ))}
      </motion.div>

      {/* Pagination Controls */}
      {filteredStatuses.length > cardsPerPage && (
        <div className="flex justify-center items-center mt-8 space-x-12">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-pink-500 font-medium disabled:opacity-50 mt-12"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="px-2 text-gray-700 mt-12">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-4 py-2 rounded bg-gray-200 text-pink-500 font-medium disabled:opacity-50 mt-12"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {filteredStatuses.length === 0 && (
        <div className="text-center py-16 sm:py-20">
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl sm:text-3xl">🔍</span>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            No statuses found
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Try adjusting your search or browse different categories
          </p>
        </div>
      )}
    </section>
  );
};

export default StatusGrid;

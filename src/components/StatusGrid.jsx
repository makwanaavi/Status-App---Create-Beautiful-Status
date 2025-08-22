import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
  import StatusCard from "./StatusCard";

const StatusGrid = () => {
  const { filteredStatuses, loading } = useSelector((state) => state.status);
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
    <section
      className="py-8 px-2 sm:py-12 sm:px-4 max-w-full  mx-auto relative"
      style={{
        overflow: "hidden",
      }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 z-0 pointer-events-none" />
      <div
        ref={gridRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid gap-8 sm:gap-10 auto-rows-[10px] relative z-10"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        {filteredStatuses
          .slice((page - 1) * cardsPerPage, page * cardsPerPage)
          .map((status, index) => (
            <div key={status.id} className="grid-item flex justify-center">
              <div className="status-card w-full">
                <StatusCard status={status} index={index} />
              </div>
            </div>
          ))}
      </div>

      {/* Pagination Controls */}
      {filteredStatuses.length > cardsPerPage && (
        <div className="flex flex-col items-center mt-8 space-y-4">
          <div className="flex justify-center items-center space-x-12">
            <button
              className="px-4 py-2 rounded bg-gray-200 text-pink-500 font-medium disabled:opacity-50 mt-12"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span className="px-2 text-gray-700 mt-12">
              Page {page} of {totalPages}
            </span>

            <button
              className="px-4 py-2 rounded bg-gray-200 text-pink-500 font-medium disabled:opacity-50 mt-12"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
          {/* Numbered page buttons */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded-full border text-sm font-semibold transition-colors ${
                  page === i + 1
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white text-pink-500 border-gray-300 hover:bg-pink-100"
                }`}
                onClick={() => setPage(i + 1)}
                disabled={page === i + 1}
              >
                {i + 1}
              </button>
            ))}
          </div>
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
      <style>
        {`
        @keyframes bg-move {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        `}
      </style>
    </section>
  );
};

export default StatusGrid;

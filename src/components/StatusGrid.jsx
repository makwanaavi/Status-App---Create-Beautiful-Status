import React, { useState } from "react";
import { useSelector } from "react-redux";
import StatusCard from "./StatusCard";

const StatusGrid = () => {
  const { filteredStatuses, loading } = useSelector((state) => state.status);
  const [page, setPage] = useState(1);
  const cardsPerPage = 24;
  const totalPages = Math.ceil(filteredStatuses.length / cardsPerPage);

  // Calculate cards for current page and empty slots
  const pageStatuses = filteredStatuses.slice((page - 1) * cardsPerPage, page * cardsPerPage);
  const emptySlots = cardsPerPage - pageStatuses.length;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 ">
        <div className="w-12 h-12 border-4 border-purple-200 border-t-pink-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section
      className="py-8 px-2 sm:py-12 sm:px-4 max-w-full mx-auto relative"
      style={{
        overflow: "hidden",
      }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 z-0 pointer-events-none" />
      <div
        className="flex flex-wrap gap-8 sm:gap-10 relative z-10"
        style={{
          justifyContent: "flex-start",
        }}
      >
        {pageStatuses.map((status, index) => (
          <div key={status.id} className="flex justify-center items-stretch" style={{ flex: "1 0 260px", maxWidth: 340 }}>
            <div className="w-full h-full flex">
              <StatusCard status={status} index={index} />
            </div>
          </div>
        ))}
        {/* Empty slots to fill up to 24 cards per page */}
        {Array.from({ length: emptySlots }).map((_, idx) => (
          <div
            key={`empty-${idx}`}
            className="flex justify-center items-stretch opacity-0"
            style={{ flex: "1 0 260px", maxWidth: 340, minHeight: 320 }}
          >
            {/* Empty placeholder */}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {filteredStatuses.length > cardsPerPage && (
        <div className="flex flex-col items-center mt-8 space-y-4">
          <div className="flex justify-center items-center space-x-12">
            <button
              className="px-4 py-2 rounded text-white bg-pink-500 font-medium disabled:opacity-50 mt-12"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span className="px-2 text-gray-700 mt-12">
              Page {page} of {totalPages}
            </span>

            <button
              className="px-4 py-2 rounded text-white bg-pink-500 font-medium disabled:opacity-50 mt-12"
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

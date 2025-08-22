import React from "react";
import { useSelector } from "react-redux";
import StatusCard from "../components/StatusCard";
import Header from "../components/Header";
import CategoryFilter from "../components/CategoryFilter";
import Footer from "../components/Footer";

const LikedStatuses = () => {
  const { statuses, activeCategory } = useSelector((state) => state.status);

  const liked = statuses.filter((s) => s.isLiked);

  // Filter by activeCategory from Redux
  const filteredLiked =
    activeCategory === "All"
      ? liked
      : liked.filter((s) => s.category === activeCategory);

  const cardsPerPage = 24;
  const pageLiked = filteredLiked.slice(0, cardsPerPage);
  const emptySlots = cardsPerPage - pageLiked.length;

  return (
    <>
      <Header />
      {/* Category Filter Dropdown */}
      <div className="bg-white py-4">
        <div className="container mx-auto px-4">
          <CategoryFilter />
        </div>
      </div>
      <section className="py-8 px-4 max-w-7xl mx-auto min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-pink-600">
          Liked Statuses
        </h2>
        {filteredLiked.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            No liked statuses yet.
          </div>
        ) : (
          <div className="flex gap-4 flex-wrap">
            {pageLiked.map((status, idx) => (
              <div
                key={status.id}
                className="flex justify-center items-stretch h-full"
              >
                <StatusCard status={status} index={idx} />
              </div>
            ))}
            {Array.from({ length: emptySlots }).map((_, idx) => (
              <div key={`empty-liked-${idx}`} className="opacity-0 h-full">
                {/* Empty placeholder */}
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default LikedStatuses;


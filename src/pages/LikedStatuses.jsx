import React, { useState } from "react";
import { useSelector } from "react-redux";
import StatusCard from "../components/StatusCard";
import Header from "../components/Header";
import CategoryFilter from "../components/CategoryFilter";

const LikedStatuses = () => {
  const { statuses } = useSelector((state) => state.status);
  const categories = [
    "All",
    ...Array.from(new Set(statuses.map((s) => s.category))),
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const liked = statuses.filter((s) => s.isLiked);
  const filteredLiked =
    selectedCategory === "All"
      ? liked
      : liked.filter((s) => s.category === selectedCategory);

  const cardsPerPage = 24;
  const pageLiked = filteredLiked.slice(0, cardsPerPage);
  const emptySlots = cardsPerPage - pageLiked.length;

  return (
    <>
      <Header />
      {/* Category Filter Dropdown */}
      <div className="flex justify-end mx-12 mt-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <CategoryFilter />
      <section className="py-8 px-4 mx-12">
        <h2 className="text-2xl font-bold mb-6 text-pink-600">
          Liked Statuses
        </h2>
        {filteredLiked.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            No liked statuses yet.
          </div>
        ) : (
          <div
            className="flex flex-wrap gap-8 sm:gap-10"
            style={{
              justifyContent: "flex-start",
            }}
          >
            {pageLiked.map((status, idx) => (
              <div
                key={status.id}
                className="flex justify-center items-stretch"
                style={{ flex: "1 0 260px", maxWidth: 340 }}
              >
                <div className="w-full h-full flex">
                  <StatusCard status={status} index={idx} />
                </div>
              </div>
            ))}
            {/* Empty slots to fill up to 24 cards */}
            {Array.from({ length: emptySlots }).map((_, idx) => (
              <div
                key={`empty-liked-${idx}`}
                className="flex justify-center items-stretch opacity-0"
                style={{ flex: "1 0 260px", maxWidth: 340, minHeight: 320 }}
              >
                {/* Empty placeholder */}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default LikedStatuses;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import StatusCard from "../components/StatusCard";
import Header from "../components/Header";
import CategoryFilter from "../components/CategoryFilter";

const BookmarkedStatuses = () => {
  const { statuses } = useSelector((state) => state.status);
  const categories = ["All", ...Array.from(new Set(statuses.map((s) => s.category)))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const bookmarked = statuses.filter((s) => s.isSaved);
  const filteredBookmarked =
    selectedCategory === "All"
      ? bookmarked
      : bookmarked.filter((s) => s.category === selectedCategory);

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
        <h2 className="text-2xl font-bold mb-6 text-pink-500">Bookmarked Statuses</h2>
        {filteredBookmarked.length === 0 ? (
          <div className="text-center text-gray-500 py-16">No bookmarked statuses yet.</div>
        ) : (
          <div
            className="flex flex-wrap gap-8 sm:gap-10"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            }}
          >
            {filteredBookmarked.map((status, idx) => (
              <div key={status.id} className="flex justify-center">
                <StatusCard status={status} index={idx} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default BookmarkedStatuses;

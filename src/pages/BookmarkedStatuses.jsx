import React, { useState } from "react";
import { useSelector } from "react-redux";
import StatusCard from "../components/StatusCard";
import Header from "../components/Header";
import CategoryFilter from "../components/CategoryFilter";
import Footer from "../components/Footer";

const BookmarkedStatuses = () => {
  const { statuses } = useSelector((state) => state.status);
  const categories = [
    "All",
    ...Array.from(new Set(statuses.map((s) => s.category))),
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const bookmarked = statuses.filter((s) => s.isSaved);
  const filteredBookmarked =
    selectedCategory === "All"
      ? bookmarked
      : bookmarked.filter((s) => s.category === selectedCategory);

  const cardsPerPage = 24;
  const pageBookmarked = filteredBookmarked.slice(0, cardsPerPage);
  const emptySlots = cardsPerPage - pageBookmarked.length;

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
          Bookmarked Statuses
        </h2>
        {filteredBookmarked.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            No bookmarked statuses yet.
          </div>
        ) : (
          <div className="flex gap-4">
            {pageBookmarked.map((status, idx) => (
              <div key={status.id} className="flex justify-center items-stretch h-full">
                <StatusCard status={status} index={idx} />
              </div>
            ))}
            {/* Empty slots to fill up to 24 cards */}
            {Array.from({ length: emptySlots }).map((_, idx) => (
              <div
                key={`empty-bookmarked-${idx}`}
                className="opacity-0 h-full"
              >
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

export default BookmarkedStatuses;


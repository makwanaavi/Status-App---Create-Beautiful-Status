import React from "react";
import { useSelector } from "react-redux";
import StatusCard from "../components/StatusCard";
import Header from "../components/Header";
import CategoryFilter from "../components/CategoryFilter";

const BookmarkedStatuses = () => {
  const { statuses } = useSelector((state) => state.status);
  const bookmarked = statuses.filter((s) => s.isSaved);

  return (
    <>
      <Header />
      <CategoryFilter />
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-yellow-500">Bookmarked Statuses</h2>
        {bookmarked.length === 0 ? (
          <div className="text-center text-gray-500 py-16">No bookmarked statuses yet.</div>
        ) : (
          <div className="grid gap-4 sm:gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
            {bookmarked.map((status, idx) => (
              <StatusCard key={status.id} status={status} index={idx} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default BookmarkedStatuses;

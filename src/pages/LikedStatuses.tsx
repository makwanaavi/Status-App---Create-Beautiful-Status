import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import StatusCard from "../components/StatusCard";

const LikedStatuses: React.FC = () => {
  const { statuses } = useSelector((state: RootState) => state.status);
  const liked = statuses.filter((s) => s.isLiked);

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-pink-600">Liked Statuses</h2>
      {liked.length === 0 ? (
        <div className="text-center text-gray-500 py-16">No liked statuses yet.</div>
      ) : (
        <div className="grid gap-4 sm:gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
          {liked.map((status, idx) => (
            <StatusCard key={status.id} status={status} index={idx} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LikedStatuses;

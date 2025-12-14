import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axios from "axios";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { ContestCard } from "../../ContestCard/ContestCard";

const PopularContests = () => {
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["popularContests"],
    queryFn: async () => {
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/contests/popular`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold">🔥 Popular Contests</h2>
            <p className="text-gray-500 mt-1">
              Most participated contests right now
            </p>
          </div>

          <Link
            to="/contests"
            className="btn btn-outline btn-primary mt-4 md:mt-0"
          >
            Show All
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contests.map((contest) => (
            <ContestCard key={contest._id} contest={contest} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularContests;

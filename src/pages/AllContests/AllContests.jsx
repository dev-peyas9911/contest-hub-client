// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import Container from "../../components/Shared/Container";
// import axios from "axios";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import { ContestCard } from "../../components/ContestCard/ContestCard";

// const AllContests = () => {
//   const [activeTab, setActiveTab] = useState("All");

//   // search fuctionality starts here

//   // search fuctionality ends here

//   const { data: contests = [], isLoading } = useQuery({
//     queryKey: ["contests"],
//     queryFn: async () => {
//       const result = await axios(`${import.meta.env.VITE_API_URL}/contests`);
//       return result.data;
//     },
//   });

//   // Filter contests by category tab
//   const filtered =
//     activeTab === "All"
//       ? contests
//       : contests.filter((c) => c.contestType === activeTab);

//   // Extract unique contest types for tabs
//   const contestTypes = ["All", ...new Set(contests.map((c) => c.contestType))];

//   if (isLoading) return <LoadingSpinner></LoadingSpinner>;
//   return (
//     <Container>
//       <div className="py-2 max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-6">All Contests</h1>

//         {/* Tabs */}
//         <div
//           role="tablist"
//           className="tabs tabs-boxed justify-center mb-8 bg-base-200 p-2 rounded-xl"
//         >
//           {contestTypes.map((type) => (
//             <button
//               key={type}
//               role="tab"
//               className={`tab px-5 ${activeTab === type ? "tab-active" : ""}`}
//               onClick={() => setActiveTab(type)}
//             >
//               {type}
//             </button>
//           ))}
//         </div>

//         {/* Grid Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filtered.map((contest) => (
//             <ContestCard key={contest._id} contest={contest} />
//           ))}
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default AllContests;

// new

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import Container from "../../components/Shared/Container";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { ContestCard } from "../../components/ContestCard/ContestCard";

const AllContests = () => {
  const [activeTab, setActiveTab] = useState("All");

  // 🔎 Read search from URL
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["contests", search],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/contests${
          search ? `?search=${search}` : ""
        }`
      );
      return result.data;
    },
  });

  // Filter contests by category tab (on searched data)
  const filtered =
    activeTab === "All"
      ? contests
      : contests.filter((c) => c.contestType === activeTab);

  // Extract unique contest types from filtered data
  const contestTypes = ["All", ...new Set(contests.map((c) => c.contestType))];

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <div className="py-2 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          {search ? `Search Result for "${search}"` : "All Contests"}
        </h1>

        {/* Tabs */}
        <div
          role="tablist"
          className="tabs tabs-boxed justify-center mb-8 bg-base-200 p-2 rounded-xl"
        >
          {contestTypes.map((type) => (
            <button
              key={type}
              role="tab"
              className={`tab px-5 ${activeTab === type ? "tab-active" : ""}`}
              onClick={() => setActiveTab(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No contests found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((contest) => (
              <ContestCard key={contest._id} contest={contest} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default AllContests;

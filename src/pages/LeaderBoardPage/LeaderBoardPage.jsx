import React, { useState } from "react";
import {
  FaTrophy,
  FaMedal,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// Full static data (more than 10 items to demonstrate pagination)
const fullLeaderboardData = [
  {
    rank: 1,
    username: "CodeMaster42",
    score: 1500,
    avatar: "https://via.placeholder.com/40?text=CM",
  },
  {
    rank: 2,
    username: "AlgoWizard",
    score: 1450,
    avatar: "https://via.placeholder.com/40?text=AW",
  },
  {
    rank: 3,
    username: "DataNinja",
    score: 1400,
    avatar: "https://via.placeholder.com/40?text=DN",
  },
  {
    rank: 4,
    username: "BugHunterPro",
    score: 1350,
    avatar: "https://via.placeholder.com/40?text=BH",
  },
  {
    rank: 5,
    username: "LogicQueen",
    score: 1300,
    avatar: "https://via.placeholder.com/40?text=LQ",
  },
  {
    rank: 6,
    username: "SpeedCoder",
    score: 1250,
    avatar: "https://via.placeholder.com/40?text=SC",
  },
  {
    rank: 7,
    username: "PuzzleKing",
    score: 1200,
    avatar: "https://via.placeholder.com/40?text=PK",
  },
  {
    rank: 8,
    username: "ByteWarrior",
    score: 1150,
    avatar: "https://via.placeholder.com/40?text=BW",
  },
  {
    rank: 9,
    username: "ScriptGuru",
    score: 1100,
    avatar: "https://via.placeholder.com/40?text=SG",
  },
  {
    rank: 10,
    username: "HackEnthusiast",
    score: 1050,
    avatar: "https://via.placeholder.com/40?text=HE",
  },
  {
    rank: 11,
    username: "AlgoAce",
    score: 1020,
    avatar: "https://via.placeholder.com/40?text=AA",
  },
  {
    rank: 12,
    username: "DevChampion",
    score: 990,
    avatar: "https://via.placeholder.com/40?text=DC",
  },
  {
    rank: 13,
    username: "CodeCrusher",
    score: 960,
    avatar: "https://via.placeholder.com/40?text=CC",
  },
  {
    rank: 14,
    username: "BitMaster",
    score: 930,
    avatar: "https://via.placeholder.com/40?text=BM",
  },
  {
    rank: 15,
    username: "SyntaxSorcerer",
    score: 900,
    avatar: "https://via.placeholder.com/40?text=SS",
  },
  {
    rank: 16,
    username: "LoopLegend",
    score: 870,
    avatar: "https://via.placeholder.com/40?text=LL",
  },
  {
    rank: 17,
    username: "RecursionRuler",
    score: 840,
    avatar: "https://via.placeholder.com/40?text=RR",
  },
  {
    rank: 18,
    username: "ArrayAvenger",
    score: 810,
    avatar: "https://via.placeholder.com/40?text=AV",
  },
  {
    rank: 19,
    username: "StackSmash",
    score: 780,
    avatar: "https://via.placeholder.com/40?text=SM",
  },
  {
    rank: 20,
    username: "PointerPro",
    score: 750,
    avatar: "https://via.placeholder.com/40?text=PP",
  },
  {
    rank: 21,
    username: "BinaryBoss",
    score: 720,
    avatar: "https://via.placeholder.com/40?text=BB",
  },
  {
    rank: 22,
    username: "DebugDiva",
    score: 690,
    avatar: "https://via.placeholder.com/40?text=DD",
  },
];

const ITEMS_PER_PAGE = 10;

const LeaderBoardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(fullLeaderboardData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = fullLeaderboardData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 to-purple-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 flex justify-center items-center gap-3">
            <FaTrophy className="text-yellow-400 text-6xl" />
            Contest Hub Leaderboard
          </h1>
          <p className="text-xl opacity-80">
            Top performers in our coding contests. Climb the ranks!
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-gray-800 rounded-xl shadow-2xl border border-purple-500 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-purple-700 text-white">
                  <th className="w-20">Rank</th>
                  <th>User</th>
                  <th className="text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((entry) => (
                  <tr
                    key={entry.rank}
                    className={`hover:bg-purple-600 transition-all duration-300 ${
                      entry.rank === 1
                        ? "bg-yellow-900/30"
                        : entry.rank === 2
                        ? "bg-gray-500/30"
                        : entry.rank === 3
                        ? "bg-orange-900/30"
                        : ""
                    }`}
                  >
                    <td className="font-bold text-center">
                      <div className="flex justify-center items-center gap-2">
                        {entry.rank === 1 && (
                          <FaTrophy className="text-yellow-400" />
                        )}
                        {entry.rank === 2 && (
                          <FaMedal className="text-gray-300" />
                        )}
                        {entry.rank === 3 && (
                          <FaMedal className="text-orange-600" />
                        )}
                        #{entry.rank}
                      </div>
                    </td>
                    <td className="flex items-center gap-3">
                      <img
                        src={entry.avatar}
                        alt={`${entry.username}'s avatar`}
                        className="w-10 h-10 rounded-full border-2 border-purple-400"
                      />
                      <span className="font-semibold">{entry.username}</span>
                    </td>
                    <td className="text-right font-mono pr-6">
                      {entry.score} pts
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center p-4 bg-gray-900 border-t border-purple-600">
            <div className="text-sm opacity-80">
              Showing {startIndex + 1}-
              {Math.min(
                startIndex + ITEMS_PER_PAGE,
                fullLeaderboardData.length
              )}{" "}
              of {fullLeaderboardData.length} entries
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-sm btn-circle btn-outline text-white hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaChevronLeft />
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`btn btn-sm ${
                        currentPage === page
                          ? "btn-primary bg-purple-600 border-purple-600"
                          : "btn-outline text-white hover:bg-purple-600"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-sm btn-circle btn-outline text-white hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 opacity-70">
          <p>
            This leaderboard is currently static with client-side pagination.
            Dynamic data and server-side pagination coming soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardPage;

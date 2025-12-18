import React from "react";
import { FaTrophy, FaUsers, FaDollarSign, FaStar } from "react-icons/fa";
import { Link } from "react-router";

const WinnerAdvertisementSection = () => {
  // Static data - replace with dynamic later
  const recentWinners = [
    {
      username: "CodeMaster42",
      contest: "December Mega Contest",
      prize: "$5,000",
      date: "Dec 15, 2025",
    },
    {
      username: "AlgoWizard",
      contest: "Weekly Speed Challenge",
      prize: "$1,200",
      date: "Dec 10, 2025",
    },
    {
      username: "DataNinja",
      contest: "AI Hackathon",
      prize: "$3,000",
      date: "Dec 5, 2025",
    },
    {
      username: "LogicQueen",
      contest: "November Grand Finale",
      prize: "$10,000",
      date: "Nov 30, 2025",
    },
  ];

  const stats = {
    totalWinners: 487,
    totalPrizeMoney: "$1,250,000",
    thisMonthPrizes: "$45,000",
  };

  return (
    <section className="py-16 px-8 bg-linear-to-r from-purple-800 via-pink-700 to-indigo-800 text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 text-9xl text-yellow-400">
          <FaTrophy />
        </div>
        <div className="absolute bottom-20 right-20 text-8xl text-yellow-300 rotate-12">
          <FaStar />
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Text */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Be the Next <span className="text-yellow-300">Champion</span>
          </h2>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Thousands have already claimed life-changing prizes. Sharpen your
            skills, compete, and win big on Contest Hub!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="stats shadow-xl bg-white/10 backdrop-blur-md border border-white/20">
            <div className="stat">
              <div className="stat-figure text-yellow-400">
                <FaUsers className="text-5xl" />
              </div>
              <div className="stat-title text-white/80">Total Winners</div>
              <div className="stat-value text-4xl">{stats.totalWinners}+</div>
            </div>
          </div>

          <div className="stats shadow-xl bg-white/10 backdrop-blur-md border border-white/20">
            <div className="stat">
              <div className="stat-figure text-green-400">
                <FaDollarSign className="text-5xl" />
              </div>
              <div className="stat-title text-white/80">
                Total Prizes Distributed
              </div>
              <div className="stat-value text-4xl">{stats.totalPrizeMoney}</div>
            </div>
          </div>

          <div className="stats shadow-xl bg-white/10 backdrop-blur-md border border-white/20">
            <div className="stat">
              <div className="stat-figure text-pink-400">
                <FaTrophy className="text-5xl" />
              </div>
              <div className="stat-title text-white/80">Prizes This Month</div>
              <div className="stat-value text-4xl">{stats.thisMonthPrizes}</div>
            </div>
          </div>
        </div>

        {/* Recent Winners Carousel / Grid */}
        <h3 className="text-3xl font-bold text-center mb-8">
          Recent Winners 🎉
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentWinners.map((winner, index) => (
            <div
              key={index}
              className="card bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <div className="card-body text-center p-6">
                <div className="avatar placeholder mb-4">
                  <div className="bg-purple-600 text-white rounded-full w-16 mx-auto">
                    <span className="text-2xl uppercase">
                      {winner.username.slice(0, 2)}
                    </span>
                  </div>
                </div>
                <h4 className="card-title text-lg">{winner.username}</h4>
                <p className="text-sm opacity-80">{winner.contest}</p>
                <p className="text-2xl font-bold text-yellow-300 mt-2">
                  {winner.prize}
                </p>
                <p className="text-xs opacity-70 mt-1">{winner.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-2xl mb-6">
            Your name could be here next. Start competing today!
          </p>
          <Link to="/contests" className="btn btn-lg btn-accent bg-yellow-400 text-black hover:bg-yellow-300 border-none shadow-2xl">
            Join a Contest Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WinnerAdvertisementSection;

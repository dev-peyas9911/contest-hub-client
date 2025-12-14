import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";

const Banner = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/contests?search=${search}`);
  };

  return (
    <div
      className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center rounded-b-3xl"
      style={{
        backgroundImage:
          "url('https://cdn.prod.website-files.com/62dfda81ce23007b548b3798/649740a4438d582fc5a54829_5.webp')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/30 rounded-b-3xl"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-3xl px-5">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight">
          Discover & Join <br />
          <span className="text-primary">Creative Contests</span>
        </h1>

        <p className="text-lg opacity-90 mb-8">
          Image Design, Article Writing, Gaming Review & more
        </p>

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white/20 backdrop-blur-md p-2 rounded-full shadow-lg"
        >
          <div className="flex items-center px-4 text-gray-200">
            <FaSearch />
          </div>

          <input
            type="text"
            placeholder="Search by contest type..."
            className="input bg-transparent text-white placeholder-gray-300 focus:outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit" className="btn btn-primary rounded-full px-8">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banner;

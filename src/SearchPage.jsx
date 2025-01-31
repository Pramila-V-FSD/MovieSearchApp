
import React, { useState, useEffect } from 'react';
import { fetchMovies } from './apiService';
import { Link } from 'react-router-dom';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [type, setType] = useState('movie');

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    const data = await fetchMovies(searchTerm, type, page);
    setMovies(data.Search || []);
    setLoading(false);
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    }
  }, [searchTerm, page, type]);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-red-500">Movie Search App</h1>
        <p className="text-xl text-gray-700 mt-2">Find your favorite movies</p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
        />
      </div>

      <div className="mb-4">
        <select
          className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setType(e.target.value)}
          value={type}
        >
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episode">Episodes</option>
        </select>
      </div>

      {loading && <p className="text-center text-lg text-blue-500">Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="border-2 border-gray-300 p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-auto mb-4 rounded-md transition-transform transform hover:scale-105"
              />
              <h3 className="font-semibold text-xl text-gray-800">{movie.Title}</h3>
              <p className="text-gray-500">{movie.Year}</p>
              <Link to={`/movie/${movie.imdbID}`} className="text-blue-500 mt-2 inline-block hover:text-blue-700 transition">More Details</Link>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-lg text-gray-500">No results found.</p>
        )}
      </div>

      <div className="text-center mt-6">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
          onClick={() => setPage(page + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default SearchPage;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from './apiService';

function MovieDetailPage() {
    const { id } = useParams();  // Get imdbID from the URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMovieDetails = async () => {
            const data = await fetchMovieDetails(id);
            setMovie(data);
            setLoading(false);
        };
        getMovieDetails();
    }, [id]);

    if (loading) return <p>Loading movie details...</p>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex">
                <img src={movie.Poster} alt={movie.Title} className="w-1/3 h-auto mr-6" />
                <div>
                    <h1 className="text-2xl font-semibold">{movie.Title}</h1>
                    <p><strong>Released:</strong> {movie.Released}</p>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>Plot:</strong> {movie.Plot}</p>
                    <p><strong>Rating:</strong> {movie.imdbRating}</p>
                    <p><strong>Cast:</strong> {movie.Actors}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieDetailPage;

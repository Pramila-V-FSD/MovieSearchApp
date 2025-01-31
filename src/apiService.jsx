import axios from 'axios';

const API_KEY = '6ad96e78';  
const BASE_URL = 'https://www.omdbapi.com/';


const fetchMovies = async (searchTerm, type = 'movie', page = 1) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                s: searchTerm,  
                type,           
                page,           
                apikey: API_KEY
            },
        });

        if (response.data.Error) {
            return { Error: response.data.Error };
        }
        return response.data;  
    } catch (error) {
        console.error('Error fetching movies:', error);
        return { Error: 'Unable to fetch movies' };
    }
};


const fetchMovieDetails = async (id) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                i: id,          
                apikey: API_KEY
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return { Error: 'Unable to fetch movie details' };
    }
};

export { fetchMovies, fetchMovieDetails };

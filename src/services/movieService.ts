import axios from 'axios';
import type { MoviesResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string): Promise<MoviesResponse> => {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
                query,
                include_adult: false,
                language: 'en-US',
            page: 1,
        },
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    });
    return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
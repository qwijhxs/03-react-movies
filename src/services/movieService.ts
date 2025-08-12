import axios from 'axios';
import type { MoviesResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

if (!API_KEY) {
  console.error('TMDB API key is missing!');
  throw new Error('API key not configured');
}

export const fetchMovies = async (query: string): Promise<MoviesResponse> => {
  console.log(`Making request to TMDB API with query: "${query}"`);
  
  try {
    const response = await axios.get<MoviesResponse>(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
        language: 'en-US',
        page: 1,
        include_adult: false
      },
      timeout: 10000
    });

    console.log('TMDB API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('TMDB API request failed:', error);
    throw new Error('Failed to fetch movies from TMDB');
  }
};
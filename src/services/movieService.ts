import axios from 'axios';
import type { MoviesResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string): Promise<MoviesResponse> => {
  if (!import.meta.env.VITE_TMDB_TOKEN) {
    throw new Error('TMDB API key is missing in environment variables');
  }

  try {
    const response = await axios.get<MoviesResponse>(`${BASE_URL}/search/movie`, {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
      timeout: 10000
    });

    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
import axios from 'axios';
import type { MoviesResponse } from '../models/movie';

const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string): Promise<MoviesResponse> => {
  if (!import.meta.env.VITE_TMDB_TOKEN) {
    throw new Error('TMDB API key is missing in environment variables');
  }

  const params = {
    query: query,
    language: 'en-US',
    page: 1,
    include_adult: false
  };

  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` as string,
  };

  try {
    console.log('Making request to TMDB API with query:', query);

    const response = await axios.get<MoviesResponse>(
      `${BASE_URL}/search/movie`,
      {
        params,
        headers,
        timeout: 10000
      }
    );

    console.log('TMDB API response received');
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('TMDB API request failed:', {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    } else {
      console.error('TMDB API request failed:', { error });
    }
    throw new Error('Failed to fetch movies from TMDB');
  }
};
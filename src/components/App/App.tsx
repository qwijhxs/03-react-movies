import { useState } from 'react';
import toast from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import { SearchBar } from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import styles from './App.module.css';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(false);
      setMovies([]);
      
      const data = await fetchMovies(query);
      
      if (data.results.length === 0) {
        toast.error('No movies found for your request.');
      }
      
      setMovies(data.results);
    } catch (err) {
      console.error('Search Error:', err);
      setError(true);
      toast.error('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && !loading && !error && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
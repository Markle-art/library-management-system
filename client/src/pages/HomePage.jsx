
import { useCallback, useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import BookGrid from '../components/BookGrid';

function HomePage() {
  const [search, setSearch] = useState('');
  const [genreId, setGenreId] = useState('');
  const [genres, setGenres] = useState([]);
  const [genreError, setGenreError] = useState('');

  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/genres`,
        );

        if (!response.ok) {
          throw new Error('Could not load genres.');
        }

        const result = await response.json();
        setGenres(Array.isArray(result) ? result : result.data || []);
      } catch (error) {
        setGenreError(error.message);
      }
    }

    fetchGenres();
  }, []);

  return (
    <main className="home-page">
      <header className="catalog-header">
        <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
        <h1>Library Catalog</h1>
        <p>Discover your next great read.</p>
      </header>

      <section className="catalog-controls">
        <SearchBar onSearch={handleSearch} />

        <select
          className="genre-select"
          value={genreId}
          onChange={(event) => setGenreId(event.target.value)}
          aria-label="Filter books by genre"
        >
          <option value="">All genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </section>

      {genreError && (
        <p className="error-message">{genreError}</p>
      )}

      <BookGrid genreId={genreId} search={search} />
    </main>
  );
}

export default HomePage;

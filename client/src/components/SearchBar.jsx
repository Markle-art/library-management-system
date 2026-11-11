
import { useEffect, useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <input
      type="search"
      className="search-input"
      placeholder="Search books by title or author..."
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      aria-label="Search books by title or author"
    />
  );
}

export default SearchBar;

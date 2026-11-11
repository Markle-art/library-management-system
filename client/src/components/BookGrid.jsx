
import { useEffect, useState } from 'react';
import BookCard from './BookCard';

function BookGrid({ genreId, search }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBooks() {
      try {
        setLoading(true);
        setError('');

        const params = new URLSearchParams();

        if (genreId) params.append('genreId', genreId);
        if (search) params.append('search', search);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/books?${params}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error('Failed to load books. Please try again.');
        }

        const result = await response.json();
        setBooks(result.data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchBooks();

    return () => controller.abort();
  }, [genreId, search]);

  if (loading) {
    return <p className="status-message">Loading books...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (books.length === 0) {
    return <p className="status-message">No books found.</p>;
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookGrid;

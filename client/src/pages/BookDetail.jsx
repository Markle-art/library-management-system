
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function BookDetail() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBook() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/books/${id}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? 'Book not found.'
              : 'Failed to load book details.',
          );
        }

        const result = await response.json();
        setBook(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchBook();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <p className="status-message">Loading book details...</p>;
  }

  if (error) {
    return (
      <main className="detail-page">
        <p className="error-message">{error}</p>
        <Link to="/">Back to catalog</Link>
      </main>
    );
  }

  if (!book) return null;

  return (
    <main className="detail-page">
      <Link to="/" className="back-link">
        ← Back to catalog
      </Link>

      <article className="book-detail-card">
        <div className="detail-cover">📖</div>

        <div className="detail-info">
          <p className="eyebrow">BOOK DETAILS</p>
          <h1>{book.title}</h1>
          <p className="detail-author">By {book.author}</p>

          <dl className="book-metadata">
            <div>
              <dt>Genre</dt>
              <dd>{book.genre?.name || 'Uncategorized'}</dd>
            </div>

            <div>
              <dt>ISBN</dt>
              <dd>{book.isbn || 'Not available'}</dd>
            </div>

            <div>
              <dt>Published year</dt>
              <dd>{book.publishedYear || 'Not available'}</dd>
            </div>

            <div>
              <dt>Total copies</dt>
              <dd>{book.totalCopies}</dd>
            </div>
          </dl>
        </div>
      </article>
    </main>
  );
}

export default BookDetail;

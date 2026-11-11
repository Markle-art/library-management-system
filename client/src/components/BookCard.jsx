
import { Link } from 'react-router-dom';

function BookCard({ book }) {
  return (
    <article className="book-card">
      <div className="book-cover">
        <span>📖</span>
      </div>

      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="book-author">By {book.author}</p>
        <p className="book-genre">
          {book.genre?.name || 'Uncategorized'}
        </p>

        <Link to={`/books/${book.id}`} className="details-link">
          View details
        </Link>
      </div>
    </article>
  );
}

export default BookCard;

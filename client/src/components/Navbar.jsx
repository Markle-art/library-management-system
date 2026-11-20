
import { Link } from 'react-router-dom';
import { useReadingList } from '../context/ReadingListContext';

function Navbar() {
  const { readingListCount } = useReadingList();

  return (
    <header className="site-header">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          The Reading Room
        </Link>

        <div className="navbar-links">
          <Link to="/">Browse Books</Link>

          <span className="reading-list-count">
            Reading List ({readingListCount})
          </span>

          <Link to="/booking">Book a Space</Link>
          <Link to="/login">Login</Link>
          <Link to="/register" className="navbar-register">
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

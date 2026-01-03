import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/main.css';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            Propify Estate Agents
          </Link>
          <button 
            className="navbar-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className="navbar-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/properties">Properties</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
      
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}
      
      <div className={`mobile-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-header">
          <Link to="/" className="mobile-sidebar-logo" onClick={closeSidebar}>
            Propify Estate Agents
          </Link>
          <button 
            className="mobile-sidebar-close"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
        <ul className="mobile-sidebar-links">
          <li>
            <Link to="/" onClick={closeSidebar}>Home</Link>
          </li>
          <li>
            <Link to="/properties" onClick={closeSidebar}>Properties</Link>
          </li>
          <li>
            <Link to="/about" onClick={closeSidebar}>About</Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeSidebar}>Contact</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;


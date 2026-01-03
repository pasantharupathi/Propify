import { Link } from 'react-router-dom';
import '../styles/main.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Propify Estate Agents</h3>
            <p className="footer-description">
              Your trusted partner in finding the perfect property. We help you discover your dream home with ease.
            </p>
          </div>

          <div className="footer-section" style={{ marginLeft: '100px' }}>
            <h4>Pages</h4>
            <ul className="footer-links">
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

          <div className="footer-section">
            <h4>Contact Us</h4>
            <div className="footer-contact">
              <p><strong>Address:</strong> 345 High level street, kandy, Sri Lanka</p>
              <p><strong>Phone:</strong> +94 78 384 0690</p>
              <p><strong>Email:</strong> propifyestateagents@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Propify Estate Agents. All rights reserved.</p>
        </div>
        <div className="footer-bottom-down">
          <p>Created by Pasan Tharupathi</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


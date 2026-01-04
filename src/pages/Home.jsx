import { Link } from 'react-router-dom';
import propertiesData from '../data/properties.json';
import '../styles/home.css';

const allProperties = propertiesData.properties;

export default function Home() {
  const houseCount = allProperties.filter(p => p.type === 'House').length;
  const flatCount = allProperties.filter(p => p.type === 'Flat').length;

  return (
    <div className="home-page">
      <section className="home-hero-section">
        <img
          src="/images/hero-bg.jpg"
          alt="Beautiful modern home"
          className="home-hero-bg"
        />
        <div className="home-hero-overlay"></div>
        <div className="home-hero-content">
          <div className="home-hero-text">
            <h1 className="home-hero-title">
              Find Your Perfect Home
            </h1>
            <p className="home-hero-description">
              Discover exceptional homes throughout London and the South East—your perfect property is only a search away.
            </p>
            <div className="home-hero-stats">
              <div className="home-hero-stat">
                <svg className="home-hero-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                <span>{houseCount} Houses</span>
              </div>
              <div className="home-hero-stat">
                <svg className="home-hero-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 11V3H7v8H3v12h18V11h-4zm-6-6h4v6h-4V5zm-6 8h14v8H5v-8z"/>
                </svg>
                <span>{flatCount} Flats</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-about-section">
        <div className="home-about-container">
          <div className="home-about-content">
            <h2 className="home-about-title">Welcome to Propify Estate Agents</h2>
            <p className="home-about-description">
              A trusted partner in your property journey, connecting buyers with outstanding homes across London and the South East. With a refined selection of verified properties, we deliver a seamless and rewarding search experience.
            </p>
            
            <div className="home-about-features">
              <div className="home-about-feature">
                <div className="home-about-feature-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3>Verified Listings</h3>
                <p>All our properties are carefully selected and verified to ensure accuracy and quality.</p>
              </div>
              
              <div className="home-about-feature">
                <div className="home-about-feature-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                </div>
                <h3>Smart Search</h3>
                <p>Filter properties by price, bedrooms, location, tenure, and date added to find exactly what you're looking for.</p>
              </div>
              
              <div className="home-about-feature">
                <div className="home-about-feature-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <h3>Save Favourites</h3>
                <p>Shortlist properties you love and revisit them anytime. Your favourites are saved for your convenience.</p>
              </div>
              
              <div className="home-about-feature">
                <div className="home-about-feature-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3>Detailed Information</h3>
                <p>View comprehensive property details, high-quality images, floor plans, and location maps for every listing.</p>
              </div>
            </div>
            
            <div className="home-about-cta">
              <Link to="/properties" className="home-cta-button">
                Browse All Properties
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-how-it-works">
        <div className="home-how-it-works-container">
          <h2 className="home-how-it-works-title">How It Works</h2>
          <div className="home-steps">
            <div className="home-step">
              <div className="home-step-number">1</div>
              <h3>Search Properties</h3>
              <p>Use our advanced search filters to find properties that match your criteria - type, price, bedrooms, location, and more.</p>
            </div>
            <div className="home-step">
              <div className="home-step-number">2</div>
              <h3>View Details</h3>
              <p>Click on any property to see full details, multiple images, floor plans, and location maps.</p>
            </div>
            <div className="home-step">
              <div className="home-step-number">3</div>
              <h3>Save Favourites</h3>
              <p>Add properties to your favourites list by dragging them or using the favourite button. Access them anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

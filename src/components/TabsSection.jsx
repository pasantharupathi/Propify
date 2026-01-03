import { useState } from 'react';
import '../styles/main.css';

const TabsSection = ({ property }) => {
  const [activeTab, setActiveTab] = useState('description');

  const formatDate = (added) => {
    return `${added.day} ${added.month} ${added.year}`;
  };

  const isValidMapUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    const trimmed = url.trim();
    return trimmed !== '' && (trimmed.startsWith('http://') || trimmed.startsWith('https://'));
  };


  return (
    <div className="tabs-section">
      <div className="tabs-header">
        <button
          className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button
          className={`tab-button ${activeTab === 'floorplan' ? 'active' : ''}`}
          onClick={() => setActiveTab('floorplan')}
        >
          Floor Plan
        </button>
        <button
          className={`tab-button ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          Google Map
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'description' && (
          <div>
            <h3>Property Description</h3>
            <p>{property.description}</p>
            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--background)', borderRadius: '4px' }}>
              <p><strong>Property Type:</strong> {property.type}</p>
              <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
              <p><strong>Tenure:</strong> {property.tenure}</p>
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Date Added:</strong> {formatDate(property.added)}</p>
            </div>
          </div>
        )}

        {activeTab === 'floorplan' && (
          <div>
            <h3>Floor Plan</h3>
            <div className="map-container" style={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--background)', borderRadius: '8px', overflow: 'hidden' }}>
              {property.floormap ? (
                <img
                  src={property.floormap}
                  alt="Floor plan"
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23E5E7EB" width="400" height="500"/%3E%3Ctext fill="%236B7280" font-family="Arial" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EFloor Plan Not Available%3C/text%3E%3C/svg%3E';
                  }}
                />
              ) : (
                <p style={{ color: 'var(--text-muted)' }}>Floor plan not available</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div>
            <h3>Location Map</h3>
            <div className="map-container" style={{ width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', position: 'relative', backgroundColor: 'var(--background)' }}>
              {isValidMapUrl(property.map) ? (
                <>
                  <iframe 
                    src={property.map.trim()} 
                    width="100%" 
                    height="100%" 
                    frameBorder="0"
                    style={{ border: 0, display: 'block', width: '100%', height: '100%' }} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property location map"
                  ></iframe>
                  <div style={{ 
                    position: 'absolute', 
                    bottom: '10px', 
                    right: '10px', 
                    zIndex: 10 
                  }}>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ 
                        padding: '0.5rem 1rem', 
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        display: 'inline-block'
                      }}
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </>
              ) : property.location ? (
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  height: '100%', 
                  color: 'var(--text-muted)',
                  padding: '2rem',
                  textAlign: 'center',
                  gap: '1.5rem'
                }}>
                  <p style={{ marginBottom: '0.5rem' }}>Interactive map not available</p>
                  <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                    Location: {property.location}
                  </p>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ 
                      padding: '0.75rem 1.5rem', 
                      textDecoration: 'none',
                      display: 'inline-block'
                    }}
                  >
                    View on Google Maps
                  </a>
                </div>
              ) : (
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  height: '100%', 
                  color: 'var(--text-muted)',
                  padding: '2rem',
                  textAlign: 'center'
                }}>
                  <p>Map not available for this property</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabsSection;

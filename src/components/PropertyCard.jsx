import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

const PropertyCard = ({ property, onDragStart, onAddToFavourites, onRemoveFromFavourites, favouritesList }) => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [mouseDownPos, setMouseDownPos] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const checkFavourites = () => {
      if (favouritesList && Array.isArray(favouritesList)) {
        setIsFavourite(favouritesList.some(fav => fav.id === property.id));
      } else {
        const favourites = JSON.parse(localStorage.getItem('propifyFavourites') || '[]');
        setIsFavourite(favourites.some(fav => fav.id === property.id));
      }
    };
    
    checkFavourites();
    
    const handleStorageChange = (e) => {
      if (e.key === 'propifyFavourites') {
        checkFavourites();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    const handleFavouritesUpdate = () => {
      checkFavourites();
    };
    
    window.addEventListener('favouritesUpdated', handleFavouritesUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favouritesUpdated', handleFavouritesUpdate);
    };
  }, [property.id, favouritesList]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (added) => {
    return `${added.day} ${added.month} ${added.year}`;
  };

  const handleMouseDown = (e) => {
    setMouseDownPos({ x: e.clientX, y: e.clientY });
  };

  const handleClick = (e) => {
    if (!isDragging && mouseDownPos) {
      const moved = Math.abs(e.clientX - mouseDownPos.x) + Math.abs(e.clientY - mouseDownPos.y);
      if (moved < 5) {
        navigate(`/properties/${property.id}`);
      }
    }
    setMouseDownPos(null);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify(property));
    e.dataTransfer.setData('text/plain', property.id);
    if (onDragStart) {
      onDragStart(property);
    }
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    e.currentTarget.classList.remove('dragging');
    setTimeout(() => setMouseDownPos(null), 100);
  };

  const handleFavouriteClick = (e) => {
    e.stopPropagation();
    const favourites = JSON.parse(localStorage.getItem('propifyFavourites') || '[]');
    
    if (isFavourite) {
      const updated = favourites.filter(fav => fav.id !== property.id);
      localStorage.setItem('propifyFavourites', JSON.stringify(updated));
      setIsFavourite(false);
      window.dispatchEvent(new Event('favouritesUpdated'));
      if (onRemoveFromFavourites) {
        onRemoveFromFavourites(property.id);
      }
    } else {
      const updated = [...favourites, property];
      localStorage.setItem('propifyFavourites', JSON.stringify(updated));
      setIsFavourite(true);
      window.dispatchEvent(new Event('favouritesUpdated'));
      if (onAddToFavourites) {
        onAddToFavourites(property);
      }
    }
  };

  return (
    <div
      className="property-card"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="property-card-image-container">
        <img
          src={property.picture}
          alt={`${property.type} in ${property.location}`}
          className="property-card-image"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23E5E7EB" width="400" height="200"/%3E%3Ctext fill="%236B7280" font-family="Arial" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EProperty Image%3C/text%3E%3C/svg%3E';
          }}
        />
        <button
          className={`property-card-favourite-btn ${isFavourite ? 'active' : ''}`}
          onClick={handleFavouriteClick}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          <svg viewBox="0 0 24 24" fill={isFavourite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
      <div className="property-card-content">
        <div className="property-card-header">
          <div className="property-card-price">{formatPrice(property.price)}</div>
          <span className="property-card-type">{property.type}</span>
        </div>
        <div className="property-card-details">
          <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
          <span>•</span>
          <span>{property.tenure}</span>
        </div>
        <div className="property-card-location">{property.location}</div>
        <p className="property-card-description">
          {property.description.substring(0, 150)}...
        </p>
        <div className="property-card-footer">
          <span className="property-card-date">
            Added: {formatDate(property.added)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

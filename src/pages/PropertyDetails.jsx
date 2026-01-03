import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery';
import TabsSection from '../components/TabsSection';
import propertiesData from '../data/properties.json';
import '../styles/main.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('propifyFavourites');
    return saved ? JSON.parse(saved) : [];
  });
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const foundProperty = propertiesData.properties.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      navigate('/properties');
    }
  }, [id, navigate]);

  useEffect(() => {
    if (property) {
      setIsFavourite(favourites.some(fav => fav.id === property.id));
    }
  }, [property, favourites]);

  useEffect(() => {
    const saved = localStorage.getItem('propifyFavourites');
    if (saved) {
      setFavourites(JSON.parse(saved));
    }
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddToFavourites = () => {
    if (!property) return;

    const updatedFavourites = [...favourites];
    const exists = updatedFavourites.some(fav => fav.id === property.id);
    
    if (!exists) {
      updatedFavourites.push(property);
      setFavourites(updatedFavourites);
      localStorage.setItem('propifyFavourites', JSON.stringify(updatedFavourites));
      setIsFavourite(true);
    }
  };

  const handleRemoveFromFavourites = () => {
    if (!property) return;

    const updatedFavourites = favourites.filter(fav => fav.id !== property.id);
    setFavourites(updatedFavourites);
    localStorage.setItem('propifyFavourites', JSON.stringify(updatedFavourites));
    setIsFavourite(false);
  };

  if (!property) {
    return (
      <div className="main-content">
        <p>Loading property details...</p>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="property-details">
        <div className="property-details-header">
          <h1 className="property-details-title">{property.type} - {property.location}</h1>
          <div className="property-details-price">{formatPrice(property.price)}</div>
          <div className="property-details-meta">
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
            <span>•</span>
            <span>{property.tenure}</span>
            <span>•</span>
            <span>Added: {property.added.day} {property.added.month} {property.added.year}</span>
          </div>
          <div className="property-details-actions">
            {isFavourite ? (
              <button
                className="btn btn-secondary"
                onClick={handleRemoveFromFavourites}
              >
                Remove from Favourites
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleAddToFavourites}
              >
                Add to Favourites
              </button>
            )}
            <button
              className="btn btn-outline"
              onClick={() => navigate('/properties')}
            >
              Back to Properties
            </button>
          </div>
        </div>

        <ImageGallery property={property} />
        <TabsSection property={property} />
      </div>
    </div>
  );
};

export default PropertyDetails;

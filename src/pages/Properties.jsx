import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import PropertyList from '../components/PropertyList';
import FavouriteList from '../components/FavouriteList';
import propertiesData from '../data/properties.json';
import '../styles/main.css';

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProperties] = useState(propertiesData.properties);
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('propifyFavourites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const filters = {
      type: searchParams.get('type') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      bedrooms: searchParams.get('bedrooms') || '',
      location: searchParams.get('location') || '',
      tenure: searchParams.get('tenure') || '',
      month: searchParams.get('month') || '',
      year: searchParams.get('year') || ''
    };
    handleSearch(filters);
  }, []);

  useEffect(() => {
    localStorage.setItem('propifyFavourites', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    const handleFavouritesUpdate = () => {
      const saved = localStorage.getItem('propifyFavourites');
      if (saved) {
        const updatedFavourites = JSON.parse(saved);
        setFavourites(updatedFavourites);
      }
    };

    window.addEventListener('favouritesUpdated', handleFavouritesUpdate);
    
    return () => {
      window.removeEventListener('favouritesUpdated', handleFavouritesUpdate);
    };
  }, []);

  const handleSearch = (filters) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.set(key, filters[key]);
      }
    });
    setSearchParams(params);

    const filtered = allProperties.filter(property => {
      if (filters.type && property.type !== filters.type) {
        return false;
      }

      if (filters.minPrice && property.price < parseInt(filters.minPrice)) {
        return false;
      }

      if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) {
        return false;
      }

      if (filters.bedrooms && property.bedrooms < parseInt(filters.bedrooms)) {
        return false;
      }

      if (filters.location) {
        const locationFilter = filters.location.toUpperCase();
        const locationUpper = property.location.toUpperCase();
        if (!locationUpper.includes(locationFilter)) {
          return false;
        }
      }

      if (filters.tenure && property.tenure !== filters.tenure) {
        return false;
      }

      if (filters.month && property.added.month !== filters.month) {
        return false;
      }

      if (filters.year && property.added.year.toString() !== filters.year) {
        return false;
      }

      return true;
    });

    setFilteredProperties(filtered);
  };

  const handleAddFavourite = (property) => {
    setFavourites(prev => {
      const exists = prev.some(fav => fav.id === property.id);
      if (exists) {
        return prev;
      }
      const updated = [...prev, property];
      window.dispatchEvent(new Event('favouritesUpdated'));
      return updated;
    });
  };

  const handleRemoveFavourite = (propertyId) => {
    setFavourites(prev => {
      const updated = prev.filter(fav => fav.id !== propertyId);
      window.dispatchEvent(new Event('favouritesUpdated'));
      return updated;
    });
  };

  const handleClearAllFavourites = () => {
    localStorage.setItem('propifyFavourites', JSON.stringify([]));
    setFavourites([]);
    window.dispatchEvent(new Event('favouritesUpdated'));
  };

  return (
    <div className="main-content">
      <h1 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>Properties</h1>
      <SearchForm
        onSearch={handleSearch}
        initialFilters={{
          type: searchParams.get('type') || '',
          minPrice: searchParams.get('minPrice') || '',
          maxPrice: searchParams.get('maxPrice') || '',
          bedrooms: searchParams.get('bedrooms') || '',
          location: searchParams.get('location') || '',
          tenure: searchParams.get('tenure') || '',
          month: searchParams.get('month') || '',
          year: searchParams.get('year') || ''
        }}
      />
      <div className="properties-container">
        <PropertyList
          properties={filteredProperties}
          onDragStart={() => {}}
          onAddToFavourites={handleAddFavourite}
          onRemoveFromFavourites={handleRemoveFavourite}
          favouritesList={favourites}
        />
        <FavouriteList
          favourites={favourites}
          onRemove={handleRemoveFavourite}
          onClearAll={handleClearAllFavourites}
          onDrop={handleAddFavourite}
        />
      </div>
    </div>
  );
};

export default Properties;

import PropertyCard from './PropertyCard';
import '../styles/main.css';

const PropertyList = ({ properties, onDragStart, onAddToFavourites, onRemoveFromFavourites, favouritesList }) => {
  if (!properties || properties.length === 0) {
    return (
      <div className="properties-results">
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
          No properties found matching your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="properties-results">
      {properties.map(property => (
        <PropertyCard
          key={property.id}
          property={property}
          onDragStart={onDragStart}
          onAddToFavourites={onAddToFavourites}
          onRemoveFromFavourites={onRemoveFromFavourites}
          favouritesList={favouritesList}
        />
      ))}
    </div>
  );
};

export default PropertyList;

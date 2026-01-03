import propertiesData from '../data/properties.json';

const searchProperties = (properties, filters) => {
  return properties.filter(property => {
    if (filters.type && property.type !== filters.type) return false;
    if (filters.minPrice && property.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) return false;
    if (filters.bedrooms && property.bedrooms < parseInt(filters.bedrooms)) return false;
    if (filters.location) {
      const locationFilter = filters.location.toUpperCase();
      const locationUpper = property.location.toUpperCase();
      if (!locationUpper.includes(locationFilter)) return false;
    }
    if (filters.tenure && property.tenure !== filters.tenure) return false;
    if (filters.month && property.added.month !== filters.month) return false;
    if (filters.year && property.added.year.toString() !== filters.year) return false;
    return true;
  });
};

const addToFavourites = (favourites, property) => {
  const exists = favourites.some(fav => fav.id === property.id);
  if (exists) return favourites;
  return [...favourites, property];
};

const removeFromFavourites = (favourites, propertyId) => {
  return favourites.filter(fav => fav.id !== propertyId);
};

describe('Integration Tests', () => {
  const properties = propertiesData.properties;

  it('should search and add results to favourites', () => {
    const searchResults = searchProperties(properties, { type: 'House' });
    expect(searchResults.length).toBeGreaterThan(0);
    
    let favourites = [];
    favourites = addToFavourites(favourites, searchResults[0]);
    
    expect(favourites.length).toBe(1);
    expect(favourites[0].type).toBe('House');
  });

  it('should filter by multiple criteria and manage favourites', () => {
    const filters = {
      type: 'House',
      minPrice: '400000',
      maxPrice: '1000000',
      tenure: 'Freehold'
    };
    
    const searchResults = searchProperties(properties, filters);
    expect(searchResults.length).toBeGreaterThan(0);
    
    let favourites = [];
    searchResults.slice(0, 2).forEach(property => {
      favourites = addToFavourites(favourites, property);
    });
    
    expect(favourites.length).toBe(2);
    expect(favourites.every(f => f.type === 'House')).toBe(true);
    expect(favourites.every(f => f.tenure === 'Freehold')).toBe(true);
  });

  it('should remove property from favourites after search', () => {
    const property = properties[0];
    
    let favourites = [];
    favourites = addToFavourites(favourites, property);
    expect(favourites.length).toBe(1);
    
    favourites = removeFromFavourites(favourites, property.id);
    expect(favourites.length).toBe(0);
  });

  it('should maintain favourites when searching different criteria', () => {
    const property1 = properties[0];
    const property2 = properties[1];
    
    let favourites = [];
    favourites = addToFavourites(favourites, property1);
    favourites = addToFavourites(favourites, property2);
    expect(favourites.length).toBe(2);
    
    const searchResults = searchProperties(properties, { type: 'Flat' });
    
    expect(favourites.length).toBe(2);
    expect(favourites.map(f => f.id)).toContain(property1.id);
    expect(favourites.map(f => f.id)).toContain(property2.id);
  });

  it('should handle empty search results with favourites', () => {
    const searchResults = searchProperties(properties, {
      type: 'House',
      minPrice: '5000000'
    });
    
    expect(searchResults.length).toBe(0);
    
    const property = properties[0];
    let favourites = [];
    favourites = addToFavourites(favourites, property);
    expect(favourites.length).toBe(1);
  });

  it('should prevent duplicate favourites when adding same property multiple times', () => {
    const property = properties[0];
    
    let favourites = [];
    favourites = addToFavourites(favourites, property);
    favourites = addToFavourites(favourites, property);
    favourites = addToFavourites(favourites, property);
    
    expect(favourites.length).toBe(1);
    expect(favourites[0].id).toBe(property.id);
  });

  it('should filter by date range and tenure together', () => {
    const filters = {
      month: 'October',
      year: '2022',
      tenure: 'Freehold'
    };
    
    const results = searchProperties(properties, filters);
    
    if (results.length > 0) {
      expect(results.every(p => 
        p.added.month === 'October' &&
        p.added.year.toString() === '2022' &&
        p.tenure === 'Freehold'
      )).toBe(true);
    }
  });

  it('should handle complete workflow: search, add, remove, clear', () => {
    const searchResults = searchProperties(properties, { type: 'House' });
    expect(searchResults.length).toBeGreaterThan(0);
    
    let favourites = [];
    searchResults.slice(0, 2).forEach(property => {
      favourites = addToFavourites(favourites, property);
    });
    expect(favourites.length).toBe(2);
    
    favourites = removeFromFavourites(favourites, favourites[0].id);
    expect(favourites.length).toBe(1);
    
    favourites = [];
    expect(favourites.length).toBe(0);
  });
});

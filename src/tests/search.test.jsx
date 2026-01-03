import propertiesData from '../data/properties.json';

const searchProperties = (properties, filters) => {
  return properties.filter(property => {
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
};

describe('Search Functionality', () => {
  const properties = propertiesData.properties;

  it('should return all properties when no filters are applied', () => {
    const filters = {};
    const results = searchProperties(properties, filters);
    expect(results.length).toBe(properties.length);
  });

  it('should filter by property type', () => {
    const filters = { type: 'House' };
    const results = searchProperties(properties, filters);
    expect(results.every(p => p.type === 'House')).toBe(true);
    expect(results.length).toBeGreaterThan(0);
  });

  it('should filter by minimum price', () => {
    const filters = { minPrice: '500000' };
    const results = searchProperties(properties, filters);
    expect(results.every(p => p.price >= 500000)).toBe(true);
  });

  it('should filter by maximum price', () => {
    const filters = { maxPrice: '600000' };
    const results = searchProperties(properties, filters);
    expect(results.every(p => p.price <= 600000)).toBe(true);
  });

  it('should filter by price range', () => {
    const filters = { minPrice: '400000', maxPrice: '600000' };
    const results = searchProperties(properties, filters);
    expect(results.every(p => p.price >= 400000 && p.price <= 600000)).toBe(true);
  });

  it('should filter by minimum bedrooms', () => {
    const filters = { bedrooms: '3' };
    const results = searchProperties(properties, filters);
    expect(results.every(p => p.bedrooms >= 3)).toBe(true);
  });

  it('should filter by location', () => {
    const filters = { location: 'Orpington' };
    const results = searchProperties(properties, filters);
    expect(results.every(p => 
      p.location.toUpperCase().includes('ORPINGTON')
    )).toBe(true);
  });

  it('should ignore empty filters', () => {
    const filters = {
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      location: ''
    };
    const results = searchProperties(properties, filters);
    expect(results.length).toBe(properties.length);
  });

  it('should combine multiple filters correctly', () => {
    const filters = {
      type: 'House',
      minPrice: '400000',
      maxPrice: '1000000',
      bedrooms: '3'
    };
    const results = searchProperties(properties, filters);
    expect(results.every(p => 
      p.type === 'House' &&
      p.price >= 400000 &&
      p.price <= 1000000 &&
      p.bedrooms >= 3
    )).toBe(true);
  });

  it('should return empty array when no properties match filters', () => {
    const filters = {
      type: 'House',
      minPrice: '2000000'
    };
    const results = searchProperties(properties, filters);
    expect(results.length).toBe(0);
  });
});

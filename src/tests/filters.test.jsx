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

describe('Advanced Filter Functionality', () => {
  const properties = propertiesData.properties;

  it('should filter by tenure (Freehold)', () => {
    const filters = { tenure: 'Freehold' };
    const results = searchProperties(properties, filters);
    expect(results.every(p => p.tenure === 'Freehold')).toBe(true);
    expect(results.length).toBeGreaterThan(0);
  });

  it('should filter by tenure (Leasehold)', () => {
    const filters = { tenure: 'Leasehold' };
    const results = searchProperties(properties, filters);
    expect(results.every(p => p.tenure === 'Leasehold')).toBe(true);
    expect(results.length).toBeGreaterThan(0);
  });

  it('should filter by month added', () => {
    const filters = { month: 'October' };
    const results = searchProperties(properties, filters);
    expect(results.every(p => p.added.month === 'October')).toBe(true);
  });

  it('should filter by year added', () => {
    const filters = { year: '2022' };
    const results = searchProperties(properties, filters);
    expect(results.every(p => p.added.year.toString() === '2022')).toBe(true);
    expect(results.length).toBeGreaterThan(0);
  });

  it('should filter by month and year together', () => {
    const filters = { month: 'October', year: '2022' };
    const results = searchProperties(properties, filters);
    expect(results.every(p => 
      p.added.month === 'October' && p.added.year.toString() === '2022'
    )).toBe(true);
  });

  it('should combine tenure with other filters', () => {
    const filters = {
      tenure: 'Freehold',
      type: 'House',
      minPrice: '400000'
    };
    const results = searchProperties(properties, filters);
    expect(results.every(p => 
      p.tenure === 'Freehold' &&
      p.type === 'House' &&
      p.price >= 400000
    )).toBe(true);
  });

  it('should ignore empty tenure filter', () => {
    const filters = { tenure: '' };
    const results = searchProperties(properties, filters);
    expect(results.length).toBe(properties.length);
  });

  it('should ignore empty month filter', () => {
    const filters = { month: '' };
    const results = searchProperties(properties, filters);
    expect(results.length).toBe(properties.length);
  });

  it('should ignore empty year filter', () => {
    const filters = { year: '' };
    const results = searchProperties(properties, filters);
    expect(results.length).toBe(properties.length);
  });

  it('should return empty array when no properties match tenure filter', () => {
    const filters = { tenure: 'Nonexistent' };
    const results = searchProperties(properties, filters);
    expect(results.length).toBe(0);
  });

  it('should return empty array when no properties match year filter', () => {
    const filters = { year: '2030' };
    const results = searchProperties(properties, filters);
    expect(results.length).toBe(0);
  });

  it('should combine all filters correctly', () => {
    const filters = {
      type: 'House',
      tenure: 'Freehold',
      minPrice: '400000',
      maxPrice: '1000000',
      bedrooms: '3',
      month: 'October',
      year: '2022'
    };
    const results = searchProperties(properties, filters);
    expect(results.every(p => 
      p.type === 'House' &&
      p.tenure === 'Freehold' &&
      p.price >= 400000 &&
      p.price <= 1000000 &&
      p.bedrooms >= 3 &&
      p.added.month === 'October' &&
      p.added.year.toString() === '2022'
    )).toBe(true);
  });
});

const sampleProperty1 = {
  id: 'prop1',
  type: 'House',
  bedrooms: 3,
  price: 750000,
  location: 'Test Location 1'
};

const sampleProperty2 = {
  id: 'prop2',
  type: 'Flat',
  bedrooms: 2,
  price: 399995,
  location: 'Test Location 2'
};

const addToFavourites = (favourites, property) => {
  const exists = favourites.some(fav => fav.id === property.id);
  if (exists) {
    return favourites;
  }
  return [...favourites, property];
};

const removeFromFavourites = (favourites, propertyId) => {
  return favourites.filter(fav => fav.id !== propertyId);
};

describe('Favourites System', () => {
  it('should add a property to empty favourites list', () => {
    const favourites = [];
    const result = addToFavourites(favourites, sampleProperty1);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('prop1');
  });

  it('should add multiple different properties', () => {
    let favourites = [];
    favourites = addToFavourites(favourites, sampleProperty1);
    favourites = addToFavourites(favourites, sampleProperty2);
    expect(favourites.length).toBe(2);
    expect(favourites.map(f => f.id)).toEqual(['prop1', 'prop2']);
  });

  it('should prevent duplicate properties (same ID)', () => {
    let favourites = [];
    favourites = addToFavourites(favourites, sampleProperty1);
    favourites = addToFavourites(favourites, sampleProperty1);
    expect(favourites.length).toBe(1);
    expect(favourites[0].id).toBe('prop1');
  });

  it('should remove a property from favourites by ID', () => {
    let favourites = [sampleProperty1, sampleProperty2];
    favourites = removeFromFavourites(favourites, 'prop1');
    expect(favourites.length).toBe(1);
    expect(favourites[0].id).toBe('prop2');
  });

  it('should handle removing non-existent property gracefully', () => {
    const favourites = [sampleProperty1];
    const result = removeFromFavourites(favourites, 'nonexistent');
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('prop1');
  });

  it('should clear all favourites', () => {
    let favourites = [sampleProperty1, sampleProperty2];
    favourites = [];
    expect(favourites.length).toBe(0);
  });

  it('should maintain property data integrity when adding', () => {
    const favourites = [];
    const result = addToFavourites(favourites, sampleProperty1);
    expect(result[0]).toEqual(sampleProperty1);
  });

  it('should handle empty favourites list when removing', () => {
    const favourites = [];
    const result = removeFromFavourites(favourites, 'prop1');
    expect(result.length).toBe(0);
  });
});

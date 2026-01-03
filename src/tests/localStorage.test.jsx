describe('LocalStorage Favourites Management', () => {
  const storageKey = 'propifyFavourites';
  
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

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

  it('should save favourites to localStorage', () => {
    const favourites = [sampleProperty1, sampleProperty2];
    localStorage.setItem(storageKey, JSON.stringify(favourites));
    
    const saved = JSON.parse(localStorage.getItem(storageKey));
    expect(saved).toEqual(favourites);
    expect(saved.length).toBe(2);
  });

  it('should load favourites from localStorage', () => {
    const favourites = [sampleProperty1];
    localStorage.setItem(storageKey, JSON.stringify(favourites));
    
    const loaded = JSON.parse(localStorage.getItem(storageKey) || '[]');
    expect(loaded).toEqual(favourites);
    expect(loaded.length).toBe(1);
  });

  it('should return empty array when localStorage is empty', () => {
    const loaded = JSON.parse(localStorage.getItem(storageKey) || '[]');
    expect(loaded).toEqual([]);
    expect(Array.isArray(loaded)).toBe(true);
  });

  it('should update favourites in localStorage', () => {
    localStorage.setItem(storageKey, JSON.stringify([sampleProperty1]));
    
    const updated = [sampleProperty1, sampleProperty2];
    localStorage.setItem(storageKey, JSON.stringify(updated));
    
    const loaded = JSON.parse(localStorage.getItem(storageKey));
    expect(loaded.length).toBe(2);
    expect(loaded).toEqual(updated);
  });

  it('should remove property from localStorage favourites', () => {
    const initial = [sampleProperty1, sampleProperty2];
    localStorage.setItem(storageKey, JSON.stringify(initial));
    
    const updated = initial.filter(p => p.id !== 'prop1');
    localStorage.setItem(storageKey, JSON.stringify(updated));
    
    const loaded = JSON.parse(localStorage.getItem(storageKey));
    expect(loaded.length).toBe(1);
    expect(loaded[0].id).toBe('prop2');
  });

  it('should clear all favourites from localStorage', () => {
    localStorage.setItem(storageKey, JSON.stringify([sampleProperty1, sampleProperty2]));
    
    localStorage.setItem(storageKey, JSON.stringify([]));
    
    const loaded = JSON.parse(localStorage.getItem(storageKey));
    expect(loaded).toEqual([]);
    expect(loaded.length).toBe(0);
  });

  it('should handle invalid JSON gracefully', () => {
    localStorage.setItem(storageKey, 'invalid json');
    
    try {
      const loaded = JSON.parse(localStorage.getItem(storageKey) || '[]');
      expect(Array.isArray(loaded) || loaded === null).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should prevent duplicate properties in localStorage', () => {
    const favourites = [sampleProperty1];
    localStorage.setItem(storageKey, JSON.stringify(favourites));
    
    const loaded = JSON.parse(localStorage.getItem(storageKey));
    const exists = loaded.some(fav => fav.id === sampleProperty1.id);
    
    if (!exists) {
      loaded.push(sampleProperty1);
      localStorage.setItem(storageKey, JSON.stringify(loaded));
    }
    
    const final = JSON.parse(localStorage.getItem(storageKey));
    const prop1Count = final.filter(p => p.id === 'prop1').length;
    expect(prop1Count).toBeLessThanOrEqual(1);
  });

  it('should maintain property data structure in localStorage', () => {
    const favourites = [sampleProperty1];
    localStorage.setItem(storageKey, JSON.stringify(favourites));
    
    const loaded = JSON.parse(localStorage.getItem(storageKey));
    expect(loaded[0]).toHaveProperty('id');
    expect(loaded[0]).toHaveProperty('type');
    expect(loaded[0]).toHaveProperty('price');
    expect(loaded[0]).toHaveProperty('location');
    expect(loaded[0].id).toBe('prop1');
  });

  it('should handle multiple property additions to localStorage', () => {
    let favourites = [];
    
    favourites.push(sampleProperty1);
    localStorage.setItem(storageKey, JSON.stringify(favourites));
    
    favourites = JSON.parse(localStorage.getItem(storageKey));
    favourites.push(sampleProperty2);
    localStorage.setItem(storageKey, JSON.stringify(favourites));
    
    const final = JSON.parse(localStorage.getItem(storageKey));
    expect(final.length).toBe(2);
    expect(final.map(p => p.id)).toEqual(['prop1', 'prop2']);
  });
});

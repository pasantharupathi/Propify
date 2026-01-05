import { useState } from 'react';
import '../styles/main.css';

const SearchForm = ({ onSearch, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    type: initialFilters.type || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    bedrooms: initialFilters.bedrooms || '',
    location: initialFilters.location || '',
    tenure: initialFilters.tenure || '',
    month: initialFilters.month || '',
    year: initialFilters.year || '',
    ...initialFilters
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    const emptyFilters = {
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      location: '',
      tenure: '',
      month: '',
      year: ''
    };
    setFilters(emptyFilters);
    onSearch(emptyFilters);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form-grid">
        <div className="form-group">
          <label htmlFor="type">Property Type</label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleChange}
          >
            <option value="">All Types</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="minPrice">Min Price (£)</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            min="0"
            placeholder="No minimum"
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxPrice">Max Price (£)</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            min="0"
            placeholder="No maximum"
          />
        </div>

        <div className="form-group">
          <label htmlFor="bedrooms">Bedrooms</label>
          <select
            id="bedrooms"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="e.g., Sidcup, Orpington"
            maxLength="50"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tenure">Tenure</label>
          <select
            id="tenure"
            name="tenure"
            value={filters.tenure}
            onChange={handleChange}
          >
            <option value="">All Tenures</option>
            <option value="Freehold">Freehold</option>
            <option value="Leasehold">Leasehold</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="month">Month Added</label>
          <select
            id="month"
            name="month"
            value={filters.month}
            onChange={handleChange}
          >
            <option value="">All Months</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="year">Year Added</label>
          <select
            id="year"
            name="year"
            value={filters.year}
            onChange={handleChange}
          >
            <option value="">All Years</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>
      </div>

      <div className="search-buttons">
        <button type="submit" className="btn btn-primary">
          Search
        </button>
        <button type="button" className="btn btn-outline" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchForm;


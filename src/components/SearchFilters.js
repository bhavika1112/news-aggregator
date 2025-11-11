import React from 'react';

function SearchFilters({ filters, onFilterChange }) {
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="search-filters">
      <div className="container">
        <div className="filter-options">
          <div className="filter-group">
            <label htmlFor="fromDate">From Date:</label>
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleDateChange}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="toDate">To Date:</label>
            <input
              type="date"
              id="toDate"
              name="toDate"
              value={filters.toDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilters;
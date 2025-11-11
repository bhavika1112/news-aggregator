import React from 'react';

function SearchHistory({ searchHistory = [], onSearch }) {
  if (!searchHistory || searchHistory.length === 0) return null;

  return (
    <div className="search-history">
      <div className="container">
        <div className="search-history-content">
          <h4>Recent Searches:</h4>
          <div className="search-tags">
            {searchHistory.map((query, index) => (
              <button
                key={index}
                className="search-tag"
                onClick={() => onSearch(query)}
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchHistory;
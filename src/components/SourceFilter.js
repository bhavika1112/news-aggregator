import React from 'react';

function SourceFilter({ sources = [], selectedSources = [], setSelectedSources }) {
  const toggleSource = (source) => {
    setSelectedSources(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  return (
    <div className="source-filter">
      <div className="container">
        <div className="source-filter-content">
          <h4>Filter by News Source:</h4>
          <div className="source-checkboxes">
            {sources.map(source => (
              <label key={source} className="source-checkbox">
                <input
                  type="checkbox"
                  checked={selectedSources.includes(source)}
                  onChange={() => toggleSource(source)}
                />
                <span>{source.replace(/-/g, ' ')}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SourceFilter;
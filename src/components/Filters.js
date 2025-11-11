import React from 'react';

function Filters({ categories, activeCategory, setActiveCategory }) {
    return (
        <div className="filters">
            <div className="container">
                <div className="filter-buttons">
                    {categories.map(category => (
                        <button
                            key={category.name}
                            className={`filter-btn ${activeCategory === category.name ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.name)}
                        >
                            <i className={`fas ${category.icon}`}></i>
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Filters;
import React, { useState, useEffect } from 'react';

function NewsMap({ articles, onArticleSelect }) {
  const [mapArticles, setMapArticles] = useState([]);

  useEffect(() => {
    // Simulate geographic data
    const geoArticles = articles.map((article, index) => ({
      ...article,
      lat: (Math.random() * 180 - 90).toFixed(4),
      lng: (Math.random() * 360 - 180).toFixed(4),
      position: `Location ${index + 1}`
    }));
    
    setMapArticles(geoArticles);
  }, [articles]);

  if (mapArticles.length === 0) {
    return (
      <div className="map-placeholder">
        <i className="fas fa-globe-americas"></i>
        <p>No geographic data available for current articles</p>
      </div>
    );
  }

  return (
    <div className="news-map-container">
      <div className="map-header">
        <h3>News Map View</h3>
        <p>Articles from around the world ({mapArticles.length} locations)</p>
      </div>
      
      <div className="simple-map">
        <div className="map-grid">
          {mapArticles.map((article, index) => (
            <div 
              key={index} 
              className="map-point"
              onClick={() => onArticleSelect(article)}
            >
              <div className="map-marker">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="map-tooltip">
                <h4>{article.title}</h4>
                <p>{article.source?.name}</p>
                <span className="map-location">{article.position}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="map-legend">
        <div className="legend-item">
          <i className="fas fa-map-marker-alt"></i>
          <span>News Article Location</span>
        </div>
      </div>
    </div>
  );
}

export default NewsMap;
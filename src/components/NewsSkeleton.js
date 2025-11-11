import React from 'react';

function NewsSkeleton() {
  return (
    <div className="news-card">
      <div className="news-image skeleton"></div>
      <div className="news-content">
        <div className="news-source">
          <span className="news-category skeleton"></span>
          <span className="news-date skeleton"></span>
        </div>
        <h3 className="news-title skeleton"></h3>
        <p className="news-description skeleton"></p>
        <div className="news-source">
          <span className="skeleton"></span>
          <a className="read-more skeleton"></a>
        </div>
      </div>
    </div>
  );
}

export default NewsSkeleton;
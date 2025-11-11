// NewsGrid.js - Updated to include viewArticleDetails
import React from 'react';
import NewsCard from './NewsCard';
import NewsSkeleton from './NewsSkeleton';

function NewsGrid({ news = [], isLoading, toggleBookmark, viewArticleDetails, shareArticle }) {
  if (isLoading) {
    return (
      <div className="container">
        <div className="news-grid">
          {[...Array(6)].map((_, index) => (
            <NewsSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="container">
        <div className="loading">
          <i className="fas fa-newspaper"></i> No news articles found.
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="news-grid">
        {news.map(item => (
          <NewsCard 
            key={item.id}
            item={item} 
            toggleBookmark={toggleBookmark}
            isBookmarked={item.bookmarked}
            viewArticleDetails={viewArticleDetails}  // Add this line
            shareArticle={shareArticle}  // Add this line
          />
        ))}
      </div>
    </div>
  );
}

export default NewsGrid;
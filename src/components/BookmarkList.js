// BookmarkList.js - Verify this is correct
import React from 'react';
import NewsCard from './NewsCard';

function BookmarkList({ bookmarks, toggleBookmark, viewArticleDetails, shareArticle }) {
  if (bookmarks.length === 0) {
    return (
      <div className="container">
        <div className="loading">
          <i className="fas fa-bookmark" style={{marginRight: '10px'}}></i> 
          No bookmarked articles yet. Save articles by clicking the bookmark icon.
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="bookmarks-header">
        <h2>Your Saved Articles ({bookmarks.length})</h2>
        <p>Click the bookmark icon again to remove articles from your saved list</p>
      </div>
      <div className="news-grid">
        {bookmarks.map(item => (
          <NewsCard 
            key={item.id} 
            item={item} 
            toggleBookmark={toggleBookmark}
            isBookmarked={true}
            viewArticleDetails={viewArticleDetails}
            shareArticle={shareArticle}
          />
        ))}
      </div>
    </div>
  );
}

export default BookmarkList;
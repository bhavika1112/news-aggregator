import React, { useState } from 'react';

function NewsCard({ item, toggleBookmark, isBookmarked = false, viewArticleDetails, shareArticle }) {
  const [imageError, setImageError] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return "Recent";
    }
  };

  const truncateDescription = (description, maxLength = 150) => {
    if (!description) return "No description available.";
    if (description.length <= maxLength) return description;
    
    return description.substring(0, maxLength) + '...';
  };

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleBookmark && item) {
      toggleBookmark(item);
    }
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareMenu(!showShareMenu);
  };

  const handleShareOption = (platform, e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareMenu(false);
    
    if (shareArticle && item) {
      shareArticle(item, platform);
    }
  };

  const handleCardClick = () => {
    if (viewArticleDetails && item) {
      viewArticleDetails(item);
    }
  };

  const handleCloseShareMenu = (e) => {
    e.stopPropagation();
    setShowShareMenu(false);
  };

  return (
    <div 
      className={`news-card ${isBookmarked ? 'saved' : ''}`}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="news-image">
        <img 
          src={imageError || !item?.urlToImage 
            ? "https://via.placeholder.com/300x200/4a6491/ffffff?text=NewsHub" 
            : item.urlToImage} 
          alt={item?.title || "News article"}
          onError={() => setImageError(true)}
        />
        <button 
          className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
          onClick={handleBookmarkClick}
          aria-label={isBookmarked ? "Remove from saved" : "Save article"}
          title={isBookmarked ? "Remove from saved" : "Save article"}
        >
          <i className={`fas ${isBookmarked ? 'fa-bookmark' : 'fa-bookmark-o'}`}></i>
        </button>
        <div className="share-container">
          <button 
            className="share-btn"
            onClick={handleShareClick}
            aria-label="Share article"
            title="Share article"
          >
            <i className="fas fa-share-alt"></i>
          </button>
          {showShareMenu && (
            <div className="share-menu" onClick={handleCloseShareMenu}>
              <div className="share-option" onClick={(e) => handleShareOption('facebook', e)}>
                <i className="fab fa-facebook"></i>
                <span>Facebook</span>
              </div>
              <div className="share-option" onClick={(e) => handleShareOption('twitter', e)}>
                <i className="fab fa-twitter"></i>
                <span>Twitter</span>
              </div>
              <div className="share-option" onClick={(e) => handleShareOption('linkedin', e)}>
                <i className="fab fa-linkedin"></i>
                <span>LinkedIn</span>
              </div>
              <div className="share-option" onClick={(e) => handleShareOption('whatsapp', e)}>
                <i className="fab fa-whatsapp"></i>
                <span>WhatsApp</span>
              </div>
              <div className="share-option" onClick={(e) => handleShareOption('copy', e)}>
                <i className="fas fa-link"></i>
                <span>Copy Link</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="news-content">
        <div className="news-source">
          <span className="news-category">{item?.category || "General"}</span>
          <span className="news-date">{formatDate(item?.publishedAt)}</span>
        </div>
        <h3 className="news-title">{item?.title || "No title available"}</h3>
        <p className="news-description">{truncateDescription(item?.description)}</p>
        <div className="news-source">
          <span>{item?.source?.name || "Unknown Source"}</span>
          <a 
            href={item?.url || "#"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="read-more"
            onClick={(e) => e.stopPropagation()}
          >
            Read more <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
import React, { useState } from 'react';

function ArticleDetail({ article, onClose, toggleBookmark, isBookmarked, shareArticle }) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return "Date not available";
    }
  };

  const handleBookmarkClick = () => {
    toggleBookmark(article);
  };

  const handleShareClick = () => {
    setShowShareMenu(!showShareMenu);
  };

  const handleShareOption = (platform) => {
    setShowShareMenu(false);
    shareArticle(article, platform);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        {article.urlToImage && (
          <div className="modal-image">
            <img src={article.urlToImage} alt={article.title} />
          </div>
        )}
        
        <div className="modal-body">
          <div className="modal-source">
            <span className="news-category">{article.category || "General"}</span>
            <span className="news-date">{formatDate(article.publishedAt)}</span>
          </div>
          
          <h2>{article.title}</h2>
          
          <div className="modal-meta">
            <span className="source-name">{article.source?.name || "Unknown Source"}</span>
            {article.author && <span className="author">By {article.author}</span>}
          </div>
          
          <div className="modal-description">
            <p>{article.content || article.description || "No content available."}</p>
          </div>
          
          <div className="modal-actions">
            <button 
              className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={handleBookmarkClick}
            >
              <i className={`fas ${isBookmarked ? 'fa-bookmark' : 'fa-bookmark-o'}`}></i>
              {isBookmarked ? 'Saved' : 'Save Article'}
            </button>
            
            <div className="share-container">
              <button 
                className="share-btn"
                onClick={handleShareClick}
              >
                <i className="fas fa-share-alt"></i>
                Share
              </button>
              {showShareMenu && (
                <div className="share-menu">
                  <div className="share-option" onClick={() => handleShareOption('facebook')}>
                    <i className="fab fa-facebook"></i>
                    <span>Facebook</span>
                  </div>
                  <div className="share-option" onClick={() => handleShareOption('twitter')}>
                    <i className="fab fa-twitter"></i>
                    <span>Twitter</span>
                  </div>
                  <div className="share-option" onClick={() => handleShareOption('linkedin')}>
                    <i className="fab fa-linkedin"></i>
                    <span>LinkedIn</span>
                  </div>
                  <div className="share-option" onClick={() => handleShareOption('whatsapp')}>
                    <i className="fab fa-whatsapp"></i>
                    <span>WhatsApp</span>
                  </div>
                  <div className="share-option" onClick={() => handleShareOption('copy')}>
                    <i className="fas fa-link"></i>
                    <span>Copy Link</span>
                  </div>
                </div>
              )}
            </div>
            
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="read-original"
            >
              Read Original <i className="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
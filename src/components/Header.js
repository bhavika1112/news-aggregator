import React from 'react';

function Header({ 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  darkMode, 
  toggleDarkMode, 
  toggleBookmarksView, 
  showBookmarks, 
  bookmarkedArticles = [],
  toggleSourceFilter,
  showSourceFilter,
  requestNotificationPermission,
  shareWebsite
}) {
    return (
        <header>
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <i className="fas fa-newspaper"></i>
                        <span>NewsHub</span>
                    </div>
                    
                    <form className="search-bar" onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            placeholder="Search for news..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit"><i className="fas fa-search"></i></button>
                    </form>
                    
                    <div className="header-actions">
                        <button 
                          className="action-btn" 
                          onClick={toggleDarkMode}
                          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                        </button>
                        
                        <button 
                          className="action-btn" 
                          onClick={toggleSourceFilter}
                          aria-label="Filter by source"
                        >
                            <i className="fas fa-filter"></i>
                        </button>
                        
                        <button 
                          className="action-btn" 
                          onClick={requestNotificationPermission}
                          aria-label="Enable notifications"
                        >
                            <i className="fas fa-bell"></i>
                        </button>
                        
                        <button 
                          className={`action-btn bookmarks-btn ${showBookmarks ? 'active' : ''}`}
                          onClick={toggleBookmarksView}
                          aria-label={showBookmarks ? "View all news" : "View saved articles"}
                        >
                          <i className="fas fa-bookmark"></i>
                          {bookmarkedArticles && bookmarkedArticles.length > 0 && (
                              <span className="bookmark-count">{bookmarkedArticles.length}</span>
                          )}
                        </button>
                        
                        {/* Share Website Button */}
                        <button 
                          className="action-btn"
                          onClick={shareWebsite}
                          aria-label="Share NewsHub"
                        >
                          <i className="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
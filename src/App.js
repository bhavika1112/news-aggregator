import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import NewsGrid from './components/NewsGrid';
import Footer from './components/Footer';
import BookmarkList from './components/BookmarkList';
import SearchHistory from './components/SearchHistory';
import SourceFilter from './components/SourceFilter';
import ArticleDetail from './components/ArticleDetail';
import './App.css';

// NewsAPI configuration
const API_KEY = process.env.REACT_APP_NEWS_API_KEY || 'demo';
const BASE_URL = 'https://newsapi.org/v2';

// Available news sources
const AVAILABLE_SOURCES = [
  'bbc-news', 'cnn', 'the-new-york-times', 'the-washington-post', 
  'reuters', 'associated-press', 'bloomberg', 'business-insider',
  'cnbc', 'financial-times', 'techcrunch', 'wired', 'espn',
  'fox-news', 'nbc-news', 'the-wall-street-journal'
];

function App() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [showSourceFilter, setShowSourceFilter] = useState(false);

  const categories = [
    { id: 'general', name: 'General', icon: 'fa-globe' },
    { id: 'business', name: 'Business', icon: 'fa-chart-line' },
    { id: 'entertainment', name: 'Entertainment', icon: 'fa-film' },
    { id: 'health', name: 'Health', icon: 'fa-heartbeat' },
    { id: 'science', name: 'Science', icon: 'fa-flask' },
    { id: 'sports', name: 'Sports', icon: 'fa-running' },
    { id: 'technology', name: 'Technology', icon: 'fa-microchip' }
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('newsHubBookmarks');
    const savedSearchHistory = localStorage.getItem('newsHubSearchHistory');
    const savedDarkMode = localStorage.getItem('newsHubDarkMode');
    
    if (savedBookmarks) {
      setBookmarkedArticles(JSON.parse(savedBookmarks));
    }
    
    if (savedSearchHistory) {
      setSearchHistory(JSON.parse(savedSearchHistory));
    }
    
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true');
      if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
      }
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('newsHubBookmarks', JSON.stringify(bookmarkedArticles));
  }, [bookmarkedArticles]);

  useEffect(() => {
    localStorage.setItem('newsHubSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem('newsHubDarkMode', darkMode.toString());
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  // Toggle bookmark view
  const toggleBookmarksView = () => {
    setShowBookmarks(!showBookmarks);
  };

  // Toggle source filter
  const toggleSourceFilter = () => {
    setShowSourceFilter(!showSourceFilter);
  };

  // Add to search history
  const addToSearchHistory = (query) => {
    if (!query.trim()) return;
    
    setSearchHistory(prev => {
      const newHistory = [query, ...prev.filter(item => item !== query)].slice(0, 10);
      return newHistory;
    });
  };

  // Bookmark an article
  const toggleBookmark = useCallback((article) => {
    if (!article || !article.id) return;
    
    setBookmarkedArticles(prev => {
      const isBookmarked = prev.some(item => 
        item.id === article.id || 
        (item.title === article.title && item.publishedAt === article.publishedAt)
      );
      
      if (isBookmarked) {
        return prev.filter(item => 
          item.id !== article.id && 
          !(item.title === article.title && item.publishedAt === article.publishedAt)
        );
      } else {
        // Show notification when bookmarking
        showNotification(`"${article.title.slice(0, 50)}..." saved to bookmarks`);
        return [...prev, {
          ...article,
          id: article.id || `${article.title}-${article.publishedAt}`,
          bookmarked: true
        }];
      }
    });
  }, []);

  // Show browser notification
  const showNotification = (message) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('NewsHub', {
        body: message,
        icon: '/favicon.ico'
      });
    }
  };

  // Request notification permission
  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          showNotification('You will now receive notifications from NewsHub');
        }
      });
    }
  };

  // Enhanced Share Article function
  const shareArticle = (article, platform = null) => {
    const shareUrl = encodeURIComponent(article.url);
    const shareTitle = encodeURIComponent(article.title);
    const shareText = encodeURIComponent(article.description || '');

    let shareWindowUrl = '';
    
    switch(platform) {
      case 'facebook':
        shareWindowUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'twitter':
        shareWindowUrl = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`;
        break;
      case 'linkedin':
        shareWindowUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      case 'whatsapp':
        shareWindowUrl = `https://wa.me/?text=${shareTitle}%20${shareUrl}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(article.url)
          .then(() => {
            showNotification('Article link copied to clipboard');
          })
          .catch(error => {
            console.log('Error copying to clipboard:', error);
          });
        return;
      default:
        if (navigator.share) {
          navigator.share({
            title: article.title,
            text: article.description,
            url: article.url
          })
          .catch(error => {
            console.log('Error sharing:', error);
          });
          return;
        } else {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(article.url)
            .then(() => {
              showNotification('Article link copied to clipboard');
            })
            .catch(error => {
              console.log('Error copying to clipboard:', error);
            });
          return;
        }
    }

    window.open(shareWindowUrl, '_blank', 'width=600,height=400');
  };

  // Function to share the website itself
  const shareWebsite = () => {
    if (navigator.share) {
      navigator.share({
        title: 'NewsHub - Your Personalized News Aggregator',
        text: 'Check out NewsHub for the latest news updates!',
        url: window.location.href
      })
      .catch(error => {
        console.log('Error sharing:', error);
      });
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          showNotification('Website link copied to clipboard!');
        });
    }
  };

  // Fetch news from API
  useEffect(() => {
    // Don't fetch if we're showing bookmarks
    if (showBookmarks) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    const fetchNews = async () => {
      try {
        let url = '';
        
        if (searchQuery) {
          // Add to search history
          addToSearchHistory(searchQuery);
          
          // For search queries
          url = `${BASE_URL}/everything?q=${encodeURIComponent(searchQuery)}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;
          
          // Add sources filter if any sources are selected
          if (selectedSources.length > 0) {
            url += `&sources=${selectedSources.join(',')}`;
          }
        } else {
          // For category browsing
          if (selectedSources.length > 0) {
            // Use sources parameter
            url = `${BASE_URL}/top-headlines?sources=${selectedSources.join(',')}&pageSize=20&apiKey=${API_KEY}`;
          } else {
            // Use category and country
            url = `${BASE_URL}/top-headlines?category=${activeCategory}&country=us&pageSize=20&apiKey=${API_KEY}`;
          }
        }
        
        // Use demo data if no API key
        if (API_KEY === 'demo') {
          // Generate demo news data
          const demoNews = Array.from({ length: 6 }, (_, i) => ({
            id: `demo-${i}-${Date.now()}`,
            title: `Demo News Title ${i + 1} in ${activeCategory}`,
            description: `This is a sample news description for demonstration purposes. Category: ${activeCategory}`,
            url: `https://example.com/news/${i}`,
            urlToImage: `https://picsum.photos/300/200?random=${i}`,
            publishedAt: new Date().toISOString(),
            source: { name: 'Demo Source' },
            category: activeCategory,
            bookmarked: bookmarkedArticles.some(b => 
              b.title === `Demo News Title ${i + 1} in ${activeCategory}`
            )
          }));
          
          setNews(demoNews);
          setFilteredNews(demoNews);
          return;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'ok') {
          const articlesWithIds = data.articles.map((article, index) => ({
            ...article,
            id: article.id || `${article.publishedAt}-${index}-${Date.now()}`,
            category: activeCategory,
            bookmarked: bookmarkedArticles.some(b => 
              b.id === article.id || 
              (b.title === article.title && b.publishedAt === article.publishedAt)
            )
          }));
          
          setNews(articlesWithIds);
          setFilteredNews(articlesWithIds);
        } else {
          throw new Error(data.message || 'Failed to fetch news');
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message);
        
        // Generate fallback demo data on error
        const demoNews = Array.from({ length: 6 }, (_, i) => ({
          id: `fallback-${i}-${Date.now()}`,
          title: `Fallback News ${i + 1} in ${activeCategory}`,
          description: `This is fallback content showing because there was an error loading real news.`,
          url: `https://example.com/news/${i}`,
          urlToImage: `https://picsum.photos/300/200?random=${i}`,
          publishedAt: new Date().toISOString(),
          source: { name: 'Fallback Source' },
          category: activeCategory,
          bookmarked: false
        }));
        
        setNews(demoNews);
        setFilteredNews(demoNews);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [activeCategory, searchQuery, showBookmarks, API_KEY, bookmarkedArticles, selectedSources]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setShowBookmarks(false); // Switch back to news view when searching
  };

  // Handle search from history
  const handleSearchFromHistory = (query) => {
    setSearchQuery(query);
    setShowBookmarks(false);
  };

  // View article details
  const viewArticleDetails = (article) => {
    setSelectedArticle(article);
  };

  // Close article details
  const closeArticleDetails = () => {
    setSelectedArticle(null);
  };

  return (
    <div className={darkMode ? 'app dark-mode' : 'app'}>
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleBookmarksView={toggleBookmarksView}
        showBookmarks={showBookmarks}
        bookmarkedArticles={bookmarkedArticles}
        toggleSourceFilter={toggleSourceFilter}
        showSourceFilter={showSourceFilter}
        requestNotificationPermission={requestNotificationPermission}
        shareWebsite={shareWebsite}
      />
      
      {searchQuery && searchHistory.length > 0 && (
        <SearchHistory 
          searchHistory={searchHistory}
          onSearch={handleSearchFromHistory}
        />
      )}
      
      {showSourceFilter && (
        <SourceFilter 
          sources={AVAILABLE_SOURCES}
          selectedSources={selectedSources}
          setSelectedSources={setSelectedSources}
        />
      )}
      
      {!showBookmarks && (
        <Filters 
          categories={categories}
          activeCategory={categories.find(cat => cat.id === activeCategory)?.name || 'General'}
          setActiveCategory={(categoryName) => {
            const category = categories.find(cat => cat.name === categoryName);
            if (category) {
              setActiveCategory(category.id);
              setSearchQuery('');
              setShowBookmarks(false);
            }
          }}
        />
      )}
      
      {error && (
        <div className="container">
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i> 
            {error}
          </div>
        </div>
      )}
      
      {showBookmarks ? (
        <BookmarkList 
          bookmarks={bookmarkedArticles}
          toggleBookmark={toggleBookmark}
          viewArticleDetails={viewArticleDetails}
          shareArticle={shareArticle}
        />
      ) : (
        <NewsGrid 
          news={filteredNews}
          isLoading={isLoading}
          toggleBookmark={toggleBookmark}
          viewArticleDetails={viewArticleDetails}
          shareArticle={shareArticle}
        />
      )}
      
      <Footer />
      
      {/* Article Detail Modal */}
      {selectedArticle && (
        <ArticleDetail 
          article={selectedArticle}
          onClose={closeArticleDetails}
          toggleBookmark={toggleBookmark}
          shareArticle={shareArticle}
          isBookmarked={bookmarkedArticles.some(item => 
            item.id === selectedArticle.id || 
            (item.title === selectedArticle.title && item.publishedAt === selectedArticle.publishedAt)
          )}
        />
      )}
    </div>
  );
}

export default App;
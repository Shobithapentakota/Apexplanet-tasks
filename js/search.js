// Search functionality
class SearchManager {
    constructor() {
        this.searchBtn = $('#search-btn');
        this.searchModal = $('#search-modal');
        this.searchInput = $('#search-input');
        this.searchClose = $('#search-close');
        this.searchResults = $('#search-results');
        this.products = productsData;
        this.searchHistory = this.loadSearchHistory();
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Open search modal
        this.searchBtn.addEventListener('click', () => {
            this.openSearch();
        });
        
        // Close search modal
        this.searchClose.addEventListener('click', () => {
            this.closeSearch();
        });
        
        // Close search when clicking overlay
        this.searchModal.addEventListener('click', (e) => {
            if (e.target === this.searchModal) {
                this.closeSearch();
            }
        });
        
        // Search input
        this.searchInput.addEventListener('input', debounce((e) => {
            this.handleSearch(e.target.value);
        }, 300));
        
        // Search on enter
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) {
                    this.performSearch(query);
                }
            }
        });
        
        // Close search with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.searchModal.classList.contains('active')) {
                this.closeSearch();
            }
        });
    }
    
    openSearch() {
        this.searchModal.classList.add('active');
        this.searchInput.focus();
        document.body.style.overflow = 'hidden';
        
        // Show search history if no query
        if (!this.searchInput.value.trim()) {
            this.showSearchHistory();
        }
    }
    
    closeSearch() {
        this.searchModal.classList.remove('active');
        this.searchInput.value = '';
        this.searchResults.innerHTML = '';
        document.body.style.overflow = '';
    }
    
    handleSearch(query) {
        if (!query.trim()) {
            this.showSearchHistory();
            return;
        }
        
        const results = this.searchProducts(query);
        this.displaySearchResults(results, query);
    }
    
    searchProducts(query) {
        const searchTerm = query.toLowerCase().trim();
        
        return this.products.filter(product => {
            return (
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm) ||
                product.features.some(feature => feature.toLowerCase().includes(searchTerm))
            );
        }).sort((a, b) => {
            // Prioritize exact matches in name
            const aNameMatch = a.name.toLowerCase().includes(searchTerm);
            const bNameMatch = b.name.toLowerCase().includes(searchTerm);
            
            if (aNameMatch && !bNameMatch) return -1;
            if (!aNameMatch && bNameMatch) return 1;
            
            // Then by rating
            return b.rating - a.rating;
        });
    }
    
    displaySearchResults(results, query) {
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-no-results">
                    <h3>No results found for "${query}"</h3>
                    <p>Try searching with different keywords or browse our categories.</p>
                </div>
            `;
            return;
        }
        
        this.searchResults.innerHTML = `
            <div class="search-results-header">
                <h3>Search Results (${results.length})</h3>
            </div>
            <div class="search-results-list">
                ${results.slice(0, 8).map(product => this.createSearchResultItem(product, query)).join('')}
            </div>
            ${results.length > 8 ? `
                <div class="search-results-footer">
                    <button class="btn btn--secondary" onclick="searchManager.showAllResults('${query}')">
                        View All ${results.length} Results
                    </button>
                </div>
            ` : ''}
        `;
        
        // Add event listeners to search result items
        this.bindSearchResultEvents();
    }
    
    createSearchResultItem(product, query) {
        const highlightedName = this.highlightSearchTerm(product.name, query);
        const highlightedDescription = this.highlightSearchTerm(product.description, query);
        
        return `
            <div class="search-result-item" data-id="${product.id}">
                <div class="search-result-item__image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="search-result-item__content">
                    <h4 class="search-result-item__title">${highlightedName}</h4>
                    <p class="search-result-item__category">${product.category}</p>
                    <p class="search-result-item__description">${highlightedDescription}</p>
                    <div class="search-result-item__price">
                        <span class="search-result-item__price-current">${formatCurrency(product.price)}</span>
                        ${product.originalPrice ? `<span class="search-result-item__price-original">${formatCurrency(product.originalPrice)}</span>` : ''}
                    </div>
                    <div class="search-result-item__rating">
                        ${formatRating(product.rating)}
                        <span>(${product.reviews} reviews)</span>
                    </div>
                </div>
                <div class="search-result-item__actions">
                    <button class="btn btn--primary btn--sm add-to-cart-btn">Add to Cart</button>
                    <button class="btn btn--secondary btn--sm quick-view-btn">Quick View</button>
                </div>
            </div>
        `;
    }
    
    highlightSearchTerm(text, query) {
        if (!query.trim()) return text;
        
        const regex = new RegExp(`(${query.trim()})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    bindSearchResultEvents() {
        // Add to cart from search results
        $$('.search-result-item .add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const resultItem = e.target.closest('.search-result-item');
                const productId = parseInt(resultItem.dataset.id);
                const product = this.products.find(p => p.id === productId);
                
                if (product) {
                    document.dispatchEvent(new CustomEvent('addToCart', { detail: product }));
                }
            });
        });
        
        // Quick view from search results
        $$('.search-result-item .quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const resultItem = e.target.closest('.search-result-item');
                const productId = parseInt(resultItem.dataset.id);
                
                if (productManager) {
                    productManager.openQuickView(productId);
                    this.closeSearch();
                }
            });
        });
        
        // Click on search result item
        $$('.search-result-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const productId = parseInt(item.dataset.id);
                    
                    if (productManager) {
                        productManager.openQuickView(productId);
                        this.closeSearch();
                    }
                }
            });
        });
    }
    
    performSearch(query) {
        // Add to search history
        this.addToSearchHistory(query);
        
        // Close search modal
        this.closeSearch();
        
        // Filter products and scroll to products section
        if (productManager) {
            // For now, we'll just show all results
            // In a real app, you might want to create a dedicated search results page
            showNotification(`Showing results for "${query}"`, 'info');
            
            // Scroll to products section
            const productsSection = $('#products');
            scrollToElement(productsSection, 100);
        }
    }
    
    showAllResults(query) {
        this.performSearch(query);
    }
    
    showSearchHistory() {
        if (this.searchHistory.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-history-empty">
                    <h3>Start typing to search</h3>
                    <p>Search for products, categories, or features</p>
                </div>
            `;
            return;
        }
        
        this.searchResults.innerHTML = `
            <div class="search-history">
                <div class="search-history-header">
                    <h3>Recent Searches</h3>
                    <button class="btn btn--sm btn--secondary" onclick="searchManager.clearSearchHistory()">
                        Clear All
                    </button>
                </div>
                <div class="search-history-list">
                    ${this.searchHistory.map(term => `
                        <div class="search-history-item" onclick="searchManager.searchFromHistory('${term}')">
                            <span class="search-history-item__icon">🔍</span>
                            <span class="search-history-item__term">${term}</span>
                            <button class="search-history-item__remove" onclick="event.stopPropagation(); searchManager.removeFromSearchHistory('${term}')">×</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    addToSearchHistory(query) {
        const term = query.trim().toLowerCase();
        if (!term) return;
        
        // Remove if already exists
        this.searchHistory = this.searchHistory.filter(item => item !== term);
        
        // Add to beginning
        this.searchHistory.unshift(term);
        
        // Keep only last 10 searches
        this.searchHistory = this.searchHistory.slice(0, 10);
        
        this.saveSearchHistory();
    }
    
    removeFromSearchHistory(term) {
        this.searchHistory = this.searchHistory.filter(item => item !== term);
        this.saveSearchHistory();
        this.showSearchHistory();
    }
    
    clearSearchHistory() {
        this.searchHistory = [];
        this.saveSearchHistory();
        this.showSearchHistory();
    }
    
    searchFromHistory(term) {
        this.searchInput.value = term;
        this.handleSearch(term);
    }
    
    saveSearchHistory() {
        storage.set('searchHistory', this.searchHistory);
    }
    
    loadSearchHistory() {
        return storage.get('searchHistory') || [];
    }
}

// Initialize search manager when DOM is loaded
let searchManager;

document.addEventListener('DOMContentLoaded', () => {
    searchManager = new SearchManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SearchManager;
}
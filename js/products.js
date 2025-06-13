// Products management and display functionality
class ProductManager {
    constructor() {
        this.products = productsData;
        this.filteredProducts = [...this.products];
        this.currentFilter = 'all';
        this.productsPerPage = 8;
        this.currentPage = 1;
        this.productsGrid = $('#products-grid');
        this.loadMoreBtn = $('#load-more-btn');
        this.filterBtns = $$('.filter-btn');
        this.quickViewModal = $('#quick-view-modal');
        this.quickViewContent = $('#quick-view-content');
        this.quickViewClose = $('#quick-view-close');
        
        this.init();
    }
    
    init() {
        this.renderProducts();
        this.bindEvents();
        this.initIntersectionObserver();
    }
    
    bindEvents() {
        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });
        
        // Load more button
        this.loadMoreBtn.addEventListener('click', () => {
            this.loadMoreProducts();
        });
        
        // Quick view modal
        this.quickViewClose.addEventListener('click', () => {
            this.closeQuickView();
        });
        
        this.quickViewModal.querySelector('.quick-view-modal__overlay').addEventListener('click', () => {
            this.closeQuickView();
        });
        
        // Category cards click
        $$('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.filterProducts(category);
                this.scrollToProducts();
            });
        });
    }
    
    handleFilterClick(btn) {
        // Update active filter button
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter products
        const filter = btn.dataset.filter;
        this.filterProducts(filter);
    }
    
    filterProducts(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;
        
        if (filter === 'all') {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product => product.category === filter);
        }
        
        this.renderProducts();
        this.updateLoadMoreButton();
    }
    
    renderProducts() {
        const startIndex = 0;
        const endIndex = this.currentPage * this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);
        
        this.productsGrid.innerHTML = productsToShow.map(product => this.createProductCard(product)).join('');
        
        // Add event listeners to new product cards
        this.bindProductCardEvents();
        
        // Animate product cards
        this.animateProductCards();
    }
    
    loadMoreProducts() {
        this.currentPage++;
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = this.currentPage * this.productsPerPage;
        const newProducts = this.filteredProducts.slice(startIndex, endIndex);
        
        const newProductsHTML = newProducts.map(product => this.createProductCard(product)).join('');
        this.productsGrid.insertAdjacentHTML('beforeend', newProductsHTML);
        
        // Add event listeners to new product cards
        this.bindProductCardEvents();
        
        // Animate new product cards
        const newCards = this.productsGrid.querySelectorAll('.product-card:nth-last-child(-n+' + newProducts.length + ')');
        newCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-fade-in-up');
            }, index * 100);
        });
        
        this.updateLoadMoreButton();
    }
    
    updateLoadMoreButton() {
        const totalShown = this.currentPage * this.productsPerPage;
        const hasMore = totalShown < this.filteredProducts.length;
        
        this.loadMoreBtn.style.display = hasMore ? 'block' : 'none';
        
        if (hasMore) {
            const remaining = this.filteredProducts.length - totalShown;
            this.loadMoreBtn.textContent = `Load More Products (${remaining} remaining)`;
        }
    }
    
    createProductCard(product) {
        const badgeHTML = product.badge ? `<div class="product-card__badge product-card__badge--${product.badge}">${product.badge}</div>` : '';
        const originalPriceHTML = product.originalPrice ? `<span class="product-card__price-original">${formatCurrency(product.originalPrice)}</span>` : '';
        
        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-card__image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${badgeHTML}
                    <div class="product-card__actions">
                        <button class="product-card__action-btn quick-view-btn" title="Quick View">👁</button>
                        <button class="product-card__action-btn wishlist-btn" title="Add to Wishlist">♡</button>
                    </div>
                </div>
                <div class="product-card__content">
                    <p class="product-card__category">${product.category}</p>
                    <h3 class="product-card__title">${product.name}</h3>
                    <p class="product-card__description">${product.description}</p>
                    <div class="product-card__rating">
                        <div class="product-card__stars">
                            ${formatRating(product.rating)}
                        </div>
                        <span class="product-card__rating-text">(${product.reviews} reviews)</span>
                    </div>
                    <div class="product-card__price">
                        <span class="product-card__price-current">${formatCurrency(product.price)}</span>
                        ${originalPriceHTML}
                    </div>
                    <button class="product-card__add-to-cart add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        `;
    }
    
    bindProductCardEvents() {
        // Add to cart buttons
        $$('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productCard = e.target.closest('.product-card');
                const productId = parseInt(productCard.dataset.id);
                const product = this.products.find(p => p.id === productId);
                
                if (product) {
                    document.dispatchEvent(new CustomEvent('addToCart', { detail: product }));
                }
            });
        });
        
        // Quick view buttons
        $$('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productCard = e.target.closest('.product-card');
                const productId = parseInt(productCard.dataset.id);
                this.openQuickView(productId);
            });
        });
        
        // Wishlist buttons
        $$('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productCard = e.target.closest('.product-card');
                const productId = parseInt(productCard.dataset.id);
                const product = this.products.find(p => p.id === productId);
                
                if (product) {
                    this.toggleWishlist(product);
                    btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
                    btn.style.color = btn.textContent === '♥' ? '#ef4444' : '';
                }
            });
        });
        
        // Product card click for quick view
        $$('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const productId = parseInt(card.dataset.id);
                    this.openQuickView(productId);
                }
            });
        });
    }
    
    openQuickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const originalPriceHTML = product.originalPrice ? 
            `<span class="quick-view__price-original">${formatCurrency(product.originalPrice)}</span>` : '';
        
        this.quickViewContent.innerHTML = `
            <div class="quick-view__image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="quick-view__content">
                <p class="quick-view__category">${product.category}</p>
                <h2 class="quick-view__title">${product.name}</h2>
                <div class="quick-view__rating">
                    <div class="product-card__stars">
                        ${formatRating(product.rating)}
                    </div>
                    <span class="product-card__rating-text">(${product.reviews} reviews)</span>
                </div>
                <div class="quick-view__price">
                    <span class="quick-view__price-current">${formatCurrency(product.price)}</span>
                    ${originalPriceHTML}
                </div>
                <p class="quick-view__description">${product.description}</p>
                <div class="quick-view__features">
                    <h4>Features:</h4>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="quick-view__actions">
                    <button class="quick-view__add-to-cart" onclick="productManager.addToCartFromQuickView(${product.id})">
                        Add to Cart
                    </button>
                    <button class="quick-view__wishlist" onclick="productManager.toggleWishlistFromQuickView(${product.id})">
                        ♡
                    </button>
                </div>
            </div>
        `;
        
        this.quickViewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeQuickView() {
        this.quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    addToCartFromQuickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            document.dispatchEvent(new CustomEvent('addToCart', { detail: product }));
            this.closeQuickView();
        }
    }
    
    toggleWishlistFromQuickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            this.toggleWishlist(product);
            const btn = this.quickViewContent.querySelector('.quick-view__wishlist');
            btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
            btn.style.color = btn.textContent === '♥' ? '#ef4444' : '';
        }
    }
    
    toggleWishlist(product) {
        let wishlist = storage.get('wishlist') || [];
        const existingIndex = wishlist.findIndex(item => item.id === product.id);
        
        if (existingIndex > -1) {
            wishlist.splice(existingIndex, 1);
            showNotification(`${product.name} removed from wishlist`, 'info');
        } else {
            wishlist.push(product);
            showNotification(`${product.name} added to wishlist`, 'success');
        }
        
        storage.set('wishlist', wishlist);
    }
    
    animateProductCards() {
        const cards = $$('.product-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-fade-in-up');
            }, index * 100);
        });
    }
    
    scrollToProducts() {
        const productsSection = $('#products');
        scrollToElement(productsSection, 100);
    }
    
    initIntersectionObserver() {
        // Animate products when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        // Observe product cards as they're added
        const observeNewCards = () => {
            $$('.product-card:not(.animate-fade-in-up)').forEach(card => {
                observer.observe(card);
            });
        };
        
        // Initial observation
        setTimeout(observeNewCards, 100);
        
        // Re-observe after filtering
        document.addEventListener('productsFiltered', observeNewCards);
    }
}

// Initialize product manager when DOM is loaded
let productManager;

document.addEventListener('DOMContentLoaded', () => {
    productManager = new ProductManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductManager;
}
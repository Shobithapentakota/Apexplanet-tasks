// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.modal = $('#cart-modal');
        this.cartBtn = $('#cart-btn');
        this.cartCount = $('#cart-count');
        this.cartItems = $('#cart-items');
        this.cartTotal = $('#cart-total');
        this.cartClose = $('#cart-close');
        
        this.init();
    }
    
    init() {
        this.updateCartUI();
        this.bindEvents();
    }
    
    bindEvents() {
        // Open cart modal
        this.cartBtn.addEventListener('click', () => {
            this.openCart();
        });
        
        // Close cart modal
        this.cartClose.addEventListener('click', () => {
            this.closeCart();
        });
        
        // Close cart when clicking overlay
        this.modal.querySelector('.cart-modal__overlay').addEventListener('click', () => {
            this.closeCart();
        });
        
        // Checkout button
        this.modal.querySelector('.cart-checkout').addEventListener('click', () => {
            this.checkout();
        });
        
        // Listen for add to cart events
        document.addEventListener('addToCart', (e) => {
            this.addItem(e.detail);
        });
    }
    
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showAddedNotification(product.name);
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.renderCartItems();
    }
    
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartUI();
                this.renderCartItems();
            }
        }
    }
    
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }
    
    updateCartUI() {
        const count = this.getItemCount();
        this.cartCount.textContent = count;
        this.cartCount.style.display = count > 0 ? 'block' : 'none';
        
        const total = this.getTotal();
        this.cartTotal.textContent = formatCurrency(total);
    }
    
    openCart() {
        this.modal.classList.add('active');
        this.renderCartItems();
        document.body.style.overflow = 'hidden';
    }
    
    closeCart() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    renderCartItems() {
        if (this.items.length === 0) {
            this.cartItems.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty__icon">🛒</div>
                    <h3 class="cart-empty__title">Your cart is empty</h3>
                    <p class="cart-empty__description">Add some products to get started!</p>
                    <button class="btn btn--primary" onclick="cart.closeCart()">Continue Shopping</button>
                </div>
            `;
            return;
        }
        
        this.cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item__image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="cart-item__content">
                    <h4 class="cart-item__title">${item.name}</h4>
                    <p class="cart-item__price">${formatCurrency(item.price)}</p>
                    <div class="cart-item__controls">
                        <button class="cart-item__quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="cart-item__quantity">${item.quantity}</span>
                        <button class="cart-item__quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button class="cart-item__remove" onclick="cart.removeItem(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    checkout() {
        if (this.items.length === 0) {
            showNotification('Your cart is empty!', 'warning');
            return;
        }
        
        // Simulate checkout process
        showNotification('Redirecting to checkout...', 'info');
        
        setTimeout(() => {
            showNotification('Thank you for your purchase! (Demo)', 'success');
            this.clearCart();
            this.closeCart();
        }, 2000);
    }
    
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
        this.renderCartItems();
    }
    
    saveCart() {
        storage.set('cart', this.items);
    }
    
    loadCart() {
        return storage.get('cart') || [];
    }
    
    showAddedNotification(productName) {
        showNotification(`${productName} added to cart!`, 'success');
    }
}

// Initialize cart when DOM is loaded
let cart;

document.addEventListener('DOMContentLoaded', () => {
    cart = new ShoppingCart();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShoppingCart;
}
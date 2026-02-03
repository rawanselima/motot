// Product Details functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentProductId = 1; // This would come from URL parameters in a real app

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    setupMobileMenu();
    setupProductGallery();
    setupQuantityControls();
    setupProductTabs();
    setupAddToCart();
    setupWishlist();
    
    // Check URL for product ID
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (productId) {
        currentProductId = parseInt(productId);
        loadProductDetails(currentProductId);
    }
});

// Setup product gallery
function setupProductGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const newImage = this.dataset.image;
            if (newImage) {
                // Add fade out effect
                mainImage.style.opacity = '0';
                
                setTimeout(() => {
                    mainImage.src = newImage;
                    mainImage.style.opacity = '1';
                    mainImage.style.transition = 'opacity 0.3s ease';
                }, 150);
            }
        });
    });
}

// Setup quantity controls
function setupQuantityControls() {
    const quantityInput = document.querySelector('.quantity-input');
    const decreaseBtn = document.querySelector('.quantity-btn.decrease');
    const increaseBtn = document.querySelector('.quantity-btn.increase');
    
    decreaseBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        const maxValue = parseInt(quantityInput.max) || 45;
        if (currentValue < maxValue) {
            quantityInput.value = currentValue + 1;
        }
    });
    
    quantityInput.addEventListener('change', function() {
        const value = parseInt(this.value);
        const min = parseInt(this.min) || 1;
        const max = parseInt(this.max) || 45;
        
        if (value < min) {
            this.value = min;
        } else if (value > max) {
            this.value = max;
        }
    });
}

// Setup product tabs
function setupProductTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            document.getElementById(targetTab).classList.add('active');
            
            // Smooth scroll to tabs if clicking from product info
            if (this.id === 'reviewsTab') {
                document.querySelector('.product-tabs').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup add to cart
function setupAddToCart() {
    const addToCartBtn = document.querySelector('.btn-add-cart');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const quantity = parseInt(document.querySelector('.quantity-input').value);
            addToCart(currentProductId, quantity);
        });
    }
    
    // Also handle add to cart from related products
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-add-cart') || 
            e.target.closest('.btn-add-cart')) {
            const productId = parseInt(e.target.dataset.productId || 
                                     e.target.closest('.btn-add-cart').dataset.productId);
            if (productId) {
                addToCart(productId, 1);
            }
        }
    });
}

// Add to cart function
function addToCart(productId, quantity = 1) {
    // In a real app, you would fetch product data from an API
    // For now, we'll use sample data
    const product = getProductById(productId);
    
    if (!product) {
        showError('المنتج غير متوفر');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    updateCart();
    showSuccess(`تم إضافة ${quantity} × ${product.name} إلى سلة التسوق`);
}

// Get product by ID (sample data)
function getProductById(id) {
    const products = [
        { id: 1, name: "زيت محرك سينتيك 5W-30", price: 85, image: "https://www.nourstores.com/us/141/pidwebp600/5868/f132793155274608616310-1.png" },
        { id: 13, name: "زيت محرك كاسترول 10W-40", price: 75, image: "https://via.placeholder.com/300x200/333/fff?text=زيت+محرك+كاسترول" },
        { id: 14, name: "زيت ناقل حركة أوتوماتيك", price: 120, image: "https://via.placeholder.com/300x200/333/fff?text=زيت+ناقل+حركة" },
        { id: 15, name: "فلتر زيت تويوتا أصلي", price: 35, image: "https://via.placeholder.com/300x200/333/fff?text=فلتر+زيت" },
        { id: 16, name: "زيت فرامل DOT 4", price: 45, image: "https://via.placeholder.com/300x200/333/fff?text=زيت+فرامل" }
    ];
    
    return products.find(product => product.id === id);
}

// Load product details (simulated)
function loadProductDetails(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    // Update product details
    document.querySelector('.product-header h1').textContent = product.name;
    document.querySelector('.current-price').textContent = `${product.price} جنيه`;
    document.getElementById('mainImage').src = product.image;
    
    // Update breadcrumb
    const breadcrumbCurrent = document.querySelector('.breadcrumb .current');
    if (breadcrumbCurrent) {
        breadcrumbCurrent.textContent = product.name;
    }
}

// Setup wishlist
function setupWishlist() {
    const wishlistBtn = document.querySelector('.btn-wishlist');
    
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            // Toggle wishlist state
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.innerHTML = '<i class="fas fa-heart"></i> تمت الإضافة للمفضلة';
                showSuccess('تمت إضافة المنتج إلى المفضلة');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.innerHTML = '<i class="far fa-heart"></i> أضف للمفضلة';
                showSuccess('تمت إزالة المنتج من المفضلة');
            }
            
            // Toggle button color
            this.classList.toggle('btn-secondary');
            this.classList.toggle('btn-wishlist-active');
        });
    }
}

// Update cart
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count
function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });
}

// Show success message
function showSuccess(message) {
    // Remove any existing messages
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i> ${message}
    `;
    successDiv.style.cssText = `
        background-color: #d4edda;
        color: #155724;
        padding: 15px;
        border-radius: 4px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        position: fixed;
        top: 100px;
        right: 50%;
        transform: translateX(50%);
        z-index: 10000;
        box-shadow: var(--shadow);
        animation: slideDown 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transition = 'opacity 0.3s ease';
        setTimeout(() => successDiv.remove(), 300);
    }, 3000);
}

// Show error message
function showError(message) {
    // Remove any existing error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i> ${message}
    `;
    errorDiv.style.cssText = `
        background-color: #f8d7da;
        color: #721c24;
        padding: 15px;
        border-radius: 4px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
    `;
    
    // Insert error message before the product actions
    const productActions = document.querySelector('.product-actions');
    if (productActions) {
        productActions.parentNode.insertBefore(errorDiv, productActions);
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        errorDiv.style.transition = 'opacity 0.3s ease';
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}

// Mobile menu toggle
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
}
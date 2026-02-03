// Featured products data
const featuredProducts = [
    {
        id: 1,
        name: "زيت محرك سينتيك 5W-30",
        price: 85,
        image: "https://www.nourstores.com/us/141/pidwebp600/5868/f132793155274608616310-1.png",
        category: "زيوت",
        rating: 4.5
    },
    {
        id: 2,
        name: "بطارية سيارة 60 أمبير",
        price: 320,
        image: "https://tse3.mm.bing.net/th/id/OIP.2Q4WEHfOWPYcjlXBUynVWwHaGm?rs=1&pid=ImgDetMain&o=7&rm=3",
        category: "بطاريات",
        rating: 4.3
    },
    {
        id: 3,
        name: "إطار هانكوك 205/55R16",
        price: 280,
        image: "https://tse4.mm.bing.net/th/id/OIP.JoWN8X0RDqhBeKoRCH87rwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
        category: "إطارات",
        rating: 4.7
    },
    {
        id: 4,
        name: "فلتر هواء تويوتا",
        price: 45,
        image: "https://kaber-trade.com/wp-content/uploads/2024/07/3958.jpg",
        category: "فلاتر",
        rating: 4.2
    }
];

// Cart data
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    updateCartCount();
    loadFeaturedProducts();
    setupMobileMenu();
    

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        function adjustHeroImage() {
            const isMobile = window.innerWidth <= 768;
            const isLandscape = window.innerWidth > window.innerHeight;
            
            if (isMobile) {
                if (isLandscape) {

                    heroSection.style.backgroundPosition = 'center 40%';
                    heroSection.style.minHeight = '120vh';
                } else {

                    heroSection.style.backgroundPosition = 'center 35%';
                    heroSection.style.minHeight = '100vh';
                }
            } else {

                heroSection.style.backgroundPosition = 'center center';
                heroSection.style.minHeight = '100vh';
            }
        }
        
        adjustHeroImage();
        window.addEventListener('resize', adjustHeroImage);
        window.addEventListener('orientationchange', adjustHeroImage);
        
        const heroImage = new Image();
        heroImage.src = '../assets/images/hero-bg.png';
        heroImage.onload = function() {
            heroSection.style.opacity = '1';
        };
        
        heroSection.style.transition = 'opacity 0.5s ease';
        heroSection.style.opacity = '0.8';
        setTimeout(() => {
            heroSection.style.opacity = '1';
        }, 100);
    }
    
    // Add to cart buttons event delegation
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-add-cart') || 
            e.target.closest('.btn-add-cart')) {
            const productId = parseInt(e.target.dataset.productId || 
                                     e.target.closest('.btn-add-cart').dataset.productId);
            if (productId) {
                addToCart(productId);
            }
        }
    });
});

// Load featured products
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    container.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <span class="product-price">${product.price} جنيه</span>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                </div>
                <div class="product-actions">
                    <a href="html/product-details.html?id=${product.id}" class="btn btn-view">عرض التفاصيل</a>
                    <button class="btn btn-add-cart" data-product-id="${product.id}">أضف للسلة</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Generate star rating
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Add to cart function
function addToCart(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification('تم إضافة المنتج إلى سلة التسوق');
}

// Update cart
function updateCart() {
    cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background-color: var(--primary-color);
        color: var(--light-color);
        padding: 15px 25px;
        border-radius: 4px;
        z-index: 10000;
        box-shadow: var(--shadow);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
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

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
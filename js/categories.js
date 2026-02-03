// Categories page functionality
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    setupMobileMenu();
    loadCategories();
    loadPopularProducts();
    
    // Add to cart from popular products
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

// Load categories
function loadCategories() {
    const categories = [
        {
            id: 1,
            name: "زيوت المحركات",
            description: "زيوت محركات صناعية وطبيعية بجميع درجات اللزوجة",
            image: "https://via.placeholder.com/400x300/333/fff?text=زيوت+المحركات",
            count: 45,
            link: "products.html?category=oils"
        },
        {
            id: 2,
            name: "البطاريات والكهرباء",
            description: "بطاريات سيارات وأنظمة كهربائية وشواحن",
            image: "https://via.placeholder.com/400x300/333/fff?text=البطاريات+والكهرباء",
            count: 32,
            link: "products.html?category=batteries"
        },
        {
            id: 3,
            name: "الإطارات والفرامل",
            description: "إطارات سيارات وقطع فرامل وأقراص",
            image: "https://via.placeholder.com/400x300/333/fff?text=الإطارات+والفرامل",
            count: 28,
            link: "products.html?category=tires"
        },
        {
            id: 4,
            name: "قطع المحرك",
            description: "أجزاء المحرك الرئيسية والملحقات",
            image: "https://via.placeholder.com/400x300/333/fff?text=قطع+المحرك",
            count: 67,
            link: "products.html?category=engine"
        },
        {
            id: 5,
            name: "الفلاتر والزيوت",
            description: "فلاتر هواء وزيت ووقود وسوائل تبريد",
            image: "https://via.placeholder.com/400x300/333/fff?text=الفلاتر+والزيوت",
            count: 53,
            link: "products.html?category=filters"
        },
        {
            id: 6,
            name: "نظام العادم",
            description: "أنابيب عادم وكواتم صوت ومحولات حفازة",
            image: "https://via.placeholder.com/400x300/333/fff?text=نظام+العادم",
            count: 24,
            link: "products.html?category=exhaust"
        },
        {
            id: 7,
            name: "نظام التبريد",
            description: "راديترات ومراوح ومضخات ماء",
            image: "https://via.placeholder.com/400x300/333/fff?text=نظام+التبريد",
            count: 19,
            link: "products.html?category=cooling"
        },
        {
            id: 8,
            name: "الإضاءة والزجاج",
            description: "مصابيح سيارات ومرايا وزجاج",
            image: "https://via.placeholder.com/400x300/333/fff?text=الإضاءة+والزجاج",
            count: 41,
            link: "products.html?category=lighting"
        },
        {
            id: 9,
            name: "ناقل الحركة",
            description: "قطع غيار ناقل الحركة الأوتوماتيكي والعادي",
            image: "https://via.placeholder.com/400x300/333/fff?text=ناقل+الحركة",
            count: 36,
            link: "products.html?category=transmission"
        },
        {
            id: 10,
            name: "الديكور والاكسسوارات",
            description: "قطع تزيين وإضافات وتحسينات للسيارة",
            image: "https://via.placeholder.com/400x300/333/fff?text=الديكور+والاكسسوارات",
            count: 89,
            link: "products.html?category=accessories"
        }
    ];

    const container = document.getElementById('categoriesGrid');
    if (!container) return;

    container.innerHTML = categories.map(category => `
        <div class="category-card-large">
            <div class="category-image">
                <img src="${category.image}" alt="${category.name}">
            </div>
            <div class="category-content">
                <h3>${category.name}</h3>
                <p>${category.description}</p>
                <div class="category-stats">
                    <span class="product-count">${category.count} منتج</span>
                    <a href="${category.link}" class="btn btn-primary btn-category">تصفح المنتجات</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Load popular products
function loadPopularProducts() {
    const popularProducts = [
        {
            id: 1,
            name: "زيت محرك سينتيك 5W-30",
            price: 85,
            image: "https://via.placeholder.com/300x200/333/fff?text=زيت+محرك",
            rating: 4.5
        },
        {
            id: 2,
            name: "بطارية سيارة 60 أمبير",
            price: 320,
            image: "https://via.placeholder.com/300x200/333/fff?text=بطارية",
            rating: 4.3
        },
        {
            id: 3,
            name: "إطار هانكوك 205/55R16",
            price: 280,
            image: "https://via.placeholder.com/300x200/333/fff?text=إطار",
            rating: 4.7
        },
        {
            id: 4,
            name: "فلتر هواء تويوتا",
            price: 45,
            image: "https://via.placeholder.com/300x200/333/fff?text=فلتر+هواء",
            rating: 4.2
        }
    ];

    const container = document.getElementById('popularProducts');
    if (!container) return;

    container.innerHTML = popularProducts.map(product => `
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
                    <a href="product-details.html?id=${product.id}" class="btn btn-view">عرض التفاصيل</a>
                    <button class="btn btn-add-cart" data-product-id="${product.id}">أضف للسلة</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Generate stars for rating
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
    const popularProducts = [
        { id: 1, name: "زيت محرك سينتيك 5W-30", price: 85, image: "https://via.placeholder.com/300x200/333/fff?text=زيت+محرك" },
        { id: 2, name: "بطارية سيارة 60 أمبير", price: 320, image: "https://via.placeholder.com/300x200/333/fff?text=بطارية" },
        { id: 3, name: "إطار هانكوك 205/55R16", price: 280, image: "https://via.placeholder.com/300x200/333/fff?text=إطار" },
        { id: 4, name: "فلتر هواء تويوتا", price: 45, image: "https://via.placeholder.com/300x200/333/fff?text=فلتر+هواء" }
    ];
    
    const product = popularProducts.find(p => p.id === productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
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
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`تم إضافة ${product.name} إلى سلة التسوق`);
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
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
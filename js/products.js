// Products data
const allProducts = [
    { id: 1,img:"../assets/images/car-ford-3-removebg-preview.png", name: "زيت محرك سينتيك 5W-30", price: 85, category: "زيوت", stock: 50, rating: 4.5 },
    { id: 2,img:"../assets/images/car-ford-2-removebg-preview.png", name: "بطارية سيارة 60 أمبير", price: 320, category: "بطاريات", stock: 30, rating: 4.3 },
    { id: 3,img:"../assets/images/car-ford-2-removebg-preview.png", name: "إطار هانكوك 205/55R16", price: 280, category: "إطارات", stock: 25, rating: 4.7 },
    { id: 4,img:"../assets/images/car-hyundai-3-removebg-preview.png", name: "فلتر هواء تويوتا", price: 45, category: "فلاتر", stock: 100, rating: 4.2 },
    { id: 5, img:"../assets/images/car-kia-3-removebg-preview.png",name: "زيت ناقل الحركة", price: 120, category: "زيوت", stock: 40, rating: 4.4 },
    { id: 6, img:"../assets/images/car-kia-3-removebg-preview.png", name: "بطارية 70 أمبير", price: 380, category: "بطاريات", stock: 20, rating: 4.6 },
    { id: 8, img:"../assets/images/car-kia-3-removebg-preview.png",name: "فلتر زيت", price: 35, category: "فلاتر", stock: 80, rating: 4.1 },
    { id: 9, img:"../assets/images/car-kia-3-removebg-preview.png", name: "شمعة احتراق", price: 25, category: "محرك", stock: 200, rating: 4.0 },
    { id: 10, img:"../assets/images/car-kia-3-removebg-preview.png", name: "سير المحرك", price: 90, category: "محرك", stock: 45, rating: 4.3 },
    { id: 11, img:"../assets/images/car-kia-3-removebg-preview.png", name: "دينامو", price: 420, category: "كهرباء", stock: 12, rating: 4.5 },
    { id: 12,  img:"../assets/images/car-kia-3-removebg-preview.png",name: "مساعدات أمامية", price: 180, category: "محرك", stock: 18, rating: 4.2 },
];

// Pagination
let currentPage = 1;
const productsPerPage = 8;

// Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    setupMobileMenu();
    loadProducts();
    setupFilters();
    setupPagination();
    
    // Event listeners
    document.getElementById('searchBtn').addEventListener('click', filterProducts);
    document.getElementById('searchInput').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') filterProducts();
    });
    
    // Add to cart event delegation
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

// Load products with pagination
function loadProducts(page = 1, filteredProducts = null) {
    const products = filteredProducts || allProducts;
    currentPage = page;
    
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);
    
    displayProducts(paginatedProducts);
    displayPagination(products.length, page);
}

// Display products
function displayProducts(products) {
    const container = document.getElementById('productsGrid');
    
    if (products.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open"></i>
                <p>لم يتم العثور على منتجات تطابق معايير البحث</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src=${product.img} alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3>${product.name}</h3>
                <span class="product-stock ${product.stock === 0 ? 'out-of-stock' : ''}">
                    ${product.stock === 0 ? 'غير متوفر' : `متوفر: ${product.stock} قطعة`}
                </span>
                <span class="product-price">${product.price} جنيه</span>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                </div>
                <div class="product-actions">
                <a href="product-details.html?id=${product.id}" class="btn btn-view">عرض التفاصيل</a>
                    <button class="btn btn-add-cart" data-product-id="${product.id}" 
                            ${product.stock === 0 ? 'disabled' : ''}>
                        ${product.stock === 0 ? 'غير متوفر' : 'أضف للسلة'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Generate stars
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

// Setup filters
function setupFilters() {
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    document.getElementById('priceFilter').addEventListener('change', filterProducts);
    document.getElementById('sortFilter').addEventListener('change', filterProducts);
}

// Filter products
function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const priceRange = document.getElementById('priceFilter').value;
    const sortBy = document.getElementById('sortFilter').value;
    
    let filtered = [...allProducts];
    
    // Search filter
    if (searchTerm) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
    }
    
    // Category filter
    if (category) {
        filtered = filtered.filter(product => product.category === category);
    }
    
    // Price filter
    if (priceRange) {
        if (priceRange === '1000+') {
            filtered = filtered.filter(product => product.price > 1000);
        } else {
            const [min, max] = priceRange.split('-').map(Number);
            filtered = filtered.filter(product => product.price >= min && product.price <= max);
        }
    }
    
    // Sort
    if (sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    loadProducts(1, filtered);
}

// Setup pagination
function setupPagination() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('page-btn')) {
            const page = parseInt(e.target.dataset.page);
            loadProducts(page);
        }
    });
}

// Display pagination
function displayPagination(totalProducts, currentPage) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button class="pagination-btn page-btn" data-page="${currentPage - 1}" 
                ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i> السابق
        </button>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button class="pagination-btn page-btn ${i === currentPage ? 'active' : ''}" 
                        data-page="${i}">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span class="pagination-dots">...</span>`;
        }
    }
    
    // Next button
    paginationHTML += `
        <button class="pagination-btn page-btn" data-page="${currentPage + 1}" 
                ${currentPage === totalPages ? 'disabled' : ''}>
            التالي <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
}

// Add to cart
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) {
        showError('المنتج غير متوفر');
        return;
    }

    const existingItem = cart.find(item => item.id === productId);
    const currentQuantityInCart = existingItem ? existingItem.quantity : 0;

    // ❌ منع تجاوز المخزون
    if (currentQuantityInCart + quantity > product.stock) {
        showError(`الكمية المتاحة فقط ${product.stock} قطعة`);
        return;
    }

    // ✅ إضافة للسلة
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

    // ✅ تحديث المخزون في الصفحة
    const remainingStock = product.stock - (currentQuantityInCart + quantity);
    document.querySelector('.stock-count').textContent =
        `${remainingStock} قطعة متبقية`;

    updateCart();
    showSuccess(`تم إضافة ${quantity} × ${product.name} إلى سلة التسوق`);
}



// Update cart
function updateCart() {
    cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count
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
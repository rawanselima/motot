// Products Data (موسعة ببيانات أكتر)
        const allProducts = [
            {
                id: 1,
                img: "../assets/images/car-ford-3-removebg-preview.png",
                name: "زيت محرك سينتيك 5W-30",
                price: 85,
                oldPrice: 120,
                category: "زيوت",
                stock: 50,
                rating: 4.5,
                reviews: 156,
                sold: 234,
                description: "زيت محرك تخليقي بالكامل - مناسب لجميع السيارات الملاكي",
                isNew: false,
                isPopular: true
            },
            {
                id: 2,
                img: "../assets/images/car-ford-2-removebg-preview.png",
                name: "بطارية سيارة 60 أمبير",
                price: 320,
                oldPrice: 380,
                category: "بطاريات",
                stock: 30,
                rating: 4.3,
                reviews: 98,
                sold: 167,
                description: "بطارية جافة - ضمان سنتين - صناعة ألماني",
                isNew: false,
                isPopular: true
            },
            {
                id: 3,
                img: "../assets/images/car-ford-2-removebg-preview.png",
                name: "إطار هانكوك 205/55R16",
                price: 280,
                oldPrice: 320,
                category: "إطارات",
                stock: 25,
                rating: 4.7,
                reviews: 67,
                sold: 89,
                description: "إطار صيفي - عالي الأداء - صناعة كوريا",
                isNew: true,
                isPopular: true
            },
            {
                id: 4,
                img: "../assets/images/car-hyundai-3-removebg-preview.png",
                name: "فلتر هواء تويوتا",
                price: 45,
                oldPrice: 60,
                category: "فلاتر",
                stock: 100,
                rating: 4.2,
                reviews: 234,
                sold: 456,
                description: "فلتر هواء أصلي - مناسب لمعظم موديلات تويوتا",
                isNew: false,
                isPopular: false
            },
            {
                id: 5,
                img: "../assets/images/car-kia-3-removebg-preview.png",
                name: "زيت ناقل الحركة الأوتوماتيك",
                price: 120,
                oldPrice: 150,
                category: "زيوت",
                stock: 40,
                rating: 4.4,
                reviews: 78,
                sold: 145,
                description: "زيت ناقل حركة أوتوماتيك - عالي الجودة",
                isNew: true,
                isPopular: false
            },
            {
                id: 6,
                img: "../assets/images/car-kia-3-removebg-preview.png",
                name: "بطارية 70 أمبير",
                price: 380,
                oldPrice: 450,
                category: "بطاريات",
                stock: 20,
                rating: 4.6,
                reviews: 56,
                sold: 98,
                description: "بطارية عالية الأداء - مناسبة للسيارات الكبيرة",
                isNew: false,
                isPopular: true
            },
            {
                id: 7,
                img: "../assets/images/car-kia-3-removebg-preview.png",
                name: "إطار ميشلان 195/65R15",
                price: 450,
                oldPrice: 520,
                category: "إطارات",
                stock: 15,
                rating: 4.8,
                reviews: 45,
                sold: 67,
                description: "إطار فرنسي أصلي - أعلى مستويات الأمان",
                isNew: true,
                isPopular: true
            },
            {
                id: 8,
                img: "../assets/images/car-kia-3-removebg-preview.png",
                name: "فلتر زيت محرك",
                price: 35,
                oldPrice: 45,
                category: "فلاتر",
                stock: 80,
                rating: 4.1,
                reviews: 189,
                sold: 345,
                description: "فلتر زيت عالي الجودة - مناسب لمعظم السيارات",
                isNew: false,
                isPopular: false
            },
            {
                id: 9,
                img: "../assets/images/car-kia-3-removebg-preview.png",
                name: "شمعة احتراق (بوجيه)",
                price: 25,
                oldPrice: 35,
                category: "محرك",
                stock: 200,
                rating: 4.0,
                reviews: 312,
                sold: 567,
                description: "بوجيه نحاسي - طقم 4 قطع - جودة أصلية",
                isNew: false,
                isPopular: false
            },
            {
                id: 10,
                img: "../assets/images/car-kia-3-removebg-preview.png",
                name: "سير المحرك (كاتينة)",
                price: 90,
                oldPrice: 120,
                category: "محرك",
                stock: 45,
                rating: 4.3,
                reviews: 67,
                sold: 123,
                description: "سير محرك أصلي - متين وعالي الجودة",
                isNew: true,
                isPopular: false
            },
            {
                id: 11,
                img: "../assets/images/car-kia-3-removebg-preview.png",
                name: "دينامو سيارة",
                price: 420,
                oldPrice: 500,
                category: "كهرباء",
                stock: 12,
                rating: 4.5,
                reviews: 34,
                sold: 56,
                description: "دينامو 120 أمبير - أصلي - ضمان 6 شهور",
                isNew: false,
                isPopular: true
            },
            {
                id: 12,
                img: "../assets/images/car-kia-3-removebg-preview.png",
                name: "مساعدات أمامية",
                price: 180,
                oldPrice: 220,
                category: "محرك",
                stock: 18,
                rating: 4.2,
                reviews: 45,
                sold: 78,
                description: "مساعدات غاز - أصلية - مريحة في القيادة",
                isNew: false,
                isPopular: false
            },
            {
                id: 13,
                img: "../assets/images/car-kia-3-removebg-preview.png",
                name: "راديتر تبريد",
                price: 550,
                oldPrice: 650,
                category: "محرك",
                stock: 8,
                rating: 4.6,
                reviews: 23,
                sold: 34,
                description: "راديتر تبريد نحاس - عالي الكفاءة",
                isNew: true,
                isPopular: true
            },
            {
                id: 14,
                img: "../assets/images/car-kia-3-removebg-preview.png",
                name: "طرمبة ماء",
                price: 220,
                oldPrice: 280,
                category: "محرك",
                stock: 22,
                rating: 4.3,
                reviews: 56,
                sold: 89,
                description: "طرمبة مياه أصلية - صناعة ألماني",
                isNew: false,
                isPopular: false
            },
            {
                id: 15,
                img: "../assets/images/car-kia-3-removebg-preview.png",
                name: "بواجي بلاتينيوم (طقم 4)",
                price: 150,
                oldPrice: 200,
                category: "محرك",
                stock: 35,
                rating: 4.7,
                reviews: 78,
                sold: 145,
                description: "بواجي بلاتينيوم - عمر أطول وأداء أفضل",
                isNew: true,
                isPopular: true
            },
            {
                id: 16,
                img: "../assets/images/car-kia-3-removebg-preview.png",
                name: "مسمار عجل (طقم 20)",
                price: 80,
                oldPrice: 100,
                category: "إكسسوارات",
                stock: 500,
                rating: 4.0,
                reviews: 456,
                sold: 789,
                description: "طقم مسامير عجل - مقاس قياسي - جودة عالية",
                isNew: false,
                isPopular: false
            }
        ];

        // Favorites from localStorage
        let favoriteProducts = JSON.parse(localStorage.getItem('favorites')) || [];

        // Pagination variables
        let currentPage = 1;
        const productsPerPage = 8;
        let filteredProducts = [...allProducts];

        // DOM Elements
        document.addEventListener('DOMContentLoaded', function() {
            updateCartCount();
            updateFavoriteCount();
            setupMobileMenu();
            loadProducts();
            setupFilters();
            setupEventListeners();
            updateYear();
            
            // Check URL for search params
            const urlParams = new URLSearchParams(window.location.search);
            const searchParam = urlParams.get('search');
            if (searchParam) {
                document.getElementById('searchInput').value = searchParam;
                filterProducts();
            }
        });

        // Load products with pagination
        function loadProducts() {
            const productsGrid = document.getElementById('productsGrid');
            const loadingSpinner = document.getElementById('loadingSpinner');
            
            loadingSpinner.classList.add('active');
            
            setTimeout(() => {
                const startIndex = (currentPage - 1) * productsPerPage;
                const endIndex = startIndex + productsPerPage;
                const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
                
                displayProducts(paginatedProducts);
                displayPagination(filteredProducts.length);
                
                loadingSpinner.classList.remove('active');
            }, 500); // Simulate loading
        }

        // Display products in grid
        function displayProducts(products) {
            const container = document.getElementById('productsGrid');
            
            if (products.length === 0) {
                container.innerHTML = `
                    <div class="no-products">
                        <i class="fas fa-box-open"></i>
                        <h3>لا توجد منتجات</h3>
                        <p>لم يتم العثور على منتجات تطابق معايير البحث</p>
                        <button class="btn btn-primary" onclick="resetFilters()">
                            <i class="fas fa-redo-alt"></i> عرض الكل
                        </button>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = products.map(product => {
                const isFavorite = favoriteProducts.some(p => p.id === product.id);
                const favoriteIcon = isFavorite ? 'fas' : 'far';
                
                // Determine stock status class
                let stockClass = 'in-stock';
                let stockText = `متوفر: ${product.stock} قطعة`;
                
                if (product.stock === 0) {
                    stockClass = 'out-of-stock';
                    stockText = 'غير متوفر';
                } else if (product.stock < 5) {
                    stockClass = 'low-stock';
                    stockText = `لم يتبق سوى ${product.stock} قطع`;
                }
                
                // Badges
                const badges = [];
                if (product.isPopular) badges.push('<div class="product-badge popular">الأكثر مبيعاً</div>');
                if (product.isNew) badges.push('<div class="product-badge new">جديد</div>');
                if (product.oldPrice) badges.push('<div class="product-badge sale">خصم</div>');
                
                // Rating stars
                const stars = generateStars(product.rating);
                
                return `
                    <div class="product-card" data-product-id="${product.id}">
                        ${badges.join('')}
                        <button class="product-wishlist ${isFavorite ? 'active' : ''}" 
                                onclick="toggleFavorite(${product.id})"
                                title="${isFavorite ? 'إزالة من المفضلة' : 'أضف للمفضلة'}">
                            <i class="${favoriteIcon} fa-heart"></i>
                        </button>
                        <div class="product-image">
                            <img src="${product.img}" alt="${product.name}" 
                                 onerror="this.src='https://via.placeholder.com/300x200/333333/ffffff?text=PRODUCT'">
                        </div>
                        <div class="product-content">
                            <span class="product-category">${product.category}</span>
                            <h3 class="product-title">${product.name}</h3>
                            <p class="product-description">${product.description}</p>
                            
                            <div class="product-pricing">
                                ${product.oldPrice ? `<span class="original-price">${product.oldPrice} جنيه</span>` : ''}
                                <span class="current-price">${product.price} جنيه</span>
                            </div>
                            
                            <div class="product-meta">
                                <div class="product-rating">
                                    ${stars}
                                    <span>(${product.reviews})</span>
                                </div>
                                <div class="product-stock ${stockClass}">
                                    <i class="fas ${product.stock > 0 ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                                    <span>${stockText}</span>
                                </div>
                            </div>
                            
                            <div class="product-actions">
                                <a href="product-details.html?id=${product.id}" class="btn btn-outline">
                                    <i class="fas fa-info-circle"></i> التفاصيل
                                </a>
                                <button class="btn btn-primary" onclick="addToCart(${product.id})" 
                                        ${product.stock === 0 ? 'disabled' : ''}>
                                    <i class="fas fa-cart-plus"></i> 
                                    ${product.stock === 0 ? 'غير متوفر' : 'أضف للسلة'}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Generate star rating HTML
        function generateStars(rating) {
            let stars = '';
            const fullStars = Math.floor(rating);
            const hasHalf = rating % 1 >= 0.5;
            
            for (let i = 1; i <= 5; i++) {
                if (i <= fullStars) {
                    stars += '<i class="fas fa-star"></i>';
                } else if (i === fullStars + 1 && hasHalf) {
                    stars += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    stars += '<i class="far fa-star"></i>';
                }
            }
            return stars;
        }

        // Display pagination
        function displayPagination(totalProducts) {
            const totalPages = Math.ceil(totalProducts / productsPerPage);
            const pagination = document.getElementById('pagination');
            
            if (totalPages <= 1) {
                pagination.innerHTML = '';
                return;
            }
            
            let paginationHTML = '';
            
            // Previous button
            paginationHTML += `
                <button class="pagination-btn" onclick="changePage(${currentPage - 1})" 
                        ${currentPage === 1 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-right"></i>
                </button>
            `;
            
            // Page numbers
            for (let i = 1; i <= totalPages; i++) {
                if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                    paginationHTML += `
                        <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                                onclick="changePage(${i})">
                            ${i}
                        </button>
                    `;
                } else if (i === currentPage - 2 || i === currentPage + 2) {
                    paginationHTML += `<span class="pagination-dots">...</span>`;
                }
            }
            
            // Next button
            paginationHTML += `
                <button class="pagination-btn" onclick="changePage(${currentPage + 1})" 
                        ${currentPage === totalPages ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left"></i>
                </button>
            `;
            
            pagination.innerHTML = paginationHTML;
        }

        // Change page
        function changePage(page) {
            currentPage = page;
            loadProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Setup filters
        function setupFilters() {
            document.getElementById('searchBtn').addEventListener('click', filterProducts);
            document.getElementById('searchInput').addEventListener('keyup', function(e) {
                if (e.key === 'Enter') filterProducts();
            });
            
            document.getElementById('categoryFilter').addEventListener('change', filterProducts);
            document.getElementById('priceFilter').addEventListener('change', filterProducts);
            document.getElementById('sortFilter').addEventListener('change', filterProducts);
        }

        // Filter products
        function filterProducts() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
            const category = document.getElementById('categoryFilter').value;
            const priceRange = document.getElementById('priceFilter').value;
            const sortBy = document.getElementById('sortFilter').value;
            
            filteredProducts = [...allProducts];
            
            // Search filter
            if (searchTerm) {
                filteredProducts = filteredProducts.filter(product => 
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                );
            }
            
            // Category filter
            if (category) {
                filteredProducts = filteredProducts.filter(product => product.category === category);
            }
            
            // Price filter
            if (priceRange) {
                if (priceRange === '1000+') {
                    filteredProducts = filteredProducts.filter(product => product.price > 1000);
                } else {
                    const [min, max] = priceRange.split('-').map(Number);
                    filteredProducts = filteredProducts.filter(product => 
                        product.price >= min && product.price <= max
                    );
                }
            }
            
            // Sort
            if (sortBy === 'price-low') {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (sortBy === 'price-high') {
                filteredProducts.sort((a, b) => b.price - a.price);
            } else if (sortBy === 'name') {
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortBy === 'rating') {
                filteredProducts.sort((a, b) => b.rating - a.rating);
            }
            
            // Reset to first page
            currentPage = 1;
            updateActiveFilters(searchTerm, category, priceRange);
            loadProducts();
        }

        // Update active filters display
        function updateActiveFilters(searchTerm, category, priceRange) {
            const container = document.getElementById('activeFilters');
            const filters = [];
            
            if (searchTerm) {
                filters.push(`
                    <div class="filter-tag">
                        <span>بحث: "${searchTerm}"</span>
                        <i class="fas fa-times" onclick="removeFilter('search')"></i>
                    </div>
                `);
            }
            
            if (category) {
                filters.push(`
                    <div class="filter-tag">
                        <span>التصنيف: ${category}</span>
                        <i class="fas fa-times" onclick="removeFilter('category')"></i>
                    </div>
                `);
            }
            
            if (priceRange) {
                let priceText = '';
                if (priceRange === '1000+') {
                    priceText = 'أكثر من 1000 جنيه';
                } else {
                    const [min, max] = priceRange.split('-');
                    priceText = `من ${min} إلى ${max} جنيه`;
                }
                filters.push(`
                    <div class="filter-tag">
                        <span>السعر: ${priceText}</span>
                        <i class="fas fa-times" onclick="removeFilter('price')"></i>
                    </div>
                `);
            }
            
            container.innerHTML = filters.join('');
        }

        // Remove specific filter
        function removeFilter(filterType) {
            if (filterType === 'search') {
                document.getElementById('searchInput').value = '';
            } else if (filterType === 'category') {
                document.getElementById('categoryFilter').value = '';
            } else if (filterType === 'price') {
                document.getElementById('priceFilter').value = '';
            }
            filterProducts();
        }

        // Reset all filters
        function resetFilters() {
            document.getElementById('searchInput').value = '';
            document.getElementById('categoryFilter').value = '';
            document.getElementById('priceFilter').value = '';
            document.getElementById('sortFilter').value = 'default';
            filterProducts();
        }

        // Toggle favorite
        function toggleFavorite(productId) {
            const product = allProducts.find(p => p.id === productId);
            if (!product) return;
            
            const existingIndex = favoriteProducts.findIndex(p => p.id === productId);
            
            if (existingIndex === -1) {
                favoriteProducts.push(product);
                localStorage.setItem('favorites', JSON.stringify(favoriteProducts));
                showNotification('تمت إضافة المنتج إلى المفضلة', 'success');
            } else {
                favoriteProducts.splice(existingIndex, 1);
                localStorage.setItem('favorites', JSON.stringify(favoriteProducts));
                showNotification('تمت إزالة المنتج من المفضلة', 'info');
            }
            
            updateFavoriteCount();
            
            // Update all product cards
            const productCards = document.querySelectorAll(`.product-card[data-product-id="${productId}"]`);
            productCards.forEach(card => {
                const favBtn = card.querySelector('.product-wishlist');
                const icon = favBtn.querySelector('i');
                
                if (existingIndex === -1) {
                    favBtn.classList.add('active');
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    favBtn.title = 'إزالة من المفضلة';
                } else {
                    favBtn.classList.remove('active');
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    favBtn.title = 'أضف للمفضلة';
                }
            });
        }

        // Add to cart
        function addToCart(productId, quantity = 1) {
            const product = allProducts.find(p => p.id === productId);
            if (!product || product.stock === 0) {
                showNotification('المنتج غير متوفر حالياً', 'error');
                return;
            }

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingItem = cart.find(item => item.id === productId && !item.isBundle);
            const currentQuantityInCart = existingItem ? existingItem.quantity : 0;

            if (currentQuantityInCart + quantity > product.stock) {
                showNotification(`الكمية المتاحة فقط ${product.stock} قطعة`, 'error');
                return;
            }

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.img,
                    quantity: quantity,
                    category: product.category,
                    isBundle: false
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showNotification(`تم إضافة ${product.name} إلى سلة التسوق`, 'success');
        }

        // Update cart count
        function updateCartCount() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.querySelectorAll('.cart-count').forEach(el => {
                el.textContent = cartCount;
            });
        }

        // Update favorite count
        function updateFavoriteCount() {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            document.querySelectorAll('.favorite-count').forEach(el => {
                el.textContent = favorites.length;
            });
        }

        // Update year in footer
        function updateYear() {
            document.querySelectorAll('.current-year').forEach(el => {
                el.textContent = new Date().getFullYear();
            });
        }

        // Setup mobile menu
        function setupMobileMenu() {
            const menuBtn = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');
            
            if (menuBtn && navLinks) {
                menuBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navLinks.classList.toggle('active');
                });
            }
            
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.navbar') && navLinks?.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        }

        // Setup event listeners
        function setupEventListeners() {
            // Filter toggle for mobile
            const filterToggle = document.getElementById('filterToggle');
            if (filterToggle) {
                filterToggle.addEventListener('click', () => {
                    // يمكن إضافة سايدبار فلاتر للموبايل هنا
                    showNotification('جاري تجهيز الفلاتر...', 'info');
                });
            }
        }

        // Show notification
        function showNotification(message, type = 'info') {
            const existingNotification = document.querySelector('.notification');
            if (existingNotification) existingNotification.remove();
            
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            
            let icon = 'fa-info-circle';
            let bgColor = '#333';
            let textColor = '#fff';
            
            if (type === 'success') {
                icon = 'fa-check-circle';
                bgColor = '#d4edda';
                textColor = '#155724';
            } else if (type === 'error') {
                icon = 'fa-exclamation-circle';
                bgColor = '#f8d7da';
                textColor = '#721c24';
            }
            
            notification.innerHTML = `
                <i class="fas ${icon}"></i>
                <span>${message}</span>
            `;
            
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                left: 20px;
                background-color: ${bgColor};
                color: ${textColor};
                padding: 15px 25px;
                border-radius: 8px;
                z-index: 10000;
                box-shadow: var(--shadow-hover);
                animation: slideIn 0.3s ease;
                font-family: inherit;
                font-size: 0.95rem;
                display: flex;
                align-items: center;
                gap: 10px;
                direction: rtl;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
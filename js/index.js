// Sample Products Data
const productsData = [
  {
    id: 1,
    name: "فلتر زيت محرك أصلي",
    category: "فلاتر",
    image: "./assets/images/car-ford-2-removebg-preview.png",
    description: "فلتر زيت عالي الجودة لجميع أنواع السيارات",
    originalPrice: 180,
    currentPrice: 120,
    rating: 4.8,
    reviews: 45,
    inStock: true,
    popular: true,
  },
  {
    id: 2,
    name: "بواجي شرارة بلاتينيوم",
    category: "كهرباء",
    image: "./assets/images/car-ford-2-removebg-preview.png",
    description: "طقم بواجي بلاتينيوم 4 قطع - أداء عالي",
    originalPrice: 400,
    currentPrice: 320,
    rating: 4.9,
    reviews: 32,
    inStock: true,
    popular: true,
  },
  {
    id: 3,
    name: "وسادات فرامل أمامية",
    category: "فرامل",
    image: "./assets/images/car-ford-2-removebg-preview.png",
    description: "طقم تيل فرامل أمامي أصلي - عالي الجودة",
    originalPrice: 650,
    currentPrice: 520,
    rating: 4.7,
    reviews: 28,
    inStock: true,
  },
  {
    id: 4,
    name: "بطارية سيارة 60 أمبير",
    category: "كهرباء",
    image: "./assets/images/car-ford-2-removebg-preview.png",
    description: "بطارية جافة 60 أمبير - عمر طويل",
    originalPrice: 950,
    currentPrice: 820,
    rating: 4.8,
    reviews: 56,
    inStock: true,
    popular: true,
  },
  {
    id: 5,
    name: "زيت محرك تخليقي 4 لتر",
    category: "زيوت",
    image: "./assets/images/car-ford-2-removebg-preview.png",
    description: "زيت محرك تخليقي بالكامل 10W-40",
    originalPrice: 450,
    currentPrice: 380,
    rating: 4.6,
    reviews: 67,
    inStock: true,
  },
  {
    id: 6,
    name: "ماسحات زجاج أمامية",
    category: "اكسسوارات",
    image: "./assets/images/car-ford-2-removebg-preview.png",
    description: "طقم مساحات زجاج أمامي - مقاس 22 و20 بوصة",
    originalPrice: 220,
    currentPrice: 150,
    rating: 4.5,
    reviews: 23,
    inStock: true,
  },
];

// New Products Data
const newProductsData = [
  {
    id: 7,
    name: "فلتر هواء عالي الأداء",
    category: "فلاتر",
    image: "./assets/images/car-ford-2-removebg-preview.png",
    description: "فلتر هواء رياضي - قابل للغسيل",
    originalPrice: 350,
    currentPrice: 280,
    rating: 4.7,
    reviews: 15,
    inStock: true,
    popular: true,
  },
  {
    id: 8,
    name: "طقم سيور محرك",
    category: "ميكانيكا",
    image: "./assets/images/car-ford-2-removebg-preview.png",
    description: "طقم سيور محرك كامل - جودة أصلية",
    originalPrice: 850,
    currentPrice: 690,
    rating: 4.8,
    reviews: 22,
    inStock: true,
  },
  {
    id: 9,
    name: "مضخة مياه",
    category: "تبريد",
    image: "./assets/images/car-ford-2-removebg-preview.png",
    description: "مضخة مياه أصلية - صناعة ألماني",
    originalPrice: 1200,
    currentPrice: 980,
    rating: 4.9,
    reviews: 18,
    inStock: true,
  },
  {
    id: 10,
    name: "طرمبة بنزين كهربائية",
    category: "وقود",
    image: "./assets/images/car-ford-2-removebg-preview.png",
    description: "طرمبة بنزين كهربائية - جودة عالية",
    originalPrice: 950,
    currentPrice: 790,
    rating: 4.6,
    reviews: 12,
    inStock: true,
  },
  {
    id: 11,
    name: "مفتاح دينامو",
    category: "كهرباء",
    image: "./assets/images/car-ford-2-removebg-preview.png",
    description: "مفتاح دينامو 120 أمبير - أصلي",
    originalPrice: 680,
    currentPrice: 550,
    rating: 4.5,
    reviews: 9,
    inStock: true,
  },
  {
    id: 12,
    name: "رمان بلي أمامي",
    category: "عجل",
    image: "./assets/images/car-ford-2-removebg-preview.png",
    description: "طقم رمان بلي أمامي - ياباني",
    originalPrice: 580,
    currentPrice: 460,
    rating: 4.7,
    reviews: 14,
    inStock: true,
  },
];

// Bundles Data (عروض)
const bundlesData = [
  {
    id: 1,
    name: "باقة الصيانة الشاملة",
    category: "maintenance",
    image: "./assets/images/cover.jpg",
    description: "كل ما تحتاجه لصيانة سيارتك في باقة واحدة",
    items: [
      { name: "فلتر زيت", qty: 1 },
      { name: "فلتر هواء", qty: 1 },
      { name: "زيت محرك 4 لتر", qty: 1 },
      { name: "بواجي شرارة", qty: 4 },
    ],
    originalPrice: 1250,
    bundlePrice: 899,
    savings: 351,
    savingsPercent: 28,
    rating: 4.8,
    reviews: 156,
    sold: 1234,
    stock: 25,
    popular: true,
  },
  {
    id: 2,
    name: "باقة نظام الفرامل",
    category: "bundle",
    image: "./assets/images/cover.jpg",
    description: "طقم فرامل متكامل أمامي وخلفي",
    items: [
      { name: "تيل فرامل أمامي", qty: 1 },
      { name: "تيل فرامل خلفي", qty: 1 },
      { name: "سائل فرامل", qty: 2 },
      { name: "سلندر فرامل", qty: 1 },
    ],
    originalPrice: 2850,
    bundlePrice: 1999,
    savings: 851,
    savingsPercent: 30,
    rating: 4.9,
    reviews: 98,
    sold: 567,
    stock: 15,
    popular: true,
  },
  {
    id: 3,
    name: "باقة الكهرباء والإضاءة",
    category: "electrical",
    image: "./assets/images/cover.jpg",
    description: "كل ما يخص النظام الكهربائي لسيارتك",
    items: [
      { name: "لمبات LED أمامية", qty: 2 },
      { name: "لمبات خلفية", qty: 2 },
      { name: "فيوزات متنوعة", qty: 20 },
      { name: "أسلاك توصيل", qty: 5 },
    ],
    originalPrice: 980,
    bundlePrice: 699,
    savings: 281,
    savingsPercent: 29,
    rating: 4.6,
    reviews: 67,
    sold: 345,
    stock: 8,
    popular: false,
  },
];

// Favorites array
let favoriteProducts = JSON.parse(localStorage.getItem("favorites")) || [];
let favoriteBundles = JSON.parse(localStorage.getItem("favoriteBundles")) || [];

// DOM Elements
document.addEventListener("DOMContentLoaded", function () {
  console.log("Home page loaded");
  updateCartCount();
  updateFavoriteCount();
  loadProducts(productsData, "productsGrid");
  loadProducts(newProductsData, "newProductsGrid");
  loadBundles(bundlesData, "bundlesGrid");
  updateYear();
  setupMobileMenu();
  setupEventListeners();
});

// Load products into grid
function loadProducts(products, gridId) {
  const productsGrid = document.getElementById(gridId);
  if (!productsGrid) return;

  if (products.length === 0) {
    productsGrid.innerHTML = `
                    <div class="no-products" style="text-align: center; padding: 60px; grid-column: 1/-1;">
                        <i class="fas fa-box-open" style="font-size: 4rem; color: var(--text-muted);"></i>
                        <h3>لا توجد منتجات متاحة</h3>
                    </div>
                `;
    return;
  }

  productsGrid.innerHTML = products
    .map((product) => {
      const isFavorite = favoriteProducts.some((p) => p.id === product.id);
      const favoriteIcon = isFavorite ? "fas" : "far";
      const stockStatus = product.inStock
        ? '<span class="product-stock in-stock"><i class="fas fa-check-circle"></i> متوفر</span>'
        : '<span class="product-stock"><i class="fas fa-times-circle"></i> غير متوفر</span>';
      const popular = product.popular
        ? '<div class="product-badge popular">الأكثر مبيعاً</div>'
        : "";

      return `
                    <div class="product-card" data-product-id="${product.id}">
                        ${popular}
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-content">
                            <span class="product-category">${product.category}</span>
                            <h3 class="product-title">${product.name}</h3>
                            <p class="product-description">${product.description}</p>
                            
                            <div class="product-pricing">
                                <span class="original-price">${product.originalPrice} جنيه</span>
                                <span class="current-price">${product.currentPrice} جنيه</span>
                            </div>
                            
                            <div class="product-meta">
                                <div class="product-rating">
                                    <i class="fas fa-star"></i>
                                    <span>${product.rating} (${product.reviews})</span>
                                </div>
                                ${stockStatus}
                            </div>
                            
                            <div class="product-actions">
                                <button class="btn btn-primary" onclick="addToCart(${product.id})">
                                    <i class="fas fa-cart-plus"></i> أضف للسلة
                                </button>
                                <button class="btn btn-outline btn-favorite ${isFavorite ? "active" : ""}" 
                                        onclick="toggleFavorite(${product.id})">
                                    <i class="${favoriteIcon} fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
    })
    .join("");
}

// Load bundles into grid
function loadBundles(bundles, gridId) {
  const bundlesGrid = document.getElementById(gridId);
  if (!bundlesGrid) return;

  if (bundles.length === 0) {
    bundlesGrid.innerHTML = `
                    <div class="no-bundles" style="text-align: center; padding: 60px; grid-column: 1/-1;">
                        <i class="fas fa-box-open" style="font-size: 4rem; color: var(--text-muted);"></i>
                        <h3>لا توجد عروض متاحة</h3>
                    </div>
                `;
    return;
  }

  bundlesGrid.innerHTML = bundles
    .map((bundle) => {
      const isFavorite = favoriteBundles.some((b) => b.id === bundle.id);
      const favoriteIcon = isFavorite ? "fas" : "far";
      const save = `<div class="bundle-badge save">وفر ${bundle.savingsPercent}%</div>`;

      // Generate items preview
      const itemsPreview = bundle.items
        .slice(0, 3)
        .map((item, index) => `<span title="${item.name}">${item.qty}</span>`)
        .join("");

      const moreItems =
        bundle.items.length > 3
          ? `<span class="more" title="${bundle.items.length - 3} قطع إضافية">+${bundle.items.length - 3}</span>`
          : "";

      // Generate full items list
      const itemsList = bundle.items
        .map(
          (item) => `
                    <li class="bundle-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${item.name}</span>
                        <span class="item-qty">${item.qty}</span>
                    </li>
                `,
        )
        .join("");

      return `
                    <div class="bundle-card" data-bundle-id="${bundle.id}">
                        ${save}
                        <div class="bundle-image">
                            <img src="${bundle.image}" alt="${bundle.name}">
                            <div class="bundle-items-preview">
                                ${itemsPreview}
                                ${moreItems}
                            </div>
                        </div>
                        <div class="bundle-content">
                            <span class="bundle-category">${getCategoryName(bundle.category)}</span>
                            <h3 class="bundle-title">${bundle.name}</h3>
                            <p class="bundle-description">${bundle.description}</p>
                            
                            <div class="bundle-items-list">
                                <h4><i class="fas fa-box"></i> محتويات الباقة</h4>
                                <ul class="bundle-items">
                                    ${itemsList}
                                </ul>
                            </div>
                            
                            <div class="bundle-pricing">
                                <span class="bundle-original-price">${bundle.originalPrice} جنيه</span>
                                <span class="bundle-current-price">${bundle.bundlePrice} جنيه</span>
                                <span class="bundle-savings">وفر ${bundle.savings} جنيه</span>
                            </div>
                            
                            <div class="product-actions">
                                <button class="btn btn-primary" onclick="addBundleToCart(${bundle.id})">
                                    <i class="fas fa-cart-plus"></i> أضف للسلة
                                </button>
                                <button class="btn btn-outline btn-favorite ${isFavorite ? "active" : ""}" 
                                        onclick="toggleBundleFavorite(${bundle.id})">
                                    <i class="${favoriteIcon} fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
    })
    .join("");
}

// Get category name in Arabic
function getCategoryName(category) {
  const categories = {
    bundle: "باقة ميكانيكا",
    electrical: "باقة كهرباء",
    maintenance: "باقة صيانة",
    season: "عرض موسمي",
  };
  return categories[category] || category;
}

// Toggle product favorite
function toggleFavorite(productId) {
  const product = [...productsData, ...newProductsData].find(
    (p) => p.id === productId,
  );
  if (!product) return;

  const existingIndex = favoriteProducts.findIndex((p) => p.id === productId);

  if (existingIndex === -1) {
    favoriteProducts.push(product);
    localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
    showNotification("تمت إضافة المنتج إلى المفضلة", "success");
  } else {
    favoriteProducts.splice(existingIndex, 1);
    localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
    showNotification("تمت إزالة المنتج من المفضلة", "info");
  }

  updateFavoriteCount();

  //  update both grids in case the product appears in both
  loadProducts(productsData, "productsGrid");
  loadProducts(newProductsData, "newProductsGrid");
}

// Toggle bundle favorite
function toggleBundleFavorite(bundleId) {
  const bundle = bundlesData.find((b) => b.id === bundleId);
  if (!bundle) return;

  const existingIndex = favoriteBundles.findIndex((b) => b.id === bundleId);

  if (existingIndex === -1) {
    favoriteBundles.push(bundle);
    localStorage.setItem("favoriteBundles", JSON.stringify(favoriteBundles));
    showNotification("تمت إضافة الباقة إلى المفضلة", "success");
  } else {
    favoriteBundles.splice(existingIndex, 1);
    localStorage.setItem("favoriteBundles", JSON.stringify(favoriteBundles));
    showNotification("تمت إزالة الباقة من المفضلة", "info");
  }

  updateFavoriteCount();
  loadBundles(bundlesData, "bundlesGrid");
}

// Add to cart
function addToCart(productId) {
  const product = [...productsData, ...newProductsData].find(
    (p) => p.id === productId,
  );
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(
    (item) => item.id === productId && !item.isBundle,
  );

  if (existingItem) {
    existingItem.quantity += 1;
    showNotification("تمت زيادة الكمية في السلة", "success");
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.currentPrice,
      quantity: 1,
      image: product.image,
      category: product.category,
      isBundle: false,
    });
    showNotification("تمت إضافة المنتج إلى السلة", "success");
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Add bundle to cart
function addBundleToCart(bundleId) {
  const bundle = bundlesData.find((b) => b.id === bundleId);
  if (!bundle) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingBundle = cart.find(
    (item) => item.id === bundleId && item.isBundle,
  );

  if (existingBundle) {
    existingBundle.quantity += 1;
    showNotification("تمت زيادة الكمية في السلة", "success");
  } else {
    cart.push({
      id: bundle.id,
      name: bundle.name,
      price: bundle.bundlePrice,
      quantity: 1,
      image: bundle.image,
      items: bundle.items,
      isBundle: true,
      savings: bundle.savings,
    });
    showNotification("تمت إضافة الباقة إلى السلة", "success");
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document
    .querySelectorAll(".cart-count")
    .forEach((el) => (el.textContent = cartCount));
}

// Update favorite count
function updateFavoriteCount() {
  const totalFavorites = favoriteProducts.length + favoriteBundles.length;
  document
    .querySelectorAll(".favorite-count")
    .forEach((el) => (el.textContent = totalFavorites));
}

// Update year
function updateYear() {
  document.querySelectorAll(".current-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

// Setup mobile menu
function setupMobileMenu() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinks.classList.toggle("active");
    });
  }

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".navbar") &&
      navLinks?.classList.contains("active")
    ) {
      navLinks.classList.remove("active");
    }
  });
}

// Setup event listeners
function setupEventListeners() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.active").forEach((modal) => {
        modal.classList.remove("active");
      });
    }
  });
}

// Show notification
function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) existingNotification.remove();

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  let icon = "fa-info-circle";
  if (type === "success") icon = "fa-check-circle";
  if (type === "error") icon = "fa-exclamation-circle";

  notification.innerHTML = `
                <i class="fas ${icon}"></i>
                <span>${message}</span>
            `;

  notification.style.cssText = `
                position: fixed;
                top: 20px;
                left: 20px;
                background-color: ${type === "success" ? "#d4edda" : type === "error" ? "#f8d7da" : "#333"};
                color: ${type === "success" ? "#155724" : type === "error" ? "#721c24" : "#fff"};
                padding: 15px 25px;
                border-radius: 4px;
                z-index: 10000;
                box-shadow: 0 2px 15px rgba(0,0,0,0.1);
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
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

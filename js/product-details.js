// Product Details JavaScript - نسخة محسنة

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentProductId = null;
let currentProduct = null;
let favoriteProducts = JSON.parse(localStorage.getItem("favorites")) || [];

// Product Data
const products = {
  1: {
    id: 1,
    name: "فلتر زيت محرك",
    price: 120,
    oldPrice: 150,
    image: "../assets/images/car-ford-2-removebg-preview.png",
    category: "فلاتر",
    description: "فلتر زيت عالي الجودة مناسب لمعظم السيارات",
    longDescription:
      "فلتر زيت أصلي يضمن تنظيف الزيت من الشوائب والحفاظ على المحرك. مصنوع من مواد عالية الجودة لعمر أطول وأداء أفضل.",
    inStock: true,
    stock: 45,
    rating: 4.5,
    reviews: 23,
    sku: "FL-001",
    brand: "MotorFix",
    specifications: [
      "نوع الفلتر: فلتر زيت",
      "المقاس: قياسي",
      "الجودة: درجة أولى",
      "الضمان: 6 شهور",
      "بلد المنشأ: مصر",
    ],
  },
  2: {
    id: 2,
    name: "زيت محرك كاسترول 10W-40",
    price: 75,
    oldPrice: 95,
    image: "../assets/images/car-ford-2-removebg-preview.png",
    category: "زيوت",
    description: "زيت محرك عالي الجودة 10W-40",
    longDescription:
      "زيت محرك متعدد الدرجات يوفر حماية ممتازة للمحرك في جميع الظروف الجوية. مناسب لمحركات البنزين والديزل.",
    inStock: true,
    stock: 30,
    rating: 4.7,
    reviews: 45,
    sku: "OIL-010",
    brand: "كاسترول",
    specifications: [
      "النوع: زيت محرك",
      "اللزوجة: 10W-40",
      "السعة: 4 لتر",
      "النوع: تخليقي",
      "المنشأ: بلجيكا",
    ],
  },
  3: {
    id: 3,
    name: "بطارية سيارة 60 أمبير",
    price: 320,
    oldPrice: 380,
    image: "../assets/images/car-ford-2-removebg-preview.png",
    category: "بطاريات",
    description: "بطارية سيارة 60 أمبير - جافة",
    longDescription:
      "بطارية جافة عالية الأداء، توفر طاقة قوية لجميع أنظمة السيارة. ضمان سنتين.",
    inStock: true,
    stock: 25,
    rating: 4.6,
    reviews: 67,
    sku: "BAT-060",
    brand: "AC Delco",
    specifications: [
      "السعة: 60 أمبير",
      "النوع: بطارية جافة",
      "الجهد: 12 فولت",
      "الضمان: سنتين",
      "بلد المنشأ: كوريا",
    ],
  },
  13: {
    id: 13,
    name: "زيت محرك كاسترول 10W-40",
    price: 75,
    oldPrice: 95,
    image: "../assets/images/car-ford-2-removebg-preview.png",
    category: "زيوت",
    description: "زيت محرك عالي الجودة 10W-40",
    longDescription:
      "زيت محرك متعدد الدرجات يوفر حماية ممتازة للمحرك في جميع الظروف الجوية. مناسب لمحركات البنزين والديزل.",
    inStock: true,
    stock: 30,
    rating: 4.7,
    reviews: 45,
    sku: "OIL-011",
    brand: "كاسترول",
  },
  14: {
    id: 14,
    name: "زيت ناقل حركة أوتوماتيك",
    price: 120,
    oldPrice: 150,
    image: "../assets/images/car-ford-2-removebg-preview.png",
    category: "زيوت",
    description: "زيت ناقل حركة أوتوماتيك عالي الجودة",
    longDescription:
      "زيت ناقل حركة أوتوماتيك مخصص لنقل الحركة في السيارات الحديثة، يوفر أداء سلس وحماية للتروس.",
    inStock: true,
    stock: 25,
    rating: 4.6,
    reviews: 18,
    sku: "ATF-003",
    brand: "MotorFix",
  },
  15: {
    id: 15,
    name: "فلتر زيت تويوتا أصلي",
    price: 35,
    oldPrice: 45,
    image: "../assets/images/car-ford-2-removebg-preview.png",
    category: "فلاتر",
    description: "فلتر زيت أصلي تويوتا",
    longDescription:
      "فلتر زيت أصلي من تويوتا، مصمم خصيصاً لمحركات تويوتا لضمان أقصى حماية وأداء.",
    inStock: true,
    stock: 60,
    rating: 4.8,
    reviews: 32,
    sku: "FL-002",
    brand: "تويوتا",
  },
  16: {
    id: 16,
    name: "زيت فرامل DOT 4",
    price: 45,
    oldPrice: 60,
    image: "../assets/images/car-ford-2-removebg-preview.png",
    category: "زيوت",
    description: "زيت فرامل عالي الجودة DOT 4",
    longDescription:
      "زيت فرامل عالي الأداء بنظام DOT 4، يوفر نقطة غليان عالية وأداء ثابت في جميع الظروف.",
    inStock: true,
    stock: 40,
    rating: 4.7,
    reviews: 27,
    sku: "BF-004",
    brand: "MotorFix",
  },
};

// DOM Elements
document.addEventListener("DOMContentLoaded", function () {
  console.log("Product details page loaded");

  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  currentProductId = parseInt(urlParams.get("id"));

  console.log("Product ID from URL:", currentProductId);

  updateCartCount();
  updateFavoriteCount();
  setupMobileMenu();
  loadProductDetails();
  loadRelatedProducts();
  updateYear();
});

// Load product details
function loadProductDetails() {
  const loadingSpinner = document.querySelector(".loading-spinner");
  const container = document.getElementById("productDetailsContainer");

  // Get current product or default to product 1
  currentProduct = products[currentProductId] || products[1];

  if (!currentProduct) {
    if (loadingSpinner) {
      loadingSpinner.innerHTML = `
                        <i class="fas fa-exclamation-circle"></i>
                        <p>عذراً، لم يتم العثور على المنتج</p>
                        <a href="products.html" class="btn">العودة للمنتجات</a>
                    `;
    }
    return;
  }

  // Hide loading spinner
  if (loadingSpinner) {
    loadingSpinner.style.display = "none";
  }

  // Update breadcrumb
  const breadcrumbCurrent = document.querySelector(".breadcrumb .active");
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = currentProduct.name;
  }

  // Build product HTML
  buildProductHTML(currentProduct);

  // Setup controls after HTML is built
  setTimeout(() => {
    setupQuantityControls();
    setupAddToCart();
    setupFavoriteButton();
  }, 100);
}

// Build product HTML dynamically
function buildProductHTML(product) {
  const container = document.getElementById("productDetailsContainer");
  if (!container) return;

  const isFavorite = favoriteProducts.some((p) => p.id === product.id);
  const favoriteIcon = isFavorite ? "fas" : "far";

  let stockStatus, stockClass;
  if (product.stock > 10) {
    stockStatus = "متوفر";
    stockClass = "in-stock";
  } else if (product.stock > 0) {
    stockStatus = `لم يتبق سوى ${product.stock} قطع`;
    stockClass = "in-stock";
  } else {
    stockStatus = "غير متوفر";
    stockClass = "out-of-stock";
  }

  const savings = product.oldPrice - product.price;
  const savingsPercent = Math.round((savings / product.oldPrice) * 100);

  const specsHTML = product.specifications
    ? product.specifications
        .map((spec) => `<li><i class="fas fa-check"></i> ${spec}</li>`)
        .join("")
    : '<li><i class="fas fa-check"></i> منتج أصلي 100%</li>';

  const html = `
                <div class="pack-details-container">
                    <div class="pack-header">
                        <h1>${product.name}</h1>
                        <div class="pack-badges">
                            <span class="badge badge-save">وفر ${savingsPercent}%</span>
                            ${product.rating >= 4.5 ? '<span class="badge badge-popular">الأكثر مبيعاً</span>' : ""}
                        </div>
                    </div>
                    
                    <div class="pack-content">
                        <div class="pack-summary">
                            <div class="pack-image">
                                <img src="${product.image}" alt="${product.name}" 
                                     onerror="this.src='https://via.placeholder.com/600x400/333333/ffffff?text=${encodeURIComponent(product.name)}'">
                            </div>
                            
                            <div class="pack-info">
                                <div class="pack-price-box">
                                    <span class="price-label">سعر المنتج:</span>
                                    <div class="price-details">
                                        <span class="old-price">${product.oldPrice} جنيه</span>
                                        <span class="new-price">${product.price} جنيه</span>
                                    </div>
                                    <div class="pack-savings">
                                        <i class="fas fa-tag"></i>
                                        <span>وفرت ${savings} جنيه (${savingsPercent}%)</span>
                                    </div>
                                </div>
                                
                                <div class="pack-actions">
                                    <div class="quantity-selector">
                                        <button class="quantity-btn decrease">-</button>
                                        <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}">
                                        <button class="quantity-btn increase">+</button>
                                    </div>
                                    <button class="btn btn-primary btn-add-cart" data-product-id="${product.id}">
                                        <i class="fas fa-cart-plus"></i> أضف للسلة
                                    </button>
                                    <button class="btn btn-favorite ${isFavorite ? "active" : ""}" id="favoriteBtn">
                                        <i class="${favoriteIcon} fa-heart"></i>
                                    </button>
                                </div>
                                
                                <div class="pack-meta">
                                    <div class="meta-item">
                                        <i class="fas fa-tag"></i>
                                        <span>العلامة: ${product.brand || "MotorFix"}</span>
                                    </div>
                                    <div class="meta-item">
                                        <i class="fas fa-barcode"></i>
                                        <span>الكود: ${product.sku || "غير محدد"}</span>
                                    </div>
                                    <div class="meta-item ${stockClass}">
                                        <i class="fas ${product.stock > 0 ? "fa-check-circle" : "fa-times-circle"}"></i>
                                        <span>${stockStatus}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Product Description -->
                        <div class="features-section">
                            <h3>وصف المنتج</h3>
                            <p>${product.longDescription || product.description}</p>
                            
                            <h3>المواصفات</h3>
                            <ul class="features-list">
                                ${specsHTML}
                            </ul>
                        </div>
                    </div>
                </div>
            `;

  container.innerHTML = html;
}

// Load related products
function loadRelatedProducts() {
  const relatedGrid = document.getElementById("relatedProducts");
  if (!relatedGrid) return;

  // Filter related products (same category, different ID)
  const related = Object.values(products)
    .filter(
      (p) =>
        p.category === currentProduct?.category && p.id !== currentProduct?.id,
    )
    .slice(0, 4);

  if (related.length === 0) {
    // Fallback if no related products
    relatedGrid.innerHTML =
      '<p style="text-align: center; grid-column: 1/-1; padding: 30px;">لا توجد منتجات مشابهة</p>';
    return;
  }

  relatedGrid.innerHTML = related
    .map((product) => {
      const savings = product.oldPrice ? product.oldPrice - product.price : 0;

      return `
                    <a href="product-details.html?id=${product.id}" class="related-pack-card">
                        <div class="related-pack-image">
                            <img src="${product.image}" alt="${product.name}" 
                                 onerror="this.src='https://via.placeholder.com/280x160/333333/ffffff?text=${encodeURIComponent(product.name)}'">
                        </div>
                        <div class="related-pack-content">
                            <h3>${product.name}</h3>
                            <div class="related-pack-price">
                                ${product.oldPrice ? `<span class="old-price">${product.oldPrice} جنيه</span>` : ""}
                                <span class="new-price">${product.price} جنيه</span>
                            </div>
                            <span class="btn btn-outline">عرض التفاصيل</span>
                        </div>
                    </a>
                `;
    })
    .join("");
}

// Setup quantity controls
function setupQuantityControls() {
  const quantityInput = document.querySelector(".quantity-input");
  const decreaseBtn = document.querySelector(".quantity-btn.decrease");
  const increaseBtn = document.querySelector(".quantity-btn.increase");

  if (!quantityInput || !decreaseBtn || !increaseBtn) return;

  decreaseBtn.addEventListener("click", function () {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  increaseBtn.addEventListener("click", function () {
    const currentValue = parseInt(quantityInput.value);
    const maxValue = parseInt(quantityInput.max) || currentProduct?.stock || 99;
    if (currentValue < maxValue) {
      quantityInput.value = currentValue + 1;
    }
  });

  quantityInput.addEventListener("change", function () {
    let value = parseInt(this.value);
    const min = parseInt(this.min) || 1;
    const max = parseInt(this.max) || currentProduct?.stock || 99;

    if (isNaN(value) || value < min) {
      this.value = min;
    } else if (value > max) {
      this.value = max;
    }
  });
}

// Setup add to cart
function setupAddToCart() {
  const addToCartBtn = document.querySelector(".btn-add-cart");

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function () {
      const quantityInput = document.querySelector(".quantity-input");
      const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

      addToCart(currentProduct, quantity);
    });
  }
}

// Add to cart function
function addToCart(product, quantity = 1) {
  if (!product) return;

  if (product.stock < quantity) {
    showNotification("الكمية المطلوبة غير متوفرة", "error");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(
    (item) => item.id === product.id && !item.isBundle,
  );

  if (existingItem) {
    if (existingItem.quantity + quantity > product.stock) {
      showNotification("الكمية المطلوبة غير متوفرة", "error");
      return;
    }
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      category: product.category,
      isBundle: false,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showNotification("تمت إضافة المنتج إلى السلة", "success");
}

// Setup favorite button
function setupFavoriteButton() {
  const favoriteBtn = document.getElementById("favoriteBtn");

  if (favoriteBtn) {
    favoriteBtn.addEventListener("click", function () {
      toggleFavorite(currentProduct);
    });
  }
}

// Toggle favorite
function toggleFavorite(product) {
  if (!product) return;

  const existingIndex = favoriteProducts.findIndex((p) => p.id === product.id);
  const favoriteBtn = document.getElementById("favoriteBtn");
  const icon = favoriteBtn.querySelector("i");

  if (existingIndex === -1) {
    // Add to favorites
    const favoriteItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
      category: product.category,
      inStock: product.inStock,
      rating: product.rating,
      reviews: product.reviews,
    };

    favoriteProducts.push(favoriteItem);
    localStorage.setItem("favorites", JSON.stringify(favoriteProducts));

    // Update button
    favoriteBtn.classList.add("active");
    icon.classList.remove("far");
    icon.classList.add("fas");

    showNotification("تمت إضافة المنتج إلى المفضلة", "success");
  } else {
    // Remove from favorites
    favoriteProducts.splice(existingIndex, 1);
    localStorage.setItem("favorites", JSON.stringify(favoriteProducts));

    // Update button
    favoriteBtn.classList.remove("active");
    icon.classList.remove("fas");
    icon.classList.add("far");

    showNotification("تمت إزالة المنتج من المفضلة", "info");
  }

  updateFavoriteCount();
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = cartCount;
  });
}

// Update favorite count
function updateFavoriteCount() {
  const favoriteCount = favoriteProducts.length;
  document.querySelectorAll(".favorite-count").forEach((el) => {
    el.textContent = favoriteCount;
  });
}

// Update year in footer
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

// Show notification
function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) existingNotification.remove();

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  let icon = "fa-info-circle";
  let bgColor = "#333";
  let textColor = "#fff";

  if (type === "success") {
    icon = "fa-check-circle";
    bgColor = "#d4edda";
    textColor = "#155724";
  } else if (type === "error") {
    icon = "fa-exclamation-circle";
    bgColor = "#f8d7da";
    textColor = "#721c24";
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
                box-shadow: 0 5px 20px rgba(0,0,0,0.15);
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

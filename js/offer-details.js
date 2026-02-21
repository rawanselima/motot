// Get bundle ID from URL
const urlParams = new URLSearchParams(window.location.search);
const bundleId = parseInt(urlParams.get("id"));

// Sample bundles data (should match offers.js)
const bundlesData = [
  {
    id: 1,
    name: "باقة الصيانة الشاملة",
    category: "maintenance",
    type: "bundle",
    image: "../assets/images/offers.png",
    description: "كل ما تحتاجه لصيانة سيارتك في باقة واحدة",
    longDescription:
      "باقة متكاملة تحتوي على جميع مستلزمات الصيانة الدورية لسيارتك. تم اختيار القطع بعناية لتناسب معظم السيارات.",
    items: [
      { name: "فلتر زيت", qty: 1, icon: "fa-oil-can" },
      { name: "فلتر هواء", qty: 1, icon: "fa-wind" },
      { name: "زيت محرك 4 لتر", qty: 1, icon: "fa-oil-can" },
      { name: "بواجي شرارة", qty: 4, icon: "fa-bolt" },
      { name: "فلتر جاز", qty: 1, icon: "fa-gas-pump" },
      { name: "سائل تبريد", qty: 1, icon: "fa-snowflake" },
    ],
    originalPrice: 1650,
    bundlePrice: 1199,
    savings: 451,
    savingsPercent: 27,
    rating: 4.8,
    reviews: 156,
    sold: 1234,
    stock: 25,
    popular: true,
    limited: false,
  },
  {
    id: 2,
    name: "باقة نظام الفرامل الكامل",
    category: "bundle",
    type: "bundle",
    image: "../assets/images/offers.png",
    description: "طقم فرامل متكامل أمامي وخلفي",
    longDescription:
      "باقة متكاملة لصيانة نظام الفرامل بالكامل. تحتوي على أفضل قطع الغيار الأصلية لضمان أقصى درجات الأمان.",
    items: [
      { name: "فوط فرامل أمامية", qty: 1, icon: "fa-car" },
      { name: "فوط فرامل خلفية", qty: 1, icon: "fa-car" },
      { name: "أقراص فرامل أمامية", qty: 2, icon: "fa-circle" },
      { name: "أقراص فرامل خلفية", qty: 2, icon: "fa-circle" },
      { name: "سائل فرامل", qty: 1, icon: "fa-tint" },
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
    limited: false,
  },
  {
    id: 3,
    name: "باقة الكهرباء والإضاءة",
    category: "electrical",
    type: "bundle",
    image: "../assets/images/car-ford-2-removebg-preview.png",
    description: "كل ما يخص النظام الكهربائي لسيارتك",
    longDescription:
      "باقة متكاملة لتحديث وصيانة النظام الكهربائي والإضاءة لسيارتك. جميع القطع عالية الجودة.",
    items: [
      { name: "لمبات LED أمامية", qty: 2, icon: "fa-lightbulb" },
      { name: "لمبات خلفية", qty: 2, icon: "fa-lightbulb" },
      { name: "فيوزات متنوعة", qty: 20, icon: "fa-bolt" },
      { name: "أسلاك توصيل", qty: 5, icon: "fa-link" },
      { name: "مفتاح إضاءة", qty: 1, icon: "fa-toggle-on" },
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
    limited: true,
  },
];

// Favorites array
let favoriteBundles = JSON.parse(localStorage.getItem("favoriteBundles")) || [];
let currentBundle = null;
let currentQuantity = 1;

// DOM Elements
document.addEventListener("DOMContentLoaded", function () {
  console.log("Bundle details page loaded for ID:", bundleId);
  updateCartCount();
  updateFavoriteCount();
  loadBundleDetails();
  setupEventListeners();
  updateYear();
  setupMobileMenu();
});

// Load bundle details
function loadBundleDetails() {
  const loadingState = document.getElementById("loadingState");
  const bundleContent = document.getElementById("bundleContent");

  // Find bundle
  currentBundle = bundlesData.find((b) => b.id === bundleId);

  if (!currentBundle) {
    // Bundle not found
    loadingState.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <p>عذراً، لم يتم العثور على الباقة</p>
            <a href="offers.html" class="btn btn-primary">العودة للباقات</a>
        `;
    return;
  }

  // Hide loading, show content
  loadingState.style.display = "none";
  bundleContent.style.display = "block";

  // Populate data
  populateBundleDetails();
  loadRelatedBundles();
}

// Populate bundle details
function populateBundleDetails() {
  // Basic info
  document.getElementById("bundleName").textContent = currentBundle.name;
  document.getElementById("bundleTitle").textContent = currentBundle.name;
  document.getElementById("bundleCategory").textContent = getCategoryName(
    currentBundle.category,
  );
  document.getElementById("bundleDescription").textContent =
    currentBundle.longDescription || currentBundle.description;

  // Images
  document.getElementById("mainImage").src = currentBundle.image;
  document.getElementById("mainImage").alt = currentBundle.name;

  // Stats
  document.getElementById("itemsCount").textContent =
    `${currentBundle.items.length} قطعة`;
  document.getElementById("rating").textContent =
    `${currentBundle.rating} (${currentBundle.reviews})`;
  document.getElementById("soldCount").textContent = `${currentBundle.sold}+`;

  // Pricing
  document.getElementById("originalPrice").textContent =
    `${currentBundle.originalPrice} جنيه`;
  document.getElementById("bundlePrice").textContent =
    `${currentBundle.bundlePrice} جنيه`;
  document.getElementById("savingsAmount").textContent =
    `${currentBundle.savings} جنيه (${currentBundle.savingsPercent}%)`;
  document.getElementById("saveBadge").textContent =
    `وفر ${currentBundle.savingsPercent}%`;

  // Badges
  if (currentBundle.popular) {
    document.getElementById("popularBadge").style.display = "block";
  }
  if (currentBundle.limited) {
    document.getElementById("limitedBadge").style.display = "block";
  }

  // Stock status
  const stockStatus = document.getElementById("stockStatus");
  if (currentBundle.stock > 10) {
    stockStatus.className = "stock-status in-stock";
    stockStatus.innerHTML =
      '<i class="fas fa-check-circle"></i> متوفر في المخزون';
  } else if (currentBundle.stock > 0) {
    stockStatus.className = "stock-status low-stock";
    stockStatus.innerHTML = `<i class="fas fa-exclamation-triangle"></i> لم يتبق سوى ${currentBundle.stock} باقة فقط!`;
  } else {
    stockStatus.className = "stock-status out-of-stock";
    stockStatus.innerHTML = '<i class="fas fa-times-circle"></i> نفذت الكمية';
  }

  // Items grid
  const itemsGrid = document.getElementById("itemsGrid");
  itemsGrid.innerHTML = currentBundle.items
    .map(
      (item) => `
        <div class="item-card">
            <div class="item-icon">
                <i class="fas ${item.icon || "fa-box"}"></i>
            </div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-qty">
                    <i class="fas fa-hashtag"></i>
                    الكمية: ${item.qty}
                </div>
            </div>
        </div>
    `,
    )
    .join("");

  // Favorite button state
  const isFavorite = favoriteBundles.some((b) => b.id === currentBundle.id);
  const favoriteBtn = document.getElementById("favoriteBtn");
  const icon = favoriteBtn.querySelector("i");

  if (isFavorite) {
    favoriteBtn.classList.add("active");
    icon.classList.remove("far");
    icon.classList.add("fas");
    icon.style.color = "#e74c3c";
  }
}

// Load related bundles
function loadRelatedBundles() {
  const relatedGrid = document.getElementById("relatedGrid");

  // Get related bundles (same category, exclude current)
  const related = bundlesData
    .filter(
      (b) => b.id !== currentBundle.id && b.category === currentBundle.category,
    )
    .slice(0, 4);

  if (related.length === 0) {
    relatedGrid.parentElement.style.display = "none";
    return;
  }

  relatedGrid.innerHTML = related
    .map(
      (bundle) => `
        <a href="offers-details.html?id=${bundle.id}" class="related-card">
            <div class="related-image">
                <img src="${bundle.image}" alt="${bundle.name}" 
                     onerror="this.src='https://via.placeholder.com/280x160/333333/ffffff?text=BUNDLE'">
                <div class="related-badge">خصم ${bundle.savingsPercent}%</div>
            </div>
            <div class="related-content">
                <h4>${bundle.name}</h4>
                <div class="related-price">
                    <span class="related-old-price">${bundle.originalPrice} جنيه</span>
                    <span class="related-new-price">${bundle.bundlePrice} جنيه</span>
                </div>
                <button class="related-btn" onclick="event.preventDefault(); addRelatedToCart(${bundle.id})">
                    <i class="fas fa-cart-plus"></i> أضف للسلة
                </button>
            </div>
        </a>
    `,
    )
    .join("");
}

// Quantity functions
function increaseQuantity() {
  const input = document.getElementById("quantity");
  const newValue = parseInt(input.value) + 1;
  if (newValue <= (currentBundle?.stock || 99)) {
    input.value = newValue;
    currentQuantity = newValue;
  }
}

function decreaseQuantity() {
  const input = document.getElementById("quantity");
  const newValue = parseInt(input.value) - 1;
  if (newValue >= 1) {
    input.value = newValue;
    currentQuantity = newValue;
  }
}

// Add to cart
function addToCart() {
  if (!currentBundle) return;

  if (currentBundle.stock < currentQuantity) {
    showNotification("الكمية المطلوبة غير متوفرة", "error");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(
    (item) => item.id === currentBundle.id && item.type === "bundle",
  );

  if (existingItem) {
    existingItem.quantity += currentQuantity;
  } else {
    cart.push({
      id: currentBundle.id,
      name: currentBundle.name,
      price: currentBundle.bundlePrice,
      quantity: currentQuantity,
      image: currentBundle.image,
      type: "bundle",
      items: currentBundle.items,
      itemsCount: currentBundle.items.length,
      savings: currentBundle.savings,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showNotification("تمت إضافة الباقة إلى السلة", "success");
}

// Add related bundle to cart
function addRelatedToCart(bundleId) {
  const bundle = bundlesData.find((b) => b.id === bundleId);
  if (!bundle) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(
    (item) => item.id === bundle.id && item.type === "bundle",
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: bundle.id,
      name: bundle.name,
      price: bundle.bundlePrice,
      quantity: 1,
      image: bundle.image,
      type: "bundle",
      items: bundle.items,
      itemsCount: bundle.items.length,
      savings: bundle.savings,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showNotification("تمت إضافة الباقة إلى السلة", "success");
}

// Toggle favorite
function toggleFavorite() {
  if (!currentBundle) return;

  const favoriteBtn = document.getElementById("favoriteBtn");
  const icon = favoriteBtn.querySelector("i");

  const existingIndex = favoriteBundles.findIndex(
    (b) => b.id === currentBundle.id,
  );

  if (existingIndex === -1) {
    // Add to favorites
    const favoriteItem = {
      id: currentBundle.id,
      name: currentBundle.name,
      price: currentBundle.bundlePrice,
      image: currentBundle.image,
      category: currentBundle.category,
      categoryName: getCategoryName(currentBundle.category),
      items: currentBundle.items,
      itemsCount: currentBundle.items.length,
      rating: currentBundle.rating,
      reviews: currentBundle.reviews,
      type: "bundle",
    };

    favoriteBundles.push(favoriteItem);
    localStorage.setItem("favoriteBundles", JSON.stringify(favoriteBundles));

    // Update button
    favoriteBtn.classList.add("active");
    icon.classList.remove("far");
    icon.classList.add("fas");
    icon.style.color = "#e74c3c";

    showNotification("تمت إضافة الباقة إلى المفضلة", "success");
  } else {
    // Remove from favorites
    favoriteBundles.splice(existingIndex, 1);
    localStorage.setItem("favoriteBundles", JSON.stringify(favoriteBundles));

    // Update button
    favoriteBtn.classList.remove("active");
    icon.classList.remove("fas");
    icon.classList.add("far");
    icon.style.color = "";

    showNotification("تمت إزالة الباقة من المفضلة", "info");
  }

  updateFavoriteCount();
}

// Helper functions
function getCategoryName(category) {
  const categories = {
    bundle: "باقة ميكانيكا",
    electrical: "باقة كهرباء",
    maintenance: "باقة صيانة",
    season: "عرض موسمي",
  };
  return categories[category] || category;
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElements = document.querySelectorAll(".cart-count");
  cartCountElements.forEach((element) => {
    element.textContent = cartCount;
  });
}

function updateFavoriteCount() {
  const favoriteCount = favoriteBundles.length;
  const favoriteCountElements = document.querySelectorAll(".favorite-count");
  favoriteCountElements.forEach((element) => {
    element.textContent = favoriteCount;
  });
}

function updateYear() {
  const yearElements = document.querySelectorAll(".current-year");
  const currentYear = new Date().getFullYear();
  yearElements.forEach((el) => {
    el.textContent = currentYear;
  });
}

function setupEventListeners() {
  // Handle image error
  const mainImage = document.getElementById("mainImage");
  mainImage.onerror = function () {
    this.src = "https://via.placeholder.com/600x600/333333/ffffff?text=BUNDLE";
  };
}

function setupMobileMenu() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".navbar") &&
      navLinks &&
      navLinks.classList.contains("active")
    ) {
      navLinks.classList.remove("active");
    }
  });
}

function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

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

// Add styles
if (!document.querySelector("#details-styles")) {
  const style = document.createElement("style");
  style.id = "details-styles";
  style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(-100%);
            }
        }
        
        .btn-primary.active,
        .btn-outline.active {
            background-color: #e74c3c;
            border-color: #e74c3c;
            color: #fff;
        }
        
        .btn-primary.active i,
        .btn-outline.active i {
            color: #fff;
        }
    `;
  document.head.appendChild(style);
} // دالة لإضافة منتج للمفضلة
function addToFavorites(product) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // التحقق من عدم وجود المنتج مسبقاً
  const exists = favorites.some((item) => item.id === product.id);

  if (!exists) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    showNotification("تمت إضافة المنتج إلى المفضلة", "success");
  } else {
    showNotification("المنتج موجود بالفعل في المفضلة", "info");
  }

  updateFavoriteCount();
}

//  example product to test favorites functionality
const sampleProduct = {
  id: 1,
  name: "فلتر زيت محرك",
  price: 120,
  oldPrice: 150,
  image: "../assets/images/car-ford-2-removebg-preview.png",
  categoryName: "فلاتر",
  inStock: true,
  rating: 4.5,
  reviews: 23,
};

//  example of adding a product to favorites (you can call this function on button click)
localStorage.setItem("favorites", JSON.stringify([sampleProduct]));

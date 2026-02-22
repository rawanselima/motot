// Bundles data
const bundlesData = [
  {
    id: 1,
    name: "باقة الصيانة الشاملة",
    category: "maintenance",
    type: "bundle",
    image: "../assets/images/cover.jpg",
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
    limited: false,
  },
  {
    id: 2,
    name: "باقة نظام الفرامل الكامل",
    category: "bundle",
    type: "bundle",
    image: "../assets/images/cover.jpg",
    description: "طقم فرامل متكامل أمامي وخلفي",
    items: [
      { name: "لمبات LED أمامية", qty: 2 },
      { name: "لمبات خلفية", qty: 2 },
      { name: "فيوزات متنوعة", qty: 20 },
      { name: "أسلاك توصيل", qty: 5 },
      { name: "مفتاح إضاءة", qty: 1 },
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
    image: "../assets/images/cover.jpg",
    description: "كل ما يخص النظام الكهربائي لسيارتك",
    items: [
      { name: "لمبات LED أمامية", qty: 2 },
      { name: "لمبات خلفية", qty: 2 },
      { name: "فيوزات متنوعة", qty: 20 },
      { name: "أسلاك توصيل", qty: 5 },
      { name: "مفتاح إضاءة", qty: 1 },
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
  {
    id: 4,
    name: "باقة العناية بالمحرك",
    category: "maintenance",
    type: "season",
    image: "../assets/images/cover.jpg",
    description: "عروض موسمية على قطع المحرك",
    items: [
      { name: "طقم سيور", qty: 1 },
      { name: "طقم تيل صمامات", qty: 1 },
      { name: "جوانات محرك", qty: 1 },
      { name: "زيت محرك عالي الجودة", qty: 2 },
    ],
    originalPrice: 1650,
    bundlePrice: 1199,
    savings: 451,
    savingsPercent: 27,
    rating: 4.7,
    reviews: 43,
    sold: 234,
    stock: 12,
    popular: true,
    limited: false,
  },
  {
    id: 5,
    name: "باقة التبريد والتكييف",
    category: "maintenance",
    type: "bundle",
    image: "../assets/images/cover.jpg",
    description: "صيانة كاملة لنظام التبريد",
    items: [
      { name: "راديتر", qty: 1 },
      { name: "مروحة تبريد", qty: 1 },
      { name: "ثرموستات", qty: 1 },
      { name: "سائل تبريد", qty: 2 },
      { name: "خراطيم مياه", qty: 1 },
    ],
    originalPrice: 2250,
    bundlePrice: 1699,
    savings: 551,
    savingsPercent: 24,
    rating: 4.5,
    reviews: 32,
    sold: 167,
    stock: 6,
    popular: false,
    limited: true,
  },
  {
    id: 6,
    name: "باقة الدورة الشاملة",
    category: "season",
    type: "season",
    image: "../assets/images/cover.jpg",
    description: "عرض خاص للدورة الشاملة بمناسبة الربيع",
    items: [
      { name: "زيت محرك", qty: 1 },
      { name: "فلتر زيت", qty: 1 },
      { name: "فلتر هواء", qty: 1 },
      { name: "فلتر جاز", qty: 1 },
      { name: "ملمع كروم", qty: 1 },
    ],
    originalPrice: 880,
    bundlePrice: 599,
    savings: 281,
    savingsPercent: 32,
    rating: 4.8,
    reviews: 89,
    sold: 432,
    stock: 20,
    popular: true,
    limited: false,
  },
  {
    id: 7,
    name: "باقة العادم والشكمان",
    category: "maintenance",
    type: "bundle",
    image: "../assets/images/cover.jpg",
    description: "طقم عادم كامل مع الشكمان",
    items: [
      { name: "شكمان أمامي", qty: 1 },
      { name: "شكمان خلفي", qty: 1 },
      { name: "كاتم صوت", qty: 1 },
      { name: "مسامير وجوانات", qty: 10 },
    ],
    originalPrice: 1850,
    bundlePrice: 1399,
    savings: 451,
    savingsPercent: 24,
    rating: 4.6,
    reviews: 28,
    sold: 123,
    stock: 9,
    popular: false,
    limited: true,
  },
  {
    id: 8,
    name: "باقة التعليق والمساعدين",
    category: "bundle",
    type: "bundle",
    image: "../assets/images/cover.jpg",
    description: "طقم مساعدين أمامي وخلفي",
    items: [
      { name: "مساعدين أمامي", qty: 2 },
      { name: "مساعدين خلفي", qty: 2 },
      { name: "يايات", qty: 4 },
      { name: "بطانات", qty: 4 },
    ],
    originalPrice: 3200,
    bundlePrice: 2499,
    savings: 701,
    savingsPercent: 22,
    rating: 4.7,
    reviews: 45,
    sold: 189,
    stock: 7,
    popular: false,
    limited: true,
  },
  {
    id: 9,
    name: "باقة الصيف المميزة",
    category: "season",
    type: "season",
    image: "../assets/images/cover.jpg",
    description: "عرض الصيف على أنظمة التبريد",
    items: [
      { name: "غاز تكييف", qty: 2 },
      { name: "فلتر تكييف", qty: 1 },
      { name: "مروحة تبريد", qty: 1 },
      { name: "ثرموستات", qty: 1 },
    ],
    originalPrice: 1450,
    bundlePrice: 999,
    savings: 451,
    savingsPercent: 31,
    rating: 4.9,
    reviews: 67,
    sold: 321,
    stock: 15,
    popular: true,
    limited: false,
  },
  {
    id: 10,
    name: "باقة الشتاء الدافئ",
    category: "season",
    type: "season",
    image: "../assets/images/cover.jpg",
    description: "عرض الشتاء للتدفئة والعزل",
    items: [
      { name: "سخان داخلي", qty: 1 },
      { name: "مروحة سخان", qty: 1 },
      { name: "ثرموستات", qty: 1 },
      { name: "خراطيم مياه", qty: 2 },
    ],
    originalPrice: 950,
    bundlePrice: 699,
    savings: 251,
    savingsPercent: 26,
    rating: 4.5,
    reviews: 34,
    sold: 156,
    stock: 12,
    popular: false,
    limited: false,
  },
];

// Pagination configuration
const ITEMS_PER_PAGE = 6;
let currentPage = 1;
let filteredBundles = [...bundlesData];
let totalPages = Math.ceil(filteredBundles.length / ITEMS_PER_PAGE);

// Favorites array
let favoriteProducts = JSON.parse(localStorage.getItem("favorites")) || [];
let favoriteBundles = JSON.parse(localStorage.getItem("favoriteBundles")) || [];

// DOM Elements
document.addEventListener("DOMContentLoaded", function () {
  console.log("Offers page loaded");
  updateCartCount();
  updateFavoriteCount();
  updateYear();
  setupMobileMenu();

  // Initial load with pagination
  filterBundles("all", "default");
  setupFilters();
  setupEventListeners();
});

// Load bundles with pagination
function loadBundlesWithPagination(bundles, page) {
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pageBundles = bundles.slice(startIndex, endIndex);

  loadBundles(pageBundles);
  updatePaginationControls(bundles.length);
}

// Load bundles into grid
function loadBundles(bundles) {
  const bundlesGrid = document.getElementById("bundlesGrid");
  if (!bundlesGrid) return;

  if (bundles.length === 0) {
    bundlesGrid.innerHTML = `
                    <div class="no-bundles">
                        <i class="fas fa-box-open"></i>
                        <h3>لا توجد باقات متاحة</h3>
                        <p>لا توجد باقات تطابق معايير البحث حالياً</p>
                        <button class="btn btn-primary" onclick="resetFilters()">
                            <i class="fas fa-redo-alt"></i> عرض الكل
                        </button>
                    </div>
                `;
    return;
  }

  bundlesGrid.innerHTML = bundles
    .map((bundle) => {
      const isFavorite = favoriteBundles.some((b) => b.id === bundle.id);
      const favoriteIcon = isFavorite ? "fas" : "far";
      const limitedStock = bundle.stock < 10;
      const popular = bundle.popular
        ? '<div class="bundle-badge popular">الأكثر مبيعاً</div>'
        : "";
      const limited = bundle.limited
        ? '<div class="bundle-badge limited">كمية محدودة</div>'
        : "";
      const save = `<div class="bundle-badge save">وفر ${bundle.savingsPercent}%</div>`;

      // Generate items preview
      const itemsPreview = bundle.items
        .slice(0, 3)
        .map(
          (item, index) =>
            `<span data-tooltip="${item.name}">${item.qty}</span>`,
        )
        .join("");

      const moreItems =
        bundle.items.length > 3
          ? `<span class="more" data-tooltip="${bundle.items.length - 3} قطع إضافية">+${bundle.items.length - 3}</span>`
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

      // Check if items are all available
      const stockStatus = limitedStock
        ? `
                    <div class="limited-stock">
                        <i class="fas fa-exclamation-circle"></i>
                        <span>لم يتبق سوى ${bundle.stock} باقة فقط!</span>
                    </div>
                `
        : "";

      return `
                <div class="bundle-card" data-bundle-id="${bundle.id}">
                    ${popular}
                    ${limited}
                    ${save}
                    <div class="bundle-image">
                        <img src="${bundle.image}" alt="${bundle.name}" 
                             onerror="this.src='https://via.placeholder.com/350x200/333333/ffffff?text=BUNDLE'">
                        <div class="bundle-image-overlay"></div>
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
                            <h4>
                                <i class="fas fa-box"></i>
                                محتويات الباقة (${bundle.items.length} قطعة)
                            </h4>
                            <ul class="bundle-items">
                                ${itemsList}
                            </ul>
                        </div>
                        
                        <div class="bundle-pricing">
                            <span class="bundle-original-price">${bundle.originalPrice} جنيه</span>
                            <span class="bundle-current-price">${bundle.bundlePrice} جنيه</span>
                            <span class="bundle-savings">وفر ${bundle.savings} جنيه</span>
                        </div>
                        
                        <div class="bundle-meta">
                            <div class="bundle-rating">
                                <i class="fas fa-star"></i>
                                <span>${bundle.rating} (${bundle.reviews})</span>
                            </div>
                            <div class="bundle-sold">
                                <i class="fas fa-users"></i>
                                <span>${bundle.sold}+ تم الشراء</span>
                            </div>
                        </div>
                        
                        ${stockStatus}
                        
                        <div class="bundle-actions">
                            <button class="btn btn-primary" onclick="addBundleToCart(${bundle.id})">
                                <i class="fas fa-cart-plus"></i> أضف للسلة
                            </button>
                            <button class="btn btn-outline" onclick="viewBundleDetails(${bundle.id})">
                                <i class="fas fa-info-circle"></i> التفاصيل
                            </button>
                            <button class="btn btn-outline btn-favorite ${isFavorite ? "active" : ""}" 
                                    onclick="toggleBundleFavorite(${bundle.id})" 
                                    data-tooltip="${isFavorite ? "إزالة من المفضلة" : "أضف للمفضلة"}">
                                <i class="${favoriteIcon} fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
    })
    .join("");
}

// Update pagination controls
function updatePaginationControls(totalItems) {
  const paginationContainer = document.getElementById("paginationContainer");

  totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  if (totalPages <= 1) {
    paginationContainer.style.display = "none";
    return;
  }

  paginationContainer.style.display = "flex";

  // Calculate start and end items
  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  let paginationHTML = "";

  // Previous button
  paginationHTML += `
                <button class="pagination-btn" onclick="prevPage()" ${currentPage === 1 ? "disabled" : ""}>
                    <i class="fas fa-chevron-right"></i> 
                </button>
            `;

  // Page numbers
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // First page
  if (startPage > 1) {
    paginationHTML += `<button class="pagination-btn" onclick="goToPage(1)">1</button>`;
    if (startPage > 2) {
      paginationHTML += `<span class="pagination-dots">...</span>`;
    }
  }

  // Page numbers
  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `<button class="pagination-btn ${i === currentPage ? "active" : ""}" onclick="goToPage(${i})">${i}</button>`;
  }

  // Last page
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationHTML += `<span class="pagination-dots">...</span>`;
    }
    paginationHTML += `<button class="pagination-btn" onclick="goToPage(${totalPages})">${totalPages}</button>`;
  }

  // Next button
  paginationHTML += `
                <button class="pagination-btn" onclick="nextPage()" ${currentPage === totalPages ? "disabled" : ""}>
                     <i class="fas fa-chevron-left"></i>
                </button>
            `;

  paginationContainer.innerHTML = paginationHTML;
}

// Go to specific page
function goToPage(page) {
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  loadBundlesWithPagination(filteredBundles, currentPage);
}

// Previous page
function prevPage() {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
}

// Next page
function nextPage() {
  if (currentPage < totalPages) {
    goToPage(currentPage + 1);
  }
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

// Setup filters
function setupFilters() {
  const filterTabs = document.querySelectorAll(".filter-tab");
  const sortSelect = document.getElementById("sortBundles");

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      filterTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const filter = this.dataset.filter;
      currentPage = 1; // Reset to first page
      filterBundles(filter, sortSelect.value);
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      const activeFilter =
        document.querySelector(".filter-tab.active").dataset.filter;
      currentPage = 1; // Reset to first page
      filterBundles(activeFilter, this.value);
    });
  }
}

// Filter bundles
function filterBundles(filter, sortBy) {
  let filtered = [...bundlesData];

  if (filter !== "all") {
    filtered = filtered.filter(
      (bundle) => bundle.category === filter || bundle.type === filter,
    );
  }

  switch (sortBy) {
    case "saving-high":
      filtered.sort((a, b) => b.savingsPercent - a.savingsPercent);
      break;
    case "price-low":
      filtered.sort((a, b) => a.bundlePrice - b.bundlePrice);
      break;
    case "price-high":
      filtered.sort((a, b) => b.bundlePrice - a.bundlePrice);
      break;
    case "popular":
      filtered.sort((a, b) => b.sold - a.sold);
      break;
    default:
      filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
  }

  filteredBundles = filtered;
  loadBundlesWithPagination(filteredBundles, currentPage);
}

// Reset filters
function resetFilters() {
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.classList.remove("active");
    if (tab.dataset.filter === "all") {
      tab.classList.add("active");
    }
  });

  const sortSelect = document.getElementById("sortBundles");
  if (sortSelect) sortSelect.value = "default";

  currentPage = 1;
  filterBundles("all", "default");
}

// Toggle bundle favorite
function toggleBundleFavorite(bundleId) {
  const bundle = bundlesData.find((b) => b.id === bundleId);
  if (!bundle) return;

  const existingIndex = favoriteBundles.findIndex((b) => b.id === bundleId);

  if (existingIndex === -1) {
    // Add to favorites
    const favoriteItem = {
      id: bundle.id,
      name: bundle.name,
      price: bundle.bundlePrice,
      image: bundle.image,
      category: bundle.category,
      categoryName: getCategoryName(bundle.category),
      items: bundle.items,
      itemsCount: bundle.items.length,
      rating: bundle.rating,
      reviews: bundle.reviews,
      type: "bundle",
    };

    favoriteBundles.push(favoriteItem);
    localStorage.setItem("favoriteBundles", JSON.stringify(favoriteBundles));

    // Update button
    updateFavoriteButton(bundleId, true);
    showNotification("تمت إضافة الباقة إلى المفضلة", "success");
  } else {
    // Remove from favorites
    favoriteBundles.splice(existingIndex, 1);
    localStorage.setItem("favoriteBundles", JSON.stringify(favoriteBundles));

    // Update button
    updateFavoriteButton(bundleId, false);
    showNotification("تمت إزالة الباقة من المفضلة", "info");
  }

  updateFavoriteCount();
}

// Update favorite button state
function updateFavoriteButton(bundleId, isFavorite) {
  const bundleCard = document.querySelector(
    `.bundle-card[data-bundle-id="${bundleId}"]`,
  );
  if (!bundleCard) return;

  const favBtn = bundleCard.querySelector(".btn-favorite");
  const icon = favBtn.querySelector("i");

  if (isFavorite) {
    favBtn.classList.add("active");
    icon.classList.remove("far");
    icon.classList.add("fas");
    favBtn.dataset.tooltip = "إزالة من المفضلة";
  } else {
    favBtn.classList.remove("active");
    icon.classList.remove("fas");
    icon.classList.add("far");
    favBtn.dataset.tooltip = "أضف للمفضلة";
  }
}

// Add bundle to cart
function addBundleToCart(bundleId) {
  const bundle = bundlesData.find((b) => b.id === bundleId);
  if (!bundle) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if bundle already in cart
  const existingBundle = cart.find(
    (item) => item.id === bundleId && item.type === "bundle",
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
      type: "bundle",
      items: bundle.items,
      itemsCount: bundle.items.length,
      savings: bundle.savings,
    });
    showNotification("تمت إضافة الباقة إلى السلة", "success");
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// View bundle details
function viewBundleDetails(bundleId) {
  window.location.href = `offer-details.html?id=${bundleId}`;
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElements = document.querySelectorAll(".cart-count");
  cartCountElements.forEach((element) => {
    element.textContent = cartCount;
  });
}

// Update favorite count
function updateFavoriteCount() {
  const products = JSON.parse(localStorage.getItem("favorites")) || [];
  const bundles = JSON.parse(localStorage.getItem("favoriteBundles")) || [];
  const totalFavorites = products.length + bundles.length;
  const favoriteCountElements = document.querySelectorAll(".favorite-count");
  favoriteCountElements.forEach((element) => {
    element.textContent = totalFavorites;
  });
}

// Update year
function updateYear() {
  const yearElements = document.querySelectorAll(".current-year");
  const currentYear = new Date().getFullYear();
  yearElements.forEach((el) => {
    el.textContent = currentYear;
  });
}

// Setup event listeners
function setupEventListeners() {
  // Close modals when clicking outside
  window.addEventListener("click", function (e) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  });

  // Handle escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const modals = document.querySelectorAll(".modal.active");
      modals.forEach((modal) => modal.classList.remove("active"));
    }
  });
}

// Setup mobile menu
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

// Show notification
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
if (!document.querySelector("#offers-styles")) {
  const style = document.createElement("style");
  style.id = "offers-styles";
  style.textContent = `
                .no-bundles {
                    text-align: center;
                    padding: 80px 20px;
                    background: var(--bg-primary);
                    border-radius: 12px;
                    grid-column: 1 / -1;
                }
                
                .no-bundles i {
                    font-size: 4rem;
                    color: var(--text-muted);
                    margin-bottom: 20px;
                }
                
                .no-bundles h3 {
                    font-size: 1.8rem;
                    color: var(--primary-color);
                    margin-bottom: 10px;
                }
                
                .no-bundles p {
                    color: var(--text-muted);
                    margin-bottom: 25px;
                }
                
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
            `;
  document.head.appendChild(style);
}

// Favorites array
let favoriteProducts = JSON.parse(localStorage.getItem("favorites")) || [];

// DOM Elements
document.addEventListener("DOMContentLoaded", function () {
  console.log("Favorites page loaded");
  console.log("Favorites in localStorage:", favoriteProducts);
  updateCartCount();
  updateFavoriteCount();
  loadFavorites();
  setupEventListeners();
  updateYear();
  setupMobileMenu();
});

// Load favorites
function loadFavorites() {
  const favGrid = document.getElementById("favoritesGrid"); // تغيير من favGrid إلى favoritesGrid
  const favEmpty = document.getElementById("emptyFavorites"); // تغيير من favEmpty إلى emptyFavorites
  const recentlyViewed = document.getElementById("recentlyViewed");
  const favCountSpan = document.getElementById("favCount"); // هذا الـ ID غير موجود في HTML

  if (!favGrid) {
    console.error("favoritesGrid not found");
    return;
  }

  // Update header count if element exists
  const favoritesHeader = document.querySelector(
    ".favorites-header .favorites-title span",
  );
  if (favoritesHeader) {
    favoritesHeader.textContent = favoriteProducts.length;
  }

  // Show/hide action buttons based on favorites count
  const clearBtn = document.getElementById("clearFavoritesBtn");
  const addAllBtn = document.getElementById("addAllToCartBtn");

  if (favoriteProducts.length === 0) {
    // Show empty state
    favGrid.innerHTML = "";
    if (favEmpty) favEmpty.style.display = "block";
    if (recentlyViewed) recentlyViewed.style.display = "none";
    if (clearBtn) clearBtn.style.display = "none";
    if (addAllBtn) addAllBtn.style.display = "none";
    return;
  } else {
    // Hide empty state, show actions
    if (favEmpty) favEmpty.style.display = "none";
    if (recentlyViewed) recentlyViewed.style.display = "block";
    if (clearBtn) clearBtn.style.display = "inline-flex";
    if (addAllBtn) addAllBtn.style.display = "inline-flex";
  }

  // Load favorites grid
  favGrid.innerHTML = favoriteProducts
    .map(
      (product) => `
        <div class="fav-card" data-product-id="${product.id}">
            <div class="fav-card-badge">${product.categoryName || "قطع غيار"}</div>
            <div class="fav-card-image">
                <img src="${product.image}" alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/300x200/333333/ffffff?text=${encodeURIComponent(product.name)}'">
                <div class="fav-card-actions">
                    <button class="fav-action-btn remove" onclick="removeFromFavorites(${product.id})" data-tooltip="إزالة">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                    <button class="fav-action-btn cart" onclick="addToCart(${product.id})" data-tooltip="أضف للسلة">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    <button class="fav-action-btn" onclick="viewProduct(${product.id})" data-tooltip="عرض التفاصيل">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="fav-card-content">
                <div class="fav-card-category">${product.categoryName || "عام"}</div>
                <h3 class="fav-card-title">${product.name}</h3>
                <div class="fav-card-price">
                    <span class="current-price">${product.price} جنيه</span>
                    ${product.oldPrice ? `<span class="old-price">${product.oldPrice} جنيه</span>` : ""}
                </div>
                <div class="fav-card-meta">
                    <div class="${product.inStock !== false ? "in-stock" : "out-of-stock"}">
                        <i class="fas ${product.inStock !== false ? "fa-check-circle" : "fa-times-circle"}"></i>
                        <span>${product.inStock !== false ? "متوفر" : "غير متوفر"}</span>
                    </div>
                    ${
                      product.rating
                        ? `
                    <div class="fav-card-rating">
                        <i class="fas fa-star"></i>
                        <span>${product.rating} (${product.reviews || 0})</span>
                    </div>
                    `
                        : ""
                    }
                </div>
            </div>
        </div>
    `,
    )
    .join("");

  // Load recently viewed products
  loadRecentlyViewed();
}

// Load recently viewed products
function loadRecentlyViewed() {
  const recentlyGrid = document.getElementById("recentlyViewedGrid");
  if (!recentlyGrid) return;

  // Sample recently viewed products
  const recentlyViewed = [
    {
      id: 201,
      name: "فلتر زيت محرك",
      price: 85,
      image: "../assets/images/car-ford-2-removebg-preview.png",
    },
    {
      id: 202,
      name: "بواجي شرارة",
      price: 120,
      image: "../assets/images/car-ford-2-removebg-preview.png",
    },
    {
      id: 203,
      name: "ماسحات زجاج",
      price: 95,
      image: "../assets/images/car-ford-2-removebg-preview.png",
    },
    {
      id: 204,
      name: "لمبات LED",
      price: 150,
      image: "../assets/images/car-ford-2-removebg-preview.png",
    },
  ];

  recentlyGrid.innerHTML = recentlyViewed
    .map(
      (product) => `
        <div class="recommended-card">
            <div class="recommended-image">
                <img src="${product.image}" alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/250x150/333333/ffffff?text=${encodeURIComponent(product.name)}'">
            </div>
            <div class="recommended-content">
                <h4>${product.name}</h4>
                <div class="recommended-price">${product.price} جنيه</div>
                <button class="recommended-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> أضف للسلة
                </button>
            </div>
        </div>
    `,
    )
    .join("");
}

// Remove from favorites
function removeFromFavorites(productId) {
  const index = favoriteProducts.findIndex((p) => p.id === productId);

  if (index !== -1) {
    favoriteProducts.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favoriteProducts));

    // Update UI
    const productCard = document.querySelector(
      `.fav-card[data-product-id="${productId}"]`,
    );
    if (productCard) {
      productCard.style.animation = "slideOut 0.3s ease";
      setTimeout(() => {
        loadFavorites();
        showNotification("تمت إزالة المنتج من المفضلة", "info");
      }, 300);
    } else {
      loadFavorites();
    }

    // Update favorite count in header
    updateFavoriteCount();
  }
}

// Clear all favorites
function clearFavorites() {
  if (favoriteProducts.length === 0) {
    showNotification("المفضلة فارغة بالفعل", "info");
    return;
  }

  if (confirm("هل أنت متأكد من تفريغ المفضلة؟")) {
    favoriteProducts = [];
    localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
    loadFavorites();
    updateFavoriteCount();
    showNotification("تم تفريغ المفضلة", "success");
  }
}

// Add all favorites to cart
function addAllToCart() {
  if (favoriteProducts.length === 0) {
    showNotification("المفضلة فارغة", "error");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  favoriteProducts.forEach((product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
    }
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showNotification("تمت إضافة جميع المنتجات إلى السلة", "success");
}

// Add to cart function
function addToCart(productId) {
  // Find product in favorites or sample data
  let product = favoriteProducts.find((p) => p.id === productId);

  // If not found in favorites, try sample data
  if (!product) {
    const sampleProducts = [
      {
        id: 101,
        name: "فلتر زيت",
        price: 120,
        image: "../assets/images/car-ford-2-removebg-preview.png",
      },
      {
        id: 102,
        name: "بواجي شرارة",
        price: 180,
        image: "../assets/images/car-ford-2-removebg-preview.png",
      },
      {
        id: 103,
        name: "ماسحات زجاج",
        price: 220,
        image: "../assets/images/car-ford-2-removebg-preview.png",
      },
      {
        id: 104,
        name: "لمبات LED",
        price: 350,
        image: "../assets/images/car-ford-2-removebg-preview.png",
      },
      {
        id: 201,
        name: "فلتر زيت محرك",
        price: 85,
        image: "../assets/images/car-ford-2-removebg-preview.png",
      },
      {
        id: 202,
        name: "بواجي شرارة",
        price: 120,
        image: "../assets/images/car-ford-2-removebg-preview.png",
      },
      {
        id: 203,
        name: "ماسحات زجاج",
        price: 95,
        image: "../assets/images/car-ford-2-removebg-preview.png",
      },
      {
        id: 204,
        name: "لمبات LED",
        price: 150,
        image: "../assets/images/car-ford-2-removebg-preview.png",
      },
    ];
    product = sampleProducts.find((p) => p.id === productId);
  }

  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showNotification("تمت إضافة المنتج إلى السلة", "success");
}

// View product details
function viewProduct(productId) {
  window.location.href = `product-details.html?id=${productId}`;
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
  const favoriteCount = favoriteProducts.length;
  const favoriteCountElements = document.querySelectorAll(".favorite-count");
  favoriteCountElements.forEach((element) => {
    element.textContent = favoriteCount;
  });
}

// Update current year
function updateYear() {
  const yearElements = document.querySelectorAll(".current-year");
  const currentYear = new Date().getFullYear();
  yearElements.forEach((el) => {
    el.textContent = currentYear;
  });
}

// Setup event listeners
function setupEventListeners() {
  // Clear favorites button
  const clearBtn = document.getElementById("clearFavoritesBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearFavorites);
  }

  // Add all to cart button
  const addAllBtn = document.getElementById("addAllToCartBtn");
  if (addAllBtn) {
    addAllBtn.addEventListener("click", addAllToCart);
  }
}

// Show notification
function showNotification(message, type = "info") {
  // Remove existing notification
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

// Add styles if not exists
if (!document.querySelector("#fav-styles")) {
  const style = document.createElement("style");
  style.id = "fav-styles";
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
        
        .notification {
            direction: rtl;
        }
        
        .favorites-header .favorites-title span {
            color: var(--danger-color);
            margin: 0 5px;
        }
    `;
  document.head.appendChild(style);
}

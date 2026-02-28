// Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log("Initial cart:", cart);

// DOM Elements
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  updateFavoriteCount();
  loadCartItems();
  setupMobileMenu();

  // Event delegation for cart controls
  document.addEventListener("click", function (e) {
    // Quantity decrease
    if (
      e.target.classList.contains("decrease-btn") ||
      e.target.closest(".decrease-btn")
    ) {
      const itemId = parseInt(
        e.target.dataset.itemId ||
          e.target.closest(".decrease-btn").dataset.itemId,
      );
      updateQuantity(itemId, -1);
    }

    // Quantity increase
    if (
      e.target.classList.contains("increase-btn") ||
      e.target.closest(".increase-btn")
    ) {
      const itemId = parseInt(
        e.target.dataset.itemId ||
          e.target.closest(".increase-btn").dataset.itemId,
      );
      updateQuantity(itemId, 1);
    }

    // Remove item
    if (
      e.target.classList.contains("remove-item") ||
      e.target.closest(".remove-item")
    ) {
      const itemId = parseInt(
        e.target.dataset.itemId ||
          e.target.closest(".remove-item").dataset.itemId,
      );
      removeItem(itemId);
    }

    // Quantity input change
    if (e.target.classList.contains("quantity-input")) {
      const itemId = parseInt(e.target.dataset.itemId);
      const newQuantity = parseInt(e.target.value);
      if (newQuantity > 0 && newQuantity <= 100) {
        setQuantity(itemId, newQuantity);
      } else {
        loadCartItems(); // Reload to show correct quantity
      }
    }
  });
});

// Load cart items
function loadCartItems() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartSummary = document.getElementById("cartSummary");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (cart.length === 0) {
    cartEmpty.style.display = "block";
    cartSummary.style.display = "none";
    checkoutBtn.style.display = "none";
    return;
  }

  cartEmpty.style.display = "none";
  cartSummary.style.display = "block";
  checkoutBtn.style.display = "block";

  cartItemsContainer.innerHTML = cart

    .map(
      (item) => `
        <div class="cart-item" data-item-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image.startsWith("../") ? item.image : `../${item.image}`}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h3 class="cart-item-name">${item.name}</h3>
                <span class="cart-item-price">${item.price} جنيه</span>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease-btn" data-item-id="${item.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" 
                               min="1" max="100" data-item-id="${item.id}">
                        <button class="quantity-btn increase-btn" data-item-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-item-id="${item.id}">
                        <i class="fas fa-trash"></i> حذف
                    </button>
                </div>
            </div>
            <div class="cart-item-total">
                ${item.price * item.quantity} جنيه
            </div>
        </div>
    `,
    )
    .join("");

  updateCartSummary();
}

// Update quantity
function updateQuantity(itemId, change) {
  const item = cart.find((item) => item.id === itemId);
  if (!item) return;

  const newQuantity = item.quantity + change;
  if (newQuantity < 1) {
    removeItem(itemId);
    return;
  }

  if (newQuantity > 100) {
    showNotification("الكمية القصوى المسموحة هي 100 قطعة");
    return;
  }

  item.quantity = newQuantity;
  updateCart();
  loadCartItems();
}

// Set specific quantity
function setQuantity(itemId, quantity) {
  const item = cart.find((item) => item.id === itemId);
  if (!item) return;

  if (quantity < 1 || quantity > 100) {
    showNotification("الكمية يجب أن تكون بين 1 و 100 قطعة");
    loadCartItems(); // Reset to current quantity
    return;
  }

  item.quantity = quantity;
  updateCart();
  loadCartItems();
}

// Remove item from cart
function removeItem(itemId) {
  if (confirm("هل أنت متأكد من حذف هذا المنتج من السلة؟")) {
    cart = cart.filter((item) => item.id !== itemId);
    updateCart();
    loadCartItems();
    showNotification("تم حذف المنتج من سلة التسوق");
  }
}

// Update cart summary
function updateCartSummary() {
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = itemsCount > 0 ? 25 : 0;
  const total = subtotal + shipping;

  document.getElementById("itemsCount").textContent = itemsCount;
  document.getElementById("subtotal").textContent = `${subtotal} جنيه`;
  document.getElementById("shipping").textContent =
    itemsCount > 0 ? "25 جنيه" : "0 جنيه";
  document.getElementById("total").textContent = `${total} جنيه`;

  // Disable checkout if cart is empty
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (itemsCount === 0) {
    checkoutBtn.style.opacity = "0.5";
    checkoutBtn.style.cursor = "not-allowed";
    checkoutBtn.onclick = (e) => {
      e.preventDefault();
      showNotification("سلة التسوق فارغة");
    };
  } else {
    checkoutBtn.style.opacity = "1";
    checkoutBtn.style.cursor = "pointer";
    checkoutBtn.onclick = null;
  }
}

// Update cart
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateFavoriteCount(); // Call updateFavoriteCount here as well
}

// Update cart count in header
function updateCartCount() {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElements = document.querySelectorAll(".cart-count");
  cartCountElements.forEach((element) => {
    element.textContent = cartCount;
  });
}

// Update favorite count
function updateFavoriteCount() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoriteCountElements = document.querySelectorAll(".favorite-count");
  favoriteCountElements.forEach((element) => {
    element.textContent = favorites.length;
  });
}

// Show notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
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
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Mobile menu toggle
function setupMobileMenu() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar") && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
  });
}

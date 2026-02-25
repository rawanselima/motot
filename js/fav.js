
        let favoriteProducts =
          JSON.parse(localStorage.getItem("favorites")) || [];

        const favGrid = document.getElementById("favoritesGrid");
        const emptyFav = document.getElementById("emptyFavorites");
        const clearBtn = document.getElementById("clearFavoritesBtn");
        const addAllBtn = document.getElementById("addAllToCartBtn");
        const favCountHeader = document.getElementById("favCountHeader");

        function updateAllCounts() {
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          const cartTotal = cart.reduce((acc, i) => acc + (i.quantity || 1), 0);
          document
            .querySelectorAll(".cart-count")
            .forEach((el) => (el.textContent = cartTotal));
          
          const products = JSON.parse(localStorage.getItem("favorites")) || [];
          const bundles = JSON.parse(localStorage.getItem("favoriteBundles")) || [];
          const totalFav = products.length + bundles.length;
          
          document
            .querySelectorAll(".favorite-count")
            .forEach((el) => (el.textContent = totalFav));
          if (favCountHeader) favCountHeader.textContent = totalFav;
        }

        function showNotification(msg, type = "info") {
          const n = document.querySelector(".notification");
          if (n) n.remove();
          const notif = document.createElement("div");
          notif.className = `notification ${type}`;
          notif.innerHTML = `<i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"}"></i><span>${msg}</span>`;
          document.body.appendChild(notif);
          setTimeout(() => {
            notif.style.animation = "slideOut 0.3s";
            setTimeout(() => notif.remove(), 300);
          }, 3000);
        }

        // Sample data if empty (for attractive preview)
        if (favoriteProducts.length === 0) {
          favoriteProducts = [
            {
              id: 101,
              name: "فلتر زيت محرك",
              price: 120,
              oldPrice: 150,
              image:
                "https://via.placeholder.com/300x200/000000/ffffff?text=فلتر+زيت",
              categoryName: "فلتر",
              inStock: true,
              rating: 4.5,
              reviews: 23,
            },
            {
              id: 102,
              name: "بواجي شرارة (4 حبات)",
              price: 180,
              image:
                "https://via.placeholder.com/300x200/333333/ffffff?text=بواجي",
              categoryName: "كهرباء",
              inStock: true,
              rating: 4.8,
              reviews: 45,
            },
            {
              id: 103,
              name: "ماسحات زجاج أمامي",
              price: 220,
              oldPrice: 270,
              image:
                "https://via.placeholder.com/300x200/111111/ffffff?text=ماسحات",
              categoryName: "اكسسوارات",
              inStock: false,
              rating: 4.2,
              reviews: 12,
            },
            {
              id: 104,
              name: "لمبات LED أمامية",
              price: 350,
              image:
                "https://via.placeholder.com/300x200/222222/ffffff?text=LED",
              categoryName: "إضاءة",
              inStock: true,
              rating: 5.0,
              reviews: 8,
            },
          ];
          localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
        }

        function loadFavorites() {
          const products = JSON.parse(localStorage.getItem("favorites")) || [];
          const bundles = JSON.parse(localStorage.getItem("favoriteBundles")) || [];
          favoriteProducts = [...products, ...bundles];
          
          if (favCountHeader)
            favCountHeader.textContent = favoriteProducts.length;
          updateAllCounts();

          if (favoriteProducts.length === 0) {
            if (favGrid) favGrid.innerHTML = "";
            if (emptyFav) emptyFav.style.display = "block";
            if (clearBtn) clearBtn.style.display = "none";
            if (addAllBtn) addAllBtn.style.display = "none";
            return;
          } else {
            if (emptyFav) emptyFav.style.display = "none";
            if (clearBtn) clearBtn.style.display = "inline-flex";
            if (addAllBtn) addAllBtn.style.display = "inline-flex";
          }

          favGrid.innerHTML = favoriteProducts
            .map((p) => {
              const price = p.price || p.currentPrice || p.bundlePrice || 0;
              const image = p.image || p.img || "";
              const category = p.categoryName || p.category || "قطع غيار";
              return `
                    <div class="fav-card" data-product-id="${p.id}">
                        <div class="fav-card-badge">${category}</div>
                        <div class="fav-card-image">
                            <img src="${image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/300x200/cccccc/000000?text=MotorFix'">
                            <div class="fav-card-actions">
                                <button class="fav-action-btn remove" onclick="removeFav(${p.id})" data-tooltip="إزالة"><i class="fas fa-trash-alt"></i></button>
                                <button class="fav-action-btn cart" onclick="addFavToCart(${p.id})" data-tooltip="أضف للسلة"><i class="fas fa-shopping-cart"></i></button>
                                <button class="fav-action-btn" onclick="viewProd(${p.id})" data-tooltip="عرض التفاصيل"><i class="fas fa-eye"></i></button>
                            </div>
                        </div>
                        <div class="fav-card-content">
                            <div class="fav-card-category">${category}</div>
                            <h3 class="fav-card-title">${p.name}</h3>
                            <div class="fav-card-price">
                                <span class="current-price">${price} جنيه</span>
                                ${p.oldPrice || p.originalPrice ? `<span class="old-price">${p.oldPrice || p.originalPrice} جنيه</span>` : ""}
                            </div>
                            <div class="fav-card-meta">
                                <div class="${p.inStock !== false ? "in-stock" : "out-of-stock"}">
                                    <i class="fas ${p.inStock !== false ? "fa-check-circle" : "fa-times-circle"}"></i>
                                    <span>${p.inStock !== false ? "متوفر" : "غير متوفر"}</span>
                                </div>
                                ${p.rating ? `<div class="fav-card-rating"><i class="fas fa-star"></i><span>${p.rating} (${p.reviews || 0})</span></div>` : ""}
                            </div>
                        </div>
                    </div>
                `;
            })
            .join("");
        }

        // Global functions
        window.removeFav = function (productId) {
          let products = JSON.parse(localStorage.getItem("favorites")) || [];
          let bundles = JSON.parse(localStorage.getItem("favoriteBundles")) || [];

          const newProducts = products.filter((p) => p.id !== productId);
          const newBundles = bundles.filter((b) => b.id !== productId);

          localStorage.setItem("favorites", JSON.stringify(newProducts));
          localStorage.setItem("favoriteBundles", JSON.stringify(newBundles));

          loadFavorites();
          showNotification("تمت الإزالة من المفضلة", "info");
        };

        window.addFavToCart = function (productId) {
          let product = favoriteProducts.find((p) => p.id === productId);
          if (!product) return;

          const price =
            product.price || product.currentPrice || product.bundlePrice || 0;
          const image = product.image || product.img || "";

          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          const exist = cart.find((i) => i.id === productId);
          if (exist) {
            exist.quantity = (exist.quantity || 1) + 1;
          } else {
            cart.push({
              id: product.id,
              name: product.name,
              price: price,
              quantity: 1,
              image: image,
              type: product.type || "product",
            });
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          updateAllCounts();
          showNotification("تمت الإضافة إلى السلة", "success");
        };

        window.viewProd = function (id) {
          // Check if it's a product or bundle
          const item = favoriteProducts.find((p) => p.id === id);
          if (item && item.type === "bundle") {
            window.location.href = `offer-details.html?id=${id}`;
          } else {
            window.location.href = `product-details.html?id=${id}`;
          }
        };

        window.clearAllFav = function () {
          if (favoriteProducts.length === 0) return;
          if (confirm("هل أنت متأكد من رغبتك في تفريغ قائمة المفضلة؟")) {
            localStorage.setItem("favorites", JSON.stringify([]));
            localStorage.setItem("favoriteBundles", JSON.stringify([]));
            loadFavorites();
            showNotification("تم تفريغ المفضلة بنجاح", "success");
          }
        };

        window.addAllToCart = function () {
          if (favoriteProducts.length === 0) {
            showNotification("قائمة المفضلة فارغة", "error");
            return;
          }
          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          favoriteProducts.forEach((p) => {
            const price = p.price || p.currentPrice || p.bundlePrice || 0;
            const image = p.image || p.img || "";
            const exist = cart.find((i) => i.id === p.id);
            if (exist) {
              exist.quantity = (exist.quantity || 1) + 1;
            } else {
              cart.push({
                id: p.id,
                name: p.name,
                price: price,
                quantity: 1,
                image: image,
                type: p.type || "product",
              });
            }
          });
          localStorage.setItem("cart", JSON.stringify(cart));
          updateAllCounts();
          showNotification("تمت إضافة جميع المنتجات إلى السلة", "success");
        };

        if (clearBtn) clearBtn.addEventListener("click", clearAllFav);
        if (addAllBtn) addAllBtn.addEventListener("click", addAllToCart);

        document
          .querySelector(".mobile-menu-btn")
          ?.addEventListener("click", function () {
            document.querySelector(".nav-links")?.classList.toggle("active");
          });

        document
          .querySelectorAll(".current-year")
          .forEach((el) => (el.textContent = new Date().getFullYear()));

        loadFavorites();
      
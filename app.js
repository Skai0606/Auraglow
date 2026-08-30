(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ---------------- hero carousel ---------------- */
  const slides = $$(".hero-slide");
  const dotsWrap = $("#heroDots");
  let current = 0;
  let timer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    if (i === 0) dot.classList.add("is-active");
    dot.addEventListener("click", () => go(i, true));
    dotsWrap.appendChild(dot);
  });
  const dots = $$("button", dotsWrap);

  function go(index, restart = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === current));
    dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
    if (restart) startAuto();
  }
  function next() { go(current + 1, true); }
  function prev() { go(current - 1, true); }
  function startAuto() {
    if (timer) clearInterval(timer);
    timer = setInterval(next, 5200);
  }
  $("#heroNext").addEventListener("click", next);
  $("#heroPrev").addEventListener("click", prev);
  startAuto();

  /* ---------------- products ---------------- */
  const PRODUCTS = {
    p1: { name: "AURA VELVET LIPSTICK", price: 18, img: "auraglow-lipstick.png" },
    p2: { name: "PEACH AURA BLUSH", price: 16, img: "auraglow-blush.png" },
    p3: { name: "AURA EARTH PALETTE", price: 26, img: "auraglow-eyeshadow.png" },
    p4: { name: "AURA SETTING POWDER", price: 18, img: "auraglow-powder.png" },
    p5: { name: "LUMINOUS FOUNDATION", price: 22, img: "auraglow-foundation.png" },
    p6: { name: "CHAMPAGNE GLOW HIGHLIGHTER", price: 20, img: "auraglow-highlighter.png" },
    p7: { name: "GLOSSY AURA LIP OIL", price: 14, img: "auraglow-lipgloss.png" },
    p8: { name: "AURA BRUSH SET", price: 32, img: "auraglow-brushes.jpg" },
  };

  /* ---------------- cart ---------------- */
  const cart = {};
  const cartDrawer = $("#cartDrawer");
  const cartItems = $("#cartItems");
  const cartCount = $("#cartCount");
  const cartTotal = $("#cartTotal");

  function money(n) { return "$" + n.toFixed(2); }

  function renderCart() {
    const ids = Object.keys(cart);
    cartCount.textContent = ids.reduce((sum, id) => sum + cart[id].qty, 0);
    const total = ids.reduce((sum, id) => sum + cart[id].qty * PRODUCTS[id].price, 0);
    cartTotal.textContent = money(total);

    if (ids.length === 0) {
      cartItems.innerHTML = '<div class="empty-cart"><span>♡</span><p>Your bag is ready for glow.</p></div>';
      return;
    }
    cartItems.innerHTML = ids.map(id => {
      const p = PRODUCTS[id];
      const qty = cart[id].qty;
      return `
        <div class="cart-item" data-id="${id}">
          <img src="assets/img/${p.img}" alt="${p.name}">
          <div>
            <h4>${p.name}</h4>
            <p>${money(p.price)}</p>
            <div class="qty">
              <button data-act="minus" aria-label="Decrease quantity">−</button>
              <span>${qty}</span>
              <button data-act="plus" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button class="remove" data-act="remove" aria-label="Remove item">×</button>
        </div>`;
    }).join("");
  }

  function addToCart(id) {
    cart[id] = cart[id] || { qty: 0 };
    cart[id].qty += 1;
    renderCart();
    openCart();
  }

  $$(".quick-add").forEach(btn => {
    btn.addEventListener("click", () => addToCart(btn.dataset.id));
  });

  cartItems.addEventListener("click", e => {
    const btn = e.target.closest("button[data-act]");
    if (!btn) return;
    const row = btn.closest(".cart-item");
    const id = row.dataset.id;
    const act = btn.dataset.act;
    if (act === "plus") cart[id].qty += 1;
    if (act === "minus") {
      cart[id].qty -= 1;
      if (cart[id].qty <= 0) delete cart[id];
    }
    if (act === "remove") delete cart[id];
    renderCart();
  });

  function openCart() {
    cartDrawer.classList.add("open");
    $("#scrim").classList.add("open");
  }
  function closeCart() {
    cartDrawer.classList.remove("open");
    $("#scrim").classList.remove("open");
  }
  $("#cartButton").addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", closeCart);
  $("#checkoutBtn").addEventListener("click", () => {
    showToast("CHECKOUT DEMO — NO REAL PAYMENT");
  });

  /* ---------------- wishlist ---------------- */
  $$(".heart").forEach(heart => {
    heart.addEventListener("click", () => {
      heart.classList.toggle("is-faved");
      heart.textContent = heart.classList.contains("is-faved") ? "♥" : "♡";
      showToast(heart.classList.contains("is-faved") ? "SAVED TO WISHLIST ♥" : "REMOVED FROM WISHLIST");
    });
  });

  /* ---------------- swatches ---------------- */
  $$(".swatches").forEach(group => {
    group.addEventListener("click", e => {
      const btn = e.target.closest("button");
      if (!btn) return;
      $$("button", group).forEach(b => b.style.outline = "1px solid var(--sand)");
      btn.style.outline = "2px solid var(--cocoa-900)";
    });
  });

  /* ---------------- search ---------------- */
  const searchOverlay = $("#searchOverlay");
  const searchInput = $("#searchInput");
  const cards = $$(".product-card");

  function openSearch() {
    searchOverlay.classList.add("open");
    setTimeout(() => searchInput.focus(), 150);
  }
  function closeSearch() {
    searchOverlay.classList.remove("open");
    searchInput.value = "";
    cards.forEach(c => c.style.display = "");
  }
  $("#searchButton").addEventListener("click", openSearch);
  $("#closeSearch").addEventListener("click", closeSearch);

  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    cards.forEach(card => {
      const name = (card.dataset.product || "").toLowerCase();
      card.style.display = !q || name.includes(q) ? "" : "none";
    });
  });
  $$(".popular a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      searchInput.value = link.dataset.query;
      searchInput.dispatchEvent(new Event("input"));
    });
  });

  /* ---------------- mobile menu ---------------- */
  const mobileMenu = $("#mobileMenu");
  $("#menuButton").addEventListener("click", () => mobileMenu.classList.toggle("open"));
  $$("a", mobileMenu).forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("open")));

  /* ---------------- scrim / keyboard ---------------- */
  $("#scrim").addEventListener("click", () => {
    closeCart();
    closeSearch();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeCart();
      closeSearch();
      mobileMenu.classList.remove("open");
    }
  });

  /* ---------------- newsletter ---------------- */
  $("#newsletterForm").addEventListener("submit", e => {
    e.preventDefault();
    const email = $("#email").value.trim();
    if (!email) return;
    $("#formMessage").textContent = "YOU'RE IN! WELCOME TO THE GLOW CLUB ♡";
    $("#email").value = "";
  });

  /* ---------------- toast ---------------- */
  let toastTimer = null;
  function showToast(message) {
    let toast = $(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    requestAnimationFrame(() => toast.classList.add("show"));
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  }

  /* ---------------- sticky header shadow ---------------- */
  const header = $("#siteHeader");
  window.addEventListener("scroll", () => {
    header.style.boxShadow = window.scrollY > 8 ? "0 8px 24px rgba(60,45,30,0.08)" : "none";
  }, { passive: true });
})();

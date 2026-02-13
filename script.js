/* =========================
   GLOBAL VARIABLES
========================= */
let selectedProduct = "";
let selectedImage = "";
let productPrice = 0;

/* =========================
   PRODUCT MODAL
========================= */
function openModal(name, imgSrc, price) {
  selectedProduct = name;
  selectedImage = imgSrc;
 
if (price) {
    productPrice = price;
  } else {
    document.querySelectorAll(".product-card").forEach(card => {
      const title = card.querySelector("h3").innerText;
      if (title === name) {
        const priceText = card.querySelector("p").innerText.replace("₹", "");
        productPrice = Number(priceText);
      }
    });
  }

  document.getElementById("productTitle").innerText = name;
  document.getElementById("productModal").style.display = "block";
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
}

/* =========================
   ADD TO CART
========================= */
function addToCart() {
  const size = document.getElementById("cartSize").value;
  const color = document.getElementById("cartColor").value;
  const quantity = parseInt(
    document.querySelector("#productModal input[type='number']").value
  );

if (!selectedProduct || !selectedImage || productPrice <= 0) {
    alert("Product data missing. Reload page.");
    return;
}

  if (!size || !color || quantity < 1) {
    alert("Please select size, color and quantity");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    name: selectedProduct,
    image: selectedImage,
    size: size,
    color: color,
    quantity: quantity,
    price: productPrice
  });

  localStorage.setItem("cart", JSON.stringify(cart));
 
  alert("Added to cart!");
  
}

/* =========================
   BUY NOW
========================= */
function buyNow() {
  const size = document.getElementById("cartSize").value;
  const color = document.getElementById("cartColor").value;
  const quantity = parseInt(
    document.querySelector("#productModal input[type='number']").value
  );

  if (!size || !color || quantity < 1) {
    alert("Please select size, color and quantity");
    return;
  }

  const buyNowItem = [{
    name: selectedProduct,
    image: selectedImage,
    size: size,
    color: color,
    quantity: quantity,
    price: productPrice
  }];

  localStorage.setItem("cart", JSON.stringify(buyNowItem));
  window.location.href = "checkout.html";
}

/* =========================
   CART COUNT
========================= */
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = 0;

  cart.forEach(item => {
    count += Number(item.quantity);
  });

  const cartCount = document.getElementById("cartCount");
  if (cartCount) cartCount.innerText = count;
}

updateCartCount();

/* =========================
   GO TO CART
========================= */
function goToCart() {
  window.location.href = "cart.html";
}

/* =========================
   FILTER PRODUCTS
========================= */
function filterProducts(type) {
  const products = document.querySelectorAll(".product-card");

  products.forEach(product => {
    if (type === "all" || product.classList.contains(type)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

/* =========================
   SEARCH PRODUCTS
========================= */
function searchProducts() {
  const input = document.getElementById("search").value.toLowerCase();
  const products = document.querySelectorAll(".product-card");

  products.forEach(product => {
    const name = product.querySelector("h3").innerText.toLowerCase();
    product.style.display = name.includes(input) ? "block" : "none";
  });
}

/* =========================
   LOGIN CHECK
========================= */
function checkLogin() {
  const loggedIn = localStorage.getItem("loggedIn");
  const user = JSON.parse(localStorage.getItem("user"));

  if (loggedIn && user) {
    const loginLink = document.getElementById("loginLink");
    const logoutLink = document.getElementById("logoutLink");
    const welcomeUser = document.getElementById("welcomeUser");

    if (loginLink) loginLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "inline";
    if (welcomeUser) welcomeUser.innerText = `Hi, ${user.name}`;
  }
}

checkLogin();

/* =========================
   WISHLIST
========================= */
function addToWishlist(event, name, image) {
  event.stopPropagation();

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const exists = wishlist.find(item => item.name === name);
  if (exists) {
    alert("Already in wishlist ❤️");
    return;
  }

  wishlist.push({ name, image });
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  alert("Added to wishlist ❤️");
}

/*==============================
LOGOUT
==============================*/
// ===============================
// AUTH STATE CHECK (ON PAGE LOAD)
// ===============================
const user = JSON.parse(localStorage.getItem("user"));

const loginLink = document.getElementById("loginLink");
const logoutLink = document.getElementById("logoutLink");
const welcomeUser = document.getElementById("welcomeUser");

if (user) {
  loginLink.style.display = "none";
  logoutLink.style.display = "inline";
  welcomeUser.innerText = `Hi, ${user.name}`;
} else {
  loginLink.style.display = "inline";
  logoutLink.style.display = "none";
  welcomeUser.innerText = "";
}

// ===============================
// LOGOUT FUNCTION (FIXED)
// ===============================
function logout() {
  localStorage.removeItem("user");   // clear login
  alert("Logged out successfully ✅");
  window.location.href = "login.html"; // redirect
}


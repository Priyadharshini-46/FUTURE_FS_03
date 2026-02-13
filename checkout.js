/* =========================
   CHECKOUT PAGE
========================= */

const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");

// Cart and total
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

// Logged-in user
const user = JSON.parse(localStorage.getItem("user"));

// Redirect to login if not logged in
if (!user) {
  alert("Please login first ❌");
  window.location.href = "login.html";
}

/* =========================
   INITIAL LOAD
========================= */
loadCheckout();
updatePaymentFields();

/* =========================
   LOAD CHECKOUT ITEMS
========================= */
function loadCheckout() {
  checkoutItems.innerHTML = "";
  total = 0;

  if (cart.length === 0) {
    checkoutItems.innerHTML = "<p>Your cart is empty.</p>";
    checkoutTotal.innerText = "";
    return;
  }

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    checkoutItems.innerHTML += `
      <div class="checkout-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>Size: ${item.size}</p>
          <p>Color: ${item.color}</p>
          <p>Qty: ${item.quantity}</p>
          <p><strong>₹${itemTotal}</strong></p>
        </div>
      </div>
    `;
  });

  checkoutTotal.innerText = `Total Payable: ₹${total}`;
}

/* =========================
   PAYMENT METHOD TOGGLE
========================= */
function updatePaymentFields() {
  const paymentType = document.getElementById("paymentMethod").value;
  const upiFields = document.getElementById("upiFields");
  const cardFields = document.getElementById("cardFields");

  if (paymentType === "upi") {
    upiFields.style.display = "block";
    cardFields.style.display = "none";
  } else {
    upiFields.style.display = "none";
    cardFields.style.display = "block";
  }
}

// Listen for changes
document.getElementById("paymentMethod").addEventListener("change", updatePaymentFields);

/* =========================
   PLACE ORDER
========================= */
function placeOrder() {
  const fullName = document.getElementById("fullName").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const pincode = document.getElementById("pincode").value.trim();

  if (!fullName || !mobile || !address || !city || !pincode) {
    alert("Please fill all delivery details ❌");
    return;
  }

  if (mobile.length < 10) {
    alert("Enter valid mobile number ❌");
    return;
  }

  if (cart.length === 0) {
    alert("Cart is empty ❌");
    return;
  }

  // Read payment info
  let paymentInfo = {};
  const paymentType = document.getElementById("paymentMethod").value;

  if (paymentType === "upi") {
    const upiId = document.getElementById("upiId").value.trim();
    if (!upiId) {
      alert("Enter UPI ID ❌");
      return;
    }
    paymentInfo = { method: "UPI", upiId };
  } else if (paymentType === "card") {
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const cardExpiry = document.getElementById("cardExpiry").value.trim();
    const cardCvv = document.getElementById("cardCvv").value.trim();

    if (!cardNumber || !cardExpiry || !cardCvv) {
      alert("Fill all card details ❌");
      return;
    }

    paymentInfo = {
      method: "Card",
      cardNumber,
      cardExpiry,
      cardCvv
    };
  }

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const orderItems = cart.map(item => ({
    name: item.name,
    image: item.image,
    size: item.size,
    color: item.color,
    quantity: item.quantity,
    price: item.price,
    deliveryStatus: "Order Placed",
    deliveredDate: null,
    exchange: null
  }));

  const newOrder = {
    date: new Date().toISOString(),
    total: cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    user: {
      name: fullName,
      email: user?.email || "Not provided",
      mobile,
      address,
      city,
      pincode
    },
    payment: paymentInfo,
    items: orderItems
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart");

  alert("Order placed successfully 🎉");
  window.location.href = "orders.html";
}

/* =========================
   LOGOUT USER
========================= */
const logoutBtn = document.getElementById("logoutBtn") || document.getElementById("logoutLink");
if (logoutBtn) {
  logoutBtn.style.display = "inline-block";
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    alert("Logged out successfully ✅");
    window.location.href = "login.html";
  });
}

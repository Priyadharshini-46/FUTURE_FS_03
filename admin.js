// 🔐 ADMIN PROTECTION
const isAdmin = localStorage.getItem("adminLoggedIn");

if (!isAdmin) {
  alert("Access denied ❌ Admin only");
  window.location.href = "admin-login.html";
}

/* =========================
   LOAD ORDERS (ADMIN)
========================= */
const adminOrders = document.getElementById("adminOrders");
let orders = JSON.parse(localStorage.getItem("orders")) || [];

if (orders.length === 0) {
  adminOrders.innerHTML = "<p>No orders found.</p>";
} else {
  renderAdminOrders();
}

/* =========================
   RENDER ADMIN ORDERS
========================= */
function renderAdminOrders() {
  adminOrders.innerHTML = "";

  orders.forEach((order, orderIndex) => {
    let itemsHTML = "";

    order.items.forEach((item, itemIndex) => {
      if (!item.deliveryStatus) item.deliveryStatus = "Order Placed";
      if (item.exchange && !item.exchange.status)
        item.exchange.status = "Requested";

      itemsHTML += `
        <div class="order-item">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h4>${item.name}</h4>
            <p>Size: ${item.size}</p>
            <p>Qty: ${item.quantity}</p>
            <p>₹${item.price}</p>

            <label>Delivery Status</label>
            <select onchange="updateDelivery(${orderIndex}, ${itemIndex}, this.value)">
              <option ${item.deliveryStatus === "Order Placed" ? "selected" : ""}>Order Placed</option>
              <option ${item.deliveryStatus === "Shipped" ? "selected" : ""}>Shipped</option>
              <option ${item.deliveryStatus === "Delivered" ? "selected" : ""}>Delivered</option>
            </select>

            ${
              item.exchange
                ? `
                  <hr>
                  <p><strong>Exchange Reason:</strong> ${item.exchange.reason}</p>
                  <p><strong>Requested Size:</strong> ${item.exchange.newSize}</p>

                  <label>Exchange Status</label>
                  <select onchange="updateExchangeStatus(${orderIndex}, ${itemIndex}, this.value)">
                    <option ${item.exchange.status === "Requested" ? "selected" : ""}>Requested</option>
                    <option ${item.exchange.status === "Processing" ? "selected" : ""}>Processing</option>
                    <option ${item.exchange.status === "Approved" ? "selected" : ""}>Approved</option>
                    <option ${item.exchange.status === "Rejected" ? "selected" : ""}>Rejected</option>
                  </select>
                `
                : `<p>No exchange requested</p>`
            }
          </div>
        </div>
      `;
    });

    // ✅ USER DETAILS
    adminOrders.innerHTML += `
      <div class="order-card">
        <p><strong>Customer Name:</strong> ${order.user?.name || "Guest"}</p>
        <p><strong>Email:</strong> ${order.user?.email || "Not provided"}</p>
        <p><strong>Mobile:</strong> ${order.user?.mobile || "-"}</p>
        <p><strong>Address:</strong> ${order.user?.address || "-"}</p>
        <p><strong>Order Date:</strong> ${new Date(order.date).toDateString()}</p>

        ${itemsHTML}

        <h4>Total: ₹${order.total}</h4>
        <hr>
      </div>
    `;
  });

  localStorage.setItem("orders", JSON.stringify(orders));
}

/* =========================
   DELIVERY UPDATE
========================= */
function updateDelivery(orderIndex, itemIndex, status) {
  const item = orders[orderIndex].items[itemIndex];
  item.deliveryStatus = status;

  if (status === "Delivered") {
    item.deliveredDate = new Date().toISOString();
  }

  localStorage.setItem("orders", JSON.stringify(orders));
  alert("Delivery status updated");
}

/* =========================
   EXCHANGE STATUS UPDATE
========================= */
function updateExchangeStatus(orderIndex, itemIndex, status) {
  const item = orders[orderIndex].items[itemIndex];

  if (!item.exchange) return; // Safety check

  item.exchange.status = status;
  localStorage.setItem("orders", JSON.stringify(orders));
  alert("Exchange status updated");
}

/* =========================
   ADMIN LOGOUT
========================= */
function adminLogout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin-login.html";
}

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  alert("Please login first ❌");
  window.location.href = "login.html";
}


const ordersList = document.getElementById("ordersList");
let orders = JSON.parse(localStorage.getItem("orders")) || [];

if (orders.length === 0) {
  ordersList.innerHTML = "<p>No orders yet.</p>";
} else {
  displayOrders();
}

/* =========================
   EXCHANGE ELIGIBILITY
========================= */
function canExchange(item) {
  if (!item.deliveredDate) return false;

  const diffDays =
    (new Date() - new Date(item.deliveredDate)) / (1000 * 60 * 60 * 24);

  return diffDays <= 2 && !item.exchange;
}

/* =========================
   DISPLAY ORDERS
========================= */
function displayOrders() {
  ordersList.innerHTML = "";

  const reversedOrders = orders
    .map((order, index) => ({ order, index }))
    .reverse();

  reversedOrders.forEach(({ order, index: orderIndex }) => {
    let itemsHTML = "";

    order.items.forEach((item, itemIndex) => {
      itemsHTML += `
        <div class="order-item">
          <img src="${item.image}">
          <div>
            <h4>${item.name}</h4>
            <p>Size: ${item.size}</p>
            <p>Color: ${item.color || "-"}</p>
            <p>Qty: ${item.quantity}</p>
            <p>₹${item.price}</p>

            <p><strong>Delivery Status:</strong> ${item.deliveryStatus || "Order Placed"}</p>

            ${
              item.exchange
                ? `<p><strong>Exchange Status:</strong> ${item.exchange.status}</p>
                   <p style="color:green;">Exchange Requested ✅</p>`
                : canExchange(item)
                  ? `<button onclick="openExchange(${orderIndex}, ${itemIndex})">
                       Exchange
                     </button>`
                  : `<p style="color:red;">Exchange available only after delivery </p>`
            }
          </div>
        </div>
      `;
    });

    ordersList.innerHTML += `
      <div class="order-card">
        <p class="order-date">
          Ordered on: ${new Date(order.date).toDateString()}
        </p>
        ${itemsHTML}
        <h4>Total Paid: ₹${order.total}</h4>
      </div>
    `;
  });
}

/* =========================
   EXCHANGE REQUEST
========================= */
function openExchange(orderIndex, itemIndex) {
  const reason = prompt("Reason for exchange:\n- Size issue\n- Defective");
  if (!reason) return;

  const newSize = prompt("Enter new size:");
  if (!newSize) return;

  orders[orderIndex].items[itemIndex].exchange = {
    reason,
    newSize,
    status: "Requested",
    requestDate: new Date().toISOString()
  };

  localStorage.setItem("orders", JSON.stringify(orders));
  alert("Exchange request submitted!");
  displayOrders();
}

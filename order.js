const ordersList = document.getElementById("ordersList");
const orders = JSON.parse(localStorage.getItem("orders")) || [];

if (orders.length === 0) {
  ordersList.innerHTML = "<p>No orders yet.</p>";
}

orders.reverse().forEach(order => {
  let itemsHTML = "";

  order.items.forEach(item => {
    itemsHTML += `
      <div class="order-item">
        <img src="${item.image}">
        <div>
          <h4>${item.name}</h4>
          <p>Size: ${item.size}</p>
          <p>Qty: ${item.quantity}</p>
          <p>₹${item.price}</p>
        </div>
      </div>
    `;
  });

  ordersList.innerHTML += `
    <div class="order-card">
      <p class="order-date">Ordered on: ${order.date}</p>
      ${itemsHTML}
      <h4>Total Paid: ₹${order.total}</h4>
    </div>
  `;
});

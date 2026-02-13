const index = localStorage.getItem("deliveryOrderIndex");
const orders = JSON.parse(localStorage.getItem("orders"));
const order = orders[index];

document.getElementById("deliveryStatus").innerHTML = `
  <h3>Order Date: ${order.date}</h3>
  <p>Order Confirmed ✅</p>
  <p>Shipped 🚚</p>
  <p>Out for Delivery 📦</p>
  <p>Delivered 🎉</p>
`;
orders.forEach(order => {
  order.items.forEach(item => {
    console.log(item.deliveryStatus);
    console.log(item.exchange?.status); // may be null
  });
});

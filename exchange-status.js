const data = JSON.parse(localStorage.getItem("exchangeData"));
const orders = JSON.parse(localStorage.getItem("orders"));

const order = orders[data.orderIndex];
const item = order.items[data.itemIndex];

document.getElementById("exchangeItem").innerHTML = `
  <img src="${item.image}" style="width:150px">
  <h4>${item.name}</h4>
`;

function submitExchange() {
  const reason = document.getElementById("reason").value;
  const size = document.getElementById("newSize").value;
  const color = document.getElementById("newColor").value;

  if (!reason) {
    alert("Select exchange reason");
    return;
  }

  item.exchangeRequested = true;
  item.exchangeDetails = { reason, size, color };

  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Exchange requested successfully");
  window.location.href = "orders.html";
}

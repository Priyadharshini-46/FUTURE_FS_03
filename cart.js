const cartItemsDiv = document.getElementById("cartItems");
const totalAmount = document.getElementById("totalAmount");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

 cartItemsDiv.innerHTML += `
  <div class="cart-item">
    <img src="${item.image}" class="cart-img">
    
    <div class="cart-details">
      <h4>${item.name}</h4>
      <p>Size: ${item.size}</p>
      <p>Color: ${item.color}</p>
      <p>Price: ₹${item.price}</p>

      <p>
        Quantity:
        <input type="number" value="${item.quantity}" min="1"
          onchange="updateQty(${index}, this.value)">
      </p>

      <p>Total: ₹${itemTotal}</p>
      <button onclick="removeItem(${index})">Remove</button>
    </div>
  </div>
`;
     });

  totalAmount.innerText = `Grand Total: ₹${total}`;
}

function updateQty(index, qty) {
  cart[index].quantity = qty;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

displayCart();

function goToCheckout() {
  window.location.href = "checkout.html";
}


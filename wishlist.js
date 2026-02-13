const wishlistItems = document.getElementById("wishlistItems");
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

if (wishlist.length === 0) {
  wishlistItems.innerHTML = "<p>Your wishlist is empty.</p>";
}

wishlist.forEach((item, index) => {
  wishlistItems.innerHTML += `
    <div class="wishlist-item">
      <img src="${item.image}">
      <h4>${item.name}</h4>
      <button onclick="removeFromWishlist(${index})">Remove</button>
    </div>
  `;
});

function removeFromWishlist(index) {
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  location.reload();
}

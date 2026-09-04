let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
  const itemsContainer = document.getElementById('cartItems');
  const summaryContainer = document.getElementById('summaryItems');
  const totalAmountEl = document.getElementById('totalAmount');

  if (cart.length === 0) {
    itemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    summaryContainer.innerHTML = '<p style="color:#aaa; font-size:13px;">No items</p>';
    totalAmountEl.innerText = '$0';
    return;
  }

  itemsContainer.innerHTML = cart.map((item, index) => `
    <div class="product-card">
      <div class="card-img-container">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="card-info">
        <div class="card-title">${item.title}</div>
        <strong>Price: $${item.price}</strong>
      </div>
      <button class="btn-black" onclick="removeFromCart(${index})">Remove From Cart</button>
    </div>
  `).join('');

  summaryContainer.innerHTML = cart.map((item, index) => `
    <div class="summary-item">
      <span>${index + 1}. ${item.title.substring(0, 16)}...</span>
      <span>$${item.price}</span>
    </div>
  `).join('');

  const total = cart.reduce((acc, curr) => acc + Number(curr.price), 0);
  totalAmountEl.innerText = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Razorpay Payment
document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const total = cart.reduce((acc, curr) => acc + Number(curr.price), 0);

  const options = {
    key: "rzp_test_PV1oQ0oMtgXOsq",
    amount: Math.round(total * 100 * 80), // USD to INR conversion in paise
    currency: "INR",
    name: "MeShop Checkout",
    description: "Purchase of cart items",
    handler: function (response) {
      alert(`Items purchased successfully! Payment ID: ${response.razorpay_payment_id}`);
      localStorage.removeItem('cart');
      window.location.href = 'shop.html';
    },
    prefill: {
      name: `${currentUser.fname} ${currentUser.lname}`,
      email: currentUser.email
    },
    theme: { color: "#000000" }
  };

  const rzp = new Razorpay(options);
  rzp.open();
});

renderCart();
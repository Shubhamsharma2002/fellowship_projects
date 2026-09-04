let allProducts = [];
const SIZES = ['S', 'M', 'L', 'XL'];
const COLORS = ['red', 'blue', 'green', 'black', 'white'];

function getRandomSubset(arr, min = 1, max = 3) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * (max - min + 1)) + min);
}

// Fetch and enrich items
async function initShop() {
  const cached = localStorage.getItem('products');
  if (cached) {
    allProducts = JSON.parse(cached);
  } else {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      allProducts = data.map(item => ({
        ...item,
        colours: getRandomSubset(COLORS, 2, 4),
        sizes: getRandomSubset(SIZES, 2, 4)
      }));
      localStorage.setItem('products', JSON.stringify(allProducts));
    } catch (err) {
      console.error("API Fetch Error:", err);
    }
  }
  renderProducts(allProducts);
}

// Render Products Grid
function renderProducts(items) {
  const container = document.getElementById('productGrid');
  if (items.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; color: #888;">No products found matching your filter criteria.</p>`;
    return;
  }

  container.innerHTML = items.map(product => `
    <div class="product-card">
      <div class="card-img-container">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="card-info">
        <div class="card-row">
          <strong>$${product.price}</strong>
          <span>${product.sizes.join(',')}</span>
        </div>
        <div class="card-title" title="${product.title}">${product.title}</div>
        <div class="card-row" style="align-items: center;">
          <div class="color-dots">
            ${product.colours.map(c => `<span class="dot" style="background:${c}"></span>`).join('')}
          </div>
          <span>★ ${product.rating.rate}</span>
        </div>
      </div>
      <button class="btn-black" onclick="addToCart(${product.id})" style="width:100%;">Add To Cart</button>
    </div>
  `).join('');
}

// Add to Cart
function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = allProducts.find(p => p.id === id);
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`"${item.title.substring(0, 20)}..." added to cart!`);
}

// Filtering Engine
function filterCatalog() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  const activeTab = document.querySelector('.tab-btn.active').dataset.category;
  const minRating = parseFloat(document.getElementById('ratingRange').value);

  const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(c => c.value);
  const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(s => s.value);
  const selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(p => p.value);

  const filtered = allProducts.filter(item => {
    // Search
    const matchSearch = item.title.toLowerCase().includes(query);
    // Tab Category
    const matchCategory = activeTab === 'all' || item.category.toLowerCase() === activeTab.toLowerCase();
    // Rating
    const matchRating = item.rating.rate >= minRating;
    // Colors
    const matchColors = selectedColors.length === 0 || item.colours.some(c => selectedColors.includes(c));
    // Sizes
    const matchSizes = selectedSizes.length === 0 || item.sizes.some(s => selectedSizes.includes(s));
    // Prices
    const matchPrice = selectedPrices.length === 0 || selectedPrices.some(range => {
      const [min, max] = range.split('-').map(Number);
      return item.price >= min && item.price <= max;
    });

    return matchSearch && matchCategory && matchRating && matchColors && matchSizes && matchPrice;
  });

  renderProducts(filtered);
}

// Event Listeners
document.getElementById('searchInput').addEventListener('input', filterCatalog);
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    filterCatalog();
  });
});
document.getElementById('ratingRange').addEventListener('input', (e) => {
  document.getElementById('ratingVal').innerText = e.target.value;
  filterCatalog();
});
document.querySelectorAll('.sidebar input').forEach(input => {
  input.addEventListener('change', filterCatalog);
});

initShop();
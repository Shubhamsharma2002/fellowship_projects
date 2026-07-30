const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let cryptoData = [];

// ==========================================
// Part 1 & 5: API Fetching Implementations
// ==========================================

// Method A: Fetching using async / await
async function fetchDataAsync() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    cryptoData = data;
    renderTable(cryptoData);
  } catch (error) {
    console.error("Error fetching data with async/await:", error);
  }
}

// Method B: Fetching using .then() promise chaining
function fetchDataThen() {
  fetch(API_URL)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      cryptoData = data;
      renderTable(cryptoData);
    })
    .catch((error) => {
      console.error("Error fetching data with .then():", error);
    });
}

// ==========================================
// Part 4: Dynamic Table Rendering Function
// ==========================================
function renderTable(data) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  if (!data || data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 20px;">No matching coins found</td></tr>`;
    return;
  }

  data.forEach((coin) => {
    const { name, id, image, symbol, current_price, total_volume, price_change_percentage_24h, market_cap } = coin;

    const row = document.createElement("tr");

    // Format metrics cleanly
    const formattedPrice = `$${current_price.toLocaleString()}`;
    const formattedVolume = `$${total_volume.toLocaleString()}`;
    const formattedMktCap = `$${market_cap.toLocaleString()}`;
    const percentageFormatted = `${price_change_percentage_24h.toFixed(2)}%`;
    const percentageClass = price_change_percentage_24h >= 0 ? "positive" : "negative";

    row.innerHTML = `
      <td>
        <div class="coin-info">
          <img class="coin-icon" src="${image}" alt="${name} logo" />
          <span>${name}</span>
        </div>
      </td>
      <td class="symbol-text">${symbol}</td>
      <td class="price-text">${formattedPrice}</td>
      <td class="volume-text">${formattedVolume}</td>
      <td class="${percentageClass}">${percentageFormatted}</td>
      <td class="mkt-cap-text">Mkt Cap : ${formattedMktCap}</td>
    `;

    tableBody.appendChild(row);
  });
}

// ==========================================
// Part 6 & 7: Event Listeners (Search & Sort)
// ==========================================

// 1. Search Functionality (Filters dynamically on input)
document.getElementById("search-input").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();
  const filteredData = cryptoData.filter(
    (coin) =>
      coin.name.toLowerCase().includes(query) ||
      coin.symbol.toLowerCase().includes(query)
  );
  renderTable(filteredData);
});

// 2. Sort By Market Cap (Descending)
document.getElementById("sort-mkt-cap-btn").addEventListener("click", () => {
  const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sortedData);
});

// 3. Sort By Percentage Change (Descending)
document.getElementById("sort-percentage-btn").addEventListener("click", () => {
  const sortedData = [...cryptoData].sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );
  renderTable(sortedData);
});

// ==========================================
// App Initialization
// ==========================================
// Un-comment either approach to verify evaluation requirements:

fetchDataAsync(); // Uses async / await
// fetchDataThen();  // Uses .then() promise syntax
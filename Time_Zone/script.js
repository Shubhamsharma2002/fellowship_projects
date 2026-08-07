const API_KEY = '522679878ca04c37b92045d0b4775e9f'; // Insert your Geoapify API key here

const currentCard = document.getElementById('current-timezone-card');
const addressInput = document.getElementById('address-input');
const submitBtn = document.getElementById('submit-btn');
const errorMessage = document.getElementById('error-message');
const resultWrapper = document.getElementById('result-wrapper');
const resultCard = document.getElementById('result-timezone-card');

// Helper to format timezone data inside card layout
function generateCardContent(data, lat, lon) {
  const tz = data.timezone || {};

  // Standard Offset formatting
  const stdOffset = tz.offset_STD || 'N/A';
  const stdSeconds = tz.offset_STD_seconds !== undefined ? tz.offset_STD_seconds : 'N/A';
  
  // DST Offset formatting
  const dstOffset = tz.offset_DST || 'N/A';
  const dstSeconds = tz.offset_DST_seconds !== undefined ? tz.offset_DST_seconds : 'N/A';

  const country = data.country || 'N/A';
  const postcode = data.postcode || 'N/A';
  const city = data.city || data.county || 'N/A';

  return `
    <div><strong>Name Of Time Zone :</strong> ${tz.name || 'N/A'}</div>
    <div class="card-row-latlong">
      <div><strong>Lat:</strong> ${lat}</div>
      <div><strong>Long:</strong> ${lon}</div>
    </div>
    <div><strong>Offset STD:</strong> ${stdOffset}</div>
    <div><strong>Offset STD Seconds :</strong> ${stdSeconds}</div>
    <div><strong>Offset DST :</strong> ${dstOffset}</div>
    <div><strong>Offset DST Seconds:</strong> ${dstSeconds}</div>
    <div><strong>Country:</strong> ${country}</div>
    <div><strong>Postcode:</strong> ${postcode}</div>
    <div><strong>City:</strong> ${city}</div>
  `;
}

// 1. Fetch Timezone using Geolocation on page load
window.addEventListener('DOMContentLoaded', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchTimezoneByCoords(lat, lon);
      },
      (error) => {
        currentCard.innerHTML = `<p style="color: red;">Geolocation failed or denied. Unable to fetch current timezone.</p>`;
      }
    );
  } else {
    currentCard.innerHTML = `<p style="color: red;">Geolocation is not supported by this browser.</p>`;
  }
});

// Fetch Timezone from Coordinates via Geoapify
async function fetchTimezoneByCoords(lat, lon) {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${API_KEY}`
    );
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const properties = data.features[0].properties;
      currentCard.innerHTML = generateCardContent(properties, lat, lon);
    } else {
      currentCard.innerHTML = `<p style="color: red;">Timezone data could not be retrieved for current location.</p>`;
    }
  } catch (err) {
    currentCard.innerHTML = `<p style="color: red;">Error fetching timezone data.</p>`;
  }
}

// 2. Fetch Timezone by Entered Address
submitBtn.addEventListener('click', handleAddressSearch);

async function handleAddressSearch() {
  const address = addressInput.value.trim();

  // Reset display states
  errorMessage.style.display = 'none';
  resultWrapper.style.display = 'none';
  errorMessage.textContent = '';

  // Validation
  if (!address) {
    showError('Please enter an address!');
    return;
  }

  try {
    // Geocoding API call
    const geocodeResponse = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${API_KEY}`
    );
    const geocodeData = await geocodeResponse.json();

    if (!geocodeData.features || geocodeData.features.length === 0) {
      showError('TimeZone could not be found!');
      return;
    }

    const properties = geocodeData.features[0].properties;
    const lat = properties.lat;
    const lon = properties.lon;

    // Render result card
    resultCard.innerHTML = generateCardContent(properties, lat, lon);
    resultWrapper.style.display = 'block';

  } catch (err) {
    showError('TimeZone could not be found!');
  }
}

function showError(msg) {
  errorMessage.textContent = msg;
  errorMessage.style.display = 'block';
  resultWrapper.style.display = 'none';
}
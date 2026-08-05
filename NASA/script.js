const API_KEY = "VMnJ6aLYcfWRUFmIUy5ecv87zvctj7AJh9obFhZn"; // Replace with your NASA API Key


const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentImageContainer = document.getElementById("current-image-container");
const searchHistory = document.getElementById("search-history");

// Set maximum date input to today
const todayDate = new Date().toISOString().split("T")[0];
searchInput.setAttribute("max", todayDate);

// 1. Fetch current image of the day on page load
function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  fetchAPOD(currentDate, "Picture of the Day");
}

// 2. Fetch image for a selected date
function getImageOfTheDay(selectedDate) {
  fetchAPOD(selectedDate, `Picture for ${selectedDate}`);
  saveSearch(selectedDate);
  addSearchToHistory();
}

// Helper function to handle API calls
function fetchAPOD(date, titleHeading) {
  currentImageContainer.innerHTML = "<p>Loading APOD data...</p>";

  const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch data from NASA API");
      }
      return res.json();
    })
    .then((data) => {
      displayData(data, titleHeading);
    })
    .catch((error) => {
      console.error("Error fetching APOD:", error);
      currentImageContainer.innerHTML = `<p class="error-msg">Error loading image: ${error.message}</p>`;
    });
}

// Helper function to render data in the UI
function displayData(data, titleHeading) {
  let mediaElement = "";

  if (data.media_type === "image") {
    mediaElement = `<img src="${data.url}" alt="${data.title}">`;
  } else if (data.media_type === "video") {
    mediaElement = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
  }

  currentImageContainer.innerHTML = `
    <h2>${titleHeading}: ${data.title}</h2>
    <h3>Date: ${data.date}</h3>
    ${mediaElement}
    <p>${data.explanation}</p>
  `;
}

// 3. Save date to local storage array
function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];

  // Avoid duplicates
  if (!searches.includes(date)) {
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
  }
}

// 4. Update UI search history list from local storage
function addSearchToHistory() {
  searchHistory.innerHTML = "";
  const searches = JSON.parse(localStorage.getItem("searches")) || [];

  searches.forEach((date) => {
    const li = document.createElement("li");
    li.textContent = date;

    // Click handler to re-fetch selected date
    li.addEventListener("click", () => {
      fetchAPOD(date, `Picture for ${date}`);
    });

    searchHistory.appendChild(li);
  });
}

// Form submit event listener
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedDate = searchInput.value;
  if (selectedDate) {
    getImageOfTheDay(selectedDate);
  }
});

// Initial startup functions
document.addEventListener("DOMContentLoaded", () => {
  getCurrentImageOfTheDay();
  addSearchToHistory();
});
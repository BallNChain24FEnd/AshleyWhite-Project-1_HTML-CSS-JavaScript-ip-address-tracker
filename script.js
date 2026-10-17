/* IP Address Tracker */

// Select elements
const searchForm = document.getElementById("search-form");
const ipInput = document.getElementById("ip-input");
const errorMessage = document.getElementById("error-message");

// Create map
let map;
let marker;

if (typeof L !== "undefined") {
  // Create a stationary map
map = L.map("map", {
  dragging: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  touchZoom: false,
  boxZoom: false,
  keyboard: false,
  zoomControl: false
}).setView([39.8, -98.6], 4);

  // Add map tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Add marker
  marker = L.marker([39.8, -98.6]).addTo(map);
}

// Get location data
async function getLocation(search = "") {
  try {
    // Reset error
    errorMessage.textContent = "";

    // Request location
    const response = await fetch(`/api/lookup?search=${encodeURIComponent(search)}`);
    const data = await response.json();

    // Check response
    if (!response.ok) throw new Error(data.error || "Search failed.");

    // Display results
    document.getElementById("ip-address").textContent = data.ip;
    document.getElementById("location").textContent =
      `${data.location.city}, ${data.location.region}`;
    document.getElementById("timezone").textContent =
      `UTC ${data.location.timezone}`;
    document.getElementById("isp").textContent = data.isp;

    // Update map
    if (map && data.location.lat != null && data.location.lng != null) {
      const coordinates = [data.location.lat, data.location.lng];
      map.setView(coordinates, 13);
      marker.setLatLng(coordinates);
    }

  } catch (error) {
    // Show error
    errorMessage.textContent = error.message;
    console.error("Error:", error.message);
  }
}

// Handle search
searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get input
  const search = ipInput.value.trim();

  // Validate input
  if (!search || search.includes(" ")) {
    errorMessage.textContent = "Enter a valid IP address or domain.";
    return;
  }

  getLocation(search);
});

// Load initial location
getLocation();

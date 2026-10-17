/* IP Address Tracker */

// Select elements
const searchForm = document.getElementById("search-form");
const ipInput = document.getElementById("ip-input");
const errorMessage = document.getElementById("error-message");

// Create map
const map = L.map("map").setView([39.8, -98.6], 4);

// Add map tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// Set marker images
const locationIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Add marker
const marker = L.marker([39.8, -98.6], {
  icon: locationIcon
}).addTo(map);

// Refresh map display
window.addEventListener("load", function () {
  map.invalidateSize();
});

// Get location data
async function getLocation(search = "") {
  try {
    // Reset error
    errorMessage.textContent = "";

    // Request location
    const response = await fetch(
      `/api/lookup?search=${encodeURIComponent(search)}`
    );

    const data = await response.json();

    // Check response
    if (!response.ok) {
      throw new Error(data.error || "Search failed.");
    }

    // Display results
    document.getElementById("ip-address").textContent = data.ip;

    document.getElementById("location").textContent =
      `${data.location.city}, ${data.location.region}`;

    document.getElementById("timezone").textContent =
      `UTC ${data.location.timezone}`;

    document.getElementById("isp").textContent = data.isp;

    // Update map
    if (data.location.lat != null && data.location.lng != null) {
      const coordinates = [data.location.lat, data.location.lng];

      map.invalidateSize();
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
searchForm.addEventListener("submit", function (event) {
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
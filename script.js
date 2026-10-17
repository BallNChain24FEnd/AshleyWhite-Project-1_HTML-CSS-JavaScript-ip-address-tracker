
/* Commit 10: Fetch IP location */

// Select HTML elements
const searchForm = document.getElementById("search-form");
const ipInput = document.getElementById("ip-input");

// Get location data
async function getLocation(search) {
  try {
    const response = await fetch(`/api/lookup?search=${encodeURIComponent(search)}`);
    const data = await response.json();

    // Check API response
    if (!response.ok) throw new Error(data.error);

    console.log("Location data:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Handle search
searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get input
  const ipAddress = ipInput.value.trim();

  // Check invalid input
  if (!ipAddress || ipAddress.includes(" ")) {
    alert("Please enter a valid IP address or domain.");
    return;
  }

  getLocation(ipAddress);
});

/* Commit 9: Check user's search */

// Find form and input box
const searchForm = document.getElementById("search-form");
const ipInput = document.getElementById("ip-input");

// Wait for user to search
searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get input and remove extra spaces
  const ipAddress = ipInput.value.trim();

  // Check if the search box is empty
  if (ipAddress === "") {
    alert("Please enter an IP address or domain.");
    return;
  }

  // Check for spaces inside the search
  if (ipAddress.includes(" ")) {
    alert("Please enter a valid IP address or domain.");
    return;
  }

  // Show the search in the console
  console.log("Searching for:", ipAddress);
});

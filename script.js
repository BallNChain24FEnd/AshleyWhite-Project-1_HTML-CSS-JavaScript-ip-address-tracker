/* Commit 8: Make the search bar work */

// Find the search form and input box in HTML
const searchForm = document.getElementById("search-form");
const ipInput = document.getElementById("ip-input");

// Wait for the user to submit the search
searchForm.addEventListener("submit", function(event) {

  // Stop the page from refreshing
  event.preventDefault();

  // Get what the user typed and remove extra spaces
  const ipAddress = ipInput.value.trim();

  // Show what the user searched for in the console
  console.log("Searching for:", ipAddress);
});

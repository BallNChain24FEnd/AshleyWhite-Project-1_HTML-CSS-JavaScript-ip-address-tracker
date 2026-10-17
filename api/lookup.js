
/* Get IP location from IPify */

export default async function handler(req, res) {
  // Get search value
  const search = req.query.search;

  // Check input type
if (search !== undefined && typeof search !== "string") {
  return res.status(400).json({ error: "Invalid search." });
}

  // Check API key
  if (!process.env.IPIFY_API_KEY) {
    return res.status(500).json({ error: "API key not configured." });
  }

  // Create IPify URL
  const url = new URL("https://geo.ipify.org/api/v2/country,city");
  url.searchParams.set("apiKey", process.env.IPIFY_API_KEY);
  
  // Add search when provided
if (search) {
  url.searchParams.set(
    search.includes(":") || /^[\d.]+$/.test(search) ? "ipAddress" : "domain",
    search
  );
}

  try {
    // Get API response
    const response = await fetch(url);
    const data = await response.json();

    // Check request result
    if (!response.ok) {
      return res.status(400).json({ error: "Unable to find location." });
    }

    // Send location data
    return res.status(200).json(data);
  } catch (error) {
    // Handle request error
    return res.status(500).json({ error: "Location request failed." });
  }
}

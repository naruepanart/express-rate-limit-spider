const express = require("express");
const rateLimit = require("./rate-limit.cjs");

// Create an instance of the express application
const app = express();

// Apply rate limiting middleware
// Set the number of allowed requests before rate limiting kicks in
const REQUESTS_PER_LIMIT = 5;
// Set the duration of the rate limit window in milliseconds
const LIMIT_DURATION_MS = 5000;
// Set the duration of the rolling window in milliseconds
const WINDOW_MS = 15000;
// Create a rate limiter object with the specified settings
const limiter = rateLimit(REQUESTS_PER_LIMIT, LIMIT_DURATION_MS, WINDOW_MS);
// Apply the rate limiter middleware to the app
app.use(limiter);

/**
 * A route handler function for the root path
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Set the port number to 3000
const port = 3000;
// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message to the console when the server starts
  console.log(`Server is running on port ${port}`);
});

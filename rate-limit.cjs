/**
 * A function that implements rate limiting middleware for incoming requests.
 *
 * @param {number} limit - The maximum number of requests allowed in the given interval.
 * @param {number} interval - The time interval (in ms) during which max number of requests are allowed.
 * @param {number} timeout - The time (in ms) after which the rate-limit counter is reset.
 * @return {Function} - Middleware function that rate-limits incoming requests.
 */
const rateLimit = (limit, interval, timeout) => {
  const cache = {};

  return async (req, res, next) => {
    try {
      const ip = req.ip;
      const key = `${ip}:${interval}`;

      cache[key] = (cache[key] || 0) + 1;
      const count = cache[key];

      if (count > limit) {
        return res.status(429).json({ error: "Rate limit exceeded" });
      }

      const remainingTime = cache.remainingTime || -1;
      cache.remainingTime = remainingTime - 1000;

      if (cache.remainingTime < 0) {
        cache.remainingTime = interval;
        cache[key] = 1;
      } else {
        cache[key] = count;
      }

      if (timeout > 0) {
        setTimeout(() => {
          cache[key] = 0;
        }, timeout);
      }

      return next();
    } catch (error) {
      console.error("Error in rate limiting:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};

module.exports = rateLimit;

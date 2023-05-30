# express-rate-limit-spider

express-rate-limit-spider is a middleware for rate limiting web crawling or spidering activities in Express applications. It allows you to restrict the number of requests made by web crawlers within a specified time interval, helping to prevent excessive crawling and protect your server resources.

Benchmarks: 

- express-rate-limit x 222,950 ops/sec ±29.79% (63 runs sampled)
- express-rate-limit-spider x 504,694,760 ops/sec ±0.41% (90 runs sampled)

Fastest is express-rate-limit-spider

## Installation

You can install express-rate-limit-spider using npm:

```
npm install express-rate-limit-spider
```

## Usage

To use express-rate-limit-spider in your Express application, follow these steps:

1.Import the middleware into your project:

```
const rateLimitSpider = require('express-rate-limit-spider');
```

2.Define the rate limit configuration:

```
const limit = 10; // Maximum number of requests allowed by the spider within the interval
const interval = 60000; // Interval duration in milliseconds (e.g., 60 seconds)
const timeout = 0; // Optional timeout duration in milliseconds (0 for no timeout)
```

3.Apply the middleware to the desired routes:

```
app.use(rateLimitSpider(limit, interval, timeout));
```

The middleware will automatically track and limit the number of requests made by web crawlers based on the specified configuration.

## Configuration Options

The express-rate-limit-spider middleware accepts the following configuration options:

- limit: Maximum number of requests allowed by the spider within the interval.
- interval: Interval duration in milliseconds. The middleware resets the request count for each spider after this interval.
- timeout (optional): Timeout duration in milliseconds. If set to a non-zero value, the request count for each spider will be reset to 0 after this timeout.

## Error Handling

When the rate limit is exceeded by a spider, the middleware responds with a 429 Too Many Requests status code and a JSON object containing an error message:

```
{
  "error": "Rate limit exceeded"
}
```

If an internal server error occurs during rate limiting, the middleware responds with a 500 Internal Server Error status code and a JSON object containing an error message:

```
{
  "error": "Internal server error"
}
```

# Usage Considerations

It's important to note that express-rate-limit-spider identifies spiders based on the User-Agent header in the incoming requests. Make sure that the web crawlers you want to limit have unique and identifiable user agent strings.

## License

MIT
const expressRateLimit = require("express-rate-limit");
const rateLimitSpider = require("./rate-limit.cjs");

const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();

suite.add("express-rate-limit", () => {
  const options = {
    windowMs: 60 * 1000,
    max: 100,
  };
  expressRateLimit(options);
});

suite.add("express-rate-limit-spider", function () {
  const timeWindowInSeconds = 60;
  const maxRequestsPerTimeWindow = 100;
  const delayAfterMaxRequestsInMilliseconds = 5000;
  rateLimitSpider(
    timeWindowInSeconds,
    maxRequestsPerTimeWindow,
    delayAfterMaxRequestsInMilliseconds
  );
});

// Run the test
suite
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: false });

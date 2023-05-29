const expressRateLimit = require("express-rate-limit");
const rateLimitSpider = require("./rate-limit.cjs");

const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();

suite.add("express-rate-limit", () => {
  expressRateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Max requests per minute
  });
});

suite.add("express-rate-limit-spider", function () {
  rateLimitSpider(60, 100, 5000);
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

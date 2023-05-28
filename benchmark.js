const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();

const rateLimit = require("./lib/rateLimit");

// Add the test
suite.add("rateLimit", function () {
  rateLimit(10, 1000, 5000);
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

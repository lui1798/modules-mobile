const { run } = require("./build.js");

const files = ["./public/static/codedata/codedata.min.js"];

run("./build/code-data-build/rollup.main.config.js", files);

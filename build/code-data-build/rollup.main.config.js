import { createEntries } from "./rollup.config";

export default createEntries([
  {
    input: "./modules/common/data/codedata/index.js",
    file: "./public/static/codedata/codedata.min.js",
    format: "umd",
    minify: true,
    env: "production",
  },
]);

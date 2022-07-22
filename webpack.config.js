import { resolve } from "path";

export const entry = "./src/index.js";
export const output = {
  path: resolve(__dirname, "dist"),
  filename: "webpack.bundle.js",
  module: {
    rules: [{ test: /\.txt$/, use: "raw-loader" }],
  },
};

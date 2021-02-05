const path = require("path");

module.exports = {
  webpack: (config) => {
    config.resolve.alias["components"] = path.join(
      __dirname,
      "src",
      "components",
    );
    config.resolve.alias["public"] = path.join(__dirname, "src", "public");
    return config;
  },
};

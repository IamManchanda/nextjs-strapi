const path = require("path");

module.exports = {
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_IMAGES_DOMAIN: process.env.NEXT_PUBLIC_IMAGES_DOMAIN,
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGES_DOMAIN],
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  },
};

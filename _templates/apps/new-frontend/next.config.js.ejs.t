---
to: apps/<%= name %>/next.config.js
---
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui", "utils"],
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
};

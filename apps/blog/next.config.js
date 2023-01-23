module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui", "utils"],
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },

  images: {
    loader: "custom",
    loaderFile: "./loader.js",
    domains: ["cdn.eungyeole.xyz"],
  },
};

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui", "utils"],
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/workspaces/:workspaceId",
        destination: "/workspaces/:workspaceId/posts",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://211.38.86.92:8080/:path*",
      },
    ];
  },
};

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
};

import { MetadataRoute } from "next";

const host = "https://blog.eungyeole.xyz";
function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: host,
    },
  ];
}

export default sitemap;

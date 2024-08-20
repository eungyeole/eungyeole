import { MetadataRoute } from "next";

const host = "https://resume.eungyeole.com";

function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: host,
    },
  ];
}

export default sitemap;

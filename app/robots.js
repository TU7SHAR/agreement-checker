export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://signsafe.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/report/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

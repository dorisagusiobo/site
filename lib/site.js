// The public URL of the site, used for metadata, the sitemap and link previews.
// Set SITE_URL when you have a custom domain; on Vercel the production URL is
// picked up automatically.
export const siteUrl =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

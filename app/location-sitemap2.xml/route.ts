import plaatsen from "@/app/data/plaatsen";
import { topics } from "@/app/data/topics";
import { canonicalSlug, normalize } from "@/lib/slug";

const SITE_URL = (process.env.SITE_URL || "https://mobielehulp.nl").replace(/\/$/, "");
const defaultLocale = "nl";
// Deze dynamic route is momenteel alleen voor NL (zie generateStaticParams in app/[locale]/[...slug]/page.tsx)
const locales = [defaultLocale];
export const revalidate = 86_400; // 1 dag

function buildLocationPaths() {
  const paths = new Set<string>();

  locales.forEach((locale) => {
    // Default locale should not include the locale prefix in the URL
    const prefix = locale === defaultLocale ? "" : `/${locale}`;

    topics.forEach((topic) => {
      plaatsen.forEach((plaats) => {
        paths.add(`${prefix}/${canonicalSlug(topic.baseSlug, plaats)}`);
        paths.add(`${prefix}/${normalize(plaats)}/${topic.baseSlug}`);
      });
    });
  });

  return Array.from(paths);
}

export async function GET() {
  const lastmod = new Date().toISOString();

  const urls = buildLocationPaths()
    .map(
      (path) => `<url><loc>${SITE_URL}${path}</loc><lastmod>${lastmod}</lastmod></url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

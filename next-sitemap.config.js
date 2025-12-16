/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mobielehulp.nl',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 7000, // Auto-split bij >7000 pages
  
  // ✅ AUTO-DETECT ALLE STATIC ROUTES (incl. /nl/plaats/topic)
  transform: async (config, path) => {
    // Exclude dynamische/unwanted paths
    if (path.match(/\/_next|\/api|\/admin|\.json$/)) return null;
    
    // Hoog priority voor location pages
    const isLocationPage = path.match(/\/nl\/[^\/]+\/[^\/]+$/);
    const priority = isLocationPage ? 0.85 : 0.7;
    const changefreq = isLocationPage ? 'weekly' : 'monthly';
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
  
  robotsTxtOptions: {
    policies: [{
      userAgent: '*',
      allow: '/',
      disallow: ['/api/*', '/_next/*']
    }],
    additionalSitemaps: ['https://mobielehulp.nl/sitemaps.xml']
  }
};

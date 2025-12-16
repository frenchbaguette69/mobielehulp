/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mobielehulp.nl',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  
  transform: async (config, path) => {
    // ✅ KILL ALLE BROKEN/NIET-GEWENSTE PATHS
    if (
      path.includes('location-sitemap') ||      // ❌ Broken reference
      path.match(/\/(de|en|fr)\//) ||           // ❌ Andere talen
      path.match(/\/nl\/[^\/]+\/[^\/]+\/.+/) || // ❌ Te diepe nesting
      path.match(/\/_next|\/api|\.json$/)       // ❌ Tech paths
    ) {
      return null;
    }
    
    // ✅ BOOST LOCATION PAGES: /plaats/topic of /nl/plaats/topic
    const isLocationPage = path.match(/(\/[^\/]+\/[^\/]+\/?$)|\/nl\/[^\/]+\/[^\/]+\/?$/);
    const priority = isLocationPage ? 0.9 : (path === '/' ? 1.0 : 0.8);
    const changefreq = isLocationPage ? 'weekly' : 'monthly';
    
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq,
      priority
    };
  },
  
  robotsTxtOptions: {
    policies: [{
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/*', 
        '/_next/*', 
        '/de/*', '/en/*', '/fr/*',      // ✅ NO ANDERE TALEN
        'location-sitemap*'              // ✅ NO BROKEN FILES
      ]
    }],
    additionalSitemaps: ['https://mobielehulp.nl/sitemap.xml'] // ✅ ALLEEN HOOFDMAP
  }
};

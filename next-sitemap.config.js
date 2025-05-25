/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mobielehulp.nl',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap-index.xml'],
  
  // Supported locales
  alternateRefs: [
    {
      href: 'https://mobielehulp.nl',
      hreflang: 'nl',
    },
    {
      href: 'https://mobielehulp.nl/en',
      hreflang: 'en',
    },
    {
      href: 'https://mobielehulp.nl/fr',
      hreflang: 'fr',
    },
    {
      href: 'https://mobielehulp.nl/de',
      hreflang: 'de',
    },
  ],

  // Custom transformation for internationalized routes
  transform: async (config, path) => {
    // Define supported locales
    const locales = ['nl', 'en', 'fr', 'de']
    const defaultLocale = 'nl'
    
    // Base pages that should be included
    const basePages = [
      '/',
      '/diensten',
      '/diensten/pechhulp-en-sleepdienst-europa',
      '/diensten/uit-modder-zand-of-object-slepen',
      '/diensten/accu-service',
      '/diensten/auto-transport',
      '/diensten/lekke-band',
      '/diensten/autoberging-247',
      '/contact',
      '/privacybeleid',
      '/algemene-voorwaarden'
    ]

    // Remove locale prefix from path to get the base path
    let basePath = path
    let currentLocale = defaultLocale
    
    // Check if path starts with a locale
    for (const locale of locales) {
      if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
        currentLocale = locale
        basePath = path.replace(`/${locale}`, '') || '/'
        break
      }
    }

    // Only include defined base pages
    if (!basePages.includes(basePath)) {
      return null
    }

    // Set priority based on page importance
    let priority = 0.7
    if (basePath === '/') priority = 1.0
    if (basePath === '/diensten') priority = 0.9
    if (basePath.startsWith('/diensten/')) priority = 0.8
    if (basePath === '/contact') priority = 0.8

    // Set change frequency based on content type
    let changefreq = 'monthly'
    if (basePath === '/') changefreq = 'weekly'
    if (basePath === '/diensten') changefreq = 'weekly'
    if (basePath.startsWith('/diensten/')) changefreq = 'monthly'
    if (basePath === '/contact') changefreq = 'monthly'

    // Generate alternate language versions
    const alternateRefs = locales
      .filter(locale => locale !== currentLocale)
      .map(locale => ({
        href: `${config.siteUrl}${locale === defaultLocale ? '' : `/${locale}`}${basePath === '/' ? '' : basePath}`,
        hreflang: locale,
      }))

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs,
    }
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '*.json',
        ],
      },
    ],
    additionalSitemaps: [
      'https://mobielehulp.nl/sitemap.xml',
    ],
    transformRobotsTxt: async (_, robotsTxt) => {
      return `${robotsTxt}

# Additional crawl optimization
Crawl-delay: 1

# Important pages
Sitemap: https://mobielehulp.nl/sitemap.xml

# Contact information
# 24/7 Pechhulp & Mobiele Hulp Nederland
# Tel: 085-250 29 28
# Email: info@mobielehulp.nl`
    }
  },

  // Additional sitemap configuration
  additionalPaths: async (config) => {
    const locales = ['nl', 'en', 'fr', 'de']
    const services = [
      'pechhulp-en-sleepdienst-europa',
      'uit-modder-zand-of-object-slepen',
      'accu-service',
      'auto-transport',
      'lekke-band',
      'autoberging-247'
    ]

    const additionalPaths = []

    // Generate paths for all locale combinations
    locales.forEach(locale => {
      const localePrefix = locale === 'nl' ? '' : `/${locale}`
      
      // Main pages
      additionalPaths.push({
        loc: `${localePrefix}/`,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      })

      additionalPaths.push({
        loc: `${localePrefix}/diensten`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      })

      additionalPaths.push({
        loc: `${localePrefix}/contact`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      })

      // Service pages
      services.forEach(service => {
        additionalPaths.push({
          loc: `${localePrefix}/diensten/${service}`,
          changefreq: 'monthly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        })
      })
    })

    return additionalPaths
  }
}
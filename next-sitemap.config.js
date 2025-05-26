// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: process.env.SITE_URL || 'https://mobielehulp.nl',
//   generateRobotsTxt: true,
//   generateIndexSitemap: false,
//   exclude: ['/server-sitemap-index.xml'],
  
//   // Supported locales
//   alternateRefs: [
//     {
//       href: 'https://mobielehulp.nl',
//       hreflang: 'nl',
//     },
//     {
//       href: 'https://mobielehulp.nl/en',
//       hreflang: 'en',
//     },
//     {
//       href: 'https://mobielehulp.nl/fr',
//       hreflang: 'fr',
//     },
//     {
//       href: 'https://mobielehulp.nl/de',
//       hreflang: 'de',
//     },
//   ],

//   // Custom transformation for internationalized routes
//   transform: async (config, path) => {
//     // Define supported locales
//     const locales = ['nl', 'en', 'fr', 'de']
//     const defaultLocale = 'nl'
    
//     // Base pages that should be included
//     const basePages = [
//       '/',
//       '/diensten',
//       '/diensten/pechhulp-en-sleepdienst-europa',
//       '/diensten/uit-modder-zand-of-object-slepen',
//       '/diensten/accu-service',
//       '/diensten/auto-transport',
//       '/diensten/lekke-band',
//       '/diensten/autoberging-247',
//       '/contact',
//       '/privacybeleid',
//       '/algemene-voorwaarden'
//     ]

//     // Remove locale prefix from path to get the base path
//     let basePath = path
//     let currentLocale = defaultLocale
    
//     // Check if path starts with a locale
//     for (const locale of locales) {
//       if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
//         currentLocale = locale
//         basePath = path.replace(`/${locale}`, '') || '/'
//         break
//       }
//     }

//     // Only include defined base pages
//     if (!basePages.includes(basePath)) {
//       return null
//     }

//     // Set priority based on page importance
//     let priority = 0.7
//     if (basePath === '/') priority = 1.0
//     if (basePath === '/diensten') priority = 0.9
//     if (basePath.startsWith('/diensten/')) priority = 0.8
//     if (basePath === '/contact') priority = 0.8

//     // Set change frequency based on content type
//     let changefreq = 'monthly'
//     if (basePath === '/') changefreq = 'weekly'
//     if (basePath === '/diensten') changefreq = 'weekly'
//     if (basePath.startsWith('/diensten/')) changefreq = 'monthly'
//     if (basePath === '/contact') changefreq = 'monthly'

//     // Generate alternate language versions
//     const alternateRefs = locales
//       .filter(locale => locale !== currentLocale)
//       .map(locale => ({
//         href: `${config.siteUrl}${locale === defaultLocale ? '' : `/${locale}`}${basePath === '/' ? '' : basePath}`,
//         hreflang: locale,
//       }))

//     return {
//       loc: path,
//       changefreq,
//       priority,
//       lastmod: new Date().toISOString(),
//       alternateRefs,
//     }
//   },

//   robotsTxtOptions: {
//     policies: [
//       {
//         userAgent: '*',
//         allow: '/',
//         disallow: [
//           '/api/',
//           '/_next/',
//           '/admin/',
//           '*.json',
//         ],
//       },
//     ],
//     additionalSitemaps: [
//       'https://mobielehulp.nl/sitemap.xml',
//     ],
//     transformRobotsTxt: async (_, robotsTxt) => {
//       return `${robotsTxt}

// # Additional crawl optimization
// Crawl-delay: 1

// # Important pages
// Sitemap: https://mobielehulp.nl/sitemap.xml

// # Contact information
// # 24/7 Pechhulp & Mobiele Hulp Nederland
// # Tel: 085-250 29 28
// # Email: info@mobielehulp.nl`
//     }
//   },

//   // Additional sitemap configuration
//   additionalPaths: async (config) => {
//     const locales = ['nl', 'en', 'fr', 'de']
//     const services = [
//       'pechhulp-en-sleepdienst-europa',
//       'uit-modder-zand-of-object-slepen',
//       'accu-service',
//       'auto-transport',
//       'lekke-band',
//       'autoberging-247'
//     ]

//     const additionalPaths = []

//     // Generate paths for all locale combinations
//     locales.forEach(locale => {
//       const localePrefix = locale === 'nl' ? '' : `/${locale}`
      
//       // Main pages
//       additionalPaths.push({
//         loc: `${localePrefix}/`,
//         changefreq: 'weekly',
//         priority: 1.0,
//         lastmod: new Date().toISOString(),
//       })

//       additionalPaths.push({
//         loc: `${localePrefix}/diensten`,
//         changefreq: 'weekly',
//         priority: 0.9,
//         lastmod: new Date().toISOString(),
//       })

//       additionalPaths.push({
//         loc: `${localePrefix}/contact`,
//         changefreq: 'monthly',
//         priority: 0.8,
//         lastmod: new Date().toISOString(),
//       })

//       // Service pages
//       services.forEach(service => {
//         additionalPaths.push({
//           loc: `${localePrefix}/diensten/${service}`,
//           changefreq: 'monthly',
//           priority: 0.8,
//           lastmod: new Date().toISOString(),
//         })
//       })
//     })

//     return additionalPaths
//   }
// }

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

    // SEO keyword pages
    const seoKeywords = [
      'car-transport',
      'auto-pech',
      'sleepdienst-auto',
      'auto-berging',
      'slepen-auto',
      'sleepbedrijf',
      'auto-weg-laten-slepen',
      'takelbedrijf',
      'sleepwagen',
      'takelwagen',
      'sleepdienst',
      'pechhulp',
      'wat-te-doen-als-je-auto-vast-zit-in-de-modder',
      'auto-uit-modder-slepen',
      'vast-in-modder-auto',
      'auto-vast-in-modder',
      'vast-in-sneeuw-auto',
      'auto-vast-in-sneeuw',
      'auto-in-de-sloot-vandaag',
      'auto-belandt-in-sloot',
      'auto-in-sloot-vandaag',
      'auto-in-de-sloot',
      'auto-in-sloot',
      'auto-in-de-greppel',
      'auto-vast-in-gras',
      'auto-uit-de-modder-halen',
      'auto-vast-in-zand',
      'auto-vastgereden-in-modder',
      'car-stuck-in-the-mud',
      'auto-in-de-berm',
      'vast-in-de-modder',
      'auto-zit-vast-in-modder',
      'hoe-krijg-je-een-auto-uit-de-modder',
      'vast-in-de-modder-met-auto',
      'auto-in-de-modder',
      'auto-staat-vast-in-de-modder',
      'accu-auto-leeg',
      'auto-accu-leeg-wat-nu',
      'service-accu',
      'accu-service-aan-huis',
      'accu-vervangen-aan-huis',
      'accuservice',
      'vervangen-accu-auto',
      'accu-vervangen-auto',
      'auto-accu-vervangen-aan-huis',
      'accu-auto-vervangen',
      'accu-laten-vervangen-aan-huis',
      'auto-accu-vervangen',
      'accu-laten-vervangen'
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

    // Check if it's a SEO keyword page
    const isSeoKeyword = seoKeywords.some(keyword => basePath === `/${keyword}`)

    // Only include defined base pages or SEO keyword pages
    if (!basePages.includes(basePath) && !isSeoKeyword) {
      return null
    }

    // Set priority based on page importance
    let priority = 0.7
    if (basePath === '/') priority = 1.0
    if (basePath === '/diensten') priority = 0.9
    if (basePath.startsWith('/diensten/')) priority = 0.8
    if (basePath === '/contact') priority = 0.8
    if (isSeoKeyword) priority = 0.8 // High priority for SEO pages

    // Set change frequency based on content type
    let changefreq = 'monthly'
    if (basePath === '/') changefreq = 'weekly'
    if (basePath === '/diensten') changefreq = 'weekly'
    if (basePath.startsWith('/diensten/')) changefreq = 'monthly'
    if (basePath === '/contact') changefreq = 'monthly'
    if (isSeoKeyword) changefreq = 'weekly' // More frequent updates for SEO

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

    // SEO keywords for additional paths
    const seoKeywords = [
      'car-transport',
      'auto-pech',
      'sleepdienst-auto',
      'auto-berging',
      'slepen-auto',
      'sleepbedrijf',
      'auto-weg-laten-slepen',
      'takelbedrijf',
      'sleepwagen',
      'takelwagen',
      'sleepdienst',
      'pechhulp',
      'wat-te-doen-als-je-auto-vast-zit-in-de-modder',
      'auto-uit-modder-slepen',
      'vast-in-modder-auto',
      'auto-vast-in-modder',
      'vast-in-sneeuw-auto',
      'auto-vast-in-sneeuw',
      'auto-in-de-sloot-vandaag',
      'auto-belandt-in-sloot',
      'auto-in-sloot-vandaag',
      'auto-in-de-sloot',
      'auto-in-sloot',
      'auto-in-de-greppel',
      'auto-vast-in-gras',
      'auto-uit-de-modder-halen',
      'auto-vast-in-zand',
      'auto-vastgereden-in-modder',
      'car-stuck-in-the-mud',
      'auto-in-de-berm',
      'vast-in-de-modder',
      'auto-zit-vast-in-modder',
      'hoe-krijg-je-een-auto-uit-de-modder',
      'vast-in-de-modder-met-auto',
      'auto-in-de-modder',
      'auto-staat-vast-in-de-modder',
      'accu-auto-leeg',
      'auto-accu-leeg-wat-nu',
      'service-accu',
      'accu-service-aan-huis',
      'accu-vervangen-aan-huis',
      'accuservice',
      'vervangen-accu-auto',
      'accu-vervangen-auto',
      'auto-accu-vervangen-aan-huis',
      'accu-auto-vervangen',
      'accu-laten-vervangen-aan-huis',
      'auto-accu-vervangen',
      'accu-laten-vervangen'
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

      // SEO keyword pages
      seoKeywords.forEach(keyword => {
        additionalPaths.push({
          loc: `${localePrefix}/${keyword}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        })
      })
    })

    return additionalPaths
  }
}
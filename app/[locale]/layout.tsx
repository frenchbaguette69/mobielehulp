import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import Header from "@/components/Header"
import { getDictionary } from "./dictionaries"
import { ArrowRight, Phone } from "lucide-react"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Car World - International",
  description: "Discover amazing cars from around the world",
  verification: {
    google: "XFiQUA1j5_eK1-9joM-BZ01x_ltZ4cBDdhiFSBKTqhA",
  },
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "nl" }, { locale: "fr" }, { locale: "de" }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "nl" | "fr" | "de");

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WCP9CXRZ');
          `,
        }}
      />
      
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-WCP9CXRZ"
          height="0" 
          width="0" 
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      
      <div className={inter.className} lang={locale}>
        <Header locale={locale} dict={dict} />
        {children}
        <footer className="bg-black text-white py-16">
                <div className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-4">
                  {/* Logo en beschrijving */}
                  <div className="col-span-2">
                    <div className="text-2xl font-bold mb-2">Pechhulp Nederland</div>
                    <p className="text-sm text-white mb-4">
                      Pechhulp Nederland is jouw betrouwbare partner bij autopech, waar
                      je ook bent.
                    </p>
                    <div className="flex items-center gap-3 text-[#c8eb67]">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.4 8.168L12 18.897l-7.334 3.864 1.4-8.168L.132 9.211l8.2-1.193z" />
                        </svg>
                      ))}
                      <span className="text-white ml-2 text-sm">
                        4.9/5 (2.847 reviews)
                      </span>
                    </div>
                    <div className="pt-8 flex flex-col gap-4">
                      {" "}
                      <a
                        href="tel:0881234567"
                        className="w-full mb-4 max-w-xs sm:w-auto inline-flex items-center justify-between px-6 py-3 bg-white text-black rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition-all group"
                      >
                        <span className="flex items-center gap-2 font-medium text-base">
                          {dict.pechhulp.hero.cta}
                        </span>
                        <span className="ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-black text-white group-hover:scale-105 transition-transform">
                          <Phone className="w-4 h-4" />
                        </span>
                      </a>
                      <Link
                        href="/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full max-w-xs sm:w-auto inline-flex items-center justify-between rounded-full bg-white text-black border border-gray-300 hover:shadow-md px-6 py-3 font-medium transition-all group"
                      >
                        <span className="mr-2">WhatsApp ons</span>
                        <div className="w-8 h-8 rounded-full bg-[#c8eb67] text-black flex items-center justify-center transition-transform group-hover:translate-x-1">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Link>
                    </div>
                  </div>
        
                  {/* Diensten links */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Diensten</h4>
                    <ul className="space-y-2 text-sm text-white">
                      <li>
                        <a href="/diensten/pechhulp-en-sleepdienst-europa">
                          Pechhulp & Sleepdienst Europa
                        </a>
                      </li>
                      <li>
                        <a href="/diensten/uit-modder-zand-of-object-slepen">
                          Uit modder, zand of object slepen
                        </a>
                      </li>
                      <li>
                        <a href="/diensten/accu-service">Accu service</a>
                      </li>
                      <li>
                        <a href="/diensten/auto-transport">Auto transport</a>
                      </li>
                      <li>
                        <a href="/diensten/lekke-band">Lekke band</a>
                      </li>
                      <li>
                        <a href="/diensten/autoberging-247">Autoberging 24/7</a>
                      </li>
                      <li>
                        <a href="/blog">Blog</a>
                      </li>
                    </ul>
                  </div>
        
                  {/* Contact + CTA */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Contactgegevens</h4>
                    <ul className="space-y-2 text-sm text-white">
                      <li className="flex items-center gap-2">info@mobielehulp.nl</li>
                      <li className="flex items-center gap-2">24/7 bereikbaar</li>
                      <li className="flex items-center gap-2">Heel Europa</li>
                    </ul>
                  </div>
                </div>
        
                <div className="mt-12 pt-6 text-sm text-gray-700 text-center border-t border-black/10">
            
                  <a href="/algemene-voorwaarden" className="hover:underline mx-2">
                    Algemene voorwaarden
                  </a>{""}
                  •
                  <a href="/sitemap.xml" className="hover:underline">
                    Sitemap
                  </a>
                  <br />
                  <span className="block mt-2">
                    © 2025 Pechhulp Nederland. Alle rechten voorbehouden.
                  </span>
                </div>
              </footer>
      </div>
    </>
  )
}
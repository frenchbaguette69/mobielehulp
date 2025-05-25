import { getDictionary } from "../dictionaries"
import { Phone, ArrowRight, Clock, MapPin, Shield, Wrench, Car, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { FAQSection } from "@/components/FAQsection"
import LocationButton from "@/components/locationbutton"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as "nl" | "en" | "fr" | "de")

  return {
    title: dict.diensten?.seo?.title || "Onze Diensten - 24/7 Pechhulp & Mobiele Service | Mobiele Hulp",
    description: dict.diensten?.seo?.description || "Ontdek alle pechhulp diensten: sleepdienst, accu service, lekke band, auto transport en meer. 24/7 bereikbaar door heel Europa.",
    keywords: dict.diensten?.seo?.keywords || "pechhulp diensten, sleepdienst, accu service, lekke band, auto transport, autoberging, mobiele hulp",
    openGraph: {
      title: dict.diensten?.seo?.title || "Onze Diensten - 24/7 Pechhulp & Mobiele Service",
      description: dict.diensten?.seo?.description || "Ontdek alle pechhulp diensten: sleepdienst, accu service, lekke band, auto transport en meer.",
      type: "website",
      images: [
        {
          url: "/services/1.jpg",
          width: 1200,
          height: 630,
          alt: dict.diensten?.seo?.imageAlt || "Pechhulp diensten overzicht",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.diensten?.seo?.title || "Onze Diensten - 24/7 Pechhulp & Mobiele Service",
      description: dict.diensten?.seo?.description || "Ontdek alle pechhulp diensten: sleepdienst, accu service, lekke band, auto transport en meer.",
      images: ["/services/1.jpg"],
    },
    alternates: {
      canonical: `/${locale}/diensten`,
    },
  }
}

export default async function DienstenPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as "nl" | "en" | "fr" | "de")

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-32 overflow-hidden flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#c8eb67] text-black px-4 py-2 rounded-full text-sm font-medium">
                  <Car className="w-4 h-4" />
                  {dict.diensten?.hero?.badge || "Onze Diensten"}
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">{dict.diensten?.hero?.title?.part1 || "24/7 Pechhulp"}</span>
                  <br />
                  <span className="text-[#c8eb67]">{dict.diensten?.hero?.title?.part2 || "& Mobiele Service"}</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
                  {dict.diensten?.hero?.subtitle ||
                    "Ontdek onze complete range van pechhulp en mobiele services. Van sleepdienst tot accu vervanging - wij staan 24/7 voor u klaar door heel Europa."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <a
                  href={`tel:${dict.diensten?.hero?.phone || "0852502928"}`}
                  className="w-full max-w-xs sm:w-auto inline-flex items-center justify-between px-8 py-4 bg-[#c8eb67] text-black rounded-full shadow-lg hover:bg-[#b8db57] transition-all group text-lg font-semibold"
                >
                  <span className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    {dict.diensten?.hero?.cta || "Bel Direct: 085-250 29 28"}
                  </span>
                </a>

                <Link
                  href="https://wa.me/31850609880"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs sm:w-auto inline-flex items-center justify-between rounded-full bg-white text-black border border-gray-300 hover:shadow-lg px-8 py-4 font-semibold transition-all group text-lg"
                >
                  <span className="mr-3">{dict.diensten?.hero?.whatsapp || "WhatsApp Contact"}</span>
                  <div className="w-10 h-10 rounded-full bg-[#c8eb67] text-black flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {dict.diensten?.services?.title || "Onze Pechhulp Diensten"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {dict.diensten?.services?.subtitle ||
                "We zijn gespecialiseerd in directe, mobiele hulp bij pech. Van bandenservice tot sleepdienst – wij staan 24/7 klaar om je weer op weg te helpen."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dict.diensten?.services?.items?.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <Link
                    href={service.href}
                    className="inline-flex items-center justify-between w-full px-6 py-3 bg-gray-50 hover:bg-[#c8eb67] text-gray-900 hover:text-black rounded-xl transition-all duration-300 group/btn font-semibold"
                  >
                    <span>{service.button}</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {dict.diensten?.why?.title || "Waarom Kiezen Voor Onze Diensten?"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {dict.diensten?.why?.subtitle ||
                "Met jarenlange ervaring en een netwerk door heel Europa bieden wij de meest betrouwbare pechhulp en mobiele services voor elke situatie."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dict.diensten?.why?.items?.map((feature, index) => {
              const icons = [Clock, Shield, MapPin]
              const IconComponent = icons[index]
              
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className="w-16 h-16 bg-[#c8eb67] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {IconComponent && <IconComponent className="w-8 h-8 text-black" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {dict.diensten?.coverage?.title || "Service Door Heel Europa"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {dict.diensten?.coverage?.description ||
                "Onze pechhulp en mobiele services zijn beschikbaar in alle belangrijke Europese landen. Waar u ook bent, wij komen u helpen."}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {dict.pechhulp?.coverage?.areas?.map((country, index) => (
              <div
                key={index}
                className="bg-black p-6 rounded-xl text-center hover:bg-[#c8eb67] hover:text-black transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="font-semibold">{country}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Sharing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="md:w-3/5 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {dict.diensten?.locatiesectie?.title || "Deel Uw Locatie Voor Snelle Hulp"}
            </h2>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              {dict.diensten?.locatiesectie?.description ||
                "Door uw locatie te delen kunnen wij u nog sneller vinden en helpen. Onze monteurs gebruiken GPS om de kortste route naar u toe te vinden en de juiste service te leveren."}
            </p>
            <LocationButton
              dict={dict.pechhulp?.locatiebutton || { sendLocation: "Deel Locatie", loading: "Laden..." }}
            />
          </div>

          <div className="md:w-2/5 flex justify-center">
            <Image
              src="/location.gif"
              alt={dict.diensten?.locatiesectie?.imageAlt || "Locatie delen voor snelle hulp"}
              width={200}
              height={200}
              className="w-40 md:w-48 h-auto rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-20 bg-[#c8eb67] text-black relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <AlertTriangle className="h-24 w-24 mx-auto mb-8 text-black" />
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              {dict.diensten?.emergency?.title || "Hulp Nodig? Bel Direct!"}
            </h2>
            <p className="text-2xl text-black mb-12 max-w-3xl mx-auto">
              {dict.diensten?.emergency?.subtitle ||
                "Voor alle pechhulp en mobiele services - 24/7 bereikbaar door heel Europa. Geen wachttijden, directe professionele hulp."}
            </p>
          </div>

          <div className="bg-black rounded-3xl p-12 mb-16 max-w-lg mx-auto">
            <Phone className="h-16 w-16 mx-auto mb-6 text-white" />
            <a href={`tel:0852502928`}>
              <div className="text-5xl md:text-6xl text-white font-bold mb-4">
                {dict.diensten?.emergency?.phone || "085-250 29 28"}
              </div>
            </a>
            <div className="text-white text-xl">
              {dict.diensten?.emergency?.phoneSubtitle || "Direct verbonden met onze servicecentrale"}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {dict.diensten?.emergency?.stats?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            )) || (
              <>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{"< 30 min"}</div>
                  <div className="text-lg">Gemiddelde responstijd</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-lg">Altijd bereikbaar</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">€0</div>
                  <div className="text-lg">Geen abonnementskosten</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection dict={dict} />

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-4">
          <div className="col-span-2">
            <div className="text-2xl font-bold mb-4">{dict.footer?.brandName || "Pechhulp Nederland"}</div>
            <p className="text-gray-300 mb-6 text-lg">
              {dict.footer?.description ||
                "Uw betrouwbare partner voor alle pechhulp en mobiele services. 24/7 bereikbaar door heel Europa voor elke situatie."}
            </p>
            <div className="flex items-center gap-3 text-[#c8eb67] mb-8">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.4 8.168L12 18.897l-7.334 3.864 1.4-8.168L.132 9.211l8.2-1.193z" />
                </svg>
              ))}
              <span className="text-gray-300 ml-2">{dict.footer?.rating || "4.9/5 (2.847 reviews)"}</span>
            </div>
            <div className="flex flex-col gap-4">
              <a
                href={`tel:${dict.diensten?.hero?.phone || "0852502928"}`}
                className="w-full max-w-xs inline-flex items-center justify-between px-6 py-3 bg-[#c8eb67] text-black rounded-full shadow-md hover:bg-[#b8db57] transition-all group font-semibold"
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {dict.diensten?.hero?.phone || "085-250 29 28"}
                </span>
              </a>
              <Link
                href="https://wa.me/31850609880"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-xs inline-flex items-center justify-between rounded-full bg-white text-black border border-gray-300 hover:shadow-md px-6 py-3 font-medium transition-all group"
              >
                <span className="mr-2">{dict.diensten?.hero?.whatsapp || "WhatsApp Contact"}</span>
                <div className="w-8 h-8 rounded-full bg-[#c8eb67] text-black flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{dict.footer?.servicesTitle || "Onze Diensten"}</h4>
            <ul className="space-y-3 text-gray-300">
              {dict.diensten?.services?.items?.map((service, index) => (
                <li key={index}>
                  <Link href={service.href || "#"} className="hover:text-[#c8eb67] transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{dict.footer?.contactTitle || "Contact & Info"}</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {dict.diensten?.hero?.phone || "085-250 29 28"}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {dict.footer?.availability || "24/7 bereikbaar"}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {dict.footer?.serviceArea || "Heel Europa"}
              </li>
              <li>{dict.footer?.email || "info@mobielehulp.nl"}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 text-center border-t border-gray-800">
          <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm">
            <Link href="/privacybeleid" className="text-gray-300 hover:text-[#c8eb67] transition-colors">
              {dict.footer?.links?.privacy || "Privacybeleid"}
            </Link>
            <Link href="/algemene-voorwaarden" className="text-gray-300 hover:text-[#c8eb67] transition-colors">
              {dict.footer?.links?.terms || "Algemene voorwaarden"}
            </Link>
            <Link href="/sitemap" className="text-gray-300 hover:text-[#c8eb67] transition-colors">
              {dict.footer?.links?.sitemap || "Sitemap"}
            </Link>
          </div>
          <p className="text-gray-400">
            {dict.footer?.copyright || "© 2025 Pechhulp Nederland. Alle rechten voorbehouden."}
          </p>
        </div>
      </footer>
    </div>
  )
}
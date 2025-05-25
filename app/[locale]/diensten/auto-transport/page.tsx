import { getDictionary } from "../../dictionaries"
import { Phone, ArrowRight, Clock, MapPin, Shield, Wrench, Car, AlertTriangle, Truck, Package, Users, Award } from "lucide-react"
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
    title: dict.autotransport?.seo?.title || "Auto Transport - 24/7 Betrouwbare Voertuig Transport | Mobiele Hulp",
    description: dict.autotransport?.seo?.description || "Professionele autotransportservice voor nationaal en internationaal vervoer. Veilig, snel en betrouwbaar transport van uw voertuig naar elke gewenste locatie.",
    keywords: dict.autotransport?.seo?.keywords || "auto transport, voertuig vervoer, nationaal transport, internationaal transport, auto verschepen, voertuig transport, betrouwbaar transport",
    openGraph: {
      title: dict.autotransport?.seo?.title || "Auto Transport - 24/7 Betrouwbare Voertuig Transport",
      description: dict.autotransport?.seo?.description || "Professionele autotransportservice voor nationaal en internationaal vervoer. Veilig, snel en betrouwbaar.",
      type: "website",
      images: [
        {
          url: "/services/4.jpg",
          width: 1200,
          height: 630,
          alt: dict.autotransport?.seo?.imageAlt || "Professionele auto transport service",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.autotransport?.seo?.title || "Auto Transport - 24/7 Betrouwbare Voertuig Transport",
      description: dict.autotransport?.seo?.description || "Professionele autotransportservice voor nationaal en internationaal vervoer. Veilig, snel en betrouwbaar.",
      images: ["/services/4.jpg"],
    },
    alternates: {
      canonical: `/${locale}/diensten/auto-transport`,
    },
  }
}

export default async function AutoTransportService({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as "nl" | "en" | "fr" | "de")

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative text-white py-32 overflow-hidden flex items-center"
        style={{
          backgroundImage: "url(/services/4.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "70vh",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#c8eb67] text-black px-4 py-2 rounded-full text-sm font-medium">
                  <Truck className="w-4 h-4" />
                  {dict.autotransport?.hero?.badge || "Auto Transport"}
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">{dict.autotransport?.hero?.title?.part1 || "Auto Transport"}</span>
                  <br />
                  <span className="text-[#c8eb67]">{dict.autotransport?.hero?.title?.part2 || "Nationaal & Internationaal"}</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl">
                  {dict.autotransport?.hero?.subtitle ||
                    "Onze autotransportservice zorgt ervoor dat uw voertuig snel en veilig op de afgesproken locatie wordt afgeleverd. Nationaal en internationaal transport met volledige verzekering."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <a
                  href={`tel:${dict.autotransport?.hero?.phone || "0852502928"}`}
                  className="w-full max-w-xs sm:w-auto inline-flex items-center justify-between px-8 py-4 bg-[#c8eb67] text-black rounded-full shadow-lg hover:bg-[#b8db57] transition-all group text-lg font-semibold"
                >
                  <span className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    {dict.autotransport?.hero?.cta || "Bel Direct: 085-250 29 28"}
                  </span>
                </a>

                <Link
                  href="https://wa.me/31850609880"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs sm:w-auto inline-flex items-center justify-between rounded-full bg-white text-black border border-gray-300 hover:shadow-lg px-8 py-4 font-semibold transition-all group text-lg"
                >
                  <span className="mr-3">{dict.autotransport?.hero?.whatsapp || "WhatsApp Hulp"}</span>
                  <div className="w-10 h-10 rounded-full bg-[#c8eb67] text-black flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {dict.autotransport?.features?.title || "Waarom Onze Auto Transport Service?"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {dict.autotransport?.features?.subtitle ||
                "Met moderne transportvoertuigen en ervaren chauffeurs zorgen wij voor veilig en betrouwbaar transport van uw voertuig naar elke gewenste bestemming."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dict.autotransport?.features?.items?.map((feature, index) => {
              const icons = [Shield, Truck, Clock, Users]
              const IconComponent = icons[index]
              
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-[#c8eb67] rounded-2xl flex items-center justify-center mb-6">
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

      {/* Service Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                {dict.autotransport?.serviceDetails?.title || "Complete Auto Transport Service"}
              </h2>
              <div className="space-y-6">
                {dict.autotransport?.serviceDetails?.items?.map((service, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#c8eb67] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Image
                src="/services/4.jpg"
                alt={dict.autotransport?.serviceDetails?.imageAlt || "Professionele auto transport service"}
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Transport Types */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {dict.autotransport?.situations?.title || "Transport Mogelijkheden"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {dict.autotransport?.situations?.description ||
                "Van lokaal transport tot internationale verhuizingen - wij bieden transport voor alle soorten voertuigen naar elke gewenste bestemming."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dict.autotransport?.situations?.items?.map((situation, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-[#c8eb67] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Package className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{situation.title}</h3>
                <p className="text-gray-600">{situation.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Sharing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="md:w-3/5 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {dict.autotransport?.locatiesectie?.title || "Deel Ophaal- en Afleverlocatie"}
            </h2>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              {dict.autotransport?.locatiesectie?.description ||
                "Heeft u auto transport nodig? Deel de ophaal- en afleverlocatie zodat wij u een accurate offerte kunnen geven en het transport kunnen plannen."}
            </p>
            <LocationButton
              dict={dict.autotransport?.locatiebutton || { sendLocation: "Deel Locatie", loading: "Laden..." }}
            />
          </div>

          <div className="md:w-2/5 flex justify-center">
            <Image
              src="/location.gif"
              alt={dict.autotransport?.locatiesectie?.imageAlt || "Locatie delen voor auto transport"}
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
              {dict.autotransport?.emergency?.title || "Auto Transport Nodig? Bel Direct!"}
            </h2>
            <p className="text-2xl text-black mb-12 max-w-3xl mx-auto">
              {dict.autotransport?.emergency?.subtitle ||
                "24/7 bereikbaar voor auto transport. Nationaal en internationaal, snel en veilig naar elke bestemming."}
            </p>
          </div>

          <div className="bg-black rounded-3xl p-12 mb-16 max-w-lg mx-auto">
            <Phone className="h-16 w-16 mx-auto mb-6 text-white" />
            <a href={`tel:0852502928`}>
              <div className="text-5xl md:text-6xl text-white font-bold mb-4">
                {dict.autotransport?.emergency?.phone || "085-250 29 28"}
              </div>
            </a>
            <div className="text-white text-xl">
              {dict.autotransport?.emergency?.phoneSubtitle || "Direct verbonden met onze transport specialisten"}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {dict.autotransport?.emergency?.stats?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
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
                "Uw betrouwbare partner voor auto transport en voertuig vervoer. Nationaal en internationaal transport met volledige verzekering."}
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
                href={`tel:${dict.autotransport?.hero?.phone || "0852502928"}`}
                className="w-full max-w-xs inline-flex items-center justify-between px-6 py-3 bg-[#c8eb67] text-black rounded-full shadow-md hover:bg-[#b8db57] transition-all group font-semibold"
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {dict.autotransport?.hero?.phone || "085-250 29 28"}
                </span>
              </a>
              <Link
                href="https://wa.me/31850609880"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-xs inline-flex items-center justify-between rounded-full bg-white text-black border border-gray-300 hover:shadow-md px-6 py-3 font-medium transition-all group"
              >
                <span className="mr-2">{dict.autotransport?.hero?.whatsapp || "WhatsApp Hulp"}</span>
                <div className="w-8 h-8 rounded-full bg-[#c8eb67] text-black flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{dict.footer?.servicesTitle || "Onze Diensten"}</h4>
            <ul className="space-y-3 text-gray-300">
              {dict.pechhulp?.servicegrid?.items?.map((service, index) => (
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
                {dict.autotransport?.hero?.phone || "085-250 29 28"}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {dict.footer?.availability || "24/7 bereikbaar"}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {dict.footer?.serviceArea || "Nationaal & Internationaal"}
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
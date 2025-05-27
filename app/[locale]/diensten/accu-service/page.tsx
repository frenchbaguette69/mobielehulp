import { getDictionary } from "../../dictionaries"
import { Phone, ArrowRight, Clock, MapPin, Shield, Wrench, Car, AlertTriangle, Battery, Zap, Settings, Users, Award } from "lucide-react"
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
    title: dict.accuservice.seo?.title || "Accu Service - 24/7 Professionele Accuhulp | Mobiele Hulp",
    description: dict.accuservice.seo?.description || "Snelle en betrouwbare accuhulp voor alle voertuigen. 24/7 bereikbaar, nieuwe accu's ter plekke, professionele vervanging. Direct hulp bij lege accu.",
    keywords: dict.accuservice.seo?.keywords || "accu service, lege accu, accu vervangen, startproblemen, accuhulp, 24/7 service, mobiele accu service, auto accu",
    openGraph: {
      title: dict.accuservice.seo?.title || "Accu Service - 24/7 Professionele Accuhulp",
      description: dict.accuservice.seo?.description || "Snelle en betrouwbare accuhulp voor alle voertuigen. 24/7 bereikbaar, nieuwe accu's ter plekke.",
      type: "website",
      images: [
        {
          url: "/services/3.jpg",
          width: 1200,
          height: 630,
          alt: dict.accuservice.seo?.imageAlt || "Professionele accu service",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.accuservice.seo?.title || "Accu Service - 24/7 Professionele Accuhulp",
      description: dict.accuservice.seo?.description || "Snelle en betrouwbare accuhulp voor alle voertuigen. 24/7 bereikbaar, nieuwe accu's ter plekke.",
      images: ["/services/3.jpg"],
    },
    alternates: {
      canonical: `/${locale}/diensten/accu-service`,
    },
  }
}

export default async function AccuService({
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
          backgroundImage: "url(/services/3.jpg)",
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
                  <Battery className="w-4 h-4" />
                  {dict.accuservice.hero?.badge || "Accu Service"}
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">{dict.accuservice.hero?.title?.part1 || "Accu Service"}</span>
                  <br />
                  <span className="text-[#c8eb67]">{dict.accuservice.hero?.title?.part2 || "24/7 Accuhulp"}</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl">
                  {dict.accuservice.hero?.subtitle ||
                    "Snelle en betrouwbare accuhulp zodat je voertuig in no-time weer operationeel is. Nieuwe accu's ter plekke, professionele vervanging en direct hulp bij startproblemen."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <a
                  href={`tel:${dict.accuservice.hero?.phone || "0852502928"}`}
                  className="w-full max-w-xs sm:w-auto inline-flex items-center justify-between px-8 py-4 bg-[#c8eb67] text-black rounded-full shadow-lg hover:bg-[#b8db57] transition-all group text-lg font-semibold"
                >
                  <span className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    {dict.accuservice.hero?.cta || "Bel Direct: 085-250 29 28"}
                  </span>
                </a>

                <Link
                  href="https://wa.me/31850609880"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs sm:w-auto inline-flex items-center justify-between rounded-full bg-white text-black border border-gray-300 hover:shadow-lg px-8 py-4 font-semibold transition-all group text-lg"
                >
                  <span className="mr-3">{dict.accuservice.hero?.whatsapp || "WhatsApp Hulp"}</span>
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
              {dict.accuservice.features?.title || "Waarom Onze Accu Service?"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {dict.accuservice.features?.subtitle ||
                "Met hoogwaardige accu's en professionele apparatuur zorgen wij ervoor dat uw voertuig snel weer start. Van diagnose tot vervanging - alles ter plekke."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dict.accuservice.features?.items?.map((feature, index) => {
              const icons = [Zap, Shield, Settings, Clock]
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
                {dict.accuservice.serviceDetails?.title || "Complete Accu Service"}
              </h2>
              <div className="space-y-6">
                {dict.accuservice.serviceDetails?.items?.map((service, index) => (
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
                src="/services/3.jpg"
                alt={dict.accuservice.serviceDetails?.imageAlt || "Professionele accu service"}
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Battery Problems We Solve */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {dict.accuservice.situations?.title || "Accu Problemen Die Wij Oplossen"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {dict.accuservice.situations?.description ||
                "Van een lege accu tot complete accu vervanging - wij hebben de expertise en apparatuur voor alle accu gerelateerde problemen van uw voertuig."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dict.accuservice.situations?.items?.map((situation, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-[#c8eb67] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Battery className="w-8 h-8 text-black" />
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
              {dict.accuservice.locatiesectie?.title || "Deel Uw Locatie Voor Snelle Hulp"}
            </h2>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              {dict.accuservice.locatiesectie?.description ||
                "Start uw auto niet meer? Deel uw exacte locatie zodat onze accu specialisten u zo snel mogelijk kunnen vinden en helpen met de juiste apparatuur en nieuwe accu's."}
            </p>
            <LocationButton
              dict={dict.accuservice.locatiebutton || { sendLocation: "Deel Locatie", loading: "Laden..." }}
            />
          </div>

          <div className="md:w-2/5 flex justify-center">
            <Image
              src="/location.gif"
              alt={dict.accuservice.locatiesectie?.imageAlt || "Locatie delen voor accu hulp"}
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
              {dict.accuservice.emergency?.title || "Auto Start Niet? Bel Direct!"}
            </h2>
            <p className="text-2xl text-black mb-12 max-w-3xl mx-auto">
              {dict.accuservice.emergency?.subtitle ||
                "24/7 bereikbaar voor professionele accuhulp. Nieuwe accu's ter plekke, snelle diagnose en direct weer rijden."}
            </p>
          </div>

          <div className="bg-black rounded-3xl p-12 mb-16 max-w-lg mx-auto">
            <Phone className="h-16 w-16 mx-auto mb-6 text-white" />
            <a href={`tel:0852502928`}>
              <div className="text-5xl md:text-6xl text-white font-bold mb-4">
                {dict.accuservice.emergency?.phone || "085-250 29 28"}
              </div>
            </a>
            <div className="text-white text-xl">
              {dict.accuservice.emergency?.phoneSubtitle || "Direct verbonden met onze accu specialisten"}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {dict.accuservice.emergency?.stats?.map((stat, index) => (
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
    </div>
  )
}
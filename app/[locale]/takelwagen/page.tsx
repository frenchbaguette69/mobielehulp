import { getDictionary } from "../dictionaries"
import { Phone, ArrowRight, Clock, Shield, Truck, Users, AlertTriangle, Car } from "lucide-react"
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
    title: dict.takelwagen?.seo?.title || "Takelwagen - 24/7 Snel en Veilig Takeldienst voor Auto's | Mobiele Hulp",
    description: dict.takelwagen?.seo?.description || "Direct een takelwagen nodig? 24/7 bereikbaar, snelle service, professioneel en veilig uw auto laten takelen of bergen.",
    keywords: dict.takelwagen?.seo?.keywords || "takelwagen, takeldienst, auto takelen, auto berging, 24/7 takeldienst, pechhulp, auto transport",
    openGraph: {
      title: dict.takelwagen?.seo?.title || "Takelwagen - 24/7 Snel en Veilig Takeldienst voor Auto's",
      description: dict.takelwagen?.seo?.description || "Direct een takelwagen nodig? 24/7 bereikbaar, snelle service, professioneel en veilig uw auto laten takelen of bergen.",
      type: "website",
      images: [
        {
          url: "/services/2.jpg",
          width: 1200,
          height: 630,
          alt: dict.takelwagen?.seo?.imageAlt || "Professionele takelwagen",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.takelwagen?.seo?.title || "Takelwagen - 24/7 Snel en Veilig Takeldienst voor Auto's",
      description: dict.takelwagen?.seo?.description || "Direct een takelwagen nodig? 24/7 bereikbaar, snelle service, professioneel en veilig uw auto laten takelen of bergen.",
      images: ["/services/2.jpg"],
    },
    alternates: {
      canonical: `/${locale}/takelwagen`,
    },
  }
}

export default async function TakelwagenPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as "nl" | "en" | "fr" | "de")

  // Only 8 images for the service
  const serviceImages = [
    "/services/1.jpg",
    "/services/2.jpg",
    "/services/3.jpg",
    "/services/4.jpg",
    "/services/5.png",
    "/services/6.png",
    "/services/7.jpg",
    "/services/8.jpg",
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative text-white flex items-center"
        style={{
          backgroundImage: "url(/services/2.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative w-full flex items-center py-16 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-[#c8eb67] text-black px-4 py-2 rounded-full text-sm font-medium">
                    <Car className="w-4 h-4" />
                    {dict.takelwagen?.hero?.badge || "Takelwagen"}
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
                    <span className="text-white">{dict.takelwagen?.hero?.title?.part1 || "Takelwagen Nodig?"}</span>
                    <br />
                    <span className="text-[#c8eb67]">{dict.takelwagen?.hero?.title?.part2 || "Snel & Veilig Getakeld"}</span>
                  </h1>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <a
                    href={`tel:${dict.takelwagen?.hero?.phone || "0852502928"}`}
                    className="w-full sm:w-auto inline-flex items-center justify-between px-6 py-3 bg-[#c8eb67] text-black rounded-full shadow-lg hover:bg-[#b8db57] transition-all group text-base font-semibold"
                  >
                    <span className="flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      {dict.takelwagen?.hero?.cta || "Bel Direct: 085-250 29 28"}
                    </span>
                  </a>
                  <Link
                    href="https://wa.me/31850609880"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-between rounded-full bg-white text-black border border-gray-300 hover:shadow-lg px-6 py-3 font-semibold transition-all group text-base"
                  >
                    <span className="mr-3">{dict.takelwagen?.hero?.whatsapp || "WhatsApp"}</span>
                    <div className="w-8 h-8 rounded-full bg-[#c8eb67] text-black flex items-center justify-center transition-transform group-hover:translate-x-1">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {dict.takelwagen?.features?.title || "Waarom Onze Takelwagen?"}
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {dict.takelwagen?.features?.subtitle ||
                "Onze takelwagen is 24/7 bereikbaar en zorgt voor veilig, snel en professioneel vervoer of berging van uw auto."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dict.takelwagen?.features?.items?.map((feature, index) => {
              const icons = [Shield, Clock, Truck, Users]
              const IconComponent = icons[index]
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-[#c8eb67] rounded-2xl flex items-center justify-center mb-6">
                    {IconComponent && <IconComponent className="w-8 h-8 text-black" />}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Details with Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                {dict.takelwagen?.serviceDetails?.title || "Complete Takelwagen Service"}
              </h2>
              <div className="space-y-6">
                {dict.takelwagen?.serviceDetails?.items?.map((service, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#c8eb67] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-10 lg:mt-0">
              <div className="grid grid-cols-2 gap-4">
                {serviceImages.map((img, idx) => (
                  <Image
                    key={img}
                    src={img}
                    alt={dict.takelwagen?.serviceDetails?.imageAlt || "Takelwagen dienst"}
                    width={280}
                    height={180}
                    className="rounded-xl shadow-lg w-full h-auto"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Takelwagen Situations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {dict.takelwagen?.situations?.title || "Wanneer Takelwagen Nodig?"}
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {dict.takelwagen?.situations?.description ||
                "Of het nu gaat om pech, een ongeval of transport, onze takelwagen helpt u snel en veilig."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dict.takelwagen?.situations?.items?.map((situation, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-[#c8eb67] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Car className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{situation.title}</h3>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {dict.takelwagen?.locatiesectie?.title || "Deel Uw Locatie voor Takelwagen"}
            </h2>
            <p className="text-gray-700 mb-8 text-base sm:text-lg leading-relaxed">
              {dict.takelwagen?.locatiesectie?.description ||
                "Geef uw locatie door zodat wij u snel kunnen helpen en uw auto veilig kunnen vervoeren of bergen."}
            </p>
            <LocationButton
              dict={dict.takelwagen?.locatiebutton || { sendLocation: "Deel Locatie", loading: "Laden..." }}
            />
          </div>
          <div className="md:w-2/5 flex justify-center mb-8 md:mb-0">
            <Image
              src="/location.gif"
              alt={dict.takelwagen?.locatiesectie?.imageAlt || "Locatie delen voor takelwagen"}
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
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6">
              {dict.takelwagen?.emergency?.title || "Direct Takelwagen Nodig? Bel Nu!"}
            </h2>
            <p className="text-lg sm:text-2xl text-black mb-12 max-w-3xl mx-auto">
              {dict.takelwagen?.emergency?.subtitle ||
                "24/7 bereikbaar voor takelwagen. Snel ter plaatse, altijd veilig vervoer of berging."}
            </p>
          </div>
          <div className="bg-black rounded-3xl p-8 md:p-12 mb-16 max-w-lg mx-auto">
            <Phone className="h-12 md:h-16 w-12 md:w-16 mx-auto mb-6 text-white" />
            <a href={`tel:0852502928`}>
              <div className="text-3xl sm:text-5xl md:text-6xl text-white font-bold mb-4">
                {dict.takelwagen?.emergency?.phone || "085-250 29 28"}
              </div>
            </a>
            <div className="text-white text-lg sm:text-xl">
              {dict.takelwagen?.emergency?.phoneSubtitle || "Direct verbonden met onze takelwagenspecialisten"}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {dict.takelwagen?.emergency?.stats?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-base sm:text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection dict={dict} />
    </div>
    )
}
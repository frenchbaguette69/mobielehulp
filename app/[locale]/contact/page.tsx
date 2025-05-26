import { getDictionary } from "../dictionaries"
import { Phone, ArrowRight, Clock, MapPin, Shield, Mail, Car, AlertTriangle, MessageCircle, Send } from "lucide-react"
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
    title: dict.contact?.seo?.title || "Contact - 24/7 Pechhulp & Mobiele Hulp | Neem Contact Op",
    description: dict.contact?.seo?.description || "Neem contact op voor 24/7 pechhulp en mobiele service. Telefonisch, WhatsApp of email. Direct bereikbaar voor alle autopech situaties.",
    keywords: dict.contact?.seo?.keywords || "contact pechhulp, telefoonnummer pechhulp, whatsapp hulp, email contact, 24/7 bereikbaar, mobiele hulp contact",
    openGraph: {
      title: dict.contact?.seo?.title || "Contact - 24/7 Pechhulp & Mobiele Hulp",
      description: dict.contact?.seo?.description || "Neem contact op voor 24/7 pechhulp en mobiele service. Direct bereikbaar voor alle situaties.",
      type: "website",
      images: [
        {
          url: "/contact-hero.jpg",
          width: 1200,
          height: 630,
          alt: dict.contact?.seo?.imageAlt || "Contact opnemen voor pechhulp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.contact?.seo?.title || "Contact - 24/7 Pechhulp & Mobiele Hulp",
      description: dict.contact?.seo?.description || "Neem contact op voor 24/7 pechhulp en mobiele service. Direct bereikbaar voor alle situaties.",
      images: ["/contact-hero.jpg"],
    },
    alternates: {
      canonical: `/${locale}/contact`,
    },
  }
}

export default async function ContactPage({
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
                  <MessageCircle className="w-4 h-4" />
                  {dict.contact?.hero?.badge || "Contact"}
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">{dict.contact?.hero?.title?.part1 || "24/7 Bereikbaar"}</span>
                  <br />
                  <span className="text-[#c8eb67]">{dict.contact?.hero?.title?.part2 || "Voor Directe Hulp"}</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
                  {dict.contact?.hero?.subtitle ||
                    "Hulp nodig? Wij staan 24/7 voor u klaar. Neem direct contact op via telefoon, WhatsApp of email voor snelle professionele pechhulp."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <a
                  href={`tel:${dict.contact?.hero?.phone || "0852502928"}`}
                  className="w-full max-w-xs sm:w-auto inline-flex items-center justify-between px-8 py-4 bg-[#c8eb67] text-black rounded-full shadow-lg hover:bg-[#b8db57] transition-all group text-lg font-semibold"
                >
                  <span className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    {dict.contact?.hero?.cta || "Bel Direct: 085-250 29 28"}
                  </span>
                </a>

                <Link
                  href="https://wa.me/31850609880"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs sm:w-auto inline-flex items-center justify-between rounded-full bg-white text-black border border-gray-300 hover:shadow-lg px-8 py-4 font-semibold transition-all group text-lg"
                >
                  <span className="mr-3">{dict.contact?.hero?.whatsapp || "WhatsApp"}</span>
                  <div className="w-10 h-10 rounded-full bg-[#c8eb67] text-black flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {dict.contact?.methods?.title || "Neem Contact Op"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {dict.contact?.methods?.subtitle ||
                "Kies de manier die voor u het beste uitkomt. Wij zijn altijd bereikbaar en reageren snel op al uw vragen en hulpverzoeken."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {dict.contact?.methods?.items?.map((method, index) => {
              const icons = [Phone, MessageCircle, Mail]
              const IconComponent = icons[index]
              
              return (
                <div key={index} className="bg-gray-100 text-black p-8 rounded-2xl text-center hover:bg-[#c8eb67] hover:text-black transition-all duration-300 group">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-black group-hover:text-white transition-all">
                    {IconComponent && <IconComponent className="w-8 h-8" />}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{method.title}</h3>
                  <p className="text-gray-600 group-hover:text-black mb-6">{method.description}</p>
                  <div className="text-xl font-semibold mb-4">{method.contact}</div>
                  {method.link && (
                    <a
                      href={method.link}
                      className="inline-flex items-center gap-2 text-gray-900 group-hover:text-black font-medium"
                      target={method.link.startsWith('http') ? '_blank' : undefined}
                      rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {method.linkText}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-[#c8eb67] text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <AlertTriangle className="h-20 w-20 mx-auto mb-8 text-black" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {dict.contact?.emergency?.title || "Noodgeval? Direct Bellen!"}
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              {dict.contact?.emergency?.subtitle ||
                "Bij spoedeisende situaties kunt u ons 24/7 direct bereiken. Geen wachttijden, directe hulp van onze ervaren monteurs."}
            </p>
            
            <div className="bg-black rounded-3xl p-12 mb-12 max-w-lg mx-auto">
              <Phone className="h-16 w-16 mx-auto mb-6 text-white" />
              <a href={`tel:0852502928`} className="block">
                <div className="text-4xl md:text-5xl text-white font-bold mb-4">
                  {dict.contact?.emergency?.phone || "085-250 29 28"}
                </div>
                <div className="text-white text-lg">
                  {dict.contact?.emergency?.phoneSubtitle || "24/7 Spoedhulp - Direct Bereikbaar"}
                </div>
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {dict.contact?.emergency?.features?.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold mb-2">{feature.value}</div>
                  <div className="text-lg">{feature.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours & Info */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Business Hours */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {dict.contact?.hours?.title || "Bereikbaarheid"}
              </h2>
              <div className="space-y-6">
                {dict.contact?.hours?.schedule?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#c8eb67]" />
                      <span className="font-semibold text-gray-900">{item.day}</span>
                    </div>
                    <span className="text-gray-600">{item.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-[#c8eb67] rounded-xl">
                <h3 className="text-xl font-bold mb-2">{dict.contact?.hours?.emergency?.title || "Spoedgevallen"}</h3>
                <p className="text-gray-900">{dict.contact?.hours?.emergency?.description || "Voor spoedgevallen zijn wij 24/7 bereikbaar via ons noodnummer."}</p>
              </div>
            </div>

            {/* Company Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {dict.contact?.info?.title || "Bedrijfsgegevens"}
              </h2>
              <div className="space-y-6">
                {dict.contact?.info?.details?.map((detail, index) => {
                  const icons = [MapPin, Mail, Phone, Shield]
                  const IconComponent = icons[index]
                  
                  return (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl">
                      <div className="w-12 h-12 bg-[#c8eb67] rounded-xl flex items-center justify-center flex-shrink-0">
                        {IconComponent && <IconComponent className="w-6 h-6 text-black" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{detail.label}</h3>
                        <p className="text-gray-600">{detail.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Sharing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="md:w-3/5 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {dict.contact?.location?.title || "Deel Uw Locatie"}
            </h2>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              {dict.contact?.location?.description ||
                "Heeft u hulp nodig? Deel uw exacte locatie zodat onze monteurs u zo snel mogelijk kunnen vinden. Dit bespaart kostbare tijd in noodsituaties."}
            </p>
            <LocationButton
              dict={dict.pechhulp?.locatiebutton || { sendLocation: "Deel Locatie", loading: "Laden..." }}
            />
          </div>

          <div className="md:w-2/5 flex justify-center">
            <Image
              src="/location.gif"
              alt={dict.contact?.location?.imageAlt || "Locatie delen voor hulp"}
              width={200}
              height={200}
              className="w-40 md:w-48 h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection dict={dict} />

    </div>
  )
}
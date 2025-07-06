import { getDictionary } from "../dictionaries"
import { Phone, ArrowRight, AlertTriangle, Battery } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import LocationButton from "@/components/locationbutton"
import { FAQSection } from "@/components/FAQsection"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as "nl" | "en" | "fr" | "de")

  return {
    title: dict.accuAutoLeeg?.seo?.title || "Accu auto leeg? | 24/7 Pechhulp & Startservice",
    description: dict.accuAutoLeeg?.seo?.description || "Is de accu van uw auto leeg? 24/7 bereikbaar voor snelle hulp en startservice. Wij helpen u direct weer op weg.",
    keywords: dict.accuAutoLeeg?.seo?.keywords || "accu auto leeg, startservice, pechhulp, auto accu, auto wil niet starten",
    openGraph: {
      title: dict.accuAutoLeeg?.seo?.title || "Accu auto leeg? | 24/7 Pechhulp & Startservice",
      description: dict.accuAutoLeeg?.seo?.description || "Is de accu van uw auto leeg? 24/7 bereikbaar voor snelle hulp en startservice. Wij helpen u direct weer op weg.",
      type: "website",
      images: [
        {
          url: "/services/4.jpg",
          width: 1200,
          height: 630,
          alt: dict.accuAutoLeeg?.seo?.imageAlt || "Accu auto leeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.accuAutoLeeg?.seo?.title || "Accu auto leeg? | 24/7 Pechhulp & Startservice",
      description: dict.accuAutoLeeg?.seo?.description || "Is de accu van uw auto leeg? 24/7 bereikbaar voor snelle hulp en startservice. Wij helpen u direct weer op weg.",
      images: ["/services/4.jpg"],
    },
    alternates: {
      canonical: `/${locale}/accu-auto-leeg`,
    },
  }
}

export default async function AccuAutoLeegPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as "nl" | "en" | "fr" | "de")

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative text-white flex items-center"
        style={{
          backgroundImage: "url(/services/4.jpg)",
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
                    <Battery className="w-4 h-4" />
                    {dict.accuAutoLeeg?.hero?.badge || "Accu auto leeg"}
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
                    <span className="text-white">{dict.accuAutoLeeg?.hero?.title?.part1 || "Accu auto leeg?"}</span>
                    <br />
                    <span className="text-[#c8eb67]">{dict.accuAutoLeeg?.hero?.title?.part2 || "Wij starten u direct weer"}</span>
                  </h1>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <a
                    href={`tel:${dict.accuAutoLeeg?.hero?.phone || "0852502928"}`}
                    className="w-full sm:w-auto inline-flex items-center justify-between px-6 py-3 bg-[#c8eb67] text-black rounded-full shadow-lg hover:bg-[#b8db57] transition-all group text-base font-semibold"
                  >
                    <span className="flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      {dict.accuAutoLeeg?.hero?.cta || "Bel Direct: 085-250 29 28"}
                    </span>
                  </a>
                  <Link
                    href="https://wa.me/31850609880"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-between rounded-full bg-white text-black border border-gray-300 hover:shadow-lg px-6 py-3 font-semibold transition-all group text-base"
                  >
                    <span className="mr-3">{dict.accuAutoLeeg?.hero?.whatsapp || "WhatsApp"}</span>
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

      {/* Tips Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image left, text right on desktop */}
            <div className="flex justify-center">
              <Image
                src="/services/4.jpg"
                alt={dict.accuAutoLeeg?.tips?.imageAlt || "Accu auto leeg hulp"}
                width={500}
                height={333}
                className="rounded-2xl shadow-xl w-full max-w-xl h-auto"
              />
            </div>
            <div>
              <div className="text-center md:text-left mb-10">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {dict.accuAutoLeeg?.tips?.title || "Wat te doen bij een lege accu?"}
                </h2>
                <p className="text-base sm:text-xl text-gray-600 max-w-3xl">
                  {dict.accuAutoLeeg?.tips?.subtitle ||
                    "Volg deze stappen voor uw veiligheid. Lukt het niet? Wij helpen u direct!"}
                </p>
              </div>
              <div className="space-y-8">
                {(dict.accuAutoLeeg?.tips?.items || [
                  { title: "Controleer of de lichten werken", description: "Geen verlichting? Grote kans dat de accu leeg is." },
                  { title: "Probeer de auto te starten", description: "Lukt dit niet? Bel onze startservice." },
                  { title: "Gebruik startkabels indien mogelijk", description: "Let op de juiste volgorde en veiligheid." },
                  { title: "Bel direct hulp", description: "Wij komen snel ter plaatse om u weer op weg te helpen." }
                ]).map((tip, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#c8eb67] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <ArrowRight className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{tip.title}</h3>
                      <p className="text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Sharing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="md:w-3/5 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {dict.accuAutoLeeg?.locatiesectie?.title || "Deel uw locatie voor hulp"}
            </h2>
            <p className="text-gray-700 mb-8 text-base sm:text-lg leading-relaxed">
              {dict.accuAutoLeeg?.locatiesectie?.description ||
                "Deel uw locatie zodat wij u snel kunnen helpen en uw auto weer kunnen starten."}
            </p>
            <LocationButton
              dict={dict.accuAutoLeeg?.locatiebutton || { sendLocation: "Deel Locatie", loading: "Laden..." }}
            />
          </div>
          <div className="md:w-2/5 flex justify-center mb-8 md:mb-0">
            <Image
              src="/location.gif"
              alt={dict.accuAutoLeeg?.locatiesectie?.imageAlt || "Locatie delen voor hulp"}
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
              {dict.accuAutoLeeg?.emergency?.title || "Direct hulp nodig? Bel nu!"}
            </h2>
            <p className="text-lg sm:text-2xl text-black mb-12 max-w-3xl mx-auto">
              {dict.accuAutoLeeg?.emergency?.subtitle ||
                "24/7 bereikbaar voor hulp bij een lege accu. Snel ter plaatse, altijd veilig geholpen."}
            </p>
          </div>
          <div className="bg-black rounded-3xl p-8 md:p-12 mb-16 max-w-lg mx-auto">
            <Phone className="h-12 md:h-16 w-12 md:w-16 mx-auto mb-6 text-white" />
            <a href={`tel:0852502928`}>
              <div className="text-3xl sm:text-5xl md:text-6xl text-white font-bold mb-4">
                {dict.accuAutoLeeg?.emergency?.phone || "085-250 29 28"}
              </div>
            </a>
            <div className="text-white text-lg sm:text-xl">
              {dict.accuAutoLeeg?.emergency?.phoneSubtitle || "Direct verbonden met onze hulpdienst"}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection dict={dict} />
    </div>
    )
}
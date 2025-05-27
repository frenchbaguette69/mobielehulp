import { getDictionary } from "./dictionaries";
import { Phone, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ServiceCarousel } from "@/components/service-carousel";
import { FAQSection } from "@/components/FAQsection";
import LocationButton from "@/components/locationbutton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "nl" | "en" | "fr" | "de");

  return {
    title: dict.pechhulp.title,
    description: dict.pechhulp.description,
    keywords:
      locale === "nl"
        ? "pechhulp, autopech, sleepdienst, mobiele hulp, 24/7, nederland, europa, lekke band, accu service, autoberging, wegenwacht"
        : "roadside assistance, car breakdown, towing service, mobile help, 24/7, netherlands, europe, battery service, tire repair",
    openGraph: {
      title: dict.pechhulp.title,
      description: dict.pechhulp.description,
      type: "website",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "nl" | "en" | "fr" | "de");

  return (
    <div className="min-h- bg-white">
      {/* Header */}

      {/* Hero Section - Enhanced */}
      <section
        className="relative text-white py-24 overflow-hidden flex items-center"
        style={{
          backgroundImage: "url(/herobgcar.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-4xl lg:text-5xl font-medium leading-tight">
                  <span className="text-white">
                    Pechhulp 24/7 wordt direct geholpen met autopech
                  </span>
                </h1>
                <p className="text-sm md:text-md text-gray-200 leading-relaxed max-w-2xl">
                  {dict.pechhulp.hero.subtitle}
                </p>
                 <p className="text-xl md:text-md text-gray-200 leading-relaxed max-w-2xl">
                  {dict.pechhulp.hero.title.part3}
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
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <a
                  href="tel:0852502928"
                  className="w-full max-w-xs sm:w-auto inline-flex items-center justify-between px-6 py-3 bg-white text-black rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition-all group"
                >
                  <span className="flex items-center gap-2 font-medium text-base">
                    {dict.pechhulp.hero.cta}
                  </span>
                  <span className="ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-black text-white group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </span>
                </a>

                <Link
                  href="https://wa.me/31850609880"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs sm:w-auto inline-flex items-center justify-between rounded-full bg-white text-black border border-gray-300 hover:shadow-md px-6 py-3 font-medium transition-all group"
                >
                  <span className="mr-2">WhatsApp</span>
                  <div className="w-8 h-8 rounded-full bg-[#c8eb67] text-black flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          {/* Image section */}
          <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/busje.jpg"
              alt="Sleepdienst Pechhulp"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl"
              priority
            />
          </div>

          {/* Text section */}
          <div>
            <p className="text-sm text-gray-500 mb-3">
              {dict.pechhulp.feature.sectionLabel}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {dict.pechhulp.feature.title}
            </h2>
            <p className="text-lg font-semibold text-gray-900 mb-3">
              {dict.pechhulp.feature.subtitle}
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {dict.pechhulp.feature.description}
            </p>
            <Button className="bg-black text-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-gray-900">
              {dict.pechhulp.feature.button}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <ServiceCarousel
        title={dict.pechhulp.servicegrid.title}
        subtitle={dict.pechhulp.servicegrid.subtitle}
        items={dict.pechhulp.servicegrid.items}
      />

      {/* Services Section - Greatly Enhanced */}
      <section className="py-12   ">
        <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-6">
          {/* Tekstkolom */}
          <div className="md:w-3/5 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {dict.pechhulp.locatiesectie.title}
            </h2>
            <p className="text-gray-700 mt-4 text-base md:text-lg">
              {dict.pechhulp.locatiesectie.description}
            </p>
            <LocationButton dict={dict.pechhulp.locatiebutton} />
          </div>

          {/* GIF */}
          <div className="md:w-2/5 flex justify-center">
            <Image
              src="/location.gif"
              alt="Locatie delen gif"
              width={180}
              height={180}
              className="w-32 md:w-32 h-auto rounded-xl "
            />
          </div>
        </div>
      </section>

      {/* Emergency Section - Enhanced */}
      <section className="py-12 bg-[#c8eb67] text-black relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <AlertTriangle className="h-20 w-20 mx-auto mb-6 text-black" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {dict.pechhulp.emergency.title}
            </h2>
            <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
              {dict.pechhulp.emergency.subtitle}
            </p>
          </div>

          <div className="bg-black rounded-2xl p-8 mb-12 max-w-md mx-auto">
            <Phone className="h-12 w-12 mx-auto mb-4 text-white" />
            <div className="text-4xl md:text-5xl text-white font-bold mb-2">
              {dict.pechhulp.emergency.phone}
            </div>
            <div className="text-white">
              {dict.pechhulp.emergency.phoneSubtitle}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced */}
      <FAQSection dict={dict} />
    </div>
  );
}

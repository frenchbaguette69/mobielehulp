// app/[locale]/[...slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "../dictionaries"; // let op: pad kan afwijken in jouw repo
import plaatsen from "@/app/data/plaatsen";
import { topics, TopicDef } from "@/app/data/topics";
import { allAcceptedSlugs, canonicalSlug, normalize } from "@/lib/slug";

// UI componenten uit je bestaande pagina
import { Phone, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ServiceCarousel } from "@/components/service-carousel";
import { FAQSection } from "@/components/FAQsection";
import LocationButton from "@/components/locationbutton";

const DOMAIN = "https://jouwdomein.nl" as const; // pas aan
const PHONE_NUM = "0852502928"; // uit je voorbeeld
const WHATSAPP = "31850609880"; // uit je voorbeeld

export const dynamicParams = false;

type Params = { locale: string; slug?: string[] };

// ------- helpers om (topic, plaats) uit slug te halen --------
function matchTopicAndCitySingle(slugStr: string): { topic: TopicDef; plaats: string } | null {
  // slugStr is b.v. "accu-vervangen-rotterdam" of "accu-vervangen-in-rotterdam"
  for (const t of topics) {
    for (const p of plaatsen) {
      const variants = allAcceptedSlugs(t.baseSlug, p);
      if (variants.includes(slugStr)) {
        return { topic: t, plaats: p };
      }
    }
  }
  return null;
}

function findPlaceBySlug(plaatsSegment: string) {
  const normalizedSegment = normalize(plaatsSegment);
  return plaatsen.find((p) => normalize(p) === normalizedSegment) ?? null;
}

function matchTopicAndCity(slugSegments: string[]): { topic: TopicDef; plaats: string } | null {
  if (!slugSegments?.length) return null;

  // Nieuwe structuur: /[plaats]/[topic]
  if (slugSegments.length >= 2) {
    const plaatsMatch = findPlaceBySlug(slugSegments[0]);
    const topicMatch = topics.find((t) => normalize(t.baseSlug) === normalize(slugSegments[1]));
    if (plaatsMatch && topicMatch) {
      return { topic: topicMatch, plaats: plaatsMatch };
    }
  }

  // Oudere structuur: "topic-plaats" in één slug
  const primary = slugSegments[0]?.trim() ?? "";
  const direct = matchTopicAndCitySingle(primary);
  if (direct) return direct;

  // fallback: meerdere segmenten gecombineerd
  if (slugSegments.length > 1) {
    return matchTopicAndCitySingle(slugSegments.join("-"));
  }
  return null;
}

// ------- STATIC PARAMS (alle canonieke paden) --------
export async function generateStaticParams() {
  const locales = ["nl"]; // breid uit als je meer talen hebt
  const params: { locale: string; slug: string[] }[] = [];

  for (const locale of locales) {
    for (const t of topics) {
      for (const p of plaatsen) {
        const c = canonicalSlug(t.baseSlug, p);
        params.push({ locale, slug: [c] });
        params.push({ locale, slug: [normalize(p), t.baseSlug] }); // nieuwe structuur: /[plaats]/[topic]
      }
    }
  }
  return params;
}

// ------- METADATA --------
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const slugSegments = slug ?? [];

  const match = matchTopicAndCity(slugSegments);
  if (!match) {
    return { title: "Niet gevonden" };
  }

  const dict = await getDictionary((locale as "nl" | "en" | "fr" | "de") ?? "nl");
  const dictSection = (dict as any)[match.topic.dictKey] ?? (dict as any).pechhulp;

  const titleBase: string =
    dictSection?.title ?? `${match.topic.key.replace(/-/g, " ").replace(/\b\w/g,(m)=>m.toUpperCase())}`;
  const descriptionBase: string =
    dictSection?.description ?? `Directe hulp bij ${match.topic.key.replace(/-/g, " ")}. Bel ons nu.`;

  const title = `${titleBase} in ${match.plaats}`;
  const description = `${descriptionBase} – ${match.plaats}`;

  const canonicalPath = `${normalize(match.plaats)}/${match.topic.baseSlug}`;
  const canonical = `${DOMAIN}/${normalize(locale)}/${canonicalPath}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
    },
    alternates: { canonical },
    robots: { index: true, follow: true },
    keywords:
      locale === "nl"
        ? "pechhulp, sleepdienst, accu vervangen, auto slepen, modder vast, 24/7 hulp, nederland"
        : "roadside assistance, towing, battery replace, car towing, stuck in mud, 24/7, netherlands",
  };
}

// ------- PAGE RENDER --------
export default async function TopicCityPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const slugSegments = slug ?? [];
  const match = matchTopicAndCity(slugSegments);

  if (!match) return notFound();

  const dict = await getDictionary((locale as "nl" | "en" | "fr" | "de") ?? "nl");
  const dictSection = (dict as any)[match.topic.dictKey] ?? (dict as any).pechhulp;

  const heroTitle =
    dictSection?.hero?.title?.part3
      ? `${dictSection.hero.title.part3}`
      : `${match.topic.key.replace(/-/g, " ")} – ${match.plaats}`;

  const heroSubtitle =
    dictSection?.hero?.subtitle ??
    `Hulp nodig bij ${match.topic.key.replace(/-/g, " ")} in ${match.plaats}? Bel direct.`;

  const sectionFeature = dictSection?.feature ?? dict.pechhulp.feature;
  const serviceGrid = dictSection?.servicegrid ?? dict.pechhulp.servicegrid;
  const locatieSectie = dictSection?.locatiesectie ?? dict.pechhulp.locatiesectie;
  const emergency = dictSection?.emergency ?? dict.pechhulp.emergency;

  return (
    <div className="min-h- bg-white">
      {/* HERO (hergebruikt structuur van je pechhulp-pagina) */}
      <section
        className="relative text-white py-24 overflow-hidden flex items-center"
        style={{
          backgroundImage: "url(/blog-1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-4xl lg:text-5xl font-medium leading-tight">
                  <span className="text-white">
                    {dictSection?.title
                      ? `${dictSection.title} – ${match.plaats}`
                      : heroTitle}
                  </span>
                </h1>
                <p className="text-sm md:text-md text-gray-200 leading-relaxed max-w-2xl">
                  {heroSubtitle}
                </p>
                {dict.pechhulp?.hero?.title?.part3 && (
                  <p className="text-xl md:text-md text-gray-200 leading-relaxed max-w-2xl">
                    {dict.pechhulp.hero.title.part3}
                  </p>
                )}
                <div className="flex items-center gap-3 text-[#c8eb67]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.4 8.168L12 18.897l-7.334 3.864 1.4-8.168L.132 9.211l8.2-1.193z" />
                    </svg>
                  ))}
                  <span className="text-white ml-2 text-sm">4.9/5 (2.847 reviews)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <a
                  href={`tel:${PHONE_NUM}`}
                  className="w-full max-w-xs sm:w-auto inline-flex items-center justify-between px-6 py-3 bg-white text-black rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition-all group"
                >
                  <span className="flex items-center gap-2 font-medium text-base">
                    {dictSection?.hero?.cta ?? dict.pechhulp.hero.cta}
                  </span>
                  <span className="ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-black text-white group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </span>
                </a>

                <Link
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs sm:w-auto inline-flex items-center justify-between rounded-full bg-white text-black border border-gray-300 hover:shadow-md px-6 py-3 font-medium transition-all group"
                >
                  <span className="mr-2">WhatsApp</span>
                  <div className="w-8 h-8 rounded-full bg-[#c8eb67] text-black flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>

                <LocationButton dict={dict.pechhulp.locatiebutton} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/busje.jpg"
              alt="Dienst"
              fill
              className="rounded-3xl object-cover"
              priority
            />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-3">{sectionFeature.sectionLabel}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {sectionFeature.title}
            </h2>
            <p className="text-lg font-semibold text-gray-900 mb-3">
              {sectionFeature.subtitle}
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {sectionFeature.description}
            </p>
            <Link href="/diensten">
              <Button className="bg-black text-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-gray-900">
                {sectionFeature.button}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <ServiceCarousel
        title={serviceGrid.title}
        subtitle={serviceGrid.subtitle}
        items={serviceGrid.items}
      />

      {/* LOCATIE SECTION */}
      <section className="py-12">
        <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-6">
          <div className="md:w-3/5 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {locatieSectie.title}
            </h2>
            <p className="text-gray-700 mt-4 text-base md:text-lg">
              {locatieSectie.description}
            </p>
            <LocationButton dict={dict.pechhulp.locatiebutton} />
          </div>

          <div className="md:w-2/5 flex justify-center">
            <Image
              src="/location.gif"
              alt="Locatie delen gif"
              width={180}
              height={180}
              className="w-32 md:w-32 h-auto rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* EMERGENCY */}
      <section className="py-12 bg-[#c8eb67] text-black relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <AlertTriangle className="h-20 w-20 mx-auto mb-6 text-black" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {emergency.title}
            </h2>
            <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
              {emergency.subtitle}
            </p>
          </div>

          <div className="bg-black rounded-2xl p-8 mb-12 max-w-md mx-auto">
            <Phone className="h-12 w-12 mx-auto mb-4 text-white" />
            <div className="text-4xl md:text-5xl text-white font-bold mb-2">
              {emergency.phone}
            </div>
            <div className="text-white">{emergency.phoneSubtitle}</div>
          </div>
        </div>
      </section>

      <FAQSection dict={dict} />
    </div>
  );
}

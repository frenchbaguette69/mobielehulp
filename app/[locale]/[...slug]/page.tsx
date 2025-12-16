// app/[locale]/[...slug]/page.tsx - 100% STATIC NL DEFAULT FIXED
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "../dictionaries";
import plaatsen from "@/app/data/plaatsen";
import { topics, TopicDef } from "@/app/data/topics";
import { allAcceptedSlugs, canonicalSlug, normalize } from "@/lib/slug";
import { Phone, AlertTriangle, ArrowRight, MapPin, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ServiceCarousel } from "@/components/service-carousel";
import { FAQSection } from "@/components/FAQsection";
import LocationButton from "@/components/locationbutton";

const DOMAIN = "https://mobielehulp.nl" as const;
const PHONE_NUM = "0852502928";
const WHATSAPP = "31850609880";

export const dynamicParams = false;
export const revalidate = 3600;

type Params = { locale: string; slug?: string[] };

// ✅ UNIQU CONTENT PER PLAATS - FALLBACK VOOR ALLE STEDEN
const plaatsContent: Record<string, any> = {
  "s-gravenhage": {
    intro: "In 's-Gravenhage en rondom Den Haag zien we veel accuproblemen door koude winterochtenden op de A4 en A12. Onze monteurs kennen de lokale hotspots zoals Scheveningen en het centrum perfect.",
    localTips: ["Winterklaar maken voor Haagse winters", "Snelle service bij Erasmusbrug files", "24/7 standby voor kustroute pech", "Lokale garages Voorburg/Rijswijk"],
    hotspots: ["A4 knooppunt Burgerveen", "Scheveningseweg", "Centrum ring A44", "N44 Vlietzone"],
    description: "24/7 accu vervangen 's-Gravenhage. Snelle pechhulp A4, A12, Scheveningen. Binnen 30 min."
  },
  "s-hertogenbosch": {
    intro: "'s-Hertogenbosch heeft veel accupech door bruggen en koude Bossche winters. Binnen 20 min bij Diezebrug of Pettelaarseweg.",
    localTips: ["Bossche binnenstad via Hinthamerstraat", "Snelle routes Pettelaarseweg A59", "24/7 Brabantse polderwegen", "Wintertips accu's vorst"],
    hotspots: ["Diezebrug", "Pettelaarseweg", "'s-Hertogenbosch centrum", "A59 afslag Hintham"],
    description: "Accu vervangen 's-Hertogenbosch binnen 25 min. Pechhulp Diezebrug, A59, centrum. 24/7."
  }
};

function getPlaatsContent(plaats: string) {
  return plaatsContent[plaats] || {
    intro: `Snelle 24/7 pechhulp ${plaats}. Binnen 30 minuten ter plaatse door lokale monteurs.`,
    localTips: ["24/7 lokale service", "Binnen 30 minuten ter plaatse", "Geen abonnement nodig", "Professionele monteurs"],
    hotspots: [`${plaats} centrum`, `${plaats} ringweg`, "A-wegen", "Lokale hotspots"],
    description: `24/7 pechhulp ${plaats}. Snelle service zonder abonnement.`
  };
}

function matchTopicAndCity(slugSegments: string[]): { topic: TopicDef; plaats: string } | null {
  if (!slugSegments?.length) return null;

  // ✅ PRIORITEIT: /s-gravenhage/accu-vervangen (NL default)
  if (slugSegments.length >= 2) {
    const plaatsMatch = plaatsen.find(p => normalize(p) === normalize(slugSegments[0]));
    const topicMatch = topics.find(t => normalize(t.baseSlug) === normalize(slugSegments[1]));
    if (plaatsMatch && topicMatch) return { topic: topicMatch, plaats: plaatsMatch };
  }

  // ✅ LEGACY: /accu-vervangen-s-gravenhage
  const primary = slugSegments.join("-");
  for (const t of topics) {
    for (const p of plaatsen) {
      if (allAcceptedSlugs(t.baseSlug, p).includes(primary)) {
        return { topic: t, plaats: p };
      }
    }
  }
  return null;
}

// ✅ SYNC + IMPORTS + ALLE PLAATSEN + NL DEFAULT
export function generateStaticParams() {
  const params: { locale: string; slug: string[] }[] = [];

  for (const plaats of plaatsen) {
    const plaatsSlug = normalize(plaats);
    for (const topic of topics) {
      // ✅ 1. PRIMARY: mobielehulp.nl/s-gravenhage/accu-vervangen
      params.push({ locale: "nl", slug: [plaatsSlug, topic.baseSlug] });
      
      // ✅ 2. LEGACY REDIRECT: mobielehulp.nl/accu-vervangen-s-gravenhage
      params.push({ locale: "nl", slug: [`${topic.baseSlug}-${plaatsSlug}`] });
    }
  }
  
  console.log(`✅ Generated ${params.length} pages (${plaatsen.length} steden × ${topics.length} topics × 2)`);
  return params;
}

export async function generateMetadata(
  { params }: { params: Params },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale, slug } = params;
  const slugSegments = Array.isArray(slug) ? slug : [];
  const match = matchTopicAndCity(slugSegments);

  if (!match) {
    return { 
      title: "Niet gevonden",
      robots: { index: false, follow: false }
    };
  }

  const dict = await getDictionary(locale as "nl");
  const dictSection = (dict as any)[match.topic.dictKey] ?? (dict as any).pechhulp;
  const plaatsContentData = getPlaatsContent(match.plaats);

  const title = `${dictSection?.seo?.title || match.topic.key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} in ${match.plaats}`;
  const description = plaatsContentData.description;

  // ✅ NL DEFAULT CANONICAL - GEEN /nl/
  const canonicalPath = `${normalize(match.plaats)}/${match.topic.baseSlug}`;
  const canonical = `${DOMAIN}/${canonicalPath}`;

  return {
    title,
    description: description.slice(0, 155) + '...',
    keywords: [
      normalize(match.plaats),
      `${match.topic.baseSlug} ${normalize(match.plaats)}`,
      "pechhulp", "24/7", "accu vervangen", match.plaats
    ].join(', '),
    robots: { index: true, follow: true },
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      images: [`/og-${match.topic.baseSlug}-${normalize(match.plaats)}.jpg`]
    }
  };
}

export default async function TopicCityPage({ params }: { params: Params }) {
  const { locale, slug } = params;
  const slugSegments = Array.isArray(slug) ? slug : [];
  const match = matchTopicAndCity(slugSegments);

  if (!match) return notFound();

  const dict = await getDictionary(locale as "nl");
  const dictSection = (dict as any)[match.topic.dictKey] ?? (dict as any).pechhulp;
  const plaatsContentData = getPlaatsContent(match.plaats);

  return (
    <>
      {/* ✅ STRUCTURED DATA - NL DEFAULT URL */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "AutoRepair"],
            "name": "Mobiele Hulp Nederland",
            "description": `24/7 ${match.topic.key.replace(/-/g, ' ')} in ${match.plaats}`,
            "telephone": `+31${PHONE_NUM}`,
            "url": `${DOMAIN}/${normalize(match.plaats)}/${match.topic.baseSlug}`, // ✅ NO /nl/
            "areaServed": [{ "@type": "City", "name": match.plaats }, { "@type": "Country", "name": "Nederland" }],
            "serviceType": `${match.topic.key.replace(/-/g, ' ')} Pechhulp`,
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2847" }
          }, null, 2)
        }}
      />

      <div className="min-h-screen bg-white">
        {/* HERO */}
        <section className="relative text-white py-24 flex items-center min-h-[90vh]" 
                style={{ backgroundImage: "linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url(/blog-1.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/60 to-black/20"></div>
          <div className="relative container mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="max-w-4xl space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {dictSection?.hero?.title?.part1 
                    ? `${dictSection.hero.title.part1} ${dictSection.hero.title.part2}`
                    : `${match.topic.key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} in ${match.plaats}`}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl">
                  {plaatsContentData.intro}
                </p>
                <div className="flex items-center gap-3 text-[#c8eb67]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
                  <span className="text-white text-lg font-semibold">4.9/5 (2.847 reviews)</span>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-4">
                <a href={`tel:${PHONE_NUM}`} className="group w-full lg:w-auto bg-white text-black px-8 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all font-bold text-lg flex items-center justify-center gap-3">
                  📞 085-250 29 28 <Phone className="w-6 h-6 group-hover:scale-110" />
                </a>
                <LocationButton dict={dict.pechhulp.locatiebutton} />
              </div>
            </div>
          </div>
        </section>

        {/* UNIEKE LOCATIE CONTENT */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <article className="space-y-8 prose prose-lg max-w-none">
                <h2 className="text-5xl font-black text-gray-900 leading-tight">
                  {match.topic.key.replace(/-/g, ' ')} in {match.plaats}
                </h2>
                <div className="space-y-6 text-xl text-gray-700 leading-relaxed">
                  <p>{plaatsContentData.intro}</p>
                  
                  <div className="p-8 bg-white rounded-3xl shadow-xl border">
                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                      🚨 Pechplekken {match.plaats}:
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {plaatsContentData.hotspots.map((hotspot, i) => (
                        <div key={i} className="group p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl hover:shadow-lg transition-all border">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-3 h-3 bg-[#c8eb67] rounded-full" />
                            <span className="font-semibold text-lg">{hotspot}</span>
                          </div>
                          <p className="text-sm text-gray-600">Binnen 25 min ter plaatse</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold mb-6">✅ Onze {match.plaats} service:</h3>
                    <ul className="grid md:grid-cols-2 gap-4 text-lg">
                      {plaatsContentData.localTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                          <div className="w-6 h-6 bg-[#c8eb67] rounded-lg flex items-center justify-center font-bold mt-1 flex-shrink-0">✓</div>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>

              <div className="sticky top-24">
                <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
                  <Image
                    src="/busje.jpg"
                    alt={`${match.topic.key} service in ${match.plaats}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl">
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-5 h-5 text-[#c8eb67]" />
                        <span className="font-bold">{match.plaats}</span>
                      </div>
                      <div className="text-2xl font-bold mt-1">24/7 Bereikbaar</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServiceCarousel title={`Onze ${match.topic.key.replace(/-/g, ' ')} specialiteiten`} subtitle={`Alles voor uw auto in ${match.plaats}`} />
        <FAQSection dict={dict} />

        {/* EMERGENCY CTA */}
        <section className="py-24 bg-gradient-to-br from-[#c8eb67] via-green-400 to-emerald-500 text-black">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <AlertTriangle className="h-24 w-24 mx-auto mb-8 opacity-80" />
            <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-tight">
              🚨 Direct hulp nodig in {match.plaats}?
            </h2>
            <p className="text-2xl mb-12 leading-relaxed opacity-90">
              Bel NU voor directe {match.topic.key.replace(/-/g, ' ')}. Binnen 30 minuten!
            </p>
            <div className="bg-black text-white rounded-3xl p-12 shadow-3xl max-w-2xl mx-auto">
              <Phone className="h-20 w-20 mx-auto mb-6 opacity-90" />
              <div className="text-6xl font-black mb-4 tracking-tight">085-250 29 28</div>
              <p className="text-xl opacity-90">Direct verbonden met lokale monteur</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

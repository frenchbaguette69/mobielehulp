import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from "../dictionaries";
import { Phone, AlertTriangle, ArrowRight, CheckCircle, Clock, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { FAQSection } from "@/components/FAQsection";
import LocationButton from "@/components/locationbutton";

const seoKeywords = [
  'car-transport',
  'auto-pech',
  'sleepdienst-auto',
  'auto-berging',
  'slepen-auto',
  'sleepbedrijf',
  'auto-weg-laten-slepen',
  'takelbedrijf',
  'sleepwagen',
  'takelwagen',
  'sleepdienst',
  'pechhulp',
  'wat-te-doen-als-je-auto-vast-zit-in-de-modder',
  'auto-uit-modder-slepen',
  'vast-in-modder-auto',
  'auto-vast-in-modder',
  'vast-in-sneeuw-auto',
  'auto-vast-in-sneeuw',
  'auto-in-de-sloot-vandaag',
  'auto-belandt-in-sloot',
  'auto-in-sloot-vandaag',
  'auto-in-de-sloot',
  'auto-in-sloot',
  'auto-in-de-greppel',
  'auto-vast-in-gras',
  'auto-uit-de-modder-halen',
  'auto-vast-in-zand',
  'auto-vastgereden-in-modder',
  'car-stuck-in-the-mud',
  'auto-in-de-berm',
  'vast-in-de-modder',
  'auto-zit-vast-in-modder',
  'hoe-krijg-je-een-auto-uit-de-modder',
  'vast-in-de-modder-met-auto',
  'auto-in-de-modder',
  'auto-staat-vast-in-de-modder',
  'accu-auto-leeg',
  'auto-accu-leeg-wat-nu',
  'service-accu',
  'accu-service-aan-huis',
  'accu-vervangen-aan-huis',
  'accuservice',
  'vervangen-accu-auto',
  'accu-vervangen-auto',
  'auto-accu-vervangen-aan-huis',
  'accu-auto-vervangen',
  'accu-laten-vervangen-aan-huis',
  'auto-accu-vervangen',
  'accu-laten-vervangen'
];

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Function to get service-specific content
function getServiceContent(slug: string) {
  const serviceMap: Record<string, { title: string; subtitle: string; description: string; features: string[]; image: string }> = {
    'auto-pech': {
      title: 'Auto Pech Service 24/7',
      subtitle: 'Direct hulp bij autopech, waar u ook bent',
      description: 'Wanneer uw auto het begeeft, zijn wij er om u te helpen. Onze ervaren monteurs komen snel ter plaatse om uw voertuig weer aan de praat te krijgen.',
      features: ['24/7 beschikbaar', 'Binnen 30 minuten ter plaatse', 'Gecertificeerde monteurs', 'Transparante prijzen'],
      image: '/band.png'
    },
    'sleepdienst-auto': {
      title: 'Sleepdienst Auto Nederland',
      subtitle: 'Professionele sleepdienst door heel Nederland',
      description: 'Onze moderne sleepwagens kunnen elk type voertuig veilig transporteren. Van personenauto tot bestelwagen, wij regelen het transport.',
      features: ['Moderne sleepwagens', 'Verzekerde transporten', 'Heel Nederland', 'Snelle service'],
      image: '/herobgcar.jpg'
    },
    'accu-service-aan-huis': {
      title: 'Accu Service Aan Huis',
      subtitle: 'Nieuwe accu geleverd en gemonteerd bij u thuis',
      description: 'Lege accu? Geen probleem! Wij leveren en monteren een nieuwe accu bij u aan huis. Kwaliteitsaccu\'s met garantie.',
      features: ['Aan huis service', 'Kwaliteitsaccu\'s', 'Direct gemonteerd', 'Garantie inbegrepen'],
      image: '/band.png'
    },
    // Add more specific content for other keywords...
  };

  return serviceMap[slug] || {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    subtitle: `Professionele ${slug.replace(/-/g, ' ')} service`,
    description: `Heeft u hulp nodig met ${slug.replace(/-/g, ' ')}? Onze ervaren professionals staan 24/7 voor u klaar.`,
    features: ['24/7 Beschikbaar', 'Snelle responstijd', 'Professioneel team', 'Transparante prijzen'],
    image: '/herobgcar.jpg'
  };
}

export async function generateStaticParams() {
  const locales = ['nl', 'en', 'fr', 'de'];
  
  interface StaticParams {
    locale: string;
    slug: string;
  }

  const params: StaticParams[] = [];

  // Generate params for each keyword in each locale
  seoKeywords.forEach(keyword => {
    locales.forEach(locale => {
      params.push({ 
        locale: locale,
        slug: keyword 
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!seoKeywords.includes(slug)) {
    return { title: 'Page Not Found' };
  }

  const serviceContent = getServiceContent(slug);
  const description = `${serviceContent.subtitle}. Bel 085-250 29 28 voor directe hulp.`;

  return {
    title: `${serviceContent.title} - Mobiele Hulp Nederland`,
    description,
    keywords: slug.split('-').join(', '),
    openGraph: {
      title: `${serviceContent.title} - Mobiele Hulp Nederland`,
      description,
      type: 'website',
      locale: locale,
    },
    alternates: {
      canonical: `/${locale}/${slug}`,
    },
  };
}

export default async function SEOPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!seoKeywords.includes(slug)) {
    notFound();
  }

  const dict = await getDictionary(locale as "nl" | "en" | "fr" | "de");
  const serviceContent = getServiceContent(slug);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative text-white py-24 overflow-hidden flex items-center"
        style={{
          backgroundImage: `url(${serviceContent.image})`,
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
                    {serviceContent.title}
                  </span>
                </h1>
                <p className="text-sm md:text-md text-gray-200 leading-relaxed max-w-2xl">
                  {serviceContent.subtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <a
                  href="tel:0852502928"
                  className="w-full max-w-xs sm:w-auto inline-flex items-center justify-between px-6 py-3 bg-white text-black rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition-all group"
                >
                  <span className="flex items-center gap-2 font-medium text-base">
                    Bel direct: 085-250 29 28
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

      {/* Service Details Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          {/* Image section */}
          <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={serviceContent.image}
              alt={serviceContent.title}
              layout="fill"
              objectFit="cover"
              className="rounded-3xl"
              priority
            />
          </div>

          {/* Text section */}
          <div>
            <p className="text-sm text-gray-500 mb-3">
              Professionele Service
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {serviceContent.title}
            </h2>
            <p className="text-lg font-semibold text-gray-900 mb-3">
              {serviceContent.subtitle}
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {serviceContent.description}
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {serviceContent.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#c8eb67]" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="bg-black text-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-gray-900">
              Contact opnemen
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Waarom kiezen voor Mobiele Hulp Nederland?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Met jarenlange ervaring en een professioneel team staan wij 24/7 voor u klaar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-[#c8eb67] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Beschikbaar</h3>
              <p className="text-gray-600">
                Dag en nacht bereikbaar voor al uw noodsituaties. Binnen 30 minuten ter plaatse.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-[#c8eb67] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Volledig Verzekerd</h3>
              <p className="text-gray-600">
                Al onze diensten zijn volledig verzekerd en uitgevoerd door gecertificeerde professionals.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-[#c8eb67] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ervaren Team</h3>
              <p className="text-gray-600">
                Ons team bestaat uit ervaren monteurs met jarenlange expertise in de automotive sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-6">
          <div className="md:w-3/5 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {dict.pechhulp.locatiesectie.title}
            </h2>
            <p className="text-gray-700 mt-4 text-base md:text-lg">
              {dict.pechhulp.locatiesectie.description}
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

      {/* Emergency Section */}
      <section className="py-12 bg-[#c8eb67] text-black relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <AlertTriangle className="h-20 w-20 mx-auto mb-6 text-black" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Noodsituatie?
            </h2>
            <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
              Bij een noodsituatie kunt u ons direct bereiken via onderstaand telefoonnummer.
            </p>
          </div>

          <div className="bg-black rounded-2xl p-8 mb-12 max-w-md mx-auto">
            <Phone className="h-12 w-12 mx-auto mb-4 text-white" />
            <div className="text-4xl md:text-5xl text-white font-bold mb-2">
              085-250 29 28
            </div>
            <div className="text-white">
              24/7 Bereikbaar
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection dict={dict} />

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-4">
          <div className="col-span-2">
            <div className="text-2xl font-bold mb-2">Pechhulp Nederland</div>
            <p className="text-sm text-white mb-4">
              Pechhulp Nederland is jouw betrouwbare partner bij autopech, waar je ook bent.
            </p>
            <div className="flex items-center gap-3 text-[#c8eb67]">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.4 8.168L12 18.897l-7.334 3.864 1.4-8.168L.132 9.211l8.2-1.193z" />
                </svg>
              ))}
              <span className="text-white ml-2 text-sm">4.9/5 (2.847 reviews)</span>
            </div>
            <div className="pt-8 flex flex-col gap-4">
              <a
                href="tel:0852502928"
                className="w-full mb-4 max-w-xs sm:w-auto inline-flex items-center justify-between px-6 py-3 bg-white text-black rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition-all group"
              >
                <span className="flex items-center gap-2 font-medium text-base">
                  Bel direct: 085-250 29 28
                </span>
                <span className="ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-black text-white group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </span>
              </a>
              <Link
                href={`/${locale}/contact`}
                className="w-full max-w-xs sm:w-auto inline-flex items-center justify-between rounded-full bg-white text-black border border-gray-300 hover:shadow-md px-6 py-3 font-medium transition-all group"
              >
                <span className="mr-2">Contact opnemen</span>
                <div className="w-8 h-8 rounded-full bg-[#c8eb67] text-black flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Diensten</h4>
            <ul className="space-y-2 text-sm text-white">
              <li><Link href={`/${locale}/diensten/pechhulp-en-sleepdienst-europa`}>Pechhulp & Sleepdienst Europa</Link></li>
              <li><Link href={`/${locale}/diensten/uit-modder-zand-of-object-slepen`}>Uit modder, zand of object slepen</Link></li>
              <li><Link href={`/${locale}/diensten/accu-service`}>Accu service</Link></li>
              <li><Link href={`/${locale}/diensten/auto-transport`}>Auto transport</Link></li>
              <li><Link href={`/${locale}/diensten/lekke-band`}>Lekke band</Link></li>
              <li><Link href={`/${locale}/diensten/autoberging-247`}>Autoberging 24/7</Link></li>
            </ul>
          </div>

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
          <Link href={`/${locale}/privacybeleid`} className="hover:underline">Privacybeleid</Link>
          {" • "}
          <Link href={`/${locale}/algemene-voorwaarden`} className="hover:underline mx-2">Algemene voorwaarden</Link>
          {" • "}
          <Link href={`/${locale}/sitemap`} className="hover:underline">Sitemap</Link>
          <br />
          <span className="block mt-2">© 2025 Pechhulp Nederland. Alle rechten voorbehouden.</span>
        </div>
      </footer>
    </div>
  );
}
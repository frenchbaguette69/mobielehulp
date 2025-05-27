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
function getServiceContent(slug: string, dict: any) {
  const serviceMap: Record<string, { title: string; subtitle: string; description: string; features: string[]; image: string }> = {
    // Transport service
    'car-transport': {
      title: dict.service?.['car-transport']?.title || 'Car Transport Service',
      subtitle: dict.service?.['car-transport']?.subtitle || 'Veilig autotransport door heel Europa',
      description: dict.service?.['car-transport']?.description || 'Professioneel autotransport voor particulieren en bedrijven. Uw voertuig wordt veilig en verzekerd vervoerd naar elke gewenste bestemming.',
      features: dict.service?.['car-transport']?.features || ['Verzekerd transport', 'Door heel Europa', 'Voor alle voertuigtypes', 'Tracking mogelijk'],
      image: '/herobgcar.jpg'
    },

    // Breakdown service
    'auto-pech': {
      title: dict.service?.['auto-pech']?.title || 'Auto Pech Service 24/7',
      subtitle: dict.service?.['auto-pech']?.subtitle || 'Direct hulp bij autopech, waar u ook bent',
      description: dict.service?.['auto-pech']?.description || 'Wanneer uw auto het begeeft, zijn wij er om u te helpen. Onze ervaren monteurs komen snel ter plaatse om uw voertuig weer aan de praat te krijgen.',
      features: dict.service?.['auto-pech']?.features || ['24/7 beschikbaar', 'Binnen 30 minuten ter plaatse', 'Gecertificeerde monteurs', 'Transparante prijzen'],
      image: '/band.png'
    },
    'pechhulp': {
      title: dict.service?.['pechhulp']?.title || 'Pechhulp Service Nederland',
      subtitle: dict.service?.['pechhulp']?.subtitle || 'Snelle hulp bij autopech overal in Nederland',
      description: dict.service?.['pechhulp']?.description || 'Onze pechhulp service staat 24/7 voor u klaar. Van kleine reparaties tot complete bergingen, wij helpen u verder.',
      features: dict.service?.['pechhulp']?.features || ['24/7 bereikbaar', 'Snelle responstijd', 'Ervaren monteurs', 'Heel Nederland'],
      image: '/band.png'
    },

    // Towing service
    'sleepdienst-auto': {
      title: dict.service?.['sleepdienst-auto']?.title || 'Sleepdienst Auto Nederland',
      subtitle: dict.service?.['sleepdienst-auto']?.subtitle || 'Professionele sleepdienst door heel Nederland',
      description: dict.service?.['sleepdienst-auto']?.description || 'Onze moderne sleepwagens kunnen elk type voertuig veilig transporteren. Van personenauto tot bestelwagen, wij regelen het transport.',
      features: dict.service?.['sleepdienst-auto']?.features || ['Moderne sleepwagens', 'Verzekerde transporten', 'Heel Nederland', 'Snelle service'],
      image: '/herobgcar.jpg'
    },
    'slepen-auto': {
      title: dict.service?.['slepen-auto']?.title || 'Auto Slepen Service',
      subtitle: dict.service?.['slepen-auto']?.subtitle || 'Professionele sleepservice 24/7',
      description: dict.service?.['slepen-auto']?.description || 'Wanneer uw auto niet meer rijdt, zorgen wij voor veilig transport naar uw gewenste bestemming. Moderne sleepwagens en ervaren chauffeurs.',
      features: dict.service?.['slepen-auto']?.features || ['Moderne sleepwagens', 'Ervaren chauffeurs', 'Verzekerd transport', 'Heel Nederland'],
      image: '/herobgcar.jpg'
    },
    'sleepbedrijf': {
      title: dict.service?.['sleepbedrijf']?.title || 'Professioneel Sleepbedrijf',
      subtitle: dict.service?.['sleepbedrijf']?.subtitle || 'Uw betrouwbare partner voor sleepwerk',
      description: dict.service?.['sleepbedrijf']?.description || 'Als ervaren sleepbedrijf staan wij dag en nacht klaar voor al uw sleepwerk. Van personenauto tot vrachtwagen.',
      features: dict.service?.['sleepbedrijf']?.features || ['24/7 beschikbaar', 'Alle voertuigtypes', 'Gecertificeerd bedrijf', 'Concurrerende prijzen'],
      image: '/herobgcar.jpg'
    },
    'auto-weg-laten-slepen': {
      title: dict.service?.['auto-weg-laten-slepen']?.title || 'Auto Weg Laten Slepen',
      subtitle: dict.service?.['auto-weg-laten-slepen']?.subtitle || 'Snel en veilig uw auto laten wegslepen',
      description: dict.service?.['auto-weg-laten-slepen']?.description || 'Moet uw auto weggesleept worden? Wij zorgen voor professionele afhandeling en veilig transport naar de gewenste locatie.',
      features: dict.service?.['auto-weg-laten-slepen']?.features || ['Snelle afhandeling', 'Veilig transport', 'Transparante kosten', 'Professionele service'],
      image: '/herobgcar.jpg'
    },
    'sleepdienst': {
      title: dict.service?.['sleepdienst']?.title || 'Sleepdienst 24/7',
      subtitle: dict.service?.['sleepdienst']?.subtitle || 'Betrouwbare sleepdienst dag en nacht',
      description: dict.service?.['sleepdienst']?.description || 'Onze sleepdienst is 24 uur per dag, 7 dagen per week beschikbaar voor al uw sleepbehoeften. Professioneel en betrouwbaar.',
      features: dict.service?.['sleepdienst']?.features || ['24/7 service', 'Moderne apparatuur', 'Ervaren chauffeurs', 'Snelle respons'],
      image: '/herobgcar.jpg'
    },
    'sleepwagen': {
      title: dict.service?.['sleepwagen']?.title || 'Sleepwagen Service',
      subtitle: dict.service?.['sleepwagen']?.subtitle || 'Moderne sleepwagens voor elk transport',
      description: dict.service?.['sleepwagen']?.description || 'Onze vloot moderne sleepwagens kan elk type voertuig veilig transporteren. Van kleine auto tot grote bestelwagens.',
      features: dict.service?.['sleepwagen']?.features || ['Moderne vloot', 'Alle voertuigtypes', 'Veilig transport', 'Professionele chauffeurs'],
      image: '/herobgcar.jpg'
    },

    // Recovery service
    'auto-berging': {
      title: dict.service?.['auto-berging']?.title || 'Auto Berging Service',
      subtitle: dict.service?.['auto-berging']?.subtitle || 'Professionele autoberging na ongevallen',
      description: dict.service?.['auto-berging']?.description || 'Na een ongeval zorgen wij voor veilige berging van uw voertuig. Onze gespecialiseerde bergingswagens kunnen elk type auto bergen.',
      features: dict.service?.['auto-berging']?.features || ['24/7 bergingsdienst', 'Gespecialiseerde apparatuur', 'Verzekerde berging', 'Snelle responstijd'],
      image: '/herobgcar.jpg'
    },
    'takelbedrijf': {
      title: dict.service?.['takelbedrijf']?.title || 'Takelbedrijf Nederland',
      subtitle: dict.service?.['takelbedrijf']?.subtitle || 'Professioneel takelbedrijf voor alle situaties',
      description: dict.service?.['takelbedrijf']?.description || 'Ons takelbedrijf is gespecialiseerd in het bergen en takelen van voertuigen in alle omstandigheden. Ervaren en betrouwbaar.',
      features: dict.service?.['takelbedrijf']?.features || ['Gespecialiseerde apparatuur', 'Ervaren operators', 'Alle situaties', '24/7 beschikbaar'],
      image: '/herobgcar.jpg'
    },
    'takelwagen': {
      title: dict.service?.['takelwagen']?.title || 'Takelwagen Service',
      subtitle: dict.service?.['takelwagen']?.subtitle || 'Professionele takelwagens voor zware berging',
      description: dict.service?.['takelwagen']?.description || 'Onze takelwagens zijn uitgerust voor zware bergingen en complexe takelsituaties. Professioneel uitgevoerd door ervaren operators.',
      features: dict.service?.['takelwagen']?.features || ['Zware takelcapaciteit', 'Ervaren operators', 'Gespecialiseerde uitrusting', 'Veilige uitvoering'],
      image: '/herobgcar.jpg'
    },

    // Mud/sand recovery service
    'wat-te-doen-als-je-auto-vast-zit-in-de-modder': {
      title: dict.service?.['wat-te-doen-als-je-auto-vast-zit-in-de-modder']?.title || 'Wat Te Doen Als Auto Vast Zit In Modder',
      subtitle: dict.service?.['wat-te-doen-als-je-auto-vast-zit-in-de-modder']?.subtitle || 'Directe hulp en advies bij vastgereden voertuigen',
      description: dict.service?.['wat-te-doen-als-je-auto-vast-zit-in-de-modder']?.description || 'Auto vastgereden in de modder? Wij geven u direct advies en komen ter plaatse om uw voertuig professioneel te bevrijden.',
      features: dict.service?.['wat-te-doen-als-je-auto-vast-zit-in-de-modder']?.features || ['Direct advies', 'Professionele bevrijding', 'Gespecialiseerde apparatuur', 'Geen voertuigschade'],
      image: '/band.png'
    },
    'auto-uit-modder-slepen': {
      title: dict.service?.['auto-uit-modder-slepen']?.title || 'Auto Uit Modder Slepen',
      subtitle: dict.service?.['auto-uit-modder-slepen']?.subtitle || 'Gespecialiseerd in het bevrijden van vastgereden voertuigen',
      description: dict.service?.['auto-uit-modder-slepen']?.description || 'Zit uw auto vast in de modder, zand of sneeuw? Onze gespecialiseerde takeldienst heeft de juiste apparatuur om uw voertuig veilig te bevrijden.',
      features: dict.service?.['auto-uit-modder-slepen']?.features || ['Gespecialiseerde lieren', 'Ervaren operators', 'Geen schade aan voertuig', 'Alle terreintypes'],
      image: '/band.png'
    },
    'vast-in-modder-auto': {
      title: dict.service?.['vast-in-modder-auto']?.title || 'Auto Vast In Modder - Direct Hulp',
      subtitle: dict.service?.['vast-in-modder-auto']?.subtitle || 'Snelle hulp bij vastgereden voertuigen',
      description: dict.service?.['vast-in-modder-auto']?.description || 'Staat uw auto vast in de modder? Onze specialisten komen direct ter plaatse om uw voertuig veilig te bevrijden zonder schade.',
      features: dict.service?.['vast-in-modder-auto']?.features || ['Direct ter plaatse', 'Professionele lieren', 'Veilige bevrijding', 'Geen voertuigschade'],
      image: '/band.png'
    },
    'auto-vast-in-modder': {
      title: dict.service?.['auto-vast-in-modder']?.title || 'Hulp Bij Auto Vast In Modder',
      subtitle: dict.service?.['auto-vast-in-modder']?.subtitle || 'Directe hulp wanneer u vastgereden bent',
      description: dict.service?.['auto-vast-in-modder']?.description || 'Vastgereden in modderige omstandigheden? Wij helpen u er snel en veilig uit met onze professionele takeldienst.',
      features: dict.service?.['auto-vast-in-modder']?.features || ['Direct ter plaatse', 'Professionele lieren', 'Veilige bevrijding', 'Geen voertuigschade'],
      image: '/band.png'
    },
    'auto-uit-de-modder-halen': {
      title: dict.service?.['auto-uit-de-modder-halen']?.title || 'Auto Uit De Modder Halen',
      subtitle: dict.service?.['auto-uit-de-modder-halen']?.subtitle || 'Professionele bevrijding uit modder',
      description: dict.service?.['auto-uit-de-modder-halen']?.description || 'Gespecialiseerd in het uit de modder halen van voertuigen. Met de juiste apparatuur en ervaring bevrijden wij uw auto veilig.',
      features: dict.service?.['auto-uit-de-modder-halen']?.features || ['Gespecialiseerde technieken', 'Veilige bevrijding', 'Minimale schade', 'Snelle service'],
      image: '/band.png'
    },
    'auto-vastgereden-in-modder': {
      title: dict.service?.['auto-vastgereden-in-modder']?.title || 'Auto Vastgereden In Modder Service',
      subtitle: dict.service?.['auto-vastgereden-in-modder']?.subtitle || 'Hulp bij vastgereden voertuigen',
      description: dict.service?.['auto-vastgereden-in-modder']?.description || 'Is uw auto vastgereden in de modder? Onze ervaren bergingsteam bevrijdt uw voertuig professioneel en veilig.',
      features: dict.service?.['auto-vastgereden-in-modder']?.features || ['Ervaren bergingsteam', 'Professionele uitvoering', 'Veilige bevrijding', 'Direct beschikbaar'],
      image: '/band.png'
    },
    'vast-in-de-modder': {
      title: dict.service?.['vast-in-de-modder']?.title || 'Vast In De Modder - Hulpservice',
      subtitle: dict.service?.['vast-in-de-modder']?.subtitle || 'Directe hulp bij modderproblematiek',
      description: dict.service?.['vast-in-de-modder']?.description || 'Zit u vast in de modder met uw voertuig? Onze gespecialiseerde hulpservice komt direct ter plaatse voor professionele bevrijding.',
      features: dict.service?.['vast-in-de-modder']?.features || ['Directe hulp', 'Gespecialiseerde service', 'Professionele bevrijding', 'Ervaren team'],
      image: '/band.png'
    },
    'auto-zit-vast-in-modder': {
      title: dict.service?.['auto-zit-vast-in-modder']?.title || 'Auto Zit Vast In Modder - Hulp',
      subtitle: dict.service?.['auto-zit-vast-in-modder']?.subtitle || 'Onmiddellijke hulp bij vastzitten',
      description: dict.service?.['auto-zit-vast-in-modder']?.description || 'Zit uw auto vast in de modder? Geen paniek! Onze professionele bergingsdienst bevrijdt uw voertuig snel en veilig.',
      features: dict.service?.['auto-zit-vast-in-modder']?.features || ['Onmiddellijke hulp', 'Professionele berging', 'Veilige technieken', 'Snelle respons'],
      image: '/band.png'
    },
    'hoe-krijg-je-een-auto-uit-de-modder': {
      title: dict.service?.['hoe-krijg-je-een-auto-uit-de-modder']?.title || 'Hoe Krijg Je Een Auto Uit De Modder',
      subtitle: dict.service?.['hoe-krijg-je-een-auto-uit-de-modder']?.subtitle || 'Expert advies en professionele hulp',
      description: dict.service?.['hoe-krijg-je-een-auto-uit-de-modder']?.description || 'Weet u niet hoe u uw auto uit de modder krijgt? Onze experts geven advies en bieden professionele hulp voor veilige bevrijding.',
      features: dict.service?.['hoe-krijg-je-een-auto-uit-de-modder']?.features || ['Expert advies', 'Professionele technieken', 'Veilige methoden', 'Bewezen resultaten'],
      image: '/band.png'
    },
    'vast-in-de-modder-met-auto': {
      title: dict.service?.['vast-in-de-modder-met-auto']?.title || 'Vast In De Modder Met Auto',
      subtitle: dict.service?.['vast-in-de-modder-met-auto']?.subtitle || 'Specialized hulp voor modder situaties',
      description: dict.service?.['vast-in-de-modder-met-auto']?.description || 'Met uw auto vast in de modder? Onze gespecialiseerde hulpdienst heeft ervaring met alle modder situaties en bevrijdt u professioneel.',
      features: dict.service?.['vast-in-de-modder-met-auto']?.features || ['Gespecialiseerde hulp', 'Alle modder situaties', 'Professionele bevrijding', 'Ervaren team'],
      image: '/band.png'
    },
    'auto-in-de-modder': {
      title: dict.service?.['auto-in-de-modder']?.title || 'Auto In De Modder - Bergingsdienst',
      subtitle: dict.service?.['auto-in-de-modder']?.subtitle || 'Professionele bergingsdienst voor modder',
      description: dict.service?.['auto-in-de-modder']?.description || 'Auto in de modder beland? Onze professionele bergingsdienst heeft de expertise om uw voertuig veilig en zonder schade te bevrijden.',
      features: dict.service?.['auto-in-de-modder']?.features || ['Professionele berging', 'Modder expertise', 'Veilige bevrijding', 'Geen schade'],
      image: '/band.png'
    },
    'auto-staat-vast-in-de-modder': {
      title: dict.service?.['auto-staat-vast-in-de-modder']?.title || 'Auto Staat Vast In De Modder',
      subtitle: dict.service?.['auto-staat-vast-in-de-modder']?.subtitle || 'Directe interventie bij vaststaande auto',
      description: dict.service?.['auto-staat-vast-in-de-modder']?.description || 'Staat uw auto vast in de modder? Wij interveniëren direct met professionele apparatuur om uw voertuig te bevrijden.',
      features: dict.service?.['auto-staat-vast-in-de-modder']?.features || ['Directe interventie', 'Professionele apparatuur', 'Snelle bevrijding', 'Ervaren operators'],
      image: '/band.png'
    },

    // Snow recovery service
    'vast-in-sneeuw-auto': {
      title: dict.service?.['vast-in-sneeuw-auto']?.title || 'Auto Vast In Sneeuw - Winterhulp',
      subtitle: dict.service?.['vast-in-sneeuw-auto']?.subtitle || 'Gespecialiseerde winterhulp service',
      description: dict.service?.['vast-in-sneeuw-auto']?.description || 'Auto vast in de sneeuw? Onze winterspecialisten komen ter plaatse met de juiste apparatuur om uw voertuig te bevrijden.',
      features: dict.service?.['vast-in-sneeuw-auto']?.features || ['Winterspecialisten', 'Sneeuwkettingen service', 'Veilige bevrijding', '24/7 winterhulp'],
      image: '/herobgcar.jpg'
    },
    'auto-vast-in-sneeuw': {
      title: dict.service?.['auto-vast-in-sneeuw']?.title || 'Auto Vast In Sneeuw Service',
      subtitle: dict.service?.['auto-vast-in-sneeuw']?.subtitle || 'Winterhulp voor vastgereden voertuigen',
      description: dict.service?.['auto-vast-in-sneeuw']?.description || 'Sneeuw en ijs kunnen uw auto doen vastlopen. Onze winterspecialisten bevrijden uw voertuig snel en veilig.',
      features: dict.service?.['auto-vast-in-sneeuw']?.features || ['Winterspecialisten', 'Sneeuwkettingen service', 'Veilige bevrijding', '24/7 winterhulp'],
      image: '/herobgcar.jpg'
    },

    // Sand recovery service
    'auto-vast-in-zand': {
      title: dict.service?.['auto-vast-in-zand']?.title || 'Auto Vast In Zand - Bevrijdingsdienst',
      subtitle: dict.service?.['auto-vast-in-zand']?.subtitle || 'Gespecialiseerd in zandbevrijding',
      description: dict.service?.['auto-vast-in-zand']?.description || 'Auto vast in het zand? Onze gespecialiseerde bevrijdingsdienst heeft ervaring met alle zandtypes en bevrijdt uw voertuig professioneel.',
      features: dict.service?.['auto-vast-in-zand']?.features || ['Zand specialisten', 'Alle zandtypes', 'Professionele bevrijding', 'Speciale technieken'],
      image: '/band.png'
    },

    // Ditch/water recovery service
    'auto-in-de-sloot-vandaag': {
      title: dict.service?.['auto-in-de-sloot-vandaag']?.title || 'Auto In Sloot Vandaag - Spoed Berging',
      subtitle: dict.service?.['auto-in-de-sloot-vandaag']?.subtitle || 'Spoedberging uit sloten',
      description: dict.service?.['auto-in-de-sloot-vandaag']?.description || 'Auto vandaag in de sloot beland? Onze spoedbergingsdienst komt direct ter plaatse voor professionele waterberging.',
      features: dict.service?.['auto-in-de-sloot-vandaag']?.features || ['Spoedberging', 'Waterberging expertise', 'Direct ter plaatse', 'Gespecialiseerde kranen'],
      image: '/herobgcar.jpg'
    },
    'auto-belandt-in-sloot': {
      title: dict.service?.['auto-belandt-in-sloot']?.title || 'Auto Belandt In Sloot - Noodberging',
      subtitle: dict.service?.['auto-belandt-in-sloot']?.subtitle || 'Noodberging uit waterpartijen',
      description: dict.service?.['auto-belandt-in-sloot']?.description || 'Is uw auto in een sloot beland? Onze noodbergingsdienst heeft de expertise voor veilige berging uit waterpartijen.',
      features: dict.service?.['auto-belandt-in-sloot']?.features || ['Noodberging 24/7', 'Waterpartij expertise', 'Veilige berging', 'Gespecialiseerde apparatuur'],
      image: '/herobgcar.jpg'
    },
    'auto-in-sloot-vandaag': {
      title: dict.service?.['auto-in-sloot-vandaag']?.title || 'Auto In Sloot Vandaag - Directe Hulp',
      subtitle: dict.service?.['auto-in-sloot-vandaag']?.subtitle || 'Directe hulp bij slootberging',
      description: dict.service?.['auto-in-sloot-vandaag']?.description || 'Vandaag auto in sloot? Geen paniek! Onze directe hulpdienst komt ter plaatse voor professionele en veilige berging.',
      features: dict.service?.['auto-in-sloot-vandaag']?.features || ['Directe hulp', 'Vandaag beschikbaar', 'Professionele berging', 'Sloot specialisten'],
      image: '/herobgcar.jpg'
    },
    'auto-in-de-sloot': {
      title: dict.service?.['auto-in-de-sloot']?.title || 'Auto In De Sloot - Berging',
      subtitle: dict.service?.['auto-in-de-sloot']?.subtitle || 'Gespecialiseerde berging uit sloten en greppels',
      description: dict.service?.['auto-in-de-sloot']?.description || 'Auto in de sloot beland? Onze gespecialiseerde bergingsteams hebben de expertise en apparatuur om uw voertuig veilig te bergen.',
      features: dict.service?.['auto-in-de-sloot']?.features || ['Gespecialiseerde kranen', 'Waterberging expertise', 'Minimale schade', 'Snelle respons'],
      image: '/herobgcar.jpg'
    },
    'auto-in-sloot': {
      title: dict.service?.['auto-in-sloot']?.title || 'Auto In Sloot Berging',
      subtitle: dict.service?.['auto-in-sloot']?.subtitle || 'Professionele berging uit water',
      description: dict.service?.['auto-in-sloot']?.description || 'Specialistische berging van voertuigen die in sloten of andere waterpartijen zijn beland. Veilig en professioneel uitgevoerd.',
      features: dict.service?.['auto-in-sloot']?.features || ['Waterberging specialist', 'Kraan en lier service', 'Milieuverantwoord', 'Directe hulp'],
      image: '/herobgcar.jpg'
    },
    'auto-in-de-greppel': {
      title: dict.service?.['auto-in-de-greppel']?.title || 'Auto In De Greppel - Bergingsdienst',
      subtitle: dict.service?.['auto-in-de-greppel']?.subtitle || 'Specialistische greppelberging',
      description: dict.service?.['auto-in-de-greppel']?.description || 'Auto in de greppel beland? Onze specialistische bergingsdienst heeft ervaring met greppel- en dijkbergingen.',
      features: dict.service?.['auto-in-de-greppel']?.features || ['Greppel specialisten', 'Dijkberging ervaring', 'Veilige technieken', 'Minimale schade'],
      image: '/herobgcar.jpg'
    },
    'auto-in-de-berm': {
      title: dict.service?.['auto-in-de-berm']?.title || 'Auto In De Berm - Bergingshulp',
      subtitle: dict.service?.['auto-in-de-berm']?.subtitle || 'Professionele bermberging',
      description: dict.service?.['auto-in-de-berm']?.description || 'Auto in de berm beland? Onze bergingshulp komt ter plaatse voor veilige en professionele berging uit de wegberm.',
      features: dict.service?.['auto-in-de-berm']?.features || ['Bermberging expertise', 'Verkeersveilige berging', 'Snelle afhandeling', 'Professioneel team'],
      image: '/herobgcar.jpg'
    },

    // Grass/terrain recovery
    'auto-vast-in-gras': {
      title: dict.service?.['auto-vast-in-gras']?.title || 'Auto Vast In Gras - Terreinberging',
      subtitle: dict.service?.['auto-vast-in-gras']?.subtitle || 'Gespecialiseerde terreinberging',
      description: dict.service?.['auto-vast-in-gras']?.description || 'Auto vast in gras of zachte ondergrond? Onze terreinspecialisten bevrijden uw voertuig zonder schade aan gras of voertuig.',
      features: dict.service?.['auto-vast-in-gras']?.features || ['Terrein specialisten', 'Gras vriendelijk', 'Zachte ondergrond', 'Geen terreinschade'],
      image: '/band.png'
    },

    // International keyword
    'car-stuck-in-the-mud': {
      title: dict.service?.['car-stuck-in-the-mud']?.title || 'Car Stuck In The Mud - Recovery Service',
      subtitle: dict.service?.['car-stuck-in-the-mud']?.subtitle || 'Professional mud recovery service',
      description: dict.service?.['car-stuck-in-the-mud']?.description || 'Car stuck in the mud? Our professional recovery service has the expertise and equipment to safely free your vehicle.',
      features: dict.service?.['car-stuck-in-the-mud']?.features || ['Professional recovery', 'Specialized equipment', 'Safe extraction', 'No vehicle damage'],
      image: '/band.png'
    },

    // Battery service
    'accu-service-aan-huis': {
      title: dict.service?.['accu-service-aan-huis']?.title || 'Accu Service Aan Huis',
      subtitle: dict.service?.['accu-service-aan-huis']?.subtitle || 'Nieuwe accu geleverd en gemonteerd bij u thuis',
      description: dict.service?.['accu-service-aan-huis']?.description || 'Lege accu? Geen probleem! Wij leveren en monteren een nieuwe accu bij u aan huis. Kwaliteitsaccu\'s met garantie.',
      features: dict.service?.['accu-service-aan-huis']?.features || ['Aan huis service', 'Kwaliteitsaccu\'s', 'Direct gemonteerd', 'Garantie inbegrepen'],
      image: '/band.png'
    },
    'accu-auto-leeg': {
      title: dict.service?.['accu-auto-leeg']?.title || 'Lege Auto Accu Service',
      subtitle: dict.service?.['accu-auto-leeg']?.subtitle || 'Startproblemen? Wij helpen direct',
      description: dict.service?.['accu-auto-leeg']?.description || 'Lege accu en komt uw auto niet meer aan de praat? Onze monteurs komen ter plaatse voor starthulp of accuvervanging.',
      features: dict.service?.['accu-auto-leeg']?.features || ['Directe starthulp', 'Nieuwe accu beschikbaar', 'Ter plaatse montage', 'Alle automerken'],
      image: '/band.png'
    },
    'auto-accu-leeg-wat-nu': {
      title: dict.service?.['auto-accu-leeg-wat-nu']?.title || 'Auto Accu Leeg Wat Nu - Hulp',
      subtitle: dict.service?.['auto-accu-leeg-wat-nu']?.subtitle || 'Directe hulp bij lege accu',
      description: dict.service?.['auto-accu-leeg-wat-nu']?.description || 'Auto accu leeg en weet niet wat nu? Wij helpen direct met starthulp of leveren een nieuwe accu aan huis.',
      features: dict.service?.['auto-accu-leeg-wat-nu']?.features || ['Directe hulp', 'Starthulp service', 'Nieuwe accu levering', 'Expert advies'],
      image: '/band.png'
    },
    'service-accu': {
      title: dict.service?.['service-accu']?.title || 'Service Accu Nederland',
      subtitle: dict.service?.['service-accu']?.subtitle || 'Volledige accuservice voor uw auto',
      description: dict.service?.['service-accu']?.description || 'Onze volledige accuservice omvat het testen, vervangen en onderhouden van auto accu\'s. Professioneel en betrouwbaar.',
      features: dict.service?.['service-accu']?.features || ['Volledige accuservice', 'Testen en vervangen', 'Professioneel onderhoud', 'Alle automerken'],
      image: '/band.png'
    },
    'accu-vervangen-aan-huis': {
      title: dict.service?.['accu-vervangen-aan-huis']?.title || 'Accu Vervangen Aan Huis',
      subtitle: dict.service?.['accu-vervangen-aan-huis']?.subtitle || 'Nieuwe accu geleverd en gemonteerd',
      description: dict.service?.['accu-vervangen-aan-huis']?.description || 'Heeft u een nieuwe accu nodig? Wij leveren en monteren deze bij u aan huis. Kwaliteitsaccu\'s met volledige garantie.',
      features: dict.service?.['accu-vervangen-aan-huis']?.features || ['Aan huis levering', 'Direct gemonteerd', 'Garantie inbegrepen', 'Alle voertuigtypes'],
      image: '/band.png'
    },
    'accuservice': {
      title: dict.service?.['accuservice']?.title || 'Accuservice Nederland',
      subtitle: dict.service?.['accuservice']?.subtitle || 'Complete accuservice voor alle voertuigen',
      description: dict.service?.['accuservice']?.description || 'Onze complete accuservice biedt alles van starthulp tot nieuwe accu\'s. Voor alle voertuigtypes met professionele montage.',
      features: dict.service?.['accuservice']?.features || ['Complete service', 'Alle voertuigtypes', 'Professionele montage', 'Kwaliteitsgarantie'],
      image: '/band.png'
    },
    'vervangen-accu-auto': {
      title: dict.service?.['vervangen-accu-auto']?.title || 'Vervangen Accu Auto Service',
      subtitle: dict.service?.['vervangen-accu-auto']?.subtitle || 'Professionele accuvervanging',
      description: dict.service?.['vervangen-accu-auto']?.description || 'Moet uw auto accu vervangen worden? Onze service zorgt voor snelle en professionele vervanging met kwaliteitsaccu\'s.',
      features: dict.service?.['vervangen-accu-auto']?.features || ['Snelle vervanging', 'Kwaliteitsaccu\'s', 'Professionele montage', 'Garantie service'],
      image: '/band.png'
    },
    'accu-vervangen-auto': {
      title: dict.service?.['accu-vervangen-auto']?.title || 'Accu Vervangen Auto',
      subtitle: dict.service?.['accu-vervangen-auto']?.subtitle || 'Auto accu vervangen door professionals',
      description: dict.service?.['accu-vervangen-auto']?.description || 'Laat uw auto accu vervangen door onze professionals. Wij zorgen voor de juiste accu en professionele montage.',
      features: dict.service?.['accu-vervangen-auto']?.features || ['Professionele vervanging', 'Juiste accu keuze', 'Expert montage', 'Betrouwbare service'],
      image: '/band.png'
    },
    'auto-accu-vervangen-aan-huis': {
      title: dict.service?.['auto-accu-vervangen-aan-huis']?.title || 'Auto Accu Vervangen Aan Huis',
      subtitle: dict.service?.['auto-accu-vervangen-aan-huis']?.subtitle || 'Accuvervanging bij u thuis',
      description: dict.service?.['auto-accu-vervangen-aan-huis']?.description || 'Wij vervangen uw auto accu bij u aan huis. Geen gedoe met naar de garage, wij komen naar u toe.',
      features: dict.service?.['auto-accu-vervangen-aan-huis']?.features || ['Aan huis service', 'Geen garage bezoek', 'Direct gemonteerd', 'Gemakkelijk en snel'],
      image: '/band.png'
    },
    'accu-auto-vervangen': {
      title: dict.service?.['accu-auto-vervangen']?.title || 'Accu Auto Vervangen Service',
      subtitle: dict.service?.['accu-auto-vervangen']?.subtitle || 'Betrouwbare accuvervanging',
      description: dict.service?.['accu-auto-vervangen']?.description || 'Betrouwbare vervanging van uw auto accu door ervaren monteurs. Kwaliteitsaccu\'s tegen scherpe prijzen.',
      features: dict.service?.['accu-auto-vervangen']?.features || ['Betrouwbare service', 'Ervaren monteurs', 'Kwaliteitsaccu\'s', 'Scherpe prijzen'],
      image: '/band.png'
    },
    'accu-laten-vervangen-aan-huis': {
      title: dict.service?.['accu-laten-vervangen-aan-huis']?.title || 'Accu Laten Vervangen Aan Huis',
      subtitle: dict.service?.['accu-laten-vervangen-aan-huis']?.subtitle || 'Laat uw accu thuis vervangen',
      description: dict.service?.['accu-laten-vervangen-aan-huis']?.description || 'Laat uw accu gemakkelijk aan huis vervangen. Onze mobiele service komt naar u toe voor professionele vervanging.',
      features: dict.service?.['accu-laten-vervangen-aan-huis']?.features || ['Mobiele service', 'Aan huis vervanging', 'Professioneel uitgevoerd', 'Geen reistijd'],
      image: '/band.png'
    },
    'auto-accu-vervangen': {
      title: dict.service?.['auto-accu-vervangen']?.title || 'Auto Accu Vervangen',
      subtitle: dict.service?.['auto-accu-vervangen']?.subtitle || 'Snelle auto accu vervanging',
      description: dict.service?.['auto-accu-vervangen']?.description || 'Snelle en professionele vervanging van uw auto accu. Wij zorgen ervoor dat u weer snel op weg kunt.',
      features: dict.service?.['auto-accu-vervangen']?.features || ['Snelle vervanging', 'Professionele uitvoering', 'Snel weer op weg', 'Betrouwbare service'],
      image: '/band.png'
    },
    'accu-laten-vervangen': {
      title: dict.service?.['accu-laten-vervangen']?.title || 'Accu Laten Vervangen',
      subtitle: dict.service?.['accu-laten-vervangen']?.subtitle || 'Professionele accuvervanging service',
      description: dict.service?.['accu-laten-vervangen']?.description || 'Laat uw accu professioneel vervangen door onze ervaren monteurs. Kwaliteit en service gegarandeerd.',
      features: dict.service?.['accu-laten-vervangen']?.features || ['Professionele vervanging', 'Ervaren monteurs', 'Kwaliteit gegarandeerd', 'Service verzekerd'],
      image: '/band.png'
    }
  };

  return serviceMap[slug] || {
    title: dict.service?.default?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    subtitle: dict.service?.default?.subtitle || `Professionele ${slug.replace(/-/g, ' ')} service`,
    description: dict.service?.default?.description || `Heeft u hulp nodig met ${slug.replace(/-/g, ' ')}? Onze ervaren professionals staan 24/7 voor u klaar.`,
    features: dict.service?.default?.features || ['24/7 Beschikbaar', 'Snelle responstijd', 'Professioneel team', 'Transparante prijzen'],
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

  const dict = await getDictionary(locale as "nl" | "en" | "fr" | "de");
  const serviceContent = getServiceContent(slug, dict);
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
  const serviceContent = getServiceContent(slug, dict);

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

    </div>
  );
}
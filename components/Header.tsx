import { Car, Phone } from "lucide-react";
import Link from "next/link";
import LanguageSwitcher from "@/components/langauge-switcher";

export default function Header({ locale, dict }: { locale: string; dict: any }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href='/'>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#c8eb67] rounded-lg">
              <Car className="h-8 w-8 bg-[#c8eb67] text-black" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black ">
                {locale === "nl" ? "Pechhulp Nederland" : dict?.navigation?.pechhulp ?? "Pechhulp"}
              </h2>
              <p className="text-sm text-black">24/7 Mobiele Hulp</p>
            </div>
          </div>
        </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-black font-semibold">
            <Link href="/diensten" className="">{dict?.navigation?.diensten ?? "Diensten"}</Link>
<Link href="/contact" className="">{dict?.navigation?.contact ?? "Contact"}</Link>

            <a href="tel:0852502928" className="flex items-center gap-2">
  <Phone className="h-4 w-4" />
  <span>085 250 2928</span>
</a>

            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Mobiel Menu zonder JS */}
          <details className="md:hidden relative">
            <summary className="cursor-pointer text-blue-900 font-semibold list-none text-3xl">
              ☰
            </summary>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-md py-2 px-4 z-50">
              <nav className="flex flex-col gap-3 text-blue-900">
                <Link href="/diensten" className="hover:text-blue-700">{dict?.navigation?.diensten ?? "Diensten"}</Link>
<Link href="/contact" className="hover:text-blue-700">{dict?.navigation?.contact ?? "Contact"}</Link>

                <div className="flex items-center gap-2 mt-2">
                  <Phone className="h-4 w-4" />
                  <span>085 060 9880</span>
                </div>
                <LanguageSwitcher currentLocale={locale} />
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

"use client";

import { Phone, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import LanguageSwitcher from "@/components/langauge-switcher";
import Image from "next/image";
import logo from "@/public/logomobiele.png"; 

export default function Header({ locale, dict }: { locale: string; dict: any }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                src={logo}
                alt="Mobiele Hulp Logo"
                width={150}
                height={50}
                className="h-8 sm:h-10 lg:h-12 w-auto"
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-black font-semibold">
            <Link href="/diensten">{dict?.navigation?.diensten ?? "Diensten"}</Link>
            <Link href="/contact">{dict?.navigation?.contact ?? "Contact"}</Link>
            <a href="tel:0852502928" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>085 250 2928</span>
            </a>
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Mobiele navigatie */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher currentLocale={locale} />

            <Sheet>
              <SheetTrigger asChild>
                <button className="text-black">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-white">
                <SheetHeader>
                  <SheetTitle className="sr-only">Mobiel menu</SheetTitle>
                  <Image
                    src={logo}
                    alt="Mobiele Hulp Logo"
                    width={130}
                    height={40}
                    className="h-10 w-auto mb-4"
                  />
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-4 font-medium text-black">
                  <Link href="/diensten">{dict?.navigation?.diensten ?? "Diensten"}</Link>
                  <Link href="/contact">{dict?.navigation?.contact ?? "Contact"}</Link>
                  <a href="tel:0852502928" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>085 250 2928</span>
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

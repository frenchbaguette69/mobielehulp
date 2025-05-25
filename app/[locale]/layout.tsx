import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import { getDictionary } from "./dictionaries"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Car World - International",
  description: "Discover amazing cars from around the world",
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "nl" }, { locale: "fr" }, { locale: "de" }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  
  const { locale } = await params;
const dict = await getDictionary(locale as "en" | "nl" | "fr" | "de");

  

  return (
    <div className={inter.className} lang={locale}>
      <Header locale={locale} dict={dict} />
      {children}
    </div>
  )
}

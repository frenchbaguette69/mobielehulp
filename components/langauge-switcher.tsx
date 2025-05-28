"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

const languages = [
  { code: "en", name: "English", flag: "EN" },
  { code: "nl", name: "Nederlands", flag: "NL" },
  { code: "fr", name: "Français", flag: "FR" },
  { code: "de", name: "Deutsch", flag: "DE" },
]

interface LanguageSwitcherProps {
  currentLocale: string
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (newLocale: string) => {
    const segments = pathname.split("/")
    segments[1] = newLocale
    const newPath = segments.join("/")
    router.push(newPath)
  }

  const current = languages.find((lang) => lang.code === currentLocale)

  return (
    <DropdownMenu>
  <DropdownMenuTrigger className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-[#c8eb67] text-black border border-gray-100 gap-2">
    {current && (
            <Image
              src={`/${current.flag}.png`}
              alt={`${current.name} flag`}
              width={20}
              height={15}
              className="rounded-sm"
            />
    )}
  <ChevronDown className="h-4 w-4" />
</DropdownMenuTrigger>


  <DropdownMenuContent className="w-40 bg-white text-black border border-gray-100 shadow-xl">
    {languages.map((lang) => (
      <DropdownMenuItem
        key={lang.code}
        onClick={() => switchLanguage(lang.code)}
        className={`cursor-pointer hover:bg-[#c8eb67] ${
          lang.code === currentLocale ? "bg-[#c8eb67] font-bold" : ""
        }`}
      >
        <Image
              src={`/${lang.flag}.png`}
              alt={`${lang.name} flag`}
              width={20}
              height={15}
              className="mr-2 rounded-sm"
            />
            {lang.name}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>


  )
}

"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
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
  {current?.code.toUpperCase()}
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
        <span className="mr-2">{lang.flag}</span> {lang.name}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>


  )
}

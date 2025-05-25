"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function ServiceCarousel({ items, title, subtitle }: {
  items: {
    title: string;
    description: string;
    image: string;
    href: string;
    button?: string;
  }[];
  title: string;
  subtitle: string;
}) {
  const router = useRouter();

  if (!items || !Array.isArray(items)) return null; // <- hier

  const cards = items.map((item, index) => (
    <Link key={item.href} href={item.href} className="cursor-pointer">
  <Card
    card={{
      title: item.title,
      src: item.image,
      category: "mobielehulp",
      content: (
        <div className="bg-white dark:bg-neutral-800 p-6 md:p-12 rounded-3xl mb-4">
          <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-lg font-sans max-w-3xl mx-auto">
            {item.description}
          </p>
          <div className="mt-6 inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition w-max">
            {item.button ?? "Lees meer"}
          </div>
        </div>
      ),
    }}
    index={index}
  />
</Link>
  ));


  return (
    <section className="w-full h-full py-20">
        <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg">
          {subtitle}
        </p>
        </div>
        <Carousel items={cards} />

    </section>
  );
}
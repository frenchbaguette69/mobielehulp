"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FAQSection({ dict }: { dict: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#c8eb67] text-black px-4 py-2 text-sm font-medium rounded mb-4">
            {dict.pechhulp.faq.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
            {dict.pechhulp.faq.title}
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {dict.pechhulp.faq.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {dict.pechhulp.faq.questions.map((faq: any, index: number) => (
            <div
              key={index}
              className="rounded-xl bg-[#111] dark:bg-neutral-900 text-white transition"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left px-6 py-5 hover:bg-[#1b1b1b] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#c8eb67] text-black font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <span className="text-base font-semibold text-white">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-white transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-300">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {dict.pechhulp.faq.other}
          </p>
          <Link href="/contact">
          <Button className="bg-[#c8eb67] hover:bg-[#bde55a] text-black px-6 py-3 font-semibold rounded-full">
            {dict.pechhulp.faq.contact}
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

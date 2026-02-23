"use client";

import Image from "next/image";
import { SECTION_STYLES } from "@/lib/styles/common";
import Link from 'next/link';
const HIGHLIGHT_IMAGES = [
  { src: "/event-images/download1.jpg", alt: "Main hall" },
  { src: "/event-images/download3.jpg", alt: "Conference stage" },
  { src: "/event-images/download1.jpg", alt: "Audience" },
  { src: "/event-images/download3.jpg", alt: "Panel session" },
  { src: "/event-images/download1.jpg", alt: "Keynote" },
  { src: "/event-images/download3.jpg", alt: "Networking" },
  { src: "/event-images/download1.jpg", alt: "Speaker spotlight" },
  { src: "/event-images/download3.jpg", alt: "Expo floor" },
  { src: "/event-images/download1.jpg", alt: "Workshop" },
];

export function HighlightsSection() {
  return (
    <section
      id="highlights"
      className="relative w-full bg-black text-white scroll-mt-24"
    >
      <div className={`${SECTION_STYLES.container} py-16 md:py-24`}>
        <div className="flex flex-col items-center text-center">
          <p className="text-xs uppercase tracking-[0.6em] text-[#e81111]">
            Highlights
          </p>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold">
            XRP Tokyo Highlights
          </h2>
          <div className="mt-4 h-0.5 w-20 rounded-full bg-[#e81111]" />
        </div>

        <div className="relative mt-12 w-full mx-auto">
          {/*
          <div className="grid grid-cols-2 gap-4 md:hidden">
            {HIGHLIGHT_IMAGES.slice(0, 6).map((img, index) => (
              <HighlightCard
                key={img.alt}
                {...img}
                priority={index === 0}
                className="aspect-[4/3]"
              />
            ))}
          </div>

          
          <div className="relative hidden md:block min-h-[560px]">
            <div className="absolute left-1/2 top-1/2 w-[48%] -translate-x-1/2 -translate-y-1/2">
              <HighlightCard
                {...HIGHLIGHT_IMAGES[0]}
                priority
                className="aspect-[16/9]"
              />
            </div>

            <div className="absolute left-[8%] top-[8%] w-[20%]">
              <HighlightCard {...HIGHLIGHT_IMAGES[1]} className="aspect-[4/3]" />
            </div>
            <div className="absolute left-[34%] top-[4%] w-[22%]">
              <HighlightCard {...HIGHLIGHT_IMAGES[2]} className="aspect-[4/3]" />
            </div>
            <div className="absolute right-[8%] top-[10%] w-[20%]">
              <HighlightCard {...HIGHLIGHT_IMAGES[3]} className="aspect-[4/3]" />
            </div>
            <div className="absolute left-[4%] top-[44%] w-[18%]">
              <HighlightCard {...HIGHLIGHT_IMAGES[4]} className="aspect-[4/3]" />
            </div>
            <div className="absolute right-[4%] top-[46%] w-[18%]">
              <HighlightCard {...HIGHLIGHT_IMAGES[5]} className="aspect-[4/3]" />
            </div>
            <div className="absolute left-[16%] bottom-[10%] w-[22%]">
              <HighlightCard {...HIGHLIGHT_IMAGES[6]} className="aspect-[4/3]" />
            </div>
            <div className="absolute right-[16%] bottom-[12%] w-[22%]">
              <HighlightCard {...HIGHLIGHT_IMAGES[7]} className="aspect-[4/3]" />
            </div>
            <div className="absolute left-1/2 bottom-[6%] w-[18%] -translate-x-1/2">
              <HighlightCard {...HIGHLIGHT_IMAGES[8]} className="aspect-[4/3]" />
            </div>
          </div>

          <div className="pointer-events-none absolute -left-10 -top-6 h-24 w-24 rounded-full bg-[#e81111]/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
       */}


  <div className="relative w-full transition-transform duration-500 ease-out hover:scale-105">
    <Image
      src="/highlights.png"
      alt="XRP Tokyo 2026"
      width={1920} 
      height={800}
      priority
      sizes="100vw"
      className="w-full h-auto object-cover md:object-center"
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  </div>

          </div>
      </div>
    </section>
  );
}

function HighlightCard({
  src,
  alt,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${className ?? "aspect-[4/3]"}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        priority={priority}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
    </div>
  );
}

import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Speaker } from "@/config/speakers";

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

interface SpeakerCardProps {
  speaker: Speaker;
  locale: string;
  className?: string;
  onSelect?: (speaker: Speaker) => void;
}

export function SpeakerCard({
  speaker,
  locale,
  className,
  onSelect,
}: SpeakerCardProps) {
  const name = locale === "ja" && speaker.nameJa ? speaker.nameJa : speaker.name;
  const role = locale === "ja" && speaker.roleJa ? speaker.roleJa : speaker.role;
  const company =
    locale === "ja" && speaker.companyJa ? speaker.companyJa : speaker.company;

  const initials = speaker.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const cardContent = (
    <>
      {/* Avatar */}
      <div className="group relative aspect-square md:aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border-b-4 border-transparent transition-colors duration-300 group-hover:border-[#e81111]">
        {speaker.image ? (
          <Image
            src={speaker.image}
            alt={name}
            fill
            className="object-cover object-top grayscale contrast-125 transition duration-500 group-hover:grayscale-0"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-3xl font-semibold text-white/20">
              {initials}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-white/90 text-[10px] font-semibold text-black shadow-sm md:h-7 md:w-7">
            X
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-white/90 text-[10px] font-semibold text-black shadow-sm md:h-7 md:w-7">
            in
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-1 pt-4 pb-2 text-left">
        <p className="text-white text-base md:text-xl font-bold leading-snug">
          {name}
        </p>
        <p className="mt-1 text-xs md:text-sm text-[#e81111] leading-snug">
          {role}
        </p>
        <p className="text-[11px] md:text-xs text-white/60 leading-snug">
          {company}
        </p>
      </div>
    </>
  );

  const baseStyles = cn(
    "relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black",
    "transition-all duration-300",
    "cursor-pointer hover:scale-[1.01] hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
    className,
  );

  return (
    <motion.button
      type="button"
      className={baseStyles}
      onClick={() => onSelect?.(speaker)}
      variants={cardVariants}
      transition={{ duration: 0.4, ease: "easeOut" }}
      aria-label={`${name} ${role}`}
    >
      {cardContent}
    </motion.button>
  );
}

import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Speaker } from "@/config/speakers";
import { Globe } from "lucide-react";
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
      <div className="group relative aspect-square md:aspect-[4/4] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border-b-4 border-transparent transition-colors duration-300 group-hover:border-[#e81111]">
        {speaker.image ? (
          <Image
            src={speaker.image}
            alt={name}
            fill
            className="object-cover object-top  contrast-125 transition duration-500 group-hover:grayscale-0"
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
  {speaker.twitter && (
    <a
      href={speaker.twitter}
      target="_blank"
      rel="noreferrer"
      onClick={(event) => event.stopPropagation()}
      aria-label={`${name} on X`}
      className="pointer-events-auto flex h-8 w-8 md:h-7 md:w-7 items-center justify-center rounded-sm bg-white/90 text-[14px] md:text-[14px] font-semibold text-black shadow-sm transition hover:bg-white"
    >
      X
    </a>
  )}

  {speaker.linkedin && (
    <a
      href={speaker.linkedin}
      target="_blank"
      rel="noreferrer"
      onClick={(event) => event.stopPropagation()}
      aria-label={`${name} on LinkedIn`}
      className="pointer-events-auto flex h-8 w-8 md:h-7 md:w-7 items-center justify-center rounded-sm bg-white/90 text-[14px] md:text-[14px] font-semibold text-black shadow-sm transition hover:bg-white"
    >
      in
    </a>
  )}

  {speaker.website && (
    <a
      href={speaker.website}
      target="_blank"
      rel="noreferrer"
      onClick={(event) => event.stopPropagation()}
      aria-label={`${name} website`}
      className="pointer-events-auto flex h-8 w-8 md:h-7 md:w-7 items-center justify-center rounded-sm bg-white/90 text-[14px] md:text-[14px] font-semibold text-black shadow-sm transition hover:bg-white"
    >
    <Globe className="h-4 w-4" />
    </a>
  )}
</div></div>

      {/* Info */}
      <div className="px-1 pt-4 pb-2 text-left">
      <p className="text-white text-base md:text-xl font-bold leading-snug min-h-[40px] md:min-h-0 line-clamp-2 md:line-clamp-none">
    {name}
  </p>

  <p className="mt-1 text-xs md:text-sm text-[#fbc500] leading-snug min-h-[32px] md:min-h-0 line-clamp-2 md:line-clamp-none">
    {role}
  </p>
        <p className="text-[11px] md:text-base text-white/60 leading-snug">
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

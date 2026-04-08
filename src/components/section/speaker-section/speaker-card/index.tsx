import { motion } from "motion/react";
import Image from "next/image";
import {
  GlobeWebIcon,
  LinkedInLogoDarkIcon,
  XLogoIcon,
} from "@/components/icons/social";
import type { Speaker } from "@/config/speakers";
import { cn } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

interface SpeakerCardProps {
  speaker: Speaker;
  locale: string;
  className?: string;
  onSelect?: ((speaker: Speaker) => void) | (() => void);
}

export function SpeakerCard({
  speaker,
  locale,
  className,
  onSelect,
}: SpeakerCardProps) {
  const name =
    locale === "ja" && speaker.nameJa ? speaker.nameJa : speaker.name;
  const role =
    locale === "ja" && speaker.roleJa ? speaker.roleJa : speaker.role;
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
      <div className="relative aspect-square md:aspect-[4/4] w-full shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border-b-4 border-transparent transition-colors duration-300 group-hover:border-[#e81111]">
        {speaker.image ? (
          <div className="absolute inset-0 overflow-hidden rounded-2xl [transform:translateZ(0)] [backface-visibility:hidden]">
            <Image
              src={speaker.image}
              alt={name}
              fill
              className="object-cover object-top contrast-125 transition duration-500 group-hover:grayscale-0 transform-gpu"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
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
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              aria-label={`${name} on X`}
              className="pointer-events-auto flex h-8 w-8 md:h-7 md:w-7 items-center justify-center rounded-sm bg-white/90 text-black shadow-sm transition-colors hover:bg-white"
            >
              <XLogoIcon className="origin-center scale-[0.72] text-black" />
            </a>
          )}

          {speaker.linkedin && (
            <a
              href={speaker.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              aria-label={`${name} on LinkedIn`}
              className="pointer-events-auto flex h-8 w-8 md:h-7 md:w-7 items-center justify-center rounded-sm bg-white/90 text-black shadow-sm transition-colors hover:bg-white"
            >
              <LinkedInLogoDarkIcon className="origin-center scale-[0.82] text-black" />
            </a>
          )}

          {speaker.website && (
            <a
              href={speaker.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              aria-label={`${name} website`}
              className="pointer-events-auto flex h-8 w-8 md:h-7 md:w-7 items-center justify-center rounded-sm bg-white/90 text-black shadow-sm transition-colors hover:bg-white"
            >
              <GlobeWebIcon className="origin-center scale-[0.82] text-black" />
            </a>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="px-3 py-3 text-left md:px-4">
        <p className="text-white text-base md:text-xl font-bold leading-snug min-h-[40px] md:min-h-0 line-clamp-2 md:line-clamp-none">
          {name}
        </p>

        <p className="mt-1 text-xs md:text-sm text-[#fbc500] leading-snug min-h-[32px] md:min-h-0 line-clamp-2 md:line-clamp-none">
          {role}
        </p>
        {company && (
          <p className="text-[11px] md:text-base text-white/60 leading-snug">
            {company}
          </p>
        )}
      </div>
    </>
  );

  const baseStyles = cn(
    "group relative flex w-full flex-col items-stretch overflow-hidden rounded-2xl border border-white/10 bg-black",
    "origin-center transform-gpu transition-colors duration-300 ease-out",
    "cursor-pointer hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
    className,
  );

  return (
    <motion.button
      type="button"
      className={baseStyles}
      onClick={() => onSelect?.(speaker)}
      variants={cardVariants}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.28, ease: "easeOut" },
      }}
      aria-label={`${name} ${role}`}
    >
      {cardContent}
    </motion.button>
  );
}

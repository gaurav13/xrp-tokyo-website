"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function NextSection() {
  const t = useTranslations();

  const content = {
    journeyHeading: t("journeySection.heading"),
    journeySubtext: t("journeySection.subtext"),
    journeyPrimaryLabel: t("journeySection.primaryCta"),
    journeyPrimaryUrl: "#",
    journeySecondaryLabel: t("journeySection.secondaryCta"),
    journeySecondaryUrl: "#",
  };

  return (
    <section
  id="journey-begins"
  className="relative w-full border-t border-[#e81111] py-24 flex flex-col items-center justify-center text-center rounded-tr-2xl rounded-tl-2xl overflow-hidden bg-black"
>
  {/* Background image: show full design (NOT cropped) */}
  <div
  className="absolute inset-0 bg-no-repeat"
  style={{
    backgroundImage: "url('/footerbackgroundimage.png')",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
  }}
/>

  {/* Dark overlay for readability */}
  <div className="absolute inset-0 bg-black/70" />

  {/* Content */}
  <div className="relative z-10">
    <motion.h2
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-white font-extrabold text-5xl md:text-7xl uppercase tracking-tight"
    >
      {content.journeyHeading}
    </motion.h2>

    <motion.p
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="mt-4 text-gray-400 text-lg"
    >
      {content.journeySubtext}
    </motion.p>

    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
    >
    <div className="flex gap-4 items-center justify-center">

  {/* VIP Dinner Pass */}
  <a
    href={content.journeyPrimaryUrl}
    className="
      px-8 py-3 rounded-full
      font-semibold
      text-black
      bg-gradient-to-r from-[#c89b3c] via-[#f6d365] to-[#b8860b]
      shadow-[0_0_20px_rgba(246,211,101,0.4)]
      transition-all duration-300
      hover:scale-105
      hover:shadow-[0_0_30px_rgba(246,211,101,0.7)]
    "
  >
   {content.journeyPrimaryLabel}
  </a>

  {/* General Pass */}
  <a
    href={content.journeySecondaryUrl}
    className="
      px-8 py-3 rounded-full
      font-semibold
      text-white
      border border-[#e81111]
      bg-black
      transition-all duration-300
      hover:bg-[#e81111]
      hover:text-white
      hover:scale-105
    "
  >
  {content.journeySecondaryLabel}
  </a>

</div>
    </motion.div>
  </div>
</section>
  );
}

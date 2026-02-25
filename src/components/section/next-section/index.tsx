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
      <a
        href={content.journeyPrimaryUrl}
        className="bg-[#e81111] text-white px-8 py-3 rounded-full transition-transform duration-200 hover:scale-[1.03] shadow-[0_0_20px_rgba(232,17,17,0.5)]"
      >
        {content.journeyPrimaryLabel}
      </a>
      <a
        href={content.journeySecondaryUrl}
        className="border border-white text-white px-8 py-3 rounded-full transition-colors duration-200 hover:bg-white hover:text-black"
      >
        {content.journeySecondaryLabel}
      </a>
    </motion.div>
  </div>
</section>
  );
}

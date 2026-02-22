"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { sanityClient } from "@/sanity/sanity.client";

const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

interface JourneyContent {
  journeyHeading: string;
  journeySubtext: string;
  journeyPrimaryLabel: string;
  journeyPrimaryUrl: string;
  journeySecondaryLabel: string;
  journeySecondaryUrl: string;
}

export function NextSection() {
  const [content, setContent] = useState<JourneyContent>({
    journeyHeading: "THE JOURNEY BEGINS",
    journeySubtext:
      "Join us in Tokyo for the most influential XRP event of 2026.",
    journeyPrimaryLabel: "Register Now",
    journeyPrimaryUrl: "#",
    journeySecondaryLabel: "View Agenda",
    journeySecondaryUrl: "#",
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await sanityClient.fetch<JourneyContent>(
          `*[_type == "landingPageContent"][0]{
            journeyHeading,
            journeySubtext,
            journeyPrimaryLabel,
            journeyPrimaryUrl,
            journeySecondaryLabel,
            journeySecondaryUrl
          }`,
        );
        if (data?.journeyHeading) {
          setContent((prev) => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error("Failed to fetch landing page content from Sanity", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <section
      id="journey-begins"
      className="relative w-full bg-black border-t border-[#e81111] py-24 flex flex-col items-center justify-center text-center rounded-tr-2xl rounded-tl-2xl"
    >
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
        className="mt-8 flex flex-col sm:flex-row gap-4"
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
    </section>
  );
}

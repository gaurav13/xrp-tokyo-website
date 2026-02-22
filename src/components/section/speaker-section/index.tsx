"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "motion/react";
import { SECTION_STYLES } from "@/lib/styles/common";
import { SectionTitle } from "@/components/layout/section-title";
import { SpeakerCard } from "@/components/section/speaker-section/speaker-card";
import {
  Dialog,
  DialogPanel,
} from "@/components/animate-ui/components/headless/dialog";
import type { Speaker } from "@/config/speakers";

export function SpeakerSection() {
  const t = useTranslations();
  const locale = useLocale();
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSpeakers = async () => {
      try {
        const res = await fetch("/data.json");
        if (!res.ok) throw new Error("Failed to load data.json");
        const data = (await res.json()) as { speakers?: Speaker[] };
        if (isMounted) {
          setSpeakers(data.speakers ?? []);
        }
      } catch (error) {
        console.error("Failed to fetch speakers", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchSpeakers();
    return () => {
      isMounted = false;
    };
  }, []);

  const getSpeakerText = (speaker: Speaker) => {
    const name = locale === "ja" && speaker.nameJa ? speaker.nameJa : speaker.name;
    const role = locale === "ja" && speaker.roleJa ? speaker.roleJa : speaker.role;
    const company =
      locale === "ja" && speaker.companyJa ? speaker.companyJa : speaker.company;
    const bio = locale === "ja" && speaker.bioJa ? speaker.bioJa : speaker.bio;
    return { name, role, company, bio };
  };

  return (
    <section
      id="speakers"
      className={`relative w-full flex flex-col items-center justify-center bg-black rounded-tr-2xl rounded-tl-2xl ${SECTION_STYLES.sticky} scroll-mt-24`}
    >
      <div className={`${SECTION_STYLES.container} px-4 sm:px-6 lg:px-8`}>
        <div className="flex flex-col items-center text-center text-white">
          <div className="mb-3 h-px w-24 bg-[#e81111]" aria-hidden="true" />
          <SectionTitle
            title={t("speakerSection.title")}
            className="text-white text-xl md:text-3xl"
            accentClassName="bg-gradient-to-r from-transparent via-[#e81111] to-transparent"
          />

          {isLoading ? (
            <motion.p
              className="text-white/70 text-sm md:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Loading speakers...
            </motion.p>
          ) : speakers.length === 0 ? (
            <motion.p
              className="text-white/70 text-sm md:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {t("speakerSection.comingSoon")}
            </motion.p>
          ) : (
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full mt-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ staggerChildren: 0.06 }}
            >
              {speakers.map((speaker) => (
                <SpeakerCard
                  key={speaker.name}
                  speaker={speaker}
                  locale={locale}
                  onSelect={setActiveSpeaker}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <Dialog open={!!activeSpeaker} onClose={() => setActiveSpeaker(null)}>
        {activeSpeaker && (() => {
          const { name, role, company, bio } = getSpeakerText(activeSpeaker);
          return (
            <DialogPanel
              showCloseButton={false}
              className="max-w-[720px] bg-white text-black rounded-3xl p-8 sm:p-10"
            >
              <button
                type="button"
                onClick={() => setActiveSpeaker(null)}
                className="absolute right-5 top-5 text-black/50 hover:text-black"
                aria-label="Close"
              >
                ×
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="relative h-40 w-40 sm:h-44 sm:w-44 overflow-hidden rounded-3xl bg-black/10">
                  <img
                    src={activeSpeaker.image}
                    alt={name}
                    className="h-full w-full object-cover object-top"
                  />
                </div>

                <div className="mt-6">
                  <h3 className="text-2xl sm:text-3xl font-semibold">
                    {name}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base text-black/70">
                    {role}
                  </p>
                </div>

                <div className="mt-4 inline-flex items-center rounded-full bg-black px-4 py-2 text-white text-sm font-semibold">
                  {company}
                </div>

                <p className="mt-6 text-base text-gray-800 leading-relaxed max-w-2xl antialiased">
  {bio}
</p>
              </div>
            </DialogPanel>
          );
        })()}
      </Dialog>
    </section>
  );
}

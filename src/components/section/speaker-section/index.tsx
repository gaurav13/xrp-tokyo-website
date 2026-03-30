"use client";

import { motion, AnimatePresence } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogPanel,
} from "@/components/animate-ui/components/headless/dialog";
import {
  GlobeWebIcon,
  LinkedInLogoIcon,
  XLogoIcon,
} from "@/components/icons/social";
import { SectionTitle } from "@/components/layout/section-title";
import { SpeakerCard } from "@/components/section/speaker-section/speaker-card";
import type { Speaker } from "@/config/speakers";
import { SECTION_STYLES } from "@/lib/styles/common";

export function SpeakerSection() {
  const t = useTranslations();
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;
  /** モーダル表示前のスクロール（Headless UI の lock と body:fixed の競合で 0 保存されるのを防ぐ） */
  const savedScrollYRef = useRef(0);
  const wasModalOpenRef = useRef(false);

  const activeSpeaker = activeIndex >= 0 ? speakers[activeIndex] : null;

  const captureScrollAndOpen = useCallback((index: number) => {
    const l = lenisRef.current;
    const y =
      l?.scroll ??
      window.scrollY ??
      document.documentElement.scrollTop ??
      window.pageYOffset ??
      0;
    savedScrollYRef.current = y;
    setActiveIndex(index);
  }, []);

  useLayoutEffect(() => {
    if (activeIndex < 0) return;
    modalBodyRef.current?.scrollTo(0, 0);
  }, [activeIndex]);

  const goToPrev = useCallback(() => {
    setActiveIndex((i) => (i <= 0 ? speakers.length - 1 : i - 1));
  }, [speakers.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((i) => (i >= speakers.length - 1 ? 0 : i + 1));
  }, [speakers.length]);

  useEffect(() => {
    if (activeIndex < 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, goToPrev, goToNext]);

  useEffect(() => {
    if (activeIndex >= 0) {
      wasModalOpenRef.current = true;
      return;
    }
    if (!wasModalOpenRef.current) return;
    wasModalOpenRef.current = false;

    const y = savedScrollYRef.current;
    const restore = () => {
      const lenisNow = lenisRef.current;
      lenisNow?.scrollTo(y, { immediate: true, force: true });
      window.scrollTo(0, y);
      document.documentElement.scrollTop = y;
      document.body.scrollTop = y;
    };

    restore();
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      restore();
      raf2 = requestAnimationFrame(restore);
    });
    const t0 = window.setTimeout(restore,       0);
    const t1 = window.setTimeout(restore,     100);
    const t2 = window.setTimeout(restore,     300);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [activeIndex]);

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
    const name =
      locale === "ja" && speaker.nameJa ? speaker.nameJa : speaker.name;
    const role =
      locale === "ja" && speaker.roleJa ? speaker.roleJa : speaker.role;
    const company =
      locale === "ja" && speaker.companyJa
        ? speaker.companyJa
        : speaker.company;
    const bio = locale === "en" && speaker.bio_en ? speaker.bio_en : speaker.bio;
    return { name, role, company, bio };
  };

  return (
    <section
      id="speakers"
      className="relative w-full flex flex-col items-center justify-center bg-black rounded-tr-2xl rounded-tl-2xl scroll-mt-24"
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
              {speakers.map((speaker, index) => (
                <SpeakerCard
                  key={speaker.name}
                  speaker={speaker}
                  locale={locale}
                  onSelect={() => captureScrollAndOpen(index)}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <Dialog open={!!activeSpeaker} onClose={() => setActiveIndex(-1)}>
        {activeSpeaker &&
          (() => {
            const { name, role, company, bio } = getSpeakerText(activeSpeaker);
            return (
              <DialogPanel
                showCloseButton={false}
                className="inset-x-0 mx-auto top-[10svh] w-[94%] max-w-none translate-x-0 translate-y-0 block overflow-hidden gap-0 p-0 sm:top-1/2 sm:left-1/2 sm:right-auto sm:mx-0 sm:w-full sm:max-w-[720px] sm:-translate-x-1/2 sm:-translate-y-1/2 bg-white text-black rounded-3xl"
              >
                <button
                  type="button"
                  onClick={goToPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-black/50 transition-colors hover:bg-black/10 hover:text-black sm:left-3 sm:h-10 sm:w-10 z-10"
                  aria-label="Previous speaker"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-black/50 transition-colors hover:bg-black/10 hover:text-black sm:right-3 sm:h-10 sm:w-10 z-10"
                  aria-label="Next speaker"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveIndex(-1)}
                  className="absolute top-4 right-4 z-20 hidden h-10 w-10 items-center justify-center rounded-full bg-black/5 text-3xl leading-none text-black/70 transition-colors hover:bg-black/10 hover:text-black sm:flex"
                  aria-label="Close"
                >
                  <span className="relative -top-px">×</span>
                </button>

                <div
                  ref={modalBodyRef}
                  className="max-h-[80svh] sm:max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-y-contain px-6 py-6 sm:px-8 sm:py-8 md:px-18 md:py-12"
                  data-lenis-prevent
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(-1)}
                    className="sticky top-0 ml-auto mr-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-3xl leading-none text-black/70 transition-colors hover:bg-black/10 hover:text-black z-10 -mb-10 sm:hidden"
                    aria-label="Close"
                  >
                    <span className="relative -top-px">×</span>
                  </button>

                  <div className="flex flex-col items-center text-center">
                    <div className="relative h-40 w-40 sm:h-44 sm:w-44 overflow-hidden rounded-3xl bg-black/10">
                      <img
                        src={activeSpeaker.image}
                        alt={name}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>

                    <div className="mt-4">
                      <h3 className="text-2xl sm:text-3xl font-semibold">
                        {name}
                      </h3>
                      <p className="mt-1 text-sm sm:text-base text-black/70">
                        {role}
                      </p>
                    </div>

                    <div className="mt-3 inline-flex items-center rounded-full bg-black px-4 py-2 text-white text-sm font-semibold">
                      {company}
                    </div>

                    {(activeSpeaker.twitter ||
                      activeSpeaker.linkedin ||
                      activeSpeaker.website) && (
                      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        {activeSpeaker.twitter && (
                          <a
                            href={activeSpeaker.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${name} on X`}
                            className="flex h-7 w-7 items-center justify-center rounded-sm bg-black/[0.08] text-black transition-colors hover:bg-black/15"
                          >
                            <XLogoIcon className="origin-center scale-[0.7] text-black" />
                          </a>
                        )}
                        {activeSpeaker.linkedin && (
                          <a
                            href={activeSpeaker.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${name} on LinkedIn`}
                            className="flex h-7 w-7 items-center justify-center rounded-sm bg-black/[0.08] text-black transition-colors hover:bg-black/15"
                          >
                            <LinkedInLogoIcon className="origin-center scale-[0.8] text-black" />
                          </a>
                        )}
                        {activeSpeaker.website && (
                          <a
                            href={activeSpeaker.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${name} website`}
                            className="flex h-7 w-7 items-center justify-center rounded-sm bg-black/[0.08] text-black transition-colors hover:bg-black/15"
                          >
                            <GlobeWebIcon className="origin-center scale-[0.8] text-black" />
                          </a>
                        )}
                      </div>
                    )}

                    <p className="mt-6 text-left text-[13px] sm:text-[15px] text-gray-800 leading-relaxed max-w-2xl antialiased whitespace-pre-line">
                      {bio}
                    </p>
                  </div>
                </div>
              </DialogPanel>
            );
          })()}
      </Dialog>
    </section>
  );
}

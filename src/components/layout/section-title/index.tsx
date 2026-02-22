"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string;
  className?: string;
  accentClassName?: string;
};

export function SectionTitle({
  title,
  className,
  accentClassName,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="mb-16"
    >
      <h2
        className={cn(
          "text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center tracking-tight leading-[120%] text-foreground",
          className,
        )}
      >
        {title}
      </h2>
      <motion.div
        className={cn(
          "mx-auto mt-3 h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent",
          accentClassName,
        )}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
        style={{ transformOrigin: "center" }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

"use client";

import { motion } from "motion/react";

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * グリッチエフェクト用の走査線レイヤー
 */
function ScanlineLayer({
  color,
  size,
  duration,
  yOffset,
  blendMode,
  children,
  fontSize,
}: {
  color: string;
  size: string;
  duration: number;
  yOffset: number;
  blendMode: string;
  children: React.ReactNode;
  fontSize: string;
}) {
  return (
    <motion.span
      className={`${fontSize} font-bold text-foreground origin-center absolute top-0 left-0 w-full h-full pointer-events-none z-20`}
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent ${size === "4px" ? "1px" : "0.5px"},
          ${color} ${size === "4px" ? "1px" : "0.5px"},
          ${color} ${size === "4px" ? "3px" : "1.5px"},
          transparent ${size === "4px" ? "3px" : "1.5px"},
          transparent ${size}
        )`,
        backgroundSize: `100% ${size}`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        mixBlendMode: blendMode as any,
        textShadow: "none",
      }}
      animate={{
        y: [0, yOffset, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}

/**
 * グリッチエフェクト付きテキストコンポーネント（インライン用）
 */
export function GlitchText({ children, className }: GlitchTextProps) {
  const fontSize = "text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none";

  return (
    <span className="relative inline-block align-middle">
      {/* メインテキスト - ゴールドグラデーション */}
      <motion.span
        initial={{
          opacity: 0,
          scaleY: 0.005,
          scaleX: 1.1,
          filter: "blur(10px) brightness(2)",
        }}
        whileInView={{
          opacity: 1,
          scaleY: 1,
          scaleX: 1,
          filter: "blur(0px) brightness(1)",
        }}
        animate={{
          opacity: [
            1, 0.99, 1, 0.995, 1, 0.995, 1, 0.99, 1, 0.995, 1, 0.995, 1, 0.8, 1,
            0.99, 1, 0.995, 1, 0.995, 1, 0.99, 1, 0.995, 1,
          ],
          filter: [
            "blur(0px) brightness(1)",
            "blur(0.3px) brightness(1.02)",
            "blur(0px) brightness(1)",
            "blur(0.2px) brightness(0.99)",
            "blur(0px) brightness(1)",
            "blur(0.2px) brightness(0.99)",
            "blur(0px) brightness(1)",
            "blur(0.3px) brightness(1.02)",
            "blur(0px) brightness(1)",
            "blur(0.2px) brightness(0.99)",
            "blur(0px) brightness(1)",
            "blur(0.2px) brightness(0.99)",
            "blur(0px) brightness(1)",
            "blur(1.5px) brightness(1.25)",
            "blur(0px) brightness(1)",
            "blur(0.3px) brightness(1.02)",
            "blur(0px) brightness(1)",
            "blur(0.2px) brightness(0.99)",
            "blur(0px) brightness(1)",
            "blur(0.2px) brightness(0.99)",
            "blur(0px) brightness(1)",
            "blur(0.3px) brightness(1.02)",
            "blur(0px) brightness(1)",
            "blur(0.2px) brightness(0.99)",
            "blur(0px) brightness(1)",
          ],
          x: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -5, 4, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0,
          ],
          y: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, -2, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0,
          ],
          scale: [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.04, 0.97, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1,
          ],
        }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.4,
          ease: "circOut",
          opacity: {
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          },
          filter: {
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          },
          x: {
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          },
          y: {
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        style={{
          background:
            "linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 20%, #A0A0A0 40%, #808080 60%, #A0A0A0 80%, #C0C0C0 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow:
            "0 0 20px rgba(200, 200, 200, 0.4), 0 0 40px rgba(160, 160, 160, 0.3), 0 2px 8px rgba(128, 128, 128, 0.2)",
          filter: "drop-shadow(0 2px 8px rgba(200, 200, 200, 0.3))",
        }}
        className={`${fontSize} font-bold origin-center relative z-10 inline-block ${className || ""}`}
      >
        {children}
      </motion.span>

      {/* グリッチエフェクト - 走査線1（シルバー系） */}
      <ScanlineLayer
        color="rgba(200, 200, 200, 0.4)"
        size="3px"
        duration={0.12}
        yOffset={2}
        blendMode="screen"
        fontSize={fontSize}
      >
        {children}
      </ScanlineLayer>

      {/* グリッチエフェクト - 走査線2（ライトグレー系） */}
      <ScanlineLayer
        color="rgba(240, 240, 240, 0.3)"
        size="1.5px"
        duration={0.08}
        yOffset={1}
        blendMode="overlay"
        fontSize={fontSize}
      >
        {children}
      </ScanlineLayer>
    </span>
  );
}

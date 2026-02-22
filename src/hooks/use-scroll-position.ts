"use client";

import { useState, useEffect } from "react";

/**
 * スクロール位置を監視するカスタムフック
 * @param threshold スクロール位置の閾値（0-1）
 * @returns 閾値を超えたかどうか
 */
export function useScrollPosition(threshold: number = 0.95) {
  const [isAtThreshold, setIsAtThreshold] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (currentScrollY + windowHeight) / documentHeight;

      setIsAtThreshold(scrollPercentage >= threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 初期状態をチェック
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isAtThreshold;
}

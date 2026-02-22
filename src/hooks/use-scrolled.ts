"use client";

import { useState, useEffect } from "react";

/**
 * スクロールしたかどうかを監視するカスタムフック
 * @param threshold スクロール閾値（ピクセル）
 * @returns スクロールしているかどうか
 */
export function useScrolled(threshold: number = 100) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 初期状態をチェック
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isScrolled;
}

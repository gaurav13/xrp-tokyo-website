import { useState, useEffect } from "react";

/**
 * レスポンシブな背景画像のアタッチメント設定を管理するフック
 * モバイル（768px未満）ではscroll、デスクトップではfixed
 */
export function useBackgroundAttachment() {
  const [backgroundAttachment, setBackgroundAttachment] = useState<
    "fixed" | "scroll"
  >("scroll");

  useEffect(() => {
    const updateBackgroundAttachment = () => {
      setBackgroundAttachment(window.innerWidth >= 768 ? "fixed" : "scroll");
    };

    updateBackgroundAttachment();
    window.addEventListener("resize", updateBackgroundAttachment);
    return () =>
      window.removeEventListener("resize", updateBackgroundAttachment);
  }, []);

  return backgroundAttachment;
}

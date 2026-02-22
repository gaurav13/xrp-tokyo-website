/**
 * アニメーション関連のユーティリティ関数
 */

import { ANIMATION_DELAYS } from "@/lib/constants";

/**
 * アニメーション遅延のスタイルオブジェクトを生成
 */
export function getAnimationDelay(delay: keyof typeof ANIMATION_DELAYS) {
  return {
    animationDelay: `${ANIMATION_DELAYS[delay]}ms`,
  };
}

/**
 * フェードインアニメーション用のクラス名とスタイルを返す
 */
export function getFadeInAnimation(
  delay: keyof typeof ANIMATION_DELAYS = "immediate",
) {
  return {
    className: "animate-fade-in-up opacity-0",
    style: getAnimationDelay(delay),
  };
}

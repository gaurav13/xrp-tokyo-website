import { Tier } from "./enums";

export const TIER_CONFIGS: Record<
  Tier,
  {
    name: string;
    color: string;
    textColor: string;
    borderAccent: string;
  }
> = {
  [Tier.Title]: {
    name: "Title",
    color: "border-white",
    textColor: "text-white",
    borderAccent: "ring-1 ring-white/20 shadow-[0_0_15px_rgba(255,255,255,0.08)]",
  },
  [Tier.Platinum]: {
    name: "Platinum",
    color: "border-slate-300",
    textColor: "text-slate-300",
    borderAccent: "ring-1 ring-slate-300/15",
  },
  [Tier.Gold]: {
    name: "Gold",
    color: "border-yellow-500",
    textColor: "text-yellow-500",
    borderAccent: "ring-1 ring-yellow-500/15",
  },
  [Tier.Silver]: {
    name: "Silver",
    color: "border-gray-400",
    textColor: "text-gray-400",
    borderAccent: "",
  },
  [Tier.Bronze]: {
    name: "Bronze",
    color: "border-amber-600",
    textColor: "text-amber-600",
    borderAccent: "",
  },
  [Tier.Research]: {
    name: "Research Partner",
    color: "border-cyan-300",
    textColor: "text-cyan-300",
    borderAccent: "",
  },
  [Tier.Supporter]: {
    name: "Supporter",
    color: "border-indigo-300",
    textColor: "text-indigo-300",
    borderAccent: "",
  },
  [Tier.Media]: {
    name: "Media Partner",
    color: "border-gray-300",
    textColor: "text-gray-300",
    borderAccent: "",
  },
  [Tier.Education]: {
    name: "Education Partner",
    color: "border-gray-300",
    textColor: "text-gray-300",
    borderAccent: "",
  },
  [Tier.Community]: {
    name: "Community Partner",
    color: "border-gray-400",
    textColor: "text-gray-400",
    borderAccent: "",
  },
};

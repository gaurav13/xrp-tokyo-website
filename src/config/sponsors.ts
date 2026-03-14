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

export const SPONSORS = [
  {
    tier: Tier.Title,
    name: "Ripple",
    logo: "/sponsors/title/ripple.png",
    website: "https://ripple.com/",
  },
  {
    tier: Tier.Platinum,
    name: "Doppler Finance",
    logo: "/sponsors/platinum/doppler-finance.svg",
    website: "https://doppler.finance/",
  },
  {
    tier: Tier.Gold,
    name: "anodos",
    logo: "/sponsors/gold/anodos.png",
    website: "https://anodos.finance/",
  },
  {
    tier: Tier.Silver,
    name: "XRPCafe",
    logo: "/sponsors/silver/xrpcafe.svg",
    website: "https://xrp.cafe",
  },
  {
    tier: Tier.Silver,
    name: "Xaman",
    logo: "/sponsors/silver/xaman.svg",
    website: "https://xaman.app/",
  },
  {
    tier: Tier.Bronze,
    name: "Giant Gox",
    logo: "/sponsors/bronze/giantgox.jpg",
    website: "https://x.com/GiantGox",
  },
  {
    tier: Tier.Bronze,
    name: "メイフラちゃん",
    logo: "/sponsors/bronze/mayflower3096.jpg",
    website: "https://x.com/mayflower3096",
  },
  {
    tier: Tier.Bronze,
    name: "Daikoku",
    logo: "/partners/community/daikoku.png",
    website: "https://x.com/daikokunet009",
  },
  {
    tier: Tier.Media,
    name: "CoinPost",
    logo: "/partners/media/coinpost.png",
    website: "https://coinpost.jp/",
  },
  {
    tier: Tier.Media,
    name: "あたらしい経済",
    logo: "/partners/media/neweconomy.png",
    website: "https://www.neweconomy.jp/",
  },
  {
    tier: Tier.Media,
    name: "NADA NEWS",
    logo: "/partners/media/news_tagline.png",
    website: "https://www.nadanews.com/",
  },
  {
    tier: Tier.Education,
    name: "東大公開講座",
    logo: "/partners/education/東大公開講座.png",
    website: "https://www.blockchain.t.u-tokyo.ac.jp/",
  },
  {
    tier: Tier.Community,
    name: "渋谷Web3大学",
    logo: "/partners/community/渋谷Web3大学横.jpg",
    website: "https://www.shibuyaweb3univ.com/",
  },
  {
    tier: Tier.Community,
    name: "TextRP",
    logo: "/partners/community/text-rp.jpg",
    website: "https://textrp.io/",
  },
  {
    tier: Tier.Community,
    name: "Wavee",
    logo: "/partners/community/wavee.svg",
    website: "https://wavee.world/",
  },
  {
    tier: Tier.Community,
    name: "Wave of Innovation",
    logo: "/partners/community/wave-of-innovation.svg",
    website: "https://www.waveofinnovation.com/",
  },
  {
    tier: Tier.Community,
    name: "Web3 Salon",
    logo: "/partners/community/web3-salon.png",
    website: "https://web3salon.or.jp/",
  },
  {
    tier: Tier.Community,
    name: "AI Agent Run",
    logo: "/partners/community/ai-agent-run.png",
    website: "https://aigent.run/",
  },
  {
    tier: Tier.Community,
    name: "XRPL Korea",
    logo: "/partners/community/xrplkorea_v_black.svg",
    website: "https://www.xrplkorea.org/",
  },
  {
    tier: Tier.Community,
    name: "XRPL Africa",
    logo: "/partners/community/xrpl-africa.jpg",
    website: "https://x.com/XRPL_AF",
  },
  {
    tier: Tier.Community,
    name: "XRPL Canada",
    logo: "/partners/community/xrpl-canada.jpeg",
    website: "https://www.xrplcanada.org/",
  },
  {
    tier: Tier.Community,
    name: "XRPL Malaysia",
    logo: "/partners/community/xrpl-malaysia.jpg",
    website: "https://x.com/xrplmalaysia",
  },
  {
    tier: Tier.Community,
    name: "OP Market",
    logo: "/partners/community/opmarket.jpg",
    website: "https://opmarket.ai/",
  },
  {
    tier: Tier.Community,
    name: "Terry Toto",
    logo: "/partners/community/terry-toto.svg",
    website: "https://terrytoto.com/",
  },
];

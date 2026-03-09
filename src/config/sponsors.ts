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
  [Tier.MediaPartner]: {
    name: "Media Partner",
    color: "border-gray-300",
    textColor: "text-gray-300",
    borderAccent: "",
  },
  [Tier.Education]: {
    name: "Education",
    color: "border-gray-300",
    textColor: "text-gray-300",
    borderAccent: "",
  },
  [Tier.CommunityPartner]: {
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
    tier: Tier.MediaPartner,
    name: "CoinPost",
    logo: "/partners/media/coinpost.png",
    website: "https://coinpost.jp/",
  },
  {
    tier: Tier.MediaPartner,
    name: "あたらしい経済",
    logo: "/partners/media/neweconomy.png",
    website: "https://www.neweconomy.jp/",
  },
  {
    tier: Tier.MediaPartner,
    name: "NADA NEWS",
    logo: "/partners/media/news_tagline.png",
    website: "https://www.nadanews.com/",
  },
  {
    tier: Tier.CommunityPartner,
    name: "東大公開講座",
    logo: "/partners/education/東大公開講座.png",
    website: "https://www.blockchain.t.u-tokyo.ac.jp/",
  },
  {
    tier: Tier.CommunityPartner,
    name: "渋谷Web3大学",
    logo: "/partners/community/渋谷Web3大学横.jpg",
    website: "https://www.shibuyaweb3univ.com/",
  },
  {
    tier: Tier.CommunityPartner,
    name: "OP Market",
    logo: "/partners/community/opmarket.jpg",
    website: "https://opmarket.ai/",
  },
  {
    tier: Tier.CommunityPartner,
    name: "TextRP",
    logo: "/partners/community/text-rp.jpg",
    website: "https://textrp.io/",
  },
  {
    tier: Tier.CommunityPartner,
    name: "Wavee",
    logo: "/partners/community/wavee.svg",
    website: "https://wavee.world/",
  },
  {
    tier: Tier.CommunityPartner,
    name: "Wave of Innovation",
    logo: "/partners/community/wave-of-innovation.svg",
    website: "https://www.waveofinnovation.com/",
  },
  {
    tier: Tier.CommunityPartner,
    name: "Web3 Salon",
    logo: "/partners/community/web3-salon.png",
    website: "https://web3salon.or.jp/",
  },
  {
    tier: Tier.CommunityPartner,
    name: "AI Agent Run",
    logo: "/partners/community/ai-agent-run.png",
    website: "https://aigent.run/",
  },
  {
    tier: Tier.CommunityPartner,
    name: "XRPL Korea",
    logo: "/partners/community/xrplkorea_v_black.svg",
    website: "https://www.xrplkorea.org/",
  },
  {
    tier: Tier.CommunityPartner,
    name: "XRPL Africa",
    logo: "/partners/community/xrpl-africa.jpg",
    website: "https://x.com/XRPL_AF",
  },
  {
    tier: Tier.CommunityPartner,
    name: "XRPL Canada",
    logo: "/partners/community/xrpl-canada.jpeg",
    website: "https://www.xrplcanada.org/",
  },
  {
    tier: Tier.CommunityPartner,
    name: "XRPL Malaysia",
    logo: "/partners/community/xrpl-malaysia.jpg",
    website: "https://x.com/xrplmalaysia",
  },
  {
    tier: Tier.CommunityPartner,
    name: "Terry Toto",
    logo: "/partners/community/terry-toto.svg",
    website: "https://terrytoto.com/",
  },
];

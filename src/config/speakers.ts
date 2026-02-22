export interface Speaker {
  name: string;
  nameJa?: string;
  role: string;
  roleJa?: string;
  company: string;
  companyJa?: string;
  bio: string;
  bioJa?: string;
  image?: string;
  twitter?: string;
  website?: string;
}

const DUMMY_IMAGE =
  "https://framerusercontent.com/images/VuAjku1L5Wv525L9Uf2oJ9IOvhY.png?scale-down-to=1024&width=4316&height=4320";

export const SPEAKERS: Speaker[] = [
  {
    name: "Markus Infanger",
    role: "SVP, RippleX",
    company: "Ripple",
    bio: "Markus Infanger, SVP of RippleX at Ripple. He leads product development, strategic partnerships, and the expansion of the XRP Ledger developer ecosystem. Bringing 20+ years of experience in global Foreign Exchange leadership at top-tier financial institutions, he bridges the worlds of traditional finance and blockchain innovation.",
    image: DUMMY_IMAGE,
  },
  {
    name: "Christina Chan",
    role: "Senior Director, Ecosystem Growth",
    company: "Ripple",
    bio: "Christina Chan leads ecosystem growth initiatives, partnering with builders and institutions to expand real-world use cases across the XRP Ledger. Her work focuses on product strategy, developer enablement, and scaling global adoption.",
    image: DUMMY_IMAGE,
  },
  {
    name: "Kelvin Koh",
    role: "Co-Founder and Partner",
    company: "Spartan Group",
    bio: "Kelvin Koh is a co-founder and partner at Spartan Group, advising and investing in leading Web3 projects. He brings deep experience across venture, corporate strategy, and ecosystem development.",
    image: DUMMY_IMAGE,
  },
  {
    name: "Nihal Maunder",
    role: "Partner",
    company: "Pantera Capital",
    bio: "Nihal Maunder is a partner at Pantera Capital, focusing on growth-stage investments in the digital asset ecosystem. He works closely with founders on product, strategy, and global expansion.",
    image: DUMMY_IMAGE,
  },
];

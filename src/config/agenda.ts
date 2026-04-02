export interface AgendaSpeaker {
  name: string;
  role: string;
  company: string;
  bio: string;
  image: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  titleJa?: string;
  track?: string;
  speakerNames: string[];
  moderatorNames?: string[];
  watchUrl?: string;
}

export const AGENDA_SPEAKERS: AgendaSpeaker[] = [
  {
    name: "Markus Infanger",
    role: "SVP, RippleX",
    company: "Ripple",
    bio: "Markus Infanger, SVP of RippleX at Ripple. He leads product development, strategic partnerships, and the expansion of the XRP Ledger developer ecosystem.",
    image: "/Markus-Infanger.jpg",
    twitter: "https://x.com/markusinfanger",
    linkedin: "https://www.linkedin.com/in/markus-infanger-8a6ba747/",
  },
  {
    name: "Christina Chan",
    role: "Senior Director, Ecosystem Growth Ripple",
    company: "Ripple",
    bio: "Christina Chan leads global funding programs and strategic ecosystem partnerships for builders on the XRP Ledger.",
    image: "/Christina-Chan.jpg",
    twitter: "https://x.com/ghostfacex_0",
    linkedin: "https://www.linkedin.com/in/christinabchan",
  },
  {
    name: "Tatsuya Yamada",
    role: "President",
    company: "Rakuten Wallet, Inc.",
    bio: "Leads Rakuten Wallet and web3 initiatives with decades of experience in derivatives, securities, and FX.",
    image: "/speakers/Tatsuya Yamada.png",
    linkedin: "https://jp.linkedin.com/in/tatsuya-yamada-7223352a",
  },
  {
    name: "SungMo Park",
    role: "Partner, Head of APAC GTM",
    company: "A16z Crypto",
    bio: "",
    image: "/speakers/SungMo Park.png",
    linkedin: "https://www.linkedin.com/in/smp0910/",
    website: "https://a16zcrypto.com/team/sungmo-park/",
  },
  {
    name: "Cody Carbone",
    role: "CEO",
    company: "The Digital Chamber",
    bio: "",
    image: "/speakers/cody-carbone1.jpg",
    linkedin: "https://www.linkedin.com/in/codycarbone/",
  },
  {
    name: "Takuya Sugiyama",
    role: "Vice President, SBI Ripple Asia",
    company: "SBI Holdings",
    bio: "Leads blockchain-based payment solutions and digital asset infrastructure.",
    image: "/Takuy-Sugiyama.jpg",
    linkedin: "https://www.linkedin.com/in/takuya-sugiyama-aa1b73a",
  },
  {
    name: "Tomohiko Kondo",
    role: "CEO",
    company: "SBI VC Trade Co., Ltd",
    bio: "",
    image: "/speakers/Tomohiko Kondo.png",
    twitter: "https://x.com/tomohiko_kondo",
    linkedin: "https://jp.linkedin.com/in/tomohiko-kondo-78748bab",
  },
  {
    name: "Dave McCombs",
    role: "Senior Re-Writer",
    company: "NHK World Japan",
    bio: "Former President, Foreign Correspondents’ Club of Japan (FCCJ)",
    image: "/speakers/Dave-McComb.png",
  },
  {
    name: "Hirokuni Onozawa",
    role: "Executive Officer",
    company: "GMO Aozora Net Bank, Ltd",
    bio: "",
    image: "/speakers/Hirokuni Onozawa.png",
  },
  {
    name: "Seihaku Yoshida",
    role: "CEO",
    company: "HashPort Inc",
    bio: "",
    image: "/speakers/HashPort Inc.png",
    twitter: "https://x.com/seihakuyoshida",
    website: "https://hashport.io/",
  },
  {
    name: "Takafumi Shimoyama",
    role: "General Manager, Head of Business Development",
    company: "SBI Ripple Asia",
    bio: "",
    image: "/speakers/Takafumi Shimoyama.png",
    linkedin: "https://jp.linkedin.com/in/takafumi-shimoyama-43b949207",
  },
  {
    name: "Toshinari Shinohara",
    role: "Director, Future Co-Creation Lab, General Management Division",
    company: "TOBU TOP TOURS",
    bio: "",
    image: "/speakers/Toshinari Shinohara.png",
    website: "https://www.tobutoptours.co.jp/",
  },
  {
    name: "Meg Nakamura",
    role: "Chief Operating Officer",
    company: "Evernorth",
    bio: "",
    image: "/speakers/Meg Nakamura.png",
    linkedin: "https://www.linkedin.com/in/megnakamura",
  },
  {
    name: "Yusuke Takezawa",
    role: "Independent Advisor on Cross-Border Finance and Institutional Design, Former VP at Progmat",
    company: "",
    bio: "",
    image: "/speakers/Yusuke Takezawa.jpg",
    linkedin: "https://www.linkedin.com/in/yusuke-takezawa-327720156/",
    website: "",
  },
  {
    name: "Mai Furukawa",
    role: "Director of XRPL Japan Association and Support at XRPL Labs",
    company: "XRPL Japan/XRPL Labs",
    bio: "",
    image: "/speakers/Mai Furukawa1.png",
    twitter: "https://x.com/Mai_XRPLJapan",
    linkedin: "https://www.linkedin.com/in/mai-furukawa-b26079281/",
  },
  {
    name: "Hinza Asif",
    role: "President",
    company: "Asia Web3 Alliance Japan",
    bio: "",
    image: "/speakers/Hinza Asif.png",
    twitter: "https://x.com/thehinza",
    linkedin: "https://jp.linkedin.com/in/hinza-asif",
    website: "https://asiaweb3alliance.jp/",
  },
   {
      "name": "Eri Ishiyama",
      "role": "Blockchain Advocate",
      "company": "",
      "bio": "",
      "image": "/speakers/Carpe Diem.png",
      "twitter": "",
      "linkedin": "",
      "website":""
    },
  {
    name: "Noritaka Okabe",
    role: "Founder & CEO",
    company: "JPYC Inc",
    bio: "",
    image: "/speakers/Noritaka Okabe.png",
  },
  {
    name: "Ryo Kato",
    role: "CEO",
    company: "HashHub Inc",
    bio: "",
    image: "/speakers/Ryo Kato.png",
    website: "https://hashhub.tokyo/",
  },
  {
    name: "Go Makino",
    role: "Regional Director",
    company: "Fireblocks Japan",
    bio: "",
    image: "/speakers/Go Makino.png",
  },
  {
    name: "Taisuke Isono",
    role: "Head of Nikko Innovation Lab",
    company: "SMBC Nikko Securities Inc.",
    bio: "",
    image: "/speakers/Taisuke Isono.png",
  },
  {
    name: "Eiji Kobayashi",
    role: "Director & Country Head",
    company: "Securitize Japan",
    bio: "",
    image: "/speakers/Eiji Kobayashi.png",
  },
  {
    name: "Ken Kawai",
    role: "Advisor Partner Lawyer",
    company: "Anderson Mori & Tomotsune",
    bio: "",
    image: "/speakers/Ken Kawai.png",
  },
  {
    name: "Seiichi Kawamura",
    role: "Strategic Plannning Dept",
    company: "Blockchain Group Toyota Blockchain Lab",
    bio: "",
    image: "/speakers/Seiichi Kawamura.png",
  },
  {
    name: "Tatsuya Kohrogi",
    role: "Senior Ecosystem Growth Manager",
    company: "Ripple",
    bio: "",
    image: "/speakers/Tatsuya Kohrogi.png",
  },
  {
    name: "Yoshimasa Satoh",
    role: "Representative Director and CEO, Japan",
    company: "Alpaca",
    bio: "",
    image: "/speakers/Yoshimasa Satoh.png",
  },
  {
    name: "Masa Kikuchi",
    role: "Founder & CEO",
    company: "Secured Finance",
    bio: "",
    image: "/speakers/Masa Kikuchi.png",
  },
  {
    name: "Noriaki Yagi",
    role: "Editor-in-chief",
    company: "Iolite Magazine",
    bio: "",
    image: "/speakers/Noriaki Yagi.png",
  },
  {
    name: "Ryo Sakai",
    role: "Head of Business Development & CEO",
    company: "CoinPost, WebX",
    bio: "",
    image: "/speakers/Ryo Sakai.png",
  },
  {
    name: "J. Ayo Akinyele",
    role: "Head of Engineering",
    company: "RippleX",
    bio: "",
    image: "/speakers/Ayo Akinyele.png",
  },
  {
    name: "Cyrus Cruz",
    role: "APAC Head",
    company: "Tenity",
    bio: "",
    image: "/speakers/Cyrus Cruz.png",
  },
  {
    name: "Sojun Katsura",
    role: "Director",
    company: "Papi Code",
    bio: "",
    image: "/speakers/Sojun Katsura.png",
  },
  {
    name: "Ai Kosuke",
    role: "Founder",
    company: "SuzuPay",
    bio: "",
    image: "/speakers/Ai Kosuke.png",
  },
  {
    name: "Ikkei Matsuda",
    role: "Representative Director & CEO",
    company: "Digital Platformer Co., Ltd.",
    bio: "",
    image: "/speakers/Matsuda Ikkei.png",
  },
  {
    name: "Jean Zhu",
    role: "Co Founder",
    company: "Nexbridge",
    bio: "",
    image: "/speakers/Jean Zhu.png",
  },
  {
    name: "Yusuke Hirota",
    role: "Founder",
    company: "Laplace",
    bio: "",
    image: "/speakers/Yusuke Hirota.png",
  },
  {
    name: "Eri ~ Carpe Diem",
    role: "Crypto Influncer",
    company: "",
    bio: "",
    image: "/speakers/Carpe Diem.png",
  },
  {
    name: "Sebastian Valdez",
    role: "Co-Founder",
    company: "xrp.cafe",
    bio: "",
    image: "/speakers/Sebastian Valdez.png",
  },
  {
    name: "Kyohei Shibano",
    role: "Project Researcher",
    company: "The University of Tokyo",
    bio: "",
    image: "/speakers/Tokyo University.png",
    linkedin: "https://www.linkedin.com/in/kyohei-shibano-0a5165251",
  },
  {
    name: "Rox Park",
    role: "Head of Institutions",
    company: "Doppler Finance",
    bio: "",
    image: "/speakers/Doppler.png",
  },
  {
    name: "Panos Mekras",
    role: "Co-Founder & CEO",
    company: "Anodos Labs",
    bio: "",
    image: "/speakers/Anodos Finance.png",
    twitter: "https://x.com/panosmek",
    linkedin: "https://www.linkedin.com/in/panos-mekras/",
  },
  {
    name: "Robert Kiuru",
    role: "COO",
    company: "Xaman",
    bio: "",
    image: "/speakers/Xaman.png",
    twitter: "https://x.com/robertkiuru",
    linkedin: "https://www.linkedin.com/in/kiuru1/",
  },
  {
    name: "Alexis Sirkia",
    role: "Executive Chairman & Founder",
    company: "Yellow",
    bio: "",
    image: "/speakers/Alexis Sirkia.png",
    twitter: "https://x.com/AlexisYellow",
    linkedin: "https://www.linkedin.com/in/sirkia/",
  },
  {
    name: "VIP After Party",
    role: "Limited attendance. Prior approval required.",
    company: "https://luma.com/da2ucul1",
    bio: "",
    image: "/speakers/partyimg.png",
    twitter: "",
    linkedin: "",
  },
   {
      "name": "Fumihiro Arasawa",
      "role": "CEO, XWIN Group Chair, DeFi Committee",
      "company": "Blockchain Collaborative Consortium",
      "bio": "",
      "image": "/speakers/Fumihiro Arasawa.png",
      "twitter": "",
      "linkedin": "",
      "website":""
    },
    {
      "name": "Nathaniel T. Bradley",
      "role": "CEO",
      "company": "Datavault AI",
      "bio": "",
      "image": "/speakers/Nathaniel.png",
      "twitter": "",
      "linkedin": "",
      "website":""
    },
    {
      "name": "Steven Zeiler",
      "role": "Developer Evangelist",
      "company": "Yellow",
      "bio": "",
      "image": "/speakers/Steven Zeiler.png",
      "twitter": "",
      "linkedin": "",
      "website":""
    },
];

export const AGENDA_ITEMS: AgendaItem[] = [
   {
    time: "09:00 AM",
    title: "Registration & Exhibition Booths Open",
    track: "Opening",
    speakerNames: ["Register, grab your kit, and dive into our exhibitor booths!"],
  },
  {
    time: "10:30 AM - 10:35 AM",
    title: "Welcome Note",
    track: "Keynote",
    speakerNames: ["Mai Furukawa"],
  },
  {
    time: "10:35 AM - 11:00 AM",
    title:
      "Firechat: Scaling the Internet of Value with XRP: Building the Next Global Financial Infrastructure",
    track: "Fireside",
    speakerNames: ["Markus Infanger"],
    moderatorNames: ["Dave McCombs"],
  },
  {
    time: "11:05 AM - 11:35 AM",
    title:
      "The Future of Money: How Stablecoins, and Tokenized Deposits Are Reshaping the Global Financial System",
    track: "Panel",
    speakerNames: [
      "Tomohiko Kondo",
      "Seihaku Yoshida",
      "Noritaka Okabe",
      "Tatsuya Yamada",
    ],
    moderatorNames: ["Ryo Sakai"],
  },
  {
    time: "11:40 AM - 11:55 AM",
    title: "When Capital Commits: Why Institutions Are Moving On-Chain Now",
    track: "Keynote",
    speakerNames: ["Meg Nakamura"],
  },
  {
    time: "11:55 AM - 12:25 PM",
    title:
      "Institutional Blockchain Adoption : From Pilot to Production: How Banks Are Building the Next Financial Infrastructure with Blockchain",
    track: "Panel",
    speakerNames: ["Hirokuni Onozawa", "Ryo Kato", "Go Makino"],
    moderatorNames: ["Noriaki Yagi"],
  },
  {
    time: "12:30 PM - 1:00 PM",
    title:
      "Connecting Japan and Global Capital: The Future of Web3 Investment and Expansion",
    track: "Panel",
    speakerNames: ["SungMo Park", "Meg Nakamura", "Takuya Sugiyama"],
    moderatorNames: ["Yusuke Takezawa"],
  },
  {
    time: "1:00 PM - 1:25 PM",
    title:
      "Tokenized Payments for the Tourism Economy: Real-World Implementation",
    track: "Panel",
    speakerNames: ["Takafumi Shimoyama", "Toshinari Shinohara"],
    moderatorNames: ["Mai Furukawa"],
  },
  {
    time: "1:25 PM - 1:35 PM",
    title:
      "The Future of RLUSD as Envisioned by SBI VC Trade",
    titleJa: "SBIVCトレードが描くRLUSDの未来",
    track: "Keynote",
    speakerNames: ["Tomohiko Kondo"],
  },
  {
    time: "1:35 PM - 1:45 PM",
    title:
      "International Cooperation in Digital Assets: Strengthening U.S.–Japan Collaboration",
    track: "Fireside",
    speakerNames: ["Cody Carbone"],
    moderatorNames: ["Hinza Asif"],
  },
  {
    time: "1:50 PM - 2:10 PM",
    title: "International Element Exchange: A Datavault AI Technology",
    track: "Keynote",
    speakerNames: ["Nathaniel T. Bradley"],
  },
  {
    time: "2:15 PM - 2:45 PM",
    title:
      "The Institutional Future of RWA Tokenization through Security Tokens",
    track: "Panel",
    speakerNames: ["Taisuke Isono", "Eiji Kobayashi", "Masa Kikuchi"],
    moderatorNames: ["Eri Ishiyama"],
  },
  {
    time: "2:50 PM - 3:00 PM",
    title: "Ripple APAC Ecosystem Announcement - TBA",
    track: "Keynote",
    speakerNames: ["Christina Chan"],
  },
  {
    time: "3:05 PM - 3:30 PM",
    title:
      "Building on XRPL: Global Developers and the Next Wave of Blockchain Innovation",
    track: "Panel",
    speakerNames: [
      "J. Ayo Akinyele",
      "Panos Mekras",
      "Sebastian Valdez",
      "Robert Kiuru",
    ],
    moderatorNames: ["Cyrus Cruz"],
  },
  {
    time: "3:35 PM - 3:45 PM",
    title: "Doppler Finance - Keynote",
    track: "Keynote",
    speakerNames: ["Rox Park"],
  },
  {
    time: "3:50 PM - 4:20 PM",
    title:
      "From Real Assets to Digital Infrastructure: How Institutions Are Building the Next Financial System",
    track: "Panel",
    speakerNames: ["Ken Kawai", "Yoshimasa Satoh", "Seiichi Kawamura"],
    moderatorNames: ["Fumihiro Arasawa"],
  },
  {
    time: "4:25 PM - 4:35 PM",
    title:
      "Clearing the Path: How Yellow Enables the Internet of Value",
    track: "Keynote",
    speakerNames: ["Alexis Sirkia","Steven Zeiler"],
  },
  {
    time: "4:40 PM - 5:10 PM",
    title: "Japan’s XRPL Ecosystem: Local Innovation and Global Opportunities",
    track: "Panel",
    speakerNames: [
      "Ai Kosuke",
      "Ikkei Matsuda",
      "Sojun Katsura",
      "Jean Zhu",
      "Yusuke Hirota",
    ],
    moderatorNames: ["Tatsuya Kohrogi"],
  },
  {
    time: "5:15 PM - 5:23 PM",
    title:
      "Introducing the Endowed Chair for Blockchain Innovation at the University of Tokyo",
    titleJa: "東京大学ブロックチェーンイノベーション寄付講座 活動紹介",
    track: "Keynote",
    speakerNames: ["Kyohei Shibano"],
  },
  {
    time: "5:23 PM - 5:35 PM",
    title: "XRP Tokyo 2026: Our Journey Ahead",
    track: "Closing Remarks",
    speakerNames: ["Mai Furukawa", "Hinza Asif"],
  },
  {
    time: "7:00 PM - 9:00 PM",
    title: "VIP After Party at 6th Floor, Happo-en",
    track: "Private Event",
    speakerNames: ["VIP After Party"],
  },
];
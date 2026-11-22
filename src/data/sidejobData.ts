export interface Track {
  title: string;
  author: string;
  image: string;
  audio: string;
}

export const TRACKS: Track[] = [
  {
    title: "93 'Til Infinity",
    author: "Souls of Mischief",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music/22/6e/b6/mzi.xyhsjlep.jpg/600x600bb.jpg",
    audio: "https://www.itsasidejob.com/mp3/93-publiclicense.mp3"
  },
  {
    title: "Purple",
    author: "Wunderhorse",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/7b/7b/4a/7b7b4a32-f2ff-fdb1-cb05-7f7332c812cc/cover.jpg/600x600bb.jpg",
    audio: "https://www.itsasidejob.com/mp3/purple-publiclicense.mp3"
  },
  {
    title: "Stonecutters",
    author: "Dope Lemon",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/dd/55/73/dd55738b-8df2-44cf-e6e0-59c49b4acea7/4050538506631.jpg/600x600bb.jpg",
    audio: "https://www.itsasidejob.com/mp3/stonecutters-publiclicense.mp3"
  },
  {
    title: "Do You",
    author: "Ghostwoman",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/55/bf/2c/55bf2cb5-be73-772d-38c5-4c5c713f67b6/5060626464315_cover.jpg/600x600bb.jpg",
    audio: "https://www.itsasidejob.com/mp3/doyou-publiclicense.mp3"
  },
  {
    title: "Easy Way Out",
    author: "Broncho",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d1/64/20/d1642078-a808-9502-0263-fe618e319da5/3615933818133_cover.jpg/600x600bb.jpg",
    audio: "https://www.itsasidejob.com/mp3/easywayout-publiclicense.mp3"
  },
  {
    title: "The End of a Gun",
    author: "Ghostwoman",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/cb/ef/c1/cbefc198-984d-5d2b-4ff2-344ca522d5fd/5060626466333_cover.jpg/600x600bb.jpg",
    audio: "https://www.itsasidejob.com/mp3/endofagun-publiclicense.mp3"
  },
  {
    title: "Geneva Strangemod",
    author: "Glyders",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/78/70/93/787093d2-3e80-81ff-76d9-1c224eb2b5d0/781484310228.png/600x600bb.jpg",
    audio: "https://www.itsasidejob.com/mp3/geneva-publiclicense.mp3"
  },
  {
    title: "I Can Talk",
    author: "Two Door Cinema Club",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/f0/89/c7/f089c71b-9e94-522f-c1cf-f9f3d766daa2/5414939448577_cover.jpg/600x600bb.jpg",
    audio: "https://www.itsasidejob.com/mp3/icantalk-publiclicense.mp3"
  },
  {
    title: "Leader of the Pack",
    author: "Wunderhorse",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/7b/7b/4a/7b7b4a32-f2ff-fdb1-cb05-7f7332c812cc/cover.jpg/600x600bb.jpg",
    audio: "https://www.itsasidejob.com/mp3/leader-publiclicense.mp3"
  },
  {
    title: "Lost My Mind",
    author: "Froth",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/88/a3/e2/88a3e291-f742-bdbb-9ec2-05a912e7ba97/859742233067_cover.jpg/600x600bb.jpg",
    audio: "https://www.itsasidejob.com/mp3/lostmymind-publiclicense.mp3"
  },
  {
    title: "Marinade",
    author: "Dope Lemon",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/dd/55/73/dd55738b-8df2-44cf-e6e0-59c49b4acea7/4050538506631.jpg/600x600bb.jpg",
    audio: "https://www.itsasidejob.com/mp3/marinade-publiclicense.mp3"
  }
];

export interface Project {
  id: 'celestique' | 'sohub' | 'spatial' | 'kinetic' | 'telemetry' | 'waveform';
  title: string;
  category: string;
  image: string;
  year?: string;
  summary: string;
  role?: string;
  tags?: string[];
  metrics?: string;
  liveUrl?: string;
  showcaseBadge?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "celestique",
    title: "Celestique — Haute Joaillerie",
    category: "Luxury Fine Jewelry Atelier • Designed by Armin Rahmani • GSAP Experience",
    image: "/images/celestique/celestique_card_cover.webp",
    year: "2025",
    role: "Lead Creative Developer: Armin Rahmani",
    tags: ["GSAP ScrollTrigger", "Editorial Parallax", "Bespoke Jewelry Bag", "Quiet Luxury", "Artisanal 3D Hand"],
    metrics: "Awwwards Haute Joaillerie Standard",
    showcaseBadge: "Designed by Armin Rahmani",
    liveUrl: "/celestique",
    summary: "Haute joaillerie e-commerce experience crafted by Armin Rahmani with Cormorant Garamond luxury typography, celestial starburst accents, interactive stone pedestal category showcase, and curated Collection 2025."
  },
  {
    id: "sohub",
    title: "Raya Studio — استودیو خلاق رایا",
    category: "استودیو خلاقیت دیجیتال ایران • طراحی توسط آرمین رحمانی • GSAP Engine",
    image: "/images/sohub/homeRender.png",
    year: "۱۴۰۳ / 2026",
    role: "طراحی، مهندسی و پیاده‌سازی کامل توسط آرمین رحمانی",
    tags: ["GSAP ScrollTrigger", "فونت فارسی وزیرمتن", "کارت‌های تعاملی اسنپ‌فود و دیجی‌کالا", "اینتروی مینیمال", "وب تعاملی ۳ بعدی"],
    metrics: "استاندارد جهانی Awwwards",
    showcaseBadge: "طراحی و توسعه توسط آرمین رحمانی",
    liveUrl: "/sohub",
    summary: "وبسایت رسمی استودیو خلاقیت دیجیتال رایا با تایپوگرافی فارسی وزیرمتن، انیمیشن‌های پیشرفته GSAP، کارت‌های بازشونده تعاملی نمونه‌کارها (اسنپ‌فود، دیجی‌کالا، تپسی و آروان)، استک کارت‌های اسکرول و رندرهای ۳ بعدی فوتورئالیستیک."
  },
  {
    id: "spatial",
    title: "Spatial VisionOS",
    category: "Apple Spatial Computing • 3D Depth • GSAP",
    image: "/images/work1.webp",
    year: "2026",
    role: "Creative Technologist & 3D Web Architect",
    tags: ["GSAP 3D Transforms", "Spatial Parallax", "Glass Glare Shaders", "React 19"],
    metrics: "Apple.com Showcase Standard",
    showcaseBadge: "Interactive 3D Experience",
    summary: "Immersive spatial computing web interface with multi-plane depth separation, dynamic eye-tracking cursor tilt, and draggable glass widgets."
  },
  {
    id: "kinetic",
    title: "Kromatik Typography",
    category: "Awwwards SOTD • Kinetic Motion • SplitText",
    image: "/images/work2.webp",
    year: "2025",
    role: "Lead Creative Developer & UI Craftsman",
    tags: ["GSAP SplitText", "Magnetic Cursor", "Velocity Marquee", "Fluid Easing"],
    metrics: "Awwwards Site of the Day",
    showcaseBadge: "Kinetic Typography Lab",
    summary: "High-contrast Swiss editorial portfolio featuring character-level 3D perspective flip, velocity-responsive ticker, and magnetic image lens reveals."
  },
  {
    id: "telemetry",
    title: "Hyperion Neural Telemetry",
    category: "Active Theory Style • Canvas Stream • High-Frequency",
    image: "/images/work3.webp",
    year: "2025",
    role: "Full-Stack Backend & Motion Engineer",
    tags: ["GSAP Ticker", "HTML5 Canvas", "Neural Constellation", "Real-Time Numbers"],
    metrics: "60fps Locked Canvas Stream",
    showcaseBadge: "Live Neural Mesh",
    summary: "Interactive 60fps telemetry and constellation particle network with proximity-linked neural nodes, live number interpolation, and shockwave pulses."
  },
  {
    id: "waveform",
    title: "Prism Waveform Lab",
    category: "Lusion / Spotify Design • Generative Canvas • GSAP",
    image: "/images/work4.webp",
    year: "2024",
    role: "Generative Audio & Frontend Architect",
    tags: ["Mathematical Interpolation", "Sine Wave Canvas", "Harmonic Knobs", "Audio Sync"],
    metrics: "Generative Motion Excellence",
    showcaseBadge: "Harmonic Sound Lab",
    summary: "Mathematical audio-reactive waveform generator synthesizing multiple sinusoidal harmonics with real-time modulation and beat-synced shockwaves."
  }
];

export const CLIENT_LOGOS = [
  { name: "Acne Studios", file: "/images/logos/acne-studios.svg" },
  { name: "Carhartt WIP", file: "/images/logos/carhartt-wip.svg" },
  { name: "Ganni", file: "/images/logos/ganni.svg" },
  { name: "Holzweiler", file: "/images/logos/holzweiler.svg" },
  { name: "Marimekko", file: "/images/logos/marimekko.svg" },
  { name: "Norrøna", file: "/images/logos/norrona.svg" },
  { name: "Oatly", file: "/images/logos/oatly.svg" },
  { name: "On Running", file: "/images/logos/on-running.svg" },
  { name: "Our Legacy", file: "/images/logos/our-legacy.svg" },
  { name: "Peak Performance", file: "/images/logos/peak-performance.svg" },
  { name: "Sonos", file: "/images/logos/sonos.svg" },
  { name: "Totême", file: "/images/logos/toteme.svg" }
];

export const SERVICES = [
  {
    id: "development",
    name: "development",
    previewImage: "/images/services/film1.webp",
    description: "Full-stack web applications built with React, Next.js, TypeScript, and modern scalable architectures."
  },
  {
    id: "backend",
    name: "backend",
    previewImage: "/images/services/film2.webp",
    description: "Robust REST & GraphQL APIs, distributed databases, server architecture, microservices, and cloud infrastructure."
  },
  {
    id: "seo",
    name: "seo",
    previewImage: "/images/work1.webp",
    description: "Deep technical SEO, Core Web Vitals optimization, schema markup, and organic search engine ranking dominance."
  },
  {
    id: "design",
    name: "design",
    previewImage: "/images/work2.webp",
    description: "Bespoke UI/UX design, interactive prototypes, design systems, and fluid GSAP micro-interactions."
  },
  {
    id: "architecture",
    name: "architecture",
    previewImage: "/images/work3.webp",
    description: "System design, cloud DevOps, database modeling, high-load scaling, and enterprise web security."
  },
  {
    id: "optimization",
    name: "optimization",
    previewImage: "/images/work4.webp",
    description: "Performance auditing, 100/100 Lighthouse scores, bundle optimization, and conversion rate growth."
  }
];

export interface FaqItemType {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItemType[] = [
  {
    question: "What technologies do you specialize in?",
    answer: "My core stack includes TypeScript, React, Next.js, and Tailwind CSS on the frontend with GSAP for fluid animations; Node.js, Go, Python, PostgreSQL, Redis, and GraphQL on the backend; deployed on AWS, Docker, and Vercel."
  },
  {
    question: "Do you handle both frontend and backend?",
    answer: "Yes. As a full-stack developer, I design and build everything from database schemas, secure authentication, and REST/GraphQL APIs to responsive, pixel-perfect frontend interfaces."
  },
  {
    question: "How do you achieve high search engine rankings (SEO)?",
    answer: "I engineer technical SEO into the architecture: semantic HTML, structured JSON-LD schema, dynamic OpenGraph data, fast server-side rendering (SSR), and sub-second Core Web Vitals (LCP, INP, CLS) that Google rewards."
  },
  {
    question: "Can you redesign or speed up an existing website?",
    answer: "Absolutely. I conduct comprehensive audits of legacy systems, identify bottlenecks in database queries or frontend bundle sizes, and migrate platforms to modern stacks that load instantly and convert better."
  },
  {
    question: "Do you collaborate with international teams and clients?",
    answer: "Yes. I work seamlessly with founders, product teams, and businesses worldwide across asynchronous workflows, sprint reviews, and direct communication."
  },
  {
    question: "How does pricing and project scoping work?",
    answer: "Transparent, milestone-based pricing tailored to the exact requirements: architecture, feature complexity, API integrations, and SEO scope. You receive a clear, fixed timeline and deliverables breakdown before work begins."
  }
];

export interface SohubProject {
  id: string;
  slug: string;
  title: string;
  date: string;
  accentColor: string;
  description: string;
  image: string;
  services: {
    main?: string;
    mainTags?: string[];
    secondary?: string;
    secondaryTags?: string[];
    other?: string;
    otherTags?: string[];
  };
  details?: {
    overview: string;
    deliverables: string[];
    impact: string;
  };
}

export const SOHUB_PROJECTS: SohubProject[] = [
  {
    id: "9919c850-7a65-435e-9c5f-6388544bbbfc",
    slug: "1up-nova",
    title: "1UP Nova",
    date: "2022",
    accentColor: "#f2a2cc",
    description: "Unique artists, makers, and doers",
    image: "/images/sohub/1up-nova.png",
    services: {
      main: "Brand Identity",
      mainTags: ["Logo", "Typography", "Colors", "Guidelines"],
      secondary: "Development",
      secondaryTags: ["Website", "CMS", "Blog", "Internal Tools"]
    },
    details: {
      overview: "A groundbreaking collective of international artists and creators requiring a holistic brand identity and dynamic digital experience that celebrates experimental craft.",
      deliverables: ["Custom Typography & Monogram", "Interactive Portfolio Matrix", "Sanity CMS Editorial Pipeline", "Dynamic Color Modulation"],
      impact: "Surpassed 250k unique monthly visitors within 90 days of launch with 100/100 Core Web Vitals."
    }
  },
  {
    id: "538b3c01-6767-43b9-b298-dcd07cdefdf9",
    slug: "razer",
    title: "Razer",
    date: "2023",
    accentColor: "#66B933",
    description: "The Gamer’s Perspective",
    image: "/images/sohub/razer.png",
    services: {
      main: "Marketing",
      mainTags: ["CMS", "Campaign Strategy", "E-commerce"],
      secondary: "Development",
      secondaryTags: ["Custom Micro-site", "WebGL Hardware Showcase"]
    },
    details: {
      overview: "Forging an editorial campaign hub celebrating the global gaming community, e-sports athletes, and cutting-edge hardware innovations with high-impact kinetic motion.",
      deliverables: ["Global Campaign Microsite", "Interactive Chroma Glow Experience", "Content Aggregation System", "Multi-region Localization"],
      impact: "Drove 42% higher engagement compared to previous flagship hardware product launches."
    }
  },
  {
    id: "daa3addf-2a5a-4781-9e7d-7eb84d73baee",
    slug: "themis",
    title: "Themis",
    date: "2021",
    accentColor: "#60FF00",
    description: "Creative Director",
    image: "/images/sohub/themis.png",
    services: {
      main: "Development",
      mainTags: ["Website", "Fluid Easing", "Spatial Layout"],
      secondary: "Branding",
      secondaryTags: ["Editorial Art Direction", "Visual Guidelines"]
    },
    details: {
      overview: "A high-concept portfolio for an acclaimed creative director blending brutalist typography, spatial hierarchy, and fluid interactive transitions.",
      deliverables: ["Headless Next.js Interface", "Custom Micro-interactions", "Curated Case Study Layouts", "Dark-Mode First Aesthetics"],
      impact: "Awarded Awwwards Mobile Site of the Day and featured across leading design publications."
    }
  },
  {
    id: "411d0a11-b349-4b3f-a00a-af4f173e62ab",
    slug: "aeva-team",
    title: "AEVA Team",
    date: "2019",
    accentColor: "#ff3600",
    description: "World Renowned Esports Organization",
    image: "/images/sohub/aeva-team.png",
    services: {
      main: "Brand Identity",
      mainTags: ["Logo", "Typography", "Color Palette", "Voice & Tone", "Guidelines"],
      secondary: "Development",
      secondaryTags: ["Website", "CMS", "Blog", "Newsletter"],
      other: "Marketing",
      otherTags: ["Campaigns", "Post Designs", "Influencer Marketing"]
    },
    details: {
      overview: "Comprehensive rebrand and digital ecosystem for an elite international e-sports organization competing on the world stage.",
      deliverables: ["Dynamic Emblem & Crest System", "Tournament Roster Hub", "Merchandise Storefront", "Social Motion Templates"],
      impact: "Increased fan merchandise pre-orders by 180% upon public rebrand launch."
    }
  },
  {
    id: "c67dac65-5a19-4851-baa7-9da6ecce1dcc",
    slug: "chr-innovations",
    title: "CHR Innovations",
    date: "2024",
    accentColor: "#161111",
    description: "The gateway to exceptional architectural solutions",
    image: "/images/sohub/chr-innovations.png",
    services: {
      main: "Brand Identity",
      mainTags: ["Logo", "Typography", "Colors", "Guidelines"],
      secondary: "Development",
      secondaryTags: ["Website", "CMS", "Blog", "Internal Tools"]
    },
    details: {
      overview: "Positioning an architectural engineering firm as the premier partner for luxury developers and visionary civic projects.",
      deliverables: ["Architectural 3D Case Studies", "Precision Grid Layouts", "Client Portal Integration", "Bilingual Localization"],
      impact: "Secured over $14M in architectural contract inquiries during the first quarter."
    }
  },
  {
    id: "5d2272ee-3c90-4f4a-b7f2-df1145ef92c7",
    slug: "profit-saloon",
    title: "Profit Saloon",
    date: "2024",
    accentColor: "#E9FF54",
    description: "A life changing app",
    image: "/images/sohub/profit-saloon.png",
    services: {
      main: "App Strategy & Design",
      mainTags: ["UI/UX", "Design System", "Mobile App", "Prototyping"],
      secondary: "Development",
      secondaryTags: ["Next.js Landing", "Interactive ROI Calculator"]
    },
    details: {
      overview: "Transforming financial education and investment tracking into an addictive, beautifully crafted consumer mobile experience.",
      deliverables: ["End-to-End iOS & Android UI/UX", "Interactive Web Calculator", "Conversion Landing Funnel", "App Store Creatives"],
      impact: "Achieved top 10 charting in Finance apps with over 100k downloads in 30 days."
    }
  }
];

export interface SohubService {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  bgColor: string;
  textColor: string;
}

export const SOHUB_SERVICES: SohubService[] = [
  {
    id: "serviceItem0",
    number: "01",
    title: "Brand Identities",
    subtitle: "Identities",
    description: "Our team will assist in developing a consistent brand voice, ensuring that all messages align with the brand's tone, values, objectives and goals.",
    tags: ["Logo", "Typography", "Color Palette", "Voice & Tone", "Guidelines"],
    bgColor: "#0C1016",
    textColor: "#F0F6F8"
  },
  {
    id: "serviceItem1",
    number: "02",
    title: "Smart Development",
    subtitle: "Development",
    description: "Our team will work closely with you, taking the time to understand your vision and feedback in order to bring your ideas to life. We'll provide regular updates and ensure that the final product surpasses your expectations.",
    tags: ["Web Development", "App Development", "UI/UX Design", "Interactions", "CMS"],
    bgColor: "#23272D",
    textColor: "#F0F6F8"
  },
  {
    id: "serviceItem2",
    number: "03",
    title: "Marketing Campaigns",
    subtitle: "Campaigns",
    description: "At SOHub, we recognize that effective marketing goes beyond simply promoting products or services. It involves understanding target audiences, crafting compelling messages, and improving the sustainable growth of an organization.",
    tags: ["Digital Marketing", "SEO", "Social Media", "Content Creation", "Email Marketing"],
    bgColor: "#3A3E44",
    textColor: "#F0F6F8"
  },
  {
    id: "serviceItem3",
    number: "04",
    title: "3D Visualization",
    subtitle: "Visualization",
    description: "Our company specializes in envisioning images and animations of architectural and engineering projects. We use the latest software to create stunning visuals that portray astonishing photorealistic end products.",
    tags: ["Architecture", "Engineering", "Construction", "Interior Design", "Product Design"],
    bgColor: "#50555A",
    textColor: "#F0F6F8"
  }
];

export const SOHUB_AWARDS = [
  { name: "Adobe Behance", category: "Web User Interface", year: "2024" },
  { name: "Adobe Behance", category: "Graphic Design", year: "2023" },
  { name: "Adobe Behance", category: "3D Animation", year: "2023" },
  { name: "Awwwards", category: "Mobile Site of the Day", year: "2024" },
  { name: "FWA", category: "FWA of the Day", year: "2024" }
];

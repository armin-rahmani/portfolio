export interface Product {
  id: string;
  name: string;
  category: 'rings' | 'earrings' | 'necklaces' | 'bracelets';
  material: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  details: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  metal: string;
  size?: string;
}

export const CATEGORIES = [
  { id: 'all', label: 'ALL CREATIONS' },
  { id: 'rings', label: 'RINGS' },
  { id: 'earrings', label: 'EARRINGS' },
  { id: 'necklaces', label: 'NECKLACES' },
  { id: 'bracelets', label: 'BRACELETS' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'eternal-band',
    name: 'ETERNAL BAND RING',
    category: 'rings',
    material: '18k solid yellow gold',
    price: 320,
    image: '/images/celestique/prod_eternal_band.webp',
    description: 'A timeless silhouette engineered with smooth curved interior for effortless daily comfort. Hand-polished to a radiant mirror finish in our Geneva workshop.',
    details: [
      '18k Recycled Solid Yellow Gold',
      'Width: 2.8mm comfort-fit band',
      'Hallmarked for purity & authenticity',
      'Complimentary custom engraving'
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'solar-chain',
    name: 'SOLAR CHAIN NECKLACE',
    category: 'necklaces',
    material: '18k yellow gold link',
    price: 280,
    image: '/images/celestique/prod_solar_chain.webp',
    description: 'Fluid interlocking links catch the sunlight with every movement. Designed to wear solo as a minimalist statement or layered with heirloom pendants.',
    details: [
      '18k Yellow Gold Vermeil on Sterling Silver',
      'Adjustable length: 42cm - 47cm',
      'Reinforced celestial lobster clasp',
      'Anti-tarnish protective micro-coating'
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'celestial-spark',
    name: 'CELESTIAL SPARK PENDANT',
    category: 'necklaces',
    material: 'Diamond & 18k yellow gold',
    price: 1150,
    originalPrice: 1300,
    image: '/images/celestique/prod_celestial_spark.webp',
    description: 'An ethereal cluster of brilliant-cut conflict-free diamonds set in a handcrafted starburst basket that maximizes optical brilliance and fire.',
    details: [
      'Total diamond carat weight: 0.65 ct (G-H / VS1)',
      '18k Solid Yellow Gold bezel setting',
      'Delicate 18k diamond-cut cable chain (45cm)',
      'IGI Gemological Certification included'
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'pearl-drop',
    name: 'PEARL DROP PENDANT',
    category: 'necklaces',
    material: 'Freshwater pearl & gold',
    price: 450,
    image: '/images/celestique/prod_pearl_drop.webp',
    description: 'A hand-selected organic baroque freshwater pearl with iridescent luster, suspended from a delicate diamond-cut solid gold wire.',
    details: [
      'Grade AAA Natural White Freshwater Pearl (10mm)',
      '14k Solid Yellow Gold bail & accents',
      'Unique organic contour—each piece is one-of-a-kind',
      'Ethically harvested from sustainable oyster reserves'
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'heve-gold',
    name: 'HEVE GOLD RING',
    category: 'rings',
    material: '18k yellow gold signet',
    price: 490,
    image: '/images/celestique/prod_heve_gold.webp',
    description: 'Modern geometric curves meet artisanal texture. A sculptural ring designed with substantial weight that feels luxurious in the hand.',
    details: [
      '18k Solid Yellow Gold',
      'Satin-brushed top face with high-polish bevels',
      'Tapered shank for ergonomic everyday wear',
      'Weight: approx 6.2 grams'
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'solar-radiance',
    name: 'SOLAR RADIANCE EARRINGS',
    category: 'earrings',
    material: '18k yellow gold hoops',
    price: 610,
    image: '/images/celestique/prod_solar_radiance.webp',
    description: 'Chunky, tactile twisted rope hoops that frame the face with warm architectural golden reflections. Featherlight hollow construction for all-day wear.',
    details: [
      '18k Yellow Gold Vermeil (3 microns thick)',
      'Diameter: 24mm | Width: 6mm',
      'Secure snap-bar click closure',
      'Hypoallergenic & nickel-free'
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'golden-luminous',
    name: 'GOLDEN LUMINOUS NECKLACE',
    category: 'necklaces',
    material: '14k white gold diamond',
    price: 820,
    image: '/images/celestique/prod_golden_luminous.webp',
    description: 'Delicate round brilliant diamonds floating at regular intervals along an ultra-fine chain. An understated everyday luxury.',
    details: [
      '5 Bezel-set Lab-Grown Diamonds (0.40 ctw)',
      '14k Solid White Gold cable chain',
      'Clarity: VVS2 | Color: E-F',
      'Length: 40cm with 5cm extension'
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'smooth-twist',
    name: 'SMOOTH TWIST RING',
    category: 'rings',
    material: '18k solid gold band',
    price: 520,
    image: '/images/celestique/prod_smooth_twist.webp',
    description: 'Two interlocking strands of 18k solid gold intertwined in an eternal helical dance. Represents unity, endurance, and quiet elegance.',
    details: [
      '18k Solid Yellow & White Gold dual-tone',
      'Width: 3.5mm dimensional braid',
      'Polished and textured dual finish',
      'Handmade in our historic Florence atelier'
    ],
    inStock: true,
    featured: true,
  },
];

export const CATEGORY_SHOWCASE = [
  {
    id: 'rings',
    title: 'RINGS',
    subtitle: 'Solitaires, Eternity & Signet Bands',
    image: '/images/celestique/cat_rings.webp',
    count: '24 Designs',
  },
  {
    id: 'earrings',
    title: 'EARRINGS',
    subtitle: 'Sculpted Hoops, Huggies & Drops',
    image: '/images/celestique/cat_earrings.webp',
    count: '18 Designs',
  },
  {
    id: 'necklaces',
    title: 'NECKLACES',
    subtitle: 'Pendants, Chokers & Tennis Chains',
    image: '/images/celestique/cat_necklaces.webp',
    count: '32 Designs',
  },
  {
    id: 'bracelets',
    title: 'BRACELETS',
    subtitle: 'Bangles, Cuffs & Diamond Tennis Links',
    image: '/images/celestique/cat_bracelets.webp',
    count: '15 Designs',
  },
];

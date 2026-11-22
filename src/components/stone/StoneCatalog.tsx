import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Layers, ArrowUpRight, Search, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface StoneProduct {
  id: string;
  name: string;
  family: 'Marble' | 'Travertine' | 'Onyx' | 'Crystal';
  quarryOrigin: string;
  tone: string;
  image: string;
  formats: string[];
  finishes: string[];
  density: string;
  absorption: string;
  description: string;
  featured?: boolean;
}

export const STONE_DATABASE: StoneProduct[] = [
  {
    id: 'lashotor-pietra-gray',
    name: 'Lashotor (Pietra Gray)',
    family: 'Marble',
    quarryOrigin: 'Isfahan, Iran',
    tone: 'Dark Graphite Slate with Linear White Calcite Veining',
    image: '/images/stone/real_black_marble.jpg',
    formats: ['Master Slabs (300×190cm)', 'Tiles (60×60, 80×80, 120×60)', 'Quarry Blocks', 'Stair Steps'],
    finishes: ['Polished', 'Honed', 'Bush-Hammered', 'Leathered', 'Sandblasted'],
    density: '2.71 g/cm³',
    absorption: '0.15%',
    description: 'Arash Stone Co.’s internationally renowned flagship marble. Exceptional structural density, razor-sharp calcite veining, and minimal porosity suited for wet areas, presidential lobbies, and high-traffic flooring.',
    featured: true
  },
  {
    id: 'takab-silver-travertine',
    name: 'Takab Silver Travertine',
    family: 'Travertine',
    quarryOrigin: 'Takab, Iran',
    tone: 'Smoky Silver-Gray with Horizontal Linear Strata',
    image: '/images/stone/silver_travertine_texture.jpg',
    formats: ['Vein-Cut Slabs', 'Cross-Cut Slabs', 'Exterior Cladding', 'Floor Tiles'],
    finishes: ['Polished & Filled', 'Honed', 'Brushed Antique'],
    density: '2.52 g/cm³',
    absorption: '0.38%',
    description: 'Distinctive layered gray and pewter sediment beds. Natural porosity provides thermal insulation and supreme mortar adhesion, making it ideal for modern luxury exterior facades and pool copings.',
    featured: true
  },
  {
    id: 'persian-white-crystal',
    name: 'Aligudarz White Crystal Marble',
    family: 'Crystal',
    quarryOrigin: 'Aligudarz, Iran',
    tone: 'Pure Snow White with Subtle Charcoal Linear Ribbons',
    image: '/images/stone/white_crystal_marble.jpg',
    formats: ['Bookmatch Slabs', 'Quadmatch Sets', 'Flooring (80×80, 100×100)'],
    finishes: ['Diamond Polished', 'Honed Satin'],
    density: '2.72 g/cm³',
    absorption: '0.12%',
    description: 'Fine-grained crystalline marble with high light transmission and near-zero absorption. Renowned for dramatic 4-piece bookmatch floor centerpieces.',
    featured: true
  },
  {
    id: 'golden-black-marble',
    name: 'Kashan Golden Black Marble',
    family: 'Marble',
    quarryOrigin: 'Kashan, Iran',
    tone: 'Deep Pitch Obsidian with Radiant Gold & White Quartz Waves',
    image: '/images/stone/golden_black_marble.webp',
    formats: ['Gangsaw Slabs', 'Cut-to-Size Flooring', 'Vanity Tops'],
    finishes: ['Mirror Polished', 'Leathered Silk Touch'],
    density: '2.73 g/cm³',
    absorption: '0.22%',
    description: 'Exotic high-contrast black marble with golden lightning veins. Premium choice for elevator vestibules, luxury bar counters, and contrast inlays.',
    featured: false
  },
  {
    id: 'quarry-blocks',
    name: 'Raw Quarry Extraction Blocks',
    family: 'Marble',
    quarryOrigin: 'Isfahan Quarry Reserves',
    tone: 'Monolithic Untreated Quarry Blocks (15 to 30 Tons)',
    image: '/images/stone/real_quarry_blocks.jpg',
    formats: ['Export Block A+', 'Block Gangsaw Grade', 'Block Dressing'],
    finishes: ['Wire-Saw Sawn Faces'],
    density: '2.71 g/cm³',
    absorption: '0.15%',
    description: 'Selected rectangular quarry blocks extracted with zero-detonation diamond wire cutting, ensuring intact internal crystal structure ready for export or custom slicing.',
    featured: false
  },
  {
    id: 'bush-hammered-finish',
    name: 'Bush-Hammered Exterior Lashotor',
    family: 'Marble',
    quarryOrigin: 'Isfahan, Iran',
    tone: 'Textured Ash Gray with High Friction Coefficient (R11)',
    image: '/images/stone/bush_hammered_finish.webp',
    formats: ['Exterior Tiles (40×40, 60×60, 80×40)', 'Paving Pavers', 'Stair Treads'],
    finishes: ['Rotary Bush-Hammered'],
    density: '2.71 g/cm³',
    absorption: '0.15%',
    description: 'Rotary carbide hammered finish converting dark Pietra Gray into a refined architectural ash stone with certified slip-resistance for outdoor plazas, ramps, and facades.',
    featured: false
  }
];

interface StoneCatalogProps {
  onSelectStone: (stone: StoneProduct) => void;
  onOpenQuote: (stoneName?: string) => void;
}

export const StoneCatalog: React.FC<StoneCatalogProps> = ({ onSelectStone, onOpenQuote }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Marble', 'Travertine', 'Crystal'];

  const filteredStones = STONE_DATABASE.filter(stone => {
    const matchesCategory = activeCategory === 'All' || stone.family === activeCategory;
    const matchesSearch =
      stone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stone.tone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useGSAP(() => {
    gsap.fromTo(
      '.catalog-card',
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.catalog-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: containerRef, dependencies: [activeCategory, searchQuery] });

  return (
    <section id="catalog" ref={containerRef} className="py-28 md:py-36 bg-black text-white select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>DIRECT FACTORY INVENTORY</span>
            </div>
            <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-tighter uppercase">
              ARCHITECTURAL <span className="font-light text-neutral-400">COLLECTIONS</span>
            </h2>
            <p className="font-mono text-xs sm:text-sm text-neutral-400 mt-2 tracking-wider uppercase">
              SLABS, TILES, AND CUSTOM CUT-TO-SIZE ARCHITECTURAL SPECIFICATIONS
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by stone name, tone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/10 text-white text-xs font-mono placeholder:text-neutral-500 focus:outline-none focus:border-white transition-colors"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-black font-semibold'
                  : 'bg-[#0E0E0E] text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              {cat === 'All' ? 'All Collections' : cat}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        <div className="catalog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredStones.map((stone) => (
            <div
              key={stone.id}
              className="catalog-card group rounded-xl bg-[#0A0A0A] border border-white/10 hover:border-white/30 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              {/* Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-black">
                <img
                  src={stone.image}
                  alt={stone.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                {/* Badge */}
                <span className="absolute top-4 left-4 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white border border-white/20 uppercase tracking-widest">
                  {stone.family}
                </span>

                {stone.featured && (
                  <span className="absolute top-4 right-4 px-2 py-0.5 rounded bg-white text-black text-[10px] font-mono font-bold tracking-wider uppercase">
                    Factory Flagship
                  </span>
                )}

                {/* Quarry Origin */}
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-neutral-300 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{stone.quarryOrigin}</span>
                </div>
              </div>

              {/* Stone Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-sans font-bold text-white group-hover:text-neutral-200 transition-colors">
                    {stone.name}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-2 mt-2 leading-relaxed">
                    {stone.description}
                  </p>

                  {/* Physical Specs */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10 text-[11px] font-mono">
                    <div className="text-neutral-400">
                      Absorption: <span className="text-white font-semibold">{stone.absorption}</span>
                    </div>
                    <div className="text-neutral-400">
                      Density: <span className="text-white font-semibold">{stone.density}</span>
                    </div>
                  </div>

                  {/* Formats */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {stone.formats.slice(0, 2).map((fmt) => (
                      <span
                        key={fmt}
                        className="px-2 py-0.5 rounded bg-white/5 text-neutral-300 text-[10px] font-mono border border-white/10"
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => onSelectStone(stone)}
                    className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-mono tracking-wider transition-all border border-white/15 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Full Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                  </button>

                  <button
                    onClick={() => onOpenQuote(stone.name)}
                    className="py-2 px-3 rounded-lg bg-white hover:bg-neutral-200 text-black font-semibold text-xs font-mono tracking-wider transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Quote</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

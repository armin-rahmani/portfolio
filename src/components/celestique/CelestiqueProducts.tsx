import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product, CATEGORIES } from '../../data/celestiqueData';
import { ShoppingBag, Eye, Heart, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProductsProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export const CelestiqueProducts: React.FC<ProductsProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onQuickView,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Title reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Product cards entrance
      if (gridRef.current?.children) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    },
    { scope: containerRef, dependencies: [selectedCategory] }
  );

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="products"
      ref={containerRef}
      className="relative bg-[#F7F4EE] text-[#1C1917] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 border-t border-[#1C1917]/8 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Giant Watermark Heading (Exact Reference Match) */}
        <div ref={titleRef} className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span className="font-tenor text-xs tracking-[0.25em] text-[#1C1917]/60 uppercase">
              ICONIC ATELIER FAVORITES
            </span>
          </div>

          <h2 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] text-[#1C1917]/85 uppercase">
            OUR MOST <br />
            <span className="text-[#1C1917]/35 italic">LOVED CREATIONS</span>
          </h2>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-tenor uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#1C1917] text-[#F7F4EE] shadow-sm'
                    : 'bg-[#EAE4D9]/80 text-[#1C1917]/70 hover:bg-[#EAE4D9] hover:text-[#1C1917]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Product Grid (Exact Reference Composition) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#1C1917]/8 shadow-2xs hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
              >
                {/* Product Image on Pebble Pedestal */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#F2EDE4]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />

                  {/* Top Floating Buttons: Wishlist */}
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-[#1C1917] hover:bg-white hover:text-red-500 transition-colors shadow-2xs z-10"
                    aria-label="Save to wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isWishlisted ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                  </button>

                  {/* Hover Overlay Actions: Quick View & Add */}
                  <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
                    <button
                      onClick={() => onQuickView(product)}
                      className="flex-1 py-2.5 px-3 rounded-full bg-white/90 backdrop-blur-md text-[#1C1917] hover:bg-white transition-colors text-[11px] font-tenor tracking-widest uppercase flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-2.5 rounded-full bg-[#1C1917] text-white hover:bg-[#C5A059] hover:text-[#1C1917] transition-colors shadow-xs"
                      aria-label="Quick add to bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Product Details (Exact Reference Match) */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="font-editorial text-lg text-[#1C1917] tracking-wide uppercase group-hover:text-[#C5A059] transition-colors line-clamp-1">
                      {product.name}
                    </h4>

                    <p className="font-tenor text-[11px] tracking-widest text-[#1C1917]/55 uppercase mt-1">
                      {product.material}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1C1917]/6 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-editorial text-xl font-medium text-[#1C1917]">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#1C1917]/40 line-through font-sans">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onQuickView(product)}
                      className="text-[11px] font-tenor uppercase tracking-widest text-[#1C1917]/60 hover:text-[#1C1917] transition-colors underline underline-offset-4"
                    >
                      Details →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

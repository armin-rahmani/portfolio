import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X, ArrowLeft, Sparkles } from 'lucide-react';

interface NavProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist?: () => void;
}

export const CelestiqueNav: React.FC<NavProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#1C1917] text-[#E7DFD5] text-[10px] sm:text-xs py-2 px-4 text-center tracking-[0.2em] uppercase font-tenor flex items-center justify-center gap-2 overflow-hidden border-b border-white/10 z-50 relative">
        <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
        <span>Complimentary Bespoke Packaging & Express Worldwide Insured Delivery</span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline text-white/70">Crafted with 100% Recycled 18k Gold & Certified Diamonds</span>
      </div>

      {/* Main Luxury Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F7F4EE]/90 backdrop-blur-md shadow-xs py-3 border-b border-[#1C1917]/10'
            : 'bg-[#F7F4EE] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Cross-Site Switcher & Volume */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide uppercase text-[#1C1917] bg-[#EAE4D9] hover:bg-[#1C1917] hover:text-[#F7F4EE] transition-all duration-300 shadow-2xs"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Armin's Portfolio</span>
            </Link>

            <Link
              to="/sohub"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide uppercase text-[#1C1917]/80 hover:text-[#1C1917] border border-[#1C1917]/15 hover:border-[#1C1917] transition-all duration-300"
            >
              <span>Raya Studio</span>
            </Link>

            <span className="hidden lg:inline-block text-[11px] tracking-[0.18em] uppercase text-[#1C1917]/50 font-tenor ml-2">
              VOL. 01 • EST. 2025
            </span>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-tenor uppercase tracking-[0.18em] text-[#1C1917]/80">
            <button
              onClick={() => scrollTo('hero')}
              className="hover:text-[#1C1917] transition-colors relative group py-1"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#1C1917] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="hover:text-[#1C1917] transition-colors relative group py-1"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#1C1917] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollTo('categories')}
              className="hover:text-[#1C1917] transition-colors relative group py-1"
            >
              Categories
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#1C1917] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollTo('products')}
              className="hover:text-[#1C1917] transition-colors relative group py-1"
            >
              Creations
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#1C1917] transition-all duration-300 group-hover:w-full" />
            </button>
          </nav>

          {/* Right: Actions (Wishlist, Bag, Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Bag Button */}
            <button
              onClick={onOpenCart}
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1917] text-[#F7F4EE] hover:bg-[#D4AF37] hover:text-[#1C1917] transition-all duration-300 text-xs font-tenor tracking-widest uppercase shadow-xs cursor-pointer"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
              <span>BAG</span>
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/20 group-hover:bg-[#1C1917] group-hover:text-white text-[10px] font-semibold">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1C1917] hover:bg-[#EAE4D9] rounded-full transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F7F4EE] border-b border-[#1C1917]/10 px-6 py-6 animate-fadeIn">
            <div className="flex flex-col gap-4 font-tenor text-sm uppercase tracking-[0.2em] text-[#1C1917]">
              <button
                onClick={() => scrollTo('hero')}
                className="text-left py-2 border-b border-[#1C1917]/5"
              >
                Home
              </button>
              <button
                onClick={() => scrollTo('about')}
                className="text-left py-2 border-b border-[#1C1917]/5"
              >
                About Us
              </button>
              <button
                onClick={() => scrollTo('categories')}
                className="text-left py-2 border-b border-[#1C1917]/5"
              >
                Our Products
              </button>
              <button
                onClick={() => scrollTo('products')}
                className="text-left py-2 border-b border-[#1C1917]/5"
              >
                Most Loved Creations
              </button>

              <div className="pt-4 flex flex-col gap-2">
                <Link
                  to="/"
                  className="w-full text-center py-2.5 rounded-full bg-[#1C1917] text-white text-xs tracking-widest font-tenor"
                >
                  Return to Armin's Portfolio
                </Link>
                <Link
                  to="/sohub"
                  className="w-full text-center py-2.5 rounded-full border border-[#1C1917]/20 text-[#1C1917] text-xs tracking-widest font-tenor"
                >
                  Explore Raya Studio
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

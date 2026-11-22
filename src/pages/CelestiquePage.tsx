import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS, Product, CartItem } from '../data/celestiqueData';
import { CelestiqueIntro } from '../components/celestique/CelestiqueIntro';
import { CelestiqueNav } from '../components/celestique/CelestiqueNav';
import { CelestiqueHero } from '../components/celestique/CelestiqueHero';
import { CelestiqueAbout } from '../components/celestique/CelestiqueAbout';
import { CelestiqueCategories } from '../components/celestique/CelestiqueCategories';
import { CelestiqueProducts } from '../components/celestique/CelestiqueProducts';
import { CelestiqueFooter } from '../components/celestique/CelestiqueFooter';
import { CelestiqueQuickView } from '../components/celestique/CelestiqueQuickView';
import { CelestiqueCartDrawer } from '../components/celestique/CelestiqueCartDrawer';
import { CheckCircle2, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CelestiquePage: React.FC = () => {
  const [introDone, setIntroDone] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
      metal: '18k Solid Yellow Gold',
      size: '7',
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['celestial-spark']);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Initialize smooth Lenis scrolling
  useEffect(() => {
    if (!introDone) return;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [introDone]);

  // Refresh ScrollTrigger when intro completes
  useEffect(() => {
    if (introDone) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [introDone]);

  // Cart operations
  const handleAddToCart = (product: Product, metal: string = '18k Yellow Gold', size?: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.metal === metal && i.size === size
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1, metal, size }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShopNow = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCheckoutComplete(true);
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1C1917] selection:bg-[#C5A059]/30 selection:text-[#1C1917] font-sans antialiased">
      {/* 1. GSAP Intro Loader */}
      {!introDone && (
        <CelestiqueIntro onComplete={() => setIntroDone(true)} />
      )}

      {/* 2. Top Luxury Navigation */}
      <CelestiqueNav
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 3. Hero Section (Exact Reference Layout) */}
      <CelestiqueHero
        onSelectCategory={handleCategorySelect}
        onShopNow={handleShopNow}
      />

      {/* 4. About Us Section (Arched Model Photo & Atelier Story) */}
      <CelestiqueAbout
        onReadStory={handleShopNow}
      />

      {/* 5. Our Products (2x2 Stone Pedestal Category Grid) */}
      <CelestiqueCategories
        onSelectCategory={handleCategorySelect}
      />

      {/* 6. Our Most Loved Creations (8 Product Cards with Filters) */}
      <CelestiqueProducts
        products={PRODUCTS}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onQuickView={(p) => setQuickViewProduct(p)}
        onAddToCart={(p) => handleAddToCart(p)}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* 7. Footer (Warm Taupe with Massive White Celestique Logo & Armin Attribution) */}
      <CelestiqueFooter />

      {/* Quick View Product Modal */}
      <CelestiqueQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(product, metal, size) => {
          handleAddToCart(product, metal, size);
        }}
      />

      {/* Shopping Bag Drawer */}
      <CelestiqueCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Checkout Success Modal */}
      {checkoutComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#F7F4EE] p-8 sm:p-10 rounded-3xl max-w-md w-full text-center border border-[#1C1917]/10 shadow-2xl relative">
            <button
              onClick={() => setCheckoutComplete(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#EAE4D9] transition-colors"
            >
              <X className="w-5 h-5 text-[#1C1917]" />
            </button>

            <CheckCircle2 className="w-16 h-16 text-[#C5A059] mx-auto mb-4 animate-bounce" />

            <h3 className="font-editorial text-3xl uppercase tracking-wider text-[#1C1917]">
              MERCI BEAUCOUP
            </h3>

            <p className="font-tenor text-xs tracking-widest uppercase text-[#C5A059] mt-1 mb-4">
              Your Celestial Order Has Been Placed
            </p>

            <p className="text-xs sm:text-sm text-[#1C1917]/70 font-sans leading-relaxed mb-6">
              Our master jewelers in Florence will carefully assemble and hand-polish your order. You will receive an insured courier tracking dispatch within 24 hours.
            </p>

            <div className="p-4 bg-white rounded-2xl border border-[#1C1917]/8 text-left text-xs font-tenor text-[#1C1917]/80 space-y-1 mb-6">
              <div className="flex justify-between">
                <span>ORDER REF:</span>
                <span className="font-mono font-bold">#CEL-2025-9842</span>
              </div>
              <div className="flex justify-between">
                <span>ESTIMATED DELIVERY:</span>
                <span>2-3 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span>PACKAGING:</span>
                <span>Bespoke Velvet Box</span>
              </div>
            </div>

            <button
              onClick={() => setCheckoutComplete(false)}
              className="w-full py-3.5 rounded-full bg-[#1C1917] text-white hover:bg-[#C5A059] hover:text-[#1C1917] transition-all font-tenor text-xs tracking-widest uppercase"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

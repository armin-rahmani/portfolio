import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Product } from '../../data/celestiqueData';
import { X, ShoppingBag, ShieldCheck, Sparkles, Check } from 'lucide-react';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, metal: string, size?: string) => void;
}

export const CelestiqueQuickView: React.FC<QuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const [selectedMetal, setSelectedMetal] = useState('18k Yellow Gold');
  const [selectedSize, setSelectedSize] = useState('7');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setAdded(false);
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(
      product,
      selectedMetal,
      product.category === 'rings' ? selectedSize : undefined
    );
    setAdded(true);
    setTimeout(() => {
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl bg-[#F7F4EE] rounded-3xl overflow-hidden shadow-2xl border border-[#1C1917]/10 z-10 my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#1C1917] transition-colors shadow-xs cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image on Pedestal */}
          <div className="relative aspect-square md:aspect-auto w-full bg-[#EFEAE0] flex items-center justify-center p-6 sm:p-8">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full max-h-[460px] object-cover rounded-2xl shadow-sm"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-tenor uppercase tracking-widest text-[#1C1917]">
              Atelier Specimen
            </div>
          </div>

          {/* Product Info & Purchase Options */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="font-tenor text-[11px] tracking-[0.2em] uppercase text-[#1C1917]/60">
                  {product.category}
                </span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] tracking-wide uppercase">
                {product.name}
              </h3>

              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-editorial text-2xl font-medium text-[#1C1917]">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#1C1917]/40 line-through font-sans">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-medium">
                  In Stock • Ready to Ship
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#1C1917]/70 font-sans leading-relaxed">
                {product.description}
              </p>

              {/* Metal Selection */}
              <div className="mt-6">
                <label className="block text-[11px] font-tenor uppercase tracking-widest text-[#1C1917]/70 mb-2">
                  Metal Material: <span className="font-bold text-[#1C1917]">{selectedMetal}</span>
                </label>
                <div className="flex gap-2">
                  {['18k Yellow Gold', '18k Rose Gold', '950 Platinum'].map((metal) => (
                    <button
                      key={metal}
                      type="button"
                      onClick={() => setSelectedMetal(metal)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-tenor tracking-wider uppercase transition-all duration-300 ${
                        selectedMetal === metal
                          ? 'bg-[#1C1917] text-white shadow-2xs'
                          : 'bg-[#EAE4D9] text-[#1C1917]/75 hover:bg-[#E0D8CB]'
                      }`}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection (if Ring) */}
              {product.category === 'rings' && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-tenor uppercase tracking-widest text-[#1C1917]/70">
                      Ring Size (US)
                    </label>
                    <span className="text-[10px] font-tenor text-[#C5A059] uppercase tracking-wider cursor-pointer underline">
                      Size Guide
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {['5', '6', '7', '8', '9'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-tenor transition-all ${
                          selectedSize === size
                            ? 'bg-[#1C1917] text-white shadow-2xs'
                            : 'bg-[#EAE4D9] text-[#1C1917] hover:bg-[#E0D8CB]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications List */}
              <div className="mt-6 pt-4 border-t border-[#1C1917]/10 space-y-1.5">
                {product.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#1C1917]/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-4 border-t border-[#1C1917]/10 flex flex-col gap-3">
              <button
                onClick={handleAdd}
                className="w-full py-3.5 px-6 rounded-full bg-[#1C1917] text-white hover:bg-[#C5A059] hover:text-[#1C1917] transition-all duration-300 font-tenor text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag — ${product.price.toLocaleString()}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] font-tenor tracking-wider text-[#1C1917]/60 uppercase">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" /> Lifetime Warranty
                </span>
                <span>•</span>
                <span>Complimentary 30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

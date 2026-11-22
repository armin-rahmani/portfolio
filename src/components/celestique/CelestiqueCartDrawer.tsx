import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { CartItem } from '../../data/celestiqueData';
import { X, Trash2, ArrowRight, ShieldCheck, Sparkles, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CelestiqueCartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        drawerRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.45, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 500;
  const progressPercent = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          ref={drawerRef}
          className="w-screen max-w-md bg-[#F7F4EE] border-l border-[#1C1917]/10 flex flex-col justify-between shadow-2xl text-[#1C1917]"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#1C1917]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
              <h3 className="font-editorial text-xl uppercase tracking-wider">
                YOUR SHOPPING BAG ({items.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#EAE4D9] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 text-[#1C1917]" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#EFEAE0] px-6 py-3 border-b border-[#1C1917]/5 text-xs font-tenor">
            <div className="flex items-center justify-between text-[11px] tracking-wider uppercase mb-1.5 text-[#1C1917]/80">
              {subtotal >= freeShippingThreshold ? (
                <span className="text-emerald-800 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#C5A059]" /> You've Unlocked Free Express Courier!
                </span>
              ) : (
                <span>
                  Add ${(freeShippingThreshold - subtotal).toLocaleString()} more for Free Worldwide Delivery
                </span>
              )}
            </div>
            <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C5A059] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#1C1917]/60">
                <ShoppingBag className="w-12 h-12 stroke-[1.2] text-[#C5A059] mb-3" />
                <p className="font-editorial text-xl uppercase tracking-wide">
                  Your bag is currently empty
                </p>
                <p className="text-xs font-sans mt-2 max-w-xs text-[#1C1917]/50">
                  Explore our Collection 2025 and uncover a celestial creation crafted to illuminate your moments.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#1C1917] text-white text-xs font-tenor uppercase tracking-widest"
                >
                  Explore Creations
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.metal}-${item.size || ''}`}
                  className="flex gap-4 p-3 bg-white rounded-2xl border border-[#1C1917]/6 shadow-2xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl bg-[#EAE4D9]"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-editorial text-sm uppercase tracking-wide text-[#1C1917] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#1C1917]/40 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[10px] font-tenor uppercase tracking-wider text-[#1C1917]/60">
                        {item.metal} {item.size && `• Size ${item.size}`}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-[#1C1917]/15 rounded-full overflow-hidden text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2.5 py-0.5 hover:bg-[#EAE4D9] transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono text-[11px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2.5 py-0.5 hover:bg-[#EAE4D9] transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-editorial text-sm font-semibold text-[#1C1917]">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#1C1917]/10 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-tenor uppercase tracking-wider text-[#1C1917]/70">
                <span>Subtotal</span>
                <span className="font-editorial text-lg font-semibold text-[#1C1917]">
                  ${subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-tenor uppercase tracking-wider text-[#1C1917]/70">
                <span>Insured Delivery</span>
                <span className="text-emerald-800 font-semibold">
                  {subtotal >= freeShippingThreshold ? 'FREE' : '$25'}
                </span>
              </div>

              <div className="h-px bg-[#1C1917]/8 my-1" />

              <div className="flex items-center justify-between text-sm font-tenor uppercase tracking-widest text-[#1C1917]">
                <span>Total Due</span>
                <span className="font-editorial text-2xl font-bold text-[#1C1917]">
                  ${(
                    subtotal +
                    (subtotal >= freeShippingThreshold ? 0 : 25)
                  ).toLocaleString()}
                </span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full mt-2 py-3.5 px-6 rounded-full bg-[#1C1917] text-white hover:bg-[#C5A059] hover:text-[#1C1917] transition-all duration-300 font-tenor text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-tenor text-[#1C1917]/50 tracking-wider uppercase mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Calculator,
  MessageSquare,
  CheckCircle2,
  Building,
  User
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StoneContactProps {
  initialStone?: string;
}

export const StoneContact: React.FC<StoneContactProps> = ({ initialStone }) => {
  const containerRef = useRef<HTMLElement>(null);

  // Form State
  const [selectedStone, setSelectedStone] = useState<string>(initialStone || 'Lashotor (Pietra Gray)');
  const [selectedFormat, setSelectedFormat] = useState<string>('Gangsaw Slab 2.0 cm');
  const [selectedFinish, setSelectedFinish] = useState<string>('Polished (95+ Gloss)');
  const [areaSquareMeters, setAreaSquareMeters] = useState<number>(250);
  const [fullName, setFullName] = useState<string>('');
  const [emailOrPhone, setEmailOrPhone] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Container calculation
  const containerCount = (areaSquareMeters / 440).toFixed(1);

  useGSAP(() => {
    gsap.fromTo(
      '.contact-reveal',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contact" ref={containerRef} className="py-28 md:py-36 bg-black text-white select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12">
        
        {/* Section Heading */}
        <div className="contact-reveal mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-4">
            <Building className="w-3.5 h-3.5" />
            <span>FACTORY INQUIRIES</span>
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-tighter uppercase">
            DIRECT FACTORY <span className="font-light text-neutral-400">QUOTATION</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-neutral-400 mt-2 tracking-wider uppercase">
            ARASH STONE CO. • MAHMUDABAD INDUSTRIAL ZONE, 34TH STREET, ISFAHAN
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Interactive Project Quotation Builder */}
          <div className="contact-reveal lg:col-span-7 bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <Calculator className="w-5 h-5 text-neutral-400" />
              <h3 className="text-xl font-sans font-bold text-white">
                Stone Project Estimator & Quote Request
              </h3>
            </div>

            {isSubmitted ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/30 text-white flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-sans font-bold text-white mb-2">
                  Quotation Request Dispatched
                </h4>
                <p className="text-sm text-neutral-400 max-w-md mx-auto mb-6">
                  Thank you. Our sales management team in Mahmudabad, Isfahan has received your project specifications and will contact you shortly.
                </p>
                <div className="p-4 rounded-lg bg-black border border-white/10 max-w-md mx-auto text-left font-mono text-xs space-y-1.5 text-neutral-300">
                  <div>Stone: <span className="text-white">{selectedStone}</span></div>
                  <div>Format: <span className="text-white">{selectedFormat}</span></div>
                  <div>Estimated Area: <span className="text-white">{areaSquareMeters} m² (~{containerCount} Containers)</span></div>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-lg bg-white text-black font-semibold text-xs font-mono uppercase transition-all cursor-pointer hover:bg-neutral-200"
                >
                  Configure Another Stone Project
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Stone Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Select Stone Variety
                  </label>
                  <select
                    value={selectedStone}
                    onChange={(e) => setSelectedStone(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white text-xs font-mono focus:border-white focus:outline-none transition-colors"
                  >
                    <option value="Lashotor (Pietra Gray)">Lashotor (Pietra Gray) Marble</option>
                    <option value="Takab Silver Travertine">Takab Silver Travertine</option>
                    <option value="Aligudarz White Crystal">Aligudarz White Crystal Marble</option>
                    <option value="Kashan Golden Black Marble">Kashan Golden Black Marble</option>
                    <option value="Raw Quarry Extraction Blocks">Raw Quarry Extraction Blocks</option>
                  </select>
                </div>

                {/* 2. Format & Finish Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Format / Thickness
                    </label>
                    <select
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white text-xs font-mono focus:border-white focus:outline-none transition-colors"
                    >
                      <option value="Gangsaw Slab 2.0 cm">Gangsaw Master Slab (2.0 cm)</option>
                      <option value="Gangsaw Slab 3.0 cm">Gangsaw Master Slab (3.0 cm)</option>
                      <option value="Calibrated Tile 60×60 cm">Calibrated Tile (60×60 cm)</option>
                      <option value="Calibrated Tile 80×80 cm">Calibrated Tile (80×80 cm)</option>
                      <option value="Calibrated Tile 120×60 cm">Calibrated Tile (120×60 cm)</option>
                      <option value="Custom Cut-to-Size">Custom Cut-to-Size Architectural</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Surface Finish
                    </label>
                    <select
                      value={selectedFinish}
                      onChange={(e) => setSelectedFinish(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white text-xs font-mono focus:border-white focus:outline-none transition-colors"
                    >
                      <option value="Polished (95+ Gloss)">Polished (95+ Gloss Units)</option>
                      <option value="Satin Honed (Matte)">Satin Honed (Matte)</option>
                      <option value="Bush-Hammered Anti-Slip">Bush-Hammered (R11 Anti-Slip)</option>
                      <option value="Leathered Antique Brushed">Leathered / Brushed Antique</option>
                    </select>
                  </div>
                </div>

                {/* 3. Area Slider & Container Calculation */}
                <div className="p-4 rounded-lg bg-black border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-neutral-400">Required Quantity:</span>
                    <span className="text-base font-mono font-bold text-white">
                      {areaSquareMeters} m²
                    </span>
                  </div>

                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={areaSquareMeters}
                    onChange={(e) => setAreaSquareMeters(Number(e.target.value))}
                    className="w-full accent-white cursor-pointer"
                  />

                  <div className="flex justify-between items-center text-[11px] font-mono text-neutral-400 mt-2">
                    <span>Est. Shipping Volume:</span>
                    <span className="text-white font-semibold">
                      ≈ {containerCount} × 20ft Ocean Containers (~{Math.round(areaSquareMeters * 0.055)} Metric Tons)
                    </span>
                  </div>
                </div>

                {/* 4. Client Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Full Name / Architectural Company
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Vance / Foster Architects"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Phone Number or WhatsApp
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. +971 50 123 4567"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Destination City / Port
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dubai, Doha, Hamburg, Sydney..."
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-semibold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Factory Proforma Invoice</span>
                </button>

              </form>
            )}
          </div>

          {/* Right Column: Factory & Executive Contacts */}
          <div className="contact-reveal lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Factory Address Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0A0A0A] border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-sans font-bold text-white">
                    Factory & Production Facility
                  </h4>
                  <span className="text-[11px] font-mono text-neutral-400">
                    Isfahan Stone Industrial Zone
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-neutral-300 leading-relaxed font-sans">
                <p className="font-semibold text-white">
                  Arash Stone Co.
                </p>
                <p>
                  Mahmudabad Industrial City, 34th Street, Isfahan, Iran
                </p>
              </div>

              {/* Central Office Landline */}
              <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">Office Phone 1:</span>
                  <a href="tel:03133808419" className="text-white hover:underline font-bold">
                    +98 31 33808419
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">Office Phone 2:</span>
                  <a href="tel:03133808418" className="text-white hover:underline font-bold">
                    +98 31 33808418
                  </a>
                </div>
              </div>
            </div>

            {/* Executive Leadership Contacts */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0A0A0A] border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-sans font-bold text-white">
                    Executive Direct Contacts
                  </h4>
                  <span className="text-[11px] font-mono text-neutral-400">
                    Direct Mobile & WhatsApp
                  </span>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                
                <div className="p-3 rounded-lg bg-black border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold block">R. Malekzadeh</span>
                    <span className="text-[10px] text-neutral-400">General Management</span>
                  </div>
                  <a
                    href="tel:09131127732"
                    className="text-white hover:underline font-bold"
                  >
                    +98 913 112 7732
                  </a>
                </div>

                <div className="p-3 rounded-lg bg-black border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold block">A. Malekzadeh</span>
                    <span className="text-[10px] text-neutral-400">Sales & Production</span>
                  </div>
                  <a
                    href="tel:09133129210"
                    className="text-white hover:underline font-bold"
                  >
                    +98 913 312 9210
                  </a>
                </div>

                <div className="p-3 rounded-lg bg-black border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold block">D. Malekzadeh</span>
                    <span className="text-[10px] text-neutral-400">Export & Logistics</span>
                  </div>
                  <a
                    href="tel:09134745746"
                    className="text-white hover:underline font-bold"
                  >
                    +98 913 474 5746
                  </a>
                </div>

              </div>

              {/* WhatsApp Quick Connect */}
              <div className="mt-6">
                <a
                  href="https://wa.me/989133129210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg bg-white/10 hover:bg-white hover:text-black text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/20 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Direct (+98 913 312 9210)</span>
                </a>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center gap-3 text-xs text-neutral-400 font-mono">
              <Clock className="w-4 h-4 text-white flex-shrink-0" />
              <span>
                Operating Hours: Saturday – Thursday 07:30 to 18:30 (IRDT)
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

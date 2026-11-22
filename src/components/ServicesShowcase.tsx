import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldCheck, ArrowRight, Building2, ChevronDown, CheckCircle2, RotateCw } from 'lucide-react';

export const ServicesShowcase: React.FC = () => {
  const [amount, setAmount] = useState<string>("2,450,000");
  const [currency, setCurrency] = useState<string>("USD");
  const [recipient, setRecipient] = useState<string>("Aurelius Zurich Sovereign Vault");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>("");

  const handleExecute = () => {
    if (isSuccess) {
      setIsSuccess(false);
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTransactionHash(`0x7f${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`);
    }, 650);
  };

  return (
    <section id="services" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      
      {/* Top Centered Section Header (Directly inspired by MONELIQ frame_03) */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold tracking-wide mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          <span>Capital Operations</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-950 font-sans"
        >
          Efficiency at its apex: Aurelius daily capital
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-base sm:text-lg text-neutral-500 font-normal"
        >
          Empowering cross-border enterprise liquidity with sub-second finality.
        </motion.p>
      </div>

      {/* Split Layout: Left Description + Right Interactive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>Treasury Settlement</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-medium tracking-tight text-neutral-950 leading-snug">
            Global capital dispatch: your gateway to deterministic settlement
          </h3>

          <p className="text-neutral-500 text-base leading-relaxed">
            Eliminate traditional correspondent banking delays. Aurelius enables direct clearing across 42 institutional jurisdictions with programmable yield routing and cryptographic audit trails.
          </p>

          <div className="pt-4 space-y-3">
            {[
              "Instant multi-currency conversion at spot wholesale spread",
              "Automated sovereign tax & regulatory reporting clearance",
              "Multi-signatory approval workflow with hardware enclave security"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-700" />
                </div>
                <span className="text-sm text-neutral-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <a 
              href="#capabilities" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-950 hover:text-emerald-700 transition-colors group"
            >
              <span>Explore institutional clearing matrix</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column: Soft Gray Container + Interactive Settlement Card (Directly inspired by MONELIQ frame_03/05) */}
        <div className="lg:col-span-7">
          <div className="bg-[#F3F4F6] rounded-[32px] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
            
            {/* Interactive Card Surface */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-100/80 max-w-md mx-auto">
              
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Execution Desk
                  </span>
                  <h4 className="text-base font-semibold text-neutral-900 mt-0.5">
                    Dispatched Liquidity
                  </h4>
                </div>
                <span className="text-xs font-mono bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-full">
                  T+0 Atomic
                </span>
              </div>

              {/* Amount Input Block */}
              <div className="mt-6 bg-neutral-50 rounded-2xl p-4 border border-neutral-100">
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                  <span>Settlement Amount</span>
                  <span>Available: $68,950,000</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-neutral-950">
                    ${amount}
                  </div>
                  
                  {/* Currency Picker */}
                  <div className="flex items-center gap-1 bg-white border border-neutral-200 rounded-lg px-2.5 py-1 text-xs font-bold text-neutral-800 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{currency}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                  </div>
                </div>

                {/* Preset quick buttons */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-200/60 text-[11px]">
                  <span className="text-neutral-400">Presets:</span>
                  {["1,000,000", "2,450,000", "5,000,000"].map((val, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAmount(val)}
                      className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                        amount === val ? 'bg-neutral-900 text-white' : 'bg-neutral-200/70 text-neutral-700 hover:bg-neutral-300'
                      }`}
                    >
                      ${val.split(',')[0]}M
                    </button>
                  ))}
                </div>
              </div>

              {/* Beneficiary Selector */}
              <div className="mt-4">
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                  Beneficiary Vault / Sovereign Account
                </label>
                <div className="w-full bg-neutral-50 border border-neutral-200/80 rounded-xl p-3 flex items-center justify-between text-xs text-neutral-800 font-medium">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">
                      AZ
                    </div>
                    <span>{recipient}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                </div>
              </div>

              {/* Action Button with Success State Transition (Direct MONELIQ recreation) */}
              <div className="mt-6">
                <button
                  onClick={handleExecute}
                  disabled={isProcessing}
                  className={`w-full py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isSuccess
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-neutral-950 text-white hover:bg-neutral-800'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      <span>Validating cryptographic proof...</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Successful!</span>
                    </>
                  ) : (
                    <span>Confirm Settlement</span>
                  )}
                </button>
              </div>

              {/* Success Details Notification */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold">Settlement Confirmed</div>
                      <div className="text-[10px] font-mono text-emerald-600">Hash: {transactionHash}</div>
                    </div>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="text-[11px] underline hover:text-emerald-950 cursor-pointer"
                    >
                      Reset
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

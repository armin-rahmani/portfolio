import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, X, Shield, Lock, Send } from 'lucide-react';

interface ContactCTAProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ isModalOpen, onCloseModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    scope: 'Enterprise Infrastructure',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      organization: '',
      scope: 'Enterprise Infrastructure',
      message: ''
    });
    onCloseModal();
  };

  return (
    <>
      {/* Embedded In-Page CTA Section */}
      <section id="contact" className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white border-t border-neutral-100">
        <div className="bg-[#F8F9FA] rounded-[32px] sm:rounded-[40px] p-8 sm:p-14 lg:p-16 border border-neutral-200/60 max-w-5xl mx-auto text-center relative overflow-hidden">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wide mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>Strategic Engagement Desk</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-950 font-sans max-w-3xl mx-auto leading-tight">
            Initiate a confidential briefing with our executive leadership
          </h2>

          <p className="mt-4 text-neutral-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Our Senior Partners provide direct architectural advisory to C-suite and sovereign committees under mutual non-disclosure agreements.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setSubmitted(false);
                // Open modal
                const btn = document.getElementById('trigger-contact-modal');
                if (btn) btn.click();
              }}
              className="bg-neutral-950 text-white hover:bg-neutral-800 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group"
            >
              <span>Schedule Strategic Consultation</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <a
              href="mailto:partner@aurelius.institutional"
              className="bg-white hover:bg-neutral-50 text-neutral-800 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide border border-neutral-200 transition-colors"
            >
              partner@aurelius.institutional
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-200/60 flex flex-wrap items-center justify-center gap-6 text-[11px] text-neutral-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" /> End-to-end PGP Encrypted
            </span>
            <span>·</span>
            <span>Direct Partner Response within 4 Hours</span>
            <span>·</span>
            <span>Swiss Data Sovereignty Governed</span>
          </div>
        </div>
      </section>

      {/* Interactive Modal Drawer */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseModal}
              className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-100 z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={onCloseModal}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitted ? (
                <>
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                      Direct Executive Channel
                    </span>
                    <h3 className="text-2xl font-bold text-neutral-950">
                      Schedule Executive Briefing
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      Connect directly with an Aurelius Managing Director for confidential architectural evaluation.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">
                        Full Name & Title *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Helena Vance, Chief Technology Officer"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-hidden focus:border-neutral-900 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-neutral-700 mb-1">
                          Enterprise / Sovereign Entity *
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="Organization name"
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-hidden focus:border-neutral-900 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-neutral-700 mb-1">
                          Institutional Email *
                        </label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="h.vance@enterprise.com"
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-hidden focus:border-neutral-900 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">
                        Engagement Scope
                      </label>
                      <select
                        value={formData.scope}
                        onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-hidden focus:border-neutral-900 transition-colors cursor-pointer"
                      >
                        <option>Autonomous Enterprise Infrastructure</option>
                        <option>Sovereign Multi-Jurisdiction Clearing</option>
                        <option>Algorithmic Treasury Orchestration</option>
                        <option>Quantum-Resistant Cryptographic Audit</option>
                        <option>Consortium Strategic Retainer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">
                        Brief Objectives / Timeline
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail high-level objectives, timeline, or jurisdiction requirements..."
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:outline-hidden focus:border-neutral-900 transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-neutral-950 hover:bg-neutral-800 text-white py-3 rounded-full font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {loading ? (
                          <span>Encrypting & Routing Request...</span>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Transmit Confidential Briefing Request</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[10px] text-neutral-400 text-center pt-1">
                      Protected by Zurich Sovereign Custody & Swiss Privacy Safeguards.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-950">
                    Briefing Request Transmitted
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                    Thank you, {formData.name || 'Executive'}. Your request has been securely dispatched to our Managing Directors. You will receive encrypted confirmation within 4 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="bg-neutral-950 text-white px-6 py-2.5 rounded-full text-xs font-semibold cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

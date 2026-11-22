import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { X, Send, CheckCircle2, Phone, Mail, Copy, Check } from 'lucide-react';

interface DMContactBriefProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DMContactBrief: React.FC<DMContactBriefProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [selectedTopic, setSelectedTopic] = useState('New Website (Webflow)');
  const [selectedBudget, setSelectedBudget] = useState('€5k - €15k');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const topics = [
    'New Website (Webflow)',
    'Brand & Visual Identity',
    'Custom GSAP Motion',
    'Technical SEO & Growth',
    'Other'
  ];

  const budgets = ['< €5k', '€5k - €15k', '€15k - €30k', '€30k+'];

  useGSAP(() => {
    if (!modalRef.current || !cardRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(modalRef.current, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        cardRef.current,
        { scale: 0.94, y: 30, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.05 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(cardRef.current, { scale: 0.94, y: 20, opacity: 0, duration: 0.25, ease: 'power2.in' });
      gsap.to(modalRef.current, { autoAlpha: 0, duration: 0.25, ease: 'power2.in' });
    }
  }, { scope: modalRef, dependencies: [isOpen] });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
      style={{ visibility: 'hidden', opacity: 0 }}
      onClick={(e) => {
        if (e.target === modalRef.current) onClose();
      }}
    >
      <div
        ref={cardRef}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#121212] border border-white/10 p-6 sm:p-10 text-white shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F8CB47] font-semibold">
              Project Brief & Inquiry
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Let's talk to the makers
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:bg-white/5 active:scale-95"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">Message received!</h4>
            <p className="text-gray-400 text-sm max-w-md mb-8 leading-relaxed">
              Thank you for reaching out. Armin and the team will review your project brief and get back to you within 24 hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-6 py-3 rounded-full bg-[#5363F6] text-white font-semibold text-sm hover:bg-[#4352E4] transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Quick Topic Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                What do you want to build?
              </label>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <button
                    type="button"
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedTopic === topic
                        ? 'bg-[#5363F6] text-white shadow-md shadow-[#5363F6]/30'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated Budget Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                Expected Investment
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {budgets.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setSelectedBudget(b)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-medium text-center transition-all border ${
                      selectedBudget === b
                        ? 'bg-white/10 border-[#5363F6] text-[#5363F6]'
                        : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Email inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex van Dijk"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#5363F6] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#5363F6] transition-colors"
                />
              </div>
            </div>

            {/* Project Details textarea */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                Tell us about your project & goals *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Give a brief summary of the goals, timeline, and any specific inspiration or links..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#5363F6] transition-colors resize-none"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-full bg-[#5363F6] text-white hover:bg-[#4352E4] transition-all font-semibold text-sm shadow-xl shadow-[#5363F6]/25 hover:scale-[1.01] active:scale-[0.99]"
            >
              <Send className="w-4 h-4" />
              <span>Send project brief</span>
            </button>

            {/* Direct Contact Pills (Armin's info) */}
            <div className="pt-6 border-t border-white/10">
              <span className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-3">
                Prefer direct communication?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Email Pill */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Mail className="w-4 h-4 text-[#5363F6] shrink-0" />
                    <span className="truncate text-gray-300 font-mono">
                      arminrahmani318@gmail.com
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('arminrahmani318@gmail.com', 'email')}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copiedItem === 'email' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Phone Pill */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Phone className="w-4 h-4 text-[#F8CB47] shrink-0" />
                    <span className="text-gray-300 font-mono">09138763394 / 09203275255</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('09138763394', 'phone')}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    title="Copy Phone"
                  >
                    {copiedItem === 'phone' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

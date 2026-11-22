import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState('just an idea');
  const [making, setMaking] = useState('campaign');
  const [need, setNeed] = useState('the whole thing');
  const [budget, setBudget] = useState('€50–100k');
  const [location, setLocation] = useState('');
  const [timeline, setTimeline] = useState('');
  const [brief, setBrief] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useGSAP(() => {
    window.scrollTo(0, 0);
    gsap.from('.contact-reveal', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <main ref={containerRef} className="w-full bg-primary text-secondary pt-[10vw] pb-[6vw] px-[2.75vw]">
      {/* Top Header */}
      <div className="contact-reveal flex items-center gap-[0.5vw] text-secondary/50 extraSmallText mb-[3vw]">
        <span className="w-[0.5vw] h-[0.5vw] bg-yellow rounded-full" />
        <span>contact us</span>
        <span className="mx-[0.3vw]">/</span>
        <span>start a project</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[4vw] items-start">
        {/* Left Column: Heading, Call Booking & Image */}
        <div className="contact-reveal lg:col-span-5 flex flex-col justify-between">
          <div>
            <h1 className="largeText font-normal leading-[0.85] tracking-tight">
              let's build
              <br />
              <span className="text-secondary/30">together.</span>
            </h1>

            <p className="smallText text-secondary/70 mt-[2.5vw] max-w-[90%] leading-[1.35]">
              Available for full-stack web applications, scalable backend microservices, high-traffic SEO architecture, and bespoke UI/UX design. Reach out directly or submit your project scope below.
            </p>

            {/* Direct Contact Quick Cards */}
            <div className="mt-[2.5vw] space-y-[1vw]">
              {/* Email */}
              <div className="p-[1.2vw] bg-secondary/5 rounded-[0.5vw] border border-secondary/10 flex items-center justify-between">
                <div>
                  <span className="detailText font-mono uppercase text-secondary/50 block">Direct Email</span>
                  <a href="mailto:arminrahmani318@gmail.com" className="smallText font-medium text-secondary hover:text-yellow transition-colors">
                    arminrahmani318@gmail.com
                  </a>
                </div>
                <a
                  href="mailto:arminrahmani318@gmail.com"
                  className="main-btn extraSmallText"
                >
                  <span className="main-btn__icon" aria-hidden="true" />
                  <span className="main-btn__label">
                    <span className="main-btn__clip">
                      <span className="main-btn__from">Email</span>
                      <span className="main-btn__to" aria-hidden="true">Email</span>
                    </span>
                  </span>
                </a>
              </div>

              {/* Primary Phone */}
              <div className="p-[1.2vw] bg-secondary/5 rounded-[0.5vw] border border-secondary/10 flex items-center justify-between">
                <div>
                  <span className="detailText font-mono uppercase text-secondary/50 block">Primary Mobile / WhatsApp</span>
                  <a href="tel:09138763394" className="smallText font-medium font-mono text-secondary hover:text-yellow transition-colors">
                    09138763394
                  </a>
                </div>
                <div className="flex items-center gap-[0.5vw]">
                  <a
                    href="https://wa.me/989138763394"
                    target="_blank"
                    rel="noreferrer"
                    className="px-[0.8vw] py-[0.35vw] rounded-[0.2vw] bg-emerald-600 text-white extraSmallText font-medium hover:bg-emerald-700 transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="tel:09138763394"
                    className="main-btn extraSmallText"
                  >
                    <span className="main-btn__icon" aria-hidden="true" />
                    <span className="main-btn__label">
                      <span className="main-btn__clip">
                        <span className="main-btn__from">Call</span>
                        <span className="main-btn__to" aria-hidden="true">Call</span>
                      </span>
                    </span>
                  </a>
                </div>
              </div>

              {/* Secondary Phone */}
              <div className="p-[1.2vw] bg-secondary/5 rounded-[0.5vw] border border-secondary/10 flex items-center justify-between">
                <div>
                  <span className="detailText font-mono uppercase text-secondary/50 block">Secondary Mobile</span>
                  <a href="tel:09203275255" className="smallText font-medium font-mono text-secondary hover:text-yellow transition-colors">
                    09203275255
                  </a>
                </div>
                <a
                  href="tel:09203275255"
                  className="main-btn extraSmallText"
                >
                  <span className="main-btn__icon" aria-hidden="true" />
                  <span className="main-btn__label">
                    <span className="main-btn__clip">
                      <span className="main-btn__from">Call</span>
                      <span className="main-btn__to" aria-hidden="true">Call</span>
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="w-full aspect-[4/3] rounded-[0.5vw] overflow-hidden mt-[3vw] shadow-md bg-secondary/5 hidden lg:block">
            <img
              src="/images/contact2.webp"
              alt="Sidejob Oslo Production Studio"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column: Multi-Step Interactive Briefing Form */}
        <div className="contact-reveal lg:col-span-7 bg-secondary/3 border border-secondary/10 p-[2.5vw] rounded-[0.8vw]">
          {isSubmitted ? (
            <div className="py-[6vw] text-center">
              <span className="w-[3vw] h-[3vw] rounded-full bg-yellow text-secondary flex items-center justify-center mx-auto mb-[1.5vw] smallText font-bold">
                ✓
              </span>
              <h3 className="mediumText text-secondary font-medium">
                Enquiry received.
              </h3>
              <p className="smallText text-secondary/70 mt-[1vw] max-w-[80%] mx-auto">
                Thanks {name || 'there'}! We'll review your brief and get back to you with crew recommendations and scope within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="main-btn smallText mt-[2vw]"
              >
                <span className="main-btn__icon" aria-hidden="true" />
                <span className="main-btn__label">
                  <span className="main-btn__clip">
                    <span className="main-btn__from">Send another brief</span>
                    <span className="main-btn__to" aria-hidden="true">Send another brief</span>
                  </span>
                </span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-[2.5vw]">
              {/* Part 1: About the job */}
              <div>
                <span className="extraSmallText font-mono uppercase text-secondary/40 block mb-[1.2vw] pb-[0.4vw] border-b border-secondary/10">
                  PART 01 / ABOUT THE JOB
                </span>

                {/* Where are you at? */}
                <div className="mb-[1.8vw]">
                  <label className="smallText font-medium text-secondary block mb-[0.6vw]">
                    Where are you at? *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-[0.5vw]">
                    {['just an idea', 'concept in progress', 'concept locked', 'ready to produce'].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setStage(opt)}
                        className={`p-[0.7vw] rounded-[0.3vw] border text-left extraSmallText transition-colors cursor-pointer ${
                          stage === opt
                            ? 'bg-secondary text-primary border-secondary font-medium'
                            : 'border-secondary/20 hover:border-secondary/50 text-secondary'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* What are you making? */}
                <div className="mb-[1.8vw]">
                  <label className="smallText font-medium text-secondary block mb-[0.6vw]">
                    What are you making? *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-[0.5vw]">
                    {['campaign', 'film', 'photography', 'content', 'event / activation', 'something else'].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setMaking(opt)}
                        className={`p-[0.7vw] rounded-[0.3vw] border text-left extraSmallText transition-colors cursor-pointer ${
                          making === opt
                            ? 'bg-secondary text-primary border-secondary font-medium'
                            : 'border-secondary/20 hover:border-secondary/50 text-secondary'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* What do you need from us? */}
                <div className="mb-[1.8vw]">
                  <label className="smallText font-medium text-secondary block mb-[0.6vw]">
                    What do you need from us? *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-[0.5vw]">
                    {['the whole thing', 'creative + production', 'production', 'crew', 'casting', 'not sure yet'].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setNeed(opt)}
                        className={`p-[0.7vw] rounded-[0.3vw] border text-left extraSmallText transition-colors cursor-pointer ${
                          need === opt
                            ? 'bg-secondary text-primary border-secondary font-medium'
                            : 'border-secondary/20 hover:border-secondary/50 text-secondary'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location & Timeline inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.2vw] mb-[1.8vw]">
                  <div>
                    <label className="extraSmallText font-medium text-secondary block mb-[0.4vw]">
                      Where does it need to happen? *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Oslo, London, Multiple locations"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-[0.7vw] rounded-[0.3vw] border border-secondary/20 bg-primary extraSmallText focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="extraSmallText font-medium text-secondary block mb-[0.4vw]">
                      When do you need it? *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Next month, Q3, Flexible"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full p-[0.7vw] rounded-[0.3vw] border border-secondary/20 bg-primary extraSmallText focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                {/* Budget selector */}
                <div className="mb-[1.8vw]">
                  <label className="smallText font-medium text-secondary block mb-[0.6vw]">
                    What's the budget? *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-[0.5vw]">
                    {['under €25k', '€25–50k', '€50–100k', '€100–200k', '€200k+', 'not sure yet'].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setBudget(opt)}
                        className={`p-[0.7vw] rounded-[0.3vw] border text-left extraSmallText transition-colors cursor-pointer ${
                          budget === opt
                            ? 'bg-secondary text-primary border-secondary font-medium'
                            : 'border-secondary/20 hover:border-secondary/50 text-secondary'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Brief */}
                <div>
                  <label className="smallText font-medium text-secondary block mb-[0.4vw]">
                    Give us the rough version *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you're imagining, the deliverables, reference links or what success looks like..."
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    className="w-full p-[0.8vw] rounded-[0.3vw] border border-secondary/20 bg-primary extraSmallText focus:outline-none focus:border-secondary resize-none"
                  />
                </div>
              </div>

              {/* Part 2: About you */}
              <div className="pt-[1.5vw] border-t border-secondary/10">
                <span className="extraSmallText font-mono uppercase text-secondary/40 block mb-[1.2vw] pb-[0.4vw] border-b border-secondary/10">
                  PART 02 / ABOUT YOU
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.2vw] mb-[1.5vw]">
                  <div>
                    <label className="extraSmallText font-medium text-secondary block mb-[0.4vw]">
                      What should we call you? *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-[0.7vw] rounded-[0.3vw] border border-secondary/20 bg-primary extraSmallText focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="extraSmallText font-medium text-secondary block mb-[0.4vw]">
                      Who are you with? *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Company / Agency / Brand"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full p-[0.7vw] rounded-[0.3vw] border border-secondary/20 bg-primary extraSmallText focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.2vw] mb-[2vw]">
                  <div>
                    <label className="extraSmallText font-medium text-secondary block mb-[0.4vw]">
                      Where can we reach you? *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-[0.7vw] rounded-[0.3vw] border border-secondary/20 bg-primary extraSmallText focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="extraSmallText font-medium text-secondary block mb-[0.4vw]">
                      Anything to show us? (deck, moodboard, link)
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className="w-full p-[0.7vw] rounded-[0.3vw] border border-secondary/20 bg-primary extraSmallText focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-[1.5vw] border-t border-secondary/10">
                  <span className="detailText text-secondary/40 font-mono">
                    * ALL MARKED FIELDS REQUIRED
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="main-btn smallText cursor-pointer"
                  >
                    <span className="main-btn__icon" aria-hidden="true" />
                    <span className="main-btn__label">
                      <span className="main-btn__clip">
                        <span className="main-btn__from">
                          {isSubmitting ? 'Sending...' : 'Send enquiry'}
                        </span>
                        <span className="main-btn__to" aria-hidden="true">
                          {isSubmitting ? 'Sending...' : 'Send enquiry'}
                        </span>
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

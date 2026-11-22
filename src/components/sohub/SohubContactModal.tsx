import React, { useState } from 'react';

interface SohubContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SohubContactModal: React.FC<SohubContactModalProps> = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState<'project' | 'join' | 'hello'>('project');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-2xl font-vazir select-none"
      onClick={() => {
        onClose();
        setIsSubmitted(false);
      }}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-black/10 text-[#0C1016]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => {
            onClose();
            setIsSubmitted(false);
          }}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center font-bold text-lg cursor-pointer"
          aria-label="بستن"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7F8790] block mb-2">
              تماس و سفارش پروژه
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
              گفتگوی جدیدی را آغاز کنید.
            </h2>
            <p className="text-sm text-black/60 mb-6 font-medium">
              ایده، پیشنهاد همکاری یا پروژه جدیدی دارید؟ تیم رایا ظرف کمتر از ۲۴ ساعت پاسخگوی شما خواهد بود.
            </p>

            {/* Inquiries Pill Switcher */}
            <div className="flex gap-2 mb-6">
              {[
                { id: 'project', label: 'سفارش پروژه جدید' },
                { id: 'join', label: 'همکاری با رایا' },
                { id: 'hello', label: 'ارتباط مستقیم' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategory(tab.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    category === tab.id
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-[#E8EEF1] text-black/70 hover:bg-[#dbe3e7]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsSubmitted(true);
              }}
              className="flex flex-col gap-4 text-right"
            >
              <div>
                <label className="text-xs font-bold uppercase text-[#7F8790] block mb-1">
                  نام و نام‌خانوادگی
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: پارسا صادقی"
                  className="w-full px-4 py-2.5 rounded-xl border border-black/15 focus:outline-none focus:border-black text-sm font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-[#7F8790] block mb-1">
                  ایمیل سازمانی یا شخصی
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.ir"
                  className="w-full px-4 py-2.5 rounded-xl border border-black/15 focus:outline-none focus:border-black text-sm font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-[#7F8790] block mb-1">
                  توضیحات مختصر پروژه یا پیام شما
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="درباره برند، نیازمندی‌ها، بودجه یا زمان‌بندی مد نظرتان بنویسید..."
                  className="w-full px-4 py-2.5 rounded-xl border border-black/15 focus:outline-none focus:border-black text-sm resize-none font-medium"
                />
              </div>

              <div className="pt-2">
                <span className="text-[11px] text-[#7F8790] block mb-3 font-medium">
                  پیام شما مستقیماً توسط تیم طراحی و <strong className="text-black font-bold">آرمین رحمانی</strong> بررسی خواهد شد.
                </span>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 active:scale-98 transition-all cursor-pointer shadow-md"
                >
                  ارسال پیام به استودیو رایا
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-black mb-4">
              ✓
            </div>
            <h3 className="text-2xl font-black mb-2">پیام شما دریافت شد!</h3>
            <p className="text-sm text-[#7F8790] max-w-sm mb-6 leading-relaxed">
              از حسن اعتماد شما سپاسگزاریم. آرمین رحمانی و تیم استودیو رایا به زودی با شما در ارتباط خواهند بود.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                setIsSubmitted(false);
              }}
              className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold cursor-pointer"
            >
              بستن پنجره
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

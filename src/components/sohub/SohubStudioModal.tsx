import React from 'react';
import { RAYA_AWARDS } from '../../data/rayaData';

interface SohubStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const SohubStudioModal: React.FC<SohubStudioModalProps> = ({
  isOpen,
  onClose,
  onOpenContact
}) => {
  if (!isOpen) return null;

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-2xl font-vazir select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-black/10 text-[#0C1016]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center font-bold text-lg cursor-pointer"
          aria-label="بستن"
        >
          ✕
        </button>

        <span className="text-xs font-bold uppercase tracking-widest text-[#7F8790] block mb-2">
          درباره استودیو رایا
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
          رضایت و درخشش برند شما، انگیزه ماست.
        </h2>
        <p className="text-base sm:text-lg text-black/75 leading-relaxed max-w-2xl mb-8 font-medium">
          ما یک استودیو دیزاین تعاملی و مهندسی خلاق وب هستیم. با پیوند هنر طراحی هویت بصری، رندرینگ سه‌بعدی و مهندسی بدون مرز وب، به پیشروترین برندهای ایران کمک می‌کنیم تجربه‌هایی ماندگار خلق نمایند.
        </p>

        {/* Studio Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-[#E8EEF1] border border-black/5 text-right">
            <span className="text-3xl font-black block mb-1">۵۰+</span>
            <span className="text-xs font-bold text-black/60 uppercase">پروژه موفق ملی و بین‌المللی</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#E8EEF1] border border-black/5 text-right">
            <span className="text-3xl font-black block mb-1">۱۰۰٪</span>
            <span className="text-xs font-bold text-black/60 uppercase">رضایت مشتریان و کارفرمایان</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#E8EEF1] border border-black/5 text-right">
            <span className="text-3xl font-black block mb-1">۱۵</span>
            <span className="text-xs font-bold text-black/60 uppercase">تندیس و افتخار طراحی وب</span>
          </div>
        </div>

        {/* Awards & Recognition Section */}
        <div className="border-t border-black/10 pt-8 mb-8 text-right">
          <h3 className="text-xl font-black mb-4 tracking-tight">افتخارات و جوایز کسب‌شده</h3>
          <div className="divide-y divide-black/10">
            {RAYA_AWARDS.map((award, i) => (
              <div key={i} className="py-3 flex items-center justify-between text-sm">
                <span className="font-bold">{award.name}</span>
                <span className="text-black/60">{award.category}</span>
                <span className="font-mono text-xs text-black/40">{award.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mandatory Armin Rahmani Credit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-black text-white p-6 rounded-2xl text-right">
          <div>
            <h4 className="text-base sm:text-lg font-bold">طراحی و توسعه توسط آرمین رحمانی</h4>
            <p className="text-xs text-white/70 mt-0.5">آماده پذیرش و هدایت پروژه‌های تکنولوژیک و تعاملی بعدی شما.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            تماس و مشاوره پروژه
          </button>
        </div>
      </div>
    </div>
  );
};

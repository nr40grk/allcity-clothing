'use client';
import { useT } from '@/components/LanguageProvider';

export default function ShippingPage() {
  const t = useT();

  return (
    <div className="pt-14">
      <div className="px-6 pt-16 pb-10 border-b border-[#1a1a1a] max-w-[1400px] mx-auto">
        <h1 className="font-display text-6xl md:text-8xl text-[#F0EDE8] tracking-tight leading-none whitespace-pre-line">
          {t('shipping.title')}
        </h1>
      </div>

      <div className="px-6 py-14 max-w-[800px] mx-auto flex flex-col gap-12">
        <section>
          <h2 className="font-display text-2xl text-[#FF2200] tracking-widest mb-6">{t('shipping.shippingTitle')}</h2>
          <div className="flex flex-col gap-4 font-mono text-xs text-[#F0EDE8]/60 leading-relaxed">
            <p>{t('shipping.shippingBody')}</p>
            <div className="border border-[#1a1a1a] p-5 flex flex-col gap-3">
              <p className="text-[#F0EDE8]/40 uppercase tracking-widest text-[11px]">{t('shipping.estimatedDelivery')}</p>
              <div className="flex justify-between items-center border-b border-[#1a1a1a] pb-3">
                <span className="text-[#F0EDE8]/70">{t('shipping.domestic')}</span>
                <span className="text-[#F0EDE8]/50">{t('shipping.domesticTime')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#F0EDE8]/70">{t('shipping.international')}</span>
                <span className="text-[#F0EDE8]/50">{t('shipping.internationalTime')}</span>
              </div>
            </div>
            <p className="text-[#F0EDE8]/40">{t('shipping.note')}</p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl text-[#FF2200] tracking-widest mb-6">{t('shipping.returnsTitle')}</h2>
          <div className="flex flex-col gap-4 font-mono text-xs text-[#F0EDE8]/60 leading-relaxed">
            <div className="border border-[#1a1a1a] p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="font-display text-lg text-[#F0EDE8]/30">{t('shipping.noReturns')}</span>
                <span className="w-2 h-2 bg-[#FF2200] rounded-full" />
              </div>
              <div className="flex items-center gap-3">
                <span className="font-display text-lg text-[#F0EDE8]/30">{t('shipping.noRefunds')}</span>
                <span className="w-2 h-2 bg-[#FF2200] rounded-full" />
              </div>
            </div>
            <p className="text-[#F0EDE8]/40">{t('shipping.returnsNote')}</p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl text-[#FF2200] tracking-widest mb-6">{t('shipping.paymentTitle')}</h2>
          <div className="flex flex-col gap-4 font-mono text-xs text-[#F0EDE8]/60 leading-relaxed">
            <p>{t('shipping.paymentBody')}</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay'].map((method) => (
                <span key={method} className="border border-[#333] font-mono text-[11px] px-3 py-1 text-[#F0EDE8]/40">{method}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#1a1a1a] pt-10">
          <h2 className="font-display text-2xl text-[#FF2200] tracking-widest mb-4">{t('shipping.contactTitle')}</h2>
          <div className="font-mono text-xs text-[#F0EDE8]/50 flex flex-col gap-2">
            <a href="mailto:allcity.clothing@gmail.com" className="hover:text-[#FF2200] transition-colors">allcity.clothing@gmail.com</a>
            <a href="https://www.instagram.com/allcity_clothing" target="_blank" rel="noreferrer" className="hover:text-[#FF2200] transition-colors">@allcity_clothing on Instagram</a>
            <p className="text-[#F0EDE8]/30 mt-1">{t('shipping.findUs')}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

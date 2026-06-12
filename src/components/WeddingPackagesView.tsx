import React from 'react';
import { WEDDING_PACKAGES, WeddingPackage } from '../types';
import { CheckCircle, Info, Sparkles, AlertCircle, ShoppingBag, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WeddingPackagesViewProps {
  useTamil: boolean;
}

export default function WeddingPackagesView({ useTamil }: WeddingPackagesViewProps) {

  return (
    <div id="wedding-packages-view" className="space-y-16 sm:space-y-24">
      {/* Page Header */}
      <section className="flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-gray-800 pb-8">
        <div className="space-y-2 text-center sm:text-left">
          <span className="font-sans text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">
            {useTamil ? 'திருமண புகைப்படம் & திரைப்பட சொத்துக்கள்' : 'Wedding Photography & Film Assets'}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-black text-white gold-gradient-text leading-tight">
            {useTamil ? 'ஆயுள் கால முதலீட்டு தொகுப்புகள்' : 'Lifetime Investment Packages'}
          </h2>
          <p className="font-sans text-sm text-gray-400 max-w-xl">
            {useTamil 
              ? 'எங்கள் பிரத்யேக தொகுப்புகளில் இருந்து தேர்ந்தெடுக்கவும். இலவச ஆலோசனை கூட்டங்களின் போது உங்கள் தேவைக்கேற்ப மாற்றங்கள் செய்து கொள்ளலாம்.'
              : 'Choose from our highly specialized pre-set coverage collections. Custom adjustments are happily welcomed during our free design consultations.'}
          </p>
        </div>
      </section>

      {/* Grid of Packages */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {WEDDING_PACKAGES.map((pkg) => {
          const isA_Z = pkg.id === 'premium-az';
          const translatedBadge = isA_Z 
            ? (useTamil ? 'பிரத்தியேக A-Z பேரனுபவம்' : 'EXCLUSIVE A-Z EXPERIENCE')
            : (pkg.badge 
              ? (useTamil 
                ? (pkg.badge === 'POPULAR' ? 'பிரபலம்' : pkg.badge === 'EXCLUSIVE' ? 'பிரத்தியேக' : pkg.badge)
                : pkg.badge)
              : null);

          return (
            <div 
              key={pkg.id}
              className={`glass-card p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative group ${pkg.isPopular ? 'border-gold-500/50 bg-gold-500/[0.03] scale-[1.01]' : 'border-gold-600/10 hover:border-gold-500/30'} ${isA_Z ? 'border-2 border-gold-400 bg-gradient-to-br from-black to-charcoal-900 shadow-2xl col-span-1 md:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Badge */}
              {translatedBadge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 font-sans text-[10px] font-black tracking-widest uppercase ${isA_Z ? 'bg-gold-400 text-black' : 'bg-gold-500 text-black'}`}>
                  {translatedBadge}
                </span>
              )}

              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-black text-white group-hover:text-gold-400 transition-colors uppercase tracking-tight">
                    {pkg.name}
                  </h3>
                  <p className="font-sans text-xs text-gold-600 italic font-semibold">{pkg.tamilName}</p>
                  <div className="pt-2 flex items-baseline gap-1">
                    <span className="font-serif text-3xl font-black text-white gold-gradient-text">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </span>
                    <span className="font-sans text-xs text-gray-500">
                      {useTamil ? 'பிரீமியம் கட்டணம்' : 'Premium Rate'}
                    </span>
                  </div>
                </div>

                {/* Subtext info */}
                {pkg.includesText && (
                  <p className="font-sans text-[10px] font-black tracking-wider text-gold-400 uppercase bg-gold-400/5 py-1 px-3.5 rounded border border-gold-400/15 w-fit">
                    {pkg.includesText}
                  </p>
                )}

                {/* List features based on language toggle */}
                <ul className="space-y-3 pt-2">
                  {((useTamil && pkg.featuresTamil) ? pkg.featuresTamil : pkg.features).map((feat, fIdx) => {
                    const isExcluding = feat.toLowerCase().includes('note:') || feat.includes('குறிப்பு:');
                    return (
                      <li key={fIdx} className="flex items-start gap-2.5 text-sm">
                        {isExcluding ? (
                          <AlertCircle className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                        )}
                        <span className={`leading-snug ${isExcluding ? 'text-gray-500 italic text-xs' : 'text-gray-300 font-sans'}`}>
                          {feat}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-8 mt-auto">
                {/* WhatsApp Action */}
                <a 
                  href={`https://wa.me/919865091095?text=${encodeURIComponent(pkg.whatsappMessage)}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full text-center block font-sans text-xs font-bold uppercase tracking-wider py-4 bg-gold-400 text-black hover:bg-gold-500 rounded-xl transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-gold-500/10"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {useTamil ? 'வாட்ஸ்அப் மூலம் உடனடியாக பதிவு செய்க' : 'Book Instant via WhatsApp'}
                </a>
              </div>
            </div>
          );
        })}
      </section>

      {/* Trust reassurance banner */}
      <section className="glass-card p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-center justify-between border border-gold-500/15">
        <div className="space-y-1">
          <h4 className="font-serif text-xl font-bold text-white uppercase tracking-tight">
            {useTamil ? 'தனிப்பயன் தொகுப்பு வேண்டுமா?' : 'Need a completely Custom Package?'}
          </h4>
          <p className="font-sans text-xs text-gray-400">
            {useTamil 
              ? 'உங்கள் நிகழ்வின் காலம், இடம் மற்றும் வடிவமைப்பு விவரங்களை எங்களிடம் கூறுங்கள். உங்களது தேவைக்கேற்ப தனிப்பயனாக்குவோம்.'
              : 'Tell us about your event duration, venue, and design details. We happily accommodate bespoke parameters.'}
          </p>
        </div>
        <a 
          href={`https://wa.me/919865091095?text=${encodeURIComponent(
            useTamil
              ? 'வணக்கம் முத்து டிஜிட்டல்ஸ், நான் ஒரு தனிப்பயன் தொகுப்பை (Bespoke Package) வடிவமைக்க விரும்புகிறேன். விவரங்களை விவாதிக்க விரும்புகிறேன்.'
              : 'Hi Muthu Digitals, I would like to design a completely custom bespoke package for my event. Please connect with me.'
          )}`}
          target="_blank" 
          rel="noreferrer"
          className="gold-gradient-bg text-black hover:opacity-90 font-sans text-xs font-bold tracking-widest uppercase py-4 px-8 rounded-xl shrink-0 cursor-pointer text-center"
        >
          {useTamil ? 'எனது திட்டத்தை தனிப்பயனாக்கு' : 'Customize My Plan'}
        </a>
      </section>
    </div>
  );
}

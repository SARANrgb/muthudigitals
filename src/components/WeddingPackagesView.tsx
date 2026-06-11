import React, { useState } from 'react';
import { WEDDING_PACKAGES, WeddingPackage } from '../types';
import { CheckCircle, Info, Sparkles, AlertCircle, ShoppingBag, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WeddingPackagesViewProps {
  onSelectPackageForInquiry: (pkgName: string) => void;
}

export default function WeddingPackagesView({ onSelectPackageForInquiry }: WeddingPackagesViewProps) {
  const [useTamil, setUseTamil] = useState(false);

  return (
    <div id="wedding-packages-view" className="space-y-16 sm:space-y-24">
      {/* Page Header */}
      <section className="flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-gray-800 pb-8">
        <div className="space-y-2 text-center sm:text-left">
          <span className="font-sans text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">Wedding Photography & Film Assets</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-black text-white gold-gradient-text leading-tight">
            Lifetime Investment Packages
          </h2>
          <p className="font-sans text-sm text-gray-400 max-w-xl">
            Choose from our highly specialized pre-set coverage collections. Custom adjustments are happily welcomed during our free design consultations.
          </p>
        </div>

        {/* Translation Option switch */}
        <button 
          onClick={() => setUseTamil(!useTamil)}
          className="flex items-center gap-2 border border-gold-400/40 bg-gold-400/5 hover:bg-gold-400/10 hover:border-gold-300 transition-all text-gold-400 font-sans text-xs tracking-wider uppercase font-bold px-5 py-3 rounded-md cursor-pointer"
        >
          <Info className="w-4 h-4 text-gold-400" />
          {useTamil ? 'Read in English' : 'தமிழ் பதிப்பில் படிக்கவும்'}
        </button>
      </section>

      {/* Grid of Packages */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {WEDDING_PACKAGES.map((pkg) => {
          const isA_Z = pkg.id === 'premium-az';
          return (
            <div 
              key={pkg.id}
              className={`glass-card p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative group ${pkg.isPopular ? 'border-gold-500/50 bg-gold-500/[0.03] scale-[1.01]' : 'border-gold-600/10 hover:border-gold-500/30'} ${isA_Z ? 'border-2 border-gold-400 bg-gradient-to-br from-black to-charcoal-900 shadow-2xl col-span-1 md:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Badge */}
              {(pkg.badge || isA_Z) && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 font-sans text-[10px] font-black tracking-widest uppercase ${isA_Z ? 'bg-gold-400 text-black' : 'bg-gold-500 text-black'}`}>
                  {isA_Z ? 'EXCLUSIVE A-Z EXPERIENCE' : pkg.badge}
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
                    <span className="font-sans text-xs text-gray-500">Premium Rate</span>
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
                  {(useTamil && pkg.featuresTamil ? pkg.featuresTamil : pkg.features).map((feat, fIdx) => {
                    const isExcluding = feat.toLowerCase().includes('note:');
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
                  href={`https://wa.me/919994982633?text=${encodeURIComponent(pkg.whatsappMessage)}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full text-center block font-sans text-xs font-bold uppercase tracking-wider py-4 rounded-xl border border-gold-400/30 text-gold-400 hover:bg-gold-400/10 hover:border-gold-300 transition-all cursor-pointer"
                >
                  Book Instant via WhatsApp
                </a>

                {/* Local Inquiry Booking redirect */}
                <button 
                  onClick={() => onSelectPackageForInquiry(pkg.name)}
                  className="w-full flex items-center justify-center gap-2 font-sans text-xs font-bold tracking-widest uppercase py-4 rounded-xl bg-gold-400 text-black hover:bg-gold-300 transition-all active:scale-98 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Request Booking Inquiry
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* Trust reassurance banner */}
      <section className="glass-card p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-center justify-between border border-gold-500/15">
        <div className="space-y-1">
          <h4 className="font-serif text-xl font-bold text-white uppercase tracking-tight">Need a completely Custom Package?</h4>
          <p className="font-sans text-xs text-gray-400">
            Tell us about your event duration, venue, and design details. We happily accommodate bespoke parameters.
          </p>
        </div>
        <button 
          onClick={() => onSelectPackageForInquiry('Custom Bespoke Request')}
          className="gold-gradient-bg text-black hover:bg-gold-500 font-sans text-xs font-bold tracking-widest uppercase py-4 px-8 rounded-xl shrink-0 cursor-pointer"
        >
          Customize My Plan
        </button>
      </section>
    </div>
  );
}

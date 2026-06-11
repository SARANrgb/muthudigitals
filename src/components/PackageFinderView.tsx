import React, { useState, useEffect } from 'react';
import { WEDDING_PACKAGES, WeddingPackage } from '../types';
import { Check, CheckCircle, ChevronRight, Sliders, DollarSign, Send, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PackageFinderViewProps {
  onSelectPackageForInquiry: (pkgName: string) => void;
}

export default function PackageFinderView({ onSelectPackageForInquiry }: PackageFinderViewProps) {
  const [eventType, setEventType] = useState<'WEDDING' | 'ENGAGEMENT' | 'OUTDOOR' | 'RECEPTION'>('WEDDING');
  const [selectedServices, setSelectedServices] = useState<string[]>(['CANDID_PHOTO', 'ALBUM_DESIGN']);
  const [sliderVal, setSliderVal] = useState(135000); // Default slider mid-range

  const [matchedPackages, setMatchedPackages] = useState<WeddingPackage[]>([]);

  const serviceOptions = [
    { id: 'CANDID_PHOTO', label: 'CANDID PHOTO', desc: 'Emotional, candid close-ups of key ceremonies.' },
    { id: 'DRONE_VIDEO', label: 'DRONE VIDEO', desc: 'Aerial majestic cinematic drone captures.' },
    { id: 'ALBUM_DESIGN', label: 'ALBUM DESIGN', desc: 'Bespoke leather layflat photo album book.' },
    { id: 'LIVE_STREAM', label: 'LIVE STREAM', desc: 'Instant live stream video broadcast for remote guests.' },
  ];

  const handleToggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Find recommendations based on selections and budget slider
  useEffect(() => {
    // Filter packages which fall below or equal to the budget + 15,000 wiggle room
    let recommendations = WEDDING_PACKAGES.filter((pkg) => pkg.price <= sliderVal + 10000);

    // Sort by budget proximity (closer to their budget limit is better/gives more features)
    recommendations.sort((a, b) => b.price - a.price);

    // Limit to top 2 closest recommendations
    setMatchedPackages(recommendations.slice(0, 2));
  }, [eventType, selectedServices, sliderVal]);

  return (
    <div id="package-finder-view" className="space-y-16 sm:space-y-24">
      {/* Page intro headings */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-sans text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">Interactive Custom Matcher</span>
        <h2 className="font-serif text-4xl sm:text-5xl font-black text-white gold-gradient-text leading-tight animate-fade-in">
          Package Finder
        </h2>
        <p className="font-sans text-sm sm:text-base text-gray-400 leading-relaxed">
          Tailor your cinematic experience. Fine-tune your event desires, input your budget limitations, and instantly locate corresponding pre-set collections.
        </p>
      </section>

      {/* Two column interactive grid: Controls on left, Live recommendations on right */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Controls */}
        <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl border border-gold-600/15 space-y-8">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-4">
            <Sliders className="w-5 h-5 text-gold-400" />
            <h3 className="font-serif text-xl font-bold text-white">Preference Filters</h3>
          </div>

          {/* Step 1: Event Type */}
          <div className="space-y-3">
            <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">Event Type</label>
            <div className="flex flex-wrap gap-2">
              {(['WEDDING', 'ENGAGEMENT', 'OUTDOOR', 'RECEPTION'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setEventType(type)}
                  className={`px-4 py-2 text-xs font-bold font-sans rounded-full border transition-all cursor-pointer ${eventType === type ? 'bg-gold-500 border-gold-500 text-black' : 'border-gray-800 text-gray-400 hover:text-white bg-transparent'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Desired Services */}
          <div className="space-y-3">
            <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">Included Services</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {serviceOptions.map((opt) => {
                const isSelected = selectedServices.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleToggleService(opt.id)}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${isSelected ? 'bg-gold-400/10 border-gold-400/50' : 'bg-charcoal-950 border-gray-800 hover:border-gray-700'}`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${isSelected ? 'bg-gold-400 border-gold-400 text-black' : 'border-gray-600 text-transparent'}`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div className="space-y-0.5">
                      <p className={`font-sans text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                        {opt.label}
                      </p>
                      <p className="font-sans text-[9px] text-gray-500 leading-none">
                        {opt.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Budget Range */}
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-baseline">
              <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">Budget Limit</label>
              <span className="font-serif text-xl font-bold text-white">
                ₹{sliderVal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="space-y-2">
              <input 
                type="range"
                min="50000"
                max="250000"
                step="5000"
                value={sliderVal}
                onChange={(e) => setSliderVal(parseInt(e.target.value))}
                className="w-full accent-gold-400 h-1 bg-gray-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-sans text-gray-400 font-bold tracking-wider">
                <span>₹50,000</span>
                <span>₹2,50,000+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Recommendation list */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-baseline border-b border-gray-800 pb-4">
            <h3 className="font-serif text-2xl font-bold text-white">Matched Packages</h3>
            <span className="font-sans text-xs font-bold text-gray-500 tracking-widest uppercase bg-gray-800/40 px-2.5 py-0.5 rounded border border-gray-800">
              {matchedPackages.length} Matches Found
            </span>
          </div>

          {matchedPackages.length > 0 ? (
            <div className="space-y-6">
              {matchedPackages.map((rec, recIdx) => {
                const isFirst = recIdx === 0;
                return (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: recIdx * 0.1 }}
                    className={`glass-card overflow-hidden rounded-2xl border transition-all ${isFirst ? 'border-gold-500/45' : 'border-gray-800/80 bg-black/40'}`}
                  >
                    {/* Header */}
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          {isFirst && (
                            <span className="font-sans text-[9px] font-black tracking-widest text-gold-400 uppercase border border-gold-400 bg-gold-400/5 px-2.5 py-0.5 rounded mb-2.5 block w-fit">
                              Most Match Features
                            </span>
                          )}
                          <h4 className="font-serif text-2xl font-black text-white">{rec.name}</h4>
                          <h5 className="font-sans text-xs text-gold-600 font-medium mt-1">{rec.tamilName}</h5>
                        </div>
                        <div className="text-right">
                          <p className="font-serif text-2xl font-black text-white gold-gradient-text">
                            ₹{rec.price.toLocaleString('en-IN')}
                          </p>
                          <p className="font-sans text-[10px] text-gray-500 font-bold uppercase mt-1">Premium rate</p>
                        </div>
                      </div>

                      <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-xl">
                        This collection covers professional cameras, key backings, and premium digital layouts tailored beautifully for {eventType.toLowerCase()} events.
                      </p>

                      <div className="border-t border-gray-800/70 pt-4 space-y-2">
                        <p className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest">Included Assets Preview:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {rec.features.slice(0, 4).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-300">
                              <CheckCircle className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                              <span className="leading-tight font-sans text-gray-400">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Redirect actions */}
                      <div className="pt-4 flex flex-col sm:flex-row gap-3">
                        <a 
                          href={`https://wa.me/919994982633?text=Hi%20Muthu%20Digitals,%20I%20used%20your%20Package%20Finder%20for%20a%20${eventType}%20with%20budget%20limit%20₹${sliderVal},%20and%20got%20matched%20with%20${rec.name}.%20Please%20verify%20my%20slot!`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-center font-sans text-xs font-bold uppercase tracking-widest py-3 border border-gold-400/20 text-gold-400 bg-gold-400/5 rounded-lg hover:bg-gold-400/10 transition-all cursor-pointer"
                        >
                          Book via WhatsApp
                        </a>
                        <button
                          onClick={() => onSelectPackageForInquiry(`${rec.name} (Matched Finder)`)}
                          className="flex-1 font-sans text-xs font-bold uppercase tracking-widest py-3 bg-gold-400 text-black hover:bg-gold-500 rounded-lg transition-all active:scale-98 inline-flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Send Inquiry Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 space-y-4 glass-card rounded-2xl border border-gray-800">
              <span className="text-4xl">🔍</span>
              <h3 className="font-serif text-xl font-bold text-gold-400">No preset packages found below ₹{sliderVal.toLocaleString('en-IN')}</h3>
              <p className="font-sans text-sm text-gray-400 max-w-md mx-auto">
                Our base Package starts at ₹50,000. Try raising your budget limit slider slightly or click below to submit a custom quote request.
              </p>
              <button 
                onClick={() => onSelectPackageForInquiry('Custom Budget Quote Request')}
                className="gold-gradient-bg text-black py-3 px-6 rounded-lg font-sans text-xs font-bold uppercase tracking-wider cursor-pointer mt-4"
              >
                Send Bespoke Quote Request
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

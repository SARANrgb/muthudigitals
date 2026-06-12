import React, { useState } from 'react';
import { STUDIO_SERVICES, FUNCTION_SERVICES, PREMIUM_FRAMES_PRICES } from '../types';
import { Camera, Calendar, CheckCircle2, Ruler, HelpCircle, Sparkles, Receipt, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ServicesView() {
  const [selectedFrame, setSelectedFrame] = useState(PREMIUM_FRAMES_PRICES[0].size);
  const [frameQty, setFrameQty] = useState(1);
  const [isCustomEstimation, setIsCustomEstimation] = useState(false);
  const [customWidth, setCustomWidth] = useState(12);
  const [customHeight, setCustomHeight] = useState(10);
  const [customTexture, setCustomTexture] = useState('Classic Gold Rim');

  // Find price of the selected premium template frame
  const selectedFrameObj = PREMIUM_FRAMES_PRICES.find(f => f.size === selectedFrame);
  const standardPrice = selectedFrameObj ? selectedFrameObj.price : 0;

  // Estimation based on custom width & height
  // Ground rate: ₹6 per square inch for premium mounting, plus base ₹150 for backboards
  const calculateCustomPrice = () => {
    const area = customWidth * customHeight;
    const baseRate = area * 6.5;
    const finishPremium = customTexture === 'Classic Gold Rim' ? 150 : customTexture === 'Midnight Walnut' ? 220 : 100;
    return Math.ceil(baseRate + finishPremium);
  };

  const customEstimatePrice = calculateCustomPrice();
  const totalPrice = isCustomEstimation ? customEstimatePrice * frameQty : standardPrice * frameQty;

  return (
    <div id="services-view" className="space-y-16 sm:space-y-24">
      {/* Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-sans text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">Our Capabilities</span>
        <h2 className="font-serif text-4xl sm:text-5xl font-black text-white gold-gradient-text leading-tight">
          Services & Custom Frames
        </h2>
        <p className="font-sans text-sm sm:text-base text-gray-400 leading-relaxed">
          From high-resolution passport and alliance profile portfolio captures to grand housewarming frames, we deliver premium visual preservation.
        </p>
      </section>

      {/* Studio Photography Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-end border-b border-gray-800 pb-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
              <Camera className="text-gold-400 w-6 h-6" />
              Studio Photography
            </h3>
            <p className="font-sans text-xs text-gold-600 mt-1 italic font-medium">ஸ்டுடியோ புகைப்படம், உயர்தர செட்டிங்ஸ்</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STUDIO_SERVICES.map((serv) => (
            <div 
              key={serv.id} 
              className="glass-card p-6 rounded-2xl space-y-4 border border-gold-600/10 hover:border-gold-500/30 transition-all duration-300 group hover:translate-y-[-2px]"
            >
              <div className="flex justify-between items-start">
                <span className="font-sans text-xs text-gold-400 bg-gold-400/10 border border-gold-400/20 px-3 py-1 rounded-full uppercase tracking-widest font-semibold">
                  {serv.name}
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-lg font-bold text-gray-200">{serv.tamilName}</h4>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">{serv.description}</p>
                <p className="font-sans text-xs text-gray-500 italic leading-relaxed">{serv.descriptionTamil}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Function Coverage Grid Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-end border-b border-gray-800 pb-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
              <Calendar className="text-gold-400 w-6 h-6" />
              Function Coverage
            </h3>
            <p className="font-sans text-xs text-gold-600 mt-1 italic font-medium">விழா தொகுப்பு, அழகியல் புகைப்பட தருணங்கள்</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FUNCTION_SERVICES.map((func) => (
            <motion.div 
              key={func.id}
              whileHover={{ scale: 1.02 }}
              className="group relative h-64 overflow-hidden rounded-2xl border border-gray-800/40"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
              <img 
                alt={func.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transform duration-500 group-hover:scale-105" 
                src={func.image}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 space-y-1">
                <h4 className="font-serif text-xl font-bold text-white group-hover:text-gold-400 duration-300">
                  {func.name}
                </h4>
                <p className="font-sans text-xs text-gold-500 font-semibold italic">
                  {func.tamilName}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Premium Frames List + Frame Custom Pricing Calculator Bento */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Frame Table Section */}
        <div className="lg:col-span-6 space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h3 className="font-serif text-2xl font-bold text-white">Premium Frames</h3>
            <p className="font-sans text-xs text-gold-600 italic font-medium mt-1">முறையான மற்றும் தனிப்பயன் அளவிலான ஃபிரேம்கள்</p>
          </div>

          <p className="font-sans text-xs text-gray-400">
            Handcrafted with solid moisture-proof wood backings, high-clarity optical glass sheets, and signature gold/charcoal rim coatings to preserve prints for decades.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-2">
            {PREMIUM_FRAMES_PRICES.map((fPrice) => (
              <div 
                key={fPrice.size}
                onClick={() => {
                  setSelectedFrame(fPrice.size);
                  setIsCustomEstimation(false);
                }}
                className={`p-4 rounded-xl flex justify-between items-center cursor-pointer border transition-all ${selectedFrame === fPrice.size && !isCustomEstimation ? 'bg-gold-400/10 border-gold-400/60' : 'bg-charcoal-900/60 border-gray-800 hover:border-gray-700'}`}
              >
                <div className="space-y-1">
                  <p className="font-sans text-sm font-semibold text-white">{fPrice.size}</p>
                  <p className="font-sans text-[10px] text-gray-500">Premium Wood Mounting</p>
                </div>
                <span className="font-serif font-bold text-gold-400 text-base">
                  ₹{fPrice.price.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-gold-600/20 bg-gold-400/5 space-y-2">
            <p className="font-sans text-xs text-gray-300 leading-relaxed">
              <span className="text-gold-400 font-bold">Special Note:</span> We provide custom-size framing based entirely on customer requirements and architectural niches.
            </p>
            <p className="font-sans text-xs text-gray-400 italic">
              <span className="text-gold-400 font-bold">குறிப்பு:</span> வாடிக்கையாளர்களின் தேவைக்கேற்ப தனிப்பயன் அளவிலான உயர்தர ஃபிரேம்களும் சிறப்பாக செய்து தரப்படும்.
            </p>
          </div>
        </div>

        {/* Framing Price Calculator Section */}
        <div className="lg:col-span-6 glass-card p-6 sm:p-8 rounded-3xl border border-gold-600/15 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-2">
            <span className="font-sans text-[10px] font-bold text-gold-400 bg-gold-400/10 border border-gold-400/20 px-3 py-1 rounded-full uppercase tracking-widest w-fit block">
              Dynamic Calculator
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">Frame Price Estimator</h3>
            <p className="font-sans text-xs text-gray-400">
              Select one of our templates or enter a custom size to estimate high-clarity framing costs with materials.
            </p>
          </div>

          {/* Calculator toggle tabs */}
          <div className="flex gap-2 p-1 bg-charcoal-950 rounded-lg">
            <button
              onClick={() => setIsCustomEstimation(false)}
              className={`flex-1 font-sans text-xs font-bold py-2 px-3 rounded-md transition-all ${!isCustomEstimation ? 'bg-gold-400 text-black' : 'text-gray-400 hover:text-white bg-transparent'}`}
            >
              Standard Size Template
            </button>
            <button
              onClick={() => setIsCustomEstimation(true)}
              className={`flex-1 font-sans text-xs font-bold py-2 px-3 rounded-md transition-all ${isCustomEstimation ? 'bg-gold-400 text-black' : 'text-gray-400 hover:text-white bg-transparent'}`}
            >
              Custom Inches Size
            </button>
          </div>

          <div className="space-y-4">
            {!isCustomEstimation ? (
              <div className="space-y-2">
                <label className="font-sans text-xs font-semibold text-gold-400 uppercase tracking-wider block">Standard Templates Selected</label>
                <select 
                  value={selectedFrame}
                  onChange={(e) => setSelectedFrame(e.target.value)}
                  className="w-full bg-charcoal-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-gold-500"
                >
                  {PREMIUM_FRAMES_PRICES.map((f) => (
                    <option key={f.size} value={f.size} className="bg-charcoal-950 text-gray-200">
                      {f.size} (₹{f.price.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-sans text-xs font-semibold text-gold-400 uppercase tracking-wider block">Width (Inches)</label>
                    <input 
                      type="number"
                      min="4"
                      max="100"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(Math.max(4, parseInt(e.target.value) || 4))}
                      className="w-full bg-charcoal-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-sans text-xs font-semibold text-gold-400 uppercase tracking-wider block">Height (Inches)</label>
                    <input 
                      type="number"
                      min="4"
                      max="100"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(Math.max(4, parseInt(e.target.value) || 4))}
                      className="w-full bg-charcoal-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-sans text-xs font-semibold text-gold-400 uppercase tracking-wider block">Wood Frame Texture Profile</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Classic Gold Rim', 'Midnight Walnut', 'Charcoal Matte'].map((txt) => (
                      <button
                        key={txt}
                        onClick={() => setCustomTexture(txt)}
                        className={`py-2 px-3 rounded-lg font-sans text-xs font-semibold border transition-all ${customTexture === txt ? 'border-gold-500 bg-gold-400/10 text-gold-400' : 'border-gray-800 text-gray-400 hover:text-white bg-transparent'}`}
                      >
                        {txt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="font-sans text-xs font-semibold text-gold-400 uppercase tracking-wider block">Frame Quantity</label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setFrameQty(Math.max(1, frameQty - 1))}
                  className="w-10 h-10 rounded-lg bg-charcoal-950 border border-gray-800 text-white flex items-center justify-center font-serif text-lg hover:border-gray-600"
                >
                  -
                </button>
                <span className="font-sans text-sm font-semibold text-white w-12 text-center bg-charcoal-950 border border-gray-800 py-2 rounded-lg">{frameQty}</span>
                <button 
                  onClick={() => setFrameQty(frameQty + 1)}
                  className="w-10 h-10 rounded-lg bg-charcoal-950 border border-gray-800 text-white flex items-center justify-center font-serif text-lg hover:border-gray-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-800 flex justify-between items-center">
            <div>
              <p className="font-sans text-xs text-gray-500">Estimated Project Quote</p>
              <p className="font-serif text-3xl font-black text-white gold-gradient-text mt-1">
                ₹{totalPrice.toLocaleString('en-IN')}
              </p>
            </div>
            <a 
              href={`https://wa.me/919865091095?text=Hi%20Muthu%20Digitals,%20I%20used%20your%20Service%20Frame%20Estimator%20and%20want%20to%20order%20${frameQty}x%20${isCustomEstimation ? `Custom%20Frame%20${customWidth}x${customHeight}%22` : selectedFrameObj?.size}%20(${customTexture}).%20The%20estimated%20cost%20is%20₹${totalPrice}.%20Please%20confirm.`}
              target="_blank"
              rel="noreferrer"
              className="gold-gradient-bg hover:opacity-90 text-black py-3 px-6 rounded-lg font-sans text-xs font-bold uppercase tracking-widest cursor-pointer inline-flex items-center gap-1"
            >
              Order on WhatsApp
              <ChevronRight className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { WEDDING_PACKAGES, WeddingPackage, ALBUM_PACKAGES, AlbumPackage, PREMIUM_FRAMES_PRICES, FramePrice } from '../types';
import { Check, CheckCircle, ChevronRight, Sliders, Send, Camera, Layers, Image, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductFinderViewProps {
  useTamil: boolean;
}

// Frame Category Classification Helper
const getFrameCategory = (size: string): 'SMALL' | 'MEDIUM' | 'LARGE' => {
  const matches = size.match(/\d+/g);
  if (!matches) return 'SMALL';
  const dims = matches.map(Number);
  const maxDim = Math.max(...dims);
  if (maxDim <= 12) return 'SMALL';
  if (maxDim <= 20) return 'MEDIUM';
  return 'LARGE';
};

// Formatted Frame Size for UI
const formatFrameSize = (sizeStr: string, useTamil: boolean) => {
  const size = sizeStr.replace(' Frame', '');
  if (useTamil) {
    return `${size} மரச்சட்டம்`;
  }
  return `${size} Frame`;
};

// Frame details lists
const FRAME_FEATURES_EN = [
  'Moisture-proof solid wood frame',
  'Premium reflection-resistant glass',
  'Handcrafted border profile design',
  'Long-lasting multi-generational durability'
];

const FRAME_FEATURES_TA = [
  'ஈரப்பதம் புகாத உறுதியான மரச்சட்டம்',
  'உயர்தர பிரதிபலிப்புத் தடுப்பு கண்ணாடி',
  'கைவினை முறையில் வடிவமைக்கப்பட்ட பார்டர்',
  'தலைமுறைகள் கடந்து நிலைத்து நிற்கும் தரம்'
];

export default function ProductFinderView({ useTamil }: ProductFinderViewProps) {
  const [productCategory, setProductCategory] = useState<'PACKAGES' | 'ALBUMS' | 'FRAMES'>('PACKAGES');
  
  // Category-specific filters
  const [eventType, setEventType] = useState<'WEDDING' | 'ENGAGEMENT' | 'OUTDOOR' | 'RECEPTION'>('WEDDING');
  const [selectedServices, setSelectedServices] = useState<string[]>(['CANDID_PHOTO', 'ALBUM_DESIGN']);
  const [albumFormat, setAlbumFormat] = useState<'LAYFLAT' | 'BOOK_TYPE'>('LAYFLAT');
  const [frameSizeCategory, setFrameSizeCategory] = useState<'ALL' | 'SMALL' | 'MEDIUM' | 'LARGE'>('ALL');
  
  // Slider Value
  const [sliderVal, setSliderVal] = useState(135000);

  // Recommendations lists
  const [matchedPackages, setMatchedPackages] = useState<WeddingPackage[]>([]);
  const [matchedAlbums, setMatchedAlbums] = useState<AlbumPackage[]>([]);
  const [matchedFrames, setMatchedFrames] = useState<FramePrice[]>([]);

  // Configure budget bounds based on category selection
  const rangeConfig = {
    PACKAGES: { min: 50000, max: 250000, step: 5000, default: 135000 },
    ALBUMS: { min: 7000, max: 20000, step: 500, default: 12000 },
    FRAMES: { min: 200, max: 5000, step: 50, default: 1500 }
  }[productCategory];

  // Reset sliderVal safely when changing category
  useEffect(() => {
    setSliderVal(rangeConfig.default);
  }, [productCategory]);

  const serviceOptions = [
    { id: 'CANDID_PHOTO', label: useTamil ? 'கேண்டிட் போட்டோ' : 'CANDID PHOTO', desc: useTamil ? 'முக்கிய சடங்குகளின் உணர்ச்சிகரமான நெருக்கமான புகைப்படங்கள்.' : 'Emotional, candid close-ups of key ceremonies.' },
    { id: 'DRONE_VIDEO', label: useTamil ? 'ட்ரோன் வீடியோ' : 'DRONE VIDEO', desc: useTamil ? 'பிரமாண்ட வான்வழி சினிமா காட்சிகள்.' : 'Aerial majestic cinematic drone captures.' },
    { id: 'ALBUM_DESIGN', label: useTamil ? 'ஆல்பம் வடிவமைப்பு' : 'ALBUM DESIGN', desc: useTamil ? 'பிரத்தியேக லெதர் ஆல்பம் புத்தகம்.' : 'Bespoke leather layflat photo album book.' },
    { id: 'LIVE_STREAM', label: useTamil ? 'லைவ் ஸ்ட்ரீம்' : 'LIVE STREAM', desc: useTamil ? 'தொலைதூர விருந்தினர்களுக்கான நேரடி ஒளிபரப்பு.' : 'Instant live stream video broadcast for remote guests.' },
  ];

  const eventTypeLabels = {
    WEDDING: useTamil ? 'திருமணம்' : 'WEDDING',
    ENGAGEMENT: useTamil ? 'நிச்சயதார்த்தம்' : 'ENGAGEMENT',
    OUTDOOR: useTamil ? 'அவுட்டோர்' : 'OUTDOOR',
    RECEPTION: useTamil ? 'வரவேற்பு' : 'RECEPTION'
  };

  const handleToggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Recommendations finder engine
  useEffect(() => {
    // Current value capped within active category range constraints to avoid off-tick rendering glitches
    const currentVal = Math.min(Math.max(sliderVal, rangeConfig.min), rangeConfig.max);

    if (productCategory === 'PACKAGES') {
      // Wiggle room of +10,000 budget allowance
      let recommendations = WEDDING_PACKAGES.filter((pkg) => pkg.price <= currentVal + 10000);
      recommendations.sort((a, b) => b.price - a.price);
      setMatchedPackages(recommendations.slice(0, 2));
      setMatchedAlbums([]);
      setMatchedFrames([]);
    } else if (productCategory === 'ALBUMS') {
      const isBook = albumFormat === 'BOOK_TYPE';
      let recommendations = ALBUM_PACKAGES.filter((album) => {
        const cost = album.baseRate + (isBook ? 500 : 0);
        return cost <= currentVal;
      });
      recommendations.sort((a, b) => {
        const costA = a.baseRate + (isBook ? 500 : 0);
        const costB = b.baseRate + (isBook ? 500 : 0);
        return costB - costA;
      });
      setMatchedAlbums(recommendations);
      setMatchedPackages([]);
      setMatchedFrames([]);
    } else if (productCategory === 'FRAMES') {
      let recommendations = PREMIUM_FRAMES_PRICES.filter((frame) => {
        const matchesCategory = frameSizeCategory === 'ALL' || getFrameCategory(frame.size) === frameSizeCategory;
        const fitsBudget = frame.price <= currentVal;
        return matchesCategory && fitsBudget;
      });
      recommendations.sort((a, b) => b.price - a.price);
      // Show top 3 matches for frames
      setMatchedFrames(recommendations.slice(0, 3));
      setMatchedPackages([]);
      setMatchedAlbums([]);
    }
  }, [productCategory, eventType, selectedServices, albumFormat, frameSizeCategory, sliderVal, rangeConfig]);

  const activeSliderVal = Math.min(Math.max(sliderVal, rangeConfig.min), rangeConfig.max);

  return (
    <div id="package-finder-view" className="space-y-16 sm:space-y-24">
      {/* Page intro headings */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-sans text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">
          {useTamil ? 'ஊடாடும் தனிப்பயன் பொருத்த கருவி' : 'Interactive Custom Matcher'}
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-black text-white gold-gradient-text leading-tight animate-fade-in">
          {useTamil ? 'தயாரிப்பு கண்டறிவி' : 'Product Finder'}
        </h2>
        <p className="font-sans text-sm sm:text-base text-gray-400 leading-relaxed">
          {useTamil 
            ? 'உங்களது பட்ஜெட் மற்றும் தேவைகளுக்கு ஏற்ற புகைப்பட சேவைகள், பிரீமியம் ஆல்பங்கள் மற்றும் மரச்சட்டங்களை உடனடியாகக் கண்டறியவும்.'
            : 'Tailor your legacy items. Fine-tune your preferences, input your budget limitations, and instantly locate matching pre-set packages, premium albums, or wooden frames.'}
        </p>
      </section>

      {/* Two column interactive grid: Controls on left, Live recommendations on right */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Controls */}
        <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl border border-gold-600/15 space-y-8">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-4">
            <Sliders className="w-5 h-5 text-gold-400" />
            <h3 className="font-serif text-xl font-bold text-white">
              {useTamil ? 'விருப்ப வடிகட்டிகள்' : 'Preference Filters'}
            </h3>
          </div>

          {/* Step 1: Category Selection */}
          <div className="space-y-3">
            <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">
              {useTamil ? 'படி 1: தயாரிப்பு வகை' : 'Step 1: Product Category'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setProductCategory('PACKAGES')}
                className={`py-3 px-1 rounded-xl border flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${productCategory === 'PACKAGES' ? 'bg-gold-500/10 border-gold-400 text-gold-400' : 'bg-charcoal-950 border-gray-800 text-gray-400 hover:text-white'}`}
              >
                <Camera className="w-4 h-4" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-center">
                  {useTamil ? 'திட்டங்கள்' : 'Packages'}
                </span>
              </button>
              <button
                onClick={() => setProductCategory('ALBUMS')}
                className={`py-3 px-1 rounded-xl border flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${productCategory === 'ALBUMS' ? 'bg-gold-500/10 border-gold-400 text-gold-400' : 'bg-charcoal-950 border-gray-800 text-gray-400 hover:text-white'}`}
              >
                <Layers className="w-4 h-4" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-center">
                  {useTamil ? 'ஆல்பங்கள்' : 'Albums'}
                </span>
              </button>
              <button
                onClick={() => setProductCategory('FRAMES')}
                className={`py-3 px-1 rounded-xl border flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${productCategory === 'FRAMES' ? 'bg-gold-500/10 border-gold-400 text-gold-400' : 'bg-charcoal-950 border-gray-800 text-gray-400 hover:text-white'}`}
              >
                <Image className="w-4 h-4" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-center">
                  {useTamil ? 'பிரேம்கள்' : 'Frames'}
                </span>
              </button>
            </div>
          </div>

          {/* Step 2: Category Specific Filter Options */}
          {productCategory === 'PACKAGES' && (
            <>
              {/* Event Type */}
              <div className="space-y-3">
                <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">
                  {useTamil ? 'படி 2: நிகழ்வு வகை' : 'Step 2: Event Type'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['WEDDING', 'ENGAGEMENT', 'OUTDOOR', 'RECEPTION'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setEventType(type)}
                      className={`px-4 py-2 text-xs font-bold font-sans rounded-full border transition-all cursor-pointer ${eventType === type ? 'bg-gold-500 border-gold-500 text-black' : 'border-gray-800 text-gray-400 hover:text-white bg-transparent'}`}
                    >
                      {eventTypeLabels[type]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desired Services */}
              <div className="space-y-3">
                <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">
                  {useTamil ? 'உள்ளடக்கிய சேவைகள்' : 'Included Services'}
                </label>
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
            </>
          )}

          {productCategory === 'ALBUMS' && (
            <div className="space-y-3">
              <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">
                {useTamil ? 'படி 2: ஆல்பம் வடிவமைப்பு' : 'Step 2: Album Format'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setAlbumFormat('LAYFLAT')}
                  className={`py-3.5 px-4 rounded-xl border font-sans text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${albumFormat === 'LAYFLAT' ? 'bg-gold-500/10 border-gold-400 text-gold-400' : 'bg-charcoal-950 border-gray-800 text-gray-400 hover:text-white'}`}
                >
                  {useTamil ? 'லேபிளாட்' : 'Layflat'}
                </button>
                <button
                  onClick={() => setAlbumFormat('BOOK_TYPE')}
                  className={`py-3.5 px-4 rounded-xl border font-sans text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${albumFormat === 'BOOK_TYPE' ? 'bg-gold-500/10 border-gold-400 text-gold-400' : 'bg-charcoal-950 border-gray-800 text-gray-400 hover:text-white'}`}
                >
                  {useTamil ? 'புக்-டைப் (+₹500)' : 'Book-Type (+₹500)'}
                </button>
              </div>
              <p className="text-[10px] font-sans text-gray-500 leading-relaxed mt-1">
                {useTamil
                  ? 'புக்-டைப் ஆல்பம் அச்சிடும் வடிவமைப்பு மற்றும் கவர்களுக்கு கூடுதல் ₹500 பிரீமியம் வசூலிக்கப்படும்.'
                  : 'Book-Type albums incur a ₹500 extra layout design surcharge for hardbound binding covers.'}
              </p>
            </div>
          )}

          {productCategory === 'FRAMES' && (
            <div className="space-y-3">
              <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">
                {useTamil ? 'படி 2: ஃபிரேம் அளவு' : 'Step 2: Frame Size Category'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['ALL', 'SMALL', 'MEDIUM', 'LARGE'] as const).map((cat) => {
                  const label = {
                    ALL: useTamil ? 'அனைத்து அளவுகள்' : 'All Sizes',
                    SMALL: useTamil ? 'சிறிய (12" வரை)' : 'Small (Up to 12")',
                    MEDIUM: useTamil ? 'நடுத்தர (12" - 20")' : 'Medium (12" - 20")',
                    LARGE: useTamil ? 'பெரிய (20" மேல்)' : 'Large (Above 20")'
                  }[cat];

                  return (
                    <button
                      key={cat}
                      onClick={() => setFrameSizeCategory(cat)}
                      className={`py-3 px-2 rounded-xl border font-sans text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${frameSizeCategory === cat ? 'bg-gold-500/10 border-gold-400 text-gold-400' : 'bg-charcoal-950 border-gray-800 text-gray-400 hover:text-white'}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Budget Range Slider */}
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-baseline">
              <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">
                {useTamil ? 'படி 3: பட்ஜெட் வரம்பு' : 'Step 3: Budget Limit'}
              </label>
              <span className="font-serif text-xl font-bold text-white">
                ₹{activeSliderVal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="space-y-2">
              <input 
                key={productCategory}
                type="range"
                min={rangeConfig.min}
                max={rangeConfig.max}
                step={rangeConfig.step}
                value={activeSliderVal}
                onChange={(e) => setSliderVal(parseInt(e.target.value))}
                className="w-full accent-gold-400 h-1 bg-gray-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-sans text-gray-400 font-bold tracking-wider">
                <span>₹{rangeConfig.min.toLocaleString('en-IN')}</span>
                <span>₹{rangeConfig.max.toLocaleString('en-IN')}{productCategory === 'PACKAGES' ? '+' : ''}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Recommendation list */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-baseline border-b border-gray-800 pb-4">
            <h3 className="font-serif text-2xl font-bold text-white">
              {useTamil ? 'பொருந்தக்கூடிய தயாரிப்புகள்' : 'Matched Products'}
            </h3>
            <span className="font-sans text-xs font-bold text-gray-500 tracking-widest uppercase bg-gray-800/40 px-2.5 py-0.5 rounded border border-gray-800">
              {productCategory === 'PACKAGES' && (useTamil ? `${matchedPackages.length} பொருத்தங்கள்` : `${matchedPackages.length} Matches Found`)}
              {productCategory === 'ALBUMS' && (useTamil ? `${matchedAlbums.length} பொருத்தங்கள்` : `${matchedAlbums.length} Matches Found`)}
              {productCategory === 'FRAMES' && (useTamil ? `${matchedFrames.length} பொருத்தங்கள்` : `${matchedFrames.length} Matches Found`)}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {productCategory === 'PACKAGES' && (
              <motion.div
                key="packages-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {matchedPackages.length > 0 ? (
                  matchedPackages.map((rec, recIdx) => {
                    const isFirst = recIdx === 0;
                    const whatsappMatchMsg = useTamil
                      ? `வணக்கம் முத்து டிஜிட்டல்ஸ், நான் உங்கள் தயாரிப்பு கண்டறிவி பக்கத்தைப் பயன்படுத்தி (${eventTypeLabels[eventType]} நிகழ்விற்காக, பட்ஜெட் ₹${activeSliderVal}) எனக்குப் பொருந்திய தொகுப்பைத் தேர்வு செய்கிறேன்: ${rec.name}. முன்பதிவு விவரங்களைத் தரவும்!`
                      : `Hi Muthu Digitals, I used your Product Finder for a ${eventType} event (budget: ₹${activeSliderVal}) and got matched with ${rec.name}. Please confirm my slot!`;

                    return (
                      <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: recIdx * 0.05 }}
                        className={`glass-card overflow-hidden rounded-2xl border transition-all ${isFirst ? 'border-gold-500/45 shadow-lg shadow-gold-500/[0.03]' : 'border-gray-800/80 bg-black/40'}`}
                      >
                        <div className="p-6 sm:p-8 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              {isFirst && (
                                <span className="font-sans text-[9px] font-black tracking-widest text-gold-400 uppercase border border-gold-400 bg-gold-400/5 px-2.5 py-0.5 rounded mb-2.5 block w-fit">
                                  {useTamil ? 'சிறந்த தேர்வு' : 'Most Match Features'}
                                </span>
                              )}
                              <h4 className="font-serif text-2xl font-black text-white">{rec.name}</h4>
                              <h5 className="font-sans text-xs text-gold-600 font-medium mt-1">{rec.tamilName}</h5>
                            </div>
                            <div className="text-right">
                              <p className="font-serif text-2xl font-black text-white gold-gradient-text">
                                ₹{rec.price.toLocaleString('en-IN')}
                              </p>
                              <p className="font-sans text-[10px] text-gray-500 font-bold uppercase mt-1">
                                {useTamil ? 'பிரீமியம் கட்டணம்' : 'Premium rate'}
                              </p>
                            </div>
                          </div>

                          <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-xl">
                            {useTamil 
                              ? `இந்த தொகுப்பு உங்களின் ${eventTypeLabels[eventType]} நிகழ்விற்கான கேமராக்கள் மற்றும் பிரீமியம் லேஅவுட்களை உள்ளடக்கியது.`
                              : `This collection covers professional cameras, key backings, and premium digital layouts tailored beautifully for ${eventType.toLowerCase()} events.`}
                          </p>

                          <div className="border-t border-gray-800/70 pt-4 space-y-2">
                            <p className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest">
                              {useTamil ? 'உள்ளடங்கிய அம்சங்கள் முற்காட்சி:' : 'Included Assets Preview:'}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {((useTamil && rec.featuresTamil) ? rec.featuresTamil : rec.features).slice(0, 4).map((feat, fIdx) => (
                                <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-300">
                                  <CheckCircle className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                                  <span className="leading-tight font-sans text-gray-400">{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Redirect actions */}
                          <div className="pt-4">
                            <a 
                              href={`https://wa.me/919865091095?text=${encodeURIComponent(whatsappMatchMsg)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full text-center font-sans text-xs font-bold uppercase tracking-widest py-3.5 bg-gold-400 text-black hover:bg-gold-500 rounded-lg transition-all active:scale-98 inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-lg hover:shadow-gold-500/10 text-center block"
                            >
                              <MessageSquare className="w-4 h-4" />
                              {useTamil ? 'வாட்ஸ்அப் மூலம் கேட்கவும்' : 'Inquire via WhatsApp'}
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <NoProductFound categoryName={useTamil ? 'தொகுப்புகள்' : 'packages'} sliderVal={activeSliderVal} useTamil={useTamil} />
                )}
              </motion.div>
            )}

            {productCategory === 'ALBUMS' && (
              <motion.div
                key="albums-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {matchedAlbums.length > 0 ? (
                  matchedAlbums.map((rec, recIdx) => {
                    const isFirst = recIdx === 0;
                    const formatName = albumFormat === 'BOOK_TYPE' ? 'Book-Type' : 'Layflat';
                    const formatNameTamil = albumFormat === 'BOOK_TYPE' ? 'புக்-டைப்' : 'லேபிளாட்';
                    const currentRate = rec.baseRate + (albumFormat === 'BOOK_TYPE' ? 500 : 0);
                    const whatsappMatchMsg = useTamil
                      ? `வணக்கம் முத்து டிஜிட்டல்ஸ், நான் உங்கள் தயாரிப்பு கண்டறிவி பக்கத்தைப் பயன்படுத்தி எனக்குப் பொருந்திய ஆல்பத்தைத் தேர்வு செய்கிறேன்: ${rec.nameTamil} (${formatNameTamil}, விலை: ₹${currentRate}). முன்பதிவு விவரங்களைத் தரவும்!`
                      : `Hi Muthu Digitals, I used your Product Finder for Albums and got matched with: ${rec.name} (${formatName}, Price: ₹${currentRate}). Please provide booking details!`;

                    return (
                      <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: recIdx * 0.05 }}
                        className={`glass-card overflow-hidden rounded-2xl border transition-all ${isFirst ? 'border-gold-500/45 shadow-lg shadow-gold-500/[0.03]' : 'border-gray-800/80 bg-black/40'}`}
                      >
                        <div className="p-6 sm:p-8 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              {isFirst && (
                                <span className="font-sans text-[9px] font-black tracking-widest text-gold-400 uppercase border border-gold-400 bg-gold-400/5 px-2.5 py-0.5 rounded mb-2.5 block w-fit">
                                  {useTamil ? 'சிறந்த தேர்வு' : 'Premium Fit'}
                                </span>
                              )}
                              <h4 className="font-serif text-2xl font-black text-white">{rec.name}</h4>
                              <h5 className="font-sans text-xs text-gold-600 font-medium mt-1">{rec.nameTamil}</h5>
                            </div>
                            <div className="text-right">
                              <p className="font-serif text-2xl font-black text-white gold-gradient-text">
                                ₹{currentRate.toLocaleString('en-IN')}
                              </p>
                              <p className="font-sans text-[10px] text-gray-500 font-bold uppercase mt-1">
                                {useTamil ? 'மதிப்பீடு கட்டணம்' : 'Estimated cost'}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <span className="font-sans text-[9px] font-bold tracking-wider text-white bg-gold-500/20 border border-gold-500/40 px-2 py-0.5 rounded uppercase">
                              {useTamil ? `வடிவம்: ${formatNameTamil}` : `Format: ${formatName}`}
                            </span>
                          </div>

                          <div className="border-t border-gray-800/70 pt-4 space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex justify-between items-center text-xs font-sans">
                                <span className="text-gray-400 font-medium">{useTamil ? 'அதிகபட்ச புகைப்படங்கள்' : 'MAX Photos'}</span>
                                <span className="text-white font-bold font-mono">{rec.maxPhotos}</span>
                              </div>
                              <div className="flex justify-between items-center text-xs font-sans">
                                <span className="text-gray-400 font-medium">{useTamil ? 'ரோல் எண்ணிக்கை' : 'Roll Count'}</span>
                                <span className="text-white font-bold font-mono">{rec.rollCount} Rolls</span>
                              </div>
                            </div>
                            <p className="font-sans text-[11px] text-gray-400 italic bg-charcoal-950/40 p-3 rounded-xl border border-gray-900 leading-relaxed">
                              <strong className="text-gold-400 font-bold not-italic uppercase tracking-widest text-[9px] block mb-1">
                                {useTamil ? 'கூடுதல் விவரங்கள்' : 'EXTRAS / TERMS'}
                              </strong>
                              {useTamil ? rec.extrasTamil : rec.extras}
                            </p>
                          </div>

                          {/* Redirect actions */}
                          <div className="pt-4">
                            <a 
                              href={`https://wa.me/919865091095?text=${encodeURIComponent(whatsappMatchMsg)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full text-center font-sans text-xs font-bold uppercase tracking-widest py-3.5 bg-gold-400 text-black hover:bg-gold-500 rounded-lg transition-all active:scale-98 inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-lg hover:shadow-gold-500/10 text-center block"
                            >
                              <MessageSquare className="w-4 h-4" />
                              {useTamil ? 'வாட்ஸ்அப் மூலம் கேட்கவும்' : 'Inquire via WhatsApp'}
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <NoProductFound categoryName={useTamil ? 'ஆல்பங்கள்' : 'albums'} sliderVal={activeSliderVal} useTamil={useTamil} />
                )}
              </motion.div>
            )}

            {productCategory === 'FRAMES' && (
              <motion.div
                key="frames-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {matchedFrames.length > 0 ? (
                  matchedFrames.map((rec, recIdx) => {
                    const isFirst = recIdx === 0;
                    const formattedSize = formatFrameSize(rec.size, false);
                    const formattedSizeTamil = formatFrameSize(rec.size, true);
                    const whatsappMatchMsg = useTamil
                      ? `வணக்கம் முத்து டிஜிட்டல்ஸ், நான் உங்கள் தயாரிப்பு கண்டறிவி பக்கத்தைப் பயன்படுத்தி எனக்குப் பொருந்திய மரச்சட்டத்தைத் தேர்வு செய்கிறேன்: ${formattedSizeTamil} (விலை: ₹${rec.price}). முன்பதிவு விவரங்களைத் தரவும்!`
                      : `Hi Muthu Digitals, I used your Product Finder for Wooden Frames and got matched with: ${formattedSize} (Price: ₹${rec.price}). Please provide booking details!`;

                    return (
                      <motion.div
                        key={rec.size}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: recIdx * 0.05 }}
                        className={`glass-card overflow-hidden rounded-2xl border transition-all ${isFirst ? 'border-gold-500/45 shadow-lg shadow-gold-500/[0.03]' : 'border-gray-800/80 bg-black/40'}`}
                      >
                        <div className="p-6 sm:p-8 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              {isFirst && (
                                <span className="font-sans text-[9px] font-black tracking-widest text-gold-400 uppercase border border-gold-400 bg-gold-400/5 px-2.5 py-0.5 rounded mb-2.5 block w-fit">
                                  {useTamil ? 'சிறந்த தேர்வு' : 'Premium Frame Fit'}
                                </span>
                              )}
                              <h4 className="font-serif text-2xl font-black text-white">{formattedSize}</h4>
                              <h5 className="font-sans text-xs text-gold-600 font-medium mt-1">{formattedSizeTamil}</h5>
                            </div>
                            <div className="text-right">
                              <p className="font-serif text-2xl font-black text-white gold-gradient-text">
                                ₹{rec.price.toLocaleString('en-IN')}
                              </p>
                              <p className="font-sans text-[10px] text-gray-500 font-bold uppercase mt-1">
                                {useTamil ? 'ஃபிரேம் விலை' : 'Frame price'}
                              </p>
                            </div>
                          </div>

                          <div className="border-t border-gray-800/70 pt-4 space-y-2">
                            <p className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest">
                              {useTamil ? 'அம்சங்கள் மற்றும் வடிவமைப்பு:' : 'Features & Custom Profiles:'}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {(useTamil ? FRAME_FEATURES_TA : FRAME_FEATURES_EN).map((feat, fIdx) => (
                                <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-300">
                                  <CheckCircle className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                                  <span className="leading-tight font-sans text-gray-400">{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Redirect actions */}
                          <div className="pt-4">
                            <a 
                              href={`https://wa.me/919865091095?text=${encodeURIComponent(whatsappMatchMsg)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full text-center font-sans text-xs font-bold uppercase tracking-widest py-3.5 bg-gold-400 text-black hover:bg-gold-500 rounded-lg transition-all active:scale-98 inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-lg hover:shadow-gold-500/10 text-center block"
                            >
                              <MessageSquare className="w-4 h-4" />
                              {useTamil ? 'வாட்ஸ்அப் மூலம் கேட்கவும்' : 'Inquire via WhatsApp'}
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <NoProductFound categoryName={useTamil ? 'பிரேம்கள்' : 'frames'} sliderVal={activeSliderVal} useTamil={useTamil} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

// Reusable No Match Warning Component
interface NoProductFoundProps {
  categoryName: string;
  sliderVal: number;
  useTamil: boolean;
}

function NoProductFound({ categoryName, sliderVal, useTamil }: NoProductFoundProps) {
  const whatsappBespokeMsg = useTamil
    ? `வணக்கம் முத்து டிஜிட்டல்ஸ், நான் உங்கள் தயாரிப்பு கண்டறிவி பக்கத்தைப் பார்த்தேன். எனது பட்ஜெட்டிற்குள் (${sliderVal.toLocaleString('en-IN')}) ஒரு தனிப்பயன் ${categoryName} வடிவமைக்க விரும்புகிறேன்.`
    : `Hi Muthu Digitals, I was checking your Product Finder and would like a custom quote request for ${categoryName} under budget ₹${sliderVal.toLocaleString('en-IN')}.`;

  return (
    <div className="text-center py-16 space-y-4 glass-card rounded-2xl border border-gray-800">
      <span className="text-4xl">🔍</span>
      <h3 className="font-serif text-xl font-bold text-gold-400">
        {useTamil 
          ? `₹${sliderVal.toLocaleString('en-IN')} பட்ஜெட்டிற்குள் ${categoryName} இல்லை` 
          : `No preset ${categoryName} found below ₹${sliderVal.toLocaleString('en-IN')}`}
      </h3>
      <p className="font-sans text-sm text-gray-400 max-w-md mx-auto">
        {useTamil 
          ? 'பட்ஜெட் வரம்பை சற்று அதிகரிக்கவும் அல்லது எங்கள் வடிவமைப்பாளர்களிடமிருந்து தனிப்பயன் மதிப்பீட்டை கோரவும்.'
          : 'Try raising your budget limit slider slightly or click below to submit a custom quote request.'}
      </p>
      <a 
        href={`https://wa.me/919865091095?text=${encodeURIComponent(whatsappBespokeMsg)}`}
        target="_blank"
        rel="noreferrer"
        className="gold-gradient-bg text-black py-3.5 px-6 rounded-lg font-sans text-xs font-bold uppercase tracking-wider cursor-pointer mt-4 inline-flex items-center gap-1.5 hover:opacity-90"
      >
        <MessageSquare className="w-4 h-4" />
        {useTamil ? 'தனிப்பயன் மதிப்பீட்டு கோரிக்கை' : 'Send Bespoke Quote Request'}
      </a>
    </div>
  );
}

import React, { useState } from 'react';
import { STUDIO_SERVICES, FUNCTION_SERVICES, PREMIUM_FRAMES_PRICES, ALBUM_PACKAGES } from '../types';
import { Camera, Calendar, CheckCircle2, Ruler, HelpCircle, Sparkles, Receipt, ChevronRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesViewProps {
  useTamil: boolean;
}

export default function ServicesView({ useTamil }: ServicesViewProps) {
  const [selectedFrame, setSelectedFrame] = useState(PREMIUM_FRAMES_PRICES[0].size);
  const [frameQty, setFrameQty] = useState(1);
  const [isCustomEstimation, setIsCustomEstimation] = useState(false);
  const [customWidth, setCustomWidth] = useState(12);
  const [customHeight, setCustomHeight] = useState(10);
  const [customTexture, setCustomTexture] = useState('Classic Gold Rim');
  const [isBookType, setIsBookType] = useState(false);

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

  const whatsappMsgText = useTamil
    ? `வணக்கம் முத்து டிஜிட்டல்ஸ், நான் உங்கள் பிரேம் மதிப்பீட்டாளரைப் பயன்படுத்தி ${frameQty}x ${isCustomEstimation ? `தனிப்பயன் பிரேம் ${customWidth}x${customHeight}"` : selectedFrameObj?.size} (${customTexture}) ஆர்டர் செய்ய விரும்புகிறேன். மதிப்பிடப்பட்ட விலை ₹${totalPrice}. தயவுசெய்து உறுதிப்படுத்தவும்.`
    : `Hi Muthu Digitals, I used your Service Frame Estimator and want to order ${frameQty}x ${isCustomEstimation ? `Custom Frame ${customWidth}x${customHeight}"` : selectedFrameObj?.size} (${customTexture}). The estimated cost is ₹${totalPrice}. Please confirm.`;

  return (
    <div id="services-view" className="space-y-16 sm:space-y-24">
      {/* Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-sans text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">
          {useTamil ? 'எங்கள் திறன்கள்' : 'Our Capabilities'}
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-black text-white gold-gradient-text leading-tight">
          {useTamil ? 'சேவைகள் & தனிப்பயன் பிரேம்கள்' : 'Services & Custom Frames'}
        </h2>
        <p className="font-sans text-sm sm:text-base text-gray-400 leading-relaxed">
          {useTamil 
            ? 'பாஸ்போர்ட் மற்றும் திருமண போர்ட்ஃபோலியோக்கள் முதல் பிரமாண்ட புதுமனை புகுவிழா பிரேம்கள் வரை, உன்னதமான நினைவுகளைப் பாதுகாக்கிறோம்.'
            : 'From high-resolution passport and alliance profile portfolio captures to grand housewarming frames, we deliver premium visual preservation.'}
        </p>
      </section>

      {/* Studio Photography Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-end border-b border-gray-800 pb-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
              <Camera className="text-gold-400 w-6 h-6" />
              {useTamil ? 'ஸ்டுடியோ புகைப்படம்' : 'Studio Photography'}
            </h3>
            <p className="font-sans text-xs text-gold-600 mt-1 italic font-medium">
              {useTamil ? 'ஸ்டுடியோ புகைப்படம், உயர்தர ஒளி அமைப்பு' : 'Studio Photography, High quality settings'}
            </p>
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
                  {useTamil ? serv.tamilName : serv.name}
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-sm text-gray-500 italic">{useTamil ? serv.name : serv.tamilName}</h4>
                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                  {useTamil ? serv.descriptionTamil : serv.description}
                </p>
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
              {useTamil ? 'நிகழ்ச்சி கவரேஜ்' : 'Function Coverage'}
            </h3>
            <p className="font-sans text-xs text-gold-600 mt-1 italic font-medium">
              {useTamil ? 'நிகழ்ச்சி கவரேஜ், அழகிய புகைப்பட தருணங்கள்' : 'Function Coverage, Aesthetic photo moments'}
            </p>
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
                  {useTamil ? func.tamilName : func.name}
                </h4>
                <p className="font-sans text-xs text-gold-500 font-semibold italic">
                  {useTamil ? func.name : func.tamilName}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Album Sizes & Rates Section */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-800 pb-4 gap-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="text-gold-400 w-6 h-6" />
              {useTamil ? 'பிரீமியம் ஆல்பம் தொகுப்புகள்' : 'Premium Album Collections'}
            </h3>
            <p className="font-sans text-xs text-gold-600 mt-1 italic font-medium">
              {useTamil ? 'வடிவமைப்புகள் மற்றும் தாள்களின் அளவு விவரங்கள்' : 'Custom designed wedding albums with dynamic layout count'}
            </p>
          </div>

          {/* Toggle format: Layflat vs Book-Type (+500) */}
          <div className="flex items-center gap-2 bg-charcoal-950 p-1.5 rounded-xl border border-gray-800 self-end">
            <button
              onClick={() => setIsBookType(false)}
              className={`px-4 py-2 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${!isBookType ? 'bg-gold-400 text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              {useTamil ? 'லேபிளாட் ஆல்பம்' : 'Layflat Album'}
            </button>
            <button
              onClick={() => setIsBookType(true)}
              className={`px-4 py-2 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${isBookType ? 'bg-gold-400 text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              {useTamil ? 'புக்-டைப் ஆல்பம் (+₹500)' : 'Book-Type (+₹500)'}
            </button>
          </div>
        </div>

        {/* Animated Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ALBUM_PACKAGES.map((pkg, idx) => {
            const currentRate = pkg.baseRate + (isBookType ? 500 : 0);
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-6 sm:p-8 rounded-3xl border border-gold-600/10 hover:border-gold-400/40 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-lg shadow-gold-500/[0.02] hover:shadow-gold-500/[0.08]"
              >
                {/* Visual Top Decorative Light bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-6">
                  {/* Package Title */}
                  <div className="space-y-1">
                    <span className="font-sans text-[10px] font-bold text-gold-400 uppercase tracking-widest bg-gold-400/10 border border-gold-400/20 px-2.5 py-0.5 rounded-full w-fit block">
                      {useTamil ? 'ஆல்பம் பேக்கேஜ்' : 'ALBUM OPTION'}
                    </span>
                    <h4 className="font-serif text-2xl font-black text-white group-hover:text-gold-400 transition-colors mt-2">
                      {useTamil ? pkg.nameTamil : pkg.name}
                    </h4>
                  </div>

                  {/* Pricing Rate display */}
                  <div className="pt-2 flex items-baseline gap-1.5">
                    <span className="font-serif text-4xl font-black text-white gold-gradient-text">
                      ₹{currentRate.toLocaleString('en-IN')}
                    </span>
                    <span className="font-sans text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      {useTamil ? 'கட்டணம்' : 'Rate'}
                    </span>
                  </div>

                  {/* Detailed Specs list */}
                  <div className="border-t border-gray-900 pt-4 space-y-3">
                    <div className="flex justify-between items-center text-xs font-sans">
                      <span className="text-gray-400 font-medium">{useTamil ? 'அதிகபட்ச புகைப்படங்கள்' : 'MAX Photos'}</span>
                      <span className="text-white font-bold font-mono">{pkg.maxPhotos}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-sans">
                      <span className="text-gray-400 font-medium">{useTamil ? 'ரோல் எண்ணிக்கை' : 'Roll Count'}</span>
                      <span className="text-white font-bold font-mono">{pkg.rollCount} Rolls</span>
                    </div>
                  </div>

                  {/* Extras / Notes info */}
                  <div className="pt-2">
                    <p className="font-sans text-[11px] text-gray-400 italic bg-charcoal-950/40 p-3 rounded-xl border border-gray-900 leading-relaxed">
                      <strong className="text-gold-400 font-bold not-italic uppercase tracking-widest text-[9px] block mb-1">
                        {useTamil ? 'கூடுதல் விவரங்கள்' : 'EXTRAS / TERMS'}
                      </strong>
                      {useTamil ? pkg.extrasTamil : pkg.extras}
                    </p>
                  </div>
                </div>

                {/* Inquiry CTA */}
                <div className="pt-6 mt-6 border-t border-gray-900/60">
                  <a
                    href={`https://wa.me/919865091095?text=${encodeURIComponent(
                      useTamil
                        ? `வணக்கம் முத்து டிஜிட்டல்ஸ், நான் உங்கள் சேவைகள் பக்கத்தில் ${pkg.nameTamil} ஆல்பம் தொகுப்பை (${isBookType ? 'Book-Type' : 'Layflat'}) தேர்ந்தெடுத்தேன். விலை: ₹${currentRate}. முன்பதிவு விவரங்களைக் கூறவும்.`
                        : `Hi Muthu Digitals, I'm interested in the Album Option: ${pkg.name} (${isBookType ? 'Book-Type' : 'Layflat'}) priced at ₹${currentRate}. Please provide details.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center block font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl border border-gold-400/30 text-gold-400 hover:bg-gold-400/10 hover:border-gold-300 transition-all cursor-pointer"
                  >
                    {useTamil ? 'வாட்ஸ்அப் மூலம் கேட்கவும்' : 'Inquire via WhatsApp'}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Premium Frames List + Frame Custom Pricing Calculator Bento */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Frame Table Section */}
        <div className="lg:col-span-6 space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h3 className="font-serif text-2xl font-bold text-white">
              {useTamil ? 'பிரீமியம் பிரேம்கள்' : 'Premium Frames'}
            </h3>
            <p className="font-sans text-xs text-gold-600 italic font-medium mt-1">
              {useTamil ? 'முறையான மற்றும் தனிப்பயன் அளவிலான ஃபிரேம்கள்' : 'Standard and custom profile frames'}
            </p>
          </div>

          <p className="font-sans text-xs text-gray-400">
            {useTamil 
              ? 'பல தசாப்தங்களாக புகைப்படங்களைப் பாதுகாக்கும் வகையில், ஈரப்பதம் புகாத மரச்சட்டம், உயர்தர கண்ணாடி மற்றும் பிரத்தியேக வடிவமைப்புடன் உருவாக்கப்பட்டது.'
              : 'Handcrafted with solid moisture-proof wood backings, high-clarity optical glass sheets, and signature gold/charcoal rim coatings to preserve prints for decades.'}
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
                  <p className="font-sans text-[10px] text-gray-500">
                    {useTamil ? 'பிரீமியம் மரச்சட்டம்' : 'Premium Wood Mounting'}
                  </p>
                </div>
                <span className="font-serif font-bold text-gold-400 text-base">
                  ₹{fPrice.price.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-gold-600/20 bg-gold-400/5 space-y-2">
            <p className="font-sans text-xs text-gray-300 leading-relaxed">
              <span className="text-gold-400 font-bold">{useTamil ? 'குறிப்பு:' : 'Special Note:'}</span>{' '}
              {useTamil 
                ? 'வாடிக்கையாளர்களின் தேவைக்கேற்ப தனிப்பயன் அளவிலான உயர்தர ஃபிரேம்களும் சிறப்பாக செய்து தரப்படும்.'
                : 'We provide custom-size framing based entirely on customer requirements and architectural niches.'}
            </p>
          </div>
        </div>

        {/* Framing Price Calculator Section */}
        <div className="lg:col-span-6 glass-card p-6 sm:p-8 rounded-3xl border border-gold-600/15 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-2">
            <span className="font-sans text-[10px] font-bold text-gold-400 bg-gold-400/10 border border-gold-400/20 px-3 py-1 rounded-full uppercase tracking-widest w-fit block">
              {useTamil ? 'மதிப்பீட்டு கால்குலேட்டர்' : 'Dynamic Calculator'}
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              {useTamil ? 'பிரேம் விலை மதிப்பீட்டாளர்' : 'Frame Price Estimator'}
            </h3>
            <p className="font-sans text-xs text-gray-400">
              {useTamil 
                ? 'உங்களின் தனிப்பயன் அளவை உள்ளிட்டு பிரேம்களுக்கான தோராயமான விலையை அறியவும்.'
                : 'Select one of our templates or enter a custom size to estimate high-clarity framing costs with materials.'}
            </p>
          </div>

          {/* Calculator toggle tabs */}
          <div className="flex gap-2 p-1 bg-charcoal-950 rounded-lg">
            <button
              onClick={() => setIsCustomEstimation(false)}
              className={`flex-1 font-sans text-xs font-bold py-2 px-3 rounded-md transition-all cursor-pointer ${!isCustomEstimation ? 'bg-gold-400 text-black' : 'text-gray-400 hover:text-white bg-transparent'}`}
            >
              {useTamil ? 'நிலையான அளவு' : 'Standard Size Template'}
            </button>
            <button
              onClick={() => setIsCustomEstimation(true)}
              className={`flex-1 font-sans text-xs font-bold py-2 px-3 rounded-md transition-all cursor-pointer ${isCustomEstimation ? 'bg-gold-400 text-black' : 'text-gray-400 hover:text-white bg-transparent'}`}
            >
              {useTamil ? 'தனிப்பயன் அங்குல அளவு' : 'Custom Inches Size'}
            </button>
          </div>

          <div className="space-y-4">
            {!isCustomEstimation ? (
              <div className="space-y-2">
                <label className="font-sans text-xs font-semibold text-gold-400 uppercase tracking-wider block">
                  {useTamil ? 'தேர்ந்தெடுக்கப்பட்ட அளவு' : 'Standard Templates Selected'}
                </label>
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
                    <label className="font-sans text-xs font-semibold text-gold-400 uppercase tracking-wider block">
                      {useTamil ? 'அகலம் (அங்குலம்)' : 'Width (Inches)'}
                    </label>
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
                    <label className="font-sans text-xs font-semibold text-gold-400 uppercase tracking-wider block">
                      {useTamil ? 'உயரம் (அங்குலம்)' : 'Height (Inches)'}
                    </label>
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
                  <label className="font-sans text-xs font-semibold text-gold-400 uppercase tracking-wider block">
                    {useTamil ? 'மரச்சட்ட வடிவமைப்பு வகை' : 'Wood Frame Texture Profile'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Classic Gold Rim', 'Midnight Walnut', 'Charcoal Matte'].map((txt) => (
                      <button
                        key={txt}
                        onClick={() => setCustomTexture(txt)}
                        className={`py-2 px-3 rounded-lg font-sans text-xs font-semibold border transition-all cursor-pointer ${customTexture === txt ? 'border-gold-500 bg-gold-400/10 text-gold-400' : 'border-gray-800 text-gray-400 hover:text-white bg-transparent'}`}
                      >
                        {txt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="font-sans text-xs font-semibold text-gold-400 uppercase tracking-wider block">
                {useTamil ? 'பிரேம்களின் எண்ணிக்கை' : 'Frame Quantity'}
              </label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setFrameQty(Math.max(1, frameQty - 1))}
                  className="w-10 h-10 rounded-lg bg-charcoal-950 border border-gray-800 text-white flex items-center justify-center font-serif text-lg hover:border-gray-600 cursor-pointer"
                >
                  -
                </button>
                <span className="font-sans text-sm font-semibold text-white w-12 text-center bg-charcoal-950 border border-gray-800 py-2 rounded-lg">{frameQty}</span>
                <button 
                  onClick={() => setFrameQty(frameQty + 1)}
                  className="w-10 h-10 rounded-lg bg-charcoal-950 border border-gray-800 text-white flex items-center justify-center font-serif text-lg hover:border-gray-600 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-800 flex justify-between items-center">
            <div>
              <p className="font-sans text-xs text-gray-500">
                {useTamil ? 'மதிப்பிடப்பட்ட திட்ட மதிப்பு' : 'Estimated Project Quote'}
              </p>
              <p className="font-serif text-3xl font-black text-white gold-gradient-text mt-1">
                ₹{totalPrice.toLocaleString('en-IN')}
              </p>
            </div>
            <a 
              href={`https://wa.me/919865091095?text=${encodeURIComponent(whatsappMsgText)}`}
              target="_blank"
              rel="noreferrer"
              className="gold-gradient-bg hover:opacity-90 text-black py-3 px-6 rounded-lg font-sans text-xs font-bold uppercase tracking-widest cursor-pointer inline-flex items-center gap-1"
            >
              {useTamil ? 'வாட்ஸ்அப்பில் ஆர்டர் செய்க' : 'Order on WhatsApp'}
              <ChevronRight className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

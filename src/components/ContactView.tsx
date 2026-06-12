import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import mapImage from '@/assets/google_map_location.png';
import { WEDDING_PACKAGES, ALBUM_PACKAGES, PREMIUM_FRAMES_PRICES } from '../types';

interface ContactViewProps {
  prefilledPackage: string;
  useTamil: boolean;
}

export default function ContactView({ prefilledPackage, useTamil }: ContactViewProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [serviceType, setServiceType] = useState('Wedding Package 1 - Essential');
  const [customMsg, setCustomMsg] = useState('');
  const [showStatusSuccess, setShowStatusSuccess] = useState(false);

  // Update selected package if parent supplied a prefilled value (from package finder or packages grid)
  useEffect(() => {
    if (prefilledPackage) {
      setServiceType(prefilledPackage);
      setCustomMsg(`Inquiring about ${prefilledPackage} matching my plan.`);
    }
  }, [prefilledPackage]);

  // Handle Form Submission - Opens WhatsApp chat box
  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const message = `Hi Muthu Digitals,

I would like to inquire about booking/consultation details:
• *Name:* ${fullName}
• *Phone:* ${phone}
${email ? `• *Email:* ${email}\n` : ''}• *Date:* ${eventDate || 'Not specified'}
• *Package/Service:* ${serviceType}
${customMsg ? `• *Custom Notes:* ${customMsg}` : ''}

Please confirm the slot availability. Thank you!`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919865091095?text=${encodedText}`;
    
    // Open WhatsApp in a new window/tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Show temporary feedback message
    setShowStatusSuccess(true);
    setTimeout(() => {
      setShowStatusSuccess(false);
    }, 4000);
  };

  return (
    <div id="contact-view" className="space-y-16 sm:space-y-24">
      {/* Intros Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-sans text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">
          {useTamil ? 'முத்து டிஜிட்டல்ஸ் உடன் இணையுங்கள்' : 'Connect with Muthu Digitals'}
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-black text-white gold-gradient-text leading-tight">
          {useTamil ? 'விசாரணை & முன்பதிவு மையம்' : 'Inquiry & Booking Hub'}
        </h2>
        <p className="font-sans text-sm sm:text-base text-gray-400 leading-relaxed">
          {useTamil 
            ? 'கீழே உங்கள் விவரங்களைத் தேர்ந்தெடுக்கவும். இது உங்களது விசாரணையை வாட்ஸ்அப்பில் முன்பதிவு செய்ய உதவும்.'
            : 'Select your details below. This dynamic message generator will pre-format your inquiry details and launch WhatsApp so you can contact us directly.'}
        </p>
      </section>

      {/* Grid: Form on left, Contact coordinates + Business hours on right */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Booking Request Form */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-gold-600/15 space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-4">
            <svg className="w-5 h-5 fill-current text-gold-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.458 3.48 1.33 5l-1.416 5.176 5.298-1.39a9.927 9.927 0 004.774 1.214h.004c5.506 0 9.988-4.482 9.988-9.988C22 6.482 17.518 2 12.012 2zm6.236 14.166c-.256.722-1.5 1.392-2.078 1.488-.578.096-1.302.192-3.806-.82-3.136-1.252-5.11-4.434-5.268-4.65-.158-.216-1.288-1.72-1.288-3.284 0-1.564.816-2.31 1.106-2.616.29-.306.634-.384.846-.384.212 0 .424.002.606.01.192.008.452-.074.708.544.256.62.88 2.144.954 2.296.074.152.124.328.024.528-.1.2-.15.328-.3.5-.15.172-.316.384-.452.514-.152.144-.312.3-.134.606.178.306.792 1.302 1.696 2.112.92.82 1.692 1.074 1.996 1.226.304.152.484.126.666-.084.182-.21.78-.908.99-1.218.21-.31.42-.26.708-.152.288.108 1.83.864 2.146 1.02.316.158.528.234.604.364.076.13.076.75-.18 1.472z"/>
            </svg>
            <h3 className="font-serif text-xl font-bold text-white">
              {useTamil ? 'வாட்ஸ்அப் செய்தி உருவாக்குபவர்' : 'WhatsApp Message Builder'}
            </h3>
          </div>

          <AnimatePresence>
            {showStatusSuccess && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-emerald-500/10 border border-emerald-500/50 rounded-xl flex items-start gap-3"
              >
                <div className="bg-emerald-500 text-black p-1 rounded-full shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-emerald-400 uppercase">
                    {useTamil ? 'செய்தி உருவாக்கப்பட்டது!' : 'Message Constructed!'}
                  </h4>
                  <p className="font-sans text-xs text-gray-300 mt-1">
                    {useTamil 
                      ? 'விசாரணையை அனுப்ப வாட்ஸ்அப் திறக்கப்படுகிறது. தானாக திறக்கவில்லை எனில் கீழே உள்ள பொத்தானை மீண்டும் கிளிக் செய்யவும்.'
                      : 'Opening WhatsApp to directly send your booking inquiry. If it does not redirect, please click the button below again.'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmitInquiry} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">
                  {useTamil ? 'முழு பெயர்' : 'Full Name'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={useTamil ? "எ.கா. ஆனந்த் சீனிவாசன்" : "e.g. Anand Srinivasan"}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-charcoal-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 placeholder-gray-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">
                  {useTamil ? 'தொலைபேசி எண்' : 'Phone Number'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98650 91095"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-charcoal-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 placeholder-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">
                  {useTamil ? 'மின்னஞ்சல் முகவரி' : 'Email Address'}
                </label>
                <input
                  type="email"
                  placeholder="e.g. anand@outlook.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-charcoal-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 placeholder-gray-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">
                  {useTamil ? 'நிகழ்வு / படப்பிடிப்பு தேதி' : 'Event / Shoot Date'}
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-charcoal-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">
                {useTamil ? 'தேவைப்படும் தொகுப்பு / சேவை' : 'Required Package / Service'}
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg-charcoal-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
              >
                {serviceType && 
                 !WEDDING_PACKAGES.some(pkg => `${pkg.name} (₹${pkg.price.toLocaleString('en-IN')})` === serviceType || pkg.name === serviceType) &&
                 !ALBUM_PACKAGES.some(album => `${album.name} (₹${album.baseRate.toLocaleString('en-IN')})` === serviceType || album.name === serviceType) &&
                 !PREMIUM_FRAMES_PRICES.some(frame => `${frame.size} (₹${frame.price.toLocaleString('en-IN')})` === serviceType || frame.size === serviceType) &&
                 !['Passport & Visa Photography', 'Matrimonial Alliance Portfolio', 'Historical Photo Restoration', 'Passport & Visa Photos', 'Alliance & portfolio', 'Vintage Photo restoration', 'Custom Wooden Framing Order'].includes(serviceType) && (
                  <optgroup label={useTamil ? 'தேர்ந்தெடுக்கப்பட்ட தயாரிப்பு' : 'SELECTED PRODUCT'} className="bg-charcoal-950 text-white">
                    <option value={serviceType}>{serviceType}</option>
                  </optgroup>
                )}

                <optgroup label={useTamil ? 'திருமண தொகுப்புகள்' : 'PRESET WEDDING PACKAGES'} className="bg-charcoal-950 text-white">
                  {WEDDING_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={`${pkg.name} (₹${pkg.price.toLocaleString('en-IN')})`}>
                      {useTamil ? pkg.tamilName : pkg.name} (₹{pkg.price.toLocaleString('en-IN')})
                    </option>
                  ))}
                </optgroup>
                <optgroup label={useTamil ? 'பிரீமியம் ஆல்பங்கள்' : 'PREMIUM ALBUMS'} className="bg-charcoal-950 text-white">
                  {ALBUM_PACKAGES.map((album) => (
                    <option key={album.id} value={`${album.name} (₹${album.baseRate.toLocaleString('en-IN')})`}>
                      {useTamil ? album.nameTamil : album.name} (₹{album.baseRate.toLocaleString('en-IN')})
                    </option>
                  ))}
                </optgroup>
                <optgroup label={useTamil ? 'மரச்சட்டங்கள்' : 'PREMIUM WOODEN FRAMES'} className="bg-charcoal-950 text-white">
                  {PREMIUM_FRAMES_PRICES.map((frame) => (
                    <option key={frame.size} value={`${frame.size} (₹${frame.price.toLocaleString('en-IN')})`}>
                      {useTamil ? frame.size.replace(' Frame', ' மரச்சட்டம்') : frame.size} (₹{frame.price.toLocaleString('en-IN')})
                    </option>
                  ))}
                </optgroup>
                <optgroup label={useTamil ? 'ஸ்டுடியோ சேவைகள்' : 'STUDIO SERVICES'} className="bg-charcoal-950 text-white">
                  <option value="Passport & Visa Photography">{useTamil ? 'பாஸ்போர்ட் & விசா போட்டோக்கள்' : 'Passport & Visa Photos'}</option>
                  <option value="Matrimonial Alliance Portfolio">{useTamil ? 'திருமண தகவல் & போர்ட்ஃபோலியோ' : 'Alliance & portfolio'}</option>
                  <option value="Historical Photo Restoration">{useTamil ? 'புகைப்பட மறுசீரமைப்பு (ஹெரிடேஜ்)' : 'Vintage Photo restoration'}</option>
                </optgroup>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">
                {useTamil ? 'கூடுதல் விவரங்கள் அல்லது இடக் குறிப்புகள்' : 'Custom Queries or Location Notes'}
              </label>
              <textarea
                rows={4}
                placeholder={useTamil ? "தனிப்பயன் மேடை அலங்காரங்கள், ட்ரோன் தேவைகள் அல்லது புகைப்படங்களின் எண்ணிக்கையை இங்கே குறிப்பிடவும்..." : "Give us details about custom stage setups, desired drone minutes, or restore counts..."}
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="w-full bg-charcoal-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 placeholder-gray-600 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full gold-gradient-bg text-black hover:opacity-90 font-sans text-xs font-bold uppercase tracking-widest py-4.5 rounded-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 fill-current text-black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.458 3.48 1.33 5l-1.416 5.176 5.298-1.39a9.927 9.927 0 004.774 1.214h.004c5.506 0 9.988-4.482 9.988-9.988C22 6.482 17.518 2 12.012 2zm6.236 14.166c-.256.722-1.5 1.392-2.078 1.488-.578.096-1.302.192-3.806-.82-3.136-1.252-5.11-4.434-5.268-4.65-.158-.216-1.288-1.72-1.288-3.284 0-1.564.816-2.31 1.106-2.616.29-.306.634-.384.846-.384.212 0 .424.002.606.01.192.008.452-.074.708.544.256.62.88 2.144.954 2.296.074.152.124.328.024.528-.1.2-.15.328-.3.5-.15.172-.316.384-.452.514-.152.144-.312.3-.134.606.178.306.792 1.302 1.696 2.112.92.82 1.692 1.074 1.996 1.226.304.152.484.126.666-.084.182-.21.78-.908.99-1.218.21-.31.42-.26.708-.152.288.108 1.83.864 2.146 1.02.316.158.528.234.604.364.076.13.076.75-.18 1.472z"/>
              </svg>
              {useTamil ? 'வாட்ஸ்அப் மூலம் அனுப்பவும்' : 'Open & Send to WhatsApp'}
            </button>
          </form>
        </div>

        {/* Studio Coordinates & Hours */}
        <div className="lg:col-span-5 space-y-8">
          {/* Coordinates */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gold-600/10 space-y-6">
            <h3 className="font-serif text-xl font-bold text-white">
              {useTamil ? 'தொடர்பு முகவரி' : 'Contact Coordinates'}
            </h3>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-gold-500/10 p-2.5 rounded-xl text-gold-400 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-gray-400 uppercase">
                    {useTamil ? 'முதன்மை ஸ்டுடியோ முகவரி' : 'Main Studio Address'}
                  </h4>
                  <a
                    href="https://maps.app.goo.gl/uCn9mARnHFZkC2V46"
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans text-sm text-white mt-1 leading-relaxed hover:text-gold-400 transition-colors block"
                  >
                    4GCW+4QM, Thandu Palayam,<br />
                    Thenkarai, Tamil Nadu 625601.
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-gold-500/10 p-2.5 rounded-xl text-gold-400 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-gray-400 uppercase">
                    {useTamil ? 'நேரடி முன்பதிவு எண்' : 'Direct Booking Hotline'}
                  </h4>
                  <p className="font-sans text-sm text-white mt-1 font-semibold">
                    +91 98650 91095 <span className="text-[10px] text-gold-400 font-normal italic">({useTamil ? 'மூத்த பிரதிநிதி' : 'Senior Representative'})</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-gold-500/10 p-2.5 rounded-xl text-gold-400 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-gray-400 uppercase">
                    {useTamil ? 'ஜிமெயில் முகவரி' : 'Gmail Address'}
                  </h4>
                  <a
                    href="mailto:muthustudiospkm1998@gmail.com"
                    className="font-sans text-sm text-white mt-1 hover:text-gold-400 transition-colors block"
                  >
                    muthustudiospkm1998@gmail.com
                  </a>
                </div>
              </div>

              {/* Styled Google Maps Interactive Image Link */}
              <div className="pt-4 border-t border-gray-800/60">
                <a
                  href="https://maps.app.goo.gl/uCn9mARnHFZkC2V46"
                  target="_blank"
                  rel="noreferrer"
                  className="block group relative overflow-hidden rounded-2xl border border-gold-600/15 hover:border-gold-500/40 transition-all duration-300"
                >
                  <img
                    src={mapImage}
                    alt="Muthu Digitals Google Maps Location"
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/45 transition-all duration-300 flex items-center justify-center">
                    <span className="bg-gold-400 text-black text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-gold-500/20">
                      <MapPin className="w-3.5 h-3.5" />
                      {useTamil ? 'கூகுள் மேப்ஸ் திறக்கவும்' : 'Open Google Maps'}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Business Hours */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gold-600/10 space-y-4">
            <div className="flex justify-between items-baseline">
              <h3 className="font-serif text-xl font-bold text-white">
                {useTamil ? 'வேலை நேரம்' : 'Business Hours'}
              </h3>
              <span className="font-sans text-[10px] font-black tracking-widest text-[#22c55e] bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded uppercase">
                ● {useTamil ? 'இப்போது திறந்திருக்கிறது' : 'Now Open'}
              </span>
            </div>

            <div className="space-y-2.5 pt-2">
              {[
                { day: useTamil ? 'திங்கள் - வெள்ளி' : 'Monday - Friday', time: '9:00 AM - 8:30 PM' },
                { day: useTamil ? 'சனி' : 'Saturday', time: '9:00 AM - 9:00 PM' },
                { day: useTamil ? 'ஞாயிறு' : 'Sunday', time: useTamil ? 'விடுமுறை (சிறப்பு முன்பதிவுகள் மட்டும்)' : 'Closed (Special field bookings only)', isQuiet: true }
              ].map((bhr) => (
                <div key={bhr.day} className="flex justify-between items-center text-xs border-b border-gray-900 pb-2">
                  <span className={`font-sans font-semibold ${bhr.isQuiet ? 'text-gray-500' : 'text-gray-300'}`}>{bhr.day}</span>
                  <span className={`font-mono ${bhr.isQuiet ? 'text-gray-500 italic' : 'text-white font-bold'}`}>{bhr.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

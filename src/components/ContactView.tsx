import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock } from 'lucide-react';
import mapImage from '@/assets/google_map_location.png';

interface ContactViewProps {
  useTamil: boolean;
}

export default function ContactView({ useTamil }: ContactViewProps) {
  return (
    <div id="contact-view" className="space-y-16 sm:space-y-24">
      {/* Intros Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-sans text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">
          {useTamil ? 'முத்து டிஜிட்டல்ஸ் உடன் இணையுங்கள்' : 'Connect with Muthu Digitals'}
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-black text-white gold-gradient-text leading-tight">
          {useTamil ? 'தொடர்பு மையம்' : 'Contact Us'}
        </h2>
        <p className="font-sans text-sm sm:text-base text-gray-400 leading-relaxed">
          {useTamil 
            ? 'நாங்கள் உங்களது சந்தேகங்களுக்குப் பதிலளிக்கத் தயாராக உள்ளோம். உடனடியாக முன்பதிவு செய்ய அல்லது ஆலோசிக்க கீழே உள்ள வாட்ஸ்அப் பட்டனை அழுத்தவும்.'
            : 'We are here to answer your queries. Instantly connect with our representative via WhatsApp for quick booking slots or custom layout design sessions.'}
        </p>
      </section>

      {/* Grid: WhatsApp Chat on left, Contact coordinates + Business hours on right */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Direct WhatsApp Callout Panel */}
        <div className="lg:col-span-7 glass-card p-8 rounded-3xl border border-gold-600/15 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-800 pb-4">
              <MessageSquare className="w-5 h-5 text-gold-400" />
              <h3 className="font-serif text-xl font-bold text-white">
                {useTamil ? 'வாட்ஸ்அப் உடனடி அரட்டை' : 'WhatsApp Instant Chat'}
              </h3>
            </div>
            
            <p className="font-sans text-sm text-gray-300 leading-relaxed">
              {useTamil 
                ? 'எங்கள் வாடிக்கையாளர் சேவை பிரதிநிதியுடன் நேரடியாகத் தொடர்பு கொள்ளுங்கள். உங்கள் தேவைகள், பட்ஜெட் மற்றும் விரும்பும் தேதி விவரங்களைப் பகிருங்கள்.'
                : 'Connect directly with our team in one click. Skip forms and discuss dates, specific photoshoot details, price adjustments, or schedule a studio visit.'}
            </p>

            <div className="bg-charcoal-950/50 border border-gray-800/80 rounded-2xl p-5 space-y-3.5">
              <h4 className="font-serif text-xs font-bold text-gold-400 uppercase tracking-wider">
                {useTamil ? 'வாட்ஸ்அப் மூலம் நீங்கள் கேட்கலாம்:' : 'What you can inquire about on WhatsApp:'}
              </h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>{useTamil ? 'திருமணப் புகைப்படம் & வீடியோகிராபி கட்டணங்கள்' : 'Wedding photography & cinematic video rates'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>{useTamil ? 'பிரீமியம் ஆல்பம் அளவுகள் மற்றும் பூச்சுகள்' : 'Custom photo album sizes and coating finishes'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>{useTamil ? 'மரச்சட்டங்கள் (பிரேம்கள்) அளவுகள் மற்றும் விவரங்கள்' : 'Wooden frames custom dimensions and pricing'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>{useTamil ? 'பழைய புகைப்பட சீரமைப்பு கட்டணம்' : 'Heritage photo restoration services'}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <a
              href="https://wa.me/919865091095"
              target="_blank"
              rel="noreferrer"
              className="w-full gold-gradient-bg text-black hover:opacity-90 font-sans text-xs font-bold uppercase tracking-widest py-4.5 rounded-xl cursor-pointer flex items-center justify-center gap-2 text-center"
            >
              <svg className="w-4 h-4 fill-current text-black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.458 3.48 1.33 5l-1.416 5.176 5.298-1.39a9.927 9.927 0 004.774 1.214h.004c5.506 0 9.988-4.482 9.988-9.988C22 6.482 17.518 2 12.012 2zm6.236 14.166c-.256.722-1.5 1.392-2.078 1.488-.578.096-1.302.192-3.806-.82-3.136-1.252-5.11-4.434-5.268-4.65-.158-.216-1.288-1.72-1.288-3.284 0-1.564.816-2.31 1.106-2.616.29-.306.634-.384.846-.384.212 0 .424.002.606.01.192.008.452-.074.708.544.256.62.88 2.144.954 2.296.074.152.124.328.024.528-.1.2-.15.328-.3.5-.15.172-.316.384-.452.514-.152.144-.312.3-.134.606.178.306.792 1.302 1.696 2.112.92.82 1.692 1.074 1.996 1.226.304.152.484.126.666-.084.182-.21.78-.908.99-1.218.21-.31.42-.26.708-.152.288.108 1.83.864 2.146 1.02.316.158.528.234.604.364.076.13.076.75-.18 1.472z"/>
              </svg>
              {useTamil ? 'வாட்ஸ்அப் அரட்டையைத் தொடங்கவும்' : 'Start WhatsApp Chat'}
            </a>
            <p className="text-center font-sans text-[10px] text-gray-500">
              {useTamil 
                ? 'பொதுவாக 15 நிமிடங்களுக்குள் பதிலளிப்போம்.' 
                : 'Typically replies in less than 15 minutes.'}
            </p>
          </div>
        </div>

        {/* Studio Coordinates & Hours */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          {/* Coordinates */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gold-600/10 space-y-6 flex-grow">
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
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/45 transition-all duration-300 flex items-center justify-center">
                    <span className="bg-gold-400 text-black text-xs font-bold uppercase tracking-wider py-2 px-3.5 rounded-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-gold-500/20">
                      <MapPin className="w-3.5 h-3.5" />
                      {useTamil ? 'கூகுள் மேப்ஸ் திறக்கவும்' : 'Open Google Maps'}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gold-600/10 space-y-4">
            <div className="flex justify-between items-baseline">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-400" />
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

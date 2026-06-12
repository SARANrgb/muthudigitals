import React, { useState, useEffect } from 'react';
import { Camera, Calendar, Award, Scissors, Users, Sliders, ChevronRight, MessageSquare, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  setMatchedPackageId?: (pkgId: string) => void;
  useTamil: boolean;
  setUseTamil: (val: boolean) => void;
}

export default function HomeView({ setActiveTab, setMatchedPackageId, useTamil, setUseTamil }: HomeViewProps) {
  // Statistics counter animations or states
  const [years, setYears] = useState(0);
  const [weddings, setWeddings] = useState(0);
  const [moments, setMoments] = useState(0);

  useEffect(() => {
    const yearsInterval = setInterval(() => {
      setYears((prev) => {
        if (prev >= 28) {
          clearInterval(yearsInterval);
          return 28;
        }
        return prev + 1;
      });
    }, 40);

    const weddingsInterval = setInterval(() => {
      setWeddings((prev) => {
        if (prev >= 10) {
          clearInterval(weddingsInterval);
          return 10;
        }
        return prev + 1;
      });
    }, 150);

    const momentsInterval = setInterval(() => {
      setMoments((prev) => {
        if (prev >= 65) {
          clearInterval(momentsInterval);
          return 65;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearInterval(yearsInterval);
      clearInterval(weddingsInterval);
      clearInterval(momentsInterval);
    };
  }, []);

  const showcaseImages = [
    {
      title: 'Traditional Majesty',
      tamil: 'பாரம்பரிய கம்பீரம்',
      desc: 'Deep royal South Indian bridal portraits captured with dramatic directional lighting in historic corridors.',
      descTamil: 'வரலாற்றுச் சிறப்புமிக்க மண்டபங்களில், தனித்துவமான ஒளி அமைப்பில் எடுக்கப்பட்ட கம்பீரமான தென்னிந்திய மணப்பெண் உருவப்படங்கள்.',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7xMnqauiM-dqGYRY-QG_WERVDvQqo7JZkm0Hi4ypQjS0NS6LEWDivwtDROencX3NVzh3p7HAHiKbDkRqvMmK2qa05F_AIoZ5hBhUkuUx2JPCZeuHAeQi1wwRYSn-f5vlhNGiHoNZuP4FoY02CHtFyOJAad9ou_FmuI5bH3QzMtOzGTgLxxdiIr3Ldi3RYljJQV9aEHacxhD5c9qp_0jHpnwqBiyK1BpBYgTdRiW8j-UVpKXxKjbmNzNkimC1X3oLWyJaoR1NePH0'
    },
    {
      title: 'The Grand Celebration',
      tamil: 'மகா மங்கல வைபவம்',
      desc: 'Ultra-wide cinematic angle highlighting the grand ceiling decor, glowing crystal chandeliers, and joyful guests.',
      descTamil: 'பிரமாண்டமான கூரை அலங்காரங்கள், ஒளிரும் விளக்குகள் மற்றும் மகிழ்ச்சியான விருந்தினர்களைக் காட்டும் சினிமா கோணப் புகைப்படம்.',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrthK7V7U6LRwrv0B-QjedwMspYIl2epuRv-XloomtjLYbu-h_gZ53QcdqDz7gBXPXiruEOA__-TK6jvtrXE-NAAyuHk5Oyyp56zyetUqxKO2Joa7VAdxhkMqDh69oDWBWHnJSFLWE7rW_N3lzrLtNg83XtyFIO9Vyk3wAnz0WRriYQB8B8-T6dFsx9MKUoahcsfoXOv-gCD3zapvlcQM3l4n-CNCsueh9vuNO2H-9xaxLcNta4sP6_VKXT_o6KX17R9A_8_rUn44'
    }
  ];

  return (
    <div id="home-view" className="space-y-16 sm:space-y-24">
      {/* Immersive Hero Section */}
      <section className="relative h-[90vh] w-full flex items-end pb-12 sm:pb-24 overflow-hidden rounded-3xl group border border-gold-600/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
          <img
            alt="Muthu Digitals Wedding Portrait"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000"
            src="https://lh3.googleusercontent.com/aida/AP1WRLtFgZ7-_QMSa1u8uZ-3oIL9hh_TGu0_jkJ8vzCPRntpvEsvC1ifsWNj5PA2Cdc1txajMW-IETHMu3DmHPg8Ew5k428s-QlPG3YU0QctgVAl4tuRdU3XgMymv3uityBdeZOTmUS4TnTFMmOpJCV_N2Ls31RXmLfEJgDznf7awbco6gBooVxJu87xwN_fxNtwv5Pq7caF9xEO5lIXZec_smtLBkHIdn06UmcviBh9f7Zi8Ldo-KAh2ZqCWo0"
          />
        </div>

        <div className="relative z-20 px-6 sm:px-12 w-full max-w-4xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {/* Highlighted Language Selector on Home Page */}
            <div className="bg-gradient-to-r from-gold-500/20 to-gold-600/5 p-1.5 rounded-2xl border-2 border-gold-400 flex items-center gap-2 w-fit shadow-lg shadow-gold-500/20 backdrop-blur-sm">
              <button
                onClick={() => setUseTamil(false)}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${!useTamil ? 'bg-gold-400 text-black shadow-md scale-102 font-black' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
              >
                English
              </button>
              <button
                onClick={() => setUseTamil(true)}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${useTamil ? 'bg-gold-400 text-black shadow-md scale-102 font-black' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
              >
                தமிழ் (Tamil)
              </button>
            </div>

            <span className="font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20 w-fit block mt-2">
              {useTamil ? 'நிறுவப்பட்டது 1998' : 'Established 1998'}
            </span>
            <div className="space-y-2">
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
                {useTamil ? 'முத்து டிஜிட்டல்ஸ்' : 'Muthu Digitals'}
              </h2>
              <h3 className="font-serif text-2xl sm:text-3xl text-gold-400 font-semibold italic opacity-90">
                {useTamil ? 'Muthu Digitals' : 'முத்து டிஜிட்டல்ஸ்'}
              </h3>
            </div>
            <p className="font-sans text-sm sm:text-base text-gray-300 max-w-md leading-relaxed">
              {useTamil ? (
                "எங்களது பாரம்பரிய கைவினைத்திறன் மற்றும் சினிமா தர லென்ஸ்கள் மூலம் உங்களின் பொன்னான நினைவுகளை காலத்தால் அழியாத கலைப் படைப்புகளாக மாற்றுகிறோம்."
              ) : (
                "Elevating your most precious memories into timeless high-contrast art masterpieces through legendary craftsmanship and cinema grade optics."
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => setActiveTab('packages')}
                className="gold-gradient-bg text-black hover:bg-gold-300 transition-all font-sans text-xs tracking-wider uppercase font-bold py-4 px-8 rounded flex items-center justify-center gap-2 cursor-pointer"
              >
                {useTamil ? 'தொகுப்புகளைத் தேடுக' : 'Find Your Package'}
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('package-finder')}
                className="bg-transparent border border-gold-400/60 hover:bg-gold-400/10 hover:border-gold-300 transition-all text-gold-400 font-sans text-xs tracking-wider uppercase font-bold py-4 px-8 rounded flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sliders className="w-4 h-4" />
                {useTamil ? 'பட்ஜெட் கால்குலேட்டர்' : 'Customize Builder'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Bento Widget */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-2xl flex flex-col justify-between group"
        >
          <div className="bg-gold-500/10 p-3 rounded-xl w-fit mb-6 text-gold-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-5xl font-serif font-black text-white leading-none">
              {years} <span className="text-gold-400 font-light">+</span>
            </div>
            <h4 className="font-sans text-xs font-bold tracking-widest text-gold-400 mt-2 uppercase">
              {useTamil ? 'ஆண்டுகளின் பாரம்பரியம்' : 'Years of Legacy'}
            </h4>
            <p className="font-sans text-xs text-gray-400 mt-1">
              {useTamil ? '1998 முதல் பெருமையுடன் நினைவுகளைப் பாதுகாக்கிறது.' : 'Preserving memories with pride since 1998.'}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 rounded-2xl flex flex-col justify-between group"
        >
          <div className="bg-gold-500/10 p-3 rounded-xl w-fit mb-6 text-gold-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-5xl font-serif font-black text-white leading-none">
              {weddings}K<span className="text-gold-400 font-light">+</span>
            </div>
            <h4 className="font-sans text-xs font-bold tracking-widest text-gold-400 mt-2 uppercase">
              {useTamil ? 'நிறைவுற்ற திருமணங்கள்' : 'Weddings Covered'}
            </h4>
            <p className="font-sans text-xs text-gray-400 mt-1">
              {useTamil ? 'எளிமையான திருமணங்கள் முதல் பிரமாண்ட மேடை நிகழ்வுகள் வரை.' : 'Intimate unions to grandeur royal stage events.'}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 rounded-2xl flex flex-col justify-between group"
        >
          <div className="bg-gold-500/10 p-3 rounded-xl w-fit mb-6 text-gold-400">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <div className="text-5xl font-serif font-black text-white leading-none">
              {moments}k<span className="text-gold-400 font-light">+</span>
            </div>
            <h4 className="font-sans text-xs font-bold tracking-widest text-gold-400 mt-2 uppercase">
              {useTamil ? 'பதிவு செய்யப்பட்ட தருணங்கள்' : 'Moments Captured'}
            </h4>
            <p className="font-sans text-xs text-gray-400 mt-1">
              {useTamil ? 'ஒவ்வொரு படமும் ஒரு உன்னதமான உணர்ச்சிக் கதையைச் சொல்கிறது.' : 'Every frame telling an authentic emotional story.'}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Featured Cinematic Showcase */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-gray-800 pb-4">
          <div>
            <span className="font-sans text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">
              {useTamil ? 'அழகியல் கலைப் படைப்புகள்' : 'Aesthetic Masterclass'}
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">
              {useTamil ? 'சினிமாட்டிக் காட்சித் தொகுப்பு' : 'Cinematic Showcase'}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('services')}
            className="text-gold-400 font-sans text-xs font-bold tracking-wider uppercase hover:text-gold-300 flex items-center gap-1 mt-4 sm:mt-0 cursor-pointer"
          >
            {useTamil ? 'சேவைகளை ஆராய்க' : 'Explore Services'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showcaseImages.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group glass-card overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/10 transition-colors duration-500" />
                <img
                  alt={image.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={image.src}
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                    {useTamil ? image.tamil : image.title}
                  </h3>
                  <span className="font-sans text-xs text-gold-400 font-semibold">
                    {useTamil ? image.title : image.tamil}
                  </span>
                </div>
                <p className="font-sans text-sm text-gray-400 leading-relaxed">
                  {useTamil ? image.descTamil : image.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Call-Out banner */}
      <section className="glass-card p-8 sm:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between border border-gold-600/20">
        <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-4 max-w-2xl text-center md:text-left">
          <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-gold-400 uppercase">
            {useTamil ? 'எங்களது படைப்பாற்றல் பார்வை' : 'Our Creative Vision'}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
            {useTamil ? 'நாங்கள் வெறும் புகைப்படங்களை எடுப்பதில்லை. உங்களின் ஆன்மாவின் பாரம்பரியத்தை காலத்திற்கு உறைக்கச் செய்கிறோம்.' : "We don't just photograph subjects. We freeze the legacy of your soul."}
          </h3>
          <p className="font-sans text-sm text-gray-400">
            {useTamil ? (
              "எங்களது பிரத்யேக 'ஆரியட் நாய்ர்' பாணி: கச்சிதமான இருண்ட பின்னணியில் கம்பீரமான தங்க நிற ஒளி அமைப்பைக் கொண்டு புகைப்படங்களை அருங்காட்சியக கலைப் படைப்புகள் போல உருவாக்குதல்."
            ) : (
              "Following a signature \"Aureate Noir\" styling: rich dark settings matching majestic golden spotlights to ensure our photographs stand out as professional museum prints."
            )}
          </p>
        </div>
        <button
          onClick={() => setActiveTab('contact')}
          className="gold-gradient-bg text-black hover:bg-gold-400 transition-all font-sans text-xs font-bold tracking-widest uppercase py-4 px-8 rounded-xl shrink-0 cursor-pointer"
        >
          {useTamil ? 'ஆலோசனை முன்பதிவு செய்க' : 'Book Consultation'}
        </button>
      </section>
    </div>
  );
}

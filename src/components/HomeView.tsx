import React, { useState, useEffect } from 'react';
import { Camera, Calendar, Award, Scissors, Users, Sliders, ChevronRight, MessageSquare, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  setMatchedPackageId?: (pkgId: string) => void;
}

export default function HomeView({ setActiveTab, setMatchedPackageId }: HomeViewProps) {
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
        if (prev >= 9) {
          clearInterval(weddingsInterval);
          return 9;
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
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7xMnqauiM-dqGYRY-QG_WERVDvQqo7JZkm0Hi4ypQjS0NS6LEWDivwtDROencX3NVzh3p7HAHiKbDkRqvMmK2qa05F_AIoZ5hBhUkuUx2JPCZeuHAeQi1wwRYSn-f5vlhNGiHoNZuP4FoY02CHtFyOJAad9ou_FmuI5bH3QzMtOzGTgLxxdiIr3Ldi3RYljJQV9aEHacxhD5c9qp_0jHpnwqBiyK1BpBYgTdRiW8j-UVpKXxKjbmNzNkimC1X3oLWyJaoR1NePH0'
    },
    {
      title: 'The Grand Celebration',
      tamil: 'மகா மங்கல வைபவம்',
      desc: 'Ultra-wide cinematic angle highlighting the grand ceiling decor, glowing crystal chandeliers, and joyful guests.',
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
            <span className="font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20 w-fit">
              Established 1998
            </span>
            <div className="space-y-2">
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
                Muthu Photography
              </h2>
              <h3 className="font-serif text-2xl sm:text-3xl text-gold-400 font-semibold italic opacity-90">
                முத்து போட்டோகிராபி
              </h3>
            </div>
            <p className="font-sans text-sm sm:text-base text-gray-300 max-w-md leading-relaxed">
              Elevating your most precious memories into timeless high-contrast art masterpieces through legendary craftsmanship and cinema grade optics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setActiveTab('packages')}
                className="gold-gradient-bg text-black hover:bg-gold-300 transition-all font-sans text-xs tracking-wider uppercase font-bold py-4 px-8 rounded flex items-center justify-center gap-2 cursor-pointer"
              >
                Find Your Package
                <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setActiveTab('package-finder')}
                className="bg-transparent border border-gold-400/60 hover:bg-gold-400/10 hover:border-gold-300 transition-all text-gold-400 font-sans text-xs tracking-wider uppercase font-bold py-4 px-8 rounded flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sliders className="w-4 h-4" />
                Customize Builder
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
            <h4 className="font-sans text-xs font-bold tracking-widest text-gold-400 mt-2 uppercase">Years of Legacy</h4>
            <p className="font-sans text-xs text-gray-400 mt-1">Preserving memories with pride since 1998.</p>
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
              {weddings}k<span className="text-gold-400 font-light">+</span>
            </div>
            <h4 className="font-sans text-xs font-bold tracking-widest text-gold-400 mt-2 uppercase">Weddings Covered</h4>
            <p className="font-sans text-xs text-gray-400 mt-1">Intimate unions to grandeur royal stage events.</p>
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
            <h4 className="font-sans text-xs font-bold tracking-widest text-gold-400 mt-2 uppercase">Moments Captured</h4>
            <p className="font-sans text-xs text-gray-400 mt-1">Every frame telling an authentic emotional story.</p>
          </div>
        </motion.div>
      </section>

      {/* Featured Cinematic Showcase */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-gray-800 pb-4">
          <div>
            <span className="font-sans text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">Aesthetic Masterclass</span>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">Cinematic Showcase</h2>
          </div>
          <button 
            onClick={() => setActiveTab('services')}
            className="text-gold-400 font-sans text-xs font-bold tracking-wider uppercase hover:text-gold-300 flex items-center gap-1 mt-4 sm:mt-0 cursor-pointer"
          >
            Explore Services
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
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-400 transition-colors">{image.title}</h3>
                  <span className="font-sans text-xs text-gold-400 font-semibold">{image.tamil}</span>
                </div>
                <p className="font-sans text-sm text-gray-400 leading-relaxed">{image.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Call-Out banner */}
      <section className="glass-card p-8 sm:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between border border-gold-600/20">
        <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-4 max-w-2xl text-center md:text-left">
          <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-gold-400 uppercase">Our Creative Vision</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
            We don't just photograph subjects. We freeze the legacy of your soul.
          </h3>
          <p className="font-sans text-sm text-gray-400">
            Following a signature "Aureate Noir" styling: rich dark settings matching majestic golden spotlights to ensure our photographs stand out as professional museum prints.
          </p>
        </div>
        <button 
          onClick={() => setActiveTab('contact')}
          className="gold-gradient-bg text-black hover:bg-gold-400 transition-all font-sans text-xs font-bold tracking-widest uppercase py-4 px-8 rounded-xl shrink-0 cursor-pointer"
        >
          Book Consultation
        </button>
      </section>
    </div>
  );
}

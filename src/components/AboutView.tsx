import React from 'react';
import { Camera, Calendar, History, Sparkles, BookOpen, Clock, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutViewProps {
  setActiveTab: (tab: string) => void;
}

export default function AboutView({ setActiveTab }: AboutViewProps) {
  const timelineEvents = [
    {
      year: '1998',
      title: 'The Inception',
      titleTamil: 'துவக்கம்',
      description: 'Founded by senior photographer Muthu, our studio began as a small chemical darkroom dedicated to traditional film photography and manual print development in the heart of the city.',
    },
    {
      year: '2005',
      title: 'Digital Evolution',
      titleTamil: 'டிஜிட்டல் பரிணாமம்',
      description: 'Embraced high performance professional digital sensors, being among the first in the entire South region to offer computer-aided, high-resolution digital color processing and printing.',
    },
    {
      year: '2012',
      title: 'Cinematic Pioneers',
      titleTamil: 'சினிமாட்டிக் அலை',
      description: 'Launched our absolute signature "Aureate Noir" style, bringing theatrical high-fashion lighting and dramatic storytelling angles to local matrimonial portraits and wedding frames.',
    },
    {
      year: 'Present',
      title: 'Digital Modernity',
      titleTamil: 'நவீன தொழில்நுட்பம்',
      description: 'Continually pushing the boundaries of photography with ultra-high resolution medium format camera rigs, interactive drone feeds, 360 camera setups, and custom album curation, while retaining the pure tactile artisan soul established in 1998.',
    }
  ];

  return (
    <div id="about-view" className="space-y-16 sm:space-y-24">
      {/* Editorial Intro */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <span className="font-sans text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">Our Story Since 1998</span>
        <h2 className="font-serif text-4xl sm:text-5xl font-black text-white gold-gradient-text leading-tight">
          About Muthu Photography
        </h2>
        <p className="font-sans text-base sm:text-lg text-gray-300 leading-relaxed">
          Serving families and preserving multi-generational legacy memories since 1998 with an unwavering commitment to professional craftsmanship, high-contrast aesthetics, and cinematic precision.
        </p>
      </section>

      {/* Hero Narrative Image */}
      <section className="relative aspect-[16/10] sm:aspect-[16/8] overflow-hidden rounded-3xl group border border-gold-600/10">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
        <img 
          alt="Legacy Photographer holding classic format camera" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform scale-102 group-hover:scale-100 transition-all duration-1000 grayscale group-hover:grayscale-[40%] brightness-75 group-hover:brightness-90"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3dpF60Vm-VSch24z3kg3xg8sfu8wKSE_4BQb7KqSdp64nsOovxGupZfRTytgg1Zlcq0fnFArZ3gfPzcYe2JZEVOA48SXiHv6BtVoF-toD6kKJl0HN9h4D4ksTih2bLWTUK0RQFWAIJ2mu8EndnYiRXZvDIDoaYyTQ3Rszcsd4N2jw9ejQtZaKlDQHSpx8wzAZ8yb2yuqBB7Za3anW4w4qLdOcjI87iu9t_e8agly-IZQOsrRyAYJUMDTCDAta9lNYusZrr-QqwAg"
        />
        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-20 space-y-1">
          <p className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">Artisanal Devotion</p>
          <h3 className="font-serif text-lg sm:text-2xl font-bold text-white">Classic Craft Meets Modern Sensors</h3>
        </div>
      </section>

      {/* Core Philosophy Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-2xl space-y-4 border-l-4 border-l-gold-400">
          <div className="bg-gold-500/10 p-3 rounded-xl w-fit text-gold-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">Artistic Sophistication</h3>
          <p className="font-sans text-sm text-gray-400 leading-relaxed">
            We believe photography is not merely capturing ambient light, but sealing the core emotions of a milestone. Our unique "Aureate Noir" signature aesthetic leverages heavy backdrops, dark-mode visual structure, and warm golden keylights so that the true visual focus remains directly on the subjects.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl space-y-4 border-l-4 border-l-gold-400">
          <div className="bg-gold-500/10 p-3 rounded-xl w-fit text-gold-400">
            <History className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">Timeless Heritage</h3>
          <p className="font-sans text-sm text-gray-400 leading-relaxed">
            Over two and a half decades of experience across three generations of technology. Transitioning beautifully from traditional film rolls to custom digital displays, we provide unmatched assurance that your legacy albums will remain durable and visually brilliant forever.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="space-y-12">
        <h3 className="font-serif text-3xl font-bold text-white text-center">Our Journey</h3>
        
        <div className="relative max-w-4xl mx-auto pl-8 sm:pl-0 sm:grid sm:grid-cols-1 gap-12 sm:before:content-[''] sm:before:absolute sm:before:left-1/2 sm:before:top-0 sm:before:bottom-0 sm:before:w-[2px] sm:before:bg-gradient-to-b sm:before:from-gold-600/10 sm:before:via-gold-500 sm:before:to-gold-600/10">
          {/* Vertical path for mobile */}
          <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-500 via-gold-400 to-gold-600/20 sm:hidden" />

          {timelineEvents.map((event, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                key={event.year}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative sm:w-[50%] ${isEven ? 'sm:mr-auto sm:pr-12 sm:text-right' : 'sm:ml-auto sm:pl-12 sm:text-left'} pl-4 sm:pl-0`}
              >
                {/* Node Dot */}
                <div className={`absolute top-1.5 sm:top-2 w-6 h-6 rounded-full bg-black border-2 border-gold-400 flex items-center justify-center z-20 ${isEven ? 'left-[-29px] sm:left-auto sm:right-[-13px]' : 'left-[-29px] sm:left-[-13px]'}`}>
                  <div className="w-2 h-2 rounded-full bg-gold-400" />
                </div>

                {/* Event Card */}
                <div className="glass-card p-6 rounded-2xl hover:border-gold-500/40 transition-colors">
                  <span className="font-sans text-xs font-bold text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20">
                    {event.year}
                  </span>
                  <div className={`flex flex-col sm:flex-row items-baseline gap-2 mt-4 ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                    <h4 className="font-serif text-xl font-bold text-white">{event.title}</h4>
                    <span className="font-sans text-xs text-gold-600 italic font-medium">{event.titleTamil}</span>
                  </div>
                  <p className="font-sans text-sm text-gray-400 mt-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Experience the Legacy Banner */}
      <section className="glass-card p-10 sm:p-16 rounded-3xl text-center relative overflow-hidden border border-gold-500/15">
        <div className="space-y-6 max-w-xl mx-auto relative z-10">
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">Experience the Legacy</h3>
          <p className="font-sans text-sm text-gray-400 leading-relaxed">
            Join the thousands of happy families in South India who have trusted Muthu Digitals to safe-keep their historic celebrations since 1998. Let's make your special day permanent.
          </p>
          <button 
            onClick={() => setActiveTab('contact')}
            className="gold-gradient-bg text-black hover:bg-gold-500 transition-all font-sans text-xs font-bold tracking-widest uppercase py-4 px-10 rounded-full cursor-pointer hover:scale-102 transition-transform"
          >
            Schedule Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
}

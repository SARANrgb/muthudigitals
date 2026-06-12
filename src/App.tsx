import React, { useState } from 'react';
import { Camera, Layers, Sliders, Info, MessageSquare, PhoneCall, Heart, Menu, X, ChevronRight, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import WeddingPackagesView from './components/WeddingPackagesView';
import PackageFinderView from './components/PackageFinderView';
import ContactView from './components/ContactView';
import logoImage from '@/assets/logo.png';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [prefilledPackage, setPrefilledPackage] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Helper to prefill and redirect to contact inquiry form
  const handleSelectPackageForInquiry = (pkgName: string) => {
    setPrefilledPackage(pkgName);
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home', labelTamil: 'முகப்பு' },
    { id: 'services', label: 'Services', labelTamil: 'சேவைகள்' },
    { id: 'packages', label: 'Wedding Packages', labelTamil: 'திருமண திட்டங்கள்' },
    { id: 'package-finder', label: 'Package Finder', labelTamil: 'தேர்வு மேலாளர்' },
    { id: 'contact', label: 'Inquiry Hub', labelTamil: 'தொடர்பு மையம்' },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col font-sans selection:bg-gold-500 selection:text-black">
      {/* Top ambient luxury background gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gold-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Styled Luxury Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gold-600/10">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src={logoImage}
              alt="Muthu Digitals Logo"
              className="w-12 h-12 rounded-xl object-cover border border-gold-500/30 group-hover:scale-105 transition-transform duration-300"
            />
            <div>
              <h1 className="font-serif text-lg sm:text-xl font-bold tracking-wider text-white uppercase flex items-center gap-1.5 leading-none">
                Muthu Digitals
              </h1>
              <span className="font-sans text-[10px] text-gold-400 uppercase tracking-[0.25em] font-bold block mt-1.5">
                Photography &bull; Est. 1998
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link rails */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    // Clear the package prefill if they navigate explicitly to contact
                    if (item.id !== 'contact') setPrefilledPackage('');
                  }}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all relative flex flex-col items-center cursor-pointer ${isActive ? 'text-gold-400' : 'text-gray-400 hover:text-white'}`}
                >
                  <span>{item.label}</span>
                  <span className="text-[9px] text-gray-500 font-normal italic lowercase mt-0.5 tracking-normal">
                    {item.labelTamil}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-[-10px] left-4 right-4 h-[2px] bg-gold-400"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* WhatsApp Direct Header Action */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/919865091095"
              target="_blank"
              rel="noreferrer"
              className="bg-gold-400/5 hover:bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
              Direct Booking: +91 98650 91095
            </a>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden bg-charcoal-900 border border-gray-800 p-2.5 rounded-xl text-gray-300 hover:text-white cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden z-40 bg-charcoal-950 border-b border-gold-600/20 overflow-hidden sticky top-20"
          >
            <div className="p-6 space-y-3">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                      if (item.id !== 'contact') setPrefilledPackage('');
                    }}
                    className={`w-full text-left py-3 px-4 rounded-xl flex justify-between items-center transition-all ${isActive ? 'bg-gold-400/10 border border-gold-400/30 text-gold-400' : 'text-gray-400 hover:text-white border border-transparent'}`}
                  >
                    <div>
                      <span className="font-sans text-xs font-bold uppercase tracking-wider block">{item.label}</span>
                      <span className="font-sans text-[10px] text-gray-500 italic mt-0.5 block">{item.labelTamil}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gold-500/60" />
                  </button>
                );
              })}
              <div className="pt-4 border-t border-gray-900">
                <a
                  href="https://wa.me/919865091095"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center block bg-gold-400 text-black py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  WhatsApp: +91 98650 91095
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-20 relative z-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {activeTab === 'home' && (
              <HomeView
                setActiveTab={setActiveTab}
                setMatchedPackageId={setPrefilledPackage}
              />
            )}
            {activeTab === 'services' && (
              <ServicesView />
            )}
            {activeTab === 'packages' && (
              <WeddingPackagesView
                onSelectPackageForInquiry={handleSelectPackageForInquiry}
              />
            )}
            {activeTab === 'package-finder' && (
              <PackageFinderView
                onSelectPackageForInquiry={handleSelectPackageForInquiry}
              />
            )}

            {activeTab === 'contact' && (
              <ContactView prefilledPackage={prefilledPackage} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Luxury Minimal Footer */}
      <footer className="bg-charcoal-950 border-t border-gold-600/10 pt-16 pb-12 mt-20 relative z-30">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
          {/* Col 1: Studio summary */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={logoImage}
                alt="Muthu Digitals Logo"
                className="w-10 h-10 rounded-lg object-cover border border-gold-500/20"
              />
              <div>
                <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wider">Muthu Digitals</h4>
                <p className="font-sans text-[9px] text-gold-400 uppercase tracking-widest font-semibold">Tirunelveli Legacy Studio</p>
              </div>
            </div>
            <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-sm">
              We translate multi-generational celebrations and milestone events into handcrafted display art frames. Renowned for custom lighting, robust restoration processes, and premium layflat album design since 1998.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="font-serif text-xs font-bold text-white uppercase tracking-widest">Digital Maps</h5>
            <div className="space-y-2.5 text-xs">
              <a
                href="https://maps.app.goo.gl/uCn9mARnHFZkC2V46"
                target="_blank"
                rel="noreferrer"
                className="font-sans text-gray-400 hover:text-gold-400 leading-relaxed flex gap-2 items-start transition-colors cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>
                  4GCW+4QM, Thandu Palayam,<br />
                  Thenkarai, Tamil Nadu 625601
                </span>
              </a>
              <p className="font-sans text-gray-400 flex gap-2 items-center">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+91 98650 91095</span>
              </p>
            </div>
          </div>

          {/* Col 3: Quick Tabs Map */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="font-serif text-xs font-bold text-white uppercase tracking-widest">Section Quick Rails</h5>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    setActiveTab(n.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="font-sans text-xs text-gray-400 hover:text-gold-400 text-left cursor-pointer transition-colors"
                >
                  &bull; {n.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Closing copyright */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 border-t border-gray-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-gray-500">
          <p>© 1998 - 2026 Muthu Digitals. All legacy reserves protected.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Legacy South Indian Weddings.
          </p>
        </div>
      </footer>
    </div>
  );
}

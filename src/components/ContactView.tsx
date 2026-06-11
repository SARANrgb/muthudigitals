import React, { useState, useEffect } from 'react';
import { BookingInquiry } from '../types';
import { Phone, Mail, MapPin, Clock, Calendar, CheckSquare, Trash2, Send, CheckCircle2, ShieldCheck, Database, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactViewProps {
  prefilledPackage: string;
}

export default function ContactView({ prefilledPackage }: ContactViewProps) {
  // LocalStorage state for inquiries
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [serviceType, setServiceType] = useState('Wedding Package 1 - Essential');
  const [customMsg, setCustomMsg] = useState('');
  const [showStatusSuccess, setShowStatusSuccess] = useState(false);

  // Load inquiries on mount
  useEffect(() => {
    const rawData = localStorage.getItem('muthu_digitals_inquiries');
    if (rawData) {
      try {
        setInquiries(JSON.parse(rawData));
      } catch (err) {
        console.error("Could not parse saved inquiries, using blank defaults.", err);
      }
    } else {
      // Seed some initial demo inquiries so that the user doesn't see an empty screen
      const demoSeed: BookingInquiry[] = [
        {
          id: 'demo-1',
          name: 'Arun Kumar',
          email: 'arunkumar@gmail.com',
          phone: '+91 98452 10452',
          serviceType: 'Package 4 - Candid Pro',
          message: 'Looking for both photography and 4K aerial drone coverage for our wedding reception on November 12th.',
          date: '2026-11-12',
          status: 'Confirmed'
        },
        {
          id: 'demo-2',
          name: 'Priya Meenakshi',
          email: 'priya.mee@outlook.com',
          phone: '+91 94432 99120',
          serviceType: 'Package 2 - Enhanced',
          message: 'Requesting frame restoring for three family photos and booking baby studio for portrait sessions.',
          date: '2026-10-05',
          status: 'Pending'
        }
      ];
      setInquiries(demoSeed);
      localStorage.setItem('muthu_digitals_inquiries', JSON.stringify(demoSeed));
    }
  }, []);

  // Update selected package if parent supplied a prefilled value (from package finder or packages grid)
  useEffect(() => {
    if (prefilledPackage) {
      setServiceType(prefilledPackage);
      setCustomMsg(`Inquiring about ${prefilledPackage} matching my plan.`);
    }
  }, [prefilledPackage]);

  // Handle Form Submission
  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const newInquiry: BookingInquiry = {
      id: `inq-${Date.now()}`,
      name: fullName,
      email: email || 'no-email@provided.com',
      phone: phone,
      serviceType: serviceType,
      message: customMsg || 'Looking forward to meeting at the studio!',
      date: eventDate || new Date().toISOString().split('T')[0],
      status: 'Pending'
    };

    const updated = [...inquiries, newInquiry];
    setInquiries(updated);
    localStorage.setItem('muthu_digitals_inquiries', JSON.stringify(updated));

    // Reset Form fields
    setFullName('');
    setEmail('');
    setPhone('');
    setEventDate('');
    setCustomMsg('');
    setShowStatusSuccess(true);

    setTimeout(() => {
      setShowStatusSuccess(false);
    }, 4000);
  };

  // Delete Inquiry
  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((it) => it.id !== id);
    setInquiries(updated);
    localStorage.setItem('muthu_digitals_inquiries', JSON.stringify(updated));
  };

  // Simulate updating status of inquiry
  const handleUpdateStatus = (id: string) => {
    const updated = inquiries.map((it) => {
      if (it.id === id) {
        const nextStatus = it.status === 'Pending' ? 'Confirmed' : it.status === 'Confirmed' ? 'Completed' : 'Pending';
        return { ...it, status: nextStatus as any };
      }
      return it;
    });
    setInquiries(updated);
    localStorage.setItem('muthu_digitals_inquiries', JSON.stringify(updated));
  };

  return (
    <div id="contact-view" className="space-y-16 sm:space-y-24">
      {/* Intros Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-sans text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">Connect with Muthu Photography</span>
        <h2 className="font-serif text-4xl sm:text-5xl font-black text-white gold-gradient-text leading-tight">
          Inquiry & Booking Hub
        </h2>
        <p className="font-sans text-sm sm:text-base text-gray-400 leading-relaxed">
          Submit your dates below. Your details will be registered securely in our offline local database for our staff to verify packages and slot availability.
        </p>
      </section>

      {/* Grid: Form on left, Contact coordinates + Business hours on right */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Booking Request Form */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-gold-600/15 space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-4">
            <Calendar className="w-5 h-5 text-gold-400" />
            <h3 className="font-serif text-xl font-bold text-white">Book Your Event Consultation</h3>
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
                  <h4 className="font-sans text-xs font-bold text-emerald-400 uppercase">Registration Successful!</h4>
                  <p className="font-sans text-xs text-gray-300 mt-1">
                    Your event details have been committed into the client data bank table below. You can update or delete them freely at any time.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmitInquiry} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">Full Name <span className="text-red-500">*</span></label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Anand Srinivasan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-charcoal-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 placeholder-gray-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">Phone Number <span className="text-red-500">*</span></label>
                <input 
                  type="tel"
                  required
                  placeholder="e.g. +91 99949 82633"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-charcoal-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 placeholder-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">Email Address</label>
                <input 
                  type="email"
                  placeholder="e.g. anand@outlook.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-charcoal-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 placeholder-gray-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">Event / Shoot Date</label>
                <input 
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-charcoal-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">Required Package / Service</label>
              <select 
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg-charcoal-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
              >
                <optgroup label="PRESET WEDDING PACKAGES" className="bg-charcoal-950 text-white">
                  <option value="Package 1 - Essential">Package 1 - Essential (₹50,000)</option>
                  <option value="Package 2 - Enhanced">Package 2 - Enhanced (₹65,000)</option>
                  <option value="Package 3 - Candid Video">Package 3 - Candid Video (₹80,000)</option>
                  <option value="Package 4 - Candid Pro">Package 4 - Candid Pro (₹1,15,000)</option>
                  <option value="Package 5 - Display Plus">Package 5 - Display Plus (₹1,35,000)</option>
                  <option value="Package 6 - 360 Experience">Package 6 - 360 Experience (₹1,50,000)</option>
                  <option value="Package 7 - Instant Memories">Package 7 - Instant Memories (₹1,80,000)</option>
                  <option value="Premium A-Z - Ultimate Package">Premium A-Z - Ultimate (₹2,50,000)</option>
                </optgroup>
                <optgroup label="STUDIO SERVICES" className="bg-charcoal-950 text-white">
                  <option value="Passport & Visa Photography">Passport & Visa Photos</option>
                  <option value="Matrimonial Alliance Portfolio">Alliance & portfolio</option>
                  <option value="Historical Photo Restoration">Vintage Photo restoration</option>
                  <option value="Custom Wooden Framing Order">Custom Framing size order</option>
                </optgroup>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-sans text-xs font-bold text-gold-400 uppercase tracking-widest block">Custom Queries or Location Notes</label>
              <textarea 
                rows={4}
                placeholder="Give us details about custom stage setups, desired drone minutes, or restore counts..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="w-full bg-charcoal-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 placeholder-gray-600 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full gold-gradient-bg text-black hover:opacity-90 font-sans text-xs font-bold uppercase tracking-widest py-4.5 rounded-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-black" />
              Submit and Register SQLite Data locally
            </button>
          </form>
        </div>

        {/* Studio Coordinates & Hours */}
        <div className="lg:col-span-5 space-y-8">
          {/* Coordinates */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gold-600/10 space-y-6">
            <h3 className="font-serif text-xl font-bold text-white">Contact Coordinates</h3>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-gold-500/10 p-2.5 rounded-xl text-gold-400 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-gray-400 uppercase">Main Studio Address</h4>
                  <p className="font-sans text-sm text-white mt-1 leading-relaxed">
                    123 Heritage Lane, Artisan District,<br />
                    Tirunelveli, Tamil Nadu, India.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-gold-500/10 p-2.5 rounded-xl text-gold-400 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-gray-400 uppercase">Direct Booking Hotlines</h4>
                  <p className="font-sans text-sm text-white mt-1 font-semibold">
                    +91 99949 82633 <span className="text-[10px] text-gold-400 font-normal italic">(Senior Representative)</span>
                  </p>
                  <p className="font-sans text-sm text-white mt-0.5 font-semibold">
                    +91 99949 82634 <span className="text-[10px] text-gray-500 font-normal italic">(Staff Inquiries)</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-gold-500/10 p-2.5 rounded-xl text-gold-400 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-gray-400 uppercase">Electronic Mailbox</h4>
                  <p className="font-sans text-sm text-white mt-1">
                    booking@muthudigitals.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Business Hours */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gold-600/10 space-y-4">
            <div className="flex justify-between items-baseline">
              <h3 className="font-serif text-xl font-bold text-white">Business Hours</h3>
              <span className="font-sans text-[10px] font-black tracking-widest text-[#22c55e] bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded uppercase">
                ● Now Open
              </span>
            </div>

            <div className="space-y-2.5 pt-2">
              {[
                { day: 'Monday - Friday', time: '9:00 AM - 8:30 PM' },
                { day: 'Saturday', time: '9:00 AM - 9:00 PM' },
                { day: 'Sunday', time: 'Closed (Special field bookings only)', isQuiet: true }
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

      {/* Database client registry view! */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-gold-400" />
            <h3 className="font-serif text-2xl font-bold text-white">Registered Bookings & Submissions Bank</h3>
          </div>
          <span className="font-sans text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-950 py-1 px-3 border border-gray-800 rounded">
            LocalStorage Sync
          </span>
        </div>

        <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-2xl">
          The table below demonstrates the interactive capabilities of this website. Each inquiry submitted above is stored in your web browser's LocalStorage database, allowing full control to evaluate slot schedules.
        </p>

        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-charcoal-950/40">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 font-sans text-xs font-bold tracking-wider text-gold-400 uppercase bg-charcoal-950">
                <th className="p-4">Customer Details</th>
                <th className="p-4">Requested Service</th>
                <th className="p-4">Proposed Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Interactivity</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length > 0 ? (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="border-b border-gray-900 font-sans text-xs text-gray-300 hover:bg-gray-800/10 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-white text-sm">{inq.name}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{inq.phone} | {inq.email}</div>
                      <div className="text-gray-400 italic text-[11px] mt-1 max-w-md line-clamp-1">"{inq.message}"</div>
                    </td>
                    <td className="p-4 font-medium text-gold-300">{inq.serviceType}</td>
                    <td className="p-4 font-mono font-bold">{inq.date}</td>
                    <td className="p-4">
                      <span 
                        onClick={() => handleUpdateStatus(inq.id)}
                        className={`inline-block rounded px-2.5 py-0.5 uppercase tracking-wider text-[9px] font-black cursor-pointer select-none transition-transform active:scale-95 ${inq.status === 'Confirmed' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : inq.status === 'Completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}
                      >
                        {inq.status} (Toggle)
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="bg-red-500/10 border border-red-500/20 p-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500 font-sans italic">
                    No submitted inquiries currently in the LocalStorage database. Ready to receive entries above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

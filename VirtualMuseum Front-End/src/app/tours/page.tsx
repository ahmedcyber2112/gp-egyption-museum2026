"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, User, CheckCircle2, Ticket, ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { isLoggedIn } from '../../lib/authStorage';
import { consumePostLoginAction, setPostLoginAction, setPostLoginRedirect } from '../../lib/authGate';
import LoginRequiredModal from '../../components/Auth/LoginRequiredModal';
import { pushAdminBooking, pushAdminNotification } from '../../lib/adminEvents';

type Guide = {
  id: number;
  name: string;
  specialty: string;
  price: number;
  image: string;
};

type Location = {
  id: string;
  name: string;
  duration: number;
  image: string;
};

// --- داتا وهمية للمرشدين والأماكن ---
const GUIDES: Guide[] = [
  { id: 1, name: "Dr. Zahi Hawass", specialty: "Pharaohs Era", price: 50, image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&q=80" },
  { id: 2, name: "Amira Hassan", specialty: "Mythology", price: 30, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80" },
];

const LOCATIONS: Location[] = [
  { id: 'tut', name: "Tutankhamun's Treasures", duration: 45, image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?w=300&q=80" },
  { id: 'mummies', name: "Royal Mummies Hall", duration: 60, image: "https://images.unsplash.com/photo-1600027736636-69eb1d916548?w=300&q=80" },
  { id: 'ramses', name: "Ramses II Colossus", duration: 30, image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2b45?w=300&q=80" },
  { id: 'rosetta', name: "Rosetta Stone Exhibit", duration: 20, image: "https://images.unsplash.com/photo-1572889617307-e00940428d00?w=300&q=80" },
];

export default function BookTourPage() {
  // --- States (لحفظ اختيارات اليوزر) ---
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);
  const [isBooked, setIsBooked] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) return;
    const action = consumePostLoginAction();
    if (action?.type === 'confirm-tour') {
      handleBooking();
    }
  }, []);

  // دالة لاختيار أو إلغاء اختيار الأماكن
  const toggleLocation = (loc: Location) => {
    if (selectedLocations.find((l: Location) => l.id === loc.id)) {
      setSelectedLocations(selectedLocations.filter((l: Location) => l.id !== loc.id));
    } else {
      setSelectedLocations([...selectedLocations, loc]);
    }
  };

  // --- حسابات الفاتورة (Receipt Calculations) ---
  const totalDuration = selectedLocations.reduce((total, loc: Location) => total + loc.duration, 0);
  const guideFee = selectedGuide ? selectedGuide.price : 0;
  const locationsFee = selectedLocations.length * 15; // 15 دولار لكل مكان كمثال
  const totalPrice = guideFee + locationsFee;

  // دالة تأكيد الحجز
  const handleBooking = () => {
    if (!selectedGuide || !date || !time || selectedLocations.length === 0) {
      alert("Please complete all fields to book your tour.");
      return;
    }
    const bookingRecord = pushAdminBooking({
      source: "guided-tour",
      guideName: selectedGuide?.name || "Unknown",
      date,
      time,
      locations: selectedLocations.map((l: Location) => l.name),
      totalDuration,
      totalPrice,
      status: "new",
    });
    pushAdminNotification({
      type: "ticket-booking",
      title: "New ticket booking",
      message: `${selectedGuide?.name || "Guide"} tour on ${date} at ${time}.`,
      link: "/bookings",
      bookingId: bookingRecord.id,
    });
    setIsBooked(true);
  };

  const handleBookingWithAuth = () => {
    if (isLoggedIn()) {
      handleBooking();
      return;
    }
    setPostLoginRedirect('/tours');
    setPostLoginAction({ type: 'confirm-tour' });
    setShowLoginModal(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* زرار الرجوع */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors mb-8 font-bold uppercase tracking-widest text-xs">
          <ArrowLeft size={16} /> Back to Tours
        </Link>

        {isBooked ? (
          // ==========================================
          // شاشة النجاح (التذكرة النهائية)
          // ==========================================
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-linear-to-b from-[#111] to-[#0a0a0a] border border-[#D4AF37] rounded-[3rem] p-10 text-center relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.2)]"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-[#D4AF37]"></div>
            <div className="w-24 h-24 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={50} className="text-[#D4AF37]" />
            </div>
            <h2 className="text-4xl font-serif font-black text-white mb-2">Tour Confirmed!</h2>
            <p className="text-gray-400 mb-8">Your private guided tour has been successfully scheduled.</p>
            
            <div className="bg-black/50 rounded-3xl p-6 text-left border border-white/5 space-y-4 mb-8">
              <div className="flex justify-between border-b border-white/5 pb-4">
                <span className="text-gray-500 uppercase text-xs font-bold tracking-widest">Guide</span>
                <span className="font-bold text-[#D4AF37]">{selectedGuide?.name ?? ''}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-4">
                <span className="text-gray-500 uppercase text-xs font-bold tracking-widest">Date & Time</span>
                <span className="font-bold text-white">{date} at {time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase text-xs font-bold tracking-widest">Itinerary</span>
                <span className="font-bold text-white text-right">
                  {selectedLocations.map(l => l.name).join(', ')} <br/>
                  <span className="text-sm text-gray-500 font-mono">({totalDuration} Mins)</span>
                </span>
              </div>
            </div>

            <Link href="/" className="inline-block bg-[#D4AF37] text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-colors">
              Return to Museum
            </Link>
          </motion.div>
        ) : (
          // ==========================================
          // شاشة التخصيص (Split Screen)
          // ==========================================
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* الجزء الأيسر: اختيارات اليوزر (Form) */}
            <div className="lg:col-span-8 space-y-12">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-black mb-4">Craft Your <span className="text-[#D4AF37]">Royal Tour</span></h1>
                <p className="text-gray-400">Customize your journey through history by selecting your guide, schedule, and preferred artifacts.</p>
              </div>

              {/* 1. اختيار المرشد */}
              <section>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><User className="text-[#D4AF37]"/> 1. Select Your Guide</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {GUIDES.map((guide: Guide) => (
                    <div 
                      key={guide.id} 
                      onClick={() => setSelectedGuide(guide)}
                      className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border transition-all ${selectedGuide?.id === guide.id ? 'bg-[#D4AF37]/10 border-[#D4AF37]' : 'bg-[#111] border-white/5 hover:border-white/20'}`}
                    >
                      <Image src={guide.image} alt={guide.name} width={64} height={64} loading="lazy" decoding="async" className="w-16 h-16 rounded-full object-cover" />
                      <div>
                        <h4 className="font-bold text-lg">{guide.name}</h4>
                        <p className="text-gray-500 text-xs uppercase tracking-widest">{guide.specialty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 2. اختيار الوقت والتاريخ */}
              <section>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><Calendar className="text-[#D4AF37]"/> 2. Schedule Date & Time</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#111] p-4 rounded-2xl border border-white/5">
                    <label className="block text-gray-500 text-xs uppercase font-bold tracking-widest mb-2">Select Date</label>
                    <input 
                      type="date" 
                      value={date} onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-transparent text-white text-lg outline-none cursor-pointer scheme-dark"
                    />
                  </div>
                  <div className="bg-[#111] p-4 rounded-2xl border border-white/5">
                    <label className="block text-gray-500 text-xs uppercase font-bold tracking-widest mb-2">Select Time</label>
                    <input 
                      type="time" 
                      value={time} onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-transparent text-white text-lg outline-none cursor-pointer scheme-dark"
                    />
                  </div>
                </div>
              </section>

              {/* 3. اختيار الأماكن */}
              <section>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><MapPin className="text-[#D4AF37]"/> 3. Choose Itinerary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {LOCATIONS.map((loc: Location) => {
                    const isSelected = selectedLocations.find((l: Location) => l.id === loc.id);
                    return (
                      <div 
                        key={loc.id} onClick={() => toggleLocation(loc)}
                        className={`relative h-32 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${isSelected ? 'border-[#D4AF37]' : 'border-transparent hover:border-white/20'}`}
                      >
                        <Image src={loc.image} alt={loc.name} fill sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" decoding="async" className="object-cover opacity-50" />
                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                          <h4 className="font-bold leading-tight">{loc.name}</h4>
                          <span className="text-xs bg-[#D4AF37] text-black px-2 py-1 rounded font-bold">{loc.duration}m</span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-[#D4AF37] text-black p-1 rounded-full">
                            <CheckCircle2 size={16} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>

            {/* الجزء الأيمن: الفاتورة التفاعلية (The Receipt) */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-32 bg-[#111] border border-white/10 rounded-4xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                  <Ticket className="text-[#D4AF37]" size={30} />
                  <h3 className="text-2xl font-serif font-bold">Tour Summary</h3>
                </div>

                {/* تفاصيل الفاتورة تتحدث لايف */}
                <div className="space-y-6 mb-8">
                  <div>
                    <span className="block text-gray-500 text-[10px] uppercase tracking-widest mb-1">Expert Guide</span>
                    <div className="text-lg font-bold">{selectedGuide ? selectedGuide.name : <span className="text-gray-700 italic">Not selected</span>}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-gray-500 text-[10px] uppercase tracking-widest mb-1">Date</span>
                      <div className="font-bold">{date || <span className="text-gray-700 italic">--/--/--</span>}</div>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-[10px] uppercase tracking-widest mb-1">Time</span>
                      <div className="font-bold">{time || <span className="text-gray-700 italic">--:--</span>}</div>
                    </div>
                  </div>

                  <div>
                    <span className="block text-gray-500 text-[10px] uppercase tracking-widest mb-2">Selected Locations ({selectedLocations.length})</span>
                    {selectedLocations.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedLocations.map((loc: Location) => (
                          <li key={loc.id} className="flex justify-between text-sm text-gray-300">
                            <span className="truncate pr-4">• {loc.name}</span>
                            <span className="text-[#D4AF37] shrink-0">{loc.duration}m</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-700 italic text-sm">No locations added yet.</div>
                    )}
                  </div>
                </div>

                {/* الحساب النهائي */}
                <div className="bg-black p-4 rounded-2xl mb-8 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Est. Duration</span>
                    <span className="font-mono font-bold">{totalDuration} Mins</span>
                  </div>
                  <div className="flex justify-between items-end border-t border-white/5 pt-4 mt-2">
                    <span className="text-gray-400 text-sm uppercase tracking-widest font-bold">Total Cost</span>
                    <span className="text-3xl font-serif font-bold text-[#D4AF37]">${totalPrice}</span>
                  </div>
                </div>

                {/* زرار الدفع/التأكيد */}
                <button 
                  onClick={handleBookingWithAuth}
                  className={`w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest flex justify-center items-center gap-2 transition-all ${
                    selectedGuide && date && time && selectedLocations.length > 0
                      ? 'bg-[#D4AF37] text-black hover:bg-white' 
                      : 'bg-white/5 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Confirm Royal Tour <ChevronRight size={18} />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        nextPath="/tours"
        title="Sign in to complete tour booking"
        message="Please sign in to confirm your Expert Guided Tour reservation."
      />
    </div>
  );
}







"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ExternalLink, Sparkles, ArrowRight, Ticket, Lock, Globe } from 'lucide-react';
import { isLoggedIn } from '../../lib/authStorage';
import { consumePostLoginAction, setPostLoginAction, setPostLoginRedirect } from '../../lib/authGate';
import LoginRequiredModal from '../Auth/LoginRequiredModal';
import { pushAdminBooking, pushAdminNotification } from '../../lib/adminEvents';

export default function BookingPage() {
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  // The official direct link to the museum ticketing page
  const officialBookingUrl = "https://www.visit-gem.com/en/AdmissionTkt"; 

  React.useEffect(() => {
    if (!isLoggedIn()) return;
    const action = consumePostLoginAction();
    if (action?.type === "open-official-booking") {
      window.open(officialBookingUrl, "_blank", "noopener,noreferrer");
    }
  }, []);

  const handleOfficialBooking = () => {
    if (isLoggedIn()) {
      const record = pushAdminBooking({
        source: "official-portal",
        guideName: "Official Portal",
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString(),
        locations: ["Grand Egyptian Museum Official Admission"],
        totalDuration: 0,
        totalPrice: 0,
        status: "new",
      });
      pushAdminNotification({
        type: "ticket-booking",
        title: "Official booking started",
        message: "A user opened the official booking portal.",
        link: "/bookings",
        bookingId: record.id,
      });
      window.open(officialBookingUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setPostLoginRedirect("/Booking");
    setPostLoginAction({ type: "open-official-booking" });
    setShowLoginModal(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-12 px-4 flex items-center justify-center font-sans">
      <div className="max-w-3xl w-full">
        
        {/* Redirect Gateway Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111] rounded-[48px] border-2 border-[#D4AF37]/30 p-8 md:p-16 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            {/* Top Icon */}
            <div className="w-20 h-20 bg-[#D4AF37] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(212,175,55,0.3)] transform -rotate-6">
              <Ticket size={40} className="text-black" />
            </div>

            <h4 className="text-[#D4AF37] font-black tracking-[5px] uppercase mb-4 text-[10px] md:text-xs">
              Grand Egyptian Museum Gateway
            </h4>
            
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
              Official Booking <br/> 
              <span className="text-[#D4AF37] italic font-normal">Secure Portal</span>
            </h1>

            <p className="text-gray-400 text-sm md:text-base mb-10 max-w-lg mx-auto leading-relaxed">
              To ensure the highest level of security for your payment, you are now being redirected to the 
              <span className="text-white font-bold"> Official Grand Egyptian Museum </span> 
              ticketing system to complete your reservation safely.
            </p>

            {/* Main Action Button */}
            <div className="flex flex-col items-center gap-4">
              <button 
                type="button"
                onClick={handleOfficialBooking}
                className="group relative inline-flex items-center justify-center gap-4 bg-[#D4AF37] text-black font-black py-5 px-10 md:px-14 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[#D4AF37]/20 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  BOOK OFFICIAL TICKETS NOW <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              
              <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-2">
                <Globe size={12} /> Portal will open in a new secure window
              </p>
            </div>

            {/* Security Badges */}
            <div className="mt-12 flex items-center justify-center gap-6 md:gap-12 border-t border-white/5 pt-10">
              <div className="flex items-center gap-2 text-gray-500">
                <Lock size={14} className="text-green-500" />
                <span className="text-[9px] uppercase font-black tracking-widest">SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Shield size={14} className="text-[#D4AF37]" />
                <span className="text-[9px] uppercase font-black tracking-widest">Verified Merchant</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer info */}
        <div className="text-center mt-10 space-y-2">
          <p className="text-gray-600 text-[10px] uppercase tracking-[3px]">
            Grand Egyptian Museum • Giza, Egypt • 2026
          </p>
          <button 
            onClick={() => window.history.back()}
            className="text-[#D4AF37]/50 hover:text-[#D4AF37] text-xs transition-colors"
          >
            ← Back to website
          </button>
        </div>
      </div>
      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        nextPath="/Booking"
        title="Sign in to book tickets"
        message="Please sign in first. After login, we will open the official booking portal for you."
      />
    </div>
  );
}



/*


"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, Clock, Check, QrCode, ArrowRight, 
  Shield, User, Tag, ChevronDown, Info, Sparkles, X
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti'; // استيراد تأثير القصاصات

// 1. هيكل أسعار التذاكر
const ticketCategories = {
  egyptian: {
    title: "Egyptian",
    types: [
      { id: 'adult', label: 'Adult', price: 200 },
      { id: 'child', label: 'Child', price: 100 },
      { id: 'student', label: 'Student', price: 100 },
      { id: 'senior', label: 'Senior', price: 100 },
    ]
  },
  foreigner: {
    title: "Arab or Foreigner",
    types: [
      { id: 'adult', label: 'Adult', price: 1450 },
      { id: 'child', label: 'Child', price: 730 },
      { id: 'student', label: 'Student', price: 730 },
    ]
  },
  resident: {
    title: "Arab or Foreigner Resident",
    types: [
      { id: 'adult', label: 'Adult', price: 730 },
      { id: 'child', label: 'Child', price: 370 },
      { id: 'student', label: 'Student', price: 370 },
    ]
  }
};

const availableAddons = [
  { id: 'ar_headset', name: 'AR Headset Rental', price: 500 },
  { id: 'guide', name: 'Expert Tour Guide', price: 1200 },
];

const times = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM'];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // حالة إظهار واجهة النجاح

  // ميزة الـ Auto-Scroll عند تغيير الخطوات
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // تهيئة EmailJS
  useEffect(() => {
    emailjs.init("WetzO230jvfO9_t6i");
  }, []);
  
  const [tickets, setTickets] = useState({
    egyptian: { adult: 0, child: 0, student: 0, senior: 0 },
    foreigner: { adult: 0, child: 0, student: 0 },
    resident: { adult: 0, child: 0, student: 0 }
  });

  const [bookingData, setBookingData] = useState({
    date: null,
    time: null,
    addons: [],
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    nationality: 'Egypt',
    phoneCode: '+20',
    phoneNumber: ''
  });

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState({ text: '', type: '' });

  // دوال الحسابات
  const calculateTicketsSubtotal = () => {
    let sum = 0;
    Object.keys(ticketCategories).forEach(group => {
      ticketCategories[group].types.forEach(type => {
        sum += tickets[group][type.id] * type.price;
      });
    });
    return sum;
  };

  const calculateTotalTicketsCount = () => {
    let count = 0;
    Object.keys(tickets).forEach(group => {
      Object.values(tickets[group]).forEach(val => count += val);
    });
    return count;
  };

  const subtotal = calculateTicketsSubtotal() + bookingData.addons.reduce((sum, a) => sum + a.price, 0);
  const totalTicketsCount = calculateTotalTicketsCount();
  const totalPrice = subtotal - (subtotal * discount);

  const updateTicketCount = (group, typeId, delta) => {
    const currentVal = tickets[group][typeId];
    const newVal = Math.max(0, currentVal + delta);
    setTickets(prev => ({
      ...prev,
      [group]: { ...prev[group], [typeId]: newVal }
    }));
  };

  const toggleAddon = (addon) => {
    const exists = bookingData.addons.find(a => a.id === addon.id);
    setBookingData({ 
      ...bookingData, 
      addons: exists ? bookingData.addons.filter(a => a.id !== addon.id) : [...bookingData.addons, addon] 
    });
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'GEM2026') {
      setDiscount(0.15);
      setPromoMessage({ text: '15% Royal Discount Applied!', type: 'success' });
    } else {
      setDiscount(0);
      setPromoMessage({ text: 'Invalid Promo Code.', type: 'error' });
    }
  };

  // فنكشن الإرسال والنجاح المبهر
  const handleFinalConfirm = () => {
    if (bookingData.email !== bookingData.confirmEmail) {
      alert("Error: Emails do not match!");
      return;
    }

    setIsSending(true);

    const templateParams = {
        name: `${bookingData.firstName} ${bookingData.lastName}`, 
        email: bookingData.email,       
        title: "Grand Egyptian Museum Ticket", 
        time: bookingData.time,   
        message: `Reservation: Date: ${bookingData.date}. Total: ${totalPrice.toFixed(0)} EGP. Tickets: ${totalTicketsCount}.` 
    };

    emailjs.send('service_xbdgt9b', 'template_bz1pglk', templateParams, 'WetzO230jvfO9_t6i')
    .then(() => {
        // تأثير قصاصات الورق الاحتفالي
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#ffffff', '#B5952F']
        });
        
        setShowSuccess(true); // إظهار واجهة النجاح المخصصة
    })
    .catch((error) => {
        console.error('EmailJS Error:', error);
        alert("Failed to send email. Please check your connection.");
    })
    .finally(() => {
        setIsSending(false);
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      const isPast = i < 21;
      const isFull = i === 24 || i === 25;
      const isSelected = bookingData.date === `${i} March`;
      let dayClass = "p-3 rounded-xl text-center border font-bold transition-all ";
      if (isSelected) dayClass += "bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg";
      else if (isPast || isFull) dayClass += "bg-white/5 border-white/5 text-gray-600 opacity-50 cursor-not-allowed";
      else dayClass += "bg-white/5 border-white/10 hover:border-[#D4AF37] cursor-pointer text-white";
      
      days.push(
        <div key={i} onClick={() => !isPast && !isFull && setBookingData({ ...bookingData, date: `${i} March` })} className={dayClass}>
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6">
      
      
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md px-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              className="max-w-md w-full bg-[#111] border border-[#D4AF37] rounded-[40px] p-10 text-center relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="w-24 h-24 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                <Check size={48} className="text-black" strokeWidth={3} />
              </div>

              <h2 className="text-4xl font-serif font-bold text-white mb-4 italic">Booking Royal!</h2>
              <p className="text-gray-400 mb-10 leading-relaxed">
                A digital e-ticket has been sent to <span className="text-[#D4AF37] font-bold">{bookingData.email}</span>. Your portal to ancient Egyptian history is now open.
              </p>

              <div className="space-y-4">
                <button 
                  onClick={() => window.location.href = "http://localhost:3000/tours"}
                  className="w-full py-5 bg-[#D4AF37] text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg"
                >
                  Book Private Tour Guide <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-4 text-gray-500 font-bold hover:text-white transition-colors"
                >
                  Close & Continue
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-3/5">
          <div className="mb-12 border-b border-white/10 pb-6">
            <h4 className="text-[#D4AF37] font-bold tracking-widest uppercase mb-2 text-sm flex items-center gap-2"><Sparkles size={16}/> Greatness Awaits</h4>
            <h1 className="text-5xl font-serif font-bold text-white mb-4">Book Your <span className="text-[#D4AF37] italic">Tickets</span></h1>
          </div>

          
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 z-0"></div>
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#D4AF37] z-0 transition-all duration-500`} style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${step >= num ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/30' : 'bg-[#111] border-gray-700 text-gray-500'}`}>
                {num}
              </div>
            ))}
          </div>

          <div className="min-h-[400px]">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-serif text-[#D4AF37] mb-6 border-l-4 border-[#D4AF37] pl-3">1. Select Tickets</h2>
                <div className="space-y-6">
                  {Object.entries(ticketCategories).map(([groupKey, group]) => (
                    <div key={groupKey} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
                      <div className="bg-[#D4AF37] text-black px-6 py-4 font-black flex justify-between items-center uppercase tracking-widest text-sm">
                        <span>{group.title}</span><ChevronDown size={18} />
                      </div>
                      <div className="p-6 space-y-4">
                        {group.types.map((type) => (
                          <div key={type.id} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0 last:pb-0">
                            <div className="flex items-center gap-3"><Info size={16} className="text-gray-600" /><span className="font-bold text-lg">{type.label}</span></div>
                            <div className="flex items-center gap-6">
                              <span className="font-serif text-[#D4AF37] font-black text-xl">{type.price} EGP</span>
                              <div className="flex items-center gap-4 bg-black/50 border border-white/10 rounded-2xl p-2 shadow-inner">
                                <button onClick={() => updateTicketCount(groupKey, type.id, -1)} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#D4AF37] hover:text-black transition-all font-bold text-xl">-</button>
                                <span className="w-4 text-center font-black">{tickets[groupKey][type.id]}</span>
                                <button onClick={() => updateTicketCount(groupKey, type.id, 1)} className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all font-bold text-xl">+</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-serif text-[#D4AF37] mb-6 border-l-4 border-[#D4AF37] pl-3">2. Choose Date</h2>
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl mb-8">
                  <div className="text-center mb-8"><h3 className="text-2xl font-black font-serif">March 2026</h3></div>
                  <div className="grid grid-cols-7 gap-3 text-center mb-6">{['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (<div key={day} className="text-[#D4AF37] text-xs font-black uppercase tracking-widest">{day}</div>))}</div>
                  <div className="grid grid-cols-7 gap-3">{renderCalendarDays()}</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {times.map((time, i) => (
                    <button key={i} onClick={() => setBookingData({ ...bookingData, time })} className={`p-4 text-center rounded-2xl border-2 font-bold transition-all ${bookingData.time === time ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'bg-white/5 border-white/10 hover:border-[#D4AF37]'}`}>{time}</button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-serif text-[#D4AF37] mb-6 border-l-4 border-[#D4AF37] pl-3">3. Enhance Experience</h2>
                <div className="space-y-4">
                  {availableAddons.map((addon) => {
                    const isSelected = bookingData.addons.some(a => a.id === addon.id);
                    return (
                      <div key={addon.id} onClick={() => toggleAddon(addon)} className={`cursor-pointer p-6 rounded-[32px] border-2 flex items-center justify-between transition-all ${isSelected ? 'bg-[#D4AF37]/10 border-[#D4AF37]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                        <div className="flex items-center gap-6"><div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center ${isSelected ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-gray-700'}`}>{isSelected && <Check size={20} className="text-black" strokeWidth={4} />}</div><span className="font-bold text-xl">{addon.name}</span></div>
                        <span className="font-black text-[#D4AF37] font-serif">+{addon.price} EGP</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-serif text-[#D4AF37] mb-2 border-l-4 border-[#D4AF37] pl-3">4. Visitor Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-8">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase font-black tracking-widest ml-2">First Name</label>
                    <input type="text" value={bookingData.firstName} onChange={(e) => setBookingData({...bookingData, firstName: e.target.value})} className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 px-6 text-white focus:border-[#D4AF37] outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase font-black tracking-widest ml-2">Last Name</label>
                    <input type="text" value={bookingData.lastName} onChange={(e) => setBookingData({...bookingData, lastName: e.target.value})} className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 px-6 text-white focus:border-[#D4AF37] outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase font-black tracking-widest ml-2">Email Address</label>
                    <input type="email" value={bookingData.email} onChange={(e) => setBookingData({...bookingData, email: e.target.value})} className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 px-6 text-white focus:border-[#D4AF37] outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase font-black tracking-widest ml-2">Confirm Email</label>
                    <input type="email" value={bookingData.confirmEmail} onChange={(e) => setBookingData({...bookingData, confirmEmail: e.target.value})} className={`w-full bg-white/5 border-2 rounded-2xl py-4 px-6 text-white outline-none transition-all ${bookingData.confirmEmail && bookingData.email !== bookingData.confirmEmail ? 'border-red-500' : 'border-white/10'}`} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase font-black tracking-widest ml-2">Nationality</label>
                    <select value={bookingData.nationality} onChange={(e) => setBookingData({...bookingData, nationality: e.target.value})} className="w-full bg-[#111] border-2 border-white/10 rounded-2xl py-4 px-6 text-white outline-none appearance-none">
                      <option value="Egypt">Egypt</option><option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase font-black tracking-widest ml-2">Mobile Number</label>
                    <input type="tel" value={bookingData.phoneNumber} onChange={(e) => setBookingData({...bookingData, phoneNumber: e.target.value})} className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 px-6 text-white focus:border-[#D4AF37] outline-none transition-all" />
                  </div>
                </div>
                <div className="bg-[#111] border-2 border-white/10 p-8 rounded-[32px] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity"><Tag size={60} className="rotate-12"/></div>
                  <label className="block text-sm text-[#D4AF37] mb-4 uppercase font-black flex items-center gap-2"><Sparkles size={16} /> Promo Code</label>
                  <div className="flex gap-4 relative z-10">
                    <input type="text" placeholder="ENTER CODE" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="flex-1 bg-black/50 border-2 border-white/10 rounded-2xl px-6 text-white outline-none focus:border-[#D4AF37] transition-all" />
                    <button onClick={handleApplyPromo} className="px-8 py-4 bg-white/10 hover:bg-white text-black hover:text-black font-black rounded-2xl transition-all">Apply</button>
                  </div>
                  {promoMessage.text && <p className={`mt-3 font-bold ${promoMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>{promoMessage.text}</p>}
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex justify-between mt-12 border-t border-white/10 pt-10">
            <button disabled={step === 1 || isSending} onClick={() => setStep(step - 1)} className="px-10 py-4 rounded-2xl border-2 border-white/10 hover:bg-white/5 transition-all disabled:opacity-20 font-bold uppercase tracking-widest text-xs">Back</button>
            <button 
              onClick={() => step < 4 ? setStep(step + 1) : handleFinalConfirm()}
              disabled={isSending || (step === 4 && (!bookingData.firstName || !bookingData.email || bookingData.email !== bookingData.confirmEmail))}
              className="px-12 py-4 bg-[#D4AF37] text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center gap-3 uppercase tracking-widest"
            >
              {isSending ? 'Processing...' : step === 4 ? 'Confirm & Pay' : 'Next Step'} <ArrowRight size={20} />
            </button>
          </div>
        </div>

      
        <div className="w-full lg:w-2/5">
          <div className="sticky top-32">
            <motion.div layout className="bg-[#111] rounded-[48px] overflow-hidden border-2 border-[#D4AF37]/30 shadow-2xl relative">
              <div className="p-10 border-b-2 border-dashed border-white/10">
                <div className="flex justify-between items-center mb-10">
                  <div className="w-16 h-16 bg-[#D4AF37] rounded-3xl flex items-center justify-center text-black font-black text-2xl shadow-lg">GEM</div>
                  <Shield className="text-[#D4AF37] opacity-40" size={32} />
                </div>
                <div className="space-y-8">
                  <div><p className="text-[10px] text-gray-500 uppercase font-black tracking-[4px] mb-2">Lead Visitor</p><p className="text-2xl font-serif font-black text-white italic">{bookingData.firstName || '---'} {bookingData.lastName}</p></div>
                  <div className="flex justify-between">
                    <div><p className="text-[10px] text-gray-500 uppercase font-black mb-1">Date</p><p className="font-black text-lg">{bookingData.date || '---'}</p></div>
                    <div className="text-right"><p className="text-[10px] text-gray-500 uppercase font-black mb-1">Entry Time</p><p className="font-black text-lg">{bookingData.time || '---'}</p></div>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-black mb-3">Admission Tickets</p>
                    {totalTicketsCount === 0 ? <p className="text-sm text-gray-700 italic">No tickets selected yet</p> : 
                      Object.entries(tickets).map(([gk, g]) => Object.entries(g).map(([ti, c]) => {
                        if (c > 0) {
                          const t = ticketCategories[gk].types.find(t => t.id === ti);
                          return (<div key={ti} className="flex justify-between text-sm mb-2 font-bold"><span className="text-gray-400">{c}x {gk} ({t.label})</span><span>{c * t.price} EGP</span></div>);
                        } return null;
                      }))
                    }
                  </div>
                </div>
              </div>
              <div className="p-10 bg-gradient-to-br from-[#1a1a1a] to-black">
                <div className="flex justify-between items-end mb-4">
                  <div><p className="text-[10px] text-[#D4AF37] font-black uppercase mb-2">Total Royal Amount</p><p className="text-5xl font-black text-white">{totalPrice.toFixed(0)} <span className="text-xs text-gray-500 font-normal">EGP</span></p></div>
                  <QrCode size={80} className="text-white opacity-20" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
*/
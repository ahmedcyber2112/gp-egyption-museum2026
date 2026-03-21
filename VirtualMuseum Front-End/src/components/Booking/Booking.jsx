"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Check, QrCode, ArrowRight, Shield, User, Tag, ChevronDown, Info } from 'lucide-react';

// 1. هيكل أسعار التذاكر بناءً على الصور المرفقة (بالجنيه المصري EGP)
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
  
  // State لحفظ عدد التذاكر المختارة لكل فئة
  const [tickets, setTickets] = useState({
    egyptian: { adult: 0, child: 0, student: 0, senior: 0 },
    foreigner: { adult: 0, child: 0, student: 0 },
    resident: { adult: 0, child: 0, student: 0 }
  });

  // State لبيانات الحجز والزائر
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

  // دوال حساب الإجمالي
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

  // تحديث عدد التذاكر
  const updateTicketCount = (group, typeId, delta) => {
    const currentVal = tickets[group][typeId];
    const newVal = Math.max(0, currentVal + delta);
    setTickets(prev => ({
      ...prev,
      [group]: { ...prev[group], [typeId]: newVal }
    }));
  };

  // إضافة وحذف الخدمات الإضافية
  const toggleAddon = (addon) => {
    const exists = bookingData.addons.find(a => a.id === addon.id);
    if (exists) {
      setBookingData({ ...bookingData, addons: bookingData.addons.filter(a => a.id !== addon.id) });
    } else {
      setBookingData({ ...bookingData, addons: [...bookingData.addons, addon] });
    }
  };

  // كود الخصم
  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'GEM2026') {
      setDiscount(0.15); // 15% discount
      setPromoMessage({ text: '15% Royal Discount Applied!', type: 'success' });
    } else {
      setDiscount(0);
      setPromoMessage({ text: 'Invalid Promo Code.', type: 'error' });
    }
  };

  // توليد أيام التقويم لشهر مارس 2026
  const renderCalendarDays = () => {
    const daysInMonth = 31;
    const currentDay = 21; // نفترض أن اليوم 21 مارس
    const days = [];
    
    // الأيام الفارغة في بداية الشهر (لضبط اليوم الأول)
    for (let i = 0; i < 0; i++) days.push(<div key={`empty-${i}`} className="p-4"></div>);

    for (let i = 1; i <= daysInMonth; i++) {
      const isPast = i < currentDay;
      const isFull = i === 24 || i === 25; // أيام محجوزة بالكامل
      const isSelected = bookingData.date === `${i} March`;

      let dayClass = "p-3 rounded-xl text-center border font-bold transition-all ";
      
      if (isSelected) {
        dayClass += "bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg";
      } else if (isPast) {
        dayClass += "bg-white/5 border-white/5 text-gray-600 opacity-50 cursor-not-allowed";
      } else if (isFull) {
        dayClass += "bg-white/5 border-white/10 text-gray-500 cursor-not-allowed";
      } else {
        dayClass += "bg-white/5 border-white/10 hover:border-[#D4AF37] cursor-pointer text-white";
      }

      days.push(
        <div 
          key={i} 
          onClick={() => !isPast && !isFull && setBookingData({ ...bookingData, date: `${i} March` })}
          className={dayClass}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* ================= الجانب الأيسر ================= */}
        <div className="w-full lg:w-3/5">
          
          <div className="mb-12 border-b border-white/10 pb-6">
            <h4 className="text-[#D4AF37] font-bold tracking-widest uppercase mb-2 text-sm flex items-center gap-2">
              <CalendarIcon size={16} /> Official Booking Page
            </h4>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Book Your <span className="text-[#D4AF37] italic">Tickets</span>
            </h1>
            <p className="text-gray-400">Select your ticket category, date, and personalize your experience.</p>
          </div>

          {/* شريط التقدم */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 z-0"></div>
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#D4AF37] z-0 transition-all duration-500`} style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
            
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 ${step >= num ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.5)]' : 'bg-[#111] border-gray-700 text-gray-500'}`}>
                {num}
              </div>
            ))}
          </div>

          <div className="min-h-[400px]">
            {/* الخطوة 1: اختيار التذاكر */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-serif text-[#D4AF37] mb-6 border-l-4 border-[#D4AF37] pl-3">1. Select Tickets</h2>
                
                <div className="space-y-6">
                  {Object.entries(ticketCategories).map(([groupKey, group]) => (
                    <div key={groupKey} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                      <div className="bg-[#D4AF37] text-black px-6 py-3 font-bold flex justify-between items-center">
                        <span>{group.title}</span>
                        <ChevronDown size={18} />
                      </div>
                      
                      <div className="p-4 space-y-4">
                        {group.types.map((type) => (
                          <div key={type.id} className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                            <div className="flex items-center gap-2">
                              <Info size={16} className="text-gray-500" />
                              <span className="font-medium">{type.label}</span>
                            </div>
                            
                            <div className="flex items-center justify-between sm:w-1/2">
                              <span className="font-serif text-[#D4AF37] font-bold">{type.price} EGP</span>
                              
                              <div className="flex items-center gap-3 bg-[#0a0a0a] border border-white/10 rounded-lg p-1">
                                <button 
                                  onClick={() => updateTicketCount(groupKey, type.id, -1)}
                                  className="w-8 h-8 rounded bg-white/5 hover:bg-white/20 flex items-center justify-center text-[#D4AF37] transition-colors"
                                >
                                  -
                                </button>
                                <span className="w-4 text-center font-bold text-sm">{tickets[groupKey][type.id]}</span>
                                <button 
                                  onClick={() => updateTicketCount(groupKey, type.id, 1)}
                                  className="w-8 h-8 rounded bg-[#D4AF37]/20 hover:bg-[#D4AF37] hover:text-black flex items-center justify-center text-[#D4AF37] transition-colors"
                                >
                                  +
                                </button>
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

            {/* الخطوة 2: التاريخ والوقت */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-serif text-[#D4AF37] mb-6 border-l-4 border-[#D4AF37] pl-3">2. Choose Date</h2>
                
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold">March 2026</h3>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2 text-center mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-[#D4AF37] text-xs font-bold uppercase">{day}</div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2">
                    {renderCalendarDays()}
                  </div>
                  
                  <p className="text-center text-orange-400 text-xs mt-6 font-medium">
                    ** Days marked as unavailable have reached maximum booking capacity.
                  </p>
                </div>

                <h3 className="text-sm text-gray-400 mb-4 uppercase tracking-widest">Available Entry Times</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {times.map((time, i) => (
                    <div 
                      key={i} 
                      onClick={() => setBookingData({ ...bookingData, time })}
                      className={`p-3 text-center rounded-lg border cursor-pointer text-sm transition-all ${bookingData.time === time ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* الخطوة 3: الإضافات */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-serif text-[#D4AF37] mb-6 border-l-4 border-[#D4AF37] pl-3">3. Enhance Experience</h2>
                <div className="space-y-3">
                  {availableAddons.map((addon) => {
                    const isSelected = bookingData.addons.some(a => a.id === addon.id);
                    return (
                      <div 
                        key={addon.id} 
                        onClick={() => toggleAddon(addon)}
                        className={`cursor-pointer p-5 rounded-2xl border flex items-center justify-between transition-all ${isSelected ? 'bg-[#D4AF37]/10 border-[#D4AF37]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 rounded border flex items-center justify-center ${isSelected ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-gray-500'}`}>
                            {isSelected && <Check size={16} className="text-black" />}
                          </div>
                          <span className="font-medium text-lg">{addon.name}</span>
                        </div>
                        <span className="font-bold text-[#D4AF37] font-serif">{addon.price === 0 ? 'Free' : `+${addon.price} EGP`}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* الخطوة 4: بيانات الزائر والدفع */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-serif text-[#D4AF37] mb-2 border-l-4 border-[#D4AF37] pl-3">4. Visitor Details</h2>
                <p className="text-gray-400 text-sm mb-8 pl-4">
                  Tickets will be sent to the email address provided. Please enter a valid email.
                </p>
                
                {/* فورم بيانات الزائر */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  
                  {/* First Name */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">First Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="e.g. Ahmed"
                      value={bookingData.firstName}
                      onChange={(e) => setBookingData({...bookingData, firstName: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">Last Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="e.g. Hassan"
                      value={bookingData.lastName}
                      onChange={(e) => setBookingData({...bookingData, lastName: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">Email Address <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      placeholder="example@mail.com"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  {/* Confirm Email */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">Confirm Email <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      placeholder="example@mail.com"
                      value={bookingData.confirmEmail}
                      onChange={(e) => setBookingData({...bookingData, confirmEmail: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  {/* Nationality */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">Nationality <span className="text-red-500">*</span></label>
                    <select 
                      value={bookingData.nationality}
                      onChange={(e) => setBookingData({...bookingData, nationality: e.target.value})}
                      className="w-full bg-[#111] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37] appearance-none cursor-pointer"
                    >
                      <option value="Egypt">Egypt</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="UAE">United Arab Emirates</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">Mobile Number <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      <select 
                        value={bookingData.phoneCode}
                        onChange={(e) => setBookingData({...bookingData, phoneCode: e.target.value})}
                        className="w-24 bg-[#111] border border-white/10 rounded-xl py-3 px-2 text-white focus:outline-none focus:border-[#D4AF37] appearance-none text-center cursor-pointer"
                      >
                        <option value="+20">🇪🇬 +20</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+966">🇸🇦 +966</option>
                      </select>
                      <input 
                        type="tel" 
                        placeholder="100 123 4567"
                        value={bookingData.phoneNumber}
                        onChange={(e) => setBookingData({...bookingData, phoneNumber: e.target.value})}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                  </div>

                </div>

                {/* كود الخصم (Promo Code) */}
                <div className="bg-[#111] border border-white/10 p-6 rounded-2xl">
                  <label className="block text-sm text-[#D4AF37] mb-2 uppercase tracking-widest flex items-center gap-2">
                    <Tag size={16} /> Have a Promo Code?
                  </label>
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      placeholder="Try 'GEM2026'"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-[#D4AF37] uppercase transition-colors"
                    />
                    <button 
                      onClick={handleApplyPromo}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage.text && (
                    <p className={`text-sm mt-3 font-medium ${promoMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                      {promoMessage.text}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* أزرار التنقل */}
          <div className="flex justify-between mt-12 border-t border-white/10 pt-8">
            <button 
              disabled={step === 1} 
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-all disabled:opacity-30"
            >
              Go Back
            </button>
            <button 
              onClick={() => step < 4 ? setStep(step + 1) : alert('Processing Secure Payment...')}
              disabled={
                (step === 1 && totalTicketsCount === 0) || 
                (step === 2 && (!bookingData.date || !bookingData.time)) ||
                (step === 4 && (!bookingData.firstName || !bookingData.lastName || !bookingData.email))
              }
              className="px-8 py-3 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#b5952f] flex items-center gap-2 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              {step === 4 ? 'Confirm & Pay' : 'Next Step'} <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* ================= الجانب الأيمن (التذكرة الحية) ================= */}
        <div className="w-full lg:w-2/5 relative">
          <div className="sticky top-32">
            
            <motion.div layout className="bg-[#111] rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl relative">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/egyptian-hieroglyphs.png')]"></div>
              
              <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h4 className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-1">Official E-Ticket</h4>
                    <h2 className="text-2xl font-serif font-bold text-white">Grand Egyptian Museum</h2>
                  </div>
                  <Shield className="text-[#D4AF37] opacity-50" size={32} />
                </div>

                <div className="space-y-6">
                  {/* Guest Name */}
                  <div className="pb-4 border-b border-white/10">
                    <p className="text-gray-500 text-xs uppercase mb-1">Lead Guest</p>
                    <p className="font-bold text-lg text-white">
                      {bookingData.firstName || bookingData.lastName ? 
                        `${bookingData.firstName} ${bookingData.lastName}` : 
                        <span className="text-gray-600 italic">Awaiting Name...</span>
                      }
                    </p>
                  </div>

                  {/* Selected Tickets */}
                  <div className="pb-4 border-b border-white/10">
                    <p className="text-gray-500 text-xs uppercase mb-2">Admission Tickets</p>
                    {totalTicketsCount === 0 ? (
                      <p className="text-sm text-gray-600 italic">No tickets selected</p>
                    ) : (
                      Object.entries(tickets).map(([groupKey, group]) => (
                        Object.entries(group).map(([typeId, count]) => {
                          if (count > 0) {
                            const label = ticketCategories[groupKey].types.find(t => t.id === typeId).label;
                            const price = ticketCategories[groupKey].types.find(t => t.id === typeId).price;
                            return (
                              <div key={`${groupKey}-${typeId}`} className="flex justify-between text-sm mb-1">
                                <span>{count}x {ticketCategories[groupKey].title} ({label})</span>
                                <span>{count * price} EGP</span>
                              </div>
                            );
                          }
                          return null;
                        })
                      ))
                    )}
                  </div>

                  {/* Date & Time */}
                  <div className="flex justify-between pb-4 border-b border-white/10">
                    <div>
                      <p className="text-gray-500 text-xs uppercase mb-1 flex items-center gap-1"><CalendarIcon size={12}/> Date</p>
                      <p className="font-bold">{bookingData.date || '--'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-xs uppercase mb-1 flex items-center gap-1 justify-end"><Clock size={12}/> Time</p>
                      <p className="font-bold">{bookingData.time || '--'}</p>
                    </div>
                  </div>

                  {/* Addons */}
                  {bookingData.addons.length > 0 && (
                    <div className="pb-4 border-b border-white/10">
                      <p className="text-gray-500 text-xs uppercase mb-2">Add-ons</p>
                      {bookingData.addons.map(a => (
                        <div key={a.id} className="flex justify-between text-sm text-gray-400 mt-1">
                          <span>+ {a.name}</span>
                          <span>{a.price} EGP</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* جزء التذكرة السفلي (Stub) */}
              <div className="bg-[#D4AF37] p-8 relative">
                <div className="absolute top-0 left-0 w-full h-0 border-t-2 border-dashed border-[#111]"></div>
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#050505] rounded-full"></div>
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#050505] rounded-full"></div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-black/60 text-xs uppercase font-bold mb-1">Total Amount</p>
                    {discount > 0 ? (
                      <div className="flex flex-col">
                        <span className="text-black/50 line-through text-lg font-bold">{subtotal} EGP</span>
                        <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-4xl font-black text-black">
                          {totalPrice.toFixed(0)} EGP
                        </motion.span>
                      </div>
                    ) : (
                      <p className="text-4xl font-black text-black">{totalPrice} EGP</p>
                    )}
                  </div>
                  <QrCode size={48} className="text-black" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
}
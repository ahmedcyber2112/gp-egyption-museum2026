"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const ContactPharaoh = () => {
  const contactInfo = [
    { icon: <Phone size={20} />, title: "Call Us", details: ["+20 100 194 8526", "+20 111 598 7656"] },
    { icon: <Mail size={20} />, title: "Email Us", details: ["support@egyptianmuseum.eg", "info@egyptianmuseum.eg"] },
    { icon: <MapPin size={20} />, title: "Visit Us", details: ["Tahrir Square, Cairo, Egypt"] },
    { icon: <Clock size={20} />, title: "Working Hours", details: ["Sat - Thu: 09:00 AM - 05:00 PM", "Friday: 09:00 AM - 12:00 PM"] },
  ];

  return (
    <section className="bg-[#0e0d0d] py-24 px-6 relative overflow-hidden">
      {/* زخارف خلفية (العين المجنحة أو رموز فرعونية) */}
      <div className="absolute top-10 right-[-5%] opacity-[0.03] text-[300px] pointer-events-none select-none">
        𓂀
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tighter text-white mb-4">
            Connect with <span className="text-[#D4AF37]">History</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-light tracking-wide">
            Whether you have a question about our artifacts or want to book a private tour, our scribes are ready to assist you.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Info Cards */}
          <div className="lg:col-span-4 space-y-6">
            {contactInfo.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ x: 10 }}
                className="flex items-center gap-5 p-6 rounded-2xl bg-white/5 border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-[#D4AF37] font-serif font-bold uppercase text-xs tracking-[0.2em] mb-1">{item.title}</h4>
                  {item.details.map((line, i) => (
                    <p key={i} className="text-gray-300 text-sm font-light">{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Message Form */}
          <div className="lg:col-span-8 bg-white/[0.03] border border-[#D4AF37]/20 p-8 md:p-12 rounded-[2rem] relative overflow-hidden shadow-2xl">
            {/* لمسة ذهبية في الزاوية */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-[60px]"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-serif font-bold text-white mb-8 flex items-center gap-3">
                Send a Message <span className="text-[#D4AF37] text-sm">𓍝</span>
              </h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold ml-2">Full Name</label>
                    <input type="text" placeholder="Enter your name" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold ml-2">Email Address</label>
                    <input type="email" placeholder="email@example.com" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-gray-700" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold ml-2">Phone Number</label>
                    <input type="text" placeholder="+20 ..." className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold ml-2">Subject</label>
                    <input type="text" placeholder="Inquiry about..." className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-gray-700" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold ml-2">Message</label>
                  <textarea rows="4" placeholder="Write your message here..." className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-gray-700 resize-none"></textarea>
                </div>

                <button className="group relative w-full md:w-max bg-gradient-to-r from-[#D4AF37] to-[#B8962E] text-black font-black uppercase text-xs tracking-[0.2em] px-10 py-5 rounded-xl overflow-hidden transition-all hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] active:scale-95">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Send Message <Send size={16} />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactPharaoh;
  


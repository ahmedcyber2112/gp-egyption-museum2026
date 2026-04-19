import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Ticket, Award, Globe ,Smartphone, QrCode } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const PremiumFooter = () => {
  return (
    <footer dir="ltr" className="relative bg-[#050505] text-white pt-20 pb-10 px-6 md:px-12 overflow-hidden [direction:ltr] text-left">


      {/* خلفية توت عنخ آمون - الجانب الأيمن (باصص للشمال) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex justify-end items-end p-10 overflow-hidden">
        <span className="text-[25rem] leading-none select-none grayscale contrast-200 translate-y-20 translate-x-10">
          𓀛
        </span>
      </div>

      {/* خلفية توت عنخ آمون - الجانب الأيسر (باصص لليمين) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex justify-start items-end p-10 overflow-hidden">
        <span className="text-[25rem] leading-none select-none grayscale contrast-200 translate-y-20 -translate-x-10 -scale-x-100">
          𓀛
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
       

        {/* 3. Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Logo & Vision */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#D4AF37] to-[#8A6D3B] p-2 rounded-xl flex items-center justify-center">
                <Image
                  src="/assets/images/Logo for Grand Egyptian Museum.png"
                  alt="Grand Egyptian Museum Logo"
                  width={40}
                  height={40}

                  className="object-contain mix-blend-multiply"
                />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold tracking-tighter ">The Egyptian Museum</h2>
                <p className="text-[#D4AF37] text-[10px] tracking-[0.2em] font-light uppercase italic">Eternal Civilization</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed italic">
              "Man fears time, but time fears the pyramids." Journey through the gates of history.
            </p>
            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 flex items-center justify-center border border-gray-800 rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 1: Explore */}
          <div>
            <h3 className="text-[#D4AF37] font-bold mb-2 tracking-widest uppercase text-sm">Explore</h3>
            <p className="text-[10px] text-shadow-gray-100 mb-5 tracking-[0.3em]">𓀀 𓀁 𓀂 𓀃</p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">The Golden Collection</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">Royal Mummies</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">Virtual Reality Tour</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">Museum Library</a></li>
            </ul>
          </div>

          {/* Column 2: Plan Visit */}
          <div>
            <h3 className="text-[#D4AF37] font-bold mb-2 tracking-widest uppercase text-sm">Plan Visit</h3>
            <p className="text-[10px] text-shadow-gray-100 mb-5 tracking-[0.3em]">𓉐 𓉑 𓉒 𓉓</p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2 underline underline-offset-4 decoration-[#D4AF37]/30">
                <Ticket size={14} /> <a href="#">Book Tickets Online</a>
              </li>
              <li><a href="#" className="hover:text-white transition">Opening Hours</a></li>
              <li><a href="#" className="hover:text-white transition">Guided Tours</a></li>
              <li><a href="#" className="hover:text-white transition">Photography Permits</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-[#D4AF37] font-bold mb-2 tracking-widest uppercase text-sm">Contact</h3>
            <p className="text-[10px] text-shadow-gray-100 mb-5 tracking-[0.3em]">𓄿 𓅀 𓅁 𓅂</p>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#D4AF37]" />
                <span>Tahrir Square, Cairo, Egypt</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#D4AF37]" />
                <span>legacy@egyptianmuseum.gov</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#D4AF37]" />
                <span>+20 2 25782452</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Glassmorphism Newsletter Box */}
        <div className="relative group p-[1px] rounded-[2.5rem] overflow-hidden mb-12 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent">
  <div className="bg-gradient-to-br from-[#0A0A0A]/95 to-[#111]/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] flex flex-col lg:flex-row items-center justify-between gap-12 border border-white/5 relative overflow-hidden">
    
    {/* إضاءة خلفية بتنور خفيف جوا الكارت */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-50"></div>

    {/* الجزء الأيسر: النص */}
    <div className="text-center lg:text-left relative z-10 flex-1">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-4 border border-[#D4AF37]/20">
        <Smartphone size={14} />
        <span className="text-[10px] font-black uppercase tracking-widest">Official Mobile App</span>
      </div>
      <h4 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-white">
        Carry the <span className="text-[#D4AF37] italic">Legacy</span> With You
      </h4>
      <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
        Unlock exclusive AR tours, multi-language audio guides, and your personal artifact vault. Download the Grand Egyptian Museum app to elevate your visit.
      </p>
    </div>

    {/* الجزء الأيمن: أزرار التحميل */}
    <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4 relative z-10 items-center">
      
      {/* زرار أبل (App Store) */}
      <button className="flex items-center justify-center gap-3 bg-white text-black px-6 py-3.5 rounded-2xl hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(255,255,255,0.1)] w-full sm:w-auto">
        {/* تقدر تحط أيقونة Apple هنا لو بتستخدم مكتبة زي react-icons */}
        <div className="text-left">
          <div className="text-[9px] uppercase tracking-widest text-gray-600 font-black mb-0.5">Download on the</div>
          <div className="text-base font-bold leading-none">App Store</div>
        </div>
      </button>

      {/* زرار جوجل (Google Play) */}
      <button className="flex items-center justify-center gap-3 bg-[#111] border border-white/20 text-white px-6 py-3.5 rounded-2xl hover:bg-white/5 hover:border-[#D4AF37] transition-all w-full sm:w-auto group/btn">
        <div className="text-left">
          <div className="text-[9px] uppercase tracking-widest text-gray-400 font-black mb-0.5 group-hover/btn:text-[#D4AF37] transition-colors">GET IT ON</div>
          <div className="text-base font-bold leading-none">Google Play</div>
        </div>
      </button>
      
      {/* لمسة فخامة: QR Code (بيظهر في الشاشات الكبيرة بس) */}
      <div className="hidden xl:flex flex-col items-center justify-center w-20 h-20 bg-white/5 border border-white/10 rounded-2xl p-3 group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all cursor-crosshair">
        <QrCode className="text-[#D4AF37] w-full h-full opacity-80 group-hover:scale-110 transition-transform" strokeWidth={1.5}/>
      </div>
    </div>

  </div>
</div>

        {/* 5. Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-100 uppercase tracking-widest">
          <p>© 2026 Ministry of Tourism and Antiquities. All Rights Reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#D4AF37] transition">Privacy Policy</a>
            <a href="#" className="hover:text-[#D4AF37] transition">Artifact Licensing</a>
            <a href="#" className="hover:text-[#D4AF37] transition">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PremiumFooter;
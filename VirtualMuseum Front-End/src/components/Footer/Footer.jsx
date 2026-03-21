import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Ticket, Award, Globe } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import img from '../../../public/assets/images/Logo for Grand Egyptian Museum.png';

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
                  src={img} // الصورة اللي معاك حالياً
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
        <div className="relative group p-[1px] rounded-3xl overflow-hidden mb-12 bg-gradient-to-r from-transparent via-gray-700 to-transparent">
          <div className="bg-[#0A0A0A]/80 backdrop-blur-xl p-8 rounded-[23px] flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/5">
            <div className="text-center lg:text-left">
              <h4 className="text-xl font-bold mb-1 tracking-tight italic">Join the Inner Circle</h4>
              <p className="text-gray-500 text-sm italic">Receive monthly insights into Ancient Egypt directly from our curators.</p>
            </div>
            <div className="flex w-full lg:w-auto gap-3">
              <input 
                type="email" 
                placeholder="The Pharaoh's scribe email..." 
                className="bg-white/5 border border-white/10 rounded-full px-6 py-3 w-full lg:w-80 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all text-sm"
              />
              <button className="bg-[#D4AF37] hover:bg-[#B8962E] text-black px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-yellow-600/20 transition-all active:scale-95 whitespace-nowrap">
                SUBSCRIBE
              </button>
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
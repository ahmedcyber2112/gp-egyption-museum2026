"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Search, Heart, Bookmark, Menu, X, Sparkles, ChevronRight, Clock } from 'lucide-react';

// =====================================================================
// 1. مكون الزرار المغناطيسي (Magnetic Hover Effect)
// =====================================================================
const Magnetic = ({ children, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // 0.2 هي قوة الجذب المغناطيسي (كل ما تكبر الزرار يتحرك أبعد)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// =====================================================================
// 2. المكون الرئيسي (Pharaoh Navbar)
// =====================================================================
const PharaohNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cairoTime, setCairoTime] = useState("");
  const [isOpen, setIsOpen] = useState(false); // حالة المتحف (مفتوح ولا مقفول)
  const [savedCount, setSavedCount] = useState(0); 
  const [lovedCount, setLovedCount] = useState(0); 
  const pathname = usePathname();

  // ميزة شريط السكرول الملكي (Golden Scroll Progress)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/Categories', hasMegaMenu: true },
    { name: 'AI Assistant', href: '/AIAssistant', isSpecial: true },
    { name: 'About', href: '/About' },
    { name: 'Contact', href: '/Contact' },
  ];

  // تتبع السكرول وساعة القاهرة اللايف والعدادات
  useEffect(() => {
    // 1. تحديث عدادات المحفوظات واللايك
    const updateCounts = () => {
      // تحديث عداد السيف
      const saved = JSON.parse(localStorage.getItem('saved_artifacts') || '[]');
      setSavedCount(saved.length);

      // تحديث عداد القلوب (تم ربطه بـ lovedCount)
      const liked = JSON.parse(localStorage.getItem('liked_artifacts') || '[]');
      setLovedCount(liked.length);
    };

    updateCounts();
    window.addEventListener('update_saved', updateCounts);
    window.addEventListener('update_liked', updateCounts); 
    window.addEventListener('storage', updateCounts);

    // Scroll Logic
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // Live Museum Clock Logic (Cairo Time)
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', hour12: true };
      setCairoTime(now.toLocaleTimeString('en-US', options));
      
      const hour = parseInt(now.toLocaleTimeString('en-US', { timeZone: 'Africa/Cairo', hour: '2-digit', hour12: false }));
      setIsOpen(hour >= 9 && hour < 17);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('update_saved', updateCounts);
      window.removeEventListener('update_liked', updateCounts);
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        dir="ltr" 
        className={`fixed top-0 w-full z-50 transition-all duration-500 bg-[#050505]/90 [direction:ltr] ${
          isScrolled 
            ? 'bg-[#050505]/90 backdrop-blur-xl  shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
            : 'bg-black py-3'
        }`}
      >
        {/* شريط السكرول الملكي الذهبي */}
        <motion.div 
          style={{ scaleX, transformOrigin: '0%' }} 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#f9e596] to-[#D4AF37] z-50" 
        />

        {/* العلامات المائية */}
        <div className={`absolute inset-0 pointer-events-none flex justify-between items-center px-20 transition-opacity duration-500 ${isScrolled ? 'opacity-[0.03]' : 'opacity-0'}`}>
          <span className="text-7xl select-none -translate-x-10 text-white">𓂀</span>
          <span className="text-7xl select-none translate-x-10 -scale-x-100 text-white">𓀛</span>
        </div>

        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 px-6 relative z-10">
          
          {/* Logo & Live Clock */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 min-w-max cursor-pointer group">
              <div className="bg-gradient-to-br from-[#D4AF37] to-[#8A6D3B] p-1.5 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-300">
                <Image src="/assets/images/Logo for Grand Egyptian Museum.png" alt="GEM Logo" width={35} height={35} className="mix-blend-multiply brightness-90" />
              </div>
              <div className="hidden lg:flex flex-col">
                <span className="text-white font-serif font-bold leading-none text-lg tracking-tight group-hover:text-[#D4AF37] transition-colors">The GEM</span>
                <span className="text-[#D4AF37] text-[9px] tracking-[0.2em] font-light uppercase mt-1">Grand Egyptian Museum</span>
              </div>
            </Link>

            <div className="hidden xl:flex items-center gap-2 border-l border-white/10 pl-6">
              <div className="flex flex-col">
                <span className="text-gray-400 text-[9px] tracking-widest uppercase flex items-center gap-1">
                  <Clock size={10} /> Cairo Time
                </span>
                <span className="text-white text-xs font-bold tracking-wider">{cairoTime || "Loading..."}</span>
              </div>
              <div className="flex items-center gap-1.5 ml-2 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-[9px] uppercase font-bold text-gray-300 tracking-wider">{isOpen ? 'Open' : 'Closed'}</span>
              </div>
            </div>
          </div>

          {/* Navigation & Mega Menu */}
          <ul className="hidden xl:flex items-center gap-8 text-sm font-medium text-gray-300 h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name} className="group/nav relative py-6">
                  <Link 
                    href={link.href} 
                    className={`uppercase text-xs tracking-widest transition-colors duration-300 flex items-center gap-1.5 ${
                      isActive ? 'text-[#D4AF37] font-bold' : 'hover:text-white'
                    }`}
                  >
                    {link.isSpecial && <span className="text-[14px] group-hover/nav:animate-pulse">𓂀</span>}
                    {link.name}
                  </Link>
                  <div className={`absolute bottom-0 left-0 h-[2px] bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'}`}></div>

                  {link.hasMegaMenu && (
                    <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[800px] bg-[#0a0a0f]/95 backdrop-blur-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-3xl opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-500 transform translate-y-4 group-hover/nav:translate-y-0 p-8 grid grid-cols-3 gap-6 pointer-events-none group-hover/nav:pointer-events-auto">
                      <Link href="/Categories?filter=Statues" className="group/card relative overflow-hidden rounded-2xl h-48 cursor-pointer">
                        <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/20 transition-colors z-10"></div>
                        <Image src="/assets/images/nefertiti.png" alt="Statues" layout="fill" objectFit="cover" className="group-hover/card:scale-110 transition-transform duration-700" />
                        <div className="absolute bottom-0 left-0 w-full p-4 z-20 bg-gradient-to-t from-black to-transparent">
                          <h4 className="text-white font-serif text-lg font-bold">Statues</h4>
                          <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity transform translate-y-2 group-hover/card:translate-y-0">Explore <ChevronRight size={12}/></span>
                        </div>
                      </Link>

                      <Link href="/Categories?filter=Jewelry" className="group/card relative overflow-hidden rounded-2xl h-48 cursor-pointer">
                        <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/20 transition-colors z-10"></div>
                        <Image src="/assets/images/tut-mask.jpg" alt="Jewelry" layout="fill" objectFit="cover" className="group-hover/card:scale-110 transition-transform duration-700" />
                        <div className="absolute bottom-0 left-0 w-full p-4 z-20 bg-gradient-to-t from-black to-transparent">
                          <h4 className="text-white font-serif text-lg font-bold">Jewelry</h4>
                          <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity transform translate-y-2 group-hover/card:translate-y-0">Explore <ChevronRight size={12}/></span>
                        </div>
                      </Link>

                      <Link href="/Categories?filter=Papyri" className="group/card relative overflow-hidden rounded-2xl h-48 cursor-pointer">
                        <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/20 transition-colors z-10"></div>
                        <Image src="/assets/images/rosetta.webp" alt="Papyri" layout="fill" objectFit="cover" className="group-hover/card:scale-110 transition-transform duration-700" />
                        <div className="absolute bottom-0 left-0 w-full p-4 z-20 bg-gradient-to-t from-black to-transparent">
                          <h4 className="text-white font-serif text-lg font-bold">Ancient Papyri</h4>
                          <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity transform translate-y-2 group-hover/card:translate-y-0">Explore <ChevronRight size={12}/></span>
                        </div>
                      </Link>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Search & Magnetic Actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="hidden sm:flex items-center gap-2 text-gray-400 border-r border-white/10 pr-6">
              <Magnetic>
                <Link href="/Love">
                  <div className="relative p-2 cursor-pointer hover:text-red-500 transition-colors">
                    <Heart size={20} />
                    {lovedCount > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-[#050505] shadow-lg">
                        {lovedCount}
                      </span>
                    )}
                  </div>
                </Link>
              </Magnetic>

              <Magnetic>
                <Link href="/favorites">
                  <div className="relative p-2 cursor-pointer hover:text-[#D4AF37] transition-colors">
                    <Bookmark size={20} />
                    {savedCount > 0 && (
                      <span className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-[#050505] shadow-lg">
                        {savedCount}
                      </span>
                    )}
                  </div>
                </Link>
              </Magnetic>
            </div>
            
            <div className="flex items-center gap-6">
              <Link href="/Signin" className="text-[11px] uppercase tracking-widest font-bold text-gray-300 hover:text-[#D4AF37] hidden md:block transition-colors">
                Sign In
              </Link>
              
              <Magnetic>
                <Link href="/Booking" className="hidden sm:block">
                  <button className="bg-gradient-to-r from-[#D4AF37] to-[#B8962E] text-black px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] transition-shadow">
                    Book Ticket
                  </button>
                </Link>
              </Magnetic>
              
              <button className="xl:hidden text-white hover:text-[#D4AF37] transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-[#050505]/95 flex flex-col justify-center items-center"
          >
            <button className="absolute top-8 right-8 text-gray-400 hover:text-[#D4AF37] transition-colors p-2" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={36} />
            </button>

            <div className="flex flex-col items-center gap-8 mt-10">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.name} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
                    <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={`text-3xl font-serif font-black uppercase tracking-widest transition-colors flex items-center gap-3 ${isActive ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}>
                      {link.isSpecial && <span className="text-2xl">𓂀</span>}
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: navLinks.length * 0.1 }} className="mt-8 flex flex-col items-center gap-6 w-full px-8">
                <Link href="/Booking" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center bg-gradient-to-r from-[#D4AF37] to-[#B8962E] text-black py-4 rounded-full font-black uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-shadow">
                  Book Your Tickets
                </Link>
                <div className="flex gap-8 text-[#D4AF37] mt-2">
                  <div className="flex flex-col items-center gap-1 cursor-pointer"><Heart size={24} /><span className="text-[10px] uppercase">Saved ({lovedCount})</span></div>
                  <div className="flex flex-col items-center gap-1 cursor-pointer"><Bookmark size={24} /><span className="text-[10px] uppercase">Bookmarks ({savedCount})</span></div>
                </div>
                <Link href="/Signin" onClick={() => setIsMobileMenuOpen(false)} className="text-sm uppercase tracking-widest text-gray-400 hover:text-white">
                  Sign In to Account
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PharaohNavbar;
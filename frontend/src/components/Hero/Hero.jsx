"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function Hero() {
  const sliderImages = [
    '/assets/images/20221104-dsc_4372-edit-copy.jpeg',
    '/assets/images/grand-egyptian-museum-at-night.jpg',
    '/assets/images/The-Grand-Egyptian-Museum.jpg',
  ];

  // --- Parallax Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // جعل الحركة "ناعمة" جداً باستخدام Spring
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  // تحويل حركة الماوس لقيم إزاحة عكسية للتمثال
  const statueX = useTransform(mouseX, [-500, 500], [20, -20]);
  const statueY = useTransform(mouseY, [-500, 500], [10, -10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full bg-[#050505] overflow-hidden font-sans cursor-default"
    >
      
      {/* 1. السلايدر الخلفي (Layer 0) */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, Navigation]}
          speed={1500}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="h-full w-full"
        >
          {sliderImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full overflow-hidden">
                <Image 
                  src={img} 
                  alt="Museum View" 
                  fill 
                  sizes="100vw"
                  className="object-cover opacity-40 animate-[slowPan_20s_linear_infinite]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. الإضاءة الديناميكية (Layer 1) - هالة ذهبية خلف التمثال */}
      <motion.div 
        style={{ x: statueX, y: statueY }}
        className="absolute left-[5%] bottom-[10%] z-10 w-[400px] h-[400px] bg-[#D4AF37]/20 rounded-full blur-[120px] animate-pulse"
      />

      {/* 3. تمثال توت عنخ آمون (Layer 2) - Parallax + Reversed */}
      <motion.div 
        style={{ x: statueX, y: statueY, scaleX: -1 }}
        className="absolute left-[-5%] bottom-0 z-20 w-[45%] md:w-[38%] pointer-events-none select-none drop-shadow-[0_0_50px_rgba(212,175,55,0.2)]"
      >
        <Image 
          src="/assets/images/Tout-mask-1640.png" 
          alt="Tutankhamun Mask"
          width={1000}
          height={1200}
          className="w-full h-auto object-contain"
          priority
        />
      </motion.div>

      {/* 4. المحتوى النصي (Layer 3) - Scroll Reveal */}
      <div className="relative z-30 h-full flex items-center max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="ml-auto md:w-3/5 text-left">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
            <span className="text-[#D4AF37] uppercase tracking-[0.6em] text-[11px] font-black italic">
              Legacy Of Kings
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-[9.5rem] font-serif font-black text-white leading-[0.8] uppercase tracking-tighter mb-10"
          >
            Divine <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#8A6D3B]">
              Origins
            </span>
          </motion.h1>

          <motion.div 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1, delay: 0.5 }}
>
  <Link href="/community">
    <button className="bg-gradient-to-r from-[#D4AF37] to-[#B8962E] text-black px-12 py-5 rounded-full font-black uppercase text-[11px] tracking-widest hover:scale-110 transition-all shadow-2xl shadow-yellow-900/40">
      Start Community
    </button>
  </Link>
</motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slowPan {
          0%, 100% { transform: scale(1) translateX(0); }
          50% { transform: scale(1.1) translateX(-3%); }
        }
      `}</style>

    </section>
  );
}
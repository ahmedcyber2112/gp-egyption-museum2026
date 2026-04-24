"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, Smartphone, Users, GraduationCap, Ticket, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '../../lib/authStorage';
import { consumePostLoginAction, setPostLoginAction, setPostLoginRedirect } from '../../lib/authGate';
import LoginRequiredModal from '../Auth/LoginRequiredModal';

const services = [
  {
    title: "Expert Guided Tours",
    desc: "Enjoy interactive tours with expert guides who bring history to life.",
    icon: <Users className="w-8 h-8 text-[#D4AF37]" />,
    link: "/tours",
  }
  // تم إخفاء باقي الخدمات بناءً على طلبك
  // {
  //   title: "AR Experience App",
  //   desc: "Experience history with advanced AR technology on your smartphone.",
  //   icon: <Smartphone className="w-8 h-8 text-[#D4AF37]" />,
  // },
  // {
  //   title: "Multi-language Audio Guide",
  //   desc: "Listen to details in your preferred language with our high-tech guides.",
  //   icon: <Headphones className="w-8 h-8 text-[#D4AF37]" />,
  // },
  // {
  //   title: "Kids Educational Programs",
  //   desc: "Fun educational workshops and activities designed specifically for children.",
  //   icon: <GraduationCap className="w-8 h-8 text-[#D4AF37]" />,
  // },
];

export default function ServicesCTA() {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  React.useEffect(() => {
    if (!isLoggedIn()) return;
    const action = consumePostLoginAction();
    if (action?.type === 'open-tours') {
      router.push('/tours');
    }
  }, [router]);

  const handleOpenTours = () => {
    if (isLoggedIn()) {
      router.push('/tours');
      return;
    }
    setPostLoginRedirect('/');
    setPostLoginAction({ type: 'open-tours' });
    setShowLoginModal(true);
  };

  return (
    <section className="bg-white py-24 px-6 relative overflow-hidden">
      
      {/* لمسة جمالية: رموز فرعونية باهتة جداً في الخلفية (باللون الذهبي الخفيف) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex justify-around items-center text-[20rem] font-black text-[#000000] select-none">
        <span>𓀀</span><span>𓁐</span><span>𓃠</span>
      </div>

      {/* خط زخرفي علوي */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-[1px] bg-[#D4AF37]"></div>
            <p className="uppercase tracking-[0.3em] text-[10px] font-black text-[#D4AF37]">Special Features</p>
            <div className="w-8 h-[1px] bg-[#D4AF37]"></div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-black text-[#050505] mb-6 leading-tight"
          >
            Our Distinguished <span className="text-[#D4AF37] italic">Services</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed"
          >
            We offer a unique museum experience with a range of innovative services designed to make your visit truly unforgettable.
          </motion.p>
        </div>

        {/* Services Cards - تم التعديل لتوسيط الكارت الوحيد */}
        <div className="grid grid-cols-1 max-w-md mx-auto gap-6 mb-32">
          {services.map((service, index) => {
            const CardContent = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-[#fafafa] rounded-[2rem] p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.1)] hover:border-[#D4AF37]/30 flex flex-col items-start text-left group transition-all h-full cursor-pointer relative overflow-hidden"
              >
                {/* تأثير لون خفيف عند الـ Hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

                <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-50 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-serif font-bold text-[#050505] mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                  {service.desc}
                </p>

                <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-[#050505] transition-colors">
                  Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );

            return service.link ? (
              <button
                type="button"
                onClick={handleOpenTours}
                key={index}
                className="block h-full text-left"
              >
                {CardContent}
              </button>
            ) : (
              <div key={index} className="h-full">{CardContent}</div>
            );
          })}
        </div>

        {/* Call To Action (The Journey) - جوز بيضاوي فخم */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-[#050505] rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden shadow-2xl"
        >
          {/* إضاءة داخل الكارت الأسود */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none"></div>

          <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-6 relative z-10">
            Ready for Your Journey <span className="text-[#D4AF37]">Through History?</span>
          </h2>
          
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Book your ticket now and enjoy an unforgettable experience in the heart of Egyptian civilization. The past is waiting for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
            
            {/* زرار الحجز مغلف بـ Link */}
            <Link href="/Booking" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#D4AF37] text-[#050505] px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:bg-white transition-colors w-full justify-center"
              >
                <Ticket size={18} />
                Book Your Ticket
              </motion.button>
            </Link>

            {/* زرار التواصل مغلف بـ Link */}
            <Link href="/Contact" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-white hover:text-[#050505] transition-colors w-full justify-center"
              >
                <Mail size={18} />
                Contact Us
              </motion.button>
            </Link>

          </div>
        </motion.div>

      </div>
      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        nextPath="/"
        title="Sign in to book guided tours"
        message="Please sign in to continue to Expert Guided Tours booking."
      />
    </section>
  );
}
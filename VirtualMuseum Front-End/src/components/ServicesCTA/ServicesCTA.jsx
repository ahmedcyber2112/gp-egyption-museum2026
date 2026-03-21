"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, Smartphone, Users, GraduationCap, Ticket, Mail } from 'lucide-react';

const services = [
  {
    title: "Expert Guided Tours",
    desc: "Enjoy interactive tours with expert guides who bring history to life.",
    icon: <Users className="w-8 h-8 text-red-500" />,
  },
  {
    title: "AR Experience App",
    desc: "Experience history with advanced AR technology on your smartphone.",
    icon: <Smartphone className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Multi-language Audio Guide",
    desc: "Listen to details in your preferred language with our high-tech guides.",
    icon: <Headphones className="w-8 h-8 text-gray-400" />,
  },
  {
    title: "Kids Educational Programs",
    desc: "Fun educational workshops and activities designed specifically for children.",
    icon: <GraduationCap className="w-8 h-8 text-yellow-500" />,
  },
];

export default function ServicesCTA() {
  return (
    <section className="bg-[#B06D24] py-24 px-6 relative overflow-hidden">
      {/* لمسة جمالية: رموز فرعونية باهتة جداً في الخلفية */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex justify-around items-center text-[10rem] font-black text-white select-none">
        <span>𓀀</span><span>𓁐</span><span>𓃠</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 text-white">
          <p className="uppercase tracking-[0.3em] text-sm mb-4 opacity-90">Special Features</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Distinguished Services</h2>
          <p className="max-w-2xl mx-auto opacity-80">
            We offer a unique museum experience with a range of innovative services designed to make your visit unforgettable.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-xl flex flex-col items-start text-left group transition-all"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Call To Action (The Journey) */}
        <div className="text-center text-white">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6"
          >
            Ready for Your Journey Through History?
          </motion.h2>
          <p className="text-lg opacity-90 mb-10 max-w-3xl mx-auto">
            Book your ticket now and enjoy an unforgettable experience in the heart of Egyptian civilization. 
            The past is waiting for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-900 px-10 py-4 rounded-xl font-bold flex items-center gap-3 shadow-2xl hover:bg-gray-100 transition-colors"
            >
              <Ticket size={20} />
              Book Your Ticket
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#1A1A40] text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 shadow-2xl hover:bg-[#25255a] transition-colors"
            >
              <Mail size={20} />
              Contact Us
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
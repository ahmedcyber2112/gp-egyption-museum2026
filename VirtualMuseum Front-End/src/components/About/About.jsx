"use client";

import React, { useState } from 'react';

import { Target, Eye, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import {
  Ticket, Headphones, Smartphone, Users,
  Library, Palette, Film, Globe
} from 'lucide-react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

// مكون الإحصائيات (Stats) مع Intersection Observer
const StatBox = ({ value, suffix, label, decimals }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-black text-[#F9FAFB] mb-2 drop-shadow-sm">
        {inView ? <CountUp end={value} duration={3} decimals={decimals || 0} /> : "0"}
        <span>{suffix}</span>
      </div>
      <p className="text-[#D4AF37] uppercase text-[10px] font-bold tracking-[0.3em]">{label}</p>
    </div>
  );
};

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState(0);

  const team = [
    {
      id: 1,
      name: "Gerges Malak",
      role: "Lead Systems Architect",
      skills: [90, 85, 95, 80, 70, 90],
      contribution: "Developing the software structure and connecting the APIs with the SQL database.",
      phrase: "𓀀 Mastery is the secret of immortality"
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      role: "Senior 3D Visualizer",
      skills: [40, 98, 50, 70, 90, 60],
      contribution: "Building 3D models and improving lighting and shadows.",
      phrase: "𓁹 "
    }
  ];

  const services = [
    { icon: <Ticket size={32} />, title: "Electronic Ticketing", desc: "Easy and fast online ticket booking system" },
    { icon: <Headphones size={32} />, title: "Audio Guides", desc: "Interactive audio tours in multiple languages" },
    { icon: <Smartphone size={32} />, title: "AR Experience App", desc: "Interactive 3D experience for artifacts" },
    { icon: <Users size={32} />, title: "Guided Tours", desc: "Private tours with specialized guides" },
    { icon: <Library size={32} />, title: "Digital Library", desc: "Free access to thousands of documents" },
    { icon: <Palette size={32} />, title: "Workshops", desc: "Educational and artistic programs" },
    { icon: <Film size={32} />, title: "Cultural Events", desc: "Regular exhibitions and seminars" },
    { icon: <Globe size={32} />, title: "Virtual Tours", desc: "Explore the museum from anywhere" },
  ];

  const stats = [
    { value: 50, suffix: "K+", label: "Artifacts" },
    { value: 2.1, suffix: "M", label: "Annual Visitors", decimals: 1 },
    { value: 120, suffix: "+", label: "Years of History" },
    { value: 15, suffix: "+", label: "International Awards" },
  ];

  const data = [
    {
      title: "Our Vision",
      text: "To be the leading digital destination for Egyptian heritage, connecting past and present through modern technology",
      icon: <Target className="w-8 h-8 text-[#D4AF37]" />,
      delay: 0.1
    },
    {
      title: "Our Mission",
      text: "To provide an exceptional digital museum experience that enables everyone to explore Egypt's ancient history easily and interactively",
      icon: <Eye className="w-8 h-8 text-[#D4AF37]" />,
      delay: 0.2
    },
    {
      title: "Our Values",
      text: "Commitment to preserving heritage, technical innovation, and comprehensive education for all",
      icon: <Award className="w-8 h-8 text-[#D4AF37]" />,
      delay: 0.3
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#1A202C] selection:bg-[#D4AF37] selection:text-white font-sans">

      {/* 1. Hero Section - ألوان مريحة للعين */}
      <section className="relative h-[65vh] flex flex-col justify-center items-center overflow-hidden border-b border-gray-200 bg-white">

        {/* الخلفية الهيروغليفية باهتة جداً */}
        <div className="absolute opacity-[0.04] text-[25rem] font-serif select-none pointer-events-none text-[#4d3b3b] z-0">𓂀</div>

        {/* ================= تمثال أنوبيس الأيسر ================= */}
        <motion.img
          src="/assets/images/anubis_right.png" // قم بحفظ صورة filename=image_2.png بهذا الاسم في مجلد assets
          alt="Anubis Statue Left"
          initial={{ x: 150, opacity: 0 }} // يبدأ خارج الشاشة من اليسار وبشفافية 0
          animate={{ x: 0, opacity: 1 }}    // يدخل لمكانه وبشفافية 1
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }} // حركة ناعمة مع تأخير بسيط
          className="absolute left-0 bottom-0 h-[70%] z-10 object-contain hidden md:block select-none pointer-events-none scale-x-[-1] drop-shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
        />

        {/* العناوين والنصوص (في المنتصف) */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-serif font-black uppercase text-center relative z-20 tracking-tighter text-gray-950"
        >
          The <span className="text-[#D4AF37]">Architects</span>
        </motion.h1>

        <div className="relative z-20 text-center px-6 max-w-3xl">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#D4AF37] uppercase tracking-[0.5em] text-[10px] font-bold mt-6"
          >
            Behind the Grand Egyptian Museum Project
          </motion.p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-gray-600 text-sm mt-6 leading-loose font-medium italic"
          >
            "We are a team passionate about Egyptian heritage, working to create an exceptional digital experience
            that combines the greatness of history with modern technology."
          </motion.p>
        </div>

        {/* ================= تمثال أنوبيس الأيمن ================= */}
        <motion.img
          src="/assets/images/anubis_right.png" // قم بحفظ صورة filename=image_3.png بهذا الاسم في مجلد assets
          alt="Anubis Statue Right"
          initial={{ x: 150, opacity: 0 }} // يبدأ خارج الشاشة من اليمين وبشفافية 0
          animate={{ x: 0, opacity: 1 }}   // يدخل لمكانه وبشفافية 1
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }} // حركة ناعمة مع تأخير بسيط
          className="absolute right-0 bottom-0 h-[70%] z-10 object-contain hidden md:block select-none pointer-events-none drop-shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
        />

      </section>

      <section className="py-20 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item.delay }}
              viewport={{ once: true }}
              className="relative group p-8 rounded-2xl bg-white/5 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-500 text-center"
            >
              {/* الخلفية المضيئة عند الهوفر */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              {/* Icon Container */}
              <div className="relative z-10 mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold text-white mb-4 tracking-wide uppercase">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
                  {item.text}
                </p>
              </div>

              {/* زخرفة فرعونية سفلية بسيطة */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-[#D4AF37]/30 group-hover:w-24 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </section>


      {/* 2. Team Skills Matrix - عكس الاتجاه */}
      {/* أضفنا bg-white هنا لتمتد بعرض الشاشة بالكامل */}
      <section className="w-full bg-white py-24 px-6" dir="ltr">
        <div className="max-w-7xl mx-auto">

          {/* 1. Header Section */}
          <div className="text-center mb-24">
            <span className="text-[#D4AF37] font-bold uppercase tracking-[0.4em] text-[10px] block mb-2">
              Meet the creative team behind this digital platform
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-black uppercase tracking-tighter mt-4 text-[#1A202C]">
              Development <span className="text-[#D4AF37]">Team</span>
            </h2>
            <div className="h-1.5 w-16 bg-[#D4AF37] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* 2. Team Members List (Side Menu - Left) */}
            <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
              <h3 className="text-[#1A202C] font-black uppercase tracking-tighter text-2xl mb-8 border-l-4 border-[#D4AF37] pl-4">
                The Builders
              </h3>
              {team.map((member, index) => (
                <motion.div
                  key={member.id}
                  onClick={() => setSelectedMember(index)}
                  whileHover={{ x: 10 }}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all group relative overflow-hidden ${selectedMember === index
                      ? 'bg-[#1A202C] border-[#1A202C] text-white shadow-xl scale-105'
                      : 'bg-[#F9FAFB] border-gray-100 text-gray-500 hover:border-[#D4AF37]'
                    }`}
                >
                  <h4 className="font-bold text-xl mb-1">
                    {member.name}
                  </h4>
                  <span className={`text-[10px] uppercase tracking-widest font-black ${selectedMember === index ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                    {member.role}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* 3. Detailed Content Area (Right Card) */}
            <div className="lg:col-span-8 bg-[#F9FAFB] rounded-[3rem] border border-gray-100 p-8 md:p-12 shadow-sm relative order-1 lg:order-2">
              <h3 className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-10 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-gray-300"></span> Expertise Analysis
              </h3>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMember}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1 space-y-6">
                      <h2 className="text-[#1A202C] text-3xl md:text-4xl font-serif italic leading-tight">
                        "{team[selectedMember].phrase}"
                      </h2>
                      <p className="text-gray-500 leading-relaxed border-l-4 border-[#D4AF37] pl-6 text-lg font-medium">
                        {team[selectedMember].contribution}
                      </p>
                    </div>

                    {/* Radar Chart Area */}
                    <div className="w-full md:w-80 bg-white p-6 rounded-3xl shadow-inner border border-gray-50">
                      <Radar
                        data={{
                          labels: ['Front', '3D', 'SQL', 'Mgmt', 'UX', 'Res'],
                          datasets: [{
                            data: team[selectedMember].skills,
                            backgroundColor: 'rgba(212, 175, 55, 0.15)',
                            borderColor: '#D4AF37',
                            borderWidth: 2,
                            pointBackgroundColor: '#1A202C'
                          }]
                        }}
                        options={{
                          scales: {
                            r: {
                              grid: { color: '#F1F5F9' },
                              angleLines: { color: '#F1F5F9' },
                              pointLabels: { color: '#94A3B8', font: { size: 10 } },
                              ticks: { display: false }
                            }
                          },
                          plugins: { legend: { display: false } }
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Website Services - توسيط كامل وألوان مريحة */}
      <section className="bg-[#050505] py-32 px-6 relative overflow-hidden">
        {/* إضافة لمسة خلفية فرعونية خفيفة */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none select-none text-[200px] flex justify-center items-center font-serif">
          𓉔 𓉗 𓉘 𓉖
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* الهيدر (Title Section) */}
          <div className="text-center mb-24">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#D4AF37] font-bold uppercase tracking-[0.4em] text-[10px] block mb-2"
            >
              Digital Excellence
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-serif font-black uppercase tracking-tighter mt-4 text-white">
              Website <span className="text-[#D4AF37]">Services</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6"></div>
          </div>

          {/* شبكة الخدمات (Services Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -12 }}
                className="flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-white/5 border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 hover:bg-white/[0.08] transition-all duration-500 group relative"
              >
                {/* الأيقونة (Icon Container) */}
                <div className="w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center text-[#D4AF37] mb-8 border border-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.05)] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 group-hover:rotate-[10deg] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                  {/* تأكد إن الأيقونات هنا (s.icon) واخدة size مناسب زي 32 */}
                  {React.cloneElement(s.icon, { size: 32 })}
                </div>

                {/* النصوص (Typography) */}
                <h3 className="font-serif font-bold text-xl mb-4 uppercase tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
                  {s.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {s.desc}
                </p>

                {/* زخرفة زاوية بسيطة تظهر عند الهوفر */}
                <div className="absolute top-4 right-4 text-[#D4AF37]/0 group-hover:text-[#D4AF37]/20 transition-all text-xl select-none">
                  𓋹
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Achievements in Numbers - تباين عالٍ للأرقام */}
      <section className="bg-[#F9FAFB] py-32 px-6">
        <div className="max-w-7xl mx-auto bg-[#1A202C] rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden shadow-3xl">
          <div className="absolute top-[-10%] left-[-10%] opacity-[0.03] text-[25rem] pointer-events-none select-none text-white font-serif">𓋹</div>
          <h2 className="text-[#D4AF37] font-bold uppercase tracking-[0.5em] text-xs mb-24 relative z-10 italic">Project Statistics</h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
            {stats.map((stat, i) => (
              <StatBox key={i} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Join Our Journey */}
      <section className="bg-white text-black py-32 px-6 text-center">
        <h2 className="text-5xl font-black mb-8 uppercase tracking-tighter">Join Our Journey</h2>
        <p className="text-gray-500 mb-12 max-w-2xl mx-auto text-lg font-medium">Ready to explore 7,000 years of history through a modern lens ?</p>
        <div className="flex flex-wrap justify-center gap-6">
          <button className="bg-[#1A202C] text-white px-14 py-5 rounded-full font-bold shadow-2xl hover:bg-[#D4AF37] transition-all active:scale-95 uppercase text-[11px] tracking-widest">Start Exploring</button>
          <button className="bg-white text-gray-900 border border-gray-200 px-14 py-5 rounded-full font-bold hover:bg-gray-50 transition-all uppercase text-[11px] tracking-widest">Contact Us</button>
        </div>
      </section>

    </div>
  );
}
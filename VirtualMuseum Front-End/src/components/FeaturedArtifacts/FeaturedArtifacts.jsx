"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';

const artifacts = [
  {
    id: 1,
    title: "Tutankhamun's Golden Mask",
    description: "The iconic golden death mask of the young pharaoh Tutankhamun, discovered in 1922.",
    age: "3,300 years old",
    location: "Egyptian Museum, Cairo",
    rating: 4.9,
    category: "Royal Treasures",
    image: "/assets/images/tut-mask.jpg"
    },
  {
    id: 2,
    title: "The Great Sphinx Statue",
    description: "A magnificent limestone statue depicting a mythical creature with a lion's body and a human head.",
    age: "4,500 years old",
    location: "Giza Plateau",
    rating: 4.8,
    category: "Statues & Sculptures",
    image: "/assets/images/rosetta.webp"
  },
  {
    id: 3,
    title: "Hieroglyphic Stone Tablet",
    description: "Ancient stone tablet featuring beautifully carved hieroglyphics telling stories of divine kings.",
    age: "3,000 years old",
    location: "Luxor Temple",
    rating: 4.7,
    category: "Inscriptions & Texts",
    image: "/assets/images/nefertiti.webp"
  }
];

export default function FeaturedArtifacts() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* 1. خلفية الرموز الفرعونية (SVG Pattern) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hieroPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              {/* رسمة مفتاح الحياة - Ankh */}
              <path d="M30 20 c0-5 4-9 9-9 s9 4 9 9 c0 4-2 7-5 8 c3 1 5 4 5 8 c0 5-4 9-9 9 s-9-4-9-9 c0-4 2-7 5-8 c-3-1-5-4-5-8 z" 
                    fill="none" stroke="#D4AF37" strokeWidth="1" transform="scale(0.6) translate(20, 20)"/>
              {/* عين حورس - Eye of Horus */}
              <path d="M120 50 q25-25 50 0 q-25 25-50 0 M145 35 v25 M135 60 l10 10" 
                    fill="none" stroke="#D4AF37" strokeWidth="1" transform="scale(0.7) translate(80, 100)"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hieroPattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header - العنوان */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#D4AF37] font-bold tracking-[0.3em] text-xs uppercase mb-3 block"
          >
            Featured Collection
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900"
          >
            Our Most Famous <span className="italic text-[#D4AF37]">Artifacts</span>
          </motion.h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Explore the most prominent archaeological treasures that tell the stories of the great Egyptian civilization.
          </p>
        </div>

        {/* Artifacts Grid - شبكة القطع */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {artifacts.map((art, index) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100"
            >
              {/* Image Section */}
              <div className="relative h-[280px] overflow-hidden">
                <img 
                  src={art.image} 
                  alt={art.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Badge (Category) */}
                <div className="absolute top-5 left-5 bg-[#D4AF37]/90 backdrop-blur-md text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  {art.category}
                </div>
                {/* Rating Overlay */}
                <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-1">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold text-gray-800">{art.rating}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#D4AF37] transition-colors font-serif">
                  {art.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {art.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock size={14} className="text-[#D4AF37]" />
                      <span className="text-[11px] font-medium">{art.age}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin size={14} className="text-[#D4AF37]" />
                      <span className="text-[11px] font-medium">{art.location}</span>
                    </div>
                  </div>
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#D4AF37] group-hover:text-white transition-all shadow-sm"
                  >
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-[#212529] text-white rounded-full font-bold text-sm uppercase tracking-widest shadow-2xl hover:bg-[#D4AF37] transition-all flex items-center gap-3 mx-auto"
          >
            Explore More Artifacts
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowRight size={14} />
            </div>
          </motion.button>
        </div>
      </div>

    </section>
  );
}
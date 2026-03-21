"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Camera, Sparkles, ScanLine, Volume2, Image as ImageIcon, History } from 'lucide-react';

// --- 1. خريطة تحويل الحروف الإنجليزية إلى هيروغليفية (للمترجم) ---
const hieroglyphMap = {
  a: '𓄿', b: '𓃀', c: '𓋴', d: '𓂧', e: '𓇋', f: '𓆑', g: '𓎼', h: '𓉔', i: '𓇋',
  j: '𓆓', k: '𓎡', l: '𓃭', m: '𓅓', n: '𓈖', o: '𓍯', p: '𓊪', q: '𓈎', r: '𓂋',
  s: '𓋴', t: '𓏏', u: '𓅱', v: '𓆑', w: '𓅱', x: '𓐍', y: '𓇋', z: '𓊃', ' ': '  '
};

const translateToHieroglyphs = (text) => {
  return text.toLowerCase().split('').map(char => hieroglyphMap[char] || char).join(' ');
};

// --- 2. كروت الفضول (Curiosity Prompts) ---
const prompts = [
  { id: 1, title: "Mummy's Curse", text: "Is the Mummy's curse real?" },
  { id: 2, title: "Pyramid Alignment", text: "How did they align the pyramids with the stars?" },
  { id: 3, title: "Translate Name", text: "Translate my name to Hieroglyphs: 'Ahmed'" }
];

export default function AIAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  
  // Refs للتحكم في السكرول
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // السكرول الذكي (زي Gemini)
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "end" 
      });
    }
  };

  useEffect(() => {
    // لو مفيش رسايل، متعملش أي حاجة (عشان الصفحة متسحبش لتحت في الأول)
    if (messages.length === 0 && !isTyping) return;

    // setTimeout لضمان إن الـ DOM اترسم قبل ما يعمل السكرول
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages, isTyping]);

  // --- منطق محاكاة ذكاء الـ AI ---
  const handleSend = (text) => {
    if (!text.trim() && !isScanning) return;
    
    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // محاكاة تأخير التفكير للـ AI
    setTimeout(() => {
      let aiResponse = { id: Date.now() + 1, sender: 'ai', text: '', isHieroglyph: false, isScanResult: false };

      // 1. حالة الترجمة الهيروغليفية
      if (text.toLowerCase().includes('translate')) {
        const nameToTranslate = text.split(':')[1]?.trim() || "Visitor";
        aiResponse.isHieroglyph = true;
        aiResponse.text = `Here is how the Ancient Egyptians would write '${nameToTranslate}':`;
        aiResponse.hieroglyphText = translateToHieroglyphs(nameToTranslate);
      } 
      // 2. حالة الفحص البصري (Artifact Scanner)
      else if (isScanning) {
        aiResponse.isScanResult = true;
        aiResponse.text = "I have analyzed the image. This is the magnificent Bust of Nefertiti, crafted around 1345 BCE by the sculptor Thutmose.";
        aiResponse.image = "/assets/images/ai-curator.png"; // تأكد من مسار الصورة
        setIsScanning(false);
      }
      // 3. حالة الرد العادي
      else {
        aiResponse.text = "Fascinating question! The Ancient Egyptians believed in the eternal journey of the soul. Would you like to know more about our artifacts or rituals?";
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  // محاكاة وضع المايكروفون الصوتي
  const handleVoiceMode = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSend("Tell me a secret about King Tutankhamun.");
    }, 3000);
  };

  // محاكاة الماسح الضوئي للصور
  const handleImageUpload = () => {
    setIsScanning(true);
    setInput("Uploading artifact image for analysis...");
    setTimeout(() => {
      handleSend("Analyze this artifact");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row overflow-hidden relative">
      
      {/* خلفية هيروغليفية متحركة ببطء */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <motion.div 
          animate={{ y: [0, -1000] }} 
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="text-[4rem] tracking-[2em] leading-[3em] text-[#D4AF37] text-center"
        >
          {Array(20).fill('𓀀 𓁐 𓃠 𓆣 𓉐 𓊽 𓋹 𓍹 𓎡 𓏏 𓐍 𓑈 𓄿 𓃀 𓋴').map((line, i) => <div key={i}>{line}</div>)}
        </motion.div>
      </div>

      {/* ================= الجانب الأيسر: الأفاتار الملكي ================= */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 p-8 flex flex-col items-center justify-center relative z-10 bg-gradient-to-b from-[#0a0a0f] to-[#050505]">
        
        <div className="text-center mb-8">
          <h2 className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-xs mb-2">The Royal Oracle</h2>
          <h1 className="text-3xl font-serif">AI Curator</h1>
        </div>

        {/* الشخصية مع تأثير النبض أثناء التفكير */}
        <div className="relative w-64 h-64 mb-8">
          <div className={`absolute inset-0 rounded-full blur-3xl transition-all duration-1000 ${isTyping || isListening ? 'bg-[#D4AF37]/40 scale-125 animate-pulse' : 'bg-[#D4AF37]/10'}`}></div>
          <motion.img 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            src="/assets/images/ai-curator.png" // تأكد من وجود صورة الأفاتار
            alt="AI Curator" 
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
          />
          
          {/* الموجات الصوتية تظهر عند الاستماع */}
          <AnimatePresence>
            {isListening && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 z-20">
                {[1,2,3,4,5].map((i) => (
                  <motion.div key={i} animate={{ height: [10, 30, 10] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }} className="w-1.5 bg-[#D4AF37] rounded-full"></motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="text-center max-w-xs text-gray-400 text-sm leading-relaxed">
          {isTyping ? "Consulting the ancient scrolls..." : 
           isListening ? "Listening to your voice..." : 
           "I am here to unveil the mysteries of the pharaohs. Ask me anything."}
        </div>
      </div>

      {/* ================= الجانب الأيمن: منطقة المحادثة ================= */}
      <div className="w-full md:w-2/3 flex flex-col h-screen relative z-10 bg-[#050505]/80 backdrop-blur-xl">
        
        {/* منطقة الرسائل */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide scroll-smooth"
        >
          
          {/* كروت الفضول تظهر فقط لو الشات فاضي */}
          {messages.length === 0 && !isScanning && (
            <div className="h-full flex flex-col items-center justify-center">
              <Sparkles className="text-[#D4AF37] mb-4 w-12 h-12 opacity-50" />
              <h3 className="text-2xl font-serif mb-8 text-center">Uncover the Secrets of Egypt</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                {prompts.map(prompt => (
                  <motion.button 
                    key={prompt.id}
                    whileHover={{ scale: 1.05, borderColor: '#D4AF37' }}
                    onClick={() => handleSend(prompt.text)}
                    className="p-4 rounded-2xl border border-white/10 bg-white/5 text-left transition-all group"
                  >
                    <h4 className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2">{prompt.title}</h4>
                    <p className="text-sm text-gray-300 group-hover:text-white">{prompt.text}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* الرسائل المتبادلة */}
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] md:max-w-[60%] p-5 rounded-2xl ${msg.sender === 'user' ? 'bg-[#D4AF37] text-black rounded-br-none' : 'bg-[#111] border border-[#D4AF37]/20 rounded-bl-none'}`}>
                  
                  {/* نص الرسالة */}
                  <p className={`text-sm ${msg.sender === 'user' ? 'font-medium' : 'leading-relaxed text-gray-200'}`}>
                    {msg.text}
                  </p>

                  {/* المترجم الهيروغليفي */}
                  {msg.isHieroglyph && (
                    <div className="mt-4 p-4 bg-black/50 border border-[#D4AF37]/30 rounded-xl">
                      <p className="text-3xl text-[#D4AF37] tracking-widest text-center py-2" style={{ fontFamily: 'sans-serif' }}>
                        {msg.hieroglyphText}
                      </p>
                      <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest mt-2">Carved in Stone</p>
                    </div>
                  )}

                  {/* نتيجة الماسح الضوئي */}
                  {msg.isScanResult && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-[#D4AF37]/30 relative group">
                      <img src={msg.image} alt="Artifact" className="w-full h-48 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <ScanLine size={16} className="text-[#D4AF37]" />
                        <span className="text-xs text-[#D4AF37] uppercase font-bold tracking-widest">Analysis Complete</span>
                      </div>
                    </div>
                  )}

                  {/* أيقونة الصوت */}
                  {msg.sender === 'ai' && (
                    <button className="mt-3 text-gray-500 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-xs">
                      <Volume2 size={14} /> Listen to Oracle
                    </button>
                  )}
                </div>
              </motion.div>
            ))}

            {/* أنيميشن الكتابة (Typing) */}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-[#111] border border-[#D4AF37]/20 p-4 rounded-2xl rounded-bl-none flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* نقطة الإرساء للسكرول الذكي */}
          <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* Input Area - لوحة الإدخال */}
        <div className="p-6 bg-gradient-to-t from-[#050505] to-transparent">
          
          {/* حالة المسح */}
          {isScanning && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-4">
               <div className="px-4 py-2 bg-[#D4AF37]/20 border border-[#D4AF37]/50 rounded-full flex items-center gap-3 text-[#D4AF37] text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                 <ScanLine size={16} className="animate-spin-slow" /> Scanning Artifact...
               </div>
            </motion.div>
          )}

          <div className="max-w-4xl mx-auto relative group">
            {/* إشعاع خلف الـ Input */}
            <div className="absolute inset-0 bg-[#D4AF37] rounded-2xl blur-md opacity-10 group-focus-within:opacity-25 transition-opacity duration-500"></div>
            
            <div className="relative bg-[#111] border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
              
              {/* زر الماسح الضوئي */}
              <button 
                onClick={handleImageUpload}
                disabled={isScanning || isTyping}
                className="p-3 text-gray-400 hover:text-[#D4AF37] hover:bg-white/5 rounded-xl transition-all"
                title="Scan Artifact Image"
              >
                <ImageIcon size={20} />
              </button>
              
              <input 
                type="text" 
                placeholder="Consult the Oracle or ask for a translation..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                disabled={isScanning || isListening}
                className="flex-1 bg-transparent border-none text-white focus:ring-0 px-2 placeholder:text-gray-600 outline-none"
              />
              
              {/* الوضع الصوتي */}
              <button 
                onClick={handleVoiceMode}
                disabled={isScanning || isTyping}
                className={`p-3 rounded-xl transition-all ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'text-gray-400 hover:text-[#D4AF37] hover:bg-white/5'}`}
                title="Voice Request"
              >
                <Mic size={20} />
              </button>

              {/* زر الإرسال */}
              <button 
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isScanning || isTyping}
                className="p-3 bg-[#D4AF37] text-black rounded-xl hover:bg-[#b5952f] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] text-gray-600 mt-4 uppercase tracking-widest">
            Powered by GEM Artificial Intelligence
          </p>
        </div>

      </div>
    </div>
  );
}
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Camera, Sparkles, ScanLine, Volume2, Image as ImageIcon, History } from 'lucide-react';
import { isLoggedIn } from '../../lib/authStorage';
import { consumePostLoginAction, setPostLoginAction, setPostLoginRedirect } from '../../lib/authGate';
import { sendAiChat } from '../../lib/aiApi';
import LoginRequiredModal from '../Auth/LoginRequiredModal';

// --- 1. خريطة تحويل الحروف الإنجليزية إلى هيروغليفية (للمترجم) ---
const hieroglyphMap = {
  a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', g: 'g', h: 'h', i: 'i',
  j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', p: 'p', q: 'q', r: 'r',
  s: 's', t: 't', u: 'u', v: 'v', w: 'w', x: 'x', y: 'y', z: 'z', ' ': '  '
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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [sessionId] = useState(() => `web-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`);
  const [pendingImage, setPendingImage] = useState(null);

  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

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

  useEffect(() => {
    if (!isLoggedIn()) return;
    const action = consumePostLoginAction();
    if (!action || action.type !== 'ai-action') return;

    if (action.mode === 'scan') {
      handleImageUpload();
      return;
    }
    if (action.mode === 'voice') {
      handleVoiceMode();
      return;
    }
    if (action.text) {
      handleSend(action.text);
    }
  }, []);

  const requireAiAuth = (action) => {
    if (isLoggedIn()) return true;
    setPostLoginRedirect('/AIAssistant');
    setPostLoginAction({ type: 'ai-action', ...action });
    setShowLoginModal(true);
    return false;
  };

  const handleSend = async (text, imagePayload = null) => {
    if (!requireAiAuth({ mode: 'text', text })) return;
    const trimmed = (text || '').trim();
    const image = imagePayload || pendingImage;
    if (!trimmed && !image) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: trimmed || 'Analyze this artifact image.',
      imagePreview: image?.previewUrl || null,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setPendingImage(null);
    setIsTyping(true);
    if (isScanning) setIsScanning(false);

    try {
      const res = await sendAiChat({
        message: trimmed || 'Analyze this artifact image.',
        sessionId,
        imageBase64: image?.base64 || null,
        imageMimeType: image?.mimeType || null,
      });
      const reply = res?.data?.reply || res?.message || 'No reply from the AI service.';
      const isHieroglyph = trimmed.toLowerCase().includes('translate') && !image;
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        text: reply,
        isHieroglyph,
        isScanResult: Boolean(image),
        hieroglyphText: isHieroglyph
          ? translateToHieroglyphs(trimmed.split(':')[1]?.trim() || 'Visitor')
          : undefined,
        image: image?.previewUrl || null,
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: err?.message || 'Could not reach the AI assistant. Sign in and try again.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // محاكاة وضع المايكروفون الصوتي
  const handleVoiceMode = () => {
    if (!requireAiAuth({ mode: 'voice' })) return;
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSend("Tell me a secret about King Tutankhamun.");
    }, 3000);
  };

  const handleImageUpload = () => {
    if (!requireAiAuth({ mode: 'scan' })) return;
    fileInputRef.current?.click();
  };

  const handleFileSelected = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || !file.type.startsWith('image/')) return;

    setIsScanning(true);
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : '';
      const comma = dataUrl.indexOf(',');
      const base64 = comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
      const payload = {
        base64,
        mimeType: file.type,
        previewUrl: dataUrl,
      };
      setPendingImage(payload);
      setIsScanning(false);
      handleSend(input.trim() || 'Analyze this artifact image.', payload);
    };
    reader.onerror = () => {
      setIsScanning(false);
    };
    reader.readAsDataURL(file);
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

                  {msg.imagePreview && (
                    <div className="mt-3 rounded-xl overflow-hidden border border-black/20">
                      <img src={msg.imagePreview} alt="Uploaded" className="max-h-40 w-full object-cover" />
                    </div>
                  )}

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
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelected}
            />

            <div className="relative bg-[#111] border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
              
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
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input, pendingImage)}
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
                onClick={() => handleSend(input, pendingImage)}
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
      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        nextPath="/AIAssistant"
        title="Sign in to use AI Assistant"
        message="Please sign in to send text, upload images, or use voice in AI Assistant."
      />
    </div>
  );
}
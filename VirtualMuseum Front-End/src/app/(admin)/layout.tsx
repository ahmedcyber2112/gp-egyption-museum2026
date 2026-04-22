"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Cinzel } from 'next/font/google'; 
import { 
  LayoutDashboard, Package, Ticket, BrainCircuit, Users, 
  Settings, Menu, LogOut, Bell, Search, Layers, Box, Activity, Pyramid, X
} from 'lucide-react';
import { EgyptianPattern } from "./EgyptianPattern";
import { clearAuthSession, getCurrentUser, getAccessToken } from "../../lib/authStorage";

const cinzel = Cinzel({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  const pathname = usePathname();

  // إغلاق قائمة الجوال عند تغيير الصفحة
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Client-side guard for admin routes.
    // Backend APIs are role-protected already; this prevents UI access too.
    const token = getAccessToken();
    const currentUser = getCurrentUser();
    const role = (currentUser?.role || "").toLowerCase();

    if (!token || role !== "admin") {
      clearAuthSession();
      router.replace("/Signin");
      return;
    }

    setAdminName(currentUser?.fullName || "Admin");
    setAuthReady(true);
  }, [router]);

  const handleLogout = () => {
    clearAuthSession();
    router.push("/Signin");
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Artifacts", icon: Package, href: "/artifacts" },
    { name: "Categories", icon: Layers, href: "/admincategories" },
    { name: "3D Models", icon: Box, href: "/Models3D" },
    { name: "Users", icon: Users, href: "/Users" },
    { name: "Workflows", icon: Activity, href: "/workflow" },
    { name: "Chatbot Logs", icon: BrainCircuit, href: "/chatbot" },
    { name: "Historical Eras", icon: Ticket, href: "/HistoricalEras" },
    { name: "Reports", icon: Ticket, href: "/Reports" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  // مكون القائمة المشترك
  const SidebarContent = () => (
    <>
      <div className="h-20 flex items-center px-6 border-b border-white/5">
         <Pyramid className="text-[#D4AF37] mr-3" size={24} />
         {(isSidebarOpen || isMobileMenuOpen) && (
           <span className={`${cinzel.className} font-bold tracking-widest text-sm text-[#D4AF37]`}>
             Egyptian Museum
           </span>
         )}
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <button className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all group mb-1 ${
                isActive ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'text-gray-400 hover:bg-white/5'
              }`}>
                <item.icon size={20} className={isActive ? 'text-black' : 'group-hover:text-[#D4AF37]'} />
                {(isSidebarOpen || isMobileMenuOpen) && (
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.name}</span>
                )}
              </button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
         <button
           type="button"
           onClick={handleLogout}
           className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-gray-500 hover:text-red-500 transition-all group"
         >
           <LogOut size={20} />
           {(isSidebarOpen || isMobileMenuOpen) && <span className="text-[10px] font-bold uppercase tracking-widest">Logout System</span>}
         </button>
      </div>
    </>
  );

  if (!authReady) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-xs uppercase tracking-widest text-gray-400">Checking admin access...</div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen bg-[#050505] text-white overflow-hidden relative`}>
      <EgyptianPattern />

      {/* --- Sidebar Desktop --- */}
      <motion.aside 
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="hidden md:flex flex-col bg-[#0a0a0f]/90 backdrop-blur-xl border-r border-white/5 relative z-50 transition-all duration-500"
      >
        <SidebarContent />
      </motion.aside>

      {/* --- Sidebar Mobile (Overlay) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-[#0a0a0f] z-[70] md:hidden flex flex-col border-r border-white/10"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* --- Main Content --- */}
      <div className="flex-1 flex flex-col relative overflow-hidden z-10">
        
        {/* Header */}
        <header className="h-20 bg-[#0a0a0f]/60 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            {/* زر الجوال */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="text-gray-400 hover:text-[#D4AF37] md:hidden"
            >
              <Menu size={24} />
            </button>
            {/* زر الديسكتوب */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="text-gray-400 hover:text-[#D4AF37] hidden md:block"
            >
              <Menu size={24} />
            </button>
            
            <h2 className={`${cinzel.className} text-[10px] md:text-xs tracking-[0.3em] text-gray-500 hidden sm:block uppercase`}>
              GEM Management
            </h2>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-[10px] w-48 xl:w-64 focus:border-[#D4AF37]/50 outline-none" 
              />
            </div>
            
            <Bell size={20} className="text-gray-500 cursor-pointer" />

            <div className="flex items-center gap-2 md:gap-3 pl-3 md:pl-4 border-l border-white/10">
                <div className="text-right hidden md:block">
                    <p className="text-[10px] font-bold text-white uppercase">Admin</p>
                    <p className="text-[10px] text-gray-400">{adminName}</p>
                </div>
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-black text-xs">AD</div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto relative scroll-smooth">
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
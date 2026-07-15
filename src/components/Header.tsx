import { Search, ShoppingCart, User, Menu, X, Phone, Mail } from 'lucide-react';
import React, { useState } from 'react';

const formatUrl = (url: string) => {
  if (!url) return '#';
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenLogin: () => void;
  isLoggedIn: boolean;
  userName: string;
  isAdmin?: boolean;
  onLogout: () => void;
  systemSettings: any;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Header({ activeTab, setActiveTab, cartCount, onOpenCart, onOpenLogin, isLoggedIn, userName, isAdmin, onLogout, systemSettings, searchQuery, onSearchChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: string) => {
    e.preventDefault();
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-[#5A634A] text-white py-2 text-xs uppercase tracking-widest">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex gap-4 mb-2 sm:mb-0 opacity-80">
            <span className="flex items-center gap-2"><Mail size={14} /> {systemSettings.email}</span>
            <span className="flex items-center gap-2"><Phone size={14} /> {systemSettings.phone}</span>
            {systemSettings.facebook && (
              <a href={formatUrl(systemSettings.facebook)} target="_blank" rel="noreferrer" className="flex items-center hover:text-white transition-colors border-l border-white/20 pl-4 ml-2">
                Facebook
              </a>
            )}
            {systemSettings.tiktok && (
              <a href={formatUrl(systemSettings.tiktok)} target="_blank" rel="noreferrer" className="flex items-center hover:text-white transition-colors border-l border-white/20 pl-4">
                TikTok
              </a>
            )}
            {systemSettings.youtube && (
              <a href={formatUrl(systemSettings.youtube)} target="_blank" rel="noreferrer" className="flex items-center hover:text-white transition-colors border-l border-white/20 pl-4">
                YouTube
              </a>
            )}
          </div>
          <div className="flex gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-[#EAE7DC]"><User size={14} /> Chào, {userName}</span>
                <button onClick={onLogout} className="text-white/60 hover:text-white transition-colors cursor-pointer">Thoát</button>
              </div>
            ) : (
              <button onClick={onOpenLogin} className="flex items-center gap-1 hover:text-[#EAE7DC] transition-colors cursor-pointer"><User size={14} /> Đăng nhập</button>
            )}
            <button onClick={onOpenCart} className="flex items-center gap-1 hover:text-[#EAE7DC] transition-colors cursor-pointer relative">
              <ShoppingCart size={14} /> Giỏ hàng ({cartCount})
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Navbar */}
      <div className="bg-[#FAF8F5] border-b border-[#EBE7E0] relative z-50">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-semibold tracking-tight text-[#2D3325] flex items-center gap-3" onClick={(e) => handleNavClick(e, 'home')}>
            <div className="w-10 h-10 bg-[#5A634A] rounded-full flex items-center justify-center text-white italic font-bold text-xl">
              {systemSettings.storeName.charAt(0)}
            </div>
            {systemSettings.storeName}
          </a>
          
          <nav className="hidden md:flex gap-8 items-center text-sm font-medium uppercase tracking-widest text-[#7D7D5A]">
            <a href="#" onClick={(e) => handleNavClick(e, 'home')} className={activeTab === 'home' ? "text-[#5A634A] border-b border-[#5A634A] pb-1" : "hover:text-[#5A634A] transition-colors"}>Trang chủ</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={activeTab === 'about' ? "text-[#5A634A] border-b border-[#5A634A] pb-1" : "hover:text-[#5A634A] transition-colors"}>Giới thiệu</a>
            <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className={activeTab === 'products' ? "text-[#5A634A] border-b border-[#5A634A] pb-1" : "hover:text-[#5A634A] transition-colors"}>Sản phẩm</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={activeTab === 'contact' ? "text-[#5A634A] border-b border-[#5A634A] pb-1" : "hover:text-[#5A634A] transition-colors"}>Liên hệ</a>
            {isLoggedIn && isAdmin && (
              <a href="#admin" onClick={(e) => handleNavClick(e, 'admin')} className={activeTab === 'admin' ? "text-[#5A634A] border-b border-[#5A634A] pb-1" : "hover:text-[#5A634A] transition-colors"}>Quản trị</a>
            )}
          </nav>
          
          <div className="hidden md:flex items-center gap-4 relative">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                value={searchQuery || ''}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="pl-4 pr-10 py-2 border border-[#E3DFD3] rounded-full focus:outline-none focus:border-[#5A634A] focus:ring-1 focus:ring-[#5A634A] bg-transparent text-sm w-48 transition-all focus:w-64"
              />
              <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7D7D5A]" />
            </div>
          </div>
          
          <button className="md:hidden text-[#5A634A]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#FAF8F5] shadow-lg border-t border-[#EBE7E0] flex flex-col p-6 gap-6 uppercase tracking-widest text-sm">
            <a href="#" onClick={(e) => handleNavClick(e, 'home')} className={activeTab === 'home' ? "text-[#5A634A] font-bold" : "text-[#7D7D5A] hover:text-[#5A634A]"}>Trang chủ</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={activeTab === 'about' ? "text-[#5A634A] font-bold" : "text-[#7D7D5A] hover:text-[#5A634A]"}>Giới thiệu</a>
            <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className={activeTab === 'products' ? "text-[#5A634A] font-bold" : "text-[#7D7D5A] hover:text-[#5A634A]"}>Sản phẩm</a>
            <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className={activeTab === 'portfolio' ? "text-[#5A634A] font-bold" : "text-[#7D7D5A] hover:text-[#5A634A]"}>Bộ sưu tập</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={activeTab === 'contact' ? "text-[#5A634A] font-bold" : "text-[#7D7D5A] hover:text-[#5A634A]"}>Liên hệ</a>
            {isLoggedIn && isAdmin && (
              <a href="#admin" onClick={(e) => handleNavClick(e, 'admin')} className={activeTab === 'admin' ? "text-[#5A634A] font-bold" : "text-[#7D7D5A] hover:text-[#5A634A]"}>Quản trị</a>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Clock, Youtube } from 'lucide-react';
import { resolveImageUrl } from '../lib/image';

const formatUrl = (url: string) => {
  if (!url) return '#';
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

export default function Footer({ systemSettings, products = [] }: any) {
  const bestSellers = [...products].sort((a, b) => (b.sales || 0) - (a.sales || 0)).slice(0, 2);

  return (
    <footer className="bg-[#5A634A] text-white/70 pt-20 pb-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          
          {/* Widget 1 */}
          <div>
            <a href="#" className="text-2xl font-semibold text-white flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white text-[#5A634A] rounded-full flex items-center justify-center italic font-bold text-xl">
                {systemSettings.storeName.charAt(0)}
              </div>
              {systemSettings.storeName}
            </a>
            <div className="flex gap-3">
              {systemSettings.facebook && (
                <a href={formatUrl(systemSettings.facebook)} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white hover:text-[#5A634A] transition-colors"><Facebook size={16} /></a>
              )}
              {systemSettings.tiktok && (
                <a href={formatUrl(systemSettings.tiktok)} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white hover:text-[#5A634A] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                </a>
              )}
              {systemSettings.youtube && (
                <a href={formatUrl(systemSettings.youtube)} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white hover:text-[#5A634A] transition-colors"><Youtube size={16} /></a>
              )}
              {(!systemSettings.facebook && !systemSettings.tiktok && !systemSettings.youtube) && (
                <>
                  <a href="#" className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white hover:text-[#5A634A] transition-colors"><Facebook size={16} /></a>
                  <a href="#" className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white hover:text-[#5A634A] transition-colors"><Twitter size={16} /></a>
                  <a href="#" className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white hover:text-[#5A634A] transition-colors"><Instagram size={16} /></a>
                  <a href="#" className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white hover:text-[#5A634A] transition-colors"><Linkedin size={16} /></a>
                </>
              )}
            </div>
          </div>
          
          {/* Widget 2: Bán chạy nhất */}
          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest border-b border-white/20 pb-2 inline-block">Bán chạy nhất</h4>
            <div className="flex flex-col gap-5">
              {bestSellers.map((product: any) => (
                <div key={product.id} className="flex items-center gap-4">
                  <img src={resolveImageUrl(product.image)} alt={product.name} className="w-16 h-16 object-cover rounded-xl border border-white/20" referrerPolicy="no-referrer" />
                  <div>
                    <a href="#" className="text-white hover:text-[#D97757] font-medium transition-colors">{product.name}</a>
                    <p className="text-[#EAE7DC] mt-1 text-sm">{product.priceStr || `${product.price.toLocaleString('vi-VN')}đ`}</p>
                    {product.sales && <p className="text-xs text-white/50 mt-0.5">Đã bán: {product.sales}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Widget 3: Liên hệ */}
          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest border-b border-white/20 pb-2 inline-block">Liên hệ</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex gap-3"><MapPin size={18} className="text-[#EAE7DC] shrink-0" /> <span>{systemSettings.address}</span></li>
              <li className="flex gap-3"><Phone size={18} className="text-[#EAE7DC] shrink-0" /> <span>{systemSettings.phone}</span></li>
              <li className="flex gap-3"><Mail size={18} className="text-[#EAE7DC] shrink-0" /> <span>{systemSettings.email}</span></li>
              <li className="flex gap-3"><Clock size={18} className="text-[#EAE7DC] shrink-0" /> <span>{systemSettings.openHours}</span></li>
            </ul>
          </div>
          
        </div>
        
        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest">
          <p>© {new Date().getFullYear()} {systemSettings.storeName}.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Trang chủ</a>
            <a href="#" className="hover:text-white transition-colors">Sản phẩm</a>
            <a href="#" className="hover:text-white transition-colors">Liên hệ</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

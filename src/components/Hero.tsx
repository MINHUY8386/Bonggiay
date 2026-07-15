import heroImage from '../assets/images/hero_bougainvillea_1783698028915.jpg';

interface HeroProps {
  onExplore?: () => void;
  onContact?: () => void;
}

export default function Hero({ onExplore, onContact }: HeroProps) {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden m-4 md:m-10 rounded-[40px] group border border-[#EBE7E0]">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
      <img 
        src={heroImage}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      
      <div className="relative z-20 container mx-auto px-10 text-white max-w-4xl text-center md:text-left md:absolute md:bottom-20 md:left-20">
        <span className="text-xs uppercase tracking-[0.3em] font-medium opacity-80 mb-4 block">Bộ Sưu Tập Mùa Xuân</span>
        <h1 className="text-4xl md:text-6xl font-semibold mb-6 drop-shadow-lg leading-tight">
          Vẻ Đẹp Rực Rỡ<br className="hidden md:block" />Từ Nắng Gió
        </h1>
        <p className="text-lg md:text-xl mb-8 font-light drop-shadow md:max-w-xl opacity-90">
          Mang sắc màu thiên nhiên và sự tươi mới vào không gian sống của bạn. Chúng tôi cung cấp các giống bông giấy đa dạng màu sắc, khỏe mạnh và dễ chăm sóc.
        </p>
        <div className="flex gap-4 justify-center md:justify-start">
          <button 
            onClick={onExplore}
            className="bg-white text-[#5A634A] px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#F5F2ED] transition-all shadow-lg cursor-pointer"
          >
            Khám phá ngay
          </button>
          <button 
            onClick={onContact}
            className="px-8 py-3 bg-[#5A634A]/20 backdrop-blur-md text-white border border-white/30 font-bold uppercase tracking-widest text-sm rounded-full shadow-lg hover:bg-[#5A634A] transition-colors cursor-pointer"
          >
            LIÊN HỆ
          </button>
        </div>
      </div>
    </section>
  )
}

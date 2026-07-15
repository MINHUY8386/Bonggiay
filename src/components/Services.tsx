import { Leaf, Droplet, Scissors, Icon } from 'lucide-react';
import bonsaiImage from '../assets/images/services_bonsai_1783698045768.jpg';

const IconMap: any = {
  Leaf,
  Droplet,
  Scissors
};

export default function Services({ servicesData }: any) {
  if (!servicesData) {
    return null;
  }
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#2D3325] mb-4">{servicesData.title}</h2>
          <p className="text-[#7D7D5A] italic">{servicesData.subtitle}</p>
          <div className="w-16 h-1 bg-[#5A634A] mx-auto mt-6 rounded-full opacity-50"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            {servicesData.list.map((item: any, index: number) => {
              const IconComponent = IconMap[item.icon] || Leaf;
              
              if (index === 1) {
                return (
                  <div key={item.id} className="bg-white rounded-3xl p-6 flex items-start sm:items-center gap-5 border border-[#E3DFD3] hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 shrink-0 bg-[#D97757]/10 text-[#D97757] border border-[#D97757]/20 rounded-2xl flex items-center justify-center">
                      <IconComponent size={28} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#D97757] mb-1">{item.title}</h4>
                      <p className="text-sm text-[#7D7D5A]">{item.desc}</p>
                    </div>
                  </div>
                );
              }
              
              const iconStyle = index === 2 
                ? "bg-[#EAE7DC] text-[#5A634A]" 
                : "bg-[#5A634A] text-white";
                
              return (
                <div key={item.id} className="bg-[#F5F2ED] rounded-3xl p-6 flex items-start sm:items-center gap-5 border border-[#E3DFD3] hover:shadow-md transition-shadow">
                  <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center ${iconStyle}`}>
                    <IconComponent size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#2D3325] mb-1">{item.title}</h4>
                    <p className="text-sm text-[#7D7D5A]">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-[40px] overflow-hidden shadow-lg border border-[#E3DFD3] aspect-[4/5] lg:aspect-square group cursor-pointer">
              <img 
                src={bonsaiImage} 
                alt="Gardening services" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300">
                <button onClick={() => alert('Tính năng xem video đang được cập nhật.')} className="w-20 h-20 bg-white/90 text-[#5A634A] rounded-full flex items-center justify-center pl-1 shadow-lg hover:bg-white transition-colors backdrop-blur-sm cursor-pointer">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

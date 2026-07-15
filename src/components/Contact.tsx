import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function Contact({ systemSettings }: any) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const { error } = await supabase.from('contacts').insert({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      contact_date: new Date().toLocaleDateString('vi-VN')
    });

    setSending(false);

    if (error) {
      alert('Gửi tin nhắn thất bại, vui lòng thử lại: ' + error.message);
      return;
    }

    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-16 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 md:px-10">
        <div className="bg-white rounded-[40px] border border-[#EBE7E0] shadow-sm overflow-hidden flex flex-col lg:flex-row">
          
          {/* Contact Info & Form */}
          <div className="lg:w-1/2 p-8 md:p-12 font-sans flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-[#2D3325] font-serif mb-2">Liên hệ & Góp ý</h2>
              <p className="text-[#7D7D5A] mb-8">Bạn có thắc mắc hoặc cần tư vấn? Hãy để lại lời nhắn, chúng tôi sẽ liên hệ lại ngay.</p>
              
              <div className="space-y-4 mb-8 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-[#5A634A] mt-0.5 shrink-0" />
                  <span className="text-[#7D7D5A]">{systemSettings?.address || 'Ấp 8, Lương Hòa, Bến Lức, Tây Ninh'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-[#5A634A] shrink-0" />
                  <span className="text-[#7D7D5A]">{systemSettings?.phone || '039 981 0748'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-[#5A634A] shrink-0" />
                  <span className="text-[#7D7D5A]">{systemSettings?.email || 'contact@bonggiay.com'}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Họ và tên" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-[#EBE7E0] focus:outline-none focus:border-[#5A634A] focus:ring-1 focus:ring-[#5A634A] bg-[#FAF8F5]"
              />
              <input 
                type="email" 
                placeholder="Email hoặc Số điện thoại" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-[#EBE7E0] focus:outline-none focus:border-[#5A634A] focus:ring-1 focus:ring-[#5A634A] bg-[#FAF8F5]"
              />
              <textarea 
                placeholder="Nội dung lời nhắn..." 
                required
                rows={3}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-[#EBE7E0] focus:outline-none focus:border-[#5A634A] focus:ring-1 focus:ring-[#5A634A] bg-[#FAF8F5] resize-none"
              ></textarea>
              <button 
                type="submit"
                disabled={sending}
                className="w-full bg-[#5A634A] text-white font-bold py-3.5 rounded-xl uppercase tracking-widest text-sm hover:bg-[#2D3325] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {sending ? 'Đang gửi...' : 'Gửi tin nhắn'} <Send size={16} />
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="lg:w-1/2 h-[400px] lg:h-auto min-h-[300px]">
            <iframe 
              src={`https://maps.google.com/maps?q=${encodeURIComponent(systemSettings?.address || 'ấp 8, Lương Hòa, Bến Lức, Tây Ninh')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ vị trí vườn bông giấy"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}

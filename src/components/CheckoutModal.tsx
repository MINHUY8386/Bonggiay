import React, { useState, useEffect } from 'react';
import { X, QrCode } from 'lucide-react';
import { CartItem } from '../App';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onConfirm: (customerData: any) => void;
  user?: { name: string; email: string } | null;
}

export default function CheckoutModal({ isOpen, onClose, cart, onConfirm, user }: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'qr'>('cod');
  const [step, setStep] = useState<'form' | 'qr'>('form');

  useEffect(() => {
    if (isOpen && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email
      }));
    }
    if (isOpen) {
      setStep('form');
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const SHIPPING_FEE = 30000;
  const total = subtotal + SHIPPING_FEE;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'qr' && step === 'form') {
      setStep('qr');
      return;
    }
    onConfirm({ ...formData, paymentMethod });
    setStep('form');
  };

  const handleQRConfirm = () => {
    onConfirm({ ...formData, paymentMethod });
    setStep('form');
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-scale-up max-h-[90vh]">
        
        {/* Main Section */}
        {step === 'qr' ? (
          <div className="flex-1 p-6 md:p-8 flex flex-col items-center justify-center font-sans text-center overflow-y-auto">
            <div className="flex justify-end w-full md:hidden mb-2">
              <button onClick={onClose} className="text-[#7D7D5A] hover:text-[#2D3325]">
                <X size={24} />
              </button>
            </div>
            <div className="w-16 h-16 bg-[#5A634A]/10 rounded-full flex items-center justify-center text-[#5A634A] mb-4">
              <QrCode size={32} />
            </div>
            <h2 className="text-2xl font-bold text-[#2D3325] font-serif mb-2">Thanh toán chuyển khoản</h2>
            <p className="text-[#7D7D5A] mb-6 text-sm">Sử dụng ứng dụng ngân hàng quét mã QR dưới đây để thanh toán cho đơn hàng.</p>
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#EBE7E0] mb-4 inline-block">
              <img src={`https://img.vietqr.io/image/bidv-8893420561-compact.png?amount=${total}&addInfo=${encodeURIComponent('Thanh toan don hang ' + formData.name)}&accountName=${encodeURIComponent('LE NGUYEN MINH HUY')}`} alt="QR Code" className="w-48 h-48 md:w-64 md:h-64 object-contain" />
            </div>
            <div className="text-center mb-6 text-sm">
              <p className="font-bold text-[#2D3325]">LE NGUYEN MINH HUY</p>
              <p className="text-[#5A634A] font-mono tracking-wide">8893420561</p>
              <p className="text-[#7D7D5A]">Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV)</p>
            </div>
            <div className="flex gap-4 w-full max-w-sm mt-auto md:mt-0">
              <button type="button" onClick={() => setStep('form')} className="flex-1 py-3.5 rounded-xl border border-[#EBE7E0] text-[#7D7D5A] font-bold uppercase tracking-widest text-sm hover:bg-[#FAF8F5] transition-colors cursor-pointer">
                Quay lại
              </button>
              <button type="button" onClick={handleQRConfirm} className="flex-1 bg-[#5A634A] text-white font-bold py-3.5 rounded-xl uppercase tracking-widest text-sm hover:bg-[#2D3325] transition-colors cursor-pointer">
                Đã thanh toán
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 p-6 md:p-8 overflow-y-auto font-sans">
            <div className="flex justify-between items-center mb-6 md:hidden">
              <h2 className="text-xl font-bold text-[#2D3325] font-serif">Thanh toán</h2>
              <button onClick={onClose} className="text-[#7D7D5A] hover:text-[#2D3325]">
                <X size={24} />
              </button>
            </div>
            
            <h2 className="hidden md:block text-2xl font-bold text-[#2D3325] font-serif mb-6">Thông tin giao hàng</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Họ và tên *</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#EBE7E0] focus:outline-none focus:border-[#5A634A] focus:ring-1 focus:ring-[#5A634A] bg-[#FAF8F5]" placeholder="Nhập họ tên" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Số điện thoại *</label>
                  <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#EBE7E0] focus:outline-none focus:border-[#5A634A] focus:ring-1 focus:ring-[#5A634A] bg-[#FAF8F5]" placeholder="Nhập số điện thoại" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#EBE7E0] focus:outline-none focus:border-[#5A634A] focus:ring-1 focus:ring-[#5A634A] bg-[#FAF8F5]" placeholder="Nhập email (tuỳ chọn)" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Địa chỉ giao hàng *</label>
                <input type="text" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#EBE7E0] focus:outline-none focus:border-[#5A634A] focus:ring-1 focus:ring-[#5A634A] bg-[#FAF8F5]" placeholder="Nhập địa chỉ nhận hàng" />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#7D7D5A] mb-2">Phương thức thanh toán</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <label className={`flex-1 p-3 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-[#5A634A] bg-[#5A634A]/5 ring-1 ring-[#5A634A]' : 'border-[#EBE7E0] hover:border-[#5A634A]/50 bg-[#FAF8F5]'}`}>
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="hidden" />
                    <div className="font-bold text-sm text-[#2D3325] mb-0.5">Tiền mặt (COD)</div>
                    <div className="text-xs text-[#7D7D5A]">Thanh toán khi nhận hàng</div>
                  </label>
                  <label className={`flex-1 p-3 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'qr' ? 'border-[#5A634A] bg-[#5A634A]/5 ring-1 ring-[#5A634A]' : 'border-[#EBE7E0] hover:border-[#5A634A]/50 bg-[#FAF8F5]'}`}>
                    <input type="radio" name="payment" value="qr" checked={paymentMethod === 'qr'} onChange={() => setPaymentMethod('qr')} className="hidden" />
                    <div className="font-bold text-sm text-[#2D3325] mb-0.5">Chuyển khoản QR</div>
                    <div className="text-xs text-[#7D7D5A]">Quét mã VietQR</div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Ghi chú (tuỳ chọn)</label>
                <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#EBE7E0] focus:outline-none focus:border-[#5A634A] focus:ring-1 focus:ring-[#5A634A] bg-[#FAF8F5] resize-none h-20" placeholder="Ghi chú thêm cho đơn hàng..." />
              </div>
              
              <button type="submit" className="w-full bg-[#5A634A] text-white font-bold py-4 rounded-xl uppercase tracking-widest text-sm hover:bg-[#2D3325] transition-colors mt-6 cursor-pointer">
                {paymentMethod === 'qr' ? 'Tiếp tục thanh toán' : 'Xác nhận đặt hàng'}
              </button>
            </form>
          </div>
        )}

        {/* Order Summary Section */}
        <div className="w-full md:w-80 bg-[#FAF8F5] p-6 md:p-8 flex flex-col font-sans border-t md:border-t-0 md:border-l border-[#EBE7E0]">
          <div className="hidden md:flex justify-end mb-6">
            <button onClick={onClose} className="text-[#7D7D5A] hover:text-[#2D3325]">
              <X size={24} />
            </button>
          </div>
          
          <h3 className="font-bold text-[#2D3325] mb-4">Tóm tắt đơn hàng</h3>
          
          <div className="flex-1 overflow-y-auto space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-[#7D7D5A]">
                  {item.name} <span className="text-[#2D3325] font-medium">x{item.quantity}</span>
                </span>
                <span className="font-medium text-[#2D3325]">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-[#EBE7E0] pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#7D7D5A]">Tạm tính</span>
              <span className="font-medium text-[#2D3325]">{subtotal.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#7D7D5A]">Phí vận chuyển</span>
              <span className="font-medium text-[#2D3325]">{SHIPPING_FEE.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-[#EBE7E0] items-center">
              <span className="font-bold text-[#2D3325]">Tổng cộng</span>
              <span className="font-bold text-[#D97757] text-xl font-serif">{total.toLocaleString('vi-VN')}đ</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { resolveImageUrl } from '../lib/image';

interface CartItem {
  id: number;
  name: string;
  price: number;
  priceStr: string;
  image: string;
  tag: string;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export default function CartModal({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout }: CartModalProps) {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EBE7E0]">
          <h2 className="text-xl font-semibold text-[#2D3325] font-serif">Giỏ hàng của bạn</h2>
          <button onClick={onClose} className="text-[#7D7D5A] hover:text-[#2D3325] transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 font-sans">
          {cart.length === 0 ? (
            <div className="text-center text-[#7D7D5A] mt-10">
              <p>Giỏ hàng đang trống.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4">
                <img src={resolveImageUrl(item.image)} alt={item.name} className="w-20 h-20 object-cover rounded-xl border border-[#E3DFD3]" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-[#2D3325]">{item.name}</h3>
                    <p className="text-[#D97757] font-bold text-sm">{item.price.toLocaleString('vi-VN')}đ</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-[#E3DFD3] rounded-full bg-white">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-[#7D7D5A] hover:text-[#2D3325]"><Minus size={14} /></button>
                      <span className="w-8 text-center text-sm font-medium text-[#3E3D32]">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-[#7D7D5A] hover:text-[#2D3325]"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => onRemoveItem(item.id)} className="text-[#7D7D5A] hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#EBE7E0] bg-white font-sans">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[#7D7D5A] font-medium uppercase tracking-widest text-sm">Tổng cộng</span>
              <span className="text-[#D97757] font-bold text-xl font-serif">{total.toLocaleString('vi-VN')}đ</span>
            </div>
            <button onClick={onCheckout} className="w-full bg-[#5A634A] text-white font-bold py-4 rounded-full uppercase tracking-widest text-sm hover:bg-[#2D3325] transition-colors shadow-lg cursor-pointer">
              Thanh toán ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

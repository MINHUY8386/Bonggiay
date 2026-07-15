import { X, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { resolveImageUrl } from '../lib/image';

interface ProductsProps {
  onAddToCart?: (product: any) => void;
  products: any[];
  onViewAll?: () => void;
}

export default function Products({ onAddToCart, products, onViewAll }: ProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  return (
    <>
    <section id="products" className="py-20 bg-[#FAF8F5]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-[#EBE7E0] pb-6">
          <div>
            <h2 className="text-3xl font-semibold text-[#2D3325] mb-2">Sản phẩm nổi bật</h2>
            <p className="text-[#7D7D5A] italic">Những chậu bông giấy rực rỡ nhất vừa được cập bến</p>
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); onViewAll && onViewAll(); }} 
            className="text-xs uppercase tracking-widest font-bold text-[#5A634A] border-b border-[#5A634A] self-start md:self-end pb-1 hover:text-[#D97757] hover:border-[#D97757] transition-colors cursor-pointer"
          >
            Xem tất cả
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <div key={product.id} className="group bg-white p-4 rounded-3xl border border-[#E3DFD3] shadow-sm hover:shadow-md transition-shadow relative">
              {product.tag && (
                <span className="absolute top-6 left-6 z-10 bg-[#D97757] text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">
                  {product.tag}
                </span>
              )}
              <div onClick={() => setSelectedProduct(product)} className="relative overflow-hidden aspect-[3/4] rounded-2xl bg-[#EAE7DC] mb-5 cursor-pointer">
                <img 
                  src={resolveImageUrl(product.image)} 
                  alt={product.name} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Actions overlay */}
                <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={(e) => { e.stopPropagation(); onAddToCart && onAddToCart(product); }} className="h-10 px-4 bg-white hover:bg-[#5A634A] hover:text-white rounded-full flex items-center justify-center text-[#5A634A] transition-colors font-medium shadow-md text-sm cursor-pointer">
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
              
              <div className="text-center flex flex-col items-center">
                <h3 onClick={() => setSelectedProduct(product)} className="text-lg font-medium text-[#2D3325] mb-1 hover:text-[#D97757] cursor-pointer transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-[#7D7D5A] italic mb-3">Gốc bonsai nghệ thuật</p>
                <p className="text-[#D97757] font-bold text-lg">{product.priceStr}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-up flex flex-col md:flex-row shadow-2xl relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedProduct(null); }} 
              className="absolute top-4 right-4 w-10 h-10 bg-white/80 hover:bg-white text-[#2D3325] rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all cursor-pointer z-10"
            >
              <X size={20} />
            </button>
            
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-[#FAF8F5]">
              <img 
                src={resolveImageUrl(selectedProduct.image)} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
              {selectedProduct.tag && (
                <span className="inline-block self-start bg-[#D97757] text-white text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold mb-4">
                  {selectedProduct.tag}
                </span>
              )}
              
              <h2 className="text-3xl font-serif font-bold text-[#2D3325] mb-2">{selectedProduct.name}</h2>
              <p className="text-[#D97757] font-bold text-2xl mb-6">{selectedProduct.priceStr}</p>
              
              <div className="w-16 h-1 bg-[#EBE7E0] mb-6"></div>
              
              <div className="prose prose-sm text-[#7D7D5A] mb-8 flex-1">
                <p className="whitespace-pre-line leading-relaxed">
                  {selectedProduct.description || 'Chưa có thông tin chi tiết cho sản phẩm này.'}
                </p>
              </div>
              
              <div className="flex gap-4 mt-auto pt-6 border-t border-[#EBE7E0]">
                <button 
                  onClick={() => {
                    onAddToCart && onAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }} 
                  className="flex-1 bg-[#5A634A] text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-sm hover:bg-[#2D3325] transition-colors cursor-pointer"
                >
                  <ShoppingCart size={18} /> Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

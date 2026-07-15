/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Products from './components/Products';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import LoginModal from './components/LoginModal';
import Admin from './components/Admin';
import CheckoutModal from './components/CheckoutModal';
import Contact from './components/Contact';
import { supabase, ADMIN_EMAIL } from './lib/supabaseClient';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  priceStr: string;
  image: string;
  tag: string;
  quantity: number;
}

const DEFAULT_SETTINGS = {
  storeName: 'Bông Giấy Bến Lức',
  phone: '0399810748',
  email: 'contact@bonggiay.com',
  address: 'Ấp 8, Lương Hòa, Bến Lức, Tây Ninh',
  openHours: 'Mở cửa: T2 - CN: 8h - 20h',
  facebook: '',
  tiktok: '',
  youtube: ''
};

const DEFAULT_SERVICES = {
  title: 'Dịch vụ của chúng tôi',
  subtitle: 'Mang đến giải pháp hoàn hảo cho không gian xanh của bạn.',
  list: [
    { id: 1, icon: 'Leaf', title: 'Chăm sóc Bông Giấy', desc: 'Cung cấp kỹ thuật tưới nước, bón phân và chăm sóc chuyên sâu để hoa ra quanh năm, màu sắc tươi tắn.' },
    { id: 2, icon: 'Scissors', title: 'Cắt tỉa & Tạo dáng', desc: 'Đội ngũ nghệ nhân giàu kinh nghiệm sẽ giúp tạo thế bonsai, leo giàn, uốn vòm cổng tuyệt đẹp.' },
    { id: 3, icon: 'Droplet', title: 'Tư vấn Thiết kế Cảnh quan', desc: 'Khảo sát tận nơi và thiết kế cảnh quan sân vườn, ban công, biệt thự với điểm nhấn là hoa bông giấy.' }
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const [systemSettings, setSystemSettingsState] = useState<any>(DEFAULT_SETTINGS);
  const [productsList, setProductsListState] = useState<any[]>([]);
  const [servicesData, setServicesDataState] = useState<any>(DEFAULT_SERVICES);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');

  const isAdmin = isLoggedIn && userEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  // ---- Tải dữ liệu ban đầu từ Supabase ------------------------------------
  useEffect(() => {
    (async () => {
      const [{ data: products }, { data: content }] = await Promise.all([
        supabase.from('products').select('*').order('id', { ascending: true }),
        supabase.from('site_content').select('*').eq('id', 1).maybeSingle()
      ]);

      if (products) {
        setProductsListState(products.map((p: any) => ({ ...p, priceStr: p.price_str })));
      }
      if (content) {
        if (content.system_settings) setSystemSettingsState(content.system_settings);
        if (content.services_data) setServicesDataState(content.services_data);
      }
      setLoading(false);
    })();
  }, []);

  // ---- Theo dõi phiên đăng nhập Supabase Auth -----------------------------
  useEffect(() => {
    const applySession = (session: any) => {
      if (session?.user) {
        setIsLoggedIn(true);
        setUserId(session.user.id);
        setUserEmail(session.user.email ?? '');
        setUserName(session.user.user_metadata?.full_name || session.user.email || '');
      } else {
        setIsLoggedIn(false);
        setUserId(null);
        setUserEmail('');
        setUserName('');
      }
    };

    supabase.auth.getSession().then(({ data }) => applySession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleRemoveItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = async (customerData: any) => {
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 1000000)}`,
      user_id: userId,
      customer: customerData.name,
      phone: customerData.phone,
      email: customerData.email,
      address: customerData.address,
      notes: customerData.notes,
      payment_method: customerData.paymentMethod === 'qr' ? 'Chuyển khoản QR' : 'Tiền mặt (COD)',
      items: cart,
      shipping_fee: 30000,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 30000,
      status: 'Đang xử lý',
      order_date: new Date().toLocaleDateString('vi-VN')
    };

    const { error } = await supabase.from('orders').insert(newOrder);
    if (error) {
      alert('Có lỗi khi đặt hàng, vui lòng thử lại: ' + error.message);
      return;
    }

    setCart([]);
    setIsCheckoutOpen(false);
    alert('Đặt hàng thành công! Cửa hàng sẽ liên hệ với bạn trong thời gian sớm nhất.');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // ---- Cập nhật sản phẩm / cài đặt / dịch vụ (đồng bộ Supabase) ----------
  const persistSiteContent = async (next: { system_settings?: any; services_data?: any }) => {
    const { error } = await supabase.from('site_content').update(next).eq('id', 1);
    if (error) alert('Không lưu được vào database: ' + error.message);
  };

  const setSystemSettings = (updater: any) => {
    setSystemSettingsState((prev: any) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      persistSiteContent({ system_settings: next });
      return next;
    });
  };

  const setServicesData = (updater: any) => {
    setServicesDataState((prev: any) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      persistSiteContent({ services_data: next });
      return next;
    });
  };

  const refreshProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('id', { ascending: true });
    if (data) setProductsListState(data.map((p: any) => ({ ...p, priceStr: p.price_str })));
  };

  const filteredProducts = productsList.filter((p: any) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] text-[#5A634A] font-serif">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#3E3D32] font-serif flex flex-col overflow-x-hidden">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        isLoggedIn={isLoggedIn}
        userName={userName}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        systemSettings={systemSettings}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero
              onExplore={() => setActiveTab('products')}
              onContact={() => setActiveTab('contact')}
            />
            <Services servicesData={servicesData} />
            <Products
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onViewAll={() => setActiveTab('products')}
            />
            <Contact systemSettings={systemSettings} />
          </>
        )}

        {activeTab === 'about' && (
          <div className="pt-10">
            <Services servicesData={servicesData} />
          </div>
        )}

        {activeTab === 'products' && (
          <div className="pt-10">
            <Products
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="pt-10">
            <Hero />
            <Products
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="pt-10">
            <Contact systemSettings={systemSettings} />
          </div>
        )}

        {activeTab === 'admin' && isAdmin && (
          <div className="border-t border-[#EBE7E0]">
            <Admin
              products={productsList}
              refreshProducts={refreshProducts}
              systemSettings={systemSettings}
              setSystemSettings={setSystemSettings}
              servicesData={servicesData}
              setServicesData={setServicesData}
            />
          </div>
        )}
      </main>

      <Footer systemSettings={systemSettings} products={productsList} />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onConfirm={handleConfirmOrder}
        user={isLoggedIn ? { name: userName, email: userEmail } : null}
      />
    </div>
  );
}

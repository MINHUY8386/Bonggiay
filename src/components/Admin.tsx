import React, { useState, useEffect } from 'react';
import { Package, Users, ShoppingBag, TrendingUp, Edit, Trash2, Plus, Search, Settings, Server, MessageSquare, Calendar, Leaf } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../lib/supabaseClient';
import { resolveImageUrl } from '../lib/image';

export default function Admin({ products, refreshProducts, systemSettings, setSystemSettings, servicesData, setServicesData }: any) {
  const [adminTab, setAdminTab] = useState('dashboard');
  const [orders, setOrders] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);

  const refreshOrders = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (data) setOrders(data.map((o: any) => ({ ...o, id: o.id })));
  };

  const refreshUsers = async () => {
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (data) setUsersList(data.map((u: any) => ({ name: u.full_name || u.email, email: u.email })));
  };

  const refreshContacts = async () => {
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    if (data) setContacts(data);
  };

  useEffect(() => {
    refreshOrders();
    refreshUsers();
    refreshContacts();
  }, []);

  return (
    <div className="flex min-h-[70vh] bg-[#FAF8F5]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-[#EBE7E0] p-6 hidden md:block shrink-0">
        <h2 className="text-xl font-bold text-[#2D3325] mb-8 font-serif">Quản trị viên</h2>
        <nav className="flex flex-col gap-2">
          <button onClick={() => setAdminTab('dashboard')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${adminTab === 'dashboard' ? 'bg-[#5A634A] text-white' : 'text-[#7D7D5A] hover:bg-[#EAE7DC]'}`}>
            <TrendingUp size={20} /> Tổng quan
          </button>
          <button onClick={() => setAdminTab('products')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${adminTab === 'products' ? 'bg-[#5A634A] text-white' : 'text-[#7D7D5A] hover:bg-[#EAE7DC]'}`}>
            <Package size={20} /> Sản phẩm
          </button>
          <button onClick={() => setAdminTab('orders')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${adminTab === 'orders' ? 'bg-[#5A634A] text-white' : 'text-[#7D7D5A] hover:bg-[#EAE7DC]'}`}>
            <ShoppingBag size={20} /> Đơn hàng
          </button>
          <button onClick={() => setAdminTab('users')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${adminTab === 'users' ? 'bg-[#5A634A] text-white' : 'text-[#7D7D5A] hover:bg-[#EAE7DC]'}`}>
            <Users size={20} /> Khách hàng
          </button>
          <button onClick={() => setAdminTab('contacts')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${adminTab === 'contacts' ? 'bg-[#5A634A] text-white' : 'text-[#7D7D5A] hover:bg-[#EAE7DC]'}`}>
            <MessageSquare size={20} /> Liên hệ
          </button>
          <button onClick={() => setAdminTab('services')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${adminTab === 'services' ? 'bg-[#5A634A] text-white' : 'text-[#7D7D5A] hover:bg-[#EAE7DC]'}`}>
            <Leaf size={20} /> Dịch vụ
          </button>
          <button onClick={() => setAdminTab('system')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${adminTab === 'system' ? 'bg-[#5A634A] text-white' : 'text-[#7D7D5A] hover:bg-[#EAE7DC]'}`}>
            <Settings size={20} /> Hệ thống
          </button>
        </nav>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex flex-col w-full">
        <div className="flex overflow-x-auto bg-white border-b border-[#EBE7E0] p-4 gap-2 snap-x">
          <button onClick={() => setAdminTab('dashboard')} className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap snap-start transition-colors cursor-pointer ${adminTab === 'dashboard' ? 'bg-[#5A634A] text-white' : 'bg-[#FAF8F5] text-[#7D7D5A]'}`}>
            Tổng quan
          </button>
          <button onClick={() => setAdminTab('products')} className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap snap-start transition-colors cursor-pointer ${adminTab === 'products' ? 'bg-[#5A634A] text-white' : 'bg-[#FAF8F5] text-[#7D7D5A]'}`}>
            Sản phẩm
          </button>
          <button onClick={() => setAdminTab('orders')} className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap snap-start transition-colors cursor-pointer ${adminTab === 'orders' ? 'bg-[#5A634A] text-white' : 'bg-[#FAF8F5] text-[#7D7D5A]'}`}>
            Đơn hàng
          </button>
          <button onClick={() => setAdminTab('users')} className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap snap-start transition-colors cursor-pointer ${adminTab === 'users' ? 'bg-[#5A634A] text-white' : 'bg-[#FAF8F5] text-[#7D7D5A]'}`}>
            Khách hàng
          </button>
          <button onClick={() => setAdminTab('contacts')} className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap snap-start transition-colors cursor-pointer ${adminTab === 'contacts' ? 'bg-[#5A634A] text-white' : 'bg-[#FAF8F5] text-[#7D7D5A]'}`}>
            Liên hệ
          </button>
          <button onClick={() => setAdminTab('services')} className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap snap-start transition-colors cursor-pointer ${adminTab === 'services' ? 'bg-[#5A634A] text-white' : 'bg-[#FAF8F5] text-[#7D7D5A]'}`}>
            Dịch vụ
          </button>
          <button onClick={() => setAdminTab('system')} className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap snap-start transition-colors cursor-pointer ${adminTab === 'system' ? 'bg-[#5A634A] text-white' : 'bg-[#FAF8F5] text-[#7D7D5A]'}`}>
            Hệ thống
          </button>
        </div>
        <div className="flex-1 p-4 md:p-8">
            {adminTab === 'dashboard' && <AdminDashboard orders={orders} users={usersList} products={products} />}
            {adminTab === 'products' && <AdminProducts products={products} refreshProducts={refreshProducts} />}
            {adminTab === 'orders' && <AdminOrders orders={orders} refreshOrders={refreshOrders} />}
            {adminTab === 'users' && <AdminUsers users={usersList} />}
            {adminTab === 'contacts' && <AdminContacts contacts={contacts} refreshContacts={refreshContacts} />}
            {adminTab === 'services' && <AdminServices servicesData={servicesData} setServicesData={setServicesData} />}
            {adminTab === 'system' && <AdminSystem systemSettings={systemSettings} setSystemSettings={setSystemSettings} />}
        </div>
      </div>

      {/* Main Content Desktop */}
      <div className="hidden md:block flex-1 p-8">
        {adminTab === 'dashboard' && <AdminDashboard orders={orders} users={usersList} products={products} />}
        {adminTab === 'products' && <AdminProducts products={products} refreshProducts={refreshProducts} />}
        {adminTab === 'orders' && <AdminOrders orders={orders} refreshOrders={refreshOrders} />}
        {adminTab === 'users' && <AdminUsers users={usersList} />}
        {adminTab === 'contacts' && <AdminContacts contacts={contacts} refreshContacts={refreshContacts} />}
        {adminTab === 'services' && <AdminServices servicesData={servicesData} setServicesData={setServicesData} />}
        {adminTab === 'system' && <AdminSystem systemSettings={systemSettings} setSystemSettings={setSystemSettings} />}
      </div>
    </div>
  );
}

function AdminDashboard({ orders, users, products }: any) {
  const [revenueFilter, setRevenueFilter] = useState<'week' | 'month' | 'quarter' | 'year'>('week');
  
  const totalRevenue = orders.reduce((sum: number, o: any) => o.status === 'Đã giao' ? sum + o.total : sum, 0);

  const parseDate = (dateStr: string) => {
    if (!dateStr || typeof dateStr !== 'string') return new Date();
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
    }
    return new Date();
  };

  const getChartData = () => {
    const data = [];
    const now = new Date();
    const validOrders = orders.filter((o: any) => o.status === 'Đã giao');

    if (revenueFilter === 'week') {
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dateStr = d.toLocaleDateString('vi-VN');
        const daySum = validOrders.filter((o: any) => o.order_date === dateStr).reduce((sum: number, o: any) => sum + o.total, 0);
        data.push({ name: `${d.getDate()}/${d.getMonth() + 1}`, revenue: daySum });
      }
    } else if (revenueFilter === 'month') {
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      for (let i = 1; i <= 4; i++) {
        data.push({ name: `Tuần ${i}`, revenue: 0 });
      }
      validOrders.forEach((o: any) => {
        const d = parseDate(o.order_date);
        if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
          const week = Math.min(Math.ceil(d.getDate() / 7), 4) - 1;
          data[week].revenue += o.total;
        }
      });
    } else if (revenueFilter === 'quarter') {
      const currentQuarter = Math.floor(now.getMonth() / 3);
      const currentYear = now.getFullYear();
      for (let i = 0; i < 3; i++) {
        const monthNum = currentQuarter * 3 + i;
        data.push({ name: `Tháng ${monthNum + 1}`, revenue: 0 });
      }
      validOrders.forEach((o: any) => {
        const d = parseDate(o.order_date);
        if (d.getFullYear() === currentYear && Math.floor(d.getMonth() / 3) === currentQuarter) {
          const monthIndex = d.getMonth() % 3;
          data[monthIndex].revenue += o.total;
        }
      });
    } else if (revenueFilter === 'year') {
      const currentYear = now.getFullYear();
      for (let i = 0; i < 12; i++) {
        data.push({ name: `T${i + 1}`, revenue: 0 });
      }
      validOrders.forEach((o: any) => {
        const d = parseDate(o.order_date);
        if (d.getFullYear() === currentYear) {
          data[d.getMonth()].revenue += o.total;
        }
      });
    }
    
    return data;
  };

  const chartData = getChartData();

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-semibold text-[#2D3325] font-serif">Tổng quan</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#EBE7E0] shadow-sm">
          <div className="w-12 h-12 bg-[#5A634A]/10 text-[#5A634A] rounded-2xl flex items-center justify-center mb-4"><TrendingUp size={24} /></div>
          <p className="text-[#7D7D5A] text-sm mb-1 uppercase tracking-widest font-medium">Doanh thu</p>
          <h3 className="text-2xl font-bold text-[#2D3325]">{totalRevenue.toLocaleString('vi-VN')}đ</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#EBE7E0] shadow-sm">
          <div className="w-12 h-12 bg-[#D97757]/10 text-[#D97757] rounded-2xl flex items-center justify-center mb-4"><ShoppingBag size={24} /></div>
          <p className="text-[#7D7D5A] text-sm mb-1 uppercase tracking-widest font-medium">Đơn hàng mới</p>
          <h3 className="text-2xl font-bold text-[#2D3325]">{orders.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#EBE7E0] shadow-sm">
          <div className="w-12 h-12 bg-[#5A634A]/10 text-[#5A634A] rounded-2xl flex items-center justify-center mb-4"><Package size={24} /></div>
          <p className="text-[#7D7D5A] text-sm mb-1 uppercase tracking-widest font-medium">Sản phẩm</p>
          <h3 className="text-2xl font-bold text-[#2D3325]">{products.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#EBE7E0] shadow-sm">
          <div className="w-12 h-12 bg-[#D97757]/10 text-[#D97757] rounded-2xl flex items-center justify-center mb-4"><Users size={24} /></div>
          <p className="text-[#7D7D5A] text-sm mb-1 uppercase tracking-widest font-medium">Khách hàng</p>
          <h3 className="text-2xl font-bold text-[#2D3325]">{users.length}</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-[#EBE7E0] shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="text-xl font-semibold text-[#2D3325] font-serif flex items-center gap-2">
            <Calendar size={20} className="text-[#5A634A]" />
            Biểu đồ doanh thu
          </h3>
          <div className="flex bg-[#FAF8F5] p-1 rounded-xl border border-[#EBE7E0]">
            {(['week', 'month', 'quarter', 'year'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setRevenueFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  revenueFilter === filter 
                    ? 'bg-white text-[#2D3325] shadow-sm' 
                    : 'text-[#7D7D5A] hover:text-[#2D3325]'
                }`}
              >
                {filter === 'week' && 'Tuần'}
                {filter === 'month' && 'Tháng'}
                {filter === 'quarter' && 'Quý'}
                {filter === 'year' && 'Năm'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBE7E0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#7D7D5A', fontSize: 12 }} dy={10} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#7D7D5A', fontSize: 12 }}
                tickFormatter={(value) => `${(value / 1000).toLocaleString('vi-VN')}k`}
              />
              <Tooltip 
                cursor={{ fill: '#FAF8F5' }}
                contentStyle={{ borderRadius: '12px', border: '1px solid #EBE7E0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`${value.toLocaleString('vi-VN')}đ`, 'Doanh thu']}
              />
              <Bar dataKey="revenue" fill="#5A634A" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function AdminProducts({ products, refreshProducts }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    tag: '',
    image: '',
    sales: '',
    description: ''
  });

  const handleOpenModal = (product?: any) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price.toString(),
        tag: product.tag || '',
        image: product.image || '',
        sales: product.sales ? product.sales.toString() : '0',
        description: product.description || ''
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: '', tag: '', image: '', sales: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        alert('Không xóa được: ' + error.message);
        return;
      }
      refreshProducts();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const priceNum = parseInt(formData.price.replace(/\D/g, ''), 10) || 0;
    const priceStr = priceNum.toLocaleString('vi-VN') + 'đ';
    const salesNum = parseInt(formData.sales, 10) || 0;

    const row = {
      name: formData.name,
      price: priceNum,
      price_str: priceStr,
      sales: salesNum,
      description: formData.description,
      tag: formData.tag,
      image: formData.image
    };

    const { error } = editingProduct
      ? await supabase.from('products').update(row).eq('id', editingProduct.id)
      : await supabase.from('products').insert(row);

    setSaving(false);

    if (error) {
      alert('Không lưu được sản phẩm: ' + error.message);
      return;
    }

    await refreshProducts();
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-[#2D3325] font-serif">Quản lý Sản phẩm</h2>
        <button onClick={() => handleOpenModal()} className="bg-[#5A634A] text-white px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#2D3325] transition-colors font-bold text-sm uppercase tracking-widest shadow-md cursor-pointer">
          <Plus size={16} /> Thêm sản phẩm
        </button>
      </div>
      <div className="bg-white rounded-3xl border border-[#EBE7E0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#EBE7E0] text-[#7D7D5A] uppercase tracking-widest text-xs">
                <th className="p-4 font-bold">Sản phẩm</th>
                <th className="p-4 font-bold">Giá</th>
                <th className="p-4 font-bold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p: any, i: number) => (
                <tr key={i} className="border-b border-[#EBE7E0] last:border-0 hover:bg-[#FAF8F5]/50 transition-colors">
                  <td className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#EAE7DC] rounded-xl overflow-hidden shrink-0">
                       <img src={p.image ? resolveImageUrl(p.image) : 'https://via.placeholder.com/150'} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-[#2D3325]">{p.name}</span>
                      {p.tag && <span className="text-[10px] text-[#D97757] uppercase font-bold tracking-wider">{p.tag}</span>}
                    </div>
                  </td>
                  <td className="p-4 text-[#D97757] font-bold">{p.priceStr}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleOpenModal(p)} className="text-[#7D7D5A] hover:text-[#5A634A] p-2 transition-colors cursor-pointer"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(p.id)} className="text-[#7D7D5A] hover:text-red-500 p-2 transition-colors cursor-pointer"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md animate-scale-up max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-[#2D3325] font-serif mb-6">{editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Tên sản phẩm</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#EBE7E0] focus:outline-none focus:border-[#5A634A] focus:ring-1 focus:ring-[#5A634A] transition-all bg-[#FAF8F5]" placeholder="Nhập tên sản phẩm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Lượt bán</label>
                <input required type="number" value={formData.sales} onChange={e => setFormData({...formData, sales: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#EBE7E0] focus:outline-none focus:border-[#5A634A] focus:ring-1 focus:ring-[#5A634A] transition-all bg-[#FAF8F5]" placeholder="Nhập lượt bán" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Giá (VNĐ)</label>
                <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#EBE7E0] focus:outline-none focus:border-[#5A634A] focus:ring-1 focus:ring-[#5A634A] transition-all bg-[#FAF8F5]" placeholder="Nhập giá sản phẩm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Chi tiết sản phẩm</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#EBE7E0] focus:outline-none focus:border-[#5A634A] focus:ring-1 focus:ring-[#5A634A] transition-all bg-[#FAF8F5]" placeholder="Nhập chi tiết sản phẩm..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Nhãn (tuỳ chọn)</label>
                <input type="text" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#EBE7E0] focus:outline-none focus:border-[#5A634A] focus:ring-1 focus:ring-[#5A634A] transition-all bg-[#FAF8F5]" placeholder="Hot, New, Sale..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Hình ảnh</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-4 py-3 rounded-xl border border-[#EBE7E0] focus:outline-none focus:border-[#5A634A] transition-all bg-[#FAF8F5] mb-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#5A634A]/10 file:text-[#5A634A] hover:file:bg-[#5A634A]/20" />
                <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-[#EBE7E0] focus:outline-none focus:border-[#5A634A] focus:ring-1 focus:ring-[#5A634A] transition-all bg-[#FAF8F5]" placeholder="Hoặc nhập URL hình ảnh" />
                {formData.image && (
                  <div className="mt-2 h-32 rounded-xl overflow-hidden bg-[#EAE7DC]">
                    <img src={resolveImageUrl(formData.image)} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-[#7D7D5A] font-bold uppercase tracking-widest text-sm hover:bg-[#FAF8F5] rounded-xl transition-colors cursor-pointer">Hủy</button>
                <button type="submit" disabled={saving} className="flex-1 py-3 bg-[#5A634A] text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-[#2D3325] transition-colors cursor-pointer disabled:opacity-60">{saving ? 'Đang lưu...' : 'Lưu'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function AdminOrders({ orders, refreshOrders }: any) {
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    if (error) {
      alert('Không cập nhật được trạng thái: ' + error.message);
      return;
    }
    refreshOrders();
  };

  const handleDelete = async (orderId: string) => {
    if (confirm('Bạn có chắc muốn xóa đơn hàng này?')) {
      const { error } = await supabase.from('orders').delete().eq('id', orderId);
      if (error) {
        alert('Không xóa được: ' + error.message);
        return;
      }
      refreshOrders();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-[#2D3325] font-serif">Quản lý Đơn hàng</h2>
      <div className="bg-white rounded-3xl border border-[#EBE7E0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#EBE7E0] text-[#7D7D5A] uppercase tracking-widest text-xs">
                <th className="p-4 font-bold">Mã ĐH</th>
                <th className="p-4 font-bold">Khách hàng</th>
                <th className="p-4 font-bold">Ngày đặt</th>
                <th className="p-4 font-bold">Tổng tiền</th>
                <th className="p-4 font-bold">Trạng thái</th>
                <th className="p-4 font-bold text-center w-24">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#7D7D5A]">Chưa có đơn hàng nào</td>
                </tr>
              ) : (
                orders.map((o: any, i: number) => (
                  <tr key={i} className="border-b border-[#EBE7E0] last:border-0 hover:bg-[#FAF8F5]/50 transition-colors">
                    <td className="p-4 font-mono text-[#5A634A] font-bold">{o.id}</td>
                    <td className="p-4 text-[#2D3325] font-medium">{o.customer}</td>
                    <td className="p-4 text-[#7D7D5A]">{o.order_date}</td>
                    <td className="p-4 font-bold text-[#D97757]">{o.total.toLocaleString('vi-VN')}đ</td>
                    <td className="p-4">
                      <select 
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        className="bg-[#5A634A]/10 text-[#5A634A] px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest border-none outline-none focus:ring-2 focus:ring-[#5A634A] cursor-pointer"
                      >
                        <option value="Đang xử lý">Đang xử lý</option>
                        <option value="Đang giao">Đang giao</option>
                        <option value="Đã giao">Đã giao</option>
                        <option value="Đã hủy">Đã hủy</option>
                      </select>
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => handleDelete(o.id)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors cursor-pointer" title="Xóa">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AdminUsers({ users }: any) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-[#2D3325] font-serif">Quản lý Khách hàng</h2>
      <div className="bg-white rounded-3xl border border-[#EBE7E0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#EBE7E0] text-[#7D7D5A] uppercase tracking-widest text-xs">
                <th className="p-4 font-bold">Khách hàng</th>
                <th className="p-4 font-bold">Email</th>
                <th className="p-4 font-bold">Vai trò</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: any, i: number) => (
                <tr key={i} className="border-b border-[#EBE7E0] last:border-0 hover:bg-[#FAF8F5]/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EAE7DC] text-[#5A634A] flex items-center justify-center font-bold font-serif">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[#2D3325] font-medium">{u.name}</span>
                  </td>
                  <td className="p-4 text-[#7D7D5A]">{u.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${u.email === 'admin@bonggiay.com' ? 'bg-[#D97757]/10 text-[#D97757]' : 'bg-[#5A634A]/10 text-[#5A634A]'}`}>
                      {u.email === 'admin@bonggiay.com' ? 'Admin' : 'Khách'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AdminSystem({ systemSettings, setSystemSettings }: any) {
  const [formData, setFormData] = useState(systemSettings);

  const handleSave = () => {
    setSystemSettings(formData);
    alert('Đã lưu cài đặt!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-[#2D3325] font-serif">Cài đặt Hệ thống</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#EBE7E0] shadow-sm">
          <h3 className="text-lg font-bold text-[#2D3325] mb-4 flex items-center gap-2">
            <Settings size={20} className="text-[#5A634A]" /> Cài đặt chung
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Tên cửa hàng</label>
              <input type="text" value={formData.storeName} onChange={e => setFormData({...formData, storeName: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-[#EBE7E0] bg-[#FAF8F5] focus:outline-none focus:border-[#5A634A]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Số điện thoại liên hệ</label>
              <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-[#EBE7E0] bg-[#FAF8F5] focus:outline-none focus:border-[#5A634A]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Email liên hệ</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-[#EBE7E0] bg-[#FAF8F5] focus:outline-none focus:border-[#5A634A]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Địa chỉ</label>
              <input type="text" value={formData.address || ''} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-[#EBE7E0] bg-[#FAF8F5] focus:outline-none focus:border-[#5A634A]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Giờ mở cửa</label>
              <input type="text" value={formData.openHours || ''} onChange={e => setFormData({...formData, openHours: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-[#EBE7E0] bg-[#FAF8F5] focus:outline-none focus:border-[#5A634A]" placeholder="VD: Mở cửa: T2 - CN: 8h - 20h" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Facebook Link</label>
              <input type="text" value={formData.facebook || ''} onChange={e => setFormData({...formData, facebook: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-[#EBE7E0] bg-[#FAF8F5] focus:outline-none focus:border-[#5A634A]" placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#7D7D5A] mb-1">TikTok Link</label>
              <input type="text" value={formData.tiktok || ''} onChange={e => setFormData({...formData, tiktok: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-[#EBE7E0] bg-[#FAF8F5] focus:outline-none focus:border-[#5A634A]" placeholder="https://tiktok.com/@..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#7D7D5A] mb-1">YouTube Link</label>
              <input type="text" value={formData.youtube || ''} onChange={e => setFormData({...formData, youtube: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-[#EBE7E0] bg-[#FAF8F5] focus:outline-none focus:border-[#5A634A]" placeholder="https://youtube.com/..." />
            </div>
            <button onClick={handleSave} className="mt-2 bg-[#5A634A] text-white px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#2D3325] transition-colors cursor-pointer w-full sm:w-auto">
              Lưu thay đổi
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#EBE7E0] shadow-sm">
          <h3 className="text-lg font-bold text-[#2D3325] mb-4 flex items-center gap-2">
            <Server size={20} className="text-[#5A634A]" /> Thông tin hệ thống
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-[#EBE7E0]">
              <span className="text-[#7D7D5A]">Phiên bản hệ thống</span>
              <span className="font-bold text-[#2D3325]">v1.0.0</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[#EBE7E0]">
              <span className="text-[#7D7D5A]">Trạng thái Server</span>
              <span className="px-3 py-1 bg-[#5A634A]/10 text-[#5A634A] text-xs font-bold rounded-full uppercase tracking-widest">Hoạt động tốt</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[#EBE7E0]">
              <span className="text-[#7D7D5A]">Dung lượng lưu trữ</span>
              <span className="font-bold text-[#2D3325]">45 MB / 1 GB</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[#EBE7E0]">
              <span className="text-[#7D7D5A]">Cập nhật lần cuối</span>
              <span className="font-bold text-[#2D3325]">Hôm nay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminContacts({ contacts, refreshContacts }: any) {
  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc muốn xóa tin nhắn này?')) {
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      if (error) {
        alert('Không xóa được: ' + error.message);
        return;
      }
      refreshContacts();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-[#2D3325] font-serif">Tin nhắn liên hệ</h2>
      <div className="bg-white rounded-3xl border border-[#EBE7E0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#EBE7E0] text-[#7D7D5A] uppercase tracking-widest text-xs">
                <th className="p-4 font-bold">Ngày gửi</th>
                <th className="p-4 font-bold">Tên khách hàng</th>
                <th className="p-4 font-bold">Liên hệ</th>
                <th className="p-4 font-bold">Nội dung</th>
                <th className="p-4 font-bold text-center w-24">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#7D7D5A]">
                    Chưa có tin nhắn liên hệ nào.
                  </td>
                </tr>
              ) : (
                contacts.map((c: any) => (
                  <tr key={c.id} className="border-b border-[#EBE7E0] last:border-0 hover:bg-[#FAF8F5]/50 transition-colors">
                    <td className="p-4 text-[#7D7D5A] text-sm whitespace-nowrap">{c.contact_date}</td>
                    <td className="p-4 font-medium text-[#2D3325] whitespace-nowrap">{c.name}</td>
                    <td className="p-4 text-[#7D7D5A] text-sm whitespace-nowrap">{c.email}</td>
                    <td className="p-4 text-[#2D3325] text-sm max-w-[300px] truncate" title={c.message}>{c.message}</td>
                    <td className="p-4 text-center">
                      <button onClick={() => handleDelete(c.id)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors cursor-pointer" title="Xóa">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AdminServices({ servicesData, setServicesData }: any) {
  const [formData, setFormData] = useState(servicesData);

  const handleSave = () => {
    setServicesData(formData);
    alert('Đã lưu dịch vụ!');
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const newList = [...formData.list];
    newList[index] = { ...newList[index], [field]: value };
    setFormData({ ...formData, list: newList });
  };

  if (!formData) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-[#2D3325] font-serif flex items-center justify-between">
        Quản lý Dịch vụ
        <button onClick={handleSave} className="bg-[#5A634A] text-white px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#2D3325] transition-colors cursor-pointer">
          Lưu thay đổi
        </button>
      </h2>
      
      <div className="bg-white p-6 rounded-3xl border border-[#EBE7E0] shadow-sm mb-6">
        <h3 className="text-lg font-bold text-[#2D3325] mb-4">Tiêu đề khu vực</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Tiêu đề chính</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              className="w-full px-4 py-2 rounded-xl border border-[#EBE7E0] bg-[#FAF8F5] focus:outline-none focus:border-[#5A634A]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Tiêu đề phụ</label>
            <input 
              type="text" 
              value={formData.subtitle} 
              onChange={e => setFormData({...formData, subtitle: e.target.value})} 
              className="w-full px-4 py-2 rounded-xl border border-[#EBE7E0] bg-[#FAF8F5] focus:outline-none focus:border-[#5A634A]" 
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {formData.list.map((item: any, index: number) => (
          <div key={item.id} className="bg-white p-6 rounded-3xl border border-[#EBE7E0] shadow-sm">
            <h3 className="text-lg font-bold text-[#2D3325] mb-4 flex items-center justify-between">
              Dịch vụ {index + 1}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Tên dịch vụ</label>
                <input 
                  type="text" 
                  value={item.title} 
                  onChange={e => handleServiceChange(index, 'title', e.target.value)} 
                  className="w-full px-4 py-2 rounded-xl border border-[#EBE7E0] bg-[#FAF8F5] focus:outline-none focus:border-[#5A634A]" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Icon (Tên Lucide Icon)</label>
                <select 
                  value={item.icon}
                  onChange={e => handleServiceChange(index, 'icon', e.target.value)} 
                  className="w-full px-4 py-2 rounded-xl border border-[#EBE7E0] bg-[#FAF8F5] focus:outline-none focus:border-[#5A634A]"
                >
                  <option value="Leaf">Leaf (Lá)</option>
                  <option value="Scissors">Scissors (Cắt tỉa)</option>
                  <option value="Droplet">Droplet (Nước)</option>
                  <option value="Flower">Flower (Hoa)</option>
                  <option value="Trees">Trees (Cây)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#7D7D5A] mb-1">Mô tả</label>
                <textarea 
                  value={item.desc} 
                  onChange={e => handleServiceChange(index, 'desc', e.target.value)} 
                  className="w-full px-4 py-2 rounded-xl border border-[#EBE7E0] bg-[#FAF8F5] focus:outline-none focus:border-[#5A634A] h-20" 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

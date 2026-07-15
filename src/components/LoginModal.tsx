import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState('');

  if (!isOpen) return null;

  const resetAndClose = () => {
    setError('');
    setInfo('');
    setPassword('');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);

    if (isRegister) {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
      });
      setLoading(false);
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      // Nếu dự án Supabase bật "Confirm email", session sẽ null cho tới khi xác nhận.
      if (data.session) {
        resetAndClose();
      } else {
        setInfo('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản trước khi đăng nhập.');
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (signInError) {
        setError('Email hoặc mật khẩu không đúng.');
        return;
      }
      resetAndClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={resetAndClose} />
      <div className="relative w-full max-w-md bg-[#FAF8F5] rounded-[32px] shadow-2xl overflow-hidden animate-fade-in font-sans">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-[#2D3325] font-serif">
              {isRegister ? 'Tạo tài khoản' : 'Đăng nhập'}
            </h2>
            <button onClick={resetAndClose} className="text-[#7D7D5A] hover:text-[#2D3325] transition-colors">
              <X size={24} />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}
          {info && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl text-sm">
              {info}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isRegister && (
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#7D7D5A]">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-white border border-[#E3DFD3] rounded-2xl py-3 pl-11 pr-4 text-[#3E3D32] outline-none focus:border-[#5A634A] transition-colors"
                  required
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#7D7D5A]">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="Email của bạn"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white border border-[#E3DFD3] rounded-2xl py-3 pl-11 pr-4 text-[#3E3D32] outline-none focus:border-[#5A634A] transition-colors"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#7D7D5A]">
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="Mật khẩu (tối thiểu 6 ký tự)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                minLength={6}
                className="w-full bg-white border border-[#E3DFD3] rounded-2xl py-3 pl-11 pr-4 text-[#3E3D32] outline-none focus:border-[#5A634A] transition-colors"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#5A634A] text-white font-bold py-4 rounded-full uppercase tracking-widest text-sm hover:bg-[#2D3325] transition-colors shadow-md mt-4 disabled:opacity-60 cursor-pointer">
              {loading ? 'Đang xử lý...' : isRegister ? 'Đăng ký' : 'Đăng nhập'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#7D7D5A]">
            {isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}
            <button type="button" onClick={() => { setIsRegister(!isRegister); setError(''); setInfo(''); }} className="ml-2 text-[#D97757] font-bold hover:underline cursor-pointer">
              {isRegister ? 'Đăng nhập' : 'Đăng ký ngay'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

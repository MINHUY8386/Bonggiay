/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // Không throw để app vẫn build được, nhưng cảnh báo rõ ràng ngoài console.
  console.error(
    '[Supabase] Thiếu VITE_SUPABASE_URL hoặc VITE_SUPABASE_ANON_KEY. ' +
    'Hãy tạo file .env.local (xem .env.example) hoặc cấu hình GitHub Secrets khi deploy.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Email của tài khoản quản trị viên duy nhất trong hệ thống.
// Tài khoản đăng nhập bằng email này sẽ thấy được trang /Quản trị.
export const ADMIN_EMAIL = 'Bonggiaybenluc@gmail.com';

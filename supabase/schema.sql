-- ============================================================================
-- SCHEMA DATABASE CHO WEBSITE BÔNG GIẤY BẾN LỨC
-- Chạy toàn bộ file này trong Supabase Dashboard > SQL Editor > New query > Run
-- ============================================================================

-- 1. BẢNG SẢN PHẨM ----------------------------------------------------------
create table if not exists public.products (
  id bigint generated always as identity primary key,
  name text not null,
  price integer not null default 0,
  price_str text not null default '',
  image text,
  tag text,
  sales integer not null default 0,
  description text,
  created_at timestamptz not null default now()
);

-- 2. BẢNG ĐƠN HÀNG -----------------------------------------------------------
create table if not exists public.orders (
  id text primary key, -- mã đơn hàng dạng "ORD-1234"
  user_id uuid references auth.users (id) on delete set null,
  customer text not null,
  phone text,
  email text,
  address text,
  notes text,
  payment_method text,
  items jsonb not null default '[]'::jsonb,
  shipping_fee integer not null default 0,
  total integer not null default 0,
  status text not null default 'Đang xử lý',
  order_date text,
  created_at timestamptz not null default now()
);

-- 3. BẢNG LIÊN HỆ -------------------------------------------------------------
create table if not exists public.contacts (
  id bigint generated always as identity primary key,
  name text not null,
  email text,
  message text,
  contact_date text,
  created_at timestamptz not null default now()
);

-- 4. BẢNG HỒ SƠ NGƯỜI DÙNG (đồng bộ tự động từ auth.users) -------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now()
);

-- Hàm + trigger: mỗi khi có người đăng ký tài khoản mới, tự tạo 1 dòng profile
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. BẢNG NỘI DUNG WEBSITE (thông tin cửa hàng + nội dung mục "Dịch vụ") -----
-- Chỉ có duy nhất 1 dòng (id = 1), lưu dạng JSON để linh hoạt chỉnh sửa trong Admin.
create table if not exists public.site_content (
  id integer primary key default 1,
  system_settings jsonb not null default '{}'::jsonb,
  services_data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

insert into public.site_content (id, system_settings, services_data)
values (
  1,
  '{
    "storeName": "Bông Giấy Bến Lức",
    "phone": "0399810748",
    "email": "contact@bonggiay.com",
    "address": "Ấp 8, Lương Hòa, Bến Lức, Tây Ninh",
    "openHours": "Mở cửa: T2 - CN: 8h - 20h",
    "facebook": "",
    "tiktok": "",
    "youtube": ""
  }'::jsonb,
  '{
    "title": "Dịch vụ của chúng tôi",
    "subtitle": "Mang đến giải pháp hoàn hảo cho không gian xanh của bạn.",
    "list": [
      { "id": 1, "icon": "Leaf", "title": "Chăm sóc Bông Giấy", "desc": "Cung cấp kỹ thuật tưới nước, bón phân và chăm sóc chuyên sâu để hoa ra quanh năm, màu sắc tươi tắn." },
      { "id": 2, "icon": "Scissors", "title": "Cắt tỉa & Tạo dáng", "desc": "Đội ngũ nghệ nhân giàu kinh nghiệm sẽ giúp tạo thế bonsai, leo giàn, uốn vòm cổng tuyệt đẹp." },
      { "id": 3, "icon": "Droplet", "title": "Tư vấn Thiết kế Cảnh quan", "desc": "Khảo sát tận nơi và thiết kế cảnh quan sân vườn, ban công, biệt thự với điểm nhấn là hoa bông giấy." }
    ]
  }'::jsonb
)
on conflict (id) do nothing;

-- 6. Dữ liệu sản phẩm mẫu ban đầu (chỉ chèn nếu bảng đang trống) --------------
-- Ảnh mặc định lấy từ thư mục public/images/ đi kèm trong code (đã có sẵn).
-- Bạn có thể thay bằng ảnh thật của vườn qua trang Admin bất cứ lúc nào.
insert into public.products (name, price, price_str, image, tag, sales, description)
select * from (values
  ('Bông Giấy Thái Đỏ', 250000, '250.000đ', 'images/product-red.jpg', 'Hot', 120, 'Bông giấy Thái đỏ nổi bật với sắc hoa rực rỡ quanh năm. Cây được tạo dáng bonsai nghệ thuật, phù hợp trưng bày phòng khách hoặc hiên nhà. Chăm sóc cực kỳ đơn giản.'),
  ('Bông Giấy Mỹ Cẩm Thạch', 350000, '350.000đ', 'images/product-pinkwhite.jpg', '', 85, ''),
  ('Bông Giấy Ngũ Sắc', 450000, '450.000đ', 'images/product-multicolor.jpg', 'New', 240, ''),
  ('Bông Giấy Tím Pháp', 200000, '200.000đ', 'images/product-purple.jpg', 'Sale', 50, '')
) as v(name, price, price_str, image, tag, sales, description)
where not exists (select 1 from public.products);

-- ============================================================================
-- HÀM KIỂM TRA QUYỀN ADMIN
-- Đổi email bên dưới nếu bạn muốn dùng email quản trị khác với admin@bonggiay.com
-- (phải khớp với ADMIN_EMAIL trong src/lib/supabaseClient.ts)
-- ============================================================================
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'admin@bonggiay.com';
$$;

-- ============================================================================
-- BẬT ROW LEVEL SECURITY (RLS) CHO TẤT CẢ CÁC BẢNG
-- ============================================================================
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.contacts enable row level security;
alter table public.profiles enable row level security;
alter table public.site_content enable row level security;

-- PRODUCTS: ai cũng xem được, chỉ admin mới thêm/sửa/xóa
drop policy if exists "products_select_public" on public.products;
create policy "products_select_public" on public.products for select using (true);
drop policy if exists "products_write_admin" on public.products;
create policy "products_write_admin" on public.products for all using (public.is_admin()) with check (public.is_admin());

-- SITE_CONTENT: ai cũng xem được, chỉ admin mới sửa
drop policy if exists "site_content_select_public" on public.site_content;
create policy "site_content_select_public" on public.site_content for select using (true);
drop policy if exists "site_content_update_admin" on public.site_content;
create policy "site_content_update_admin" on public.site_content for update using (public.is_admin()) with check (public.is_admin());

-- ORDERS: bất kỳ ai (kể cả khách chưa đăng nhập) đều có thể tạo đơn hàng;
-- chỉ admin xem được toàn bộ danh sách và cập nhật/xóa đơn.
drop policy if exists "orders_insert_public" on public.orders;
create policy "orders_insert_public" on public.orders for insert with check (true);
drop policy if exists "orders_select_admin" on public.orders;
create policy "orders_select_admin" on public.orders for select using (public.is_admin());
drop policy if exists "orders_update_admin" on public.orders;
create policy "orders_update_admin" on public.orders for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists "orders_delete_admin" on public.orders;
create policy "orders_delete_admin" on public.orders for delete using (public.is_admin());

-- CONTACTS: ai cũng gửi được liên hệ; chỉ admin xem/xóa được
drop policy if exists "contacts_insert_public" on public.contacts;
create policy "contacts_insert_public" on public.contacts for insert with check (true);
drop policy if exists "contacts_select_admin" on public.contacts;
create policy "contacts_select_admin" on public.contacts for select using (public.is_admin());
drop policy if exists "contacts_delete_admin" on public.contacts;
create policy "contacts_delete_admin" on public.contacts for delete using (public.is_admin());

-- PROFILES: admin xem được tất cả; người dùng xem được hồ sơ của chính mình
drop policy if exists "profiles_select_admin" on public.profiles;
create policy "profiles_select_admin" on public.profiles for select using (public.is_admin());
drop policy if exists "profiles_select_self" on public.profiles;
create policy "profiles_select_self" on public.profiles for select using (auth.uid() = id);

-- ============================================================================
-- HẾT. Sau khi chạy xong, vào Authentication > Providers, đảm bảo Email
-- provider đang bật (mặc định đã bật sẵn).
-- ============================================================================

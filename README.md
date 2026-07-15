# Bông Giấy Bến Lức — Website bán hàng

Website đã được nâng cấp để dùng **database thật (Supabase/Postgres)** thay vì lưu trong
trình duyệt (`localStorage`), có thể **public lên GitHub** và tự động deploy bằng
**GitHub Pages**, và đã gắn sẵn **Google Analytics**.

## Những gì đã thay đổi so với bản gốc

- Sản phẩm, đơn hàng, tin nhắn liên hệ, cài đặt cửa hàng, nội dung mục "Dịch vụ" →
  giờ lưu trong database Supabase (PostgreSQL), dùng chung cho tất cả mọi người,
  không mất khi xóa cache trình duyệt.
- Đăng nhập/đăng ký → dùng Supabase Authentication thật (mật khẩu được mã hoá,
  không còn lưu dạng chữ thường trong trình duyệt như bản cũ).
- Trang Quản trị (`/admin`) chỉ hiện với tài khoản có email trùng với
  `ADMIN_EMAIL` khai báo trong `src/lib/supabaseClient.ts` (mặc định:
  `admin@bonggiay.com`).
- Giỏ hàng vẫn lưu ở `localStorage` (việc này đúng ý — giỏ hàng chỉ cần theo máy).
- Đã gắn Google Analytics (GA4) qua biến môi trường `VITE_GA_MEASUREMENT_ID`.
- Đã có sẵn GitHub Actions để tự động build & deploy lên GitHub Pages mỗi khi
  bạn `git push` vào nhánh `main`.
- Đã xoá các file `patch*.cjs`, `test-*.js`, `metadata.json` — là rác sinh ra
  trong lúc tạo code ở AI Studio, không cần thiết cho website.

---

## BƯỚC 1 — Tạo database Supabase (miễn phí)

1. Vào **https://supabase.com** → **Start your project** → đăng nhập bằng GitHub.
2. Bấm **New project**, đặt tên tuỳ ý (vd: `bong-giay-store`), chọn mật khẩu
   database (lưu lại), chọn vùng gần Việt Nam nhất (Singapore).
3. Đợi project khởi tạo xong (~2 phút).
4. Vào menu **SQL Editor** (bên trái) → **New query**.
5. Mở file `supabase/schema.sql` trong project này, copy toàn bộ nội dung,
   dán vào SQL Editor rồi bấm **Run**. Lệnh này sẽ tạo đầy đủ bảng
   `products`, `orders`, `contacts`, `profiles`, `site_content`, cùng các quy
   tắc phân quyền (RLS) và dữ liệu sản phẩm mẫu ban đầu.
6. Vào **Project Settings** (biểu tượng bánh răng) → **API**. Bạn sẽ cần 2 giá trị:
   - **Project URL** → dùng cho `VITE_SUPABASE_URL`
   - **anon public key** → dùng cho `VITE_SUPABASE_ANON_KEY`
   (Đây là khoá công khai, an toàn khi để lộ ở frontend vì đã có RLS bảo vệ dữ liệu.)

### Tạo tài khoản Admin

Cách đơn giản nhất: mở website (local hoặc sau khi deploy), bấm **Đăng nhập →
Đăng ký ngay**, đăng ký với đúng email `admin@bonggiay.com` và mật khẩu bạn chọn.
Sau khi đăng ký (và xác nhận email nếu Supabase yêu cầu), đăng nhập lại — mục
**Quản trị** sẽ xuất hiện trên menu.

> Muốn đổi email admin? Sửa `ADMIN_EMAIL` trong `src/lib/supabaseClient.ts`
> **và** hàm `is_admin()` ở cuối file `supabase/schema.sql` (chạy lại đoạn đó
> trong SQL Editor) cho khớp nhau.

---

## BƯỚC 2 — Chạy thử ở máy tính của bạn

```bash
npm install
cp .env.example .env.local
# Mở .env.local, dán VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY lấy ở Bước 1
npm run dev
```

Mở `http://localhost:3000` để kiểm tra.

---

## BƯỚC 3 — Đưa code lên GitHub

Bạn đã có tài khoản GitHub, nên chỉ cần:

1. Vào **https://github.com/new**, tạo repository mới (vd: `bong-giay-store`),
   để **Public** hoặc **Private** tuỳ bạn, **không** tick "Add README".
2. Ở máy tính, trong thư mục project:

```bash
git init
git add .
git commit -m "Website bông giấy - dùng Supabase database"
git branch -M main
git remote add origin https://github.com/<username-github-cua-ban>/bong-giay-store.git
git push -u origin main
```

---

## BƯỚC 4 — Thêm Secrets để GitHub Actions build đúng

Vào repo trên GitHub → **Settings** → **Secrets and variables** → **Actions** →
**New repository secret**, thêm lần lượt 3 secrets:

| Tên secret | Giá trị |
|---|---|
| `VITE_SUPABASE_URL` | Project URL lấy ở Bước 1 |
| `VITE_SUPABASE_ANON_KEY` | anon public key lấy ở Bước 1 |
| `VITE_GA_MEASUREMENT_ID` | Measurement ID Google Analytics (xem Bước 6) |

---

## BƯỚC 5 — Bật GitHub Pages

Vào repo → **Settings** → **Pages** → mục **Build and deployment** → **Source**,
chọn **GitHub Actions** (không chọn "Deploy from a branch").

Sau đó vào tab **Actions** của repo, bạn sẽ thấy workflow **Deploy to GitHub
Pages** tự chạy (vì bạn vừa push ở Bước 3). Đợi chạy xong (chấm xanh ✔),
website sẽ có tại:

```
https://<username-github-cua-ban>.github.io/bong-giay-store/
```

Từ giờ, mỗi lần bạn `git push` lên nhánh `main`, site sẽ tự động build & deploy lại.

---

## BƯỚC 6 — Bạn đã có Google Analytics, lấy Measurement ID

1. Vào **https://analytics.google.com** → chọn đúng property của bạn (hoặc tạo
   mới nếu property này chưa từng gắn cho web này).
2. Vào **Admin** (bánh răng góc dưới trái) → **Data Streams** → chọn stream
   Web của bạn (hoặc **Add stream > Web**, nhập URL GitHub Pages ở Bước 5).
3. Copy **Measurement ID** (dạng `G-XXXXXXXXXX`).
4. Dán vào GitHub Secret `VITE_GA_MEASUREMENT_ID` (Bước 4), rồi vào tab
   **Actions** → chọn workflow gần nhất → **Re-run all jobs** để build lại
   với ID mới (hoặc chỉ cần push code mới).
5. Sau khi site chạy lại, vào lại Google Analytics → **Reports > Realtime**,
   mở thử website để kiểm tra thấy lượt truy cập hiện lên.

---

## Ghi chú thêm

- **Ảnh sản phẩm**: khi thêm sản phẩm trong trang Admin, nếu bạn tải ảnh lên từ
  máy, ảnh được lưu dạng base64 ngay trong database (đơn giản, không cần cấu
  hình gì thêm). Nếu sau này có nhiều ảnh/ảnh nặng, nên chuyển sang dùng
  **Supabase Storage** để tối ưu tốc độ tải trang — có thể nhờ hỗ trợ thêm khi cần.
- **Bảo mật**: khoá `anon key` là khoá công khai, an toàn khi lộ ra frontend vì
  mọi quyền đọc/ghi dữ liệu đều được kiểm soát bởi Row Level Security (RLS)
  khai báo trong `supabase/schema.sql` — chỉ tài khoản email admin mới sửa/xoá
  được sản phẩm, đơn hàng, tin nhắn liên hệ.
- **Chạy `npm run lint`** (kiểm tra kiểu TypeScript) trước khi push nếu bạn có
  chỉnh sửa code, để phát hiện lỗi sớm.

## Chạy lệnh (tham khảo)

```bash
npm install       # cài thư viện
npm run dev       # chạy thử ở local (http://localhost:3000)
npm run build     # build ra thư mục dist/
npm run preview   # xem thử bản build
```

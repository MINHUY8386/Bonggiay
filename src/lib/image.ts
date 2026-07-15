/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Chuyển giá trị "image" lưu trong database thành URL hiển thị được.
// - URL đầy đủ (http/https) hoặc ảnh base64 (data:) → giữ nguyên.
// - Đường dẫn tương đối (vd "images/product-red.jpg", ảnh mặc định trong
//   thư mục public/) → ghép với BASE_URL để chạy đúng cả khi site được host
//   ở dạng https://<user>.github.io/<repo>/ (subpath).
export function resolveImageUrl(image?: string | null): string {
  if (!image) return '';
  if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:')) {
    return image;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = image.startsWith('/') ? image.slice(1) : image;
  return `${cleanBase}${cleanPath}`;
}

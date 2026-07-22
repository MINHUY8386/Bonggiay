import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ---- Google Analytics (GA4) --------------------------------------------
// Chỉ gắn khi có VITE_GA_MEASUREMENT_ID (đặt trong .env.local khi chạy local,
// hoặc GitHub Secret VITE_GA_MEASUREMENT_ID khi deploy qua GitHub Actions).
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (GA_ID) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;
  // Cho phép rõ ràng việc thu thập dữ liệu — tránh bị "Consent Mode" mặc định
  // của Google giữ lại không gửi dữ liệu đi (im lặng, không báo lỗi).
  gtag('consent', 'default', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  });
  gtag('js', new Date());
  gtag('config', GA_ID);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

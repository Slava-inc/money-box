// frontend/miniapp1-test/src/env.d.ts
/// <reference types="vite/client" />
interface Window {
  Telegram?: {
    WebApp?: {
      initData: string;
      ready: () => void;
    };
  };
}



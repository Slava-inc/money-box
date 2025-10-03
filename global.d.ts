// global.d.ts
// Декларация глобального объекта window с дополнительным свойством Telegram
interface Window {
  Telegram?: {
    WebApp?: {
      initData: string;
      ready: () => void;
      // Добавьте другие методы и свойства, если они вам нужны
    };
  };
}
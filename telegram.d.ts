export { }; // Ensure this file is treated as a module

interface HapticFeedback {
  impactOccurred(type: "light" | "medium" | "heavy"): void;
}

// Define types for Telegram and WebApp
interface TelegramWebApp {
  initData: string;
  ready(callback: () => void): void;
  expand(): void;
  disableVerticalSwipes(): void;
  platform: string;
  HapticFeedback: HapticFeedback;
}

interface Telegram {
  WebApp: TelegramWebApp;
}

// Extend the global window object
declare global {
  interface Window {
    Telegram: Telegram;
  }
}

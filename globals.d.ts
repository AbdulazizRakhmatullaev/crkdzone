import { PrismaClient } from '@prisma/client';
import { LargeNumberLike } from 'crypto';
import { list } from 'postcss';

declare global {
    var prisma: PrismaClient | undefined; // Allow it to be undefined initially
}

interface WebAppUser {
    id: number;
    username: string;
    first_name: string;
    last_name?: string;
    photo_url?: string;
    language_code?: string;
}

interface HapticFeedback {
    impactOccurred(type: "light" | "medium" | "heavy"): void;
}

// Define types for Telegram and WebApp
interface TelegramWebApp {
    initData: string;
    initDataUnsafe: {
        user?: WebAppUser;  // The user data may or may not be present
        query_id?: string;
        auth_date?: number;
        hash?: string;
    };
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

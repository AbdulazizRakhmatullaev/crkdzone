"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Loading from '../components/loading';

interface User {
    id: number
    tg_id: bigint;
    firstName: string;
    balance: number;
    friends: number;
    authDate: Date;
}

interface InitContextType {
    user: User | null;
    platform: string | undefined;
}

export const InitDataContext = createContext<InitContextType | undefined>(undefined);

interface WebAppUser {
    id: number;
    username: string;
    first_name: string;
    last_name?: string;
    photo_url?: string;
    language_code?: string;
}

interface DataUnsafe {
    user?: WebAppUser;
    query_id?: string;
    auth_date?: number;
    hash?: string;
}

export function InitDataProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [initData, setInitData] = useState("");
    const [dataUnsafe, setDataUnsafe] = useState<DataUnsafe | null>(null);
    const [platform, setPlatform] = useState("phn");

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js?56";
        script.async = true;

        script.onload = () => {
            if (window?.Telegram?.WebApp) {
                const webApp = window.Telegram?.WebApp;

                webApp.ready();
                webApp.expand();
                webApp.disableVerticalSwipes();

                setInitData(webApp.initData);
                setDataUnsafe(webApp.initDataUnsafe);

                if (webApp.platform === "ios" || platform === "android") {
                    setPlatform("phn");
                } else {
                    setPlatform("dsk");
                }
            };
        };

        document.head.appendChild(script);
    }, []);

    useEffect(() => {
        if (window.Telegram?.WebApp && process.env.NODE_ENV === "production") {
            const params = new URLSearchParams(initData);
            const tg_id = params.get("user") ? JSON.parse(params.get("user")!).id : null;
            const firstName = dataUnsafe?.user?.first_name;
            const pic = dataUnsafe?.user?.photo_url;

            const fetchUser = async () => {
                try {
                    const res = await fetch("/api/check-user", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ tg_id, firstName, pic })
                    });
                    if (!res.ok) throw new Error("Unable to run check-user.");

                    const user = await res.json();
                    setUser(user);
                } catch (error) {
                    console.error(error);
                }
            }

            fetchUser();
        } else {
            // const fetchUser = async () => {
            //     try {
            //         const res = await fetch(`/api/user?tg_id=${336417426}`);
            //         if (!res.ok) throw new Error("Unable to run check-user.");

            //         const [user] = await res.json();
            //         setUser(user);
            //     } catch (error) {
            //         console.error(error);
            //     }
            // }

            // fetchUser();
            setUser({
                id: 1,
                tg_id: BigInt(129372),
                firstName: "Abdulaziz",
                balance: 11200000,
                friends: 0,
                authDate: new Date()
            })
        }

        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [])

    return (
        <InitDataContext.Provider value={{ user, platform }}>
            {loading ? (
              <Loading />  
            ) : (
                children
            )}
        </InitDataContext.Provider>
    );
}

export const useInitData = () => {
    const context = useContext(InitDataContext);
    if (!context) {
        throw new Error('useInitData must be used within a InitDataProvider');
    }
    return context;
};
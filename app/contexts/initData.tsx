"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Loading from '../components/loading';

interface User {
    id: number
    tg_id: bigint;
    firstName: string;
    pic: string;
    balance: number;
    friends: number;
    authDate: Date;
}

interface InitContextType {
    user: User | null;
    platform: string | undefined;
}

export const InitDataContext = createContext<InitContextType | undefined>(undefined);

export function InitDataProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [platform, setPlatform] = useState<string | undefined>(undefined);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js";
        script.async = true;

        script.onload = () => {
            if (window?.Telegram?.WebApp) {
                const webApp = window.Telegram?.WebApp;

                webApp.ready();
                webApp.expand();
                webApp.disableVerticalSwipes();

                if (webApp.platform === "ios" || platform === "android") {
                    setPlatform("phn");
                } else {
                    setPlatform("dsk");
                }
            };
        };

        document.head.appendChild(script);

        if (process.env.NODE_ENV === "production") {
            setTimeout(() => {
                setLoading(false);
            }, 1600);
        } else {
            setLoading(false);
        }
    }, [platform]);

    useEffect(() => {
        if (window.Telegram?.WebApp && process.env.NODE_ENV === "production") {
            const webApp = window.Telegram.WebApp;
            const initData = webApp.initData;
            const dataUnsafe = webApp.initDataUnsafe;

            const params = new URLSearchParams(initData);
            const tg_id = params.get("user") ? JSON.parse(params.get("user")!).id : null;
            const firstName = dataUnsafe.user?.first_name;
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
        } 
        // else {
        //     const fetchUser = async () => {
        //         try {
        //             const res = await fetch(`/api/user?tg_id=${336417426}`);
        //             if (!res.ok) throw new Error("Unable to run check-user.");
    
        //             const [user] = await res.json();
        //             console.log(user)
        //             setUser(user);
        //         } catch (error) {
        //             console.error(error);
        //         }
        //     }
    
        //     fetchUser();
        // }
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
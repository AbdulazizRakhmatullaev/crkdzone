import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
    id: number
    tg_id: bigint;
    username: string;
    avatar_url: string;
    balance: number;
    friends: number;
    authDate: Date;
}

interface UserContextType {
    user: User | null;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

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
    }, [])

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface User {
    tg_id: number;
    username: string;
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
    const [tgId, setTgId] = useState<number | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [noUsername, setNoUsername] = useState(false);

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const webApp = window.Telegram?.WebApp;
            const initData = webApp?.initData;

            if (initData) {
                const params = new URLSearchParams(initData);
                const userId = params.get("user") ? JSON.parse(params.get("user")!).id : null;
                const username = params.get("user") ? JSON.parse(params.get("user")!).username : null;

                setTgId(userId);
                setUsername(username);
            }
        }
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            if (username !== "") {
                try {
                    const res = await fetch('/api/check-user', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ tgId, username })
                    });

                    if (!res.ok) throw new Error("Error fetching user");
                    const userData = await res.json();
                    setUser(userData);
                } catch (err) {
                    console.error("Error fetching user", err);
                }
            } else {
                setNoUsername(true);
            }
        }

        fetchUser();
    }, [tgId, username])

    return (
        <UserContext.Provider value={{ user }}>
            {noUsername ? (
                <div>Soldier, you should a username on your profile <br /> comeback when you are ready.</div>
            ) : (
                children
            )}
        </UserContext.Provider>
    );
}
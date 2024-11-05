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

interface WebAppUser {
    id: number;
    username: string | null;
    first_name: string;
    last_name?: string;
    photo_url?: string;
    language_code?: string;
}

interface initDataUnsafe {
    user?: WebAppUser;
    query_id?: string;
    auth_date?: number;
    hash?: string;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [dataUnsafe, setDataUnsafe] = useState<initDataUnsafe | null>(null);
    const [noUsername, setNoUsername] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [tgId, setTgId] = useState<number | null>(null);
    const [username, setUsername] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const webApp = window.Telegram?.WebApp;
            const initData = webApp?.initData;

            if (initData) {
                const params = new URLSearchParams(initData);
                const userId = params.get("user") ? JSON.parse(params.get("user")!).id : null;

                setTgId(userId);
            }

            const dataUnsafe = webApp?.initDataUnsafe;
            if (dataUnsafe.user?.username === undefined) setNoUsername("null");
            setDataUnsafe(dataUnsafe);
            setUsername(dataUnsafe.user?.username);
        }
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            if (dataUnsafe?.user?.username !== undefined) {
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
            }
        }

        fetchUser();
    }, [tgId, username, dataUnsafe])

    return (
        <UserContext.Provider value={{ user }}>
            {noUsername === undefined ? (
                <div>Soldier, you should a username on your profile <br /> comeback when you are ready.</div>
            ) : (
                children
            )}
        </UserContext.Provider>
    );
}
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import Image from 'next/image';

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
            setDataUnsafe(dataUnsafe);
            setUsername(dataUnsafe?.user?.username);
        }
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            if (dataUnsafe?.user?.username !== undefined && window.Telegram?.WebApp) {
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
            {window.Telegram?.WebApp && dataUnsafe?.user?.username === undefined ? (
                <div className='fl flex-col justify-center items-center h100'>
                    <Image
                        src="/soldier_no_username.png"
                        alt="img"
                        priority={true}
                        width={250} // Placeholder values
                        height={250} // Placeholder values
                    />
                    <div className="txt text-center">We can't recognise you, Soldier!<br /> Comeback when you have a nickname.</div>
                </div>
            ) : (
                children
            )}
        </UserContext.Provider>
    );
}
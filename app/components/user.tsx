import React, { createContext, useState, ReactNode, useEffect } from 'react';
import Image from 'next/image';

interface User {
    tg_id: number;
    username: string;
    balance: number;
    friends: number;
    authDate: Date;
}

interface WebAppUser {
    id: number;
    username: string | undefined;
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

interface UserContextType {
    user: User | null;
    dataUnsafe: initDataUnsafe | null;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [dataUnsafe, setDataUnsafe] = useState<initDataUnsafe | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [tgId, setTgId] = useState<number | null>(null);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [noUsername, setNoUsername] = useState(false);

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const webApp = window.Telegram?.WebApp;
            const initData = webApp?.initData;
            const dataUnsafe = webApp?.initDataUnsafe;

            if (initData) {
                const params = new URLSearchParams(initData);
                const tgId = params.get("user") ? JSON.parse(params.get("user")!).id : null;
                const username = params.get("user") ? JSON.parse(params.get("user")!).username : null;

                setTgId(tgId);
                setUsername(username);
                setNoUsername(true);
            }

            setDataUnsafe(dataUnsafe);
        }
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            if (username !== undefined) {
                try {
                    const res = await fetch('/api/check-user', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ tg_id: tgId, username, avatar_url: dataUnsafe?.user?.photo_url })
                    });

                    if (!res.ok) throw new Error("Error getting or creating user");

                    const userData = await res.json();
                    setUser(userData);
                } catch (err) {
                    console.error("Error getting or creating user", err);
                }
            } else {
                console.log("No username for this profile");
            }
        }

        fetchUser();
    }, [tgId, username, dataUnsafe])

    return (
        <UserContext.Provider value={{ user, dataUnsafe }}>
            {noUsername ? (
                <div className='fl flex-col justify-center items-center h-full px-5'>
                    <Image
                        src="/soldier_no_username.png"
                        alt="img"
                        priority={true}
                        width={250}
                        height={250}
                    />
                    <div className="text-center">
                        We can&apos;t recognise you, Soldier!
                        <br /> Come back with your username and earn your freedom.
                    </div>
                </div>
            ) : (
                children
            )}
            {/* {children} */}
        </UserContext.Provider>
    );
}
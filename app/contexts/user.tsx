import React, { createContext, useState, ReactNode, useEffect } from 'react';
import Image from 'next/image';

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
        if (window.Telegram?.WebApp) {
            const webApp = window.Telegram?.WebApp;
            const initData = webApp?.initData;
            const dataUnsafe = webApp?.initDataUnsafe;

            const params = new URLSearchParams(initData);
            const tg_id = JSON.parse(params.get("user")!).id;
            const username = params.get("user") ? JSON.parse(params.get("user")!).username : undefined;

            if (username !== undefined && process.env.NODE_ENV === "production") {
                const fetchUser = async () => {
                        try {
                        const avatar_url = dataUnsafe?.user?.photo_url;

                        const res = await fetch("api/check-user", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ tg_id, username, avatar_url })
                        });
                        if (!res.ok) throw new Error("Unable to run check-user.");

                            const user = await res.json();
                            setUser(user);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                    fetchUser();
            };
        }
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {user?.username === undefined && process.env.NODE_ENV === "production" ? (
                <div className='fl flex-col justify-center items-center px-5 h-full bg-black'>
                    <Image
                        src="/noUsername.jpg"
                        alt="img"
                        priority={true}
                        width={250}
                        className='mb-10'
                    />
                    <div className='text-xl uppercase'>Soldier?</div>
                    <div className="text-center">
                        We are unable to recognize you,
                        <br /> Come back with your username on you!
                    </div>
                </div>
            ) : (
                children
            )}
        </UserContext.Provider>
    );
}

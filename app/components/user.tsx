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
    const [tgId, setTgId] = useState<number | bigint>(0);
    const [username, setUsername] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const webApp = window.Telegram?.WebApp;
            const initData = webApp?.initData;
            const dataUnsafe = webApp?.initDataUnsafe;

            if (initData) {
                const params = new URLSearchParams(initData);
                const tgId = params.get("user") ? JSON.parse(params.get("user")!).id : null;
                const username = params.get("user") ? JSON.parse(params.get("user")!).username : null;

                setUsername(username);
                setTgId(tgId);
            }

            setDataUnsafe(dataUnsafe);
        }
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            if (username !== undefined) {
                const res = await fetch("api/check-user");
                if (!res.ok) throw new Error("Unable to run check-user.");

                const user = await res.json()
                setUser(user)
            }
        }

        fetchUser();
    }, [tgId, username, dataUnsafe])

    return (
        <UserContext.Provider value={{ user, dataUnsafe }}>
            {username === undefined && process.env.NODE_ENV === "develepment" ? (
                <div className='fl flex-col justify-center items-center px-5 h-full bg-black'>
                    <Image
                        src="/noUsername.jpg"
                        alt="img"
                        priority={true}
                        width={250}
                        height={150}
                        className='mb-10'
                    />
                    <div className='text-xl uppercase'>S.. Soldier?</div>
                    <div className="text-center">
                        We are unable to recognise you,
                        <br /> Come back with your username on you!
                    </div>
                </div>
            ) : (
                children
            )}
        </UserContext.Provider>
    );
}
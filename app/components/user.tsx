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

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/check-user');

                if (!res.ok) throw new Error("Error fetching user");
                const userData = await res.json();
                setUser(userData);
            } catch (err) {
                console.error("Error fetching user", err);
            }
        }

        fetchUser();
    }, [])

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
}
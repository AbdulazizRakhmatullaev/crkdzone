"use client";

import { createContext, useContext, useState } from 'react';

type LayoutContextType = {
    fullHeight: boolean;
    setFullHeight: (value: boolean) => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [fullHeight, setFullHeight] = useState(false);

    return (
        <LayoutContext.Provider value={{ fullHeight, setFullHeight }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
};

'use client'
import React, { createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Buat tipe untuk konteks autentikasi
interface AuthContextProps {
    checkAuth: () => void;
}
interface AuthProviderProps {
    children: any;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Buat sebuah provider untuk konteks
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const base_url = process.env.base_url;
    const router = useRouter()

    const checkAuth = async () => {
        const token_api = localStorage.getItem('token_api');
        if (token_api) {
            try {
                const response = await axios.get(`${base_url}/api/dashboard/regpoli/daily?tgl_registrasi=2023-11-10`, {
                    headers: {
                        'Authorization': 'Bearer ' + token_api
                    }
                });

                if (response.data.status !== true) {
                    router.push('/login');
                }
            } catch (error) {
                router.push('/login');
            }
        } else {
            router.push('/login');
        }
    };

    // Melewatkan fungsi checkAuth ke dalam konteks
    const contextValue: AuthContextProps = {
        checkAuth
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Buat custom hook untuk menggunakan konteks tersebut di komponen mana pun
export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

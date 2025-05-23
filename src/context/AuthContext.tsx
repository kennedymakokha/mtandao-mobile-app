// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { NavigationProp, useNavigation } from '@react-navigation/native';


type AuthContextType = {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
    token: null,
    login: () => { },
    logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

   export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const navigation = useNavigation();

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await AsyncStorage.getItem('accessToken');
            if (storedToken) {
                const isExpired = isTokenExpired(storedToken);
                if (isExpired) {
                    logout();
                } else {
                    setToken(storedToken);
                }
            }
        };

        loadToken();

        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    const login = async (newToken: string) => {
        await AsyncStorage.setItem('accessToken', newToken);
      
        setToken(newToken);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Admindashboard' as never }],
        });
    };

    const logout = async () => {
        await AsyncStorage.removeItem('accessToken');
        setToken(null);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' as never }],
        });
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

function isTokenExpired(token: string): boolean {
    try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch {
        return true;
    }
}

import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthContextType {
    user: any;
    loading: any,
    token: any,
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState<any>()

    useEffect(() => {
        const getToken = async () => {
            const token = await AsyncStorage.getItem('token')
            setToken(token)
        }

        const loadUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('user')
                if(userData) {
                    setUser(JSON.parse(userData))
                }
            } catch (error) {
                console.log('Erro ao carregar os dados do usuário.', error)
            }
            setLoading(false); 
        }
        getToken()
        loadUserData()
    }, [])

    return(
        <AuthContext.Provider value={{user, setUser, token, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};
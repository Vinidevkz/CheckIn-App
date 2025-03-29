import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthContextType {
    movie: any;
    setMovie: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        const loadmovieData = async () => {
            try {
                const movieData = await AsyncStorage.getItem('movie')
                if(movieData) {
                    setMovie(JSON.parse(movieData))
                }
            } catch (error) {
                console.log('Erro ao carregar os dados do usuário.', error)
            }

        }
        loadmovieData()
    }, [])

    return(
        <AuthContext.Provider value={{movie, setMovie}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useMovieContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('O movieContext deve ser usado dentro de um AuthProvider');
    }
    return context;
};
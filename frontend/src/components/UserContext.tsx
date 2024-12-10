import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Définit le type pour l'utilisateur
interface User {
    username: string;
    isAdmin: boolean;
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logout: () => void;
}

// Crée le contexte
const UserContext = createContext<UserContextType | undefined>(undefined);

// Fournisseur du contexte
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Fonction de déconnexion
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Supprime le token
    };

    // Initialisation du contexte utilisateur depuis le token JWT
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1])); // Décode le payload JWT
                setUser({
                    username: decodedToken.username,
                    isAdmin: decodedToken.isAdmin,
                });
            } catch (error) {
                console.error('Erreur lors du décodage du token JWT :', error);
                logout(); // En cas d'erreur, déconnecte l'utilisateur
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook pour utiliser le contexte
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export default UserContext;

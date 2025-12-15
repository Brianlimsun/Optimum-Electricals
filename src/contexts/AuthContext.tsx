import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    type User
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { api, type UserProfile } from '../lib/api';

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null | undefined; // undefined = loading, null = no profile, object = has profile
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            // Unblock UI immediately - fetch profile in background
            setLoading(false);

            if (currentUser) {
                // Try fetching profile from API
                api.getUserProfile(currentUser.uid).then((userProfile) => {
                    setProfile(userProfile);

                    if (userProfile) {
                        localStorage.setItem('authUser', JSON.stringify({
                            uid: currentUser.uid,
                            email: currentUser.email,
                            displayName: currentUser.displayName
                        }));
                    }
                });
            } else {
                setProfile(null);
                localStorage.removeItem('authUser');
            }
        });

        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    const logout = async () => {
        await signOut(auth);
        setProfile(null);
    };

    const refreshProfile = async () => {
        if (user) {
            const userProfile = await api.getUserProfile(user.uid);
            setProfile(userProfile);
        }
    };

    const value = {
        user,
        profile,
        loading,
        login,
        signup,
        loginWithGoogle,
        logout,
        refreshProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

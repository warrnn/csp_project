import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import axios from "axios";

type AuthContextType = {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get('/api/auth/session');

                if (response.data?.user) {
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error(error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        fetchSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
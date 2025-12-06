import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import axios from "axios";

type Profile = {
    id: string;
    email: string;
    full_name: string;
    role: string;
}

type AuthContextType = {
    user: User | null;
    profile: Profile | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, profile: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get('/api/auth/session');

                if (response.data?.user) {
                    // dari auth supabase
                    // console.log(response.data.user);
                    setUser(response.data.user);

                    // dari table profile
                    // console.log(response.data.profile);
                    setProfile(response.data.profile);
                }
            } catch (error) {
                console.error(error);
                setUser(null);
                setProfile(null);
            } finally {
                setLoading(false);
            }
        }

        fetchSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, profile, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
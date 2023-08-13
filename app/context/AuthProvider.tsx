'use client';
import supabase from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: User | null;
  credit: number | null;
  setCreditLeft: (creditLeft: number) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  credit: null,
  setCreditLeft: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [credit, setCredit] = useState<number | null>(null);

  const setCreditLeft = (creditLeft: number) => {
    if (!credit) return;
    setCredit(creditLeft);
  };

  const onAuthStateChange = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        console.log('user', user);
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChange();
  }, []);

  useEffect(() => {
    const fetchCredit = async () => {
      const { data, error } = await supabase
        .from('credit')
        .select('credit_left')
        .eq('uid', user?.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }
      console.log('credit', data?.credit_left);

      setCredit(data?.credit_left || 0);
    };

    if (user) {
      fetchCredit();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, credit, setCreditLeft }}>
      {children}
    </AuthContext.Provider>
  );
}

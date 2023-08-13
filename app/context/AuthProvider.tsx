'use client';
import supabase from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

type Credit = {
  id: string;
  credit_left: number;
};

type AuthContextType = {
  user: User | null;
  credit: Credit | null;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  credit: null,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [credit, setCredit] = useState<Credit | null>(null);

  const onAuthStateChange = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
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

      setCredit((data as Credit) ?? null);
    };

    if (user) {
      fetchCredit();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, credit }}>
      {children}
    </AuthContext.Provider>
  );
}

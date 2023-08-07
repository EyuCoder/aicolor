import supabase from '@/lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa, ThemeMinimal, darkThemes } from '@supabase/auth-ui-shared';

export default function AuthForm() {
  return (
    <Auth
      appearance={{ theme: ThemeSupa }}
      supabaseClient={supabase}
      providers={['google', 'github']}
      socialLayout='horizontal'
    />
  );
}

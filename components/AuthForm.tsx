'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthForm() {
  const supabase = createClientComponentClient();

  return (
    <Auth
      redirectTo='http://localhost:3000/auth/callback'
      supabaseClient={supabase}
      view='magic_link'
      showLinks={false}
      appearance={{ theme: ThemeSupa }}
      theme='light'
      providers={['google', 'github']}
      socialLayout='horizontal'
    />
  );
}

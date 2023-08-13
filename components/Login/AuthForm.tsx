'use client';
import supabase from '@/lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthForm() {
  const host =
    window.location.origin ||
    window.location.host ||
    'https://aicolor.vercel.app';
  const callbackUrl = host + '/auth/callback';

  return (
    <div className='mb-6'>
      <Auth
        redirectTo={callbackUrl}
        supabaseClient={supabase}
        view='magic_link'
        showLinks={false}
        appearance={{ theme: ThemeSupa }}
        theme='dark'
        providers={['google', 'github']}
        socialLayout='horizontal'
      />
    </div>
  );
}

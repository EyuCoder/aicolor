import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ai colorize',
  description: 'photo colorizer ai',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>
        <Providers>
          <NavBar session={data.session} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

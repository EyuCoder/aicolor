import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './context/providers';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { AuthProvider } from './context/AuthProvider';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ai color',
  description: 'photo colorizer ai',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <NavBar />
            {children}
            <Footer />
          </AuthProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

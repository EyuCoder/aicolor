import Hero from '@/components/HomePage/Hero';

export default async function Home() {
  return (
    <main className='flex flex-col items-center justify-between min-h-screen'>
      <Hero />
      <div className='p-10 mt-10 border auth-widget'></div>
    </main>
  );
}

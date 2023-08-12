import Hero from '@/components/LandingPage/Hero';

export default async function Home() {
  return (
    <main className='flex flex-col items-center justify-between min-h-[80vh]'>
      <Hero />
    </main>
  );
}

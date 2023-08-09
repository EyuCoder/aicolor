import AuthForm from '@/components/AuthForm';

export default async function Home() {
  return (
    <main className='flex flex-col items-center justify-between min-h-screen'>
      <div className='p-10 mt-10 border auth-widget'>
        <AuthForm />
      </div>
    </main>
  );
}

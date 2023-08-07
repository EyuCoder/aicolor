'use client';
import supabase from '@/lib/supabase';
import { useState } from 'react';

type Props = {};

const App = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const onUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const { data, error } = await supabase.storage
      .from('ai_colorize_bucket')
      .upload(file.name, file);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (!event.target.files) return;
    setFile(event.target.files[0]);
  };

  return (
    <div className='container p-10 mx-auto'>
      <form onSubmit={onUpload}>
        <input type='file' onChange={handleFile} />
        <button type='submit'>Upload</button>
      </form>
    </div>
  );
};

export default App;

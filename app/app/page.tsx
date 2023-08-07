'use client';
import supabase from '@/lib/supabase';
import { useState } from 'react';

type Props = {};

const App = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [colorPhoto, setColorPhoto] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const colorizePhoto = async () => {
    setLoading(true);

    const res = await fetch('/colorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl:
          'https://lnbztldpattfenkpexex.supabase.co/storage/v1/object/public/ai_colorize_bucket/photo_2023-08-06_13-04-35.jpg',
      }),
    });

    let generatedImg = await res.json();
    if (res.status == 200) {
      console.log(generatedImg);
      setColorPhoto(generatedImg);
    } else {
      console.log('status', res.status, 'error', generatedImg);
    }

    setLoading(false);
  };

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
      <button onClick={colorizePhoto}>getColorized</button>
      {loading && <p>Loading...</p>}
      {colorPhoto && <img src={colorPhoto} alt='' />}
    </div>
  );
};

export default App;

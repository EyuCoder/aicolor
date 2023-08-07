/* eslint-disable @next/next/no-img-element */
'use client';
import supabase from '@/lib/supabase';
import { useState } from 'react';
import { saveAs } from 'file-saver';

type Props = {};

const App = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [generatedImg, setGeneratedImg] = useState<string>('');
  const [uploadedImgName, setUploadedImgName] = useState<string>('');
  const [uploadedImgUrl, setUploadedImgUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleDownload = () => {
    generatedImg && saveAs(generatedImg, 'colorized.png');
  };

  const getImageUrl = async (imgName: string) => {
    const { data, error } = await supabase.storage
      .from('ai_colorize_bucket')
      .createSignedUrl(imgName, 60);

    console.log(data);
    if (error) {
      console.log(error);
    } else {
      setUploadedImgUrl(data?.signedUrl || '');
    }
  };

  const colorizePhoto = async () => {
    if (!uploadedImgUrl) return;
    setLoading(true);

    const res = await fetch('/colorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl: uploadedImgUrl,
      }),
    });

    let generatedImg = await res.json();
    if (res.status == 200) {
      console.log(generatedImg);
      setGeneratedImg(generatedImg);
      // deleteImage();
    } else {
      console.log('status', res.status, 'error', generatedImg);
    }

    setLoading(false);
  };

  const onUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const fileName: string = Date.now() + '_' + file.name;

    const { data, error } = await supabase.storage
      .from('ai_colorize_bucket')
      .upload(fileName, file);
    if (data) {
      console.log(data);
      setUploadedImgName(data.path);
      getImageUrl(data.path);
    } else {
      console.log(error);
    }
  };

  const deleteImage = async () => {
    if (!uploadedImgName) return;
    supabase.storage
      .from('ai_colorize_bucket')
      .remove([uploadedImgName])
      .then(() => {
        console.log('Image deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting image:', error);
      });
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
      <div className='flex flex-wrap'>
        {uploadedImgUrl && <img src={uploadedImgUrl} alt='' />}
        {generatedImg && <img src={generatedImg} alt='' />}
      </div>
      {generatedImg && (
        <>
          <button className='border-2 rounded' onClick={handleDownload}>
            Download Image
          </button>
        </>
      )}
    </div>
  );
};

export default App;

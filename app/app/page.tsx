/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { handleDownload } from '@/utils';
import DropZone from '@/components/DropZone';
import supabase from '@/lib/supabase';

type Props = {};

const App = ({ session }: { session: Session | null }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [generatedImg, setGeneratedImg] = useState<string>('');
  const [uploadedImgName, setUploadedImgName] = useState<string>('');
  const [uploadedImgUrl, setUploadedImgUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const user = session?.user;

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

  const onUpload = async () => {
    if (!file) return;
    setUploading(true);

    const fileName: string = Date.now() + '_' + file.name;

    const { data, error } = await supabase.storage
      .from('ai_colorize_bucket')
      .upload(fileName, file)
      .finally(() => {
        setUploading(false);
      });

    if (data) {
      console.log(data);
      setUploadedImgName(data.path);
      //getImageUrl(data.path);
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

  useEffect(() => {
    file && onUpload();
  }, [file]);

  return (
    <div className='container p-10 mx-auto'>
      <DropZone setFile={setFile} uploading={uploading} />

      <button onClick={colorizePhoto}>Colorize Photo</button>

      {loading && <p>Loading...</p>}

      <div className='flex flex-wrap'>
        {file && (
          <img
            src={URL.createObjectURL(file)}
            className={`${uploading && 'animate-pulse opacity-40'}`}
            alt=''
          />
        )}
        {/* {uploadedImgUrl && <img src={uploadedImgUrl} alt='' />} */}
        {generatedImg && <img src={generatedImg} alt='' />}
      </div>

      {generatedImg && (
        <>
          <button
            className='border-2 rounded'
            onClick={() => handleDownload(generatedImg)}>
            Download Image
          </button>
        </>
      )}

      <form action='/auth/signout' method='post'>
        <button type='submit'>Sign out</button>
      </form>
    </div>
  );
};

export default App;

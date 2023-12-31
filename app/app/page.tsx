'use client';
import { useState, useEffect } from 'react';
import { handleDownload } from '@/utils';
import DropZone from '@/components/DropZone';
import { Button, Image } from '@nextui-org/react';
import { FolderArrowDownIcon } from '@heroicons/react/24/outline';
import { CameraIcon } from '@heroicons/react/20/solid';
import checkCredit from '@/lib/checkCredit';
import decreaseCreditLeft from '@/lib/updateCredit';
import { useAuth } from '../context/AuthProvider';
import supabase from '@/lib/supabase';

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [generatedImg, setGeneratedImg] = useState<string>('');
  const [uploadedImgName, setUploadedImgName] = useState<string>('');
  const [uploadedImgUrl, setUploadedImgUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { user, setCreditLeft } = useAuth();

  const colorizePhoto = async () => {
    console.log(uploadedImgUrl);
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

  useEffect(() => {
    const onUpload = async () => {
      console.log('uid', user?.id);
      const newCredit = await checkCredit(user?.id || '');
      console.log(newCredit);

      if (newCredit <= 0) {
        console.log('no credit');
        window.alert('You have 0 credit left');
        return;
      }
      if (!file) return;
      setUploading(true);
      setGeneratedImg('');
      setUploadedImgUrl('');

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
        await supabase.storage
          .from('ai_colorize_bucket')
          .createSignedUrl(data.path, 86400)
          .then(({ data }) => {
            console.log(data?.signedUrl);
            setUploadedImgUrl(data?.signedUrl || '');
          })
          .catch((err) => {
            console.log(err);
          });

        setFile(null);
        if (newCredit > 0) {
          let updateCredit = newCredit - 1;
          decreaseCreditLeft(user?.id || '', updateCredit);
          setCreditLeft(updateCredit);
        }
      } else {
        console.log(error);
      }
    };
    file && onUpload();
  }, [file]);

  return (
    <div className='container min-h-[80vh] p-10 mx-auto'>
      <DropZone setFile={setFile} uploading={uploading} />
      <div className='flex flex-wrap justify-center gap-2 mx-auto my-6 '>
        {uploadedImgUrl && (
          <div className='flex flex-col items-center gap-4'>
            <Image width={500} height={400} alt='' src={uploadedImgUrl} />
            <Button
              className='w-4/5'
              color='primary'
              variant='bordered'
              onClick={colorizePhoto}
              isLoading={loading}
              startContent={<CameraIcon />}>
              Colorize Photo
            </Button>
          </div>
        )}
        {generatedImg && (
          <div className='flex flex-col items-center gap-4'>
            <Image width={500} height={400} alt='' src={generatedImg} />

            <Button
              className='w-4/5'
              color='primary'
              variant='bordered'
              onClick={() => handleDownload(generatedImg)}
              startContent={<FolderArrowDownIcon />}>
              Download
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

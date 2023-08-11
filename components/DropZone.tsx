import { CameraIcon } from '@heroicons/react/24/solid';
import { Progress } from '@nextui-org/progress';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {
  uploading: boolean;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

const DropZone = ({ uploading, setFile }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    setFile(acceptedFiles[0]);
    console.log(acceptedFiles[0].name);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  const className = `${
    isDragActive && 'border-opacity-40'
  } border-2 h-40 border-gray-300 border-dashed p-10 rounded-lg text-center max-w-xl mx-auto my-4 bg-gray-700 bg-opacity-30`;
  return (
    <div
      {...getRootProps({
        className: className,
      })}>
      <input {...getInputProps()} />
      <div className='text-center'>
        {uploading ? (
          <>
            <p>uploading ...</p>
            <Progress
              size='sm'
              isIndeterminate
              aria-label='Loading...'
              className='max-w-md mt-4'
            />
          </>
        ) : isDragActive && !uploading ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className='flex flex-col items-center justify-center gap-2'>
            <CameraIcon width={50} height={50} />
            <p>Drag and drop a photo here, or click to select photo</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropZone;

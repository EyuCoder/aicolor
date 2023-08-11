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

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        'image/jpeg': [],
        'image/png': [],
      },
    });

  return (
    <div
      {...getRootProps({
        className:
          'border-2 border-gray-300 border-dashed p-10 rounded text-center w-1/2 mx-auto my-10',
      })}>
      <input {...getInputProps()} />
      {isDragActive && !uploading ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default DropZone;

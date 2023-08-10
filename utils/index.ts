import { saveAs } from 'file-saver';

export const handleDownload = (generatedImg: string) => {
  generatedImg && saveAs(generatedImg, 'colorized.png');
};

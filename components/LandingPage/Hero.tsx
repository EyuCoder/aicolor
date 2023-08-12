'use client';
import { Button } from '@nextui-org/button';
import CompareSlider from './CompareSlider';
import { useDisclosure } from '@nextui-org/react';
import LoginModal from '../Login/LoginModal';

type Props = {};

const Hero = (props: Props) => {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  return (
    <div className='flex flex-col-reverse items-center justify-center md:flex-row'>
      <CompareSlider />
      <div className='max-w-sm m-4'>
        <h2 className='mb-3 font-serif text-2xl font-normal leading-tight lg:text-3xl'>
          Colorize your old Photos with the power of AI
        </h2>
        <p className='mb-6 text-sm font-semibold lg:text-base'>
          If you&#39;re looking to colorize old black and white photos, our AI
          photo colorizer can help you bring your memories to life.
        </p>
        <Button
          onPress={onOpen}
          radius='full'
          className='text-white shadow-lg bg-gradient-to-tr from-pink-500 to-yellow-500'>
          Start for free
        </Button>
      </div>
      <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default Hero;

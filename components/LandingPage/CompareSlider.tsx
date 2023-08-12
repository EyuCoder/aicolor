'use client';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider';

const CompareSlider = () => {
  return (
    <div className='mx-4 my-6 md:mx-0'>
      <ReactCompareSlider
        className='h-[25rem] rounded-xl shadow-xl'
        position={50}
        itemOne={
          <ReactCompareSliderImage
            srcSet='/compare/original.jpg'
            alt='Image one'
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            srcSet='/compare/color.png'
            alt='Image two'
          />
        }
      />
    </div>
  );
};

export default CompareSlider;

"use client";
import Link from 'next/link';
import React from 'react';

const IMAGE_COUNT = 10;
const IMAGE_SIZE = 1024;

export default function HomePage() {

  const [value, setValue] = React.useState<string>('');
  const [prompt, setPrompt] = React.useState<string>('');
  const [imageIndex, setImageIndex] = React.useState<number>(0);
  const [images, setImages] = React.useState<string[]>([]);

  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }, []);

  const handleKeyDown = React.useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setPrompt(value);
        setImageIndex(0);
        setImages([]);
        const response = await fetch('/api/hello', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            prompt: value,
            n: IMAGE_COUNT,
            size: `${IMAGE_SIZE}x${IMAGE_SIZE}`
          }),
        });
        const data = await response.json();
        setValue('');
        setImages(data.result.map((image: {url: string}) => image.url));
      }
    }, [value]);

  const handleNextImage = React.useCallback(() => {
      setImageIndex((imageIndex + 1) % IMAGE_COUNT);
    }, [imageIndex]);

  return (
    <div className='flex flex-col justify-between'>
      <div className='text-5xl text-green-400'>
        Welcome to my amazing website
      </div>
      <Link className='text-5xl text-yellow-200' href='/login'>
        Login Page
      </Link>
      <Link className='text-5xl text-yellow-200' href='/register'>
        Register Page
      </Link>

      <div>Please type your prompt</div>
      <input value={value} onChange={handleInput} onKeyDown={handleKeyDown} />
      <div>Prompt: {prompt}</div>
      <button onClick={handleNextImage}>Click to view the next image </button>
      {images.length === 0? <div>Loading...</div> :
       <iframe
        src={images[imageIndex]}
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
      />}
    </div>
  );
}

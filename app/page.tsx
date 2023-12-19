"use client"
import Image from 'next/image'
import { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';

export default function Home() {
  const [content, setContent] = useState("title");

  return (
    <div className="min-h-screen flex items-center justify-center font-bold">
      <div className='block text-center'>
        <p className='mb-5 text-3xl'>
          remi-24
          <br />
          <span className='opacity-50 text-sm'>by @brian</span>
        </p>
        <Button href="/play" variant="contained" color="secondary" style={{
          borderRadius: 50,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 30,
          paddingRight: 30,
          display: 'block'
        }} className='font-bold'>
          Play
        </Button>
      </div>
    </div>
  );

}
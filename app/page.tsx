"use client"
import Image from 'next/image'
import { ReactElement, useEffect, useState } from 'react';
import Button from '@/components/Button';

type DefaultProps = {
  clicked: Function
}

export function Title({ clicked }: DefaultProps) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Remi 24</h1>
      <p className='opacity-60'>By <span className="underline">@</span></p>
      <Button onClickFunction={() => {
        clicked("play")
      }}>
        Play
      </Button>
      <br></br>
      {/* Your mobile-friendly content */}
    </div>
  )
}
export function Play({clicked} : DefaultProps) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/random", {
          method: "POST"
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Do something with the fetched data
        alert(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [])

  return (
    <div className='text-center'>
      Play?

      <br />
      <Button onClickFunction={() => {
        clicked("title")
      }}>
        Back to title
      </Button>
    </div>
  )
}

export function Result({clicked}: DefaultProps) {
  return (
    <div>
      Result
    </div>
  )
}

type ContentMap = {
  [key: string]: ReactElement;
};

export default function Home() {
  const [content, setContent] = useState("title");

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const contentMap: ContentMap = {
    "title": <Title clicked={handleContentChange} />,
    "play": <Play clicked={handleContentChange} />,
    "result": <Result clicked={handleContentChange} />
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {contentMap[content]}
    </div>
  );
}
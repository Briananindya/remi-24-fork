"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Result from "@/components/Result";
import { Button } from "@mui/material";

type ResultProps = {
    message: boolean,
    expression: string
}

export default function Play() {
    const [data, setData] = useState({nums: [1,2,3,4]})
    const [isLoading, setLoading] = useState(true)
    const [guess, setGuess] = useState<string | boolean>("playing")
    const [result, setResult] = useState<ResultProps>({message: false, expression: ""})

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch random data
                const randomDataRes = await fetch("/api/random", {
                    method: "POST",
                });
                const randomData = await randomDataRes.json();
                setData(randomData);
                setLoading(false);

                // Fetch result based on the fetched random data
                const isPossibleRes = await fetch("/api/is_possible", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nums: randomData.nums,
                        target: 24,
                    }),
                });
                const isPossibleResult = await isPossibleRes.json();
                setResult(isPossibleResult);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center font-bold">
                <div className='block text-center'>
                    <Image 
                        src="https://media.tenor.com/ySTESf7LGvUAAAAi/detective-conan.gif"
                        alt="Loading" 
                        width={100} 
                        height={100}
                    >
                    </Image>
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    if (guess !== "playing") {
        return <Result result={result.message === guess} expression={result.expression} nums={data.nums}/>
    }else {
        return (
            <div className="min-h-screen flex items-center justify-center font-bold p-5">
                <div className='block text-center'>
                    <p className="mb-3 text-2xl">
                        Apakah list angka tersebut bisa menjadi 24? 👀
                    </p>
                    <p className="mb-5 text-2xl">
                        [{data.nums[0]},{data.nums[1]},{data.nums[2]},{data.nums[3]}]
                    </p>
                    <div className="flex items-center justify-center mb-8">
                        <Button variant="contained" color="success" style={{
                            borderRadius: 50,
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 30,
                            paddingRight: 30,
                            marginRight: 15,
                            display: 'block'
                        }} className='font-bold' onClick={() => {
                            setGuess(true)
                        }}
                        >
                            Bisa ✅
                        </Button>
                        <Button variant="contained" color="error" style={{
                            borderRadius: 50,
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 30,
                            paddingRight: 30,
                            display: 'block'
                        }} className='font-bold' onClick={() => {
                            setGuess(false)
                        }}
                        >
                            Gabisa ❌
                        </Button>
                    </div>
                    <Button href="/" variant="contained" color="secondary" style={{
                        borderRadius: 50,
                        paddingTop: 10,
                        paddingBottom: 10,
                        display: 'block'
                    }} className='font-bold'
                    >
                        Menu
                    </Button>
                </div>
            </div>
        )
    }
}
"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Result from "@/components/Result";
import { Button } from "@mui/material";

export default function Play() {
    const [data, setData] = useState({nums: [1,2,3,4]})
    const [isLoading, setLoading] = useState(true)
    const [guess, setGuess] = useState<string | boolean>("playing")
    const [result, setResult] = useState<boolean>(false)

    useEffect(() => {
        fetch('/api/random', {
            method: "POST"
        })
        .then((res) => res.json())
        .then((data) => {
            setData(data)
            setLoading(false);
        })
    }, []);

    useEffect( () => {
        fetch('/api/is_possible', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nums: data.nums,
                target: 24
            })
        })
            .then((res) => res.json())
            .then((res) => {
                setResult(res.message)
            })
    } )
    
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center font-bold">
                <div className='block text-center'>
                    <Image 
                        src="https://media.tenor.com/HHUcXimKS7cAAAAi/yay-jumping.gif"
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
        return <Result result={result === guess}/>
    }else {
        return (
            <div className="min-h-screen flex items-center justify-center font-bold p-5">
                <div className='block text-center'>
                    {/* <ul>
                    {data.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul> */}

                    <p className="mb-3 text-2xl">
                        Can the following list of numbers be operated in such a way that it produces 24? 👀
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
                            True ✅
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
                            False ❌
                        </Button>
                    </div>
                    <Button href="/" variant="contained" color="secondary" style={{
                        borderRadius: 50,
                        paddingTop: 10,
                        paddingBottom: 10,
                        display: 'block'
                    }} className='font-bold'
                    >
                        Back
                    </Button>
                </div>
            </div>
        )
    }
}
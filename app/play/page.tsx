"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

export default function Play() {
    const [data, setData] = useState(0)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/random', {
            method: "POST"
        })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setData(data);
                } else {
                    // Handle non-array response, e.g., set data to an empty array
                    setData([]);
                }
                setLoading(false);
            })
    }, []);
    
    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center font-bold">
            <div className='block text-center'>
                <p>Loading...</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen flex items-center justify-center font-bold">
            <div className='block text-center'>
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <p className="mb-5">Hey this is from play</p>
                <Button href="/" variant="contained" color="secondary" style={{
                    borderRadius: 50,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                    display: 'block'
                }} className='font-bold'
                >
                    Back
                </Button>
            </div>
        </div>
    )
}